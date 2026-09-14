import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, introCompleted = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        isFirstMount.current = false;
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling on mobile when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'events', label: 'EVENTS' },
    { id: 'team', label: 'WE' },
    { id: 'recruitment', label: 'RECRUITMENT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Architectural Suspension Brackets / Minimal Navbar Holder (Large Screens only) */}
          <div 
            className={`hidden lg:block absolute inset-x-0 top-0 pointer-events-none transition-opacity duration-300 ${
              !introCompleted ? 'opacity-0' : ''
            }`}
            style={
              introCompleted && isFirstMount.current
                ? { animation: 'holderDrop 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both' }
                : {}
            }
          >
            {/* Left Holder Bracket (Minimal Celestius Gold Anchor) */}
            <div className="absolute -left-5 xl:-left-8 -top-3 sm:-top-4 w-5 xl:w-8 h-12 sm:h-14 pointer-events-none">
              <div className="w-full h-full border-l-2 border-b-2 border-[#FFCC00]/50 rounded-bl-2xl relative shadow-[0_0_6px_rgba(255,204,0,0.12)]">
                {/* Minimal top ceiling anchor point */}
                <div className="absolute -top-1 -left-[3px] w-2 h-1 bg-[#FFCC00]/70 rounded-t-sm" />
                
                {/* Enlarged dock connector node */}
                <div className="absolute -bottom-[6px] -right-[6px] w-3 h-3 rounded-full bg-[#FFCC00] border-2 border-[#08080c] shadow-[0_0_6px_rgba(255,204,0,0.35)]" />
              </div>
            </div>

            {/* Right Holder Bracket (Minimal Celestius Gold Anchor) */}
            <div className="absolute -right-5 xl:-right-8 -top-3 sm:-top-4 w-5 xl:w-8 h-12 sm:h-14 pointer-events-none">
              <div className="w-full h-full border-r-2 border-b-2 border-[#FFCC00]/50 rounded-br-2xl relative shadow-[0_0_6px_rgba(255,204,0,0.12)]">
                {/* Minimal top ceiling anchor point */}
                <div className="absolute -top-1 -right-[3px] w-2 h-1 bg-[#FFCC00]/70 rounded-t-sm" />
                
                {/* Enlarged dock connector node */}
                <div className="absolute -bottom-[6px] -left-[6px] w-3 h-3 rounded-full bg-[#FFCC00] border-2 border-[#08080c] shadow-[0_0_6px_rgba(255,204,0,0.35)]" />
              </div>
            </div>
          </div>

          {/* Main Navbar Capsule with Ultra-Refined Frosted Glass & Minimal Yellow Edge Accents */}
          <div 
            className={`w-full transition-all duration-300 relative p-[1px] ${
              mobileMenuOpen 
                ? 'rounded-2xl bg-gradient-to-r from-[#FFCC00]/20 via-white/10 to-[#FFCC00]/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)]' 
                : scrolled 
                  ? 'rounded-full sm:rounded-2xl bg-gradient-to-r from-[#FFCC00]/15 via-white/[0.07] to-[#FFCC00]/15 shadow-[0_16px_40px_rgba(0,0,0,0.85)]' 
                  : 'rounded-full sm:rounded-2xl bg-gradient-to-r from-[#FFCC00]/10 via-white/[0.05] to-[#FFCC00]/10 shadow-[0_12px_36px_rgba(0,0,0,0.7)]'
            } ${!introCompleted ? 'opacity-0' : ''}`}
            style={
              introCompleted && isFirstMount.current
                ? { animation: 'navbarDock 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both' }
                : {}
            }
          >
            {/* Pure Frosted Glass Core */}
            <div 
              className={`w-full relative overflow-hidden transition-all duration-300 ${
                mobileMenuOpen 
                  ? 'rounded-[15px] bg-[#09090e]/85 backdrop-blur-2xl p-4 sm:px-6' 
                  : scrolled 
                    ? 'rounded-full sm:rounded-[15px] bg-[#07070b]/60 hover:bg-[#07070b]/70 backdrop-blur-2xl backdrop-saturate-150 py-2.5 px-4 sm:px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.4)]' 
                    : 'rounded-full sm:rounded-[15px] bg-[#08080d]/45 hover:bg-[#08080d]/55 backdrop-blur-2xl backdrop-saturate-150 py-3 px-4 sm:px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.3)]'
              }`}
            >
              {/* Left Edge: Barely Perceptible Faint Warm Glow */}
              <div 
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-14 sm:h-16 rounded-full pointer-events-none blur-2xl opacity-[0.09] transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(255,204,0,0.5) 0%, transparent 70%)'
                }}
              />

              {/* Right Edge: Barely Perceptible Faint Warm Glow */}
              <div 
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-14 sm:h-16 rounded-full pointer-events-none blur-2xl opacity-[0.09] transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(255,204,0,0.5) 0%, transparent 70%)'
                }}
              />

              {/* Top Edge Specular White Sheen Line (Prismatic Glass Bevel) */}
              <div className="absolute inset-x-8 sm:inset-x-14 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-60" />

              {/* Content Row */}
              <div className="flex items-center justify-between relative z-10">
              
                {/* Brand & Plain Celestius Logo */}
                <button 
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-3 group text-left focus:outline-none select-none cursor-pointer"
                >
                  {/* Plain Celestius Logo without container */}
                  <img 
                    src={logoImg} 
                    alt="Celestius" 
                    className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                  />

                  {/* Brand text: hidden on mobile view, shown on md and larger screens */}
                  <div className="hidden md:flex flex-col">
                    <span 
                      style={{ fontFamily: "'VT323', monospace" }} 
                      className="font-ndot text-xl sm:text-2xl tracking-widest text-white group-hover:text-[#FFCC00] transition-colors drop-shadow-sm"
                    >
                      CELESTIUS
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
                      Innovate. Build. Collaborate
                    </span>
                  </div>
                </button>

                {/* Desktop Nav Items (Nothing OS Monospace / Pixel Pill Tabs with Glass Dock) */}
                <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-inner">
                  {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`font-mono text-xs px-4 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center tracking-wider cursor-pointer select-none ${
                          isActive
                            ? 'bg-[#FFCC00] text-black font-bold shadow-sm shadow-[#FFCC00]/25'
                            : 'text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className={`ml-1.5 text-[8px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                            isActive 
                              ? 'bg-black text-[#FFCC00]' 
                              : 'bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Action CTA & Mobile Toggle */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-full text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/10 border border-white/15 backdrop-blur-md focus:outline-none cursor-pointer transition-transform duration-200 active:scale-90"
                    aria-label="Toggle navigation"
                  >
                    <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300">
                      {mobileMenuOpen ? (
                        <X className="w-5 h-5 text-[#FFCC00] animate-modal-pop" />
                      ) : (
                        <Menu className="w-5 h-5 text-zinc-200" />
                      )}
                    </div>
                  </button>
                </div>

              </div>

              {/* Mobile Dropdown Menu with Glass Backing & Smooth Animation */}
              {mobileMenuOpen && (
                <div className="relative z-10 md:hidden mt-3 pt-3 border-t border-white/10 space-y-1.5 animate-mobile-menu">
                  {navItems.map((item, idx) => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        style={{ animationDelay: `${(idx * 0.045).toFixed(3)}s` }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer animate-mobile-item ${
                          isActive
                            ? 'bg-[#FFCC00] text-black font-bold shadow-md shadow-[#FFCC00]/20'
                            : 'text-zinc-300 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <span 
                          className="font-ndot tracking-wider text-base uppercase"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                            isActive ? 'bg-black text-[#FFCC00]' : 'bg-[#FFCC00]/20 text-[#FFCC00] border border-[#FFCC00]/40'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
      </div>
    </header>
    </>
  );
}
