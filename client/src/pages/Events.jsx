import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Grid,
  ArrowLeft,
  Maximize2,
  Terminal,
  Cpu,
  Sparkles,
  Swords,
  Code2,
  Flame,
  ShieldAlert,
  Zap,
  GitCommit,
  CheckCircle2,
  Lock,
  Play,
  Check,
  Clock
} from 'lucide-react';

import promptVerse1Logo from '../assets/prompt-verse-dark-logo.png';
import promptVerse2Logo from '../assets/prompt-verse-2-dark-logo-wbg-minimal(compressed).png';
import deadlockCoverImg from '../assets/deadlock-event-cover.png';
import deadlockPhotoImg from '../assets/deadlock-event.jpg';

// Dynamically import all images from assets/gallery preserving their original aspect ratios
const galleryModules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);

const galleryPhotos = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src], index) => ({
    id: `gallery-photo-${index}`,
    src,
  }));

// Helper function: Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper function: Dynamically distribute photos evenly across dynamic columns so no single column has awkward height
function distributePhotosEqually(photos) {
  const total = photos.length;
  if (total === 0) return [];

  // Determine optimal column count based on photo count
  let colCount = 5;
  if (total <= 6) colCount = 2;
  else if (total <= 12) colCount = 3;
  else if (total <= 20) colCount = 4;
  else if (total >= 40) colCount = 6;

  const cols = Array.from({ length: colCount }, () => []);
  photos.forEach((photo, index) => {
    cols[index % colCount].push(photo);
  });

  return cols;
}

