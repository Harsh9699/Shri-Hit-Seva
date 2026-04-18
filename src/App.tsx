/**
 * ॥ श्री राधावल्लभ श्री हरिवंश ॥
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import VaaniLibrary from './components/VaaniLibrary';
import JapCounter from './components/JapCounter';
import UtsavCalendar from './components/UtsavCalendar';
import Philosophy from './components/Philosophy';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="flex-1 pt-[66px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {activePage === 'home' && (
              <Home 
                onNavigate={setActivePage} 
                onOpenChat={() => setIsChatOpen(true)} 
              />
            )}
            {activePage === 'vaanis' && <VaaniLibrary />}
            {activePage === 'calendar' && <UtsavCalendar />}
            {activePage === 'jap' && <JapCounter />}
            {activePage === 'philosophy' && <Philosophy />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={setActivePage} />
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}

