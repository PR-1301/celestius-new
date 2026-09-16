import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  X,
  Mic,
  PenTool,
  Paintbrush,
  Film,
  Sparkles
} from 'lucide-react';

/**
 * RecruitmentPopup - High-Impact Creative Poster & Domain Badges Modal.
 * Enhanced with Dynamic Staggered Assembly & Post-Load Trigger:
 * - Triggers only after all elements, assets & intro are fully loaded (document.readyState === 'complete')
 * - 3D Elastic swooping card entrance (.animate-poster-entrance)
 * - Staggered spring pop-ins for all 4 corner domain stickers (.animate-sticker-pop-*)
 * - Energetic slam-down with golden shockwave for "BECOME A MEMBER" blocks (.animate-block-slam-*)
 * - Continuous organic floating levitation & multi-plane 3D parallax tilt
 * - 100% exact design matching user mockup
 */
export default function RecruitmentPopup({ 
  onNavigateApply, 
  introCompleted = true,
  activePage = 'home'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // Strictly show ONLY when user is on the 'home' page
    if (activePage !== 'home') {
      setIsOpen(false);
      return;
    }

    let timer;

    const launchPopup = () => {
      // Smooth cinematic delay after page & intro are 100% loaded
      const delay = introCompleted ? 1200 : 2600;
      timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
    };

    // Ensure all DOM elements, fonts, images, and scripts are fully loaded
    if (document.readyState === 'complete') {
      launchPopup();
    } else {
      const handlePageLoaded = () => {
        launchPopup();
      };
      window.addEventListener('load', handlePageLoaded);
      return () => {
        window.removeEventListener('load', handlePageLoaded);
        if (timer) clearTimeout(timer);
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [introCompleted, activePage]);

  // Smooth 3D perspective mouse tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMouseTilt({
      x: (x / (rect.width / 2)) * 6,
      y: -(y / (rect.height / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
  };

  const handleApplyClick = () => {
    handleClose();
    onNavigateApply('recruitment/apply');
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: 1400 }}
    >
      {/* Deep Frosted Obsidian Backdrop */}
      <div 
        onClick={handleClose}
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-400 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* ========================================================================= */}
      {/* 3D POSTER CARD CONTAINER (With Dynamic 3D Elastic Entrance)               */}
      {/* ========================================================================= */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) scale(${isHovered ? 1.015 : 1})`,
          transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full max-w-[760px] will-change-transform ${
          isClosing ? 'scale-90 opacity-0 transition-all duration-300' : 'animate-poster-entrance'
        }`}
      >
        {/* Floating Minimal White Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FFCC00] text-black shadow-[0_4px_24px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-200 cursor-pointer group"
          aria-label="Close"
          title="Close"
          style={{ transform: 'translateZ(30px)' }}
        >
          <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90 stroke-[2.6]" />
        </button>

        {/* Outer Card Body with Rounded Curvature & Glass Rim */}
        <div 
          className="relative z-10 w-full rounded-[30px] sm:rounded-[36px] overflow-hidden border border-white/20 bg-[#090a0f] p-5 sm:p-9 min-h-[440px] sm:min-h-[480px] shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ======================================================================= */}
          {/* BACKGROUND TEXTURE & GRUNGE ACCENTS                                     */}
          {/* ======================================================================= */}
          {/* Blueprint Grid Texture */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Plus '+' Crosshair Markers */}
          <span className="absolute top-1/3 left-32 text-white/30 text-xl font-light pointer-events-none">+</span>
          <span className="absolute bottom-1/3 right-36 text-white/30 text-xl font-light pointer-events-none">+</span>

          {/* Dot Matrix Clusters */}
          <div className="absolute top-28 left-40 nothing-dot-grid opacity-25 w-16 h-12 pointer-events-none" />
          <div className="absolute bottom-28 right-44 nothing-dot-grid opacity-25 w-16 h-12 pointer-events-none" />

          {/* Top-Left Yellow Circle Cutout Accent (Behind Tech Sticker) */}
          <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-[#FFCC00] pointer-events-none z-0 opacity-95 shadow-[0_0_35px_rgba(255,204,0,0.4)] transition-transform duration-700 ease-out" />

          {/* Diagonal Grunge Brush Strokes on Right Edge */}
          <div 
            className="absolute top-16 -right-6 w-40 h-52 pointer-events-none opacity-60 rotate-[22deg]"
            style={{
              background: 'linear-gradient(135deg, #FFCC00 0%, #EAB308 40%, transparent 80%)',
              clipPath: 'polygon(20% 0%, 100% 10%, 85% 90%, 0% 100%, 35% 45%)',
              filter: 'blur(0.5px)'
            }}
          />
          <div 
            className="absolute bottom-4 right-20 w-32 h-24 pointer-events-none opacity-50 rotate-[-15deg]"
            style={{
              background: 'linear-gradient(135deg, #FFCC00 0%, transparent 70%)',
              clipPath: 'polygon(10% 20%, 90% 0%, 100% 80%, 20% 100%)',
            }}
          />

          {/* Diagonal Dark Charcoal Brush Stroke on Left Edge */}
          <div 
            className="absolute bottom-14 left-20 w-36 h-36 pointer-events-none opacity-40 rotate-[-25deg]"
            style={{
              background: 'linear-gradient(135deg, #27272a 0%, #18181b 60%, transparent 100%)',
              clipPath: 'polygon(15% 0%, 90% 15%, 80% 90%, 0% 80%)',
            }}
          />

          {/* ======================================================================= */}
          {/* CORNER STICKER 1: TOP-LEFT LAPTOP (TECH // DEV)                         */}
          {/* ======================================================================= */}
          <div 
            className="absolute top-5 sm:top-7 left-4 sm:left-6 z-20 pointer-events-none animate-sticker-pop-1 will-change-transform"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="animate-sticker-1">
              {/* Washi Tape at Top */}
              <div className="w-11 h-4 bg-white/35 border border-white/50 backdrop-blur-xs mx-auto -mb-2 z-30 relative rotate-2 shadow-xs" />
              
              {/* Dark Beveled Laptop Screen Card */}
              <div className="bg-[#0b0e14] border border-white/20 p-2.5 sm:p-3 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.85)] w-28 sm:w-34">
                {/* Screen Display with Code Bars (Smooth Shimmering Animation) */}
                <div className="bg-[#05060a] border border-white/10 rounded-lg p-2 flex flex-col gap-1.5 animate-code-shimmer">
                  <div className="w-8 h-1 rounded-full bg-[#00F5FF]" />
                  <div className="w-16 h-1 rounded-full bg-[#FFCC00]" />
                  <div className="w-12 h-1 rounded-full bg-zinc-500" />
                </div>
                <p className="font-mono text-[9px] sm:text-[10px] text-[#00F5FF] font-black tracking-wider text-center mt-2 uppercase">
                  TECH // DEV
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* CORNER STICKER 2: TOP-RIGHT MICROPHONE (SPEAKING // ON AIR)             */}
          {/* ======================================================================= */}
          <div 
            className="absolute top-6 sm:top-8 right-8 sm:right-12 z-20 pointer-events-none animate-sticker-pop-2 will-change-transform"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="animate-sticker-2">
              {/* Rounded Beveled Badge */}
              <div className="bg-[#0d0c12] border-2 border-[#FFCC00] p-2 sm:p-2.5 px-3.5 sm:px-4 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.85)] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-black flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,204,0,0.4)]">
                  <Mic className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] sm:text-[10px] font-black text-[#FFCC00] leading-none uppercase">
                    SPEAKING
                  </p>
                  <p className="font-mono text-[7px] sm:text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                    ON AIR
                  </p>
                </div>
              </div>

              {/* Washi Tape at Bottom */}
              <div className="w-12 h-4 bg-white/35 border border-white/50 backdrop-blur-xs ml-auto mr-4 -mt-2 z-30 relative -rotate-6 shadow-xs" />
            </div>
          </div>

          {/* ======================================================================= */}
          {/* CORNER STICKER 3: BOTTOM-LEFT PEN & BRUSH (DESIGN // UI // UX)          */}
          {/* ======================================================================= */}
          <div 
            className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 z-20 pointer-events-none animate-sticker-pop-3 will-change-transform"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="animate-sticker-3">
              {/* Washi Tape at Top */}
              <div className="w-11 h-4 bg-white/35 border border-white/50 backdrop-blur-xs ml-6 -mb-2 z-30 relative -rotate-3 shadow-xs" />

              {/* Rounded Beveled Badge with Double Tool Icons */}
              <div className="bg-[#0b0d14] border border-white/20 p-2 sm:p-2.5 px-3.5 sm:px-4 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.85)] flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00F5FF]/20 border border-[#00F5FF]/50 text-[#00F5FF] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,245,255,0.25)]">
                  <Paintbrush className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/50 text-[#FFCC00] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,204,0,0.25)]">
                  <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="pl-1">
                  <p className="font-mono text-[9px] sm:text-[10px] font-black text-white uppercase leading-none">
                    DESIGN
                  </p>
                  <p className="font-mono text-[7px] sm:text-[8px] text-[#00F5FF] font-bold uppercase mt-0.5">
                    UI // UX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* CORNER STICKER 4: BOTTOM-RIGHT MEDIA REEL                               */}
          {/* ======================================================================= */}
          <div 
            className="absolute bottom-6 sm:bottom-8 right-6 sm:right-9 z-20 pointer-events-none animate-sticker-pop-4 will-change-transform"
            style={{ transform: 'translateZ(24px)' }}
          >
            <div className="animate-sticker-4">
              {/* Glowing Cyan Border Badge */}
              <div className="bg-[#070b12] border-2 border-[#00F5FF] p-2 sm:p-2.5 px-3.5 sm:px-4 rounded-2xl shadow-[0_10px_30px_rgba(0,245,255,0.25)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00F5FF] text-black flex items-center justify-center shrink-0 shadow-[0_0_14px_#00F5FF]">
                  <Film className="w-4 h-4 stroke-[2.4] animate-film-spin" />
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-xs bg-[#FFCC00]" />
                    <div className="w-1.5 h-1.5 rounded-xs bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-xs bg-[#00F5FF]" />
                  </div>
                  <p className="font-mono text-[8.5px] sm:text-[9.5px] font-black text-white tracking-wider uppercase leading-none">
                    MEDIA REEL
                  </p>
                </div>
              </div>

              {/* Washi Tape at Bottom */}
              <div className="w-12 h-4 bg-white/35 border border-white/50 backdrop-blur-xs ml-auto mr-4 -mt-2 z-30 relative rotate-6 shadow-xs" />
            </div>
          </div>

          {/* ======================================================================= */}
          {/* CENTER COMPOSITION: TYPOGRAPHIC HERO                                   */}
          {/* ======================================================================= */}
          <div 
            className="relative z-30 flex flex-col items-center text-center my-auto py-6 sm:py-8"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Top Eyebrow Capsule */}
            <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-1.5 rounded-xl bg-[#0d0e14] border border-white/20 shadow-md">
              <span className="font-mono text-[10px] sm:text-[11.5px] text-zinc-300 tracking-[0.24em] uppercase font-bold">
                CLUB CELESTIUS PRESENTS
              </span>
            </div>

            {/* Sub-Capsule: OPEN APPLICATIONS (with Twinkling Star Icon) */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-transparent border border-[#FFCC00] text-[#FFCC00] font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-bold shadow-[0_0_15px_rgba(255,204,0,0.2)]">
              <span>RECRUITMENTS OPEN</span>
            </div>

            {/* Giant Angled Cutout Typography Blocks (With Slam-Down Entrance & Hover) */}
            <div className="mt-4 flex flex-col items-center relative group/blocks cursor-pointer" onClick={handleApplyClick}>
              {/* Block 1: BECOME A (Angled Dark Slab with White Border) */}
              <div 
                className="relative z-10 px-8 sm:px-11 py-2 sm:py-3 bg-[#0d0d14] border-2 border-white/90 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] animate-block-slam-1 transition-transform duration-300 group-hover/blocks:-translate-y-1"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight uppercase leading-none font-sans">
                  BECOME A
                </h2>
              </div>

              {/* Block 2: MEMBER (Angled Radiant Yellow Paper Slab with Shockwave Entrance) */}
              <div 
                className="relative z-20 px-10 sm:px-14 py-3 sm:py-4 bg-[#FFCC00] border-2 border-black rounded-xl shadow-[0_15px_40px_rgba(255,204,0,0.45)] -mt-2 sm:-mt-3 animate-block-slam-2 transition-transform duration-300 group-hover/blocks:translate-y-1 rotate-[2.5deg]"
                style={{ transform: 'rotate(2.5deg)' }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-black tracking-tight uppercase leading-none font-sans">
                  MEMBER
                </h2>
              </div>
            </div>

            {/* Institutional Label Capsule */}
            <div className="mt-4 px-5 py-1 rounded-xl bg-[#0d0e14] border border-white/15 shadow-md">
              <p className="font-mono text-[9px] sm:text-[10.5px] text-zinc-300 uppercase tracking-[0.22em] font-medium">
                CRAFT YOUR STORY WITH US
              </p>
            </div>

            {/* Call To Action Button: APPLY NOW → (With Breathing Golden Pulse & Glide Arrow) */}
            <div className="mt-5 sm:mt-6">
              <button
                onClick={handleApplyClick}
                className="group/btn relative overflow-hidden px-9 sm:px-12 py-3 sm:py-3.5 rounded-full bg-[#FFCC00] hover:bg-[#FFE066] text-black font-black text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 animate-yellow-pulse hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer border-2 border-[#FFCC00]"
              >
                {/* Subtle Light Shine Sweep on Hover */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

                <span className="relative z-10 font-bold">APPLY NOW</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5 stroke-[3]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}