import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Award, Play, Pause, Flame } from 'lucide-react';

export default function JapCounter() {
  const [count, setCount] = useState(0);
  const [totalMalas, setTotalMalas] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false);
  const [showMalaComplete, setShowMalaComplete] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeName, setActiveName] = useState('Shri Radha');
  
  const MALA_SIZE = 108;

  const names = [
    'Shri Radha',
    'Shri Harivansh',
    'Radha Vallabh',
    'Shyama Shyam'
  ];

  const handleIncrement = () => {
    if (count + 1 === MALA_SIZE) {
      setCount(0);
      setTotalMalas(prev => prev + 1);
      setShowMalaComplete(true);
      // Increased time for the "Victory Celebration"
      setTimeout(() => setShowMalaComplete(false), 8000);
    } else {
      setCount(prev => prev + 1);
    }
    
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 100);
  };

  const blessings = [
    "Shriji is pleased with your constant remembrance.",
    "May your heart be filled with the Nectar of Vraj.",
    "The Divine Couple's Grace is raining upon you.",
    "Your devotion is a fragrant flower at Her Lotus Feet.",
    "Shri Harivansh Mahaprabhu's blessings are with you.",
    "May you forever reside in the shade of the Nikunj."
  ];

  const [currentBlessing, setCurrentBlessing] = useState(blessings[0]);

  useEffect(() => {
    if (showMalaComplete) {
      setCurrentBlessing(blessings[Math.floor(Math.random() * blessings.length)]);
    }
  }, [showMalaComplete]);

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setCount(0);
    setShowResetConfirm(false);
  };

  const calculateProgress = () => {
    return (count / MALA_SIZE) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background Zen Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-honey)]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <div className="font-body text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
          Sadhana Tool
        </div>
        <h1 className="font-display text-[clamp(28px,6vw,42px)] text-[var(--color-ink)] mb-4">
          Naam <em className="italic text-[var(--color-saffron)]">Jap</em>
        </h1>
        <div className="flex gap-2 justify-center flex-wrap">
          {names.map(name => (
            <button
              key={name}
              onClick={() => setActiveName(name)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                activeName === name 
                  ? 'bg-[var(--color-gold)] text-white shadow-md' 
                  : 'bg-white/50 text-[var(--color-ins)] border border-[rgba(196,154,42,0.2)] hover:border-[var(--color-gold)]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Stairs Animation Section */}
      <div className="w-full max-w-[620px] h-[340px] relative mb-12 bg-linear-to-b from-[#FFF5E6] to-[#FFF9F2] backdrop-blur-md rounded-[40px] border-2 border-[var(--color-honey)] overflow-hidden shadow-2xl group">
        {/* Vrindavan Background Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Govardhan Silhouettes */}
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 600 300" preserveAspectRatio="none">
            <path d="M0,300 L0,250 Q100,200 200,250 T400,220 T600,260 L600,300 Z" fill="var(--color-ink)" />
          </svg>
          
          {/* Yamuna River with better waves */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-[var(--color-honey)]/30 to-transparent">
            <svg className="w-full h-full opacity-40" viewBox="0 0 600 100" preserveAspectRatio="none">
              <motion.path 
                d="M0 50 C 150 100 450 0 600 50 L 600 100 L 0 100 Z" 
                fill="var(--color-saffron)"
                animate={{ d: ["M0 50 C 150 100 450 0 600 50 L 600 100 L 0 100 Z", "M0 50 C 150 0 450 100 600 50 L 600 100 L 0 100 Z"] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
            </svg>
          </div>
          
          {/* Trees (Kunj) */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-12 left-8 text-5xl opacity-20 filter blur-[1px]"
          >
            🌳
          </motion.div>
          <motion.div 
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute top-24 right-16 text-6xl opacity-15 filter blur-[2px]"
          >
            🌳
          </motion.div>
        </div>
        
        {/* Stairs Path Visualization */}
        <div className="absolute inset-0 flex items-end justify-start p-10">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
            {/* The Stairs Structure */}
            {[...Array(12)].map((_, i) => {
              const xStart = 10 + (i * (350 / 11));
              const yStart = 185 - (i * (155 / 11));
              return (
                <g key={i}>
                  <rect 
                    x={xStart} 
                    y={yStart} 
                    width={25} 
                    height={8} 
                    fill="rgba(196,154,42,0.2)" 
                    rx="2"
                    stroke="var(--color-gold)"
                    strokeWidth="0.5"
                    className="opacity-60"
                  />
                  {/* Glowing step if devotee is near */}
                  {Math.abs(count - (i * 9)) < 10 && (
                    <motion.rect 
                      x={xStart} y={yStart} width={25} height={8} fill="var(--color-gold)" rx="2"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </g>
              );
            })}
            
            {/* Path Guide */}
            <path 
              d="M 22 185 L 372 30" 
              stroke="var(--color-gold)" 
              strokeWidth="0.5" 
              strokeDasharray="2 4" 
              fill="none" 
              className="opacity-10"
            />

            {/* Destination: The Radiant Kunj Gate - Positioned at the TOP RIGHT end of stairs */}
            <motion.g 
              animate={{ 
                scale: count > 100 ? [1, 1.2, 1] : 1,
                filter: count > 100 ? ["drop-shadow(0 0 5px gold)", "drop-shadow(0 0 20px gold)"] : "none"
              }}
              transition={{ repeat: Infinity, duration: 1 }}
              transform="translate(380, 25)"
            >
              {/* Gate Structure */}
              <path d="M -25 20 L -25 -10 Q 0 -40 25 -10 L 25 20" fill="white" stroke="var(--color-gold)" strokeWidth="2" className="opacity-90" />
              <motion.text 
                y="-12" textAnchor="middle" 
                className="font-devanagari text-[12px] fill-[var(--color-saffron)] font-bold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                श्री राधा
              </motion.text>
              <text y="5" textAnchor="middle" className="text-[20px]">🪷</text>
              
              {/* Divine Light Beams (Only near end) */}
              {count > 90 && [...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="0" y1="-10" x2={Math.cos(i * (Math.PI / 4)) * 50} y2={Math.sin(i * (Math.PI / 4)) * 50}
                  stroke="var(--color-gold)"
                  strokeWidth="1"
                  animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                />
              ))}
            </motion.g>

            {/* Stickman Walker */}
            <motion.g
              animate={{ 
                x: 22 + (count / MALA_SIZE) * 350,
                y: 185 - (count / MALA_SIZE) * 155
              }}
              transition={{ type: 'spring', stiffness: 45, damping: 18 }}
            >
              {/* Walking Stickman */}
              <motion.g
                animate={{ 
                  rotate: isVibrating ? [-8, 12, 0] : [0, 2, 0],
                  y: isVibrating ? -4 : 0
                }}
                transition={{ duration: 0.12 }}
              >
                {/* Glow under feet on tap */}
                {isVibrating && (
                  <motion.circle 
                    r="8" fill="var(--color-gold)" 
                    initial={{ opacity: 0.8, scale: 0 }}
                    animate={{ opacity: 0, scale: 2 }}
                    className="pointer-events-none"
                  />
                )}

                {/* Body & Prayer Pose */}
                <path d="M -4 -12 L 4 -12 L 6 0 L -6 0 Z" fill="var(--color-saffron)" className="opacity-40" />
                <circle cx="0" cy="-28" r="4.5" fill="var(--color-ink)" />
                <line x1="0" y1="-24" x2="0" y2="-12" stroke="var(--color-ink)" strokeWidth="2.5" />
                
                {/* Joined Hands (Anjali) */}
                <path d="M 0 -18 L -5 -23 M 0 -18 L 5 -23" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="0" cy="-22" r="1.5" fill="var(--color-ink)" />

                {/* Animated Legs */}
                <motion.line 
                  x1="0" y1="-12" x2="-6" y2="0" 
                  stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round"
                  animate={{ x2: isVibrating ? -10 : -6 }}
                />
                <motion.line 
                  x1="0" y1="-12" x2="6" y2="0" 
                  stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round"
                  animate={{ x2: isVibrating ? 10 : 6 }}
                />
                
                {/* Rising Mantra Text */}
                <AnimatePresence>
                  {isVibrating && (
                    <motion.text
                      initial={{ opacity: 0, y: -35, scale: 0.5 }}
                      animate={{ opacity: 1, y: -65, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      textAnchor="middle"
                      className="font-devanagari text-[11px] fill-[var(--color-gold)] font-bold pointer-events-none"
                    >
                      {activeName.split(' ')[0]}
                    </motion.text>
                  )}
                </AnimatePresence>
              </motion.g>
            </motion.g>
          </svg>
        </div>

        {/* Milestone Progress Bar (The Path to Goal) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-black/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-linear-to-r from-[var(--color-gold)] to-[var(--color-saffron)] shadow-[0_0_10px_rgba(196,154,42,0.5)]"
            animate={{ width: `${calculateProgress()}%` }}
          />
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-[0.3em] uppercase text-[var(--color- gold)] flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-[var(--color-saffron)] rounded-full animate-ping" />
          The Path of Nitya Vihar
        </div>
      </div>



      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
        {/* Progress Ring Background */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className="fill-none stroke-[rgba(196,154,42,0.1)] stroke-[12]"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            className="fill-none stroke-[var(--color-gold)] stroke-[12]"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: `${calculateProgress() * 10} 1000` }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
        </svg>

        {/* The Action Button */}
        <motion.button
          onClick={handleIncrement}
          whileTap={{ scale: 0.92 }}
          className={`relative z-20 w-56 h-56 rounded-full bg-white shadow-[0_15px_45px_rgba(196,154,42,0.15)] border border-[rgba(196,154,42,0.2)] flex flex-col items-center justify-center group overflow-hidden ${
            isVibrating ? 'animate-shake' : ''
          }`}
        >
          {/* Inner Glow Pulse */}
          <div className="absolute inset-0 bg-linear-to-b from-[var(--color-honey)]/10 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeName}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="font-devanagari text-[28px] text-[var(--color-saffron)] mb-1"
            >
              {activeName === 'Shri Radha' ? 'श्री राधा' : 
               activeName === 'Shri Harivansh' ? 'श्री हरिवंश' : 
               activeName === 'Radha Vallabh' ? 'राधा वल्लभ' : 'श्यामा श्याम'}
            </motion.div>
          </AnimatePresence>
          
          <div className="font-display text-[48px] text-[var(--color-ink)] leading-none mb-1">
            {count}
          </div>
          <div className="font-body text-[12px] tracking-widest uppercase text-[var(--color- gold)] opacity-60">
            / {MALA_SIZE}
          </div>

          <div className="absolute bottom-6 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
            Tap to Chant
          </div>
        </motion.button>

        {/* Bead Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full bg-[var(--color-gold)] shadow-lg z-30"
            style={{ 
              transform: `translateX(-50%) translateY(-50%) rotate(${count * (360/MALA_SIZE)}deg)`,
              transformOrigin: '50% 160px'
            }}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-8 relative z-10">
        <div className="text-center group">
          <div className="flex items-center justify-center gap-2 text-[var(--color-saffron)] mb-1">
            <Award className="w-5 h-5" />
            <span className="font-display text-[24px]">{totalMalas}</span>
          </div>
          <div className="font-body text-[11px] tracking-widest uppercase text-[var(--color-inmu)]">
            Total Malas
          </div>
        </div>

        <div className="h-10 w-[1px] bg-[rgba(196,154,42,0.2)]" />

        <button 
          onClick={handleReset}
          className="p-3 rounded-full bg-white border border-[rgba(196,154,42,0.2)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all shadow-sm active:scale-90"
          title="Reset Mala"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[32px] p-8 max-w-[340px] w-full text-center shadow-2xl border border-[var(--color-honey)]"
            >
              <div className="w-16 h-16 bg-[var(--color-honey)]/30 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ⚠️
              </div>
              <h3 className="font-display text-[22px] text-[var(--color-ink)] mb-3">Reset Counting?</h3>
              <p className="font-body text-[14px] text-[var(--color-ins)] mb-8 leading-relaxed">
                Are you sure you want to reset your current Mala count to zero?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 px-6 rounded-full border border-[var(--color-gold)]/20 text-[var(--color-gold)] font-medium hover:bg-[var(--color-honey)]/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmReset}
                  className="flex-1 py-3 px-6 rounded-full bg-[var(--color-saffron)] text-white font-medium shadow-lg shadow-[var(--color-saffron)]/20 hover:brightness-110 transition-all"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divine Reward / Mala Completion Celebration */}
      <AnimatePresence>
        {showMalaComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-linear-to-b from-[rgba(196,154,42,0.95)] via-[rgba(232,146,74,0.98)] to-[rgba(44,26,14,0.95)] backdrop-blur-md overflow-hidden"
          >
            {/* Massive Petal Rain */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -100, 
                    x: Math.random() * 120 - 10,
                    rotate: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: ['0vh', '110vh'],
                    x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                    rotate: 720,
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "linear"
                  }}
                  className="absolute text-3xl"
                >
                  {['🌸', '🪷', '✨', '💐'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </div>

            {/* Glowing Aura Sunburst */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 0.2 }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[150px] pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative z-10 max-w-[500px] w-full bg-[rgba(255,253,247,0.15)] backdrop-blur-xl border border-white/30 rounded-[60px] p-12 text-center shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
            >
              {/* Victory Symbol */}
              <div className="relative mb-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(255,255,255,0.5)] border-4 border-[var(--color-gold)]"
                >
                  📿
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-0 -m-4 border-2 border-dashed border-white/50 rounded-full"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="font-devanagari text-[32px] text-white mb-2 leading-tight">
                  ॥ श्रीजी की बड़ी कृपा ॥
                </div>
                <h2 className="font-display text-[44px] text-white leading-none mb-6">
                  Mala <em className="italic text-[var(--color-honey)]">Complete!</em>
                </h2>
                
                <div className="w-16 h-[2px] bg-white/40 mx-auto mb-8" />

                <div className="font-body text-[14px] text-white/90 leading-relaxed max-w-[280px] mx-auto mb-10 italic">
                  "{currentBlessing}"
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="px-10 py-4 bg-white text-[var(--color-ink)] rounded-full font-body text-[14px] tracking-widest uppercase flex items-center gap-3 shadow-xl">
                    <Award className="w-5 h-5 text-[var(--color-gold)]" />
                    Total Malas: {totalMalas}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMalaComplete(false)}
                    className="text-white/60 text-[12px] uppercase tracking-[0.2em] mt-4 hover:text-white transition-colors"
                  >
                    Tap to Continue Sadhana
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Radiant Orbits */}
            <div className="absolute inset-0 sspin [animation-duration:120s] opacity-20">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] aspect-square border border-white/30 rounded-full" />
            </div>
            <div className="absolute inset-0 sspin [animation-duration:90s] [animation-direction:reverse] opacity-10">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] aspect-square border border-dashed border-white/30 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(0.98) rotate(1deg); }
          75% { transform: scale(0.98) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
