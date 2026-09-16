import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Code2, 
  Server, 
  Palette, 
  CalendarCheck, 
  Mic2, 
  Film,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  X,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  Type,
  Layout,
  Award,
  MessageSquare,
  Zap,
  Users,
  Radio,
  Package,
  Clock,
  Shield,
  Target,
  PenTool
} from 'lucide-react';

// Dynamic Bi-directional Scroll Reveal Component
// Seamlessly animates elements into view on scroll, and resets on exit so it replays dynamically every time
function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 750,
  threshold = 0.08,
  className = '',
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dynamically toggle on scroll enter & exit so animations repeat every time user returns
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getHiddenTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 36px, 0) scale(0.96)';
      case 'fade-down':
        return 'translate3d(0, -36px, 0) scale(0.96)';
      case 'slide-left':
        return 'translate3d(-40px, 0, 0)';
      case 'slide-right':
        return 'translate3d(40px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.92)';
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
      {children}
    </div>
  );
}

const RECRUITMENT_TEAMS = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    division: 'Tech',
    subRole: 'Frontend Developer',
    tagline: 'User Interfaces & Interactive Experiences',
    icon: Code2,
    whatWeExpect: [
      'Basic understanding of HTML & CSS',
      'Familiarity with basic JavaScript concepts',
      'Interest in building websites and interactive interfaces',
      'Willingness to learn modern frontend technologies'
    ],
    whatYoullGet: [
      'Hands-on experience building real club projects',
      'Guidance in JavaScript, React & modern frontend tools',
      'Exposure to UI development, responsiveness and web architecture',
      'Opportunities to build projects for your portfolio'
    ]
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    division: 'Tech',
    subRole: 'Backend Developer',
    tagline: 'Server Architecture & Systems Infrastructure',
    icon: Server,
    whatWeExpect: [
      'Basic programming knowledge in any language',
      'Understanding of basic programming concepts and logic',
      'Interest in how servers, APIs and databases work',
      'Willingness to learn backend technologies'
    ],
    whatYoullGet: [
      'Hands-on experience building APIs and backend systems',
      'Guidance in databases, authentication and server-side development',
      'Exposure to real-world backend architecture',
      'Opportunities to contribute to live club projects'
    ]
  },
  {
    id: 'public-speaking',
    name: 'Public speaking',
    division: 'Non-Tech',
    subRole: 'Public speaking',
    tagline: 'Emceeing, Anchoring & Club Representation',
    icon: Mic2,
    whatWeExpect: [
      'Confidence or willingness to speak in front of others',
      'Basic communication and presentation skills',
      'Ability to express ideas clearly',
      'Enthusiasm for hosting and representing the club'
    ],
    whatYoullGet: [
      'Experience in hosting, anchoring and public speaking',
      'Training to improve communication and stage presence',
      'Opportunities to host club events and represent the community',
      'A platform to build confidence and leadership skills'
    ]
  },
  {
    id: 'events',
    name: 'Events',
    division: 'Non-Tech',
    subRole: 'Events',
    tagline: 'Logistics, Operations & Stage Management',
    icon: CalendarCheck,
    whatWeExpect: [
      'Interest in planning and organizing events',
      'Good communication and coordination skills',
      'Ability to work effectively within a team',
      'Willingness to take responsibility and execute tasks'
    ],
    whatYoullGet: [
      'Hands-on experience organizing technical and non-technical events',
      'Exposure to planning, logistics and event execution',
      'Experience working with teams, speakers and participants',
      'Opportunities to develop leadership and management skills'
    ]
  },
  {
    id: 'design',
    name: 'Design',
    division: 'Non-Tech',
    subRole: 'Design',
    tagline: 'Visual Identity & Product Experience',
    icon: Palette,
    whatWeExpect: [
      'Interest in visual design and creativity',
      'Basic familiarity with any design tool (Figma, Canva, Photoshop, etc.)',
      'Understanding of basic visual principles is a plus',
      'Willingness to experiment and learn'
    ],
    whatYoullGet: [
      'Hands-on experience designing posters, social media content and interfaces',
      'Opportunities to shape the club\'s visual identity',
      'Real projects to strengthen your design portfolio'
    ]
  },
  {
    id: 'editor',
    name: 'Editor',
    division: 'Non-Tech',
    subRole: 'Editor',
    tagline: 'Video Editing & Visual Storytelling',
    icon: Film,
    whatWeExpect: [
      'Interest in video editing and visual storytelling',
      'Basic familiarity with any editing tool (Premiere Pro, DaVinci Resolve, CapCut, Canva, etc.)',
      'Good sense of timing, composition and creativity',
      'Willingness to learn and experiment with different editing styles'
    ],
    whatYoullGet: [
      'Hands-on experience creating event videos, reels and promotional content',
      'Opportunities to work on real club content and projects',
      'A portfolio of creative work and practical production experience'
    ]
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    division: 'Non-Tech',
    subRole: 'Content Creator',
    tagline: 'Content Strategy, Storytelling & Social Media',
    icon: PenTool,
    whatWeExpect: [
      'Interest in writing, storytelling and creating engaging content',
      'Basic understanding of social media content is a plus',
      'Ability to express ideas clearly and creatively',
      'Willingness to explore different content formats and learn'
    ],
    whatYoullGet: [
      'Hands-on experience creating social media, event and promotional content',
      'Opportunities to shape how Celestius communicates with its audience',
      'Real work to build your content portfolio and creative skills'
    ]
  }
];

