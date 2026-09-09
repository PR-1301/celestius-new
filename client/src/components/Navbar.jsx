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
    { id: 'home', label: 'HOME', code: '01' },
    { id: 'events', label: 'EVENTS', code: '02' },
    { id: 'team', label: 'TEAM', code: '03' },
    { id: 'recruitment', label: 'RECRUITMENT', code: '04' },
    { id: 'contact', label: 'CONTACT', code: '05' },
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
            {/* Left Holder Bracket */}
            <div className="absolute -left-5 xl:-left-8 -top-3 sm:-top-4 w-5 xl:w-8 h-12 sm:h-14 pointer-events-none">
              <div className="w-full h-full border-l-2 border-b-2 border-[#FFCC00] rounded-bl-2xl relative">
                {/* Minimal top ceiling anchor point */}
                <div className="absolute -top-1 -left-[3px] w-2 h-1 bg-[#FFCC00] rounded-t-sm" />
                
                {/* Enlarged dock connector node */}
                <div className="absolute -bottom-[7px] -right-[7px] w-3.5 h-3.5 rounded-full bg-[#FFCC00] border-2 border-[#0e0e14] shadow-[0_0_10px_#FFCC00]" />
              </div>
            </div>

            {/* Right Holder Bracket */}
            <div className="absolute -right-5 xl:-right-8 -top-3 sm:-top-4 w-5 xl:w-8 h-12 sm:h-14 pointer-events-none">
              <div className="w-full h-full border-r-2 border-b-2 border-[#FFCC00] rounded-br-2xl relative">
                {/* Minimal top ceiling anchor point */}
                <div className="absolute -top-1 -right-[3px] w-2 h-1 bg-[#FFCC00] rounded-t-sm" />
                
                {/* Enlarged dock connector node */}
                <div className="absolute -bottom-[7px] -left-[7px] w-3.5 h-3.5 rounded-full bg-[#FFCC00] border-2 border-[#0e0e14] shadow-[0_0_10px_#FFCC00]" />
              </div>
            </div>
          </div>

          {/* Main Navbar Capsule */}
          <div 
            className={`w-full transition-all duration-300 ${
              mobileMenuOpen 
                ? 'rounded-2xl bg-[#09090d] border border-[#FFCC00]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-4 sm:px-6' 
                : scrolled 
                  ? 'rounded-full sm:rounded-2xl bg-[#08080c]/95 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-2.5 px-4 sm:px-6' 
                  : 'rounded-full sm:rounded-2xl bg-[#0e0e14]/85 backdrop-blur-xl border border-white/10 py-3 px-4 sm:px-6'
            } ${!introCompleted ? 'opacity-0' : ''}`}
            style={
              introCompleted && isFirstMount.current
                ? { animation: 'navbarDock 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both' }
                : {}
            }
          >
          <div className="flex items-center justify-between">
          
          {/* Brand & Plain Celestius Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none select-none"
          >
            {/* Plain Celestius Logo without container */}
            <img 
              src={logoImg} 
              alt="Celestius" 
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="flex flex-col">
              <span 
                style={{ fontFamily: "'VT323', monospace" }} 
                className="font-ndot text-xl sm:text-2xl tracking-widest text-white group-hover:text-[#FFCC00] transition-colors"
              >
                CELESTIUS
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-tight hidden md:block">
                CHENNAI INSTITUTE OF TECHNOLOGY
              </span>
            </div>
          </button>

          {/* Desktop Nav Items (Nothing OS Monospace / Pixel Pill Tabs) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-black/70 p-1.5 rounded-full border border-white/10">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 tracking-wider ${
                    isActive
                      ? 'bg-[#FFCC00] text-black font-bold shadow-md shadow-[#FFCC00]/15'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[9px] ${isActive ? 'text-black/60' : 'text-zinc-600'}`}>
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
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
              className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white bg-black/60 border border-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-1.5 animate-fade-in">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFCC00] text-black font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] ${isActive ? 'text-black/70 font-mono font-bold' : 'text-zinc-500'}`}>[{item.code}]</span>
                    <span 
                      className="font-ndot tracking-wider text-base uppercase"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {item.label}
                    </span>
                  </div>
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
    </header>
    </>
  );
}
