import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/logo.png';
import { Home, Calendar, Users, UserPlus, Mail } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, introCompleted = true }) {
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

  const navItems = [
    { id: 'home', label: 'Home', desktopLabel: 'HOME', icon: Home },
    { id: 'events', label: 'Events', desktopLabel: 'EVENTS', icon: Calendar },
    { id: 'team', label: 'We', desktopLabel: 'WE', icon: Users },
    { id: 'recruitment', label: 'Recruitment', desktopLabel: 'RECRUITMENT', icon: UserPlus },
    { id: 'contact', label: 'Contact', desktopLabel: 'CONTACT', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Top Header: On mobile transparent with brand logo + tagline; on desktop shows full mechanical capsule navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 pt-3.5 sm:pt-4 pointer-events-none">
        
        {/* Mobile Top Brand Header: Logo + Tagline with NO navbar background */}
        <div 
          className={`md:hidden flex items-center justify-between pointer-events-auto transition-opacity duration-300 ${
            !introCompleted ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <button 
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start gap-0.5 group text-left focus:outline-none select-none cursor-pointer"
            aria-label="Celestius CIT Homepage"
            title="Celestius · Chennai Institute of Technology"
          >
            <img 
              src={logoImg} 
              alt="Celestius · Chennai Institute of Technology" 
              className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,204,0,0.3)] transition-transform duration-200 active:scale-95"
            />
            <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-200 tracking-wider transition-colors">
              Innovate. Build. Collaborate
            </span>
          </button>
        </div>

        {/* Desktop Navbar Capsule with Ultra-Refined Frosted Glass & Minimal Yellow Edge Accents */}
        <div className="hidden md:block relative max-w-6xl mx-auto pointer-events-auto">
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
                <div className="absolute -top-1 -left-[3px] w-2 h-1 bg-[#FFCC00]/70 rounded-t-sm" />
                <div className="absolute -bottom-[6px] -right-[6px] w-3 h-3 rounded-full bg-[#FFCC00] border-2 border-[#08080c] shadow-[0_0_6px_rgba(255,204,0,0.35)]" />
              </div>
            </div>

            {/* Right Holder Bracket (Minimal Celestius Gold Anchor) */}
            <div className="absolute -right-5 xl:-right-8 -top-3 sm:-top-4 w-5 xl:w-8 h-12 sm:h-14 pointer-events-none">
              <div className="w-full h-full border-r-2 border-b-2 border-[#FFCC00]/50 rounded-br-2xl relative shadow-[0_0_6px_rgba(255,204,0,0.12)]">
                <div className="absolute -top-1 -right-[3px] w-2 h-1 bg-[#FFCC00]/70 rounded-t-sm" />
                <div className="absolute -bottom-[6px] -left-[6px] w-3 h-3 rounded-full bg-[#FFCC00] border-2 border-[#08080c] shadow-[0_0_6px_rgba(255,204,0,0.35)]" />
              </div>
            </div>
          </div>

          {/* Main Navbar Capsule */}
          <div 
            className={`w-full transition-all duration-300 relative p-[1px] ${
              scrolled 
                ? 'rounded-2xl bg-gradient-to-r from-[#FFCC00]/15 via-white/[0.07] to-[#FFCC00]/15 shadow-[0_16px_40px_rgba(0,0,0,0.85)]' 
                : 'rounded-2xl bg-gradient-to-r from-[#FFCC00]/10 via-white/[0.05] to-[#FFCC00]/10 shadow-[0_12px_36px_rgba(0,0,0,0.7)]'
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
                scrolled 
                  ? 'rounded-[15px] bg-[#07070b]/60 hover:bg-[#07070b]/70 backdrop-blur-2xl backdrop-saturate-150 py-2.5 px-4 sm:px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.4)]' 
                  : 'rounded-[15px] bg-[#08080d]/45 hover:bg-[#08080d]/55 backdrop-blur-2xl backdrop-saturate-150 py-3 px-4 sm:px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.3)]'
              }`}
            >
              {/* Left Edge: Faint Warm Glow */}
              <div 
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-14 sm:h-16 rounded-full pointer-events-none blur-2xl opacity-[0.09] transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(255,204,0,0.5) 0%, transparent 70%)'
                }}
              />

              {/* Right Edge: Faint Warm Glow */}
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
                {/* Brand & Plain Celestius Logo with Motto Below */}
                <button 
                  onClick={() => handleNavClick('home')}
                  className="flex flex-col items-start gap-1 group text-left focus:outline-none select-none cursor-pointer"
                  aria-label="Celestius CIT Homepage"
                  title="Celestius · Chennai Institute of Technology"
                >
                  <img 
                    src={logoImg} 
                    alt="Celestius · Chennai Institute of Technology" 
                    className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                  />
                  <span className="font-mono text-[9.5px] sm:text-[10px] text-zinc-400 group-hover:text-zinc-200 tracking-wider transition-colors">
                    Innovate. Build. Collaborate
                  </span>
                </button>

                {/* Desktop Nav Items (Pixel Pill Tabs with Glass Dock) */}
                <nav className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-inner">
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
                        <span>{item.desktopLabel}</span>
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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Floating Toast Navigation Dock (Bottom centered, matching requested capsule pill design) */}
      <nav
        aria-label="Mobile Navigation"
        className={`fixed left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-auto transition-all duration-500 ease-out ${
          !introCompleted ? 'opacity-0 translate-y-12' : 'opacity-100 translate-y-0'
        }`}
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#08080c]/90 backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(255,204,0,0.06)] max-w-[calc(100vw-20px)]">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out select-none cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#FFCC00] text-black font-semibold shadow-[0_0_16px_rgba(255,204,0,0.35)] px-3.5 py-2'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 w-10 h-10'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0 transition-transform duration-200" />
                <span
                  className={`overflow-hidden transition-all duration-300 ease-out whitespace-nowrap font-mono text-xs font-bold tracking-wide ${
                    isActive
                      ? 'max-w-[110px] opacity-100 ml-1.5'
                      : 'max-w-0 opacity-0 ml-0'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