// Brand logos & topic icons for tech and non-tech skill tags
const renderSkillLogo = (skill) => {
  const s = skill.toLowerCase();

  // 1. Tech Stacks - Authentic SVG Brand Logos
  if (s.includes('react') || s.includes('next')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4 h-4 shrink-0" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (s.includes('node') || s.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
        <path d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm0 2.4l6.8 3.9v5.4l-6.8 3.9-6.8-3.9V8.3l6.8-3.9z" fill="#68A063"/>
      </svg>
    );
  }
  if (s.includes('mongo')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#13AA52">
        <path d="M12 1.5C11.5 1.7 8.5 7.5 8.5 12c0 3.7 2 6.7 3.5 8.5.3-2.5.3-8 0-10.5 0-3 0-8.5 0-8.5s-.3 5.5 0 8.5c0 2.5 0 8-.3 10.5 1.5-1.8 3.8-4.8 3.8-8.5 0-4.5-3-10.3-3.5-10.5z"/>
      </svg>
    );
  }
  if (s.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    );
  }
  if (s.includes('html') || s.includes('css') || s.includes('js')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
        <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
        <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.9-.7 1.9-2.1v-5.2h-1.6v5.2c0 .6-.3.9-.7.9-.3 0-.6-.2-.8-.6L7 16.5zm8.5-4.4c-.8-.5-1.4-.8-1.4-1.3 0-.5.4-.8 1-.8.6 0 1 .3 1.3.8l1.3-.9c-.6-1-1.5-1.4-2.6-1.4-1.4 0-2.4.9-2.4 2.1 0 1.2.8 1.8 1.8 2.2.9.4 1.4.7 1.4 1.4 0 .6-.5 1-1.2 1-.8 0-1.4-.4-1.7-1.1l-1.3.8c.6 1.2 1.6 1.8 3 1.8 1.6 0 2.6-.9 2.6-2.3 0-1.4-.9-1.9-1.9-2.3z" fill="#000"/>
      </svg>
    );
  }
  if (s.includes('docker') || s.includes('cloud')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#2496ED">
        <path d="M13.9 8.2h1.6v1.6H13.9zm-2.2 0h1.6v1.6h-1.6zm-2.2 0h1.6v1.6H9.5zm-2.2 0H8.9v1.6H7.3zm4.4-2.2h1.6v1.6h-1.6zm-2.2 0h1.6v1.6H9.5zm-2.2 0H8.9v1.6H7.3zM22 12.3c-.5-.4-1.5-.5-2.2-.2-.2-.5-.5-.9-.9-1.2l-.6-.4-.4.6c-.3.6-.3 1.4-.1 2.1-.5.3-1.4.3-2.1.2H2.3c-.2.9 0 1.8.3 2.6.8 1.9 2.4 3.4 4.5 4 4.3 1.2 8.7.6 12.6-1.6 1.3-.8 2.2-2 2.6-3.5.1-.6.1-1.2 0-1.8-.1-.3-.2-.5-.3-.8z"/>
      </svg>
    );
  }
  if (s.includes('git')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.8 2.8c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.3-.4-2l-2.6-2.6v4.3c.3.2.6.5.7.9.4.9 0 2-.9 2.4-.9.4-2 0-2.4-.9-.4-.9 0-2 .9-2.4.4-.2.9-.2 1.3 0v-4.4c-.4-.2-.9-.2-1.3 0-.9.4-2 0-2.4-.9-.4-.9 0-2 .9-2.4.4-.2.9-.2 1.3 0L8.6 3.6 2.4 9.8c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z"/>
      </svg>
    );
  }
  if (s.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
        <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
        <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262"/>
        <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE"/>
        <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
        <path d="M8 12h4v2.5a2.5 2.5 0 1 1-4-2.5z" fill="#0ACF83"/>
      </svg>
    );
  }

  // 2. Protocols, Security & Concepts
  if (s.includes('rest') || s.includes('api')) {
    return <Globe className="w-4 h-4 text-sky-400 shrink-0" />;
  }
  if (s.includes('auth') || s.includes('security')) {
    return <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />;
  }
  if (s.includes('animation')) {
    return <Sparkles className="w-4 h-4 text-[#FFCC00] shrink-0" />;
  }

  // 3. Design & Non-Tech Roles
  if (s.includes('graphic') || s.includes('design')) {
    return <Palette className="w-4 h-4 text-pink-400 shrink-0" />;
  }
  if (s.includes('typography') || s.includes('color')) {
    return <Type className="w-4 h-4 text-amber-400 shrink-0" />;
  }
  if (s.includes('prototyping') || s.includes('ui/ux')) {
    return <Layout className="w-4 h-4 text-purple-400 shrink-0" />;
  }
  if (s.includes('brand')) {
    return <Award className="w-4 h-4 text-yellow-400 shrink-0" />;
  }

  // 4. Public Speaking & Anchoring
  if (s.includes('stage') || s.includes('presence')) {
    return <Mic2 className="w-4 h-4 text-rose-400 shrink-0" />;
  }
  if (s.includes('diction') || s.includes('articulate')) {
    return <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />;
  }
  if (s.includes('improvisation')) {
    return <Zap className="w-4 h-4 text-yellow-300 shrink-0" />;
  }
  if (s.includes('engagement') || s.includes('audience') || s.includes('leadership')) {
    return <Users className="w-4 h-4 text-teal-400 shrink-0" />;
  }
  if (s.includes('anchoring')) {
    return <Radio className="w-4 h-4 text-amber-400 shrink-0" />;
  }

  // 5. Events & Operations
  if (s.includes('logistics')) {
    return <Package className="w-4 h-4 text-orange-400 shrink-0" />;
  }
  if (s.includes('time')) {
    return <Clock className="w-4 h-4 text-blue-400 shrink-0" />;
  }
  if (s.includes('crisis')) {
    return <Shield className="w-4 h-4 text-red-400 shrink-0" />;
  }
  // 6. Content Creation & Storytelling
  if (s.includes('story') || s.includes('writing') || s.includes('copy')) {
    return <PenTool className="w-4 h-4 text-emerald-400 shrink-0" />;
  }
  if (s.includes('content') || s.includes('social') || s.includes('media')) {
    return <MessageSquare className="w-4 h-4 text-pink-400 shrink-0" />;
  }

  return <Sparkles className="w-4 h-4 text-zinc-400 shrink-0" />;
};

