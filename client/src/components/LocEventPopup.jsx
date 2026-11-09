import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import locLogoWebp from '../assets/loc/loc-logo.webp';
import locLogoPng from '../assets/loc/loc-logo.png';

/**
 * LocEventPopup - Pure Typography & Minimal Architectural Design.
 * 
 * Design:
 * - NO pill badges, NO capsule boxes, NO sparkle icons.
 * - Pure, stylish typographic hierarchy with ambient orange illumination.
 * - Clean terminal aesthetics with glowing text accents and breathing room.
 * - Redesigned ultra-clean architectural action button.
 * - Strict Navigation & Reload rules preserved.
 */
export default function LocEventPopup({ 
  introCompleted = true,
  activePage = 'home'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);
  const prevPageRef = useRef(activePage);
  const hasTriggeredInitialRef = useRef(false);

  const LOC_URL = 'https://loc.celestius.in';

  // Navigation & Reload Trigger Rules
  useEffect(() => {
    let timer;

    if (activePage === 'home') {
      // 1. Initial reload on Home page: trigger once intro finishes
      if (!hasTriggeredInitialRef.current) {
        if (introCompleted) {
          hasTriggeredInitialRef.current = true;
          timer = setTimeout(() => {
            setIsClosing(false);
            setIsOpen(true);
          }, 700);
        }
      } 
      // 2. Navigation route change: user navigated to Home from another page
      else if (prevPageRef.current && prevPageRef.current !== 'home') {
        timer = setTimeout(() => {
          setIsClosing(false);
          setIsOpen(true);
        }, 350);
      }
    } else {
      // User is on another page: hide popup
      if (isOpen) {
        setIsOpen(false);
      }
    }

    prevPageRef.current = activePage;

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activePage, introCompleted, isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll while modal is visible
  useEffect(() => {
    if (isOpen && !isClosing) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isClosing]);

  // 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;

    setMouseTilt({
      x: (x / (rect.width / 2)) * 5,
      y: -(y / (rect.height / 2)) * 5,
      shineX,
      shineY
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
    setIsHovered(false);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleRedirect = () => {
    window.open(LOC_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* MAIN CLEAN MODAL OVERLAY                                                  */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 select-none transition-all duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ perspective: 1400 }}
        >
          {/* Frosted Dark Backdrop with Orange Radial Atmosphere */}
          <div 
            onClick={handleClose}
            className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[520px] bg-gradient-to-tr from-[#F26B3A]/18 via-[#FAA012]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
          </div>

          {/* ======================================================================= */}
          {/* 3D MINIMALIST POSTER CONTAINER                                          */}
          {/* ======================================================================= */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) scale(${isHovered ? 1.012 : 1})`,
              transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
            className={`relative w-full max-w-[390px] sm:max-w-[415px] flex flex-col will-change-transform ${
              isClosing ? 'animate-loc-exit' : 'animate-loc-entrance'
            }`}
          >
            {/* Minimal Top-Right Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#101016]/90 hover:bg-[#F26B3A] text-zinc-400 hover:text-black border border-white/15 hover:border-[#F26B3A] shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md"
              aria-label="Close"
              title="Close [Esc]"
              style={{ transform: 'translateZ(30px)' }}
            >
              <X className="w-4 h-4 transition-transform duration-200 hover:rotate-90 stroke-[2.2]" />
            </button>

            {/* Outer Cyber Chamfer Border Container (Precision-cut Chamfered Polygon) */}
            <div 
              className="relative z-10 w-full p-[1.5px] loc-cyber-card bg-gradient-to-br from-[#F26B3A] via-[#FAA012]/40 to-[#F26B3A] will-change-transform"
              style={{
                filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.95)) drop-shadow(0 0 35px rgba(242,107,58,0.35))',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Inner Cyber Chamfer Surface */}
              <div 
                className="relative w-full loc-cyber-card bg-[#09090D] flex flex-col justify-between overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Subtle Dot Grid & Vignette Texture */}
                <div className="absolute inset-0 loc-crt-lines opacity-10 pointer-events-none z-20" />
                <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none z-10" />

                {/* Dynamic Holographic Mouse Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen z-20"
                  style={{
                    background: `radial-gradient(circle 260px at ${mouseTilt.shineX}% ${mouseTilt.shineY}%, rgba(255, 255, 255, 0.12), transparent 75%)`
                  }}
                />

                {/* Content Container */}
                <div className="relative z-20 p-6 sm:p-7 flex flex-col gap-4 text-center">
                  
                  {/* 1. "CELESTIUS IS HOSTING..." */}
                  <div className="animate-loc-step-1 flex items-center justify-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26B3A] shadow-[0_0_8px_#F26B3A]" />
                    <p className="font-mono text-xs sm:text-[13px] tracking-[0.22em] uppercase text-[#F26B3A] font-bold">
                      Celestius is Hosting...
                    </p>
                  </div>

                  {/* 2. HERO PIXEL LOGO */}
                  <div 
                    onClick={handleRedirect}
                    className="animate-loc-step-2 flex flex-col items-center cursor-pointer group/title transition-transform duration-300 hover:scale-[1.015] pt-0.5"
                  >
                    <div className="relative w-full max-w-[290px] sm:max-w-[305px]">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-[#F26B3A]/20 rounded-full blur-2xl pointer-events-none" />

                      <picture className="relative z-10 block drop-shadow-[0_8px_25px_rgba(242,107,58,0.4)]">
                        <source srcSet={locLogoWebp} type="image/webp" />
                        <img 
                          src={locLogoPng} 
                          alt="LARPER OR CODER" 
                          className="w-full h-auto object-contain block"
                          loading="eager"
                        />
                      </picture>
                    </div>

                    {/* 3. Pure Text Tagline */}
                    <p className="animate-loc-step-3 font-mono text-xs text-[#F7EDD8] font-bold tracking-wider mt-2.5">
                      <span className="text-[#F26B3A] mr-1">&gt;</span>
                      no larping. just lock in.
                      <span className="inline-block w-1.5 h-3 bg-[#F26B3A] ml-1.5 align-middle animate-blink" />
                    </p>
                  </div>

                  {/* 4 & 5. PURE TEXT SHORT DESCRIPTION & QUOTE */}
                  <div className="flex flex-col gap-2 pt-1 pb-1">
                    <p className="animate-loc-step-4 text-xs sm:text-[13px] text-zinc-300 font-sans leading-relaxed text-center px-1">
                      No amount of resume glazing can save you here. Just you, your homie, and the algorithmic problems that are about to humble you.
                    </p>

                    <p className="animate-loc-step-5 font-mono text-[11px] italic text-[#FAA012] tracking-wide pt-1">
                      “Resume says 10x. Code says TLE.”
                    </p>
                  </div>

                  {/* 6. PURE TEXT METADATA LINE */}
                  <div className="animate-loc-step-6 flex items-center justify-center gap-3 font-mono text-[11px] sm:text-xs text-zinc-400 border-t border-white/10 pt-3">
                    <span className="text-zinc-200 font-bold tracking-wide">13 NOV 2026</span>
                    <span className="text-[#F26B3A] font-bold">//</span>
                    <span className="text-zinc-200 font-bold tracking-wide">DUO PAIR</span>
                  </div>

                  {/* 7. REDESIGNED CLEAN ACTION BUTTON */}
                  <div className="animate-loc-step-7 flex flex-col gap-2.5 pt-1">
                    <a
                      href={LOC_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleRedirect}
                      className="group relative w-full py-3.5 px-6 rounded-xl bg-[#F26B3A] hover:bg-[#fa7b4c] text-black font-mono font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(242,107,58,0.4)] hover:shadow-[0_0_36px_rgba(242,107,58,0.65)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-200 cursor-pointer"
                    >
                      <span>EXPLORE ALL DETAILS HERE</span>
                      <span className="font-bold text-base transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </a>

                    {/* Minimal Micro-URL */}
                    <div className="text-center font-mono text-[11px] text-zinc-500">
                      Official Event Portal: <a href={LOC_URL} target="_blank" rel="noopener noreferrer" className="text-[#F26B3A] hover:underline">loc.celestius.in</a>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}
