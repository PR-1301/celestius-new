import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Github, 
  Linkedin, 
  Code2, 
  Palette, 
  Megaphone,
  CalendarCheck,
  Mic2,
  Sparkles,
  ArrowRight,
  X,
  ShieldCheck,
  Terminal,
  User,
  Cpu,
  Layers,
  Award,
  Zap,
  Radio,
  ExternalLink,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { teamData } from '../data/teamData';

// Dynamic Bi-directional Scroll Reveal Component
// Seamlessly animates elements into view on scroll, and resets on exit so it replays dynamically every time
function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 700,
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

// Brand logos & topic icons for crew skill tags
const renderSkillLogo = (skill) => {
  const s = skill.toLowerCase();

  // 1. Web & Full-Stack
  if (s.includes('react') || s.includes('web') || s.includes('frontend')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 shrink-0" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  // 2. Systems, Architecture & Distributed Compute
  if (s.includes('system') || s.includes('architect') || s.includes('distributed') || s.includes('backend') || s.includes('dsa')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#FFCC00" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    );
  }
  // 3. Cloud, DevOps & Containers
  if (s.includes('cloud') || s.includes('devops') || s.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#38BDF8">
        <path d="M13.5 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm9 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm12.5 3c-.28 0-.54.04-.8.1-.51-2.36-2.6-4.1-5.2-4.1-1.35 0-2.58.48-3.54 1.28C8.94 11.16 7.6 11 6.5 11c-2.48 0-4.5 2.02-4.5 4.5 0 .2.02.4.05.6C.85 16.7 0 17.75 0 19c0 1.66 1.34 3 3 3h16.5c2.48 0 4.5-2.02 4.5-4.5S21.98 14 19.5 14z"/>
      </svg>
    );
  }
  // 4. Applied AI & Machine Learning
  if (s.includes('ai') || s.includes('machine') || s.includes('data') || s.includes('algo')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#A78BFA" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3" fill="#A78BFA" />
      </svg>
    );
  }
  // 5. Open Source & Git
  if (s.includes('open') || s.includes('source') || s.includes('git') || s.includes('code')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#F05032">
        <path d="M2.6 10.59L8.38 4.8a2.53 2.53 0 013.6 0l1.45 1.45-2.28 2.29a2 2 0 00-.77 2.05l-2.12 2.12a2 2 0 101.42 1.42l2.05-2.05a2 2 0 001.9-.38l2.36 2.36a2 2 0 101.41-1.42l-2.34-2.34a2 2 0 00-.45-1.92l2.25-2.25 5.8 5.79a2.55 2.55 0 010 3.6l-5.79 5.79a2.55 2.55 0 01-3.6 0L2.6 14.2a2.55 2.55 0 010-3.61z"/>
      </svg>
    );
  }
  // 6. Design, Prototyping & Figma
  if (s.includes('figma') || s.includes('design') || s.includes('ui/ux') || s.includes('motion') || s.includes('brand')) {
    return (
      <svg viewBox="0 0 38 57" className="w-3.5 h-3.5 shrink-0" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    );
  }
  // 7. Event Operations & Stage Production
  if (s.includes('event') || s.includes('stage') || s.includes('logistics') || s.includes('operation')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#C084FC" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    );
  }
  // 8. Public Speaking, Keynotes & Anchoring
  if (s.includes('public') || s.includes('speech') || s.includes('speaking') || s.includes('keynote') || s.includes('moderation') || s.includes('comms')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#38BDF8" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    );
  }
  // 9. Digital Media, Campaigns & Broadcasting
  if (s.includes('media') || s.includes('campaign') || s.includes('content') || s.includes('broadcast')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#F472B6" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    );
  }

  // Fallback icon
  return <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />;
};

// ==========================================
// 3D GRADIENT GEOMETRIC SHAPES (PRISM, CONE, PYRAMID, OCTAHEDRON)
// ==========================================