export default function Recruitment({ introCompleted = true, setActivePage, recruitmentOpenStatus = true }) {
  const [activeDivision, setActiveDivision] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);

  // Dynamic Typewriter Effect for Hero
  const activePhrases = [
    "RECRUITMENT APPLICATIONS ARE NOW ACTIVE.",
    "APPLY FOR TECH & NON-TECH ROLES.",
    "JOIN THE CELESTIUS INNOVATION CREW.",
    "SUBMIT YOUR APPLICATION VIA STEP CONSOLE."
  ];

  const closedPhrases = [
    "STAY TUNED FOR APPLYING.",
    "GET READY FOR JOINING THE CREW.",
    "PREPARE YOUR PORTFOLIO & TRACKS.",
    "APPLICATIONS OPENING SOON."
  ];

  const phrases = recruitmentOpenStatus ? activePhrases : closedPhrases;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timer;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 55);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, 25);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRole(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background scroll when popup is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRole]);

  // Navigate to /recruitment/apply and Pre-select role silently in localStorage
  const handleApplyForRole = (role) => {
    if (!recruitmentOpenStatus) {
      return;
    }

    try {
      const v3Raw = localStorage.getItem('celestius_recruitment_application_draft_v3');
      const v2Raw = localStorage.getItem('celestius_recruitment_application_draft_v2');
      const parsed = v3Raw ? JSON.parse(v3Raw) : (v2Raw ? JSON.parse(v2Raw) : {});
      parsed.role = role.division;
      parsed.subRole = role.subRole;
      localStorage.setItem('celestius_recruitment_application_draft_v3', JSON.stringify(parsed));
      localStorage.setItem('celestius_recruitment_application_draft_v2', JSON.stringify(parsed));
      // Set explicit flag for pre-selected role
      localStorage.setItem('celestius_recruitment_selected_role', JSON.stringify({
        role: role.division,
        subRole: role.subRole
      }));
    } catch (e) {}

    setSelectedRole(null);
    if (typeof setActivePage === 'function') {
      setActivePage('recruitment/apply');
    } else {
      window.location.href = '/recruitment/apply';
    }
  };

  const getDisplayedRoles = () => {
    if (activeDivision === 'technical') {
      return RECRUITMENT_TEAMS.filter((t) => t.division === 'Tech');
    }
    if (activeDivision === 'nonTechnical') {
      return RECRUITMENT_TEAMS.filter((t) => t.division === 'Non-Tech');
    }
    return RECRUITMENT_TEAMS;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-left space-y-16 select-none">
      
      {/* 1. Dynamic Hero Section */}
      <section className="relative space-y-6 pt-2 pb-2">
        <div className="space-y-5 max-w-4xl">
          <ScrollReveal animation="fade-down" delay={0}>
            <div className="flex items-center gap-2.5 font-mono text-xs">
              {recruitmentOpenStatus ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
                  <span className="tracking-widest uppercase font-bold text-[#FFCC00]">CELESTIUS RECRUITMENTS</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="tracking-widest uppercase font-bold text-amber-400">RECRUITMENTS CURRENTLY PAUSED • STAY TUNED </span>
                </>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={80}>
            <h1 
              className="font-ndot text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.08]"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              JOIN THE CREW. <br />
              <span className="text-[#FFCC00] inline-block min-h-[1.2em]">
                {displayText}
                <span className="inline-block w-3 sm:w-4 h-7 sm:h-12 bg-[#FFCC00] ml-1.5 align-middle animate-pulse" />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={160}>
            {recruitmentOpenStatus ? (
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
                Celestius recruitments are now officially live. Explore our Technical and Non-Technical divisions, review role mandates, and launch the multi-step application console.
              </p>
            ) : (
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
                Recruitment applications are currently closed. Get ready for joining the crew and stay tuned for the next official intake announcement! In the meantime, explore our divisions and role mandates below.
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={240}>
            <div className="pt-3 flex flex-wrap items-center gap-4">
              {recruitmentOpenStatus ? (
                <button
                  onClick={() => {
                    if (typeof setActivePage === 'function') {
                      setActivePage('recruitment/apply');
                    } else {
                      window.location.href = '/recruitment/apply';
                    }
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,204,0,0.35)] active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>APPLY NOW</span>
                </button>
              ) : (
                <div className="px-6 py-3.5 rounded-xl bg-white/5 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_20px_rgba(245,158,11,0.15)] select-none">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>STAY TUNED • APPLICATIONS OPENING SOON</span>
                </div>
              )}

              <a
                href="#roles-taxonomy"
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-sm tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>EXPLORE TRACKS ({RECRUITMENT_TEAMS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Interactive Role Directory & Track Selector */}
      <section id="roles-taxonomy" className="space-y-8 scroll-mt-28">
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest font-bold">
                // ROLE CATALOGUE & SPECIFICATIONS
              </span>
              <h2 
                className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                SELECT YOUR DOMAIN
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                [ CLICK ANY ROLE CARD TO VIEW DETAILED BRIEF & DIRECTLY APPLY ]
              </p>
            </div>

            {/* Division Filter Buttons */}
            <div className="flex items-center gap-1 bg-black p-1 rounded-full border border-white/15">
              <button
                onClick={() => setActiveDivision('all')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  activeDivision === 'all'
                    ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ALL_TEAMS [{RECRUITMENT_TEAMS.length}]
              </button>
              <button
                onClick={() => setActiveDivision('technical')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  activeDivision === 'technical'
                    ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                TECH [{RECRUITMENT_TEAMS.filter((t) => t.division === 'Tech').length}]
              </button>
              <button
                onClick={() => setActiveDivision('nonTechnical')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  activeDivision === 'nonTechnical'
                    ? 'bg-sky-400 text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                NON-TECH [{RECRUITMENT_TEAMS.filter((t) => t.division === 'Non-Tech').length}]
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Roles Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDisplayedRoles().map((role, idx) => {
            const IconComp = role.icon || Sparkles;
            const isTech = role.division === 'Tech';

            return (
              <ScrollReveal 
                key={role.id}
                animation="fade-up"
                delay={(idx % 3) * 110}
                className="h-full"
              >
                <div 
                  onClick={() => setSelectedRole(role)}
                  className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ease-out border flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 hover:scale-[1.01] h-full ${
                    isTech
                      ? 'border-[#FFCC00]/40 bg-gradient-to-b from-[#16140b] via-[#0b0c0f] to-[#060608] shadow-[0_0_25px_rgba(255,204,0,0.12)] hover:border-[#FFCC00] hover:shadow-[0_12px_40px_rgba(255,204,0,0.28)]'
                      : 'border-sky-400/40 bg-gradient-to-b from-[#091522] via-[#0b0c0f] to-[#060608] shadow-[0_0_25px_rgba(56,189,248,0.12)] hover:border-sky-400 hover:shadow-[0_12px_40px_rgba(56,189,248,0.28)]'
                  }`}
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl ${
                      isTech ? 'from-[#FFCC00]/20' : 'from-sky-400/20'
                    }`} 
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div 
                        className={`w-12 h-12 rounded-2xl bg-black/70 border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${
                          isTech
                            ? 'border-[#FFCC00]/40 text-[#FFCC00] group-hover:bg-[#FFCC00]/20'
                            : 'border-sky-400/40 text-sky-400 group-hover:bg-sky-400/20'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <span 
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
                          isTech 
                            ? 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/30' 
                            : 'bg-sky-400/10 text-sky-400 border-sky-400/30'
                        }`}
                      >
                        {role.division}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 
                        className={`font-ndot text-3xl sm:text-4xl tracking-wide uppercase leading-none transition-all ${
                          isTech ? 'text-[#FFCC00]' : 'text-sky-400'
                        }`}
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {role.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed line-clamp-2">
                        {role.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                    </span>
                    <span 
                      className={`font-bold flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
                        isTech ? 'text-[#FFCC00]' : 'text-sky-400'
                      }`}
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 3. ULTRA-MODERN ASYMMETRICAL CYBER-POD MODAL (Exact original content, fresh bespoke UI) */}
      {selectedRole && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedRole(null)}
        >
          {(() => {
            const isTech = selectedRole.division === 'Tech';
            const accentColor = isTech ? '#FFCC00' : '#38bdf8';
            const RoleIcon = selectedRole.icon || Sparkles;

            // 3D Spherical & Liquid Mesh Gradient Config matching the reference images
            const bubbleTheme = isTech
              ? {
                  primary: 'radial-gradient(circle at 35% 28%, #FFFBEB 0%, #FDE047 25%, #EAB308 55%, #78350F 85%, #180902 100%)',
                  secondary: 'radial-gradient(circle at 35% 28%, #FFFFFF 0%, #FEF08A 30%, #F59E0B 60%, #92400E 90%, #200D02 100%)',
                  tertiary: 'radial-gradient(circle at 30% 25%, #FEF9C3 0%, #EAB308 40%, #854D0E 80%, #150700 100%)',
                  aura1: '#EAB308',
                  aura2: '#F59E0B',
                  glow: 'rgba(234, 179, 8, 0.35)'
                }
              : {
                  primary: 'radial-gradient(circle at 35% 28%, #E0F2FE 0%, #38BDF8 30%, #6366F1 65%, #312E81 90%, #0B0E1B 100%)',
                  secondary: 'radial-gradient(circle at 35% 28%, #F5D0FE 0%, #C084FC 35%, #7C3AED 70%, #4C1D95 90%, #120A2A 100%)',
                  tertiary: 'radial-gradient(circle at 30% 25%, #BAE6FD 0%, #0284C7 45%, #1E3A8A 85%, #050B14 100%)',
                  aura1: '#38BDF8',
                  aura2: '#818CF8',
                  glow: 'rgba(56, 189, 248, 0.35)'
                };

            return (
              <div 
                className="relative w-full max-w-4xl max-h-[92vh] bg-[#07070a]/90 border border-white/20 rounded-[28px] overflow-hidden flex flex-col md:flex-row text-left animate-modal-pop backdrop-blur-3xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: `0 0 70px ${accentColor}25, 0 35px 90px rgba(0,0,0,0.95)`
                }}
              >
                {/* 1. Deep Ambient Liquid Mesh Gradient Aurora (Image 1 "Bubbles" Effect) */}
                <div 
                  className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[90px] pointer-events-none animate-bubble-1 opacity-45"
                  style={{ backgroundColor: bubbleTheme.aura1 }}
                />
                <div 
                  className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full blur-[100px] pointer-events-none animate-bubble-2 opacity-40"
                  style={{ backgroundColor: bubbleTheme.aura2 }}
                />
                <div 
                  className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-[85px] pointer-events-none animate-bubble-3 opacity-25"
                  style={{ backgroundColor: isTech ? '#D97706' : '#A855F7' }}
                />

                {/* 2. Floating 3D Cosmic Bubble Spheres (Image 2 Orbs Effect) */}
                <div 
                  className="absolute -top-8 left-20 w-44 h-44 rounded-full pointer-events-none animate-bubble-1 opacity-60 transition-opacity duration-700"
                  style={{
                    background: bubbleTheme.primary,
                    boxShadow: `0 15px 40px -10px ${bubbleTheme.glow}, inset 0 2px 6px rgba(255,255,255,0.6)`
                  }}
                />
                <div 
                  className="absolute -bottom-12 right-16 w-56 h-56 rounded-full pointer-events-none animate-bubble-2 opacity-50 transition-opacity duration-700"
                  style={{
                    background: bubbleTheme.secondary,
                    boxShadow: `0 20px 50px -10px ${bubbleTheme.glow}, inset 0 2px 8px rgba(255,255,255,0.5)`
                  }}
                />
                <div 
                  className="absolute top-1/3 -left-8 w-28 h-28 rounded-full pointer-events-none animate-bubble-3 opacity-55"
                  style={{
                    background: bubbleTheme.tertiary,
                    boxShadow: `0 10px 30px -5px ${bubbleTheme.glow}, inset 0 1.5px 5px rgba(255,255,255,0.6)`
                  }}
                />
                <div 
                  className="absolute bottom-16 left-1/2 w-20 h-20 rounded-full pointer-events-none animate-bubble-4 opacity-40"
                  style={{
                    background: bubbleTheme.primary,
                    boxShadow: `0 8px 25px -5px ${bubbleTheme.glow}, inset 0 1px 4px rgba(255,255,255,0.7)`
                  }}
                />

                {/* Subtle Dot Matrix Pattern Overlay */}
                <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

                {/* Frosted Glass Vignette Overlay ensuring pristine text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/60 via-[#07070a]/75 to-[#07070a]/90 pointer-events-none backdrop-blur-[1px]" />

                {/* Close Button Top Right */}
                <button
                  onClick={() => setSelectedRole(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/20 border border-white/15 hover:border-white/40 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer group/close"
                  title="Close [ESC]"
                >
                  <X className="w-4 h-4 transition-transform duration-200 group-hover/close:rotate-90" />
                </button>

                {/* LEFT FLANK: Neon Accent Identity Pod */}
                <div 
                  className="relative p-6 sm:p-8 md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between overflow-hidden z-10 backdrop-blur-md"
                  style={{
                    background: `linear-gradient(180deg, ${accentColor}15 0%, rgba(7, 7, 10, 0.65) 100%)`
                  }}
                >
                  <div className="space-y-6">
                    {/* Single Unified Glassmorphic Capsule: Icon + Track Title (No nested boxes) */}
                    <div 
                      className="inline-flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor
                        }}
                      >
                        <RoleIcon className="w-5 h-5" />
                      </div>

                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {selectedRole.division} TRACK
                      </span>
                    </div>

                    {/* Role Title & Tagline */}
                    <div className="space-y-2">
                      <h2 
                        className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {selectedRole.name}
                      </h2>

                      <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                        {selectedRole.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Left Column Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-white/10 hidden md:block">
                    {recruitmentOpenStatus ? (
                      <button
                        onClick={() => handleApplyForRole(selectedRole)}
                        className="group/applyBtn w-full py-3.5 px-4 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer hover:brightness-110 relative overflow-hidden"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 0 25px ${accentColor}40`
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>APPLY FOR ROLE</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/applyBtn:translate-x-1" />
                        </span>
                        {/* Button shine sweep on hover */}
                        <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/applyBtn:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none" />
                      </button>
                    ) : (
                      <div className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-amber-500/20 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 select-none">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>APPLICATIONS CURRENTLY CLOSED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT FLANK: Clean Streamlined Original Content View */}
                <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-8 z-10 text-left">
                  
                  {/* 1. What We Expect */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between pb-2 border-b border-white/10">
                      <h3 
                        className="text-3xl sm:text-4xl uppercase tracking-wider leading-none select-none"
                        style={{ 
                          fontFamily: "'VT323', monospace",
                          color: accentColor 
                        }}
                      >
                        WHAT WE EXPECT
                      </h3>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        // REQUIREMENTS
                      </span>
                    </div>

                    <div className="space-y-3 pl-1">
                      {selectedRole.whatWeExpect?.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 group transition-colors"
                        >
                          <span 
                            className="font-mono text-base font-bold shrink-0 leading-none mt-0.5 select-none transition-transform duration-200 group-hover:translate-x-1"
                            style={{ color: accentColor }}
                          >
                            ›
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-zinc-300 group-hover:text-white leading-relaxed transition-colors">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. What You’ll Get */}
                  <div className="space-y-4 pt-1">
                    <div className="flex items-baseline justify-between pb-2 border-b border-white/10">
                      <h3 
                        className="text-3xl sm:text-4xl uppercase tracking-wider leading-none text-white select-none"
                        style={{ 
                          fontFamily: "'VT323', monospace" 
                        }}
                      >
                        WHAT YOU’LL GET
                      </h3>
                      <span 
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: accentColor }}
                      >
                        // PERKS & VALUE
                      </span>
                    </div>

                    <div className="space-y-3 pl-1">
                      {selectedRole.whatYoullGet?.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 group transition-colors"
                        >
                          <span 
                            className="font-mono text-sm font-bold shrink-0 leading-none mt-0.5 select-none transition-transform duration-200 group-hover:translate-x-1"
                            style={{ color: accentColor }}
                          >
                            →
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-zinc-300 group-hover:text-white leading-relaxed transition-colors">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Only Apply Button */}
                  <div className="pt-4 border-t border-white/10 md:hidden">
                    {recruitmentOpenStatus ? (
                      <button
                        onClick={() => handleApplyForRole(selectedRole)}
                        className="w-full py-3.5 px-4 rounded-xl text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 0 25px ${accentColor}35`
                        }}
                      >
                        <span>APPLY FOR THIS ROLE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-amber-500/20 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 select-none">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>APPLICATIONS CURRENTLY CLOSED</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })()}
        </div>,
        document.body
      )}

      {/* 4. Preparation Guide & Review Stages (Open Space Glassmorphism Infographic) */}
      <section className="relative space-y-12 sm:space-y-16 py-6 sm:py-10">

        {/* Infographic Header (Open, Badge removed as indicated) */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="flex flex-col items-center text-center space-y-3 relative z-10">
            <h3 
              className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              APPLICATION REVIEW TIMELINE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Follow the continuous candidate journey — from initial dossier verification to final induction into the Celestius crew.
            </p>
          </div>
        </ScrollReveal>

        {/* Infographic Connected Flow Area */}
        <div className="relative pt-8 sm:pt-14 pb-10 sm:pb-16">
          
          {/* Desktop Connecting Arch (TOP: Card 1 -> Card 2) */}
          <div className="hidden md:block absolute -top-8 inset-x-0 h-28 pointer-events-none z-20">
            <ScrollReveal animation="fade" delay={200} duration={850} className="w-full h-full">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 900 110" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="infographicTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="glowArchTop" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Arch 1: Card 1 to Card 2 (Curving OVER the top) */}
                <g>
                  <path 
                    d="M 230 95 C 230 18, 360 18, 360 95" 
                    stroke="rgba(56, 189, 248, 0.22)" 
                    strokeWidth="14" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M 230 95 C 230 18, 360 18, 360 95" 
                    stroke="url(#infographicTopGrad)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="14 8" 
                    className="animate-flow-dash" 
                    filter="url(#glowArchTop)" 
                  />
                  <circle r="4.5" fill="#BAE6FD" filter="url(#glowArchTop)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 230 95 C 230 18, 360 18, 360 95" />
                  </circle>
                </g>
              </svg>
            </ScrollReveal>
          </div>

          {/* Desktop Connecting Arch (BOTTOM: Card 2 -> Card 3) */}
          <div className="hidden md:block absolute -bottom-6 inset-x-0 h-28 pointer-events-none z-20">
            <ScrollReveal animation="fade" delay={300} duration={850} className="w-full h-full">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 900 110" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="infographicBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="glowArchBottom" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Arch 2: Card 2 to Card 3 (Curving UNDER the bottom) */}
                <g>
                  <path 
                    d="M 540 15 C 540 92, 670 92, 670 15" 
                    stroke="rgba(129, 140, 248, 0.22)" 
                    strokeWidth="14" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M 540 15 C 540 92, 670 92, 670 15" 
                    stroke="url(#infographicBottomGrad)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="14 8" 
                    className="animate-flow-dash" 
                    filter="url(#glowArchBottom)" 
                  />
                  <circle r="4.5" fill="#A7F3D0" filter="url(#glowArchBottom)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 540 15 C 540 92, 670 92, 670 15" />
                  </circle>
                </g>
              </svg>
            </ScrollReveal>
          </div>

          {/* Cards Grid with Staggered Zero-Gravity Floating Motion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {[
              {
                step: '01',
                label: 'STAGE 01',
                title: 'SCREENING',
                description: 'Profile verification, GitHub portfolio assessment, and academic dossier check by domain leads.',
                icon: CheckCircle2,
                accent: '#38bdf8',
                accentBorder: 'rgba(56, 189, 248, 0.4)',
                status: 'ONLINE REVIEW',
                delay: '0s'
              },
              {
                step: '02',
                label: 'STAGE 02',
                title: 'PRACTICAL TASK',
                description: 'Hands-on micro challenge and problem-solving task tailored specifically to your chosen role track.',
                icon: Target,
                accent: '#818cf8',
                accentBorder: 'rgba(129, 140, 248, 0.4)',
                status: 'DOMAIN EVAL',
                delay: '-1.8s'
              },
              {
                step: '03',
                label: 'STAGE 03',
                title: 'ONBOARDING',
                description: 'Direct interactive discussion with department leads followed by official induction into Celestius.',
                icon: Users,
                accent: '#34d399',
                accentBorder: 'rgba(52, 211, 153, 0.4)',
                status: 'INDUCTION',
                delay: '-3.6s'
              }
            ].map((st, idx) => {
              const StageIcon = st.icon;

              return (
                <ScrollReveal 
                  key={st.step}
                  animation="fade-up"
                  delay={idx * 160}
                  className="h-full"
                >
                  <div 
                    className="group relative rounded-[28px] border overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-celestial-float h-full"
                    style={{
                      animationDelay: st.delay,
                      borderColor: st.accentBorder,
                      background: 'linear-gradient(180deg, rgba(14, 30, 56, 0.85) 0%, rgba(8, 14, 28, 0.92) 50%, rgba(4, 7, 14, 0.98) 100%)',
                      boxShadow: `0 10px 40px -10px ${st.accent}20`
                    }}
                  >
                    {/* Continuous Ambient Breathing Aura behind each card */}
                    <div 
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[65px] pointer-events-none animate-infographic-aura"
                      style={{ backgroundColor: st.accent }}
                    />

                    {/* TOP GLOSSY GLASS CAP with Radial Illumination (Exact Image 2 Style) */}
                    <div 
                      className="relative p-6 sm:p-7 overflow-hidden rounded-t-[28px] border-b border-white/10"
                      style={{
                        background: `linear-gradient(180deg, ${st.accent}30 0%, ${st.accent}10 60%, transparent 100%)`
                      }}
                    >
                      {/* Inner Specular Curved Highlight Sheen */}
                      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent rounded-t-[28px] pointer-events-none" />
                      
                      {/* Continuous Non-Stop Light Shimmer Sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-glass-shimmer pointer-events-none" />

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          {/* Floating Illuminated Emblem */}
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white border shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-110 animate-icon-levitate"
                            style={{
                              backgroundColor: `${st.accent}25`,
                              borderColor: `${st.accent}70`,
                              boxShadow: `0 0 25px ${st.accent}45`
                            }}
                          >
                            <StageIcon className="w-7 h-7" style={{ color: st.accent }} />
                          </div>

                          {/* Header Title */}
                          <div>
                            <h4 
                              className="font-ndot text-2xl sm:text-3xl text-white uppercase tracking-wider leading-none"
                              style={{ fontFamily: "'VT323', monospace" }}
                            >
                              {st.title}
                            </h4>
                          </div>
                        </div>

                        {/* Exact Reference Geometric Number Display (from reference image) */}
                        <div 
                          className="text-5xl sm:text-6xl tracking-tight text-white/25 group-hover:text-white/45 transition-colors select-none leading-none flex items-center shrink-0 font-extrabold"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 800,
                            fontFeatureSettings: '"zero" 1'
                          }}
                        >
                          {st.step}
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM FROSTED GLASS POD with Descriptions */}
                    <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {st.description}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                        <span className="text-zinc-400 text-[11px] uppercase tracking-wider flex items-center gap-2 font-medium">
                          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: st.accent }} />
                          {st.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
