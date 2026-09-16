import { useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { SatsangEvent } from '../types';
import { Calendar, Clock, Video, PlayCircle, Trash2, Edit2, Plus, Lock, UploadCloud } from 'lucide-react';

export default function AdminSatsang() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [events, setEvents] = useState<SatsangEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ video: number; thumbnail: number }>({ video: 0, thumbnail: 0 });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [currentEvent, setCurrentEvent] = useState<Partial<SatsangEvent>>({
    title: '', dateStr: '', timeStr: '', meetLink: '', videoUrl: '', thumbnailUrl: '', status: 'upcoming', duration: '', seriesName: '', partNumber: undefined
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'radha123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'satsangs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedEvents: SatsangEvent[] = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push({ id: doc.id, ...doc.data() } as SatsangEvent);
      });
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = (file: File, type: 'video' | 'thumbnail'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `satsangs/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(prev => ({ ...prev, [type]: progress }));
        },
        (error) => {
          console.error(`Error uploading ${type}:`, error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let finalVideoUrl = currentEvent.videoUrl;
      let finalThumbnailUrl = currentEvent.thumbnailUrl;

      // Upload local files if selected
      if (videoFile) {
        finalVideoUrl = await uploadFile(videoFile, 'video');
      }
      if (thumbnailFile) {
        finalThumbnailUrl = await uploadFile(thumbnailFile, 'thumbnail');
      }

      const eventData = {
        ...currentEvent,
        videoUrl: finalVideoUrl,
        thumbnailUrl: finalThumbnailUrl,
        partNumber: currentEvent.partNumber ? Number(currentEvent.partNumber) : null
      };

      if (currentEvent.id) {
        const docRef = doc(db, 'satsangs', currentEvent.id);
        await updateDoc(docRef, eventData);
      } else {
        await addDoc(collection(db, 'satsangs'), {
          ...eventData,
          createdAt: Date.now()
        });
      }
      
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error saving event: ", error);
      alert('Error saving event! \n\nIf you are trying to upload a local file, Firebase is blocking it because you have not enabled Firebase Storage (which requires the free Blaze plan).\n\nPlease either upgrade Firebase or use the "External URL" box instead with a Google Drive link.');
      setUploadProgress({ video: 0, thumbnail: 0 });
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadProgress({ video: 0, thumbnail: 0 });
    setCurrentEvent({ title: '', dateStr: '', timeStr: '', meetLink: '', videoUrl: '', thumbnailUrl: '', status: 'upcoming', duration: '', seriesName: '', partNumber: undefined });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'satsangs', id));
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  const editEvent = (ev: SatsangEvent) => {
    setCurrentEvent(ev);
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadProgress({ video: 0, thumbnail: 0 });
    setIsEditing(true);
  };

  const handleRenameFolder = async (oldName: string) => {
    const newName = window.prompt(`Enter new name for folder "${oldName}":`, oldName);
    if (!newName || newName === oldName) return;

    setIsLoading(true);
    try {
      const eventsToUpdate = events.filter(e => e.seriesName === oldName);
      for (const ev of eventsToUpdate) {
        if (ev.id) {
          const docRef = doc(db, 'satsangs', ev.id);
          await updateDoc(docRef, { seriesName: newName });
        }
      }
      fetchEvents();
    } catch (error) {
      console.error("Error renaming folder:", error);
      alert("Failed to rename folder.");
      setIsLoading(false);
    }
  };

  const uniqueSeriesNames = Array.from(new Set(events.map(e => e.seriesName).filter(Boolean))) as string[];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-[86px] pb-20 bg-[#0B192C] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-[32px] max-w-[400px] w-full text-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-[var(--color-dawn-gold)]" />
          </div>
          <h2 className="font-display text-2xl text-white mb-6">Admin Access</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white mb-6 text-center focus:outline-none focus:border-[var(--color-dawn-gold)] transition-colors"
          />
          <button type="submit" className="w-full bg-[var(--color-dawn-gold)] text-[#0B192C] font-bold py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-yellow-100 transition-colors">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[86px] pb-20 bg-[#0B192C] text-white px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-3xl">Admin: Satsang Manager</h1>
          {!isEditing && (
            <button 
              onClick={() => {
                resetForm();
                setIsEditing(true);
              }}
              className="bg-[var(--color-dawn-gold)] text-[#0B192C] px-4 py-2 rounded-full font-bold flex items-center gap-2"
            >
              <Plus size={18} /> New Satsang
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleSave} className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-10 space-y-4">
            <h2 className="text-xl font-bold mb-4">{currentEvent.id ? 'Edit Satsang' : 'Create New Satsang'}</h2>
            
            <div>
              <label className="block text-sm opacity-70 mb-1">Title</label>
              <input required type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.title} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm opacity-70 mb-1">Folder / Series Name (e.g. Hit Harivansh Charitamrit)</label>
                <input type="text" list="series-list" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" placeholder="Type new or select existing..." value={currentEvent.seriesName || ''} onChange={e => setCurrentEvent({...currentEvent, seriesName: e.target.value})} />
                <datalist id="series-list">
                  {uniqueSeriesNames.map(s => <option key={s} value={s} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-1">Part Number (e.g. 1)</label>
                <input type="number" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.partNumber || ''} onChange={e => setCurrentEvent({...currentEvent, partNumber: parseInt(e.target.value)})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm opacity-70 mb-1">Date String (e.g. Sept 15, 2026)</label>
                <input required type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.dateStr} onChange={e => setCurrentEvent({...currentEvent, dateStr: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm opacity-70 mb-1">Time String (e.g. 8:00 PM IST)</label>
                <input required type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.timeStr} onChange={e => setCurrentEvent({...currentEvent, timeStr: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm opacity-70 mb-1">Status</label>
              <select className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.status} onChange={e => setCurrentEvent({...currentEvent, status: e.target.value as 'upcoming' | 'completed'})}>
                <option value="upcoming">Upcoming (Google Meet)</option>
                <option value="completed">Completed (Recording)</option>
              </select>
            </div>

            {currentEvent.status === 'upcoming' && (
              <div>
                <label className="block text-sm opacity-70 mb-1">Google Meet Link</label>
                <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.meetLink || ''} onChange={e => setCurrentEvent({...currentEvent, meetLink: e.target.value})} />
              </div>
            )}

            {currentEvent.status === 'completed' && (
              <>
                <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <label className="block text-sm font-bold text-[var(--color-dawn-gold)] mb-2 flex items-center gap-2"><UploadCloud size={16}/> Upload Media File (Audio/Video)</label>
                  <input type="file" accept="video/*,audio/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="w-full text-sm opacity-70 mb-2" />
                  {uploadProgress.video > 0 && uploadProgress.video < 100 && (
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2"><div className="bg-[var(--color-dawn-gold)] h-1.5 rounded-full" style={{width: `${uploadProgress.video}%`}}></div></div>
                  )}
                  <div className="text-xs opacity-50 mt-2">Or use an external URL:</div>
                  <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white mt-1 text-sm" placeholder="https://drive.google.com/..." value={currentEvent.videoUrl || ''} onChange={e => setCurrentEvent({...currentEvent, videoUrl: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <label className="block text-sm font-bold text-[var(--color-dawn-gold)] mb-2 flex items-center gap-2"><UploadCloud size={16}/> Upload Thumbnail</label>
                    <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)} className="w-full text-sm opacity-70 mb-2" />
                    {uploadProgress.thumbnail > 0 && uploadProgress.thumbnail < 100 && (
                      <div className="w-full bg-white/10 rounded-full h-1.5 mt-2"><div className="bg-[var(--color-dawn-gold)] h-1.5 rounded-full" style={{width: `${uploadProgress.thumbnail}%`}}></div></div>
                    )}
                    <div className="text-xs opacity-50 mt-2">Or use an external URL:</div>
                    <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white mt-1 text-sm" value={currentEvent.thumbnailUrl || ''} onChange={e => setCurrentEvent({...currentEvent, thumbnailUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm opacity-70 mb-1">Duration (e.g. 1 hr 45 min)</label>
                    <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.duration || ''} onChange={e => setCurrentEvent({...currentEvent, duration: e.target.value})} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={resetForm} className="px-4 py-2 opacity-70 hover:opacity-100">Cancel</button>
              <button type="submit" disabled={isSaving || (uploadProgress.video > 0 && uploadProgress.video < 100)} className="bg-[var(--color-dawn-gold)] text-[#0B192C] px-6 py-2 rounded font-bold disabled:opacity-50">
                {isSaving ? 'Processing...' : (uploadProgress.video > 0 && uploadProgress.video < 100 ? `Uploading (${uploadProgress.video}%)` : 'Save Satsang')}
              </button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center opacity-50 py-10">Loading events...</div>
        ) : (
          <div className="space-y-8">
            {events.length === 0 ? (
              <div className="text-center opacity-50 py-10 border border-white/10 border-dashed rounded-xl">No satsangs found in database.</div>
            ) : (
              (() => {
                // Group by seriesName
                const grouped = events.reduce((acc, ev) => {
                  const key = ev.seriesName || 'General';
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(ev);
                  return acc;
                }, {} as Record<string, SatsangEvent[]>);

                return Object.entries(grouped).map(([series, folderEvents]) => {
                  const isGeneral = series === 'General';
                  return (
                    <div key={series} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[var(--color-dawn-gold)] uppercase tracking-widest text-sm">
                            {isGeneral ? 'Other Satsangs (No Folder)' : series}
                          </h3>
                          <span className="text-xs text-white/50 bg-black/20 px-2 py-0.5 rounded-full">{folderEvents.length}</span>
                        </div>
                        
                        {!isGeneral && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRenameFolder(series)}
                              className="text-xs flex items-center gap-1 opacity-70 hover:opacity-100 bg-white/10 px-3 py-1.5 rounded-lg"
                            >
                              <Edit2 size={12}/> Rename
                            </button>
                            <button 
                              onClick={() => {
                                resetForm();
                                setCurrentEvent(prev => ({...prev, seriesName: series, partNumber: folderEvents.length + 1}));
                                setIsEditing(true);
                              }}
                              className="text-xs flex items-center gap-1 bg-[var(--color-dawn-gold)] text-black font-bold px-3 py-1.5 rounded-lg hover:brightness-110"
                            >
                              <Plus size={12}/> Add Here
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {folderEvents.sort((a, b) => (a.partNumber || 0) - (b.partNumber || 0)).map(ev => (
                          <div key={ev.id} className="bg-black/30 border border-white/5 rounded-xl p-3 flex justify-between items-center hover:bg-black/40 transition-colors">
                            <div className="flex items-center gap-4">
                              {ev.status === 'upcoming' ? (
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300"><Video size={16} /></div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-300"><PlayCircle size={16} /></div>
                              )}
                              <div>
                                <h3 className="font-bold text-base leading-tight">
                                  {ev.partNumber && !isGeneral ? `Part ${ev.partNumber}: ` : ''}{ev.title}
                                </h3>
                                <div className="text-xs opacity-60 flex gap-3 mt-1">
                                  <span className="flex items-center gap-1"><Calendar size={12}/> {ev.dateStr}</span>
                                  <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10">{ev.status}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => editEvent(ev)} className="p-2 hover:bg-white/10 rounded"><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(ev.id!)} className="p-2 hover:bg-red-500/20 text-red-400 rounded"><Trash2 size={16} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        )}
      </div>
    </div>
  );
}
