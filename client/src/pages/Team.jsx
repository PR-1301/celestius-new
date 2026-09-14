import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { teamData } from '../data/teamData';
import logoImg from '../assets/logo.png';

// Dynamic Bi-directional Scroll Reveal Component
function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.05,
  className = '',
  style = {},
  introCompleted = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!introCompleted) {
      setIsVisible(false);
      return;
    }

    // Check immediately if element is already within viewport on page reload or navigation
    const checkImmediate = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 100 && rect.bottom >= -100) {
        setTimeout(() => {
          setIsVisible(true);
        }, 60);
      }
    };

    checkImmediate();

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [introCompleted]);

  const getHiddenTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 28px, 0) scale(0.97)';
      case 'fade-down':
        return 'translate3d(0, -28px, 0) scale(0.97)';
      case 'zoom-in':
        return 'scale(0.94)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const animStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getHiddenTransform(),
    filter: isVisible ? 'blur(0px)' : 'blur(3px)',
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    willChange: 'transform, opacity, filter',
    ...style
  };

  return (
    <div ref={ref} className={className} style={animStyle}>
      {typeof children === 'function' ? children({ isVisible }) : children}
    </div>
  );
}

// 4 Category Themes aligned with Celestius Brand Gold/Amber (#FFCC00)
const CATEGORY_CONFIG = {
  leadership: {
    label: "LEADERSHIP",
    accent: "#D97706", // Rich amber for high contrast text on white
    bannerAccent: "#FFCC00",
    bannerBg: "linear-gradient(135deg, #FFCC00 0%, #F59E0B 45%, #D97706 100%)",
    glow: "hover:shadow-[0_20px_50px_rgba(255,204,0,0.32)]"
  },
  technical: {
    label: "TECHNICAL",
    accent: "#D97706",
    bannerAccent: "#FFCC00",
    bannerBg: "linear-gradient(135deg, #FFCC00 0%, #F59E0B 45%, #D97706 100%)",
    glow: "hover:shadow-[0_20px_50px_rgba(255,204,0,0.32)]"
  },
  events: {
    label: "EVENTS",
    accent: "#D97706",
    bannerAccent: "#FFCC00",
    bannerBg: "linear-gradient(135deg, #FFCC00 0%, #F59E0B 45%, #D97706 100%)",
    glow: "hover:shadow-[0_20px_50px_rgba(255,204,0,0.32)]"
  },
  creative: {
    label: "CREATIVE & COMMS",
    accent: "#D97706",
    bannerAccent: "#FFCC00",
    bannerBg: "linear-gradient(135deg, #FFCC00 0%, #F59E0B 45%, #D97706 100%)",
    glow: "hover:shadow-[0_20px_50px_rgba(255,204,0,0.32)]"
  }
};

/* --- SPARKLE CLUSTER COMPONENT (Inspired by Reference Graphic) ---
   Twinkling 4-dot rounded starburst in signature Cyan/Gold accents.
*/
function SparkleCluster({ x, y, color = "#38BDF8", size = 1, delay = false }) {
  return (
    <g 
      transform={`translate(${x}, ${y}) scale(${size})`} 
      className={`${delay ? 'animate-sparkle-twinkle-delay' : 'animate-sparkle-twinkle'} origin-center`}
    >
      <rect x="-2.5" y="-11" width="5" height="9" rx="2.5" fill={color} />
      <rect x="-2.5" y="2" width="5" height="9" rx="2.5" fill={color} />
      <rect x="-11" y="-2.5" width="9" height="5" rx="2.5" fill={color} />
      <rect x="2" y="-2.5" width="9" height="5" rx="2.5" fill={color} />
    </g>
  );
}

