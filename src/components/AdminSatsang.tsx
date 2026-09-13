import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { SatsangEvent } from '../types';
import { Calendar, Clock, Video, PlayCircle, Trash2, Edit2, Plus, Lock } from 'lucide-react';

export default function AdminSatsang() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [events, setEvents] = useState<SatsangEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<SatsangEvent>>({
    title: '', dateStr: '', timeStr: '', meetLink: '', videoUrl: '', thumbnailUrl: '', status: 'upcoming', duration: ''
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentEvent.id) {
        // Update
        const docRef = doc(db, 'satsangs', currentEvent.id);
        await updateDoc(docRef, { ...currentEvent });
      } else {
        // Create
        await addDoc(collection(db, 'satsangs'), {
          ...currentEvent,
          createdAt: Date.now()
        });
      }
      setIsEditing(false);
      setCurrentEvent({ title: '', dateStr: '', timeStr: '', meetLink: '', videoUrl: '', thumbnailUrl: '', status: 'upcoming', duration: '' });
      fetchEvents();
    } catch (error) {
      console.error("Error saving event: ", error);
    }
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
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen pt-[86px] pb-20 bg-[#0B192C] text-white px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-3xl">Admin: Satsang Manager</h1>
          {!isEditing && (
            <button 
              onClick={() => {
                setCurrentEvent({ title: '', dateStr: '', timeStr: '', meetLink: '', videoUrl: '', thumbnailUrl: '', status: 'upcoming', duration: '' });
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
                <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.meetLink} onChange={e => setCurrentEvent({...currentEvent, meetLink: e.target.value})} />
              </div>
            )}

            {currentEvent.status === 'completed' && (
              <>
                <div>
                  <label className="block text-sm opacity-70 mb-1">Video Recording URL (YouTube/Drive)</label>
                  <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.videoUrl} onChange={e => setCurrentEvent({...currentEvent, videoUrl: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm opacity-70 mb-1">Thumbnail Image URL</label>
                    <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.thumbnailUrl} onChange={e => setCurrentEvent({...currentEvent, thumbnailUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm opacity-70 mb-1">Duration (e.g. 1 hr 45 min)</label>
                    <input type="text" className="w-full bg-black/30 border border-white/20 rounded p-2 text-white" value={currentEvent.duration} onChange={e => setCurrentEvent({...currentEvent, duration: e.target.value})} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 opacity-70 hover:opacity-100">Cancel</button>
              <button type="submit" className="bg-[var(--color-dawn-gold)] text-[#0B192C] px-6 py-2 rounded font-bold">Save Satsang</button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center opacity-50 py-10">Loading events...</div>
        ) : (
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center opacity-50 py-10 border border-white/10 border-dashed rounded-xl">No satsangs found in database.</div>
            ) : (
              events.map(ev => (
                <div key={ev.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {ev.status === 'upcoming' ? (
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300"><Video size={20} /></div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-300"><PlayCircle size={20} /></div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{ev.title}</h3>
                      <div className="text-sm opacity-60 flex gap-3">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {ev.dateStr}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {ev.timeStr}</span>
                        <span className="uppercase text-xs font-bold px-2 py-0.5 rounded bg-white/10">{ev.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editEvent(ev)} className="p-2 hover:bg-white/10 rounded"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(ev.id!)} className="p-2 hover:bg-red-500/20 text-red-400 rounded"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
