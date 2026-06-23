import { motion } from 'motion/react';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ activePage, onPageChange }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] px-4 md:px-11 h-[66px] flex items-center justify-between bg-[rgba(255,253,247,0.92)] backdrop-blur-xl border-bottom border-[var(--bdr)] transition-shadow duration-300">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onPageChange('home')}>
        <div className="w-[42px] h-[42px] rounded-full overflow-hidden border-[1.5px] border-[rgba(196,154,42,0.3)] flex items-center justify-center bg-white breathe">
          <img 
            src="https://i.ibb.co/X6Cvvws/file-00000000c2d472088b460f125238e2b2.png" 
            alt="Shri Hit Seva Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <div className="font-display text-[14px] font-medium text-[var(--color-ink)] tracking-wider">Shri Hit Seva</div>
          <div className="font-devanagari text-[11px] text-[var(--color-inmu)] mt-0.5">श्री हित सेवा</div>
        </div>
      </div>
      
      <ul className="hidden md:flex items-center gap-7 list-none">
        {['home', 'vaanis', 'calendar', 'philosophy', 'jap', 'community'].map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`font-body text-[14.5px] tracking-wide relative pb-0.5 cursor-pointer transition-colors duration-300 ${
                activePage === page ? 'text-[var(--color-gdp)]' : 'text-[var(--color-ins)] hover:text-[var(--color-gdp)]'
              }`}
            >
              {page === 'jap' ? 'Naam Jap' : (page === 'vaanis' ? 'Vaani Library' : page.charAt(0).toUpperCase() + page.slice(1))}
              {activePage === page && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-gold)]"
                />
              )}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange('vaanis')}
            className="px-5 py-2 bg-linear-to-br from-[var(--color-honey)] to-[var(--color-petal)] border border-[rgba(196,154,42,0.3)] rounded-full text-[13px] text-[var(--color-inm)] transition-transform hover:-translate-y-0.5 pointer-events-auto cursor-pointer"
          >
            🪷 Explore
          </button>
        </li>
      </ul>
    </nav>
  );
}