// 1. 3D Gradient Pointed Cone with Specular Highlight Ridge
function Gradient3DCone({ className = "", theme, style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 130 170" className={className} style={style} fill="none">
      <defs>
        <linearGradient id={`coneGrad_${id}`} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="25%" stopColor={theme.light} stopOpacity="0.95" />
          <stop offset="60%" stopColor={theme.mid} stopOpacity="0.95" />
          <stop offset="85%" stopColor={theme.dark} stopOpacity="0.98" />
          <stop offset="100%" stopColor={theme.deep} stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`coneBase_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={theme.light} stopOpacity="0.7" />
          <stop offset="55%" stopColor={theme.dark} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.deep} stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`coneSpecular_${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`coneGlow_${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Ambient glow */}
      <ellipse cx="65" cy="142" rx="46" ry="14" fill={theme.glow} filter={`url(#coneGlow_${id})`} opacity="0.65" />
      {/* 3D Base */}
      <ellipse cx="65" cy="135" rx="44" ry="14" fill={`url(#coneBase_${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Cone Body */}
      <path d="M 65 14 L 21 135 A 44 14 0 0 0 109 135 Z" fill={`url(#coneGrad_${id})`} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      {/* Specular ridge down side */}
      <path d="M 65 14 L 46 138" stroke={`url(#coneSpecular_${id})`} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

// 2. 3D Gradient Faceted Triangular Prism (Crisp 3D Standing Prism)
function Gradient3DPrism({ className = "", theme, style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 140 145" className={className} style={style} fill="none">
      <defs>
        {/* Top Facet Gradient (Specular highlight) */}
        <linearGradient id={`prismTop_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor={theme.light} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.mid} stopOpacity="0.85" />
        </linearGradient>
        {/* Left Vertical Face (Illuminated front-left) */}
        <linearGradient id={`prismLeft_${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="25%" stopColor={theme.light} stopOpacity="0.95" />
          <stop offset="65%" stopColor={theme.mid} stopOpacity="0.92" />
          <stop offset="100%" stopColor={theme.dark} stopOpacity="0.98" />
        </linearGradient>
        {/* Right Vertical Face (Shadow side) */}
        <linearGradient id={`prismRight_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.mid} stopOpacity="0.9" />
          <stop offset="50%" stopColor={theme.dark} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.deep} stopOpacity="1" />
        </linearGradient>
        {/* Ambient Prism Glow Filter */}
        <filter id={`prismGlow_${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Glow */}
      <polygon 
        points="20,20 70,40 120,20 120,105 70,125 20,105" 
        fill={theme.glow} 
        filter={`url(#prismGlow_${id})`} 
        opacity="0.65" 
      />

      {/* Left Face (Illuminated) */}
      <polygon 
        points="20,20 70,40 70,125 20,105" 
        fill={`url(#prismLeft_${id})`} 
        stroke="rgba(255,255,255,0.4)" 
        strokeWidth="1.2" 
      />

      {/* Right Face (Shadow) */}
      <polygon 
        points="70,40 120,20 120,105 70,125" 
        fill={`url(#prismRight_${id})`} 
        stroke="rgba(255,255,255,0.25)" 
        strokeWidth="1.2" 
      />

      {/* Top Facet (Specular Cap) */}
      <polygon 
        points="20,20 120,20 70,40" 
        fill={`url(#prismTop_${id})`} 
        stroke="rgba(255,255,255,0.6)" 
        strokeWidth="1.5" 
      />

      {/* Central Sharp Reflection Ridge */}
      <line x1="70" y1="40" x2="70" y2="125" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
      {/* Top Bevel Highlight */}
      <line x1="20" y1="20" x2="70" y2="40" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
    </svg>
  );
}

// 3. 3D Gradient Isometric Pyramid
function Gradient3DPyramid({ className = "", theme, style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 130 130" className={className} style={style} fill="none">
      <defs>
        <linearGradient id={`pyrLeft_${id}`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="35%" stopColor={theme.light} stopOpacity="0.95" />
          <stop offset="75%" stopColor={theme.mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.dark} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`pyrRight_${id}`} x1="0%" y1="10%" x2="100%" y2="90%">
          <stop offset="0%" stopColor={theme.mid} stopOpacity="0.9" />
          <stop offset="55%" stopColor={theme.dark} stopOpacity="0.95" />
          <stop offset="100%" stopColor={theme.deep} stopOpacity="1" />
        </linearGradient>
        <filter id={`pyrGlow_${id}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Glow */}
      <polygon points="65,15 15,95 65,125 115,95" fill={theme.glow} filter={`url(#pyrGlow_${id})`} opacity="0.6" />
      {/* Left Face */}
      <polygon points="65,15 15,95 65,125" fill={`url(#pyrLeft_${id})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
      {/* Right Face */}
      <polygon points="65,15 65,125 115,95" fill={`url(#pyrRight_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
      {/* Ridge Line */}
      <line x1="65" y1="15" x2="65" y2="125" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
      <line x1="65" y1="15" x2="15" y2="95" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
    </svg>
  );
}

// 4. 3D Gradient Octahedral Crystal Gem
function Gradient3DOctahedron({ className = "", theme, style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 110 140" className={className} style={style} fill="none">
      <defs>
        <linearGradient id={`octaTopL_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="55%" stopColor={theme.light} stopOpacity="0.92" />
          <stop offset="100%" stopColor={theme.mid} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`octaTopR_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.light} stopOpacity="0.9" />
          <stop offset="60%" stopColor={theme.mid} stopOpacity="0.92" />
          <stop offset="100%" stopColor={theme.dark} stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id={`octaBotL_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.mid} stopOpacity="0.88" />
          <stop offset="60%" stopColor={theme.dark} stopOpacity="0.96" />
          <stop offset="100%" stopColor={theme.deep} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`octaBotR_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.dark} stopOpacity="0.92" />
          <stop offset="70%" stopColor={theme.deep} stopOpacity="0.98" />
          <stop offset="100%" stopColor="#050308" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Top Left */}
      <polygon points="55,10 15,65 55,78" fill={`url(#octaTopL_${id})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      {/* Top Right */}
      <polygon points="55,10 55,78 95,65" fill={`url(#octaTopR_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      {/* Bottom Left */}
      <polygon points="15,65 55,78 55,130" fill={`url(#octaBotL_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      {/* Bottom Right */}
      <polygon points="55,78 95,65 55,130" fill={`url(#octaBotR_${id})`} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Center Facet Lines */}
      <line x1="55" y1="10" x2="55" y2="130" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
      <line x1="15" y1="65" x2="95" y2="65" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
    </svg>
  );
}

// Signature 3D Geometric Shape mapping per team member card
// Ensures exactly ONE distinct 3D shape per card popup for a clean, minimal, and professional aesthetic
const MEMBER_SHAPES = ['prism', 'cone', 'pyramid', 'octahedron'];

const getMemberShapeType = (memberId) => {
  const index = teamData.findIndex(m => m.id === memberId);
  if (index === -1) return 'prism';
  return MEMBER_SHAPES[index % MEMBER_SHAPES.length];
};

// 3 Distinct category configuration with custom 3D geometric shape palettes
const CATEGORY_CONFIG = {
  technical: {
    label: "TECHNICAL",
    accent: "#FFCC00",
    badgeBg: "bg-[#FFCC00]/10",
    badgeBorder: "border-[#FFCC00]/30",
    badgeText: "text-[#FFCC00]",
    cardBorder: "border-[#FFCC00]/30 hover:border-[#FFCC00]",
    cardGlow: "group-hover:shadow-[0_20px_50px_rgba(255,204,0,0.22)]",
    ambientFrom: "from-[#FFCC00]/20",
    iconBoxBg: "bg-[#FFCC00]/15",
    iconBoxBorder: "border-[#FFCC00]/40 group-hover:border-[#FFCC00]",
    iconColor: "text-[#FFCC00]",
    titleHover: "group-hover:text-[#FFCC00]",
    lineBg: "bg-[#FFCC00]/20",
    linkHover: "hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00]",
    cardGradient: "linear-gradient(180deg, rgba(22, 20, 11, 0.85) 0%, rgba(11, 12, 15, 0.92) 50%, rgba(6, 6, 8, 0.98) 100%)",
    shapeTheme: {
      light: "#FFFBEB",
      mid: "#F59E0B",
      dark: "#B45309",
      deep: "#3D1500",
      glow: "rgba(245, 158, 11, 0.45)",
      accent: "#FFCC00"
    }
  },
  events: {
    label: "EVENTS",
    accent: "#a855f7",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-400",
    cardBorder: "border-purple-500/30 hover:border-purple-400",
    cardGlow: "group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.22)]",
    ambientFrom: "from-purple-500/20",
    iconBoxBg: "bg-purple-500/15",
    iconBoxBorder: "border-purple-500/40 group-hover:border-purple-400",
    iconColor: "text-purple-400",
    titleHover: "group-hover:text-purple-400",
    lineBg: "bg-purple-500/20",
    linkHover: "hover:bg-purple-500 hover:text-white hover:border-purple-500",
    cardGradient: "linear-gradient(180deg, rgba(25, 13, 36, 0.85) 0%, rgba(11, 12, 15, 0.92) 50%, rgba(6, 6, 8, 0.98) 100%)",
    shapeTheme: {
      light: "#FAF5FF",
      mid: "#A855F7",
      dark: "#7E22CE",
      deep: "#260342",
      glow: "rgba(168, 85, 247, 0.45)",
      accent: "#a855f7"
    }
  },
  nonTechnical: {
    label: "NON-TECHNICAL",
    accent: "#38bdf8",
    badgeBg: "bg-sky-400/10",
    badgeBorder: "border-sky-400/30",
    badgeText: "text-sky-400",
    cardBorder: "border-sky-400/30 hover:border-sky-400",
    cardGlow: "group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.22)]",
    ambientFrom: "from-sky-400/20",
    iconBoxBg: "bg-sky-400/15",
    iconBoxBorder: "border-sky-400/40 group-hover:border-sky-400",
    iconColor: "text-sky-400",
    titleHover: "group-hover:text-sky-400",
    lineBg: "bg-sky-400/20",
    linkHover: "hover:bg-sky-400 hover:text-black hover:border-sky-400",
    cardGradient: "linear-gradient(180deg, rgba(9, 21, 34, 0.85) 0%, rgba(11, 12, 15, 0.92) 50%, rgba(6, 6, 8, 0.98) 100%)",
    shapeTheme: {
      light: "#F0F9FF",
      mid: "#0EA5E9",
      dark: "#0369A1",
      deep: "#041F38",
      glow: "rgba(14, 165, 233, 0.45)",
      accent: "#38bdf8"
    }
  }
};

export default function Team({ introCompleted = true }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on Escape key and prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  const getRoleIcon = (role) => {
    const r = role.toLowerCase();
    if (r.includes('tech')) return Code2;
    if (r.includes('design')) return Palette;
    if (r.includes('social')) return Megaphone;
    if (r.includes('event')) return CalendarCheck;
    if (r.includes('ps') || r.includes('public')) return Mic2;
    return Sparkles;
  };

  const filteredMembers = teamData.filter(member => {
    if (activeFilter === 'all') return true;
    return member.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left space-y-12 select-none">
      
      {/* 1. Header Section: Cyber HUD + Bi-directional Scroll Reveal */}
      <section className="relative space-y-6 border-b border-white/10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Top Tag */}
            <ScrollReveal animation="fade-down" delay={0}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[11px] text-[#FFCC00] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
                <span>CELESTIUS // LEADERSHIP_CORE // {teamData.length} DIRECTORS</span>
              </div>
            </ScrollReveal>

            {/* Main Title */}
            <ScrollReveal animation="fade-up" delay={80}>
              <h1 
                className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                TEAM LEADERSHIP
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal animation="fade-up" delay={160}>
              <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
                Meet the directors leading Celestius across engineering, live symposiums, creative design, and community discourse.
              </p>
            </ScrollReveal>
          </div>

          {/* Color Key Indicator Bar */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] shadow-[0_0_8px_#FFCC00]" />
                <span className="text-zinc-300">TECHNICAL</span>
              </div>
              <div className="w-px h-3 bg-white/15" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                <span className="text-zinc-300">EVENTS</span>
              </div>
              <div className="w-px h-3 bg-white/15" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                <span className="text-zinc-300">NON-TECH</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. Filter Capsule Controls */}
        <ScrollReveal animation="fade-up" delay={240}>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {[
              { id: 'all', label: `ALL LEADS [${teamData.length}]` },
              { id: 'technical', label: `TECHNICAL [${teamData.filter(m => m.category === 'technical').length}]` },
              { id: 'events', label: `EVENTS [${teamData.filter(m => m.category === 'events').length}]` },
              { id: 'nonTechnical', label: `NON-TECHNICAL [${teamData.filter(m => m.category === 'nonTechnical').length}]` },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Cyber-Pod Crew Cards Grid with Bi-directional Staggered ScrollReveal */}
      <section className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => {
            const config = CATEGORY_CONFIG[member.category] || CATEGORY_CONFIG.technical;
            const RoleIcon = getRoleIcon(member.role);

            return (
              <ScrollReveal
                key={member.id}
                animation="fade-up"
                delay={(index % 4) * 90}
                className="h-full"
              >
                <div
                  onClick={() => setSelectedMember(member)}
                  className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ease-out border flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:scale-[1.01] h-full ${config.cardBorder} ${config.cardGlow}`}
                  style={{
                    background: config.cardGradient,
                    boxShadow: `0 10px 30px -10px ${config.accent}15`
                  }}
                >
                  {/* Ambient Corner Atmosphere */}
                  <div 
                    className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${config.ambientFrom} to-transparent blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top Glossy Highlight Sheen */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent rounded-t-3xl pointer-events-none" />

                  {/* Card Main Information Bay */}
                  <div className="relative z-10 space-y-4">
                    
                    {/* Header Row: Crew Identifier Badge & Holographic Icon Capsule */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.badgeBg} border ${config.badgeBorder} font-mono text-[10px] ${config.badgeText} font-bold tracking-wider uppercase`}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.accent }} />
                        {member.leadTag}
                      </span>

                      {/* Holographic Icon Emblem */}
                      <div 
                        className={`w-10 h-10 rounded-2xl ${config.iconBoxBg} border ${config.iconBoxBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}
                      >
                        <RoleIcon className={`w-5 h-5 ${config.iconColor}`} />
                      </div>
                    </div>

                    {/* Member Name in Signature Pixel Font */}
                    <div>
                      <h3 
                        className={`font-ndot text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight transition-colors duration-200 ${config.titleHover}`}
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {member.name}
                      </h3>

                      <p 
                        className="font-mono text-xs font-bold tracking-wider mt-1 uppercase"
                        style={{ color: config.accent }}
                      >
                        {member.role}
                      </p>

                      <p className="font-sans text-xs text-zinc-300 mt-1.5 line-clamp-1 font-medium">
                        {member.domain}
                      </p>
                    </div>

                    {/* Bio Excerpt */}
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Skill Pills with Authentic Vector Logos */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {member.skills.slice(0, 3).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 font-mono text-[10px] text-zinc-300 flex items-center gap-1.5 group-hover:border-white/20 transition-colors"
                        >
                          {renderSkillLogo(skill)}
                          <span>{skill}</span>
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/5 font-mono text-[10px] text-zinc-400">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: View Dossier Action & Direct Social Icons */}
                  <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span 
                      className={`font-bold flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1`}
                      style={{ color: config.accent }}
                    >
                      <span>VIEW DOSSIER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    {/* Social Connect Icons (stops card click propagation) */}
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-200 ${config.linkHover}`}
                          title="GitHub Profile"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-200 ${config.linkHover}`}
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. ULTRA-MODERN CREW MEMBER DOSSIER MODAL (Popup Portal) */}
      {selectedMember && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          {(() => {
            const config = CATEGORY_CONFIG[selectedMember.category] || CATEGORY_CONFIG.technical;
            const RoleIcon = getRoleIcon(selectedMember.role);
            const sTheme = config.shapeTheme;
            const shapeType = getMemberShapeType(selectedMember.id);

            // Generate initial monograms for avatar capsule
            const nameParts = selectedMember.name.split(' ');
            const initials = nameParts.map(p => p[0]).join('').slice(0, 2).toUpperCase();

            return (
              <div 
                className="relative w-full max-w-4xl max-h-[92vh] bg-[#07080d] border border-white/20 rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col md:flex-row text-left animate-modal-pop shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: `0 0 80px ${config.accent}30, 0 35px 90px rgba(0,0,0,0.95)`
                }}
              >
                {/* 1. Single Soft Ambient Aura Light */}
                <div 
                  className="absolute -top-16 -left-16 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
                  style={{ backgroundColor: sTheme.glow }}
                />

                {/* 2. EXACTLY ONE SIGNATURE 3D GRADIENT SHAPE (Unique per member card, minimal & professional) */}
                <div className="absolute -top-4 left-4 sm:left-8 w-52 h-52 sm:w-60 sm:h-60 pointer-events-none opacity-90 animate-bubble-1 transition-all duration-700 z-0">
                  {shapeType === 'prism' && (
                    <Gradient3DPrism theme={sTheme} className="w-full h-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] rotate-12" />
                  )}
                  {shapeType === 'cone' && (
                    <Gradient3DCone theme={sTheme} className="w-full h-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] -rotate-6" />
                  )}
                  {shapeType === 'pyramid' && (
                    <Gradient3DPyramid theme={sTheme} className="w-full h-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] rotate-6" />
                  )}
                  {shapeType === 'octahedron' && (
                    <Gradient3DOctahedron theme={sTheme} className="w-full h-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] rotate-12" />
                  )}
                </div>

                {/* Frosted Scrim ensuring 3D shape is clear while keeping all text 100% readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#07080d]/25 via-[#07080d]/40 to-[#07080d]/65 pointer-events-none backdrop-blur-[1px] z-[1]" />

                {/* Top Inner Specular Rim */}
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[28px] sm:rounded-t-[36px] z-10" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-300 hover:text-white transition-all duration-200 hover:rotate-90 cursor-pointer shadow-lg active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* LEFT COLUMN: Crew Identity Clearance Bay */}
                <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative z-10 bg-black/25 backdrop-blur-sm">
                  <div className="space-y-6">
                    
                    {/* Top Identity Capsule */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border shadow-lg shrink-0 animate-icon-levitate"
                        style={{
                          backgroundColor: `${config.accent}20`,
                          borderColor: `${config.accent}60`,
                          boxShadow: `0 0 20px ${config.accent}35`
                        }}
                      >
                        <RoleIcon className="w-6 h-6" style={{ color: config.accent }} />
                      </div>

                      <div className="space-y-0.5">
                        <span 
                          className="font-mono text-[11px] font-bold uppercase tracking-widest block"
                          style={{ color: config.accent }}
                        >
                          {selectedMember.leadTag}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400 block uppercase">
                          {selectedMember.division}
                        </span>
                      </div>
                    </div>

                    {/* Holographic Crew Avatar Frame */}
                    <div className="relative mx-auto my-2 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/20 flex items-center justify-center shadow-2xl">
                      {/* Orbital scan pulse */}
                      <div 
                        className="absolute inset-0 rounded-3xl animate-pulse opacity-40 pointer-events-none"
                        style={{ boxShadow: `0 0 35px ${config.accent}50` }}
                      />

                      <div 
                        className="w-full h-full rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden"
                        style={{
                          background: `radial-gradient(circle at 50% 40%, ${config.accent}25 0%, #0a0c14 80%)`,
                          borderColor: `${config.accent}40`
                        }}
                      >
                        <span 
                          className="font-ndot text-4xl sm:text-5xl font-bold tracking-widest text-white drop-shadow-md"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          {initials}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 mt-1">
                          CREW ID // CIT
                        </span>
                      </div>
                    </div>

                    {/* Clearance & Station Intel */}
                    <div className="space-y-2 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 font-mono text-[11px] text-emerald-400 font-bold uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>ACTIVE CORE DIRECTOR</span>
                      </div>
                      <p className="font-mono text-[11px] text-zinc-400">
                        {selectedMember.department}
                      </p>
                    </div>
                  </div>

                  {/* Left Column Bottom: Direct Social Connect Buttons */}
                  <div className="pt-6 border-t border-white/10 space-y-2.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                      // DIRECT COMMS & NETWORK
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMember.github && (
                        <a
                          href={selectedMember.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl bg-black/60 border border-white/15 hover:border-white/40 text-zinc-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-sm backdrop-blur-sm"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GITHUB</span>
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-lg text-black font-extrabold backdrop-blur-sm"
                          style={{
                            backgroundColor: config.accent,
                            boxShadow: `0 0 20px ${config.accent}40`
                          }}
                        >
                          <Linkedin className="w-3.5 h-3.5 text-black" />
                          <span>LINKEDIN</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Executive Dossier Intel */}
                <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6 relative z-10 custom-scrollbar bg-black/20 backdrop-blur-none">
                  <div className="space-y-6">
                    
                    {/* Header Title Section */}
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs mb-1" style={{ color: config.accent }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.accent }} />
                        <span className="tracking-widest uppercase font-bold">
                          [ CELESTIUS CREW DOSSIER // {selectedMember.leadTag} ]
                        </span>
                      </div>

                      <h2 
                        className="font-ndot text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {selectedMember.name}
                      </h2>

                      <p className="font-mono text-sm font-bold tracking-wider mt-2 uppercase" style={{ color: config.accent }}>
                        {selectedMember.role} — <span className="text-zinc-300 font-normal">{selectedMember.domain}</span>
                      </p>
                    </div>

                    {/* Section 1: Executive Bio & Focus (High Contrast Glass Container) */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-2 shadow-lg">
                      <span 
                        className="font-ndot text-xl uppercase tracking-wider block"
                        style={{ fontFamily: "'VT323', monospace", color: config.accent }}
                      >
                        // DIRECTORIAL MANDATE & FOCUS
                      </span>
                      <p className="font-sans text-sm text-zinc-200 leading-relaxed font-light">
                        {selectedMember.bio}
                      </p>
                    </div>

                    {/* Section 2: Core Domain Competencies (High Contrast Glass Container) */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-3 shadow-lg">
                      <span 
                        className="font-ndot text-xl uppercase tracking-wider block"
                        style={{ fontFamily: "'VT323', monospace", color: config.accent }}
                      >
                        // DOMAIN EXPERTISE & CAPABILITIES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-3 py-1.5 rounded-lg bg-black/90 hover:bg-black border border-white/20 hover:border-white/40 font-mono text-xs text-zinc-100 hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-default flex items-center gap-2 shadow-sm"
                          >
                            {renderSkillLogo(skill)}
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Crew Specifications (Bento Grid) */}
                    <div className="space-y-2 pt-2">
                      <span 
                        className="font-ndot text-xl uppercase tracking-wider block"
                        style={{ fontFamily: "'VT323', monospace", color: config.accent }}
                      >
                        // CREW SPECIFICATIONS
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md shadow-md">
                          <span className="text-zinc-400 text-[9px] uppercase tracking-wider block">COHORT</span>
                          <span className="text-zinc-100 font-bold text-[11px] block mt-0.5">2026 ACTIVE</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md shadow-md">
                          <span className="text-zinc-400 text-[9px] uppercase tracking-wider block">STATION</span>
                          <span className="text-zinc-100 font-bold text-[11px] block mt-0.5">CIT CHENNAI</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md shadow-md col-span-2 sm:col-span-1">
                          <span className="text-zinc-400 text-[9px] uppercase tracking-wider block">CLEARANCE</span>
                          <span className="text-emerald-400 font-bold text-[11px] block mt-0.5">LEVEL 4 // CORE</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer Actions */}
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      CELESTIUS // CIT CHENNAI
                    </span>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="px-5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-lg"
                    >
                      DISMISS DOSSIER
                    </button>
                  </div>

                </div>

              </div>
            );
          })()}
        </div>,
        document.body
      )}

      {/* 5. Bottom Footer Strip */}
      <ScrollReveal animation="fade-up" delay={200}>
        <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <span>CELESTIUS // LEADERSHIP ARCHITECTURE // CIT CHENNAI</span>
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">ACTIVE DIRECTORS ROSTER</span>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}
