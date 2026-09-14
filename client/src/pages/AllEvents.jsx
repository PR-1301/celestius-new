import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Users, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Sparkles, 
  Code2, 
  Terminal, 
  Layers, 
  Compass, 
  Laptop, 
  Trophy 
} from 'lucide-react';

// Scroll reveal component for smooth viewport entry animations
function RevealOnScroll({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 filter-none' 
          : 'opacity-0 translate-y-8 blur-[0.5px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AllEvents({ setActivePage }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll depth for the subtle top telemetry line
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const eventsList = [
    {
      id: 'takshashila-web',
      title: "Takshashila'24 Official Website",
      category: 'production',
      categoryTag: 'PRODUCTION PLATFORM',
      description: "Designed and developed the official digital portal for Takshashila'24 – “The Rhythm of Life”, the annual college cultural festival. The web platform served as the central hub for event rules, multi-track schedules, online registrations, and live festival operations.",
      icon: Globe,
      accent: '#FFCC00',
      highlights: [
        'End-to-end responsive web architecture engineered for fest operations',
        'Real-time event schedules, rulebooks, and multi-round registrations',
        'High-concurrency load handling built to support peak campus traffic'
      ]
    },
    {
      id: 'hackerz-ai',
      title: "AI Workshop — Hackerz'24",
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Conducted an interactive Artificial Intelligence workshop as part of Hackerz'25. The session introduced students across all departments to fundamental AI principles, real-world deployment patterns, and the expanding role of machine intelligence in modern software systems.",
      icon: Cpu,
      accent: '#38BDF8',
      highlights: [
        'Core AI architectures and practical operational workflows',
        'Real-world industry use cases and technology trajectories',
        'Live interactive coding demonstrations with audience participation'
      ]
    },
    {
      id: 'transformers-workshop',
      title: 'Transformers Workshop ',
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Conducted an advanced masterclass exploring Transformer architecture and its central role in modern artificial intelligence. The workshop deconstructed self-attention mechanisms, tokenized contextual representations, and the underlying foundations of Large Language Models and Generative AI systems.",
      icon: Sparkles,
      accent: '#FFCC00',
      highlights: [
        'Mathematical foundations of multi-head attention and positional encodings',
        'Architectural design patterns behind modern frontier language models',
        'Model fine-tuning fundamentals and open-source inference pipelines'
      ]
    },
    {
      id: 'deadlock-coding',
      title: 'Deadlock — Speed Coding Battle',
      category: 'competitions',
      categoryTag: 'COMPETITIVE ARENA',
      description: "Organized Deadlock, an intense head-to-head competitive programming tournament where developers battled in 1v1 algorithmic duels. Participants were challenged to solve algorithmic problems with speed and precision, advancing through knockout tournament brackets to the finals.",
      icon: Code2,
      accent: '#F43F5E',
      highlights: [
        'Real-time head-to-head algorithmic problem solving under pressure',
        'Strict runtime evaluation and edge-case validation suites',
        'Knockout tournament elimination bracket format'
      ]
    },
    {
      id: 'reverse-engineering',
      title: "Reverse Engineering — Takshashila'25",
      category: 'competitions',
      categoryTag: 'COMPETITIVE ARENA',
      description: "Conducted a specialized technical competition where participants analyzed pre-compiled binaries and explored internal system logic. The challenge focused on logical deduction, runtime debugging, disassembly, and understanding compiled programs to solve technical security puzzles.",
      icon: Terminal,
      accent: '#38BDF8',
      highlights: [
        'Deconstruction of binary logic and compiled execution flows',
        'Dynamic debugging, disassembly tracing, and state inspection',
        'Hands-on Capture The Flag style puzzle solving'
      ]
    },
    {
      id: 'github-ml',
      title: "GitHub & Machine Learning Workshop — Takshashila'24",
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Conducted a practical, hands-on workshop bridging version control and machine learning fundamentals. Participants gained direct experience with Git repositories, collaborative pull request workflows, and foundational machine learning algorithms applied to real datasets.",
      icon: Layers,
      accent: '#10B981',
      highlights: [
        'Essential Git workflows: branch management, rebasing, and merge resolution',
        'Open-source repository maintenance and team collaboration conventions',
        'Practical implementation of baseline machine learning models'
      ]
    },
    {
      id: 'prompt-verse',
      title: 'PromptVerse — Prompt Engineering Workshop',
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Conducted PromptVerse, an applied laboratory focused on prompt engineering techniques and effective interaction with generative AI tools. Students learned structured prompting frameworks, context optimization, and how to harness AI for software development, research, and productivity.",
      icon: Cpu,
      accent: '#FFCC00',
      highlights: [
        'Few-shot, Chain-of-Thought, and persona-driven prompting frameworks',
        'Context window optimization and hallucination mitigation strategies',
        'Practical acceleration of academic study and development workflows'
      ]
    },
    {
      id: 'uiux-competition',
      title: 'UI/UX Competition — Tech Fiesta',
      category: 'competitions',
      categoryTag: 'COMPETITIVE ARENA',
      description: "Organized a user experience and interface design competition as part of Tech Fiesta. Competitors designed intuitive, user-friendly digital products, demonstrating design thinking, user persona research, and prototyping skills to address practical community needs.",
      icon: Compass,
      accent: '#EC4899',
      highlights: [
        'User persona definition, journey mapping, and empathy-driven design',
        'High-fidelity interactive prototype development in Figma',
        'Usability evaluation and responsive mobile-first interface design'
      ]
    },
    {
      id: 'uiux-workshop-youthfest',
      title: 'UI/UX Workshop — Youth Fest',
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Conducted an introductory design masterclass during Youth Fest. The session covered the essentials of human-centered design, typography, spacing hierarchies, component reusability, and the practical workflow of turning concept sketches into production-ready user interfaces.",
      icon: Laptop,
      accent: '#8B5CF6',
      highlights: [
        'Visual hierarchy, typography scales, and contrast ratios',
        'Wireframing methodologies for web and mobile interfaces',
        'Bridging the design handoff between UI designers and frontend developers'
      ]
    },
    {
      id: 'tech-trivia',
      title: 'Tech Trivia — Tech Fiesta',
      category: 'competitions',
      categoryTag: 'COMPETITIVE ARENA',
      description: "Organized Tech Trivia, a fast-paced interactive quiz tournament held during Tech Fiesta. Teams competed across rounds covering computer science history, programming languages, artificial intelligence milestones, and technological culture.",
      icon: Trophy,
      accent: '#FFCC00',
      highlights: [
        'Multi-round trivia covering software development history and emerging technology',
        'Rapid buzzer rounds challenging depth of knowledge and speed of thought',
        'Fostered cross-department camaraderie and tech excitement across CIT'
      ]
    },
    {
      id: 'online-events-series',
      title: 'Online Technical Events Series',
      category: 'workshops',
      categoryTag: 'WORKSHOP & MASTERCLASS',
      description: "Hosted a comprehensive series of remote workshops and bootcamps providing continuous learning opportunities beyond standard coursework. Tracks included Git and GitHub collaboration, Full-Stack web engineering, and digital product design fundamentals.",
      icon: Terminal,
      accent: '#38BDF8',
      highlights: [
        'Dedicated Git & GitHub module: CLI proficiency and remote collaboration',
        'Full Stack Development Bootcamp: modern component and API architecture',
        'UI/UX Masterclass: component-driven interface design and user testing'
      ]
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? eventsList 
    : eventsList.filter((e) => e.category === activeFilter);

  return (
    <div className="relative min-h-screen text-left">
      {/* Top Telemetry Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#FFCC00]/50 via-[#FFCC00] to-[#FFF59D] transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 space-y-16 overflow-hidden">
        
        {/* 1. Header & Navigation */}
        <RevealOnScroll delay={50} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setActivePage('events')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FFCC00]" />
              <span>RETURN TO EVENTS</span>
            </button>

            <button
              onClick={() => setActivePage('recruitment')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00]/10 hover:bg-[#FFCC00]/20 border border-[#FFCC00]/30 text-[#FFCC00] font-mono text-xs transition-all active:scale-95 cursor-pointer font-bold"
            >
              <span>APPLY TO CELESTIUS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <span className="font-mono text-[11px] text-[#FFCC00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              // OFFICIAL CELESTIUS CHRONICLE • 2024–2026
            </span>

            <h1 
              className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-[0.98]"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              ALL EVENTS <br />
              <span className="text-[#FFCC00]">CONDUCTED BY US.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-3xl pt-1">
              A comprehensive chronicle of technical workshops, competitive arenas, hackathons, and production digital platforms engineered and hosted by Celestius at Chennai Institute of Technology.
            </p>
          </div>
        </RevealOnScroll>

        {/* 2. Founding & Community Origin Spotlight Banner */}
        <RevealOnScroll delay={100}>
          <section className="relative rounded-3xl p-7 sm:p-10 border border-[#FFCC00]/25 bg-gradient-to-b from-[#11110a] via-[#09090c] to-[#060608] shadow-[0_20px_50px_rgba(255,204,0,0.05)] overflow-hidden space-y-5">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FFCC00]/10 blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
              <span className="font-mono text-xs text-[#FFCC00] font-bold uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5" />
                FOUNDING MILESTONE // OCTOBER 9, 2024
              </span>
              <span className="font-mono text-xs text-zinc-500">
                [ CIT CHENNAI ]
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              <h2 
                className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide leading-tight"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                CELESTIUS — <span className="text-[#FFCC00]">TECH COMMUNITY</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-3xl">
                Inaugurated on <strong className="text-white">October 9, 2024</strong>, Celestius was started by <strong className="text-[#FFCC00]">10 students</strong> with the vision of building a strong technical community at Chennai Institute of Technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CORE FOCUS & PHILOSOPHY
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    The community centers on collaboration, learning, knowledge sharing, and growth among students across technology disciplines.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    UNRESTRICTED INCLUSIVITY
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Events and activities are open to students from all departments, with no restrictions, encouraging everyone to explore technology.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* 3. Minimal Filter Tabs */}
        <RevealOnScroll delay={150}>
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            {[
              { id: 'all', label: 'ALL EVENTS' },
              { id: 'workshops', label: 'WORKSHOPS' },
              { id: 'competitions', label: 'COMPETITIONS' },
              { id: 'production', label: 'PRODUCTION PLATFORMS' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#FFCC00] text-black shadow-md shadow-[#FFCC00]/20'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* 4. Events Cards Grid with Smooth Scroll Reveal & Clean Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt, index) => {
            const IconComponent = evt.icon;
            return (
              <RevealOnScroll key={evt.id} delay={(index % 2) * 120}>
                <div
                  className="group relative rounded-3xl p-7 sm:p-8 border border-white/10 hover:border-[#FFCC00]/40 bg-gradient-to-b from-[#0e0e14] to-[#07070a] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg h-full"
                >
                  {/* Ambient corner glow on hover */}
                  <div 
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ backgroundColor: evt.accent }}
                  />

                  <div className="space-y-4 relative z-10">
                    {/* Single Clean Category Label */}
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[11px] font-bold text-[#FFCC00] tracking-wider uppercase flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#FFCC00]" />
                        {evt.categoryTag}
                      </span>
                      <IconComponent className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    </div>

                    {/* Title */}
                    <h3 
                      className="font-ndot text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight group-hover:text-[#FFCC00] transition-colors"
                      style={{ fontFamily: "'VT323', monospace" }}
                    >
                      {evt.title}
                    </h3>

                    {/* Event Description (Pure Narrative, Zero Metric Pluses) */}
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 space-y-1.5 border-t border-white/[0.06]">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">KEY INITIATIVES:</span>
                      <ul className="space-y-1 font-sans text-xs text-zinc-400">
                        {evt.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] shrink-0 mt-1.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Clean Divider */}
                  <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-500 relative z-10">
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFCC00]" />
                      CONDUCTED INITIATIVE
                    </span>
                    <span className="text-[10px] text-zinc-600 tracking-wider">
                      CIT CAMPUS
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* 5. Bottom Navigation & Action Section */}
        <RevealOnScroll delay={100}>
          <section className="border-t border-white/10 pt-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 
                  className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide leading-none"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  WANT TO BE A PART OF US?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl">
                  Join the Celestius tech community, collaborate with builders and designers across all disciplines, and engineer the next generation of initiatives together.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setActivePage('recruitment')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-black font-mono text-xs font-bold hover:bg-[#FFE066] active:scale-95 transition-all shadow-lg shadow-[#FFCC00]/15 cursor-pointer"
                >
                  <span>APPLY HERE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActivePage('events')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 text-white font-mono text-xs border border-white/20 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] active:scale-95 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
                  <span>BACK TO EVENTS</span>
                </button>
              </div>
            </div>
          </section>
        </RevealOnScroll>

      </div>
    </div>
  );
}
