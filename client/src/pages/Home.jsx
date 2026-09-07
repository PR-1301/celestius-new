import React, { useState, useRef } from 'react';
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
  Compass
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
      className="relative w-full flex items-end justify-center lg:justify-end select-none cursor-pointer py-2"
    >
      {/* 3D Interactive Container */}
      <div 
        className="relative z-10 transition-transform duration-300 ease-out will-change-transform flex flex-col items-center"
        style={{
          transform: `perspective(900px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? 1.03 : 1})`,
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

export default function Home({ setActivePage, setSelectedEvent }) {
  const featuredEvents = eventsData.filter(e => e.featured);

  const pillars = [
    {
      code: "01",
      icon: Code2,
      title: "Web & Distributed Systems",
      desc: "Architecting reactive frontends, resilient microservices, client state, and distributed cloud computing infrastructure."
    },
    {
      code: "02",
      icon: Cpu,
      title: "Applied AI & Intelligence",
      desc: "Deploying production-grade machine learning pipelines, LLM fine-tuning, retrieval systems, and neural vision tools."
    },
    {
      code: "03",
      icon: ShieldCheck,
      title: "Systems & Cybersecurity",
      desc: "Linux kernel exploration, network defense protocols, vulnerability assessment, cryptography, and CTF challenges."
    },
    {
      code: "04",
      icon: Palette,
      title: "Design Systems & Media",
      desc: "Crafting modern design tokens, high-fidelity prototypes, brand typography, and pixel-precise user experiences."
    },
    {
      code: "05",
      icon: Terminal,
      title: "Open Source & Developer Tools",
      desc: "Contributing to global public repositories, CLI tools, developer productivity libraries, and open peer collaboration."
    },
    {
      code: "06",
      icon: Compass,
      title: "Competitive Programming",
      desc: "Algorithmic thinking, discrete math problem solving, data structure optimization, and collegiate coding olympiads."
    }
  ];

  const stats = [
    { code: "01", value: "500+", label: "ACTIVE MEMBERS", sub: "Engineers across all CIT departments" },
    { code: "02", value: "30+", label: "HACKATHON WINS", sub: "National & state competitive podiums" },
    { code: "03", value: "40+", label: "TECHNICAL WORKSHOPS", sub: "Hands-on bootcamps & practicals" },
    { code: "04", value: "15+", label: "PRODUCTION PROJECTS", sub: "Open source repositories & campus tools" }
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
              style={{ fontFamily: "'VT323', monospace" }} 
              className="font-ndot text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.98] uppercase font-normal"
            >
              Innovate. <br />
              Build. <br />
              <span className="text-[#FFCC00]">Collaborate.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-lg pt-1">
              Celestius is the premier student-run technical community of Chennai Institute of Technology. 
              Forging open-source systems, competitive engineering, artificial intelligence, and shared craftsmanship.
            </p>
          </div>

          {/* Tactile Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('recruitment')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15"
            >
              <span>EXPLORE RECRUITMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActivePage('events')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all"
            >
              <span>EXPLORE EVENTS [02]</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

        </div>

        {/* Right Side: Cool Hephaestus 3D Tilt & Forge Glow Showpiece */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <HephaestusShowpiece />
        </div>

      </section>

      {/* 2. Bento Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div 
            key={stat.code}
            className="nothing-card p-6 flex flex-col justify-between space-y-4 border border-white/10 hover:border-[#FFCC00]/40 group"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="group-hover:text-[#FFCC00] transition-colors">[{stat.code}]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
            </div>
            
            <div className="space-y-1">
              <span className="font-ndot text-3xl sm:text-4xl text-white group-hover:text-[#FFCC00] transition-colors tracking-wider">
                {stat.value}
              </span>
              <h4 className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wide">
                {stat.label}
              </h4>
              <p className="text-[11px] text-zinc-500 font-sans">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Core Technical Tracks */}
      <section className="space-y-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">
              (SPECIALIZATIONS // DISCIPLINES)
            </span>
            <h2 className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Core Technical Tracks
            </h2>
          </div>
          <span className="hidden sm:block font-mono text-xs text-zinc-500">
            [6 DIVISIONS]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div 
                key={pillar.code}
                className="nothing-card p-6 flex flex-col justify-between space-y-6 group hover:border-[#FFCC00]/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#FFCC00] group-hover:border-[#FFCC00]/50 group-hover:bg-[#FFCC00]/10 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                      // {pillar.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-ndot text-lg text-white group-hover:text-[#FFCC00] transition-colors tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-2">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>CIT.CEL_{pillar.code}</span>
                  <span className="group-hover:translate-x-1 group-hover:text-[#FFCC00] transition-all">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. Featured Flagship Initiatives */}
      <section className="space-y-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest">
              (SCHEDULE // INITIATIVES)
            </span>
            <h2 className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Featured Flagship Initiatives
            </h2>
          </div>

          <button
            onClick={() => setActivePage('events')}
            className="font-mono text-xs text-[#FFCC00] hover:underline flex items-center gap-1.5"
          >
            <span>ALL_EVENTS [02]</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredEvents.map((evt) => (
            <div 
              key={evt.id}
              className="nothing-card p-7 flex flex-col justify-between space-y-6 group hover:border-[#FFCC00]/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/25 text-[10px]">
                    [{evt.category.toUpperCase()}]
                  </span>
                  <span className="text-[#FFCC00] flex items-center gap-1.5 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
                    {evt.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-ndot text-xl sm:text-2xl text-white tracking-wide uppercase group-hover:text-[#FFCC00] transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {evt.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>{evt.prizePool}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-500 truncate max-w-[200px]">
                  {evt.location}
                </span>
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="font-mono text-xs px-4 py-2 rounded-full bg-[#FFCC00] text-black font-bold hover:bg-[#FFE066] transition-colors shadow-sm"
                >
                  DETAILS [→]
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. Recruitment Standby Banner */}
      <section className="nothing-card p-8 sm:p-12 relative overflow-hidden border border-[#FFCC00]/30">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-[#FFCC00] bg-[#FFCC00]/10 px-3 py-1 rounded-full border border-[#FFCC00]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
            <span>(RECRUITMENT // STANDBY_MODE)</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight">
            Preparing Our Next Cohort. <br />
            <span className="text-[#FFCC00]">Stay Tuned for Induction.</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Technical (Frontend, Backend) and Non-Technical (Designing, Event Coordinator, Editor, Photography & Videography, Public Speaking) roles will open soon for students of Chennai Institute of Technology.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage('recruitment')}
              className="px-6 py-2.5 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] transition-all shadow-md shadow-[#FFCC00]/15"
            >
              EXPLORE_ROLES [04]
            </button>
            <button
              onClick={() => setActivePage('team')}
              className="px-6 py-2.5 rounded-full bg-black border border-white/20 text-white font-mono text-xs hover:border-[#FFCC00]/50 hover:text-[#FFCC00] transition-all"
            >
              MEET_TEAM [03]
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
