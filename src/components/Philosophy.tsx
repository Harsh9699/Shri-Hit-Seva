import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Philosophy() {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const acharyaImage = 'https://delightful-crimson-gjnwrj2rep.edgeone.app/1000051571-removebg-preview.png';

  const handlePranam = () => {
    setShowPetals(true);
    setTimeout(() => setShowPetals(false), 3000);
  };
  return (
    <div className="min-h-screen px-4 md:px-11 py-18">
      <div className="max-w-[980px] mx-auto">
        <div className="text-center mb-13">
          <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] flex items-center gap-2 justify-center mb-3">
            The Core Teaching
          </div>
          <h1 className="font-display text-[clamp(28px,5vw,50px)] text-[var(--color-ink)] tracking-tight mb-8">
            Hitopasana — <em className="italic text-[var(--color-saffron)]">Prema Bhakti</em>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-[var(--color-rose)] to-[var(--color-butter)] border border-[rgba(196,154,42,0.2)] rounded-[22px] p-11 md:p-10 text-center mb-7 shadow-[0_8px_36px_rgba(196,154,42,0.1)]"
          >
            <div className="font-devanagari text-[clamp(16px,2.5vw,21px)] font-medium text-[var(--color-inm)] leading-loose mb-4.5">
              सबसो हित निष्काम मति, श्री वृन्दावन विश्राम ।<br />
              श्री राधावल्लभ लाल को, हृदय ध्यान मुख नाम ॥
            </div>
            <div className="font-body italic text-[13px] text-[var(--color-inmu)] mb-4.5 tracking-wide">
              Sabso Hit Nishkam Mati · Shri Vrindavan Vishram<br />
              Shri Radhavallabh Lal Ko · Hriday Dhyan Mukh Naam
            </div>
            <div className="w-11 h-[1px] bg-[var(--color-gold)] mx-auto my-4 opacity-50" />
            <div className="font-body text-[15px] font-light text-[var(--color-ins)] leading-relaxed">
              Have selfless love toward all with a desireless mind. Take refuge in Shri Vrindavan Dham. In your heart — meditate on Shri Radhavallabh Lal Ji. On your lips — His divine name.
            </div>
            <div className="mt-3.5 font-body text-[11px] tracking-widest uppercase text-[var(--color-inmu)]">
              — Shri Hit Harivansh Mahaprabhu · The Complete Sadhna in One Shloka
            </div>
          </motion.div>
        </div>

        <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] flex items-center gap-2 justify-center mb-4.5">
          Three Pillars of Hitopasana
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-11">
          {[
            { icon: '💛', title: 'Sabse Nischal Niswarth Prem', desc: 'The most steady, selfless, unconditional love for Shri Radhavallabh Lal Ji. No desire, no condition — only pure love.' },
            { icon: '🪷', title: 'Radhavallabh Lal Ji ki Seva', desc: 'Intimate loving service with Tat-Sukh Bhav — every action aimed at Their pleasure. Manasi Seva is the highest form.' },
            { icon: '🌿', title: 'Shri Vrindavan Dham ka Nitya Dhyan', desc: 'Constant inner meditation on eternal Vrindavan — where the Nitya Lila of Radha-Krishna is always happening right now.' }
          ].map((pil, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--color-warm)] border border-[var(--bdr)] rounded-2xl p-6.5 transition-all duration-300 hover:translate-x-1.5 hover:border-[var(--bdrS)] hover:shadow-[0_6px_28px_rgba(196,154,42,0.1)]"
            >
              <div className="text-[26px] mb-3">{pil.icon}</div>
              <div className="font-display text-[16px] text-[var(--color-ink)] mb-2">{pil.title}</div>
              <p className="text-[13.5px] font-light text-[var(--color-ins)] leading-relaxed">
                {pil.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] flex items-center gap-2 justify-center mt-10 mb-4.5">
          Core Beliefs
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-11">
          {[
            { icon: '👑', title: 'Shriji is Supreme', desc: 'Shri Radha Rani is the Supreme Goddess — the ultimate reality, source of all divine rasa. Parabrahman in Her divine feminine form.' },
            { icon: '🎵', title: 'Why We Worship Krishna', desc: 'We worship Lalju (Krishna / Radhavallabh) because He is the Premi — the beloved devotee — of our Shriji. He exists for Her joy.' },
            { icon: '🤝', title: 'Sahchari Bhav', desc: 'The devotee adopts the inner identity of a Sahchari — intimate companion of Shri Radha — serving the Divine Couple with Tat-Sukh Bhav.' },
            { icon: '🕊️', title: 'No Ritual, No Caste', desc: 'No fasting, no elaborate rituals, no caste barrier. Radha Charan Rati — devotion to Radha\'s lotus feet — is the only qualification.' },
            { icon: '📖', title: 'Vaani as Living Guru', desc: 'The Vaani of Shri Hit Harivansh Ji is the living Guru and scripture. Reading it with bhav is direct guidance from the Founder himself.' },
            { icon: '♾️', title: 'Nitya Lila — Eternal Now', desc: 'Radha-Krishna\'s divine pastimes are not history — they are eternally happening right now in Nitya Vrindavan. Sadhna is the path to enter.' }
          ].map((bel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--color-warm)] border border-[var(--bdr)] rounded-2xl p-6.5 transition-all duration-300 hover:translate-y-[-4px] hover:border-[var(--bdrS)] hover:shadow-[0_6px_28px_rgba(196,154,42,0.1)]"
            >
              <div className="text-[26px] mb-3">{bel.icon}</div>
              <div className="font-display text-[16px] text-[var(--color-ink)] mb-2">{bel.title}</div>
              <p className="text-[13.5px] font-light text-[var(--color-ins)] leading-relaxed">
                {bel.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 md:p-14 bg-white rounded-[40px] border border-[rgba(196,154,42,0.12)] shadow-[0_20px_60px_rgba(44,26,14,0.05)] flex flex-col items-center text-center"
        >
          {/* 1. Heading */}
          <div className="mb-12">
            <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
              The Incarnation of the Flute
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] text-[var(--color-ink)] leading-[1.1]">
              Shri Hit Harivansh <em className="italic text-[var(--color-saffron)]">Mahaprabhu</em>
            </h2>
          </div>

          {/* 2. Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[380px] aspect-[4/5] mb-8 group"
          >
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(44,26,14,0.15)] border-[12px] border-white bg-[var(--color-warm)] h-full">
              {isImgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-warm)]">
                  <div className="w-8 h-8 border-2 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isImgLoading ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  src={acharyaImage} 
                  alt="Shri Hit Harivansh Chandra Mahaprabhu"
                  onLoad={() => setIsImgLoading(false)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://picsum.photos/seed/acharya_life/600/800';
                    setIsImgLoading(false);
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(44,26,14,0.15)] to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Orbits */}
            <div className="absolute -inset-8 border border-[rgba(196,154,42,0.08)] rounded-full pointer-events-none sspin [animation-duration:40s]" />
            <div className="absolute -inset-12 border border-dashed border-[rgba(196,154,42,0.05)] rounded-full pointer-events-none sspin [animation-duration:60s] [animation-direction:reverse]" />
          </motion.div>

          {/* 3. Dandavat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePranam}
            className="px-10 py-4 bg-linear-to-r from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] rounded-full text-[14px] tracking-[0.15em] uppercase flex items-center gap-3 shadow-xl relative overflow-hidden group mb-14"
          >
            <span className="relative z-10">🙏 Dandavat Pranam</span>
            <div className="absolute inset-0 bg-linear-to-r from-[var(--color-saffron)] to-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {showPetals && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[rgba(255,255,255,0.1)] pointer-events-none"
              />
            )}
          </motion.button>

          {/* 4. Mantra (User Provided) */}
          <div className="mb-10">
            <div className="font-devanagari text-[clamp(18px,2.5vw,24px)] text-[var(--color-ink)] leading-relaxed font-medium italic">
              प्रेमानन्दोत्पुलकित गात्रौ विद्युद्धाराधर सम कान्ति: ।<br />
              राधा कृष्णौ मनसि दधानं वन्देहं श्रीहित हरिवंशम् ॥
            </div>
            <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mt-6 opacity-30" />
          </div>

          {/* 5. Description */}
          <div className="max-w-[700px]">
            <div className="space-y-5 text-[15.5px] font-light leading-relaxed text-[var(--color-ins)]">
              <p>
                Born in 1502 in Baad, near Mathura, Shri Hit Harivansh Mahaprabhu is revered as the incarnation of Shri Krishna's divine flute (Murali). He established the Radhavallabh Sampradaya in 1535, teaching the path of "Hit" (Pure Love).
              </p>
              <p>
                His teachings emphasize that Radha and Krishna are one soul in two bodies, eternally engaged in Nitya Vihar. He prioritized "Hit" (Love/Grace) over all rituals and rules, making the highest spiritual bliss accessible to all.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {showPetals && (
              <div className="fixed inset-0 pointer-events-none z-[100]">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      y: -20, 
                      x: Math.random() * window.innerWidth,
                      rotate: 0 
                    }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      y: window.innerHeight + 20,
                      x: (Math.random() - 0.5) * 300 + (Math.random() * window.innerWidth),
                      rotate: 720
                    }}
                    transition={{ 
                      duration: 2.5 + Math.random() * 2,
                      ease: "linear"
                    }}
                    className="absolute text-3xl"
                   >
                    🌸
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Divider */}
        <div className="max-w-[100px] mx-auto h-[1px] bg-linear-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-20 my-12" />

        {/* Sadhguru Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-10 md:p-14 bg-white rounded-[40px] border border-[rgba(196,154,42,0.12)] shadow-[0_20px_60px_rgba(44,26,14,0.05)] flex flex-col items-center text-center"
        >
          {/* 1. Heading */}
          <div className="mb-12">
            <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
              Our Shri Sadhguru Dev Bhagwan
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] text-[var(--color-ink)] leading-[1.1]">
              Shri Hit Govind Sharan <em className="italic text-[var(--color-saffron)]">Premanand ji</em> Maharaj
            </h2>
          </div>

          {/* 2. Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-[380px] aspect-[4/5] mb-8 group"
          >
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(44,26,14,0.15)] border-[12px] border-white bg-[var(--color-warm)] h-full">
              <img 
                src="https://binding-purple-iewud9p9vs.edgeone.app/IMG_20260412_195218.jpg" 
                alt="Shri Hit Govind Sharan Premanand ji Maharaj"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(44,26,14,0.15)] to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Orbits */}
            <div className="absolute -inset-8 border border-[rgba(196,154,42,0.08)] rounded-full pointer-events-none sspin [animation-duration:40s]" />
            <div className="absolute -inset-12 border border-dashed border-[rgba(196,154,42,0.05)] rounded-full pointer-events-none sspin [animation-duration:60s] [animation-direction:reverse]" />
          </motion.div>

          {/* 3. Dandavat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePranam}
            className="px-10 py-4 bg-linear-to-r from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] rounded-full text-[14px] tracking-[0.15em] uppercase flex items-center gap-3 shadow-xl relative overflow-hidden group mb-14"
          >
            <span className="relative z-10">🙏 Dandavat Pranam</span>
            <div className="absolute inset-0 bg-linear-to-r from-[var(--color-saffron)] to-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* 4. Mantra */}
          <div className="mb-10">
            <div className="font-devanagari text-[clamp(18px,2.5vw,24px)] text-[var(--color-ink)] leading-relaxed font-medium italic">
              गुरु कृपाल हितरूप वपु, करिहैं सुमति-प्रकाश।<br />
              हैं समरथ मो सिर धनी, पुजवेंगे सब आस ॥<br />
              वरनौं मंगल नाम-गुन, अग्या इनकी पाइ।<br />
              लोचन-हीनैं देत ज्यौं, समरथ पन्थ बताइ ॥
            </div>
            <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mt-6 opacity-30" />
          </div>

          {/* 5. Description */}
          <div className="max-w-[750px]">
            <div className="space-y-6 text-[15.5px] font-light leading-relaxed text-[var(--color-ins)] text-center">
              <p>
                Shri Hit Premanand Govind Sharan ji Maharaj, a beacon of divine love in Vrindavan, exemplifies the pinnacle of surrender. His life is a living miracle; though both his kidneys failed many years ago, he remains tirelessly active in the service of Shri Radha Rani, proving that spiritual strength transcends physical limitations.
              </p>
              <p>
                He emphasizes that the goal of human life is to realize the eternal "Nitya Vihar"—the selfless love play of the Divine Couple. His daily "Ekantik Vartalap" (private conversations) and discourses have become a global sanctuary for seekers, teaching that true happiness lies in "Radha" Nam and the service of Braj.
              </p>
              <p>
                His teachings, widely shared through the <span className="text-[var(--color-saffron)] font-medium">"Bhajanmarg"</span> YouTube channel, focus on the simplicity of devotion and the profound depth of "Hit" (Pure Love), guiding souls away from worldly attachments towards the eternal bliss of the sacred groves of Vrindavan.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
