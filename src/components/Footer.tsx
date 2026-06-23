export default function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-[var(--color-ink)] px-11 py-14 grid grid-cols-1 md:grid-cols-3 gap-11">
      <div>
        <div className="font-display text-[16px] text-[rgba(255,253,247,0.9)] mb-1.5">Shri Hit Seva</div>
        <div className="font-devanagari text-[12px] text-[rgba(196,154,42,0.5)] mb-4.5">श्री हित सेवा 🪷</div>
        <div className="text-[13px] font-light text-[rgba(255,255,255,0.3)] leading-relaxed">
          The complete sacred library of the Radhavallabh Sampradaya — rooted in Vrindavan.
        </div>
      </div>
      
      <div>
        <div className="font-body text-[11px] tracking-widest uppercase text-[rgba(196,154,42,0.6)] mb-4">Navigate</div>
        <ul className="flex flex-col gap-2.5 list-none">
          <li><button onClick={() => onNavigate('home')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Home</button></li>
          <li><button onClick={() => onNavigate('vaanis')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Vaani Library</button></li>
          <li><button onClick={() => onNavigate('calendar')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Divine Calendar</button></li>
          <li><button onClick={() => onNavigate('jap')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Naam Jap</button></li>
          <li><button onClick={() => onNavigate('philosophy')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Philosophy</button></li>
          <li><button onClick={() => onNavigate('community')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Community Board</button></li>
        </ul>
      </div>

      <div>
        <div className="font-body text-[11px] tracking-widest uppercase text-[rgba(196,154,42,0.6)] mb-4">Sacred Texts</div>
        <ul className="flex flex-col gap-2.5 list-none">
          <li><button onClick={() => onNavigate('vaanis')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Mangalacharan</button></li>
          <li><button onClick={() => onNavigate('vaanis')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Yamunashtaka</button></li>
          <li><button onClick={() => onNavigate('vaanis')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Yugal Dhyan</button></li>
          <li><button onClick={() => onNavigate('vaanis')} className="text-[13px] font-light text-[rgba(255,255,255,0.3)] hover:text-[rgba(196,154,42,0.75)] transition-colors cursor-pointer">Bhakt Naamvali</button></li>
        </ul>
      </div>

      <div className="col-span-full pt-5.5 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap justify-between items-center gap-2.5">
        <div className="text-[12px] font-light text-[rgba(255,255,255,0.2)]">
          © 2025 Shri Hit Seva · Built with devotion
        </div>
        <div className="font-devanagari text-[13px] text-[rgba(196,154,42,0.35)]">
          श्री राधावल्लभ लाल की जय 🪷
        </div>
      </div>
    </footer>
  );
}