/* --- 1. VISION ANIMATION COMPONENT (Dark-Themed Celestial Astrolabe / Compass) ---
   Symbolizes: Vision, discovering direction, finding strengths.
   Design: Deep obsidian badge disc, 8-point navigational compass star, calibrated reticle rings,
   signature Celestius Gold and Cyan glowing accents, and twinkling sparkles.
*/
function VisionAnimation({ inView = true }) {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center select-none">
      {/* Soft Gold Atmospheric Glow */}
      <div 
        className={`absolute inset-4 rounded-full bg-[#FFCC00]/10 blur-2xl pointer-events-none transition-opacity duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <svg 
        viewBox="0 0 320 320" 
        className={`w-full h-full relative z-10 overflow-visible drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)] transition-all duration-1000 ${
          inView ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-90 blur-sm'
        }`}
        fill="none"
      >
        <defs>
          <radialGradient id="vision-dark-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#141926" />
            <stop offset="70%" stopColor="#0B0E17" />
            <stop offset="100%" stopColor="#07090F" />
          </radialGradient>

          <linearGradient id="vision-needle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <filter id="vision-dark-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Dark Themed Base Disc */}
        <circle 
          cx="160" 
          cy="160" 
          r="145" 
          fill="url(#vision-dark-disc)" 
          stroke="rgba(255, 204, 0, 0.28)" 
          strokeWidth="1.5" 
        />

        {/* Outer Calibrated Degree Ring */}
        <circle 
          cx="160" 
          cy="160" 
          r="128" 
          stroke="rgba(255, 255, 255, 0.12)" 
          strokeWidth="1" 
          strokeDasharray="3 6" 
        />

        {/* 2. Celestial Compass / Astrolabe Aperture */}
        <g className="animate-reticle-breath origin-center">
          {/* Outer Bold Dark Reticle Ring */}
          <circle 
            cx="160" 
            cy="160" 
            r="105" 
            stroke="#1E2638" 
            strokeWidth="7" 
            fill="none" 
          />

          {/* 4 Cardinal Crosshair Tick Marks (N, S, E, W - including the top line pointed out by user) */}
          {/* North (Top) Line */}
          <line x1="160" y1="48" x2="160" y2="76" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
          {/* South (Bottom) Line */}
          <line x1="160" y1="244" x2="160" y2="272" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
          {/* West (Left) Line */}
          <line x1="48" y1="160" x2="76" y2="160" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
          {/* East (Right) Line */}
          <line x1="244" y1="160" x2="272" y2="160" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />

          {/* Middle Concentric Ring */}
          <circle 
            cx="160" 
            cy="160" 
            r="76" 
            stroke="rgba(56, 189, 248, 0.4)" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray="16 8" 
          />

          {/* Inner Glowing Cyan Reticle Ring */}
          <circle 
            cx="160" 
            cy="160" 
            r="48" 
            stroke="#38BDF8" 
            strokeWidth="5" 
            fill="none" 
            filter="url(#vision-dark-glow)" 
          />

          {/* Slow Rotating Navigational Compass Star (Finding Direction) */}
          <g className="origin-center animate-radar-slow">
            {/* 8-Point Compass Star Rays */}
            <polygon points="160,118 165,155 160,160 155,155" fill="url(#vision-needle-grad)" />
            <polygon points="160,202 165,165 160,160 155,165" fill="#38BDF8" />
            <polygon points="118,160 155,165 160,160 155,155" fill="rgba(255,255,255,0.4)" />
            <polygon points="202,160 165,165 160,160 165,155" fill="rgba(255,255,255,0.4)" />

            {/* Corner Star Diamonds */}
            <polygon points="132,132 155,157 157,155" fill="rgba(255,204,0,0.5)" />
            <polygon points="188,132 165,157 163,155" fill="rgba(255,204,0,0.5)" />
            <polygon points="132,188 155,163 157,165" fill="rgba(56,189,248,0.5)" />
            <polygon points="188,188 165,163 163,165" fill="rgba(56,189,248,0.5)" />

            {/* Center Gold Core */}
            <circle cx="160" cy="160" r="14" fill="#0B0E17" stroke="#FFCC00" strokeWidth="2.5" />
            <circle cx="160" cy="160" r="5" fill="#FFCC00" />
          </g>
        </g>

        {/* 3. Dark Themed Twinkling Sparkle Clusters */}
        <SparkleCluster x={248} y={72} color="#FFCC00" size={1.05} />
        <SparkleCluster x={72} y={248} color="#38BDF8" size={0.9} delay={true} />
      </svg>
    </div>
  );
}

/* --- 2. MISSION ANIMATION COMPONENT (Dark-Themed Target Bullseye & Action Dart) ---
   Symbolizes: Mission, hitting the target, building real projects, practical execution.
   Design: Deep obsidian badge disc, concentric target rings, pulsing gold/cyan bullseye,
   and a dynamic flight dart piercing dead-center with quick impact twang and shockwave ripples.
*/
function MissionAnimation({ inView = true }) {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView) {
      // Re-trigger animation cleanly when scrolled into view
      setHasTriggered(false);
      const timer = setTimeout(() => {
        setHasTriggered(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setHasTriggered(false);
    }
  }, [inView]);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center select-none">
      {/* Soft Cyan/Gold Atmospheric Glow */}
      <div 
        className={`absolute inset-4 rounded-full bg-[#38BDF8]/10 blur-2xl pointer-events-none transition-opacity duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <svg 
        viewBox="0 0 320 320" 
        className={`w-full h-full relative z-10 overflow-visible drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)] transition-all duration-1000 ${
          inView ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-90 blur-sm'
        }`}
        fill="none"
      >
        <defs>
          <radialGradient id="mission-dark-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#141926" />
            <stop offset="70%" stopColor="#0B0E17" />
            <stop offset="100%" stopColor="#07090F" />
          </radialGradient>

          <filter id="mission-dark-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Dark Themed Base Disc */}
        <circle 
          cx="160" 
          cy="160" 
          r="145" 
          fill="url(#mission-dark-disc)" 
          stroke="rgba(56, 189, 248, 0.28)" 
          strokeWidth="1.5" 
        />

        {/* 2. Dynamic Bullseye Target with Rings */}
        <g className="animate-reticle-breath origin-center">
          {/* Outer Target Track */}
          <circle 
            cx="160" 
            cy="160" 
            r="108" 
            stroke="#1E2638" 
            strokeWidth="7" 
            fill="none" 
          />

          {/* Middle Target Ring in Celestius Gold */}
          <circle 
            cx="160" 
            cy="160" 
            r="78" 
            stroke="rgba(255, 204, 0, 0.45)" 
            strokeWidth="4" 
            fill="none" 
          />

          {/* Inner Accent Ring in Electric Cyan */}
          <circle 
            cx="160" 
            cy="160" 
            r="50" 
            stroke="#38BDF8" 
            strokeWidth="5" 
            fill="none" 
            filter="url(#mission-dark-glow)" 
          />

          {/* Scroll-Triggered Impact Shockwave Rings (Expanding violently when arrow strikes) */}
          {hasTriggered && (
            <>
              <circle cx="160" cy="160" r="16" fill="none" stroke="#FFCC00" className="animate-impact-shockwave-1" />
              <circle cx="160" cy="160" r="16" fill="none" stroke="#38BDF8" className="animate-impact-shockwave-2" />
            </>
          )}

          {/* Concentric Bullseye Core (Pulsing Energy Target) */}
          <g className={`origin-center ${hasTriggered ? 'animate-bullseye-pulse' : ''}`}>
            <circle cx="160" cy="160" r="24" fill="#FFCC00" filter="url(#mission-dark-glow)" />
            <circle cx="160" cy="160" r="14" fill="#0B0E17" />
            <circle cx="160" cy="160" r="6" fill="#38BDF8" />
          </g>

          {/* Dynamic Action Arrow Striking Dead-Center on Scroll */}
          <g transform="translate(160, 160) rotate(-45)">
            <g 
              key={hasTriggered ? 'arrow-struck' : 'arrow-idle'} 
              className={hasTriggered ? 'animate-arrow-flight-strike' : 'opacity-0'} 
              style={{ transformOrigin: '0px 0px' }}
            >
              {/* Bold Solid Arrow Shaft - High Contrast Dual-Layer */}
              <line x1="0" y1="-5" x2="0" y2="-100" stroke="#FFCC00" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="0" y2="-100" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

              {/* Aerodynamic Arrow Head (embedded dead-center in bullseye) */}
              <polygon points="0,2 -9,-20 0,-15 9,-20" fill="#FFFFFF" filter="url(#mission-dark-glow)" />
              <polygon points="0,-2 -6,-18 0,-14 6,-18" fill="#FFCC00" />

              {/* Arrow Fletching / Fins (Clean Aerodynamic Feathers) */}
              <polygon points="0,-72 -14,-86 0,-82" fill="#FFCC00" />
              <polygon points="0,-72 14,-86 0,-82" fill="#FFCC00" />
              <polygon points="0,-82 -14,-96 0,-92" fill="#38BDF8" />
              <polygon points="0,-82 14,-96 0,-92" fill="#38BDF8" />

              {/* Arrow Nock Cap */}
              <circle cx="0" cy="-98" r="3.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* Scroll Impact Burst Sparks */}
          {hasTriggered && (
            <g>
              <circle r="2" fill="#FFFFFF">
                <animate attributeName="cx" values="160; 144" dur="1.2s" fill="freeze" />
                <animate attributeName="cy" values="160; 176" dur="1.2s" fill="freeze" />
                <animate attributeName="opacity" values="0; 1; 0" dur="1.2s" keyTimes="0; 0.45; 1" fill="freeze" />
              </circle>
              <circle r="2" fill="#FFCC00">
                <animate attributeName="cx" values="160; 176" dur="1.2s" fill="freeze" />
                <animate attributeName="cy" values="160; 174" dur="1.2s" fill="freeze" />
                <animate attributeName="opacity" values="0; 1; 0" dur="1.2s" keyTimes="0; 0.45; 1" fill="freeze" />
              </circle>
              <circle r="1.8" fill="#38BDF8">
                <animate attributeName="cx" values="160; 178" dur="1.2s" fill="freeze" />
                <animate attributeName="cy" values="160; 144" dur="1.2s" fill="freeze" />
                <animate attributeName="opacity" values="0; 1; 0" dur="1.2s" keyTimes="0; 0.45; 1" fill="freeze" />
              </circle>
            </g>
          )}

          {/* Circular Target Tick Marks at Quadrants */}
          <circle cx="160" cy="52" r="3.5" fill="#38BDF8" />
          <circle cx="160" cy="268" r="3.5" fill="#38BDF8" />
          <circle cx="52" cy="160" r="3.5" fill="#FFCC00" />
          <circle cx="268" cy="160" r="3.5" fill="#FFCC00" />
        </g>

        {/* 3. Dark Themed Twinkling Sparkles (Opposite Corners) */}
        <SparkleCluster x={68} y={76} color="#38BDF8" size={1.05} />
        <SparkleCluster x={252} y={244} color="#FFCC00" size={0.9} delay={true} />
      </svg>
    </div>
  );
}

