import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenChat: () => void;
}

export default function Home({ onNavigate, onOpenChat }: HomeProps) {
  const [showPetals, setShowPetals] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isIshtImgLoading, setIsIshtImgLoading] = useState(true);
  const [isGuruImgLoading, setIsGuruImgLoading] = useState(true);

  const handlePranam = () => {
    setShowPetals(true);
    setTimeout(() => setShowPetals(false), 3000);
  };

  const acharyaImage = 'https://i.postimg.cc/x82K8p3C/1000051571-removebg-preview.png';
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[calc(100vh-66px)] flex flex-col items-center justify-center text-center px-8 py-15 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(247,232,232,0.7)_0%,transparent_65%),radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(253,243,208,0.5)_0%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[min(68vw,580px)] aspect-square rounded-full border border-[rgba(196,154,42,0.1)] pointer-events-none sspin" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[min(52vw,460px)] aspect-square rounded-full border border-dashed border-[rgba(196,154,42,0.08)] pointer-events-none sspin [animation-duration:70s] [animation-direction:reverse]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 w-[100px] h-[100px] rounded-full mb-8 bg-white border-2 border-[rgba(196,154,42,0.25)] flex items-center justify-center overflow-hidden shadow-[0_0_0_10px_rgba(196,154,42,0.06),0_12px_48px_rgba(196,154,42,0.18)] breathe"
        >
          <img 
            src="https://i.ibb.co/X6Cvvws/file-00000000c2d472088b460f125238e2b2.png" 
            alt="Shri Hit Seva Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.parentElement?.querySelector('.logo-placeholder');
              if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
            }}
          />
          <div className="logo-placeholder absolute inset-0 hidden items-center justify-center bg-[var(--color-honey)]">
            <span className="text-2xl">🪷</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4.5 relative z-10"
        >
          Radhavallabh Sampradaya · Est. 1535 · Vrindavan
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="font-devanagari text-[clamp(17px,3.5vw,25px)] font-light text-[var(--color-gdp)] mb-3.5 leading-relaxed relative z-10"
        >
          श्री राधावल्लभ लाल की जय
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 1 }}
          className="font-display text-[clamp(32px,6vw,70px)] font-normal leading-[1.08] tracking-tight text-[var(--color-ink)] mb-5 relative z-10"
        >
          Where Love is the<br />
          <em className="text-[var(--color-saffron)] not-italic italic">Highest Truth</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 1 }}
          className="text-[clamp(15px,2vw,18px)] font-light leading-loose text-[var(--color-ins)] max-w-[480px] mb-9.5 relative z-10"
        >
          The sweetest, most intimate tradition — Hitopasana, Sahchari Bhav, Nitya Vihar. Shri Radha reigns supreme.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66, duration: 1 }}
          className="flex flex-wrap items-center gap-3.5 justify-center relative z-10"
        >
          <button
            onClick={() => onNavigate('vaanis')}
            className="px-8.5 py-3.5 bg-linear-to-br from-[var(--color-saffron)] to-[var(--color-gold)] text-[var(--color-warm)] border-none rounded-full font-body text-[15px] tracking-wider cursor-pointer shadow-[0_6px_26px_rgba(232,146,74,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(232,146,74,0.45)]"
          >
            🪷 Explore Vaanis
          </button>
          <button
            onClick={() => onNavigate('jap')}
            className="px-8.5 py-3.5 bg-linear-to-br from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] border-none rounded-full font-body text-[15px] tracking-wider cursor-pointer shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
          >
            📿 Naam Jap
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="px-8.5 py-3.5 bg-linear-to-br from-[var(--color-butter)] to-[var(--color-honey)] text-[var(--color-gdp)] border border-[var(--color-gold)] rounded-full font-body text-[15px] tracking-wider cursor-pointer shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
          >
            📅 Divine Calendar
          </button>
          <button
            onClick={() => onNavigate('philosophy')}
            className="px-8 py-3.5 bg-transparent text-[var(--color-ins)] border-[1.5px] border-[rgba(196,154,42,0.35)] rounded-full font-body text-[15px] cursor-pointer transition-all hover:bg-[var(--color-butter)] hover:border-[var(--color-gold)] hover:text-[var(--color-gdp)]"
          >
            Philosophy →
          </button>
          <button
            onClick={onOpenChat}
            className="px-8 py-3.5 bg-linear-to-br from-[var(--color-honey)] to-[var(--color-rose)] text-[var(--color-gold)] border-[1.5px] border-[var(--color-gold)] rounded-full font-body text-[15px] font-medium cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
          >
            ✨ Ask Your Harivanshi
          </button>
        </motion.div>
      </section>

      <div className="overflow-hidden bg-linear-to-r from-[var(--color-honey)] via-[var(--color-petal)] to-[var(--color-honey)] py-3 border-y border-[rgba(196,154,42,0.15)]">
        <div className="flex gap-9 whitespace-nowrap rscroll">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-9">
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">राधावल्लभ <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">हित हरिवंश <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">हित चौरासी <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">युगल सरकार <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">माधुर्य भक्ति <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">सहचरी भाव <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">नित्य विहार <span className="text-[var(--color-gold)] mx-2">✿</span></span>
              <span className="font-devanagari text-[13px] text-[var(--color-inm)] tracking-wider">हितोपासना <span className="text-[var(--color-gold)] mx-2">✿</span></span>
            </div>
          ))}
        </div>
      </div>

      <section className="px-6 py-24 bg-white overflow-hidden">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
          {/* Isht Dev Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
              Our Isht Dev
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
            </div>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] text-[var(--color-ink)] leading-[1.1]">
              Nav Nibhrut Nikunj Vilasi <br />
              <em className="italic text-[var(--color-saffron)]">Shri Hit Radhavallabh</em> Lal Ju Maharaj
            </h2>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[420px] aspect-[4/5] mb-8 group"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(44,26,14,0.18)] border-[14px] border-white bg-[var(--color-warm)] h-full">
              {isIshtImgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-warm)]">
                  <div className="w-10 h-10 border-2 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isIshtImgLoading ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  src="https://i.postimg.cc/pVmNJGx9/IMG-20260412-WA0315.jpg" 
                  alt="Shri Hit Radhavallabh Lal Ju Maharaj"
                  onLoad={() => setIsIshtImgLoading(false)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.parentElement?.querySelector('.img-placeholder');
                    if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                    setIsIshtImgLoading(false);
                  }}
                />
              </AnimatePresence>
              <div className="img-placeholder absolute inset-0 hidden flex-col items-center justify-center bg-[var(--color-honey)] p-8 text-center">
                <span className="text-4xl mb-4">🪷</span>
                <p className="font-devanagari text-[var(--color-gdp)] text-sm">जय श्री राधावल्लभ</p>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(44,26,14,0.15)] to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Orbits */}
            <div className="absolute -inset-10 border border-[rgba(196,154,42,0.08)] rounded-full pointer-events-none sspin [animation-duration:40s]" />
            <div className="absolute -inset-16 border border-dashed border-[rgba(196,154,42,0.05)] rounded-full pointer-events-none sspin [animation-duration:60s] [animation-direction:reverse]" />
          </motion.div>

          {/* Dandavat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePranam}
            className="px-10 py-4 bg-linear-to-r from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] rounded-full text-[15px] tracking-[0.15em] uppercase flex items-center gap-3 shadow-2xl relative overflow-hidden group mb-14"
          >
            <span className="relative z-10">🙏 Dandavat Pranam</span>
            <div className="absolute inset-0 bg-linear-to-r from-[var(--color-saffron)] to-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Mantra */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10"
          >
            <div className="font-devanagari text-[clamp(24px,4vw,36px)] text-[var(--color-ink)] leading-relaxed font-bold">
              ॥ राधावल्लभ श्री हरिवंश ॥
            </div>
            <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mt-6 opacity-30" />
          </motion.div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-[680px] mb-12"
          >
            <p className="text-[16px] font-light leading-relaxed text-[var(--color-ins)]">
              Shri Radhavallabh Lal is the supreme self-manifested (Swayambhu) deity of the Radhavallabh Sampradaya, manifested to the world by Shri Hit Harivansh Mahaprabhu. Residing in the 'Nav Nibhrut Nikunj' of Vrindavan, He represents the unified essence of Shri Radha and Shri Krishna—one soul in two divine forms. Unlike other traditions, here the deity is served in the mood of 'Nitya Vihar,' the eternal and uninterrupted love-play that transcends even the boundaries of the material and celestial realms.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="max-w-[100px] mx-auto h-[1px] bg-linear-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-20 my-12" />

        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
          {/* 1. Heading */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
              Our Founder & Acharya
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
            </div>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] text-[var(--color-ink)] leading-[1.1]">
              Shri Hit <em className="italic text-[var(--color-saffron)]">Harivansh Chandra</em> Mahaprabhu
            </h2>
          </motion.div>

          {/* 2. Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[420px] aspect-[4/5] mb-8 group"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(44,26,14,0.18)] border-[14px] border-white bg-[var(--color-warm)] h-full">
              {isImgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-warm)]">
                  <div className="w-10 h-10 border-2 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin" />
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
                    target.style.display = 'none';
                    const placeholder = target.parentElement?.querySelector('.img-placeholder');
                    if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                    setIsImgLoading(false);
                  }}
                />
              </AnimatePresence>
              <div className="img-placeholder absolute inset-0 hidden flex-col items-center justify-center bg-[var(--color-honey)] p-8 text-center">
                <span className="text-4xl mb-4">🪷</span>
                <p className="font-devanagari text-[var(--color-gdp)] text-sm">जय श्री हरिवंश</p>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(44,26,14,0.15)] to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Orbits */}
            <div className="absolute -inset-10 border border-[rgba(196,154,42,0.08)] rounded-full pointer-events-none sspin [animation-duration:40s]" />
            <div className="absolute -inset-16 border border-dashed border-[rgba(196,154,42,0.05)] rounded-full pointer-events-none sspin [animation-duration:60s] [animation-direction:reverse]" />
            
            {/* Glows */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--color-saffron)] opacity-10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[var(--color-gold)] opacity-10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          </motion.div>

          {/* 3. Dandavat Button (Moved here) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePranam}
            className="px-10 py-4 bg-linear-to-r from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] rounded-full text-[15px] tracking-[0.15em] uppercase flex items-center gap-3 shadow-2xl relative overflow-hidden group mb-14"
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10"
          >
            <div className="font-devanagari text-[clamp(20px,3vw,28px)] text-[var(--color-ink)] leading-relaxed font-medium italic">
              प्रेमानन्दोत्पुलकित गात्रौ विद्युद्धाराधर सम कान्ति: ।<br />
              राधा कृष्णौ मनसि दधानं वन्देहं श्रीहित हरिवंशम् ॥
            </div>
            <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mt-6 opacity-30" />
          </motion.div>

          {/* 5. Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-[680px] mb-12"
          >
            <p className="text-[16px] font-light leading-relaxed text-[var(--color-ins)]">
              The incarnation of Shri Krishna's flute (Murali Avtar), who established the Radhavallabh Sampradaya in 1535. He taught the path of "Hit" (Pure Love) and "Nitya Vihar" — the eternal, selfless love play of Shri Radha and Shri Krishna.
            </p>
          </motion.div>

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
        </div>

        {/* Divider */}
        <div className="max-w-[100px] mx-auto h-[1px] bg-linear-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-20 my-12" />

        {/* Sadhguru Section */}
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center pb-12">
          {/* 1. Heading */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
              Our Shri Sadhguru Dev Bhagwan
              <span className="w-8 h-[1px] bg-[var(--color-gold)] opacity-30"></span>
            </div>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] text-[var(--color-ink)] leading-[1.1]">
              Shri Hit Govind Sharan <em className="italic text-[var(--color-saffron)]">Premanand ji</em> Maharaj
            </h2>
          </motion.div>

          {/* 2. Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[420px] aspect-[4/5] mb-8 group"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(44,26,14,0.18)] border-[14px] border-white bg-[var(--color-warm)] h-full">
              {isGuruImgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-warm)]">
                  <div className="w-10 h-10 border-2 border-[var(--color-saffron)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isGuruImgLoading ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  src="https://i.postimg.cc/MKcWXZXY/IMG-20260412_195218.jpg" 
                  alt="Shri Hit Govind Sharan Premanand ji Maharaj"
                  onLoad={() => setIsGuruImgLoading(false)}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.parentElement?.querySelector('.img-placeholder');
                    if (placeholder) (placeholder as HTMLElement).style.display = 'flex';
                    setIsGuruImgLoading(false);
                  }}
                />
              </AnimatePresence>
              <div className="img-placeholder absolute inset-0 hidden flex-col items-center justify-center bg-[var(--color-honey)] p-8 text-center">
                <span className="text-4xl mb-4">🪷</span>
                <p className="font-devanagari text-[var(--color-gdp)] text-sm">जय श्री राधावल्लभ</p>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(44,26,14,0.15)] to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Orbits */}
            <div className="absolute -inset-10 border border-[rgba(196,154,42,0.08)] rounded-full pointer-events-none sspin [animation-duration:40s]" />
            <div className="absolute -inset-16 border border-dashed border-[rgba(196,154,42,0.05)] rounded-full pointer-events-none sspin [animation-duration:60s] [animation-direction:reverse]" />
          </motion.div>

          {/* 3. Dandavat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePranam}
            className="px-10 py-4 bg-linear-to-r from-[var(--color-ink)] to-[var(--color-inm)] text-[var(--color-warm)] rounded-full text-[15px] tracking-[0.15em] uppercase flex items-center gap-3 shadow-2xl relative overflow-hidden group mb-14"
          >
            <span className="relative z-10">🙏 Dandavat Pranam</span>
            <div className="absolute inset-0 bg-linear-to-r from-[var(--color-saffron)] to-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* 4. Mantra */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10"
          >
            <div className="font-devanagari text-[clamp(18px,2.5vw,24px)] text-[var(--color-ink)] leading-relaxed font-medium italic">
              गुरु कृपाल हितरूप वपु, करिहैं सुमति-प्रकाश।<br />
              हैं समरथ मो सिर धनी, पुजवेंगे सब आस ॥<br />
              वरनौं मंगल नाम-गुन, अग्या इनकी पाइ।<br />
              लोचन-हीनैं देत ज्यौं, समरथ पन्थ बताइ ॥
            </div>
            <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mt-6 opacity-30" />
          </motion.div>

          {/* 5. Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-[720px]"
          >
            <div className="space-y-4 text-[16px] font-light leading-relaxed text-[var(--color-ins)]">
              <p>
                A revered Rasik Saint of Vrindavan, Shri Hit Premanand Govind Sharan ji Maharaj is a living embodiment of "Radha Vallabh" devotion. His life is a profound testament to the power of "Nam Jap" and the miraculous Grace of Shriji.
              </p>
              <p>
                Despite both his kidneys having failed over 15 years ago, Maharaj ji continues his intense spiritual routine—including midnight parikramas and daily satsangs—solely by the strength of his devotion. He often says, "This body is sustained by the will of Shri Radha."
              </p>
              <p>
                Through his YouTube channel <span className="text-[var(--color-saffron)] font-medium">"Bhajanmarg"</span>, he guides millions towards the path of selfless love (Nishkam Bhakti), emphasizing character building and the eternal "Nitya Vihar" of the Divine Couple.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="max-w-[100px] mx-auto h-[1px] bg-linear-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-20 my-12" />
      </section>

      <section className="px-11 py-18 bg-[var(--color-cream)]">
        <div className="text-center mb-13">
          <div className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--color-gold)] flex items-center gap-2 justify-center mb-3">
            <span className="text-[8px]">✦</span> What's Inside
          </div>
          <h2 className="font-display text-[clamp(24px,4vw,42px)] text-[var(--color-ink)] tracking-tight">
            A Complete <em className="italic text-[var(--color-saffron)]">Spiritual Sanctuary</em>
          </h2>
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4.5 max-w-[1060px] mx-auto">
          {[
            { id: 'mangalacharan', icon: '🙏', title: 'Mangalacharan', desc: '4 sacred invocatory shlokas — fully extracted with meanings.', badge: '4 Shlokas ✓' },
            { id: 'yamunashtaka', icon: '🌊', title: 'Shri Yamunashtaka', desc: 'All 9 shlokas glorifying Shri Yamuna — with refrain & full meanings.', badge: '9 Shlokas ✓' },
            { id: 'yugaldhyan', icon: '🧘', title: 'Yugal Dhyan', desc: '20 beautiful verses of Yugal Swaroop meditation — fully integrated.', badge: '20 Verses ✓' },
            { id: 'bhaktnaamvali', icon: '📿', title: 'Bhakt Naamvali', desc: '22 verses naming sacred devotees across all traditions.', badge: '22 Verses ✓' },
            { id: 'calendar', icon: '📅', title: 'Divine Calendar', desc: 'Complete Vaishnav Utsav Nirnay Patrika for the year 2026.', badge: 'Utsavs ✓' }
          ].map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onNavigate(feat.id === 'calendar' ? 'calendar' : 'vaanis')}
              className="bg-[var(--color-warm)] border border-[var(--bdr)] rounded-[18px] p-7 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_14px_44px_rgba(196,154,42,0.11)] hover:border-[var(--bdrS)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[var(--color-honey)] to-[var(--color-rose)] border border-[var(--bdr)] flex items-center justify-center text-[22px] mb-3.5 transition-transform duration-300 group-hover:scale-110">
                {feat.icon}
              </div>
              <div className="font-display text-[17px] text-[var(--color-ink)] mb-1.5">{feat.title}</div>
              <p className="text-[13.5px] font-light text-[var(--color-ins)] leading-relaxed mb-3">
                {feat.desc}
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] bg-[rgba(196,154,42,0.1)] text-[var(--color-gdp)] border border-[rgba(196,154,42,0.18)]">
                {feat.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
