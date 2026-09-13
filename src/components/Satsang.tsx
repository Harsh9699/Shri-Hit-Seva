import { motion } from 'motion/react';
import { Video, Calendar, Clock, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { SatsangEvent } from '../types';

export default function Satsang() {
  const { language } = useLanguage();
  const [events, setEvents] = useState<SatsangEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'satsangs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedEvents: SatsangEvent[] = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push({ id: doc.id, ...doc.data() } as SatsangEvent);
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching satsangs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'completed');

  return (
    <div className="min-h-screen pt-[66px] bg-[#0B192C]">
      <section className="px-6 py-20 relative h-full min-h-[calc(100vh-66px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(224,184,58,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-body text-[10px] tracking-widest uppercase text-white/80">
                {language === 'hi' ? 'लाइव इवेंट्स' : 'Live Events'}
              </span>
            </div>
            <h1 className="font-display text-[clamp(32px,5vw,48px)] text-white mb-4">
              {language === 'hi' ? 'सत्संग अपडेट्स' : 'Satsang Updates'}
            </h1>
            <p className="font-body text-[15px] text-white/60 max-w-[600px] mx-auto">
              {language === 'hi' 
                ? 'हमारे ऑनलाइन सत्संग में शामिल हों। गूगल मीट के माध्यम से लाइव जुड़ें या पिछले सत्रों की रिकॉर्डिंग देखें।'
                : 'Join our online community gatherings. Watch live via Google Meet or explore past recordings.'}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-10 h-10 border-4 border-white/20 border-t-[var(--color-dawn-gold)] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {/* Live/Upcoming Card */}
              <div className="flex flex-col gap-6">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((ev, idx) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-fit"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform duration-500 group-hover:scale-110">
                        <Video size={120} color="var(--color-dawn-gold)" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="bg-[var(--color-dawn-gold)]/20 text-[var(--color-dawn-gold)] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-6 border border-[var(--color-dawn-gold)]/30">
                          {language === 'hi' ? 'आगामी सत्संग' : 'Upcoming Satsang'}
                        </div>
                        
                        <h3 className="font-display text-[26px] text-white mb-4 leading-tight">{ev.title}</h3>
                        
                        <div className="flex flex-col gap-4 mb-10">
                          <div className="flex items-center gap-4 text-white/70 font-body text-[14px]">
                            <div className="bg-white/10 p-2 rounded-full">
                              <Calendar size={18} className="text-[var(--color-dawn-gold)]" />
                            </div>
                            <span>{ev.dateStr}</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/70 font-body text-[14px]">
                            <div className="bg-white/10 p-2 rounded-full">
                              <Clock size={18} className="text-[var(--color-dawn-gold)]" />
                            </div>
                            <span>{ev.timeStr}</span>
                          </div>
                        </div>

                        {ev.meetLink ? (
                          <a href={ev.meetLink} target="_blank" rel="noreferrer" className="w-full bg-white text-[#0B192C] font-bold font-body text-[14px] tracking-widest uppercase py-5 rounded-full flex items-center justify-center gap-3 hover:bg-yellow-100 transition-colors shadow-lg cursor-pointer">
                            <Video size={20} />
                            {language === 'hi' ? 'गूगल मीट पर जुड़ें' : 'Join on Google Meet'}
                          </a>
                        ) : (
                          <button disabled className="w-full bg-white/20 text-white/50 font-bold font-body text-[14px] tracking-widest uppercase py-5 rounded-full flex items-center justify-center gap-3 cursor-not-allowed">
                            <Video size={20} />
                            Link Available Soon
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 text-center text-white/50 h-full flex items-center justify-center min-h-[300px]">
                    No upcoming satsangs scheduled yet.
                  </div>
                )}
              </div>

              {/* Past Recordings */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between px-2 mb-2">
                  <h3 className="font-display text-[22px] text-white">
                    {language === 'hi' ? 'पिछली रिकॉर्डिंग' : 'Past Recordings'}
                  </h3>
                </div>
                
                {pastEvents.length > 0 ? (
                  pastEvents.map((ev) => (
                    <a key={ev.id} href={ev.videoUrl || '#'} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 flex items-center gap-5 cursor-pointer transition-colors group">
                      <div className="w-24 h-16 rounded-xl bg-black/40 flex items-center justify-center relative overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={ev.thumbnailUrl || "https://i.postimg.cc/pVmNJGx9/IMG-20260412-WA0315.jpg"} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500" alt="thumbnail" />
                        <PlayCircle size={24} className="text-white relative z-10 drop-shadow-md" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-display text-[16px] text-white mb-1.5 group-hover:text-[var(--color-dawn-gold)] transition-colors">{ev.title}</h4>
                        <p className="font-body text-[12px] text-white/50 tracking-wider">{ev.dateStr} {ev.duration ? `• ${ev.duration}` : ''}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center text-white/40 py-10 border border-white/5 rounded-2xl border-dashed">
                    No past recordings available.
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
