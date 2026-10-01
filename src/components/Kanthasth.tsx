import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, CheckCircle, Target, ChevronRight, RefreshCw, X, PlayCircle } from 'lucide-react';
import { HIT_CHAURASI_VAANIS } from '../constants/hitchaurasi';
import { SHRI_HIT_MANGAL_GAAN_VAANIS } from '../constants/mangalgann';
import { VAANI_SECTIONS } from '../constants/vaanis';
import { Vaani } from '../types';

interface SyllabusItem {
  id: string;
  title: string;
  category: string;
  data: Vaani | any;
}

export default function Kanthasth() {
  const { language } = useLanguage();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [activeItem, setActiveItem] = useState<SyllabusItem | null>(null);
  const [mode, setMode] = useState<'menu' | 'blanks' | 'reveal' | 'scramble'>('menu');

  const syllabus = useMemo<SyllabusItem[]>(() => {
    const mangalacharan = VAANI_SECTIONS?.find(s => s.id === 'mangalacharan')?.vaanis || [];
    const chaturasiFirst12 = HIT_CHAURASI_VAANIS?.slice(0, 12) || [];
    const mangalGaan = SHRI_HIT_MANGAL_GAAN_VAANIS || [];
    
    // Find Ishtaradhan Prakaran from Sevak Vani section
    const sevakVaniSection = VAANI_SECTIONS?.find(s => s.id === 'sevakvani');
    const ishtaradhan = sevakVaniSection?.subSections?.find(ss => ss.id === 'sv_chap5')?.vaanis || [];

    return [
      ...mangalacharan.map(v => ({ id: v.id, title: v.title, category: 'Manglacharan', data: v })),
      ...ishtaradhan.map(v => ({ id: v.id, title: v.title, category: 'Ishtaradhan Prakaran', data: v })),
      ...chaturasiFirst12.map(v => ({ id: v.id, title: v.title, category: 'Shri Hit Chaturasi', data: v })),
      ...mangalGaan.map(v => ({ id: v.id, title: v.title, category: 'Mangal Gaan', data: v }))
    ];
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('kanthasth_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (id: string, score: number) => {
    const newProgress = { ...progress, [id]: Math.max(progress[id] || 0, score) };
    setProgress(newProgress);
    localStorage.setItem('kanthasth_progress', JSON.stringify(newProgress));
  };

  if (activeItem && mode !== 'menu') {
    return <PracticeEngine item={activeItem} mode={mode} onBack={() => setMode('menu')} onComplete={(score) => saveProgress(activeItem.id, score)} language={language} />;
  }

  // Group syllabus by category
  const grouped = syllabus.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SyllabusItem[]>);

  return (
    <div className="min-h-screen pt-[86px] pb-20 px-6 bg-[#0B192C]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-[var(--color-dawn-gold)]">
            <BookOpen size={28} />
          </div>
          <h1 className="font-display text-3xl text-white mb-2">{language === 'hi' ? 'कंठस्थ (दीक्षा तैयारी)' : 'Kanthasth (Diksha Prep)'}</h1>
          <p className="text-white/60 font-body text-lg">Master the sacred Vaanis required for Diksha</p>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => {
            const categoryProgress = items.reduce((sum, item) => sum + (progress[item.id] || 0), 0) / items.length;
            
            return (
              <div key={category} className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-[var(--color-dawn-gold)] transition-all duration-1000" style={{width: `${categoryProgress}%`}} />
                
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="font-bold text-xl text-white mb-1">{category}</h2>
                    <p className="text-sm text-white/50">{items.length} Parts</p>
                  </div>
                  <div className="text-[var(--color-dawn-gold)] font-bold">{Math.round(categoryProgress)}%</div>
                </div>

                <div className="space-y-3">
                  {items.map(item => {
                    const itemProg = progress[item.id] || 0;
                    return (
                      <div key={item.id} className="bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${itemProg === 100 ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                            {itemProg === 100 ? <CheckCircle size={16} /> : <Target size={16} />}
                          </div>
                          <div>
                            <h3 className="font-bold text-white/90">{item.title}</h3>
                            {itemProg > 0 && <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden"><div className="h-full bg-[var(--color-dawn-gold)]" style={{width: `${itemProg}%`}}/></div>}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => { setActiveItem(item); setMode('reveal'); }} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors">Line Reveal</button>
                          <button onClick={() => { setActiveItem(item); setMode('blanks'); }} className="px-3 py-1.5 rounded-lg bg-[var(--color-dawn-gold)] hover:brightness-110 text-black text-xs font-bold transition-colors">Fill Blanks</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PracticeEngine({ item, mode, onBack, onComplete, language }: { item: SyllabusItem, mode: 'blanks' | 'reveal' | 'scramble', onBack: () => void, onComplete: (score: number) => void, language: string }) {
  const fullText = item.data.text as string;
  const lines = fullText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  return (
    <div className="min-h-screen pt-[86px] pb-20 px-6 bg-[#0B192C]">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <X size={20} /> Exit Practice
          </button>
          <div className="text-[var(--color-dawn-gold)] font-bold text-sm tracking-widest uppercase">
            {mode === 'blanks' ? 'Fill in the Blanks' : 'Line-by-Line Reveal'}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="font-display text-2xl text-white mb-2">{item.title}</h2>
          <p className="text-white/50 text-sm">{item.category}</p>
        </div>

        {mode === 'reveal' && <RevealMode lines={lines} onComplete={onComplete} language={language} />}
        {mode === 'blanks' && <BlanksMode fullText={fullText} onComplete={onComplete} language={language} />}
      </div>
    </div>
  );
}

function RevealMode({ lines, onComplete, language }: { lines: string[], onComplete: (score: number) => void, language: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = (knewIt: boolean) => {
    if (knewIt) setScore(s => s + 1);
    
    if (currentIndex === lines.length - 1) {
      const finalScore = Math.round(((score + (knewIt ? 1 : 0)) / lines.length) * 100);
      onComplete(finalScore);
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setRevealed(false);
    }
  };

  if (finished) return <CompletionScreen score={Math.round((score / lines.length) * 100)} language={language} onBack={() => {}} />;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col justify-center">
      <div className="text-sm text-white/40 mb-8">Line {currentIndex + 1} of {lines.length}</div>
      
      {currentIndex > 0 && (
        <div className="text-white/30 text-lg mb-8 italic">
          "{lines[currentIndex - 1]}"
        </div>
      )}
      
      {!revealed ? (
        <div>
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/20">
            <PlayCircle size={32} />
          </div>
          <p className="text-white/60 mb-8 text-lg">Try to recall the next line...</p>
          <button onClick={() => setRevealed(true)} className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">
            Tap to Reveal
          </button>
        </div>
      ) : (
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}>
          <div className="text-[var(--color-dawn-gold)] font-devanagari text-2xl mb-10 leading-relaxed">
            {lines[currentIndex]}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => handleNext(false)} className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors">
              Forgot it
            </button>
            <button onClick={() => handleNext(true)} className="px-6 py-3 rounded-xl bg-green-500/20 text-green-400 font-bold hover:bg-green-500/30 transition-colors">
              I Knew It!
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BlanksMode({ fullText, onComplete, language }: { fullText: string, onComplete: (score: number) => void, language: string }) {
  const words = fullText.split(/([ \n,।])/g);
  
  const [blanks, setBlanks] = useState<{index: number, word: string, filledWith: string | null}[]>([]);
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [activeBlankIndex, setActiveBlankIndex] = useState<number | null>(null);

  useEffect(() => {
    const candidates = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i].trim().length > 2) candidates.push(i);
    }
    
    const numToHide = Math.max(1, Math.floor(candidates.length * 0.25));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const selectedIndices = shuffled.slice(0, numToHide).sort((a, b) => a - b);
    
    const newBlanks = selectedIndices.map(i => ({ index: i, word: words[i], filledWith: null }));
    setBlanks(newBlanks);
    setWordBank([...newBlanks.map(b => b.word)].sort(() => 0.5 - Math.random()));
    
    if (newBlanks.length > 0) {
      setActiveBlankIndex(newBlanks[0].index);
    }
  }, [fullText]);

  const handleWordSelect = (word: string) => {
    if (activeBlankIndex === null) return;
    
    const targetIdx = blanks.findIndex(b => b.index === activeBlankIndex);
    if (targetIdx === -1) return;

    const newBlanks = [...blanks];
    newBlanks[targetIdx].filledWith = word;
    setBlanks(newBlanks);

    // Auto-advance to the next empty blank
    const nextEmpty = newBlanks.find(b => b.filledWith === null);
    setActiveBlankIndex(nextEmpty ? nextEmpty.index : null);
  };

  const handleUndo = (blankIndex: number) => {
    const targetIdx = blanks.findIndex(b => b.index === blankIndex);
    if (targetIdx === -1) return;

    const newBlanks = [...blanks];
    newBlanks[targetIdx].filledWith = null;
    setBlanks(newBlanks);
    setActiveBlankIndex(blankIndex);
  };

  const checkAnswer = () => {
    let currentMistakes = 0;
    const newBlanks = blanks.map(b => {
      if (b.filledWith !== b.word) {
        currentMistakes++;
        return { ...b, filledWith: null };
      }
      return b;
    });

    setMistakes(m => m + currentMistakes);
    
    if (currentMistakes === 0) {
      const finalScore = Math.max(10, 100 - (mistakes * 10));
      onComplete(finalScore);
      setFinished(true);
    } else {
      setBlanks(newBlanks);
      // Reset active blank to the first wrong one
      const firstWrong = newBlanks.find(b => b.filledWith === null);
      if (firstWrong) setActiveBlankIndex(firstWrong.index);
    }
  };

  const allFilled = blanks.every(b => b.filledWith !== null);
  const unusedWords = [...wordBank];
  blanks.forEach(b => {
    if (b.filledWith) {
      const idx = unusedWords.indexOf(b.filledWith);
      if (idx !== -1) {
        unusedWords.splice(idx, 1);
      }
    }
  });

  if (finished) return <CompletionScreen score={Math.max(10, 100 - (mistakes * 10))} language={language} onBack={() => {}} />;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="text-white/50 text-sm mb-4 text-center">Tap a blank space to select it, then choose a word from below.</div>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex-grow overflow-y-auto mb-6">
        <div className="font-devanagari text-xl leading-relaxed text-white/90">
          {words.map((w, i) => {
            const blank = blanks.find(b => b.index === i);
            if (blank) {
              const isActive = activeBlankIndex === blank.index;
              if (blank.filledWith) {
                return (
                  <span 
                    key={i} 
                    onClick={() => handleUndo(blank.index)} 
                    className={`inline-block px-3 py-1 mx-1 rounded text-black font-bold cursor-pointer transition-all shadow-sm ${isActive ? 'bg-yellow-100 ring-2 ring-white scale-110' : 'bg-[var(--color-dawn-gold)]'}`}
                  >
                    {blank.filledWith}
                  </span>
                );
              }
              return (
                <span 
                  key={i} 
                  onClick={() => setActiveBlankIndex(blank.index)}
                  className={`inline-block px-6 py-1 mx-1 rounded cursor-pointer transition-all border ${isActive ? 'bg-white/20 border-white text-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black/40 border-white/30 border-dashed text-transparent'}`}
                >
                  {isActive ? '?' : '__'}
                </span>
              );
            }
            if (w === '\n') return <br key={i} />;
            return <span key={i}>{w}</span>;
          })}
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
        {allFilled ? (
          <button onClick={checkAnswer} className="w-full py-4 rounded-xl bg-[var(--color-dawn-gold)] text-black font-bold text-lg hover:brightness-110">
            Check Answer
          </button>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {unusedWords.map((w, i) => (
              <button key={i} onClick={() => handleWordSelect(w)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/5">
                {w}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CompletionScreen({ score, language, onBack }: { score: number, language: string, onBack: () => void }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center min-h-[400px] flex flex-col justify-center items-center">
      <div className="w-24 h-24 rounded-full bg-[var(--color-dawn-gold)]/20 flex items-center justify-center mb-6 text-[var(--color-dawn-gold)]">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-3xl font-display text-white mb-2">Practice Complete!</h2>
      <p className="text-white/60 mb-8">You scored {score}% accuracy.</p>
      {score === 100 && <div className="text-[var(--color-dawn-gold)] font-bold mb-8">Perfect Memory! 🪷</div>}
    </div>
  );
}
