import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight,
  Send,
  Users
} from 'lucide-react';
import hephaestusImg from '../assets/hephaestus.png';
import athenaImg from '../assets/athena.png';

// Dynamic Bi-directional Scroll Reveal Component
function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.08,
  className = '',
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already within viewport on page reload
    const checkImmediate = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 80 && rect.bottom >= -80) {
        // Small timeout ensures the initial hidden styles render first so CSS transitions trigger visibly
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
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
        rootMargin: '80px 0px 80px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getHiddenTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 32px, 0) scale(0.98)';
      case 'fade-down':
        return 'translate3d(0, -32px, 0) scale(0.98)';
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
    filter: isVisible ? 'blur(0px)' : 'blur(4px)',
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

// Clean Hand-Drawn Athena Showpiece with Interactive Hover Animation
function AthenaShowpiece() {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 7;
    const rotateY = (x / (rect.width / 2)) * 7;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 select-none cursor-pointer"
    >
      <div 
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `perspective(900px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        }}
      >
        <div className="relative">
          <img 
            src={athenaImg} 
            alt="Athena - Goddess of Wisdom & Strategy" 
            className={`h-[340px] sm:h-[420px] lg:h-[480px] w-auto object-contain transition-all duration-300 ${
              isHovered 
                ? 'opacity-100 brightness-125 contrast-125' 
                : 'opacity-85 contrast-110 brightness-100 hover:opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Clean Hand-Drawn Hephaestus Showpiece with Interactive Hover Animation
function HephaestusShowpiece() {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Smooth 3D tilt
    const rotateX = -(y / (rect.height / 2)) * 7;
    const rotateY = (x / (rect.width / 2)) * 7;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 select-none cursor-pointer"
    >
      {/* 3D Tilt Card Frame with Zero Shadows */}
      <div 
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `perspective(900px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        }}
      >
        {/* Hand-Drawn Line-Art Statue with Pure 3D Tilt Effect & Zero Shadows */}
        <div className="relative">
          <img 
            src={hephaestusImg} 
            alt="Hephaestus - God of the Forge" 
            className={`h-[400px] sm:h-[480px] lg:h-[530px] w-auto object-contain transition-all duration-300 ${
              isHovered 
                ? 'opacity-100 brightness-125 contrast-125' 
                : 'opacity-85 contrast-110 brightness-100 hover:opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home({ 
  setActivePage, 
  introCompleted = true,
  recruitmentOpenStatus = true 
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 text-left space-y-24 animate-fadeIn overflow-hidden">
      
      {/* 1. Hero Section with Hephaestus (Untouched) */}
      <section className="relative min-h-[500px] lg:min-h-[580px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Left Side: Bold Typography & CTAs */}
        <div className="relative z-10 lg:col-span-7 space-y-6">
          
          {/* Clean Display Headline */}
          <div className="space-y-3">
            <h1 
              style={{ 
                fontFamily: "'VT323', monospace",
                ...(introCompleted
                  ? { animation: 'heroReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both' }
                  : { opacity: 0 })
              }} 
              className="font-ndot text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.98] uppercase font-normal"
            >
              Innovate. <br />
              Build. <br />
              <span className="text-[#FFCC00]">Collaborate.</span>
            </h1>

            <p 
              style={
                introCompleted
                  ? { animation: 'heroReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }
                  : { opacity: 0 }
              }
              className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-lg pt-1"
            >
              Celestius is the premier student-run technical community of Chennai Institute of Technology. 
              Forging intelligent software, competitive engineering, artificial intelligence, and shared craftsmanship.
            </p>
          </div>

          {/* Tactile Action Buttons */}
          <div 
            style={
              introCompleted
                ? { animation: 'heroReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both' }
                : { opacity: 0 }
            }
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={() => setActivePage('recruitment')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15 cursor-pointer"
            >
              <span>EXPLORE RECRUITMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActivePage('events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
            >
              <span>EXPLORE EVENTS [02]</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

        </div>

        {/* Right Side: Cool Hephaestus 3D Tilt & Forge Glow Showpiece */}
        <div 
          style={
            introCompleted
              ? { animation: 'statueReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both' }
              : { opacity: 0 }
          }
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <HephaestusShowpiece />
        </div>

      </section>

      {/* 2. Recruitment Information Section (Open Architectural Layout - Non-Container) */}
      <section className="border-t border-white/10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Status Beacon & Large Typography */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal animation="fade-up" delay={0}>
              {/* Live Status Indicator */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span 
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      recruitmentOpenStatus ? 'bg-[#FFCC00]' : 'bg-amber-400'
                    }`} 
                  />
                  <span 
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      recruitmentOpenStatus ? 'bg-[#FFCC00]' : 'bg-amber-400'
                    }`} 
                  />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  // ADMISSIONS PIPELINE
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span 
                  className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                    recruitmentOpenStatus ? 'text-[#FFCC00]' : 'text-amber-400'
                  }`}
                >
                  {recruitmentOpenStatus ? 'STATUS: LIVE' : 'STATUS: OPENING SOON'}
                </span>
              </div>
            </ScrollReveal>

            {/* Display Headline */}
            <ScrollReveal animation="fade-up" delay={60}>
              <h2 
                className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-[0.95]"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                {recruitmentOpenStatus ? (
                  <>
                    RECRUITMENT <br />
                    <span className="text-[#FFCC00]">IS NOW LIVE.</span>
                  </>
                ) : (
                  <>
                    RECRUITMENT <br />
                    <span className="text-[#FFCC00]">OPENING SOON.</span>
                  </>
                )}
              </h2>

              <p className="font-mono text-xs text-zinc-500 tracking-wider pt-2">
                [ COHORT 2026 // CIT CAMPUS ]
              </p>
            </ScrollReveal>
          </div>

          {/* Right Side: Narrative, Tracks & Action Triggers */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl">
                {recruitmentOpenStatus ? (
                  "Celestius recruitment is officially open for first-year engineering students across all departments of Chennai Institute of Technology. Step up to build production software, design cutting-edge digital experiences, host large-scale hackathons, and represent CIT in national competitions."
                ) : (
                  "Preparation for the 2026 recruitment cohort is currently underway. We will soon be opening intake for passionate first-year student developers, designers, video creators, and event architects. Get ready for joining the crew, polish your portfolio, and stay tuned for the official launch."
                )}
              </p>
            </ScrollReveal>

            {/* Division Tracks Pills */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
                  TECHNICAL [FRONTEND & BACKEND]
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  CREATIVE [UI/UX & VIDEO]
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  OPERATIONS [EVENTS & SPEAKING]
                </span>
              </div>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {recruitmentOpenStatus ? (
                  <>
                    <button
                      onClick={() => setActivePage('recruitment/apply')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>APPLY HERE</span>
                    </button>

                    <button
                      onClick={() => setActivePage('recruitment')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>VIEW ALL ROLES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setActivePage('recruitment')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15 cursor-pointer"
                    >
                      <span>EXPLORE ROLES & TRACKS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActivePage('team')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>MEET OUR COMMUNITY</span>
                      <Users className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. Explore & Discover Celestius Section (Athena on Left, Typography & Actions on Right) */}
      <section className="border-t border-white/10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hand-Drawn Athena Showpiece */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <ScrollReveal animation="zoom-in" delay={80}>
              <AthenaShowpiece />
            </ScrollReveal>
          </div>

          {/* Right Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <ScrollReveal animation="fade-up" delay={0}>
                <h2 
                  className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-[0.98]"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  WANT TO KNOW <br />
                  <span className="text-[#FFCC00]">MORE ABOUT US?</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={80}>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-xl pt-1">
                  Explore everything about Celestius — from our technical events and hackathon podium track records to our diverse community of student builders, mentors, and technology leaders.
                </p>
              </ScrollReveal>
            </div>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" delay={140}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    window.history.pushState(null, '', '/team');
                    setActivePage('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15 cursor-pointer"
                >
                  <span>EXPLORE ABOUT US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    window.history.pushState(null, '', '/events');
                    setActivePage('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
                >
                  <span>VIEW EVENTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    window.history.pushState(null, '', '/team#community');
                    setActivePage('team');
                    setTimeout(() => {
                      const el = document.getElementById('community-section');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 120);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
                >
                  <span>MEET THE TEAM</span>
                  <Users className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
}

