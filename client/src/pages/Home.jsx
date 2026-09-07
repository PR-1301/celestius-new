import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Palette, 
  Terminal, 
  Trophy, 
  Calendar, 
  ChevronRight,
  Compass,
  Users,
  Layers,
  MapPin,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import hephaestusImg from '../assets/hephaestus.png';
import { eventsData } from '../data/eventsData';

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

// Scroll Reveal Component using IntersectionObserver for dynamic scroll-triggered animations
function RevealItem({
  as: Component = 'div',
  animation = 'cardVerticalRise',
  delay = 0,
  duration = '0.65s',
  introCompleted = true,
  className = '',
  style = {},
  children,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const shouldAnimate = introCompleted && isVisible;

  const animStyle = shouldAnimate
    ? {
        animation: `${animation} ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
        ...style
      }
    : {
        opacity: 0,
        ...style
      };

  return (
    <Component
      ref={domRef}
      className={className}
      style={animStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function Home({ setActivePage, setSelectedEvent, introCompleted = true }) {
  const badgeAnimations = [
    'cardDiagonalLeft',
    'cardVerticalRise',
    'cardPopScale',
    'cardDiagonalRight'
  ];

  const trackAnimations = [
    'cardDiagonalLeft',
    'cardVerticalRise',
    'cardDiagonalRight',
    'cardFlipUp',
    'cardPopScale',
    'cardGlideRight'
  ];

  const eventAnimations = [
    'cardDiagonalLeft',
    'cardDiagonalRight'
  ];

  const featuredEvents = eventsData.filter(e => e.featured);

  const goldTheme = {
    border: "border-[#FFCC00]/40 hover:border-[#FFCC00]",
    bg: "bg-gradient-to-b from-[#18150d] via-[#0d0d12] to-[#070709]",
    shadow: "shadow-[0_0_25px_rgba(255,204,0,0.12)]",
    hoverShadow: "hover:shadow-[0_12px_40px_rgba(255,204,0,0.25)]",
    glowBg: "bg-[#FFCC00]",
    accentText: "text-[#FFCC00]",
    tagBg: "bg-[#FFCC00]/10",
    tagBorder: "border-[#FFCC00]/25",
    iconBorder: "border-[#FFCC00]/40",
    accentDot: "bg-[#FFCC00]"
  };

  const cyanTheme = {
    border: "border-sky-400/40 hover:border-sky-400",
    bg: "bg-gradient-to-b from-[#0a1827] via-[#0d0d12] to-[#070709]",
    shadow: "shadow-[0_0_25px_rgba(56,189,248,0.12)]",
    hoverShadow: "hover:shadow-[0_12px_40px_rgba(56,189,248,0.25)]",
    glowBg: "bg-sky-400",
    accentText: "text-sky-400",
    tagBg: "bg-sky-400/10",
    tagBorder: "border-sky-400/25",
    iconBorder: "border-sky-400/40",
    accentDot: "bg-sky-400"
  };

  const pillars = [
    {
      code: "01",
      icon: Code2,
      title: "Web & Distributed Systems",
      desc: "Architecting reactive frontends, resilient microservices, client state, and distributed cloud computing infrastructure.",
      tag: "REACT // CLOUD // GO",
      ...goldTheme
    },
    {
      code: "02",
      icon: Cpu,
      title: "Applied AI & Intelligence",
      desc: "Deploying production-grade machine learning pipelines, LLM fine-tuning, retrieval systems, and neural vision tools.",
      tag: "PYTORCH // LLMS // VISION",
      ...cyanTheme
    },
    {
      code: "03",
      icon: ShieldCheck,
      title: "Systems & Cybersecurity",
      desc: "Linux kernel exploration, network defense protocols, vulnerability assessment, cryptography, and CTF challenges.",
      tag: "LINUX // CRYPTO // CTF",
      ...goldTheme
    },
    {
      code: "04",
      icon: Palette,
      title: "Design Systems & Media",
      desc: "Crafting modern design tokens, high-fidelity prototypes, brand typography, and pixel-precise user experiences.",
      tag: "FIGMA // TOKENS // MOTION",
      ...cyanTheme
    },
    {
      code: "05",
      icon: Terminal,
      title: "Open Source & Developer Tools",
      desc: "Contributing to global public repositories, CLI tools, developer productivity libraries, and open peer collaboration.",
      tag: "CLI // GIT // TOOLS",
      ...goldTheme
    },
    {
      code: "06",
      icon: Compass,
      title: "Competitive Programming",
      desc: "Algorithmic thinking, discrete math problem solving, data structure optimization, and collegiate coding olympiads.",
      tag: "DSA // GRAPHS // CONTESTS",
      ...cyanTheme
    }
  ];

  const stats = [
    { 
      code: "01", 
      value: "500+", 
      label: "ACTIVE MEMBERS", 
      sub: "Engineers across all CIT departments",
      icon: Users,
      ...goldTheme
    },
    { 
      code: "02", 
      value: "30+", 
      label: "HACKATHON WINS", 
      sub: "National & state competitive podiums",
      icon: Trophy,
      ...cyanTheme
    },
    { 
      code: "03", 
      value: "40+", 
      label: "TECHNICAL WORKSHOPS", 
      sub: "Hands-on bootcamps & practicals",
      icon: Terminal,
      ...goldTheme
    },
    { 
      code: "04", 
      value: "15+", 
      label: "PRODUCTION PROJECTS", 
      sub: "Open source repositories & campus tools",
      icon: Layers,
      ...cyanTheme
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 text-left space-y-24 animate-fadeIn overflow-hidden">
      
      {/* 1. Hero Section with Hephaestus (Only Hephaestus) with 3D Forge Animation */}
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
              Forging open-source systems, competitive engineering, artificial intelligence, and shared craftsmanship.
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

      {/* 2. Redesigned Bento Stats Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const IconComp = stat.icon;
          const anim = badgeAnimations[i % badgeAnimations.length];
          return (
            <RevealItem 
              as="div"
              key={stat.code}
              animation={anim}
              delay={(i * 0.08).toFixed(2)}
              introCompleted={introCompleted}
              className={`group relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] ${stat.border} ${stat.bg} ${stat.shadow} ${stat.hoverShadow}`}
            >
              {/* Radial ambient glow */}
              <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${stat.glowBg}`} />
              <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Top bar: Number tag + Icon pod */}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${stat.tagBg} ${stat.tagBorder} ${stat.accentText}`}>
                    [{stat.code}]
                  </span>
                  
                  <div className={`w-10 h-10 rounded-xl bg-black/60 border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${stat.iconBorder} ${stat.accentText}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                {/* Counter / Value */}
                <div>
                  <span 
                    className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider block font-bold transition-colors group-hover:brightness-125"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    {stat.value}
                  </span>
                  <h4 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider mt-1">
                    {stat.label}
                  </h4>
                </div>
              </div>

              {/* Bottom subtitle & divider */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="truncate pr-2">{stat.sub}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${stat.accentDot} shrink-0 animate-pulse`} />
              </div>
            </RevealItem>
          );
        })}
      </section>

      {/* 3. Redesigned Core Technical Tracks */}
      <section className="space-y-8">
        
        {/* Section Header */}
        <RevealItem 
          as="div"
          animation="recruitHeaderZoom"
          delay={0}
          introCompleted={introCompleted}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              SPECIALIZATIONS // DISCIPLINES_DIRECTORY
            </span>
            <h2 
              className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase leading-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              CORE TECHNICAL TRACKS
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              [ SIX SPECIALIZED ENGINEERING & CREATIVE DOMAINS ]
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
            <span className="text-[#FFCC00] font-bold">06 DIVISIONS</span>
            <span>// CIT_CAMPUS</span>
          </div>
        </RevealItem>

        {/* 6 Grid Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const IconComp = pillar.icon;
            const anim = trackAnimations[i % trackAnimations.length];
            return (
              <RevealItem 
                as="div"
                key={pillar.code}
                animation={anim}
                delay={((i % 3) * 0.08).toFixed(2)}
                introCompleted={introCompleted}
                className={`group relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] ${pillar.border} ${pillar.bg} ${pillar.shadow} ${pillar.hoverShadow}`}
              >
                {/* Radial ambient glow */}
                <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${pillar.glowBg}`} />
                <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Top Bar: Icon Pod + Step Tag */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-black/60 border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${pillar.iconBorder} ${pillar.accentText}`}>
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${pillar.tagBg} ${pillar.tagBorder} ${pillar.accentText}`}>
                      {pillar.code} // TRACK
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 
                      className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight group-hover:text-[#FFCC00] transition-colors"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-2.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                {/* Card Divider & Footer */}
                <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400 text-[11px] flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${pillar.accentDot}`} />
                    {pillar.tag}
                  </span>
                  <span className={`font-bold flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1.5 ${pillar.accentText}`}>
                    <span>CIT.CEL_{pillar.code}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </div>

      </section>

      {/* 4. Redesigned Featured Flagship Initiatives */}
      <section className="space-y-8">
        
        {/* Section Header */}
        <RevealItem 
          as="div"
          animation="recruitHeaderZoom"
          delay={0}
          introCompleted={introCompleted}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              SCHEDULE // FLAGSHIP_SERIES
            </span>
            <h2 
              className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase leading-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              FEATURED INITIATIVES
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              [ FLAGSHIP HACKATHONS & IMMERSIVE MASTERCLASSES ]
            </p>
          </div>

          <button
            onClick={() => setActivePage('events')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 text-[#FFCC00] font-mono text-xs hover:border-[#FFCC00] hover:bg-[#FFCC00]/10 transition-all active:scale-95 cursor-pointer"
          >
            <span>VIEW ALL EVENTS [02]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </RevealItem>

        {/* 2 Flagship Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredEvents.map((evt, i) => {
            const anim = eventAnimations[i % eventAnimations.length];
            const isHackathon = evt.category.toLowerCase().includes('hackathon');
            const accentText = isHackathon ? 'text-[#FFCC00]' : 'text-sky-400';
            const accentBorder = isHackathon ? 'border-[#FFCC00]/40 hover:border-[#FFCC00]' : 'border-sky-400/40 hover:border-sky-400';
            const accentShadow = isHackathon 
              ? 'shadow-[0_0_30px_rgba(255,204,0,0.15)] hover:shadow-[0_16px_50px_rgba(255,204,0,0.3)]' 
              : 'shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:shadow-[0_16px_50px_rgba(56,189,248,0.3)]';
            const cardBg = isHackathon
              ? 'bg-gradient-to-b from-[#18140b] via-[#0b0c10] to-[#060608]'
              : 'bg-gradient-to-b from-[#091522] via-[#0b0c10] to-[#060608]';
            const tagBg = isHackathon ? 'bg-[#FFCC00]/10' : 'bg-sky-400/10';
            const tagBorder = isHackathon ? 'border-[#FFCC00]/25' : 'border-sky-400/25';
            const btnBg = isHackathon ? 'bg-[#FFCC00] text-black hover:bg-[#FFE066]' : 'bg-sky-400 text-black hover:bg-sky-300';

            return (
              <RevealItem 
                as="div"
                key={evt.id}
                animation={anim}
                delay={(i * 0.12).toFixed(2)}
                introCompleted={introCompleted}
                className={`group relative rounded-3xl p-7 sm:p-8 border flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] ${accentBorder} ${cardBg} ${accentShadow}`}
              >
                {/* Ambient glow */}
                <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${isHackathon ? 'bg-[#FFCC00]' : 'bg-sky-400'}`} />
                <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Top Bar: Category pill + Live Status */}
                  <div className="flex items-center justify-between flex-wrap gap-2 font-mono text-xs">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${tagBg} ${tagBorder} ${accentText}`}>
                      [{evt.category.toUpperCase()}] // FLAGSHIP
                    </span>
                    <span className={`flex items-center gap-1.5 text-[11px] font-bold ${accentText}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isHackathon ? 'bg-[#FFCC00]' : 'bg-sky-400'} animate-pulse`} />
                      {evt.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 
                      className="font-ndot text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight group-hover:text-[#FFCC00] transition-colors"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-2.5">
                      {evt.description}
                    </p>
                  </div>

                  {/* Meta Grid Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/60 border border-white/10 text-zinc-300">
                      <Calendar className={`w-4 h-4 ${accentText} shrink-0`} />
                      <span className="truncate">{evt.date}</span>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-black/60 border border-white/10 text-zinc-300">
                      <Trophy className={`w-4 h-4 ${accentText} shrink-0`} />
                      <span className="truncate">{evt.prizePool}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar: Location + Action Button */}
                <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-400 truncate max-w-xs">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate text-[11px]">{evt.location}</span>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className={`px-5 py-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer ${btnBg}`}
                  >
                    SPECIFICATIONS [→]
                  </button>
                </div>

              </RevealItem>
            );
          })}
        </div>

      </section>

      {/* 5. Redesigned Recruitment Standby Terminal */}
      <RevealItem 
        as="section"
        animation="recruitBentoExpand"
        duration="0.75s"
        delay={0}
        introCompleted={introCompleted}
        className="relative rounded-3xl p-8 sm:p-12 border border-[#FFCC00]/40 bg-gradient-to-b from-[#141209]/95 via-[#0a0a0f] to-[#060608] shadow-[0_20px_70px_rgba(255,204,0,0.15)] overflow-hidden space-y-6 backdrop-blur-2xl"
      >
        {/* Ambient radial glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FFCC00]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Status Capsule */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] text-[#FFCC00] bg-[#FFCC00]/10 px-3.5 py-1.5 rounded-full border border-[#FFCC00]/30 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse shadow-[0_0_8px_#FFCC00]" />
            <span>ADMISSIONS_PIPELINE // STANDBY_MODE</span>
          </div>

          {/* Heading */}
          <h2 
            className="font-ndot text-4xl sm:text-6xl text-white uppercase tracking-wide leading-none"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            PREPARING OUR NEXT COHORT. <br />
            <span className="text-[#FFCC00]">STANDBY FOR INDUCTION.</span>
          </h2>

          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-sans max-w-2xl">
            Celestius will shortly unlock admissions across Technical (Frontend, Backend) and Non-Technical (Designing, Event Coordinator, Editor, Photography & Videography, Public Speaking) divisions for students of Chennai Institute of Technology.
          </p>

          {/* Division Preview Badges */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-[#FFCC00]/30 text-[#FFCC00] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
              TECHNICAL [2 TEAMS]
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-sky-400/30 text-sky-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              NON-TECHNICAL [5 TEAMS]
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('recruitment')}
              className="px-7 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE ALL ROLES [04]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActivePage('team')}
              className="px-7 py-3 rounded-full bg-black/70 border border-white/20 text-white font-mono text-xs hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
            >
              MEET CURRENT TEAM [03]
            </button>
          </div>
        </div>
      </RevealItem>

    </div>
  );
}