export default function Events({ introCompleted = true }) {
  // Full-Screen 3D Spatial Vault State
  const [isSpatialOpen, setIsSpatialOpen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Normal 2D Grid Modal State (Only appears when clicked)
  const [isGridOpen, setIsGridOpen] = useState(false);

  // Randomized photos order for the 3D grid each time it opens
  const [spatialColumns, setSpatialColumns] = useState(() => distributePhotosEqually(galleryPhotos));

  // Method to launch 3D grid with fresh random order, balanced columns, and cinematic warp-in animation
  const launchSpatialVault = () => {
    const randomized = shuffleArray(galleryPhotos);
    setSpatialColumns(distributePhotosEqually(randomized));
    setPan({ x: 0, y: 0 });
    setIsEntering(true);
    setIsSpatialOpen(true);

    // Smoothly animate into view
    setTimeout(() => {
      setIsEntering(false);
    }, 60);
  };

  // Smooth Screen-wide Gyro Parallax Tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Fluid Touchpad & Drag Pan Coordinates (Restricted bounds to keep images always dense and in view)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const wasIntroPlayingOnMount = useRef(!introCompleted);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        wasIntroPlayingOnMount.current = false;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  // Window-wide Mouse Gyro Tilt for 3D View
  useEffect(() => {
    if (!isSpatialOpen) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({
        x: -y * 6, // ±6 deg
        y: x * 8,  // ±8 deg
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSpatialOpen]);

  // Fluid Touchpad & Mousewheel Navigation Handler
  // Clamped dynamically with ample vertical range so any column drifting up/down can always be brought fully into view
  const handleWheel = (e) => {
    if (e.cancelable) e.preventDefault();
    const dx = e.deltaX || 0;
    const dy = e.deltaY || 0;
    setPan((prev) => ({
      x: Math.max(-480, Math.min(480, prev.x - dx * 0.9)),
      y: Math.max(-750, Math.min(750, prev.y - dy * 0.9)),
    }));
  };

  useEffect(() => {
    if (!isSpatialOpen) return;

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isSpatialOpen]);

  // Mobile Touch Swipe Navigation (Sufficient vertical and horizontal range)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchStartRef.current.x;
      const dy = e.touches[0].clientY - touchStartRef.current.y;
      setPan({
        x: Math.max(-420, Math.min(420, touchStartRef.current.panX + dx)),
        y: Math.max(-680, Math.min(680, touchStartRef.current.panY + dy)),
      });
    }
  };

  // Custom Intersection Observer for dynamic scroll reveals that re-trigger on scrolling up & down
  const [revealedElements, setRevealedElements] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-scroll-id');
          if (id) {
            setRevealedElements((prev) => ({
              ...prev,
              [id]: entry.isIntersecting,
            }));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('[data-scroll-id]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Refined Intro Animations for buttery page transitions
  const getAnimStyle = (animName, delaySec, duration = '0.55s') => {
    if (!introCompleted) {
      return { opacity: 0 };
    }
    const base = wasIntroPlayingOnMount.current ? 0.35 : 0.0;
    return {
      animation: `${animName} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${(base + delaySec).toFixed(2)}s both`
    };
  };

  // Dynamic Scroll Reveal Animation Style
  const getScrollStyle = (id, direction = 'up', delaySec = 0) => {
    const isRevealed = revealedElements[id];
    let transformHidden = 'translateY(28px)';
    if (direction === 'left') transformHidden = 'translateX(-28px)';
    if (direction === 'right') transformHidden = 'translateX(28px)';

    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translate(0, 0)' : transformHidden,
      filter: isRevealed ? 'blur(0px)' : 'blur(3px)',
      transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s, filter 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s`,
      willChange: 'opacity, transform, filter',
    };
  };

  // Keyboard navigation for Lightbox, 3D Spatial Vault, and Normal Grid
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else if (isSpatialOpen) {
          setIsSpatialOpen(false);
          setPan({ x: 0, y: 0 });
        } else if (isGridOpen) {
          setIsGridOpen(false);
        }
      } else if (activePhotoIndex !== null) {
        if (e.key === 'ArrowRight') {
          setActivePhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
        } else if (e.key === 'ArrowLeft') {
          setActivePhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, isSpatialOpen, isGridOpen]);

  // Lock background scroll when spatial vault, normal grid, or lightbox is active
  useEffect(() => {
    if (isSpatialOpen || isGridOpen || activePhotoIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isSpatialOpen, isGridOpen, activePhotoIndex]);

  const currentPhoto = activePhotoIndex !== null ? galleryPhotos[activePhotoIndex] : null;

  // Single Cohesive Organic Flow (Fixed natural drift across any number of columns)
  const getColumnStyle = (colIdx) => {
    const baseDurations = [32, 36, 42, 34, 38, 40];
    const dur = baseDurations[colIdx % baseDurations.length];
    const animName = colIdx % 2 === 0 ? 'spatialDriftDown' : 'spatialDriftUp';

    return {
      animation: `${animName} ${dur}s ease-in-out infinite`,
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left space-y-14 select-none">
      
      {/* 1. Hero Launch Portal: Relive the Memories in Full-Screen 3D */}
      <div 
        data-scroll-id="events-hero"
        className="relative flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-14 pt-2"
        style={{
          ...getAnimStyle('eventsHeroReveal', 0.02, '0.65s'),
          ...getScrollStyle('events-hero', 'up', 0.02)
        }}
      >
        {/* Left Text & Action CTAs */}
        <div className="space-y-6 max-w-xl text-left">
          <h2 
            className="text-3xl sm:text-5xl lg:text-6xl text-white uppercase font-bold tracking-tight leading-[1.1]"
            style={{ 
              fontFamily: "'VT323', monospace",
              ...getAnimStyle('recruitTitleReveal', 0.04, '0.65s')
            }}
          >
            Relive the Memories in <span className="text-[#FFCC00]">Full-Screen 3D</span>
          </h2>

          <p 
            className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed"
            style={getAnimStyle('eventsDeckRise', 0.08, '0.6s')}
          >
            Step inside our zero-gravity 3D spatial vault or explore our complete archive. Relive hackathons, workshops, and team milestones in an unrestricted perspective with smooth navigation.
          </p>

          {/* Cyber Dual-Segment Capsule Switcher / Control Console */}
          <div 
            className="pt-2 inline-flex items-center"
            style={getAnimStyle('eventsDeckRise', 0.12, '0.6s')}
          >
            <div className="inline-flex items-stretch p-1.5 sm:p-2 rounded-2xl sm:rounded-[22px] bg-[#0c0d12]/90 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              {/* Primary Segment: 3D Spatial Vault (Glowing Amber Capsule) */}
              <button
                onClick={launchSpatialVault}
                className="group/vault relative flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-[18px] bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono transition-all duration-300 shadow-[0_2px_16px_rgba(255,204,0,0.3)] hover:shadow-[0_4px_24px_rgba(255,204,0,0.5)] active:scale-95 cursor-pointer text-left"
              >
                {/* Icon box */}
                <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/vault:scale-105">
                  <Maximize2 className="w-4 h-4 text-black" />
                </div>
                
                {/* Text Block */}
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] tracking-wider text-black/70 font-semibold uppercase leading-none">
                    VAULT_ACCESS // 3D
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-black mt-1 leading-tight whitespace-nowrap">
                    LAUNCH SPATIAL<br className="hidden sm:inline" /> VAULT
                  </span>
                </div>

                {/* Arrow Action Badge */}
                <div className="ml-1 sm:ml-2 w-7 h-7 rounded-md sm:rounded-lg bg-black flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/vault:translate-x-0.5 group-hover/vault:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFCC00]" />
                </div>
              </button>

              {/* Vertical Subtle Separator */}
              <div className="w-[1px] bg-white/10 mx-1.5 sm:mx-2 self-stretch" />

              {/* Secondary Segment: Normal Grid Archive */}
              <button
                onClick={() => setIsGridOpen(true)}
                className="group/grid relative flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-[18px] hover:bg-white/[0.05] text-zinc-300 hover:text-white font-mono transition-all duration-300 active:scale-95 cursor-pointer text-left"
              >
                {/* Icon box */}
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/grid:border-[#FFCC00]/40 group-hover/grid:bg-[#FFCC00]/10 transition-colors duration-300">
                  <Grid className="w-4 h-4 text-zinc-400 group-hover/grid:text-[#FFCC00] transition-colors" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] tracking-wider text-zinc-500 font-medium uppercase leading-none">
                    ARCHIVE_MODE
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-zinc-200 group-hover/grid:text-white mt-1 leading-tight whitespace-nowrap">
                    NORMAL<br className="hidden sm:inline" /> GRID
                  </span>
                </div>

                {/* ESC key indicator */}
                <span className="hidden md:inline-block ml-2 text-[10px] text-zinc-500 font-mono">
                  [ESC]
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Fan-out 3D Preview Stack of Real Event Photos */}
        <div 
          onClick={launchSpatialVault}
          className="relative w-72 sm:w-96 h-72 sm:h-84 flex items-center justify-center cursor-pointer group/fan"
          style={getAnimStyle('eventsStackPop', 0.1, '0.7s')}
          title="Click to launch 3D Memory Vault"
        >
          {/* Back Card Left */}
          <div className="absolute w-44 sm:w-52 h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl -rotate-6 -translate-x-6 sm:-translate-x-8 -translate-y-1 opacity-70 group-hover/fan:-translate-x-24 sm:group-hover/fan:-translate-x-32 group-hover/fan:-rotate-16 group-hover/fan:-translate-y-3 group-hover/fan:opacity-100 transition-all duration-500 ease-out">
            <img src={galleryPhotos[9]?.src} alt="Preview" className="w-full h-full object-cover" />
          </div>

          {/* Back Card Right */}
          <div className="absolute w-44 sm:w-52 h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl rotate-6 translate-x-6 sm:translate-x-8 -translate-y-1 opacity-70 group-hover/fan:translate-x-24 sm:group-hover/fan:translate-x-32 group-hover/fan:rotate-16 group-hover/fan:-translate-y-3 group-hover/fan:opacity-100 transition-all duration-500 ease-out">
            <img src={galleryPhotos[2]?.src} alt="Preview" className="w-full h-full object-cover" />
          </div>

          {/* Front Center Card */}
          <div className="relative w-48 sm:w-56 h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/25 group-hover/fan:border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rotate-0 group-hover/fan:scale-105 group-hover/fan:shadow-[0_35px_80px_rgba(0,0,0,0.95)] transition-all duration-500 ease-out z-10">
            <img src={galleryPhotos[1]?.src} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="font-mono text-[10px] text-[#FFCC00] font-bold">[CLICK TO ENTER 3D]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Rule Divider */}
      <hr 
        data-scroll-id="divider-1"
        className="border-t border-white/10 w-full" 
        style={{
          ...getAnimStyle('recruitSlideLeft', 0.16, '0.6s'),
          ...getScrollStyle('divider-1', 'up', 0.05)
        }}
      />

      {/* 2. Header Section: Event Horizons & Initiatives (Centered) */}
      <div 
        data-scroll-id="events-chronicles-title"
        className="text-center max-w-3xl mx-auto space-y-4"
        style={{
          ...getScrollStyle('events-chronicles-title', 'up', 0.05)
        }}
      >
        <h1 
          className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08]"
          style={{ 
            fontFamily: "'VT323', monospace",
            ...getAnimStyle('recruitTitleReveal', 0.18, '0.7s')
          }}
        >
          EVENT <span className="text-[#FFCC00]">CHRONICLES</span>
        </h1>

        <p 
          className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl mx-auto"
          style={getAnimStyle('recruitSlideLeft', 0.22, '0.65s')}
        >
          From landmark hackathons and hands-on technical workshops that defined our journey, to high-octane symposiums on the horizon—explore what we have built and what's arriving next at Chennai Institute of Technology.
        </p>
      </div>

      {/* Horizontal Rule Divider */}
      <hr 
        data-scroll-id="divider-2"
        className="border-t border-white/10 w-full" 
        style={{
          ...getAnimStyle('recruitSlideLeft', 0.26, '0.6s'),
          ...getScrollStyle('divider-2', 'up', 0.05)
        }}
      />

      {/* 3. FLAGSHIP INITIATIVE: PROMPT VERSE CONTINUUM CONSOLE */}
      <div 
        data-scroll-id="promptverse-console"
        className="relative pt-2"
        style={{
          ...getAnimStyle('recruitSlideLeft', 0.28, '0.75s'),
          ...getScrollStyle('promptverse-console', 'up', 0.1)
        }}
      >
        {/* Main Console Frame: An Integrated Aerospace & Cyber Deck Installation */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1017]/95 via-[#07080d]/98 to-black/95 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
          
          {/* Cyber Corner Crosshairs & Tech Reticles */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600 select-none pointer-events-none">+ + +</div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600 select-none pointer-events-none">+ + +</div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-600 select-none pointer-events-none">+ + +</div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-zinc-600 select-none pointer-events-none">+ + +</div>

          {/* Ambient Lighting Conduits */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#FFCC00]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />

          {/* Console Header Bar */}
          <div className="relative z-10 p-6 sm:p-10 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
                <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                  CELESTIUS FLAGSHIP TECHNICAL SYMPOSIUM
                </span>
                <span className="text-zinc-600 hidden sm:inline">//</span>
                <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
                  SYS_ID: PV-2026-TITAN
                </span>
              </div>

              <h2 
                className="text-4xl sm:text-6xl lg:text-7xl text-white uppercase font-bold tracking-tight leading-none"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                PROMPT <span className="text-[#FFCC00]">VERSE</span> CONTINUUM
              </h2>

              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                A high-octane 2-stage engineering crucible: participants master cutting-edge prompt synthesis and generative pipelines, then compete in a live build challenge solving real industry problem statements.
              </p>
            </div>

            {/* Tactical Portal Launcher Keycard */}
            <a
              href="https://promptverse.celestius.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/portal relative inline-flex items-center gap-4 p-4 pr-6 rounded-2xl bg-black/60 hover:bg-[#FFCC00]/10 border border-[#FFCC00]/30 hover:border-[#FFCC00] backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(255,204,0,0.25)] hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0 overflow-hidden"
            >
              {/* Animated scanning laser line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFCC00] to-transparent opacity-0 group-hover/portal:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 rounded-xl bg-[#FFCC00] text-black flex items-center justify-center font-mono font-bold shadow-[0_4px_20px_rgba(255,204,0,0.4)] group-hover/portal:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>

              <div className="text-left font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
                    PORTAL ACTIVE
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white group-hover/portal:text-[#FFCC00] transition-colors uppercase tracking-wider">
                  VISIT PROMPT VERSE SITE
                </div>
                <div className="text-[10px] text-zinc-400">
                  promptverse.celestius.in ↗
                </div>
              </div>
            </a>
          </div>

          {/* Split Dual-Chamber Flight Deck (1.0 vs 2.0 with Logo Visuals & Balanced Watermarks) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 text-left">
            
            {/* Sector 01: Allied Continuum (Concluded - Cosmic Purple/Gold Theme) */}
            <div 
              data-scroll-id="pv-sector-1"
              className="p-6 sm:p-10 space-y-8 relative group/sec1 hover:bg-purple-500/[0.03] transition-colors duration-500"
              style={getScrollStyle('pv-sector-1', 'left', 0.1)}
            >
              {/* Sector Watermark 01 (Clearly Visible) */}
              <span className="absolute right-6 bottom-4 font-mono text-8xl sm:text-9xl font-black text-white/[0.08] group-hover/sec1:text-purple-400/[0.18] select-none pointer-events-none transition-colors">
                01
              </span>

              {/* Sector Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="font-mono text-[10px] tracking-widest text-purple-400 font-bold uppercase flex items-center gap-2">
                    <span>SECTOR_01</span>
                  </div>
                  
                  {/* Prompt Verse 1.0 Logo Display */}
                  <div className="pt-1 pb-1">
                    <img 
                      src={promptVerse1Logo} 
                      alt="Prompt Verse 1.0" 
                      className="h-10 sm:h-12 w-auto object-contain max-w-[280px] sm:max-w-[340px] drop-shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
                    />
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 font-mono text-[10px] text-purple-300 font-bold tracking-wider uppercase flex items-center gap-1.5 shrink-0">
                  <Check className="w-3.5 h-3.5 text-purple-400 stroke-[2.5]" />
                  <span>CONCLUDED</span>
                </div>
              </div>

              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                Exclusively executed for CSE and allied computational branches. An intense dual-phase odyssey that started with prompt architecture masterclasses and culminated in a competitive product build sprint.
              </p>

              {/* 2-Phase Technical Crucible Pipeline */}
              <div className="space-y-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                  <span>CRUCIBLE STRUCTURE</span>
                  <span className="text-purple-400">[2 SECTIONS]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover/sec1:border-purple-500/40 transition-colors space-y-1.5">
                    <div className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                      SECTION 01 // WORKSHOP
                    </div>
                    <div className="font-mono text-xs font-bold text-white">Prompt Synthesis</div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                      Context engineering, system prompting & LLM orchestration.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover/sec1:border-purple-500/40 transition-colors space-y-1.5">
                    <div className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                      SECTION 02 // HACKATHON
                    </div>
                    <div className="font-mono text-xs font-bold text-white">Problem Build Sprint</div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                      Constructing working solutions against live problem statements.
                    </div>
                  </div>
                </div>
              </div>

              {/* Cohort Department Nodes */}
              <div className="space-y-2.5 pt-2">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  PARTICIPATING ALLIED NODES
                </div>
                <div className="flex flex-wrap gap-2">
                  {['CSE', 'IT', 'AI & DS', 'AIML', 'CYBER SECURITY'].map((node) => (
                    <span 
                      key={node}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/25 font-mono text-xs text-purple-200 group-hover/sec1:border-purple-500/50 group-hover/sec1:bg-purple-500/15 transition-colors"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sector 02: Core Frontier (Scheduled Soon - Tech Circuit Gold Theme) */}
            <div 
              data-scroll-id="pv-sector-2"
              className="p-6 sm:p-10 space-y-8 relative group/sec2 hover:bg-[#FFCC00]/[0.03] transition-colors duration-500"
              style={getScrollStyle('pv-sector-2', 'right', 0.1)}
            >
              {/* Sector Watermark 02 (Clearly Visible) */}
              <span className="absolute right-6 bottom-4 font-mono text-8xl sm:text-9xl font-black text-white/[0.08] group-hover/sec2:text-[#FFCC00]/[0.18] select-none pointer-events-none transition-colors">
                02
              </span>

              {/* Sector Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="font-mono text-[10px] tracking-widest text-[#FFCC00] font-bold uppercase flex items-center gap-2">
                    <span>SECTOR_02</span>
                  </div>
                  
                  {/* Prompt Verse 2.0 Logo Display */}
                  <div className="pt-1 pb-1">
                    <img 
                      src={promptVerse2Logo} 
                      alt="Prompt Verse 2.0" 
                      className="h-10 sm:h-12 w-auto object-contain max-w-[290px] sm:max-w-[350px] drop-shadow-[0_4px_20px_rgba(255,204,0,0.3)]"
                    />
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/40 font-mono text-[10px] text-[#FFCC00] font-bold tracking-wider uppercase flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#FFCC00] animate-spin [animation-duration:5s]" />
                  <span>SCHEDULED SOON</span>
                </div>
              </div>

              <p className="text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
                Purpose-built for core engineering innovators. Infusing prompt engineering into physical mechanics, VLSI architectures, smart circuitry, and automated industrial problem statements.
              </p>

              {/* 2-Phase Technical Crucible Pipeline */}
              <div className="space-y-2.5">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                  <span>CRUCIBLE STRUCTURE</span>
                  <span className="text-[#FFCC00]">[2 SECTIONS]</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover/sec2:border-[#FFCC00]/40 transition-colors space-y-1.5">
                    <div className="font-mono text-[10px] text-[#FFCC00] font-bold uppercase tracking-wider">
                      SECTION 01 // WORKSHOP
                    </div>
                    <div className="font-mono text-xs font-bold text-white">Applied Core AI</div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                      Domain prompt systems for physical engineering & smart hardware.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover/sec2:border-[#FFCC00]/40 transition-colors space-y-1.5">
                    <div className="font-mono text-[10px] text-[#FFCC00] font-bold uppercase tracking-wider">
                      SECTION 02 // HACKATHON
                    </div>
                    <div className="font-mono text-xs font-bold text-white">Core Build Sprint</div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-tight">
                      Cross-disciplinary challenge solving live industrial problem sets.
                    </div>
                  </div>
                </div>
              </div>

              {/* Cohort Department Nodes */}
              <div className="space-y-2.5 pt-2">
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  TARGET CORE ENGINEERING NODES
                </div>
                <div className="flex flex-wrap gap-2">
                  {['MECHANICAL', 'ECE', 'EEE', 'ACT', 'VLSI'].map((node) => (
                    <span 
                      key={node}
                      className="px-3 py-1.5 rounded-xl bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-xs text-[#FFCC00] font-medium group-hover/sec2:bg-[#FFCC00]/20 group-hover/sec2:border-[#FFCC00]/50 transition-colors"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Bar with Direct Portal Access */}
          <div className="relative z-10 px-6 sm:px-10 py-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">//</span>
              <span>SINGLE PORTAL FOR ARCHIVE & REGISTRATIONS:</span>
              <a 
                href="https://promptverse.celestius.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFCC00] underline underline-offset-4 hover:text-white transition-colors"
              >
                promptverse.celestius.in
              </a>
            </div>

            <a
              href="https://promptverse.celestius.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#FFCC00] transition-colors cursor-pointer font-bold uppercase tracking-wider"
            >
              <span>ACCESS RECAP & REGISTER</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>

      {/* Horizontal Rule Divider */}
      <hr 
        data-scroll-id="divider-3"
        className="border-t border-white/10 w-full" 
        style={{
          ...getAnimStyle('recruitSlideLeft', 0.32, '0.6s'),
          ...getScrollStyle('divider-3', 'up', 0.05)
        }}
      />

      {/* 4. TAKSHASHILA SPECIAL ARENA: DEADLOCK (Bespoke Cyan & Amber Cosmic Cyber Layout) */}
      <section 
        data-scroll-id="deadlock-arena"
        className="relative pt-4"
        style={{
          ...getAnimStyle('recruitSlideLeft', 0.32, '0.75s'),
          ...getScrollStyle('deadlock-arena', 'up', 0.1)
        }}
      >
        {/* Main Outer Frame with Celestial Cyan & Deep Amber Glow */}
        <div className="relative rounded-[2.5rem] border border-cyan-500/25 bg-gradient-to-b from-[#060e18] via-[#05070c] to-[#040508] shadow-[0_25px_90px_rgba(6,182,212,0.1)] overflow-hidden group/deadlock">
          
          {/* Subtle Ambient Cosmic Fluid Lighting from the Logo */}
          <div className="absolute -top-32 -left-20 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-20 w-[450px] h-[450px] bg-[#FFCC00]/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

          {/* Glowing Horizon Neon Line: Cyan transitioning to Amber */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-[#FFCC00] opacity-80" />

          <div className="p-6 sm:p-12 space-y-10">
            
            {/* Top Bar: Section Title & TK Badge */}
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="text-left">
                <h2 
                  className="text-4xl sm:text-6xl lg:text-7xl text-white uppercase font-bold tracking-tight leading-none"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  DEAD<span className="text-[#FFCC00]">LOCK</span>
                </h2>
              </div>

              {/* A TK Event Badge with Swords Icon */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider shrink-0 shadow-lg">
                <Swords className="w-3.5 h-3.5 text-cyan-400" />
                <span>A TK Event</span>
              </div>
            </div>

            {/* Asymmetric Core Showcase: Left Content (Centered Cover Image) + Right Live Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Deadlock Centered Cover Image & Minimal Context */}
              <div 
                data-scroll-id="deadlock-left"
                className="lg:col-span-6 space-y-6 text-left"
                style={getScrollStyle('deadlock-left', 'left', 0.1)}
              >
                {/* Official Cover Image - Centered within the paragraph width with curved edges & sleek border */}
                <div className="flex justify-center w-full">
                  <div className="relative group/logo">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-[#FFCC00]/25 blur-xl rounded-2xl opacity-70 group-hover/logo:opacity-100 transition-opacity" />
                    <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_12px_40px_rgba(6,182,212,0.25)] bg-black/60 p-1">
                      <img 
                        src={deadlockCoverImg} 
                        alt="Deadlock Event" 
                        className="h-20 sm:h-24 w-auto object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  An adrenaline-driven competitive programming event conducted exclusively for CIT's flagship festival, <span className="text-cyan-300 font-medium">TAKSHASHILA</span>. Competitors faced off in real-time coding duels and deductive black-box logic challenges.
                </p>
              </div>

              {/* Right Column: Live Event Photo with Clean Sleek Curved Border (All Overlays Removed) */}
              <div 
                data-scroll-id="deadlock-photo"
                className="lg:col-span-6"
                style={getScrollStyle('deadlock-photo', 'right', 0.1)}
              >
                <div className="relative rounded-3xl overflow-hidden border border-white/15 hover:border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-colors duration-500 group/photo">
                  <img 
                    src={deadlockPhotoImg} 
                    alt="DeadLock at CIT" 
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover/photo:scale-105"
                  />
                </div>
              </div>

            </div>

            {/* Bottom: 2 Themed Rounds Cards (Clean without striked badges) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* Round 1 Card: Digital Tug of War */}
              <div 
                data-scroll-id="deadlock-round-1"
                className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-cyan-950/20 via-[#070e17]/80 to-black border border-cyan-500/25 hover:border-cyan-400/50 shadow-xl transition-all duration-300 group/r1 overflow-hidden"
                style={getScrollStyle('deadlock-round-1', 'left', 0.15)}
              >
                {/* Background Watermark 01 */}
                <div className="absolute top-3 right-6 font-mono text-8xl font-black text-cyan-500/[0.07] group-hover/r1:text-cyan-400/[0.14] select-none pointer-events-none transition-colors">
                  01
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 font-mono text-[11px] text-cyan-300 font-bold tracking-wider uppercase">
                      <Swords className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ROUND 01 // ELIMINATION</span>
                    </span>
                  </div>

                  <h4 
                    className="text-3xl sm:text-4xl text-white font-bold tracking-tight uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    DIGITAL <span className="text-cyan-400">TUG OF WAR</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    Two competing teams battled over a digital rope. With each verified correct coding solution, the rope displaced toward that team until one side crossed the victory line.
                  </p>
                </div>
              </div>

              {/* Round 2 Card: Reverse the Code */}
              <div 
                data-scroll-id="deadlock-round-2"
                className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-950/20 via-[#100d08]/80 to-black border border-[#FFCC00]/25 hover:border-[#FFCC00]/50 shadow-xl transition-all duration-300 group/r2 overflow-hidden"
                style={getScrollStyle('deadlock-round-2', 'right', 0.15)}
              >
                {/* Background Watermark 02 */}
                <div className="absolute top-3 right-6 font-mono text-8xl font-black text-[#FFCC00]/[0.07] group-hover/r2:text-[#FFCC00]/[0.14] select-none pointer-events-none transition-colors">
                  02
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-[#FFCC00]/30 font-mono text-[11px] text-[#FFCC00] font-bold tracking-wider uppercase">
                      <Code2 className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>ROUND 02 // FINALS</span>
                    </span>
                  </div>

                  <h4 
                    className="text-3xl sm:text-4xl text-white font-bold tracking-tight uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    REVERSE <span className="text-[#FFCC00]">THE CODE</span>
                  </h4>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    Given only 3 sample input and output pairs with no problem statement, finalists deduced the underlying logic and wrote the code to pass all hidden edge test cases.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. DEDICATED NORMAL PHOTO ARCHIVE GRID MODAL (Appears only when clicked; has full hover & popup effects) */}
      {isGridOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9985] h-screen w-screen bg-black/95 backdrop-blur-2xl overflow-y-auto select-none p-4 sm:p-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-8 pt-2 pb-20">
            
            {/* Top Bar with Title, Stats & Close Button */}
            <div className="sticky top-0 z-30 flex items-center justify-between py-4 px-6 rounded-2xl bg-[#0a0b10]/90 border border-white/15 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFCC00]/15 border border-[#FFCC00]/30 flex items-center justify-center">
                  <Grid className="w-5 h-5 text-[#FFCC00]" />
                </div>
                <div>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    NORMAL PHOTO ARCHIVE
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">
                    {galleryPhotos.length} CAPTURES ARCHIVED • CLICK ANY PHOTO TO EXPAND
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsGridOpen(false);
                    launchSpatialVault();
                  }}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFCC00]/15 hover:bg-[#FFCC00] border border-[#FFCC00]/40 text-[#FFCC00] hover:text-black font-mono text-xs font-bold uppercase transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>SWITCH TO 3D</span>
                </button>

                <button
                  onClick={() => setIsGridOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#FFCC00] border border-white/20 hover:border-[#FFCC00] text-zinc-300 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Close normal grid"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Masonry Grid with Hover Effects & Click-to-Popup */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="mb-5 break-inside-avoid group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0c0d12] hover:border-[#FFCC00] transition-all duration-300 ease-out shadow-xl hover:shadow-[0_16px_50px_rgba(255,204,0,0.25)] hover:scale-[1.02] cursor-pointer"
                >
                  <img 
                    src={photo.src} 
                    alt="Past Event"
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-between p-4">
                    <span className="font-mono text-xs text-[#FFCC00] font-bold tracking-wider">[CLICK TO VIEW]</span>
                    <span className="font-mono text-[10px] text-zinc-400">#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* 5. DEDICATED FULL-SCREEN 3D SPATIAL MEMORY VAULT (100% Full-Screen, Pure Images, Touchpad Nav) */}
      {isSpatialOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9990] h-screen w-screen bg-[#050508] text-white select-none overflow-hidden animate-spatial-entry"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Cosmic Nebula Glow */}
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#FFCC00]/6 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[150px] pointer-events-none" />

          {/* Top Floating HUD Bar */}
          <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
            
            {/* Back to Events Button */}
            <button
              onClick={() => {
                setIsSpatialOpen(false);
                setPan({ x: 0, y: 0 });
              }}
              className="group pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-[#FFCC00] border border-white/20 hover:border-[#FFCC00] text-zinc-200 hover:text-black font-mono text-xs transition-all duration-200 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>EXIT TO ARCHIVE</span>
            </button>

            {/* Central Monospace Telemetry */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl font-mono text-xs text-zinc-300 shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              <span className="text-[#FFCC00] font-bold">CELESTIUS // SPATIAL ARCHIVE</span>
              <span className="text-zinc-600">•</span>
              <span>{galleryPhotos.length} CAPTURES</span>
            </div>

            {/* Exit Shortcut & Close Button */}
            <div className="pointer-events-auto flex items-center gap-2">
              <span className="hidden md:inline font-mono text-[10px] text-zinc-500 bg-black/70 px-3 py-1.5 rounded-full border border-white/10">
                [TWO-FINGER SCROLL TO PAN • ESC TO EXIT]
              </span>
              <button
                onClick={() => {
                  setIsSpatialOpen(false);
                  setPan({ x: 0, y: 0 });
                }}
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#FFCC00] border border-white/20 hover:border-[#FFCC00] text-zinc-300 hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105"
                aria-label="Exit 3D Vault"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Unrestricted Full-Screen 3D Viewport Stage */}
          <div 
            className="w-full h-full flex items-center justify-center preserve-3d"
            style={{ 
              perspective: '1200px',
              WebkitPerspective: '1200px'
            }}
          >
            <div 
              className={`preserve-3d ${
                isEntering 
                  ? 'transition-all duration-700 ease-out opacity-0' 
                  : 'transition-transform duration-150 ease-out opacity-100'
              }`}
              style={{
                transform: isEntering
                  ? `translate3d(${pan.x}px, ${pan.y}px, -450px) scale(0.65) rotateX(${tilt.x + 18}deg) rotateY(${tilt.y - 6}deg) rotateZ(-3deg)`
                  : `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(1) rotateX(${tilt.x + 10}deg) rotateY(${tilt.y - 6}deg) rotateZ(-3deg)`,
                WebkitTransform: isEntering
                  ? `translate3d(${pan.x}px, ${pan.y}px, -450px) scale(0.65) rotateX(${tilt.x + 18}deg) rotateY(${tilt.y - 6}deg) rotateZ(-3deg)`
                  : `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(1) rotateX(${tilt.x + 10}deg) rotateY(${tilt.y - 6}deg) rotateZ(-3deg)`,
                transformOrigin: 'center center'
              }}
            >
              <div className="flex gap-6 sm:gap-8 items-start justify-center min-w-[1300px] sm:min-w-[1600px] lg:min-w-[1900px] px-8 sm:px-14 py-20 preserve-3d">
                {spatialColumns.map((columnPhotos, colIndex) => {
                  return (
                    <div 
                      key={`fullscreen-spatial-col-${colIndex}`} 
                      className="flex-1 flex flex-col gap-6 sm:gap-8 preserve-3d"
                      style={getColumnStyle(colIndex)}
                    >
                      {columnPhotos.map((photo) => {
                        const originalIndex = galleryPhotos.findIndex((p) => p.id === photo.id);
                        const photoIndex = originalIndex >= 0 ? originalIndex : 0;

                        return (
                          <div
                            key={`fullscreen-photo-${photo.id}`}
                            onClick={() => setActivePhotoIndex(photoIndex)}
                            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0c0d12]/90 cursor-pointer select-none will-change-transform shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
                          >
                            <img 
                              src={photo.src} 
                              alt="Past Event" 
                              loading="lazy" 
                              className="w-full h-auto block object-cover" 
                            />
                            
                            {/* Subtle dot matrix overlay */}
                            <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subtle Ambient Telemetry Hint (Clean & minimal, no cluttered toggles) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 border border-white/10 backdrop-blur-xl font-mono text-[11px] text-zinc-400 pointer-events-none shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
            <span>TOUCHPAD TO NAVIGATE</span>
            <span className="text-zinc-600">•</span>
            <span>CLICK PHOTO TO EXPAND</span>
          </div>

        </div>,
        document.body
      )}

      {/* 6. Viewport-Locked Lightbox Modal (Preserves 100% natural photo aspect ratios) */}
      {currentPhoto && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col items-center justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none overflow-hidden"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Top Floating Controls Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between z-10 pt-1 sm:pt-2 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Monospace Photo Counter Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl font-mono text-xs text-zinc-300 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              <span className="text-[#FFCC00] font-bold">
                [{String(activePhotoIndex + 1).padStart(2, '0')} / {String(galleryPhotos.length).padStart(2, '0')}]
              </span>
              <span className="text-zinc-500 hidden sm:inline">// CIT ARCHIVE</span>
            </div>

            {/* Circular Nothing OS Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#FFCC00] border border-white/15 hover:border-[#FFCC00] text-zinc-300 hover:text-black flex items-center justify-center transition-all duration-200 backdrop-blur-xl shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Centerpiece Image with Ambient Gold Bloom & Floating Navigation */}
          <div 
            className="relative my-auto flex items-center justify-center max-w-5xl w-full px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Gold Bloom behind photo */}
            <div className="absolute -inset-6 sm:-inset-10 bg-[#FFCC00]/10 rounded-3xl blur-3xl pointer-events-none -z-10" />

            {/* Previous Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
              }}
              className="absolute left-2 sm:-left-12 md:-left-16 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#FFCC00] border border-white/20 hover:border-[#FFCC00] text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95 backdrop-blur-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image Frame */}
            <div className="relative group inline-block">
              <img 
                src={currentPhoto.src} 
                alt="Past Event"
                className="max-h-[70vh] sm:max-h-[76vh] w-auto max-w-[85vw] sm:max-w-[76vw] object-contain block rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] select-none"
              />
            </div>

            {/* Next Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
              }}
              className="absolute right-2 sm:-right-12 md:-right-16 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#FFCC00] border border-white/20 hover:border-[#FFCC00] text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95 backdrop-blur-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Keyboard Navigation Telemetry Hints */}
          <div 
            className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 tracking-widest uppercase z-10 pb-1 sm:pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">[← PREVIOUS]</span>
            <span className="hidden sm:inline">•</span>
            <span>[ESC / CLICK ANYWHERE TO CLOSE]</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">[NEXT →]</span>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