export default function Team({ introCompleted = true, setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle auto-scroll to community section if hash or state demands it
  useEffect(() => {
    if (window.location.hash === '#community' || window.location.hash === '#community-section') {
      const timer = setTimeout(() => {
        const el = document.getElementById('community-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Extract initials helper
  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Split name into first and remaining words for two-tone typography
  const splitName = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  };

  const filteredMembers = teamData.filter((member) => {
    return searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left space-y-12 select-none">
      
      {/* Page Header: Centered "KNOW ABOUT US" Title */}
      <section className="relative text-center pt-2 pb-4">
        <ScrollReveal animation="fade-up" delay={0} introCompleted={introCompleted}>
          <h1 
            className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-wider uppercase leading-none"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            KNOW ABOUT <span className="text-[#FFCC00]">US</span>
          </h1>
        </ScrollReveal>
      </section>

      {/* Horizontal Line Divider */}
      <div className="w-full border-b border-white/10" />

      {/* 1. VISION SECTION (Open, Unboxed Editorial Architecture with Left-aligned Animation) */}
      <section className="relative pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Vision Graphic (Inspired by Reference Image) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <ScrollReveal animation="zoom-in" delay={60} introCompleted={introCompleted}>
              {({ isVisible }) => <VisionAnimation inView={isVisible} />}
            </ScrollReveal>
          </div>

          {/* Right Column: Vision Editorial Text */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <ScrollReveal animation="fade-up" delay={50} introCompleted={introCompleted}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2.5 font-mono text-xs font-bold text-[#FFCC00] tracking-[0.25em] uppercase">
                </div>

                <div className="space-y-2">
                  <h2 
                    className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    OUR VISION
                  </h2>
                  {/* Reference-Inspired Yellow Accent Underline Bar */}
                  <div className="w-20 h-1.5 bg-[#FFCC00] rounded-full" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120} introCompleted={introCompleted}>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl tracking-normal pt-1">
                "To build a learning community where every student can discover their strengths, find their direction, and become capable of turning what they learn into something real."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. MISSION SECTION (Open, Unboxed Architecture - Alternating Zig-Zag: Content Left, Graphic Right) */}
      <section className="relative border-t border-white/10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Mission Editorial Text */}
          <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
            <ScrollReveal animation="fade-up" delay={50} introCompleted={introCompleted}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2.5 font-mono text-xs font-bold text-[#FFCC00] tracking-[0.25em] uppercase">
                </div>

                <div className="space-y-2">
                  <h2 
                    className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    OUR MISSION
                  </h2>
                  {/* Reference-Inspired Yellow Accent Underline Bar */}
                  <div className="w-20 h-1.5 bg-[#FFCC00] rounded-full" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120} introCompleted={introCompleted}>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl tracking-normal pt-1">
                "To help students start early, explore different fields, build strong fundamentals, work on real projects, learn from one another, and grow through practical experience."
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Mission Graphic (Inspired by Reference Image) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <ScrollReveal animation="zoom-in" delay={80} introCompleted={introCompleted}>
              {({ isVisible }) => <MissionAnimation inView={isVisible} />}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. CREW DIRECTORY & ACCESS BADGES */}
      <section id="community-section" className="relative border-t border-white/10 pt-16 sm:pt-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal animation="fade-up" delay={50} introCompleted={introCompleted}>
            <div className="space-y-2">
              <h2 
                className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                OUR TECH <span className="text-[#FFCC00]">COMMUNITY</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Sizable, High-End Futuristic Search Bar */}
          <ScrollReveal animation="fade-up" delay={100} className="w-full md:w-auto" introCompleted={introCompleted}>
            <div className="relative w-full md:w-80 lg:w-96 group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FFCC00]/20 via-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
              <div className="relative flex items-center bg-[#0e121d]/85 backdrop-blur-md border border-white/15 group-hover:border-[#FFCC00]/40 group-focus-within:border-[#FFCC00] rounded-xl transition-all duration-300 shadow-inner">
                <Search className="w-4 h-4 ml-4 text-zinc-400 group-focus-within:text-[#FFCC00] transition-colors shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search crew by name or role..."
                  className="w-full px-3.5 py-3 bg-transparent text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mr-3 p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Authentic ID Cards Grid (Faithfully Inspired by Reference Image) */}
      <section className="relative">
        {filteredMembers.length === 0 ? (
          <div className="py-20 text-center space-y-3 font-mono">
            <p className="text-zinc-500 text-sm">NO CREW MEMBERS FOUND MATCHING "{searchQuery.toUpperCase()}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#FFCC00] underline uppercase hover:text-white transition-colors"
            >
              CLEAR SEARCH
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => {
              const config = CATEGORY_CONFIG[member.category] || CATEGORY_CONFIG.technical;
              const initials = getInitials(member.name);
              const { first, last } = splitName(member.name);

              return (
                <ScrollReveal
                  key={member.id}
                  animation="fade-up"
                  delay={(index % 4) * 60}
                  className="h-full"
                  introCompleted={introCompleted}
                >
                  {/* Outer Translucent Acrylic Badge Pouch Holder */}
                  <div
                    className="group relative rounded-[32px] p-2.5 sm:p-3 bg-[#E2E8F0] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(0,0,0,0.55),0_0_35px_rgba(255,204,0,0.25)] flex flex-col justify-between h-full select-none will-change-transform"
                  >
                    {/* Top Lanyard Clip Bar with 3 Punch Holes */}
                    <div className="pt-1 pb-3 flex items-center justify-center gap-3 pointer-events-none">
                      {/* Left Circular Punch Hole */}
                      <div className="w-3 h-3 rounded-full bg-zinc-800/80 border border-zinc-600/40 shadow-inner" />
                      
                      {/* Center Wide Oval Lanyard Slot */}
                      <div className="w-14 h-3.5 rounded-full bg-zinc-800/80 border border-zinc-600/40 shadow-inner flex items-center justify-center">
                        <div className="w-7 h-1 rounded-full bg-zinc-600/40" />
                      </div>

                      {/* Right Circular Punch Hole */}
                      <div className="w-3 h-3 rounded-full bg-zinc-800/80 border border-zinc-600/40 shadow-inner" />
                    </div>

                    {/* Inner Physical ID Card */}
                    <div className="relative rounded-[22px] overflow-hidden bg-white shadow-md flex flex-col justify-between flex-1">
                      
                      {/* TOP SECTION: Celestius Brand Gold/Amber Header with Logo & Brand Name */}
                      <div 
                        className="relative overflow-hidden pt-4 pb-14 px-4 text-center"
                        style={{ background: config.bannerBg }}
                      >
                        {/* Refined Club Logo & Tech Community Subtitle */}
                        <div className="relative z-10 flex flex-col items-center justify-center pt-0.5 pb-1">
                          <img 
                            src={logoImg} 
                            alt="Celestius Logo" 
                            className="h-8 sm:h-9 w-auto object-contain drop-shadow-sm" 
                          />
                          <span className="font-mono text-[9px] font-black text-black tracking-[0.22em] uppercase mt-1 select-none">
                            TECH COMMUNITY
                          </span>
                        </div>

                        {/* Smooth Organic Layered Wave Dividing Header and Body */}
                        <svg 
                          viewBox="0 0 300 65" 
                          preserveAspectRatio="none" 
                          className="absolute -bottom-0.5 inset-x-0 w-full h-12 pointer-events-none z-10"
                        >
                          {/* Soft Amber Shadow Wave */}
                          <path 
                            d="M 0,15 C 80,45 150,15 220,35 C 260,45 285,30 300,20 L 300,65 L 0,65 Z" 
                            fill="#FEF3C7" 
                          />
                          {/* Main White Cut Wave */}
                          <path 
                            d="M 0,25 C 70,50 140,25 210,40 C 255,50 280,35 300,25 L 300,65 L 0,65 Z" 
                            fill="#FFFFFF" 
                          />
                        </svg>
                      </div>

                      {/* CENTER CIRCULAR PORTRAIT AVATAR (Overlapping the Wave Boundary) */}
                      <div className="relative -mt-12 z-20 flex flex-col items-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full p-1 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
                          <div 
                            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center shadow-inner"
                            style={{ background: config.bannerBg }}
                          >
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={`${member.name}, ${member.role}`}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            ) : (
                              <span
                                className="font-ndot text-3xl sm:text-4xl text-black font-bold tracking-wider leading-none select-none"
                                style={{ fontFamily: "'VT323', monospace" }}
                              >
                                {initials}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* LOWER SECTION: Name & Role Designation (No truncation, complete full name) */}
                      <div className="px-3 pt-3 pb-2 text-center space-y-1 relative z-20 min-h-[72px] flex flex-col justify-center">
                        {/* Member Full Name */}
                        <h3 
                          className="text-base sm:text-[17px] font-bold uppercase tracking-tight text-zinc-900 leading-snug flex flex-wrap items-center justify-center gap-x-1.5"
                          title={member.name}
                        >
                          <span>{first}</span>
                          {last && <span style={{ color: config.accent }}>{last}</span>}
                        </h3>

                        {/* Designation / Role */}
                        <p className="text-xs sm:text-[13px] font-semibold tracking-wide text-zinc-600 uppercase leading-snug">
                          {member.role}
                        </p>
                      </div>

                      {/* HANDLES: ONLY GitHub & LinkedIn Links */}
                      <div className="px-4 pt-2 pb-3 flex items-center justify-center gap-2 relative z-20">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 hover:text-black font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-150 active:scale-95 shadow-sm cursor-pointer"
                            title={`${member.name}'s GitHub`}
                          >
                            <Github className="w-3.5 h-3.5 text-zinc-700" />
                            <span>GITHUB</span>
                          </a>
                        )}

                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 hover:text-black font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-150 active:scale-95 shadow-sm cursor-pointer"
                            title={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-3.5 h-3.5 text-[#D97706]" />
                            <span>LINKEDIN</span>
                          </a>
                        )}
                      </div>

                      {/* AUTHENTIC BARCODE STRIP (Faithful to Reference Image) */}
                      <div className="pt-1 pb-2 flex flex-col items-center justify-center pointer-events-none">
                        <div className="h-6 flex items-end justify-center gap-[2px] opacity-75 select-none">
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1.5 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1.5 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-2 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1.5 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-0.5 h-6 bg-zinc-900" />
                          <span className="w-1 h-6 bg-zinc-900" />
                        </div>
                      </div>

                      {/* BOTTOM ACCENT SMILE CURVE STRIP */}
                      <div 
                        className="h-2 w-full pointer-events-none"
                        style={{ backgroundColor: config.bannerAccent || config.accent }}
                      />

                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Join Our Community CTA Banner */}
      <ScrollReveal animation="fade-up" delay={150} introCompleted={introCompleted}>
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-[#121624]/90 to-[#0a0d16]/95 backdrop-blur-xl p-6 sm:p-10 text-center space-y-5 shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Small Top Tag */}

          {/* Main Hook */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 
              className="font-ndot text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider leading-tight"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              WANT TO BE A PART OF OUR <span className="text-[#FFCC00]">COMMUNITY</span>?
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Start early, build real-world products, and collaborate with passionate builders across development, AI, design, and events.
            </p>
          </div>

          {/* CTA Action Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                if (typeof setActivePage === 'function') {
                  setActivePage('recruitment');
                } else {
                  window.location.href = '/recruitment';
                }
              }}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-[#FFCC00] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(255,204,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Recruitments</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}
