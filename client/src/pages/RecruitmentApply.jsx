import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  User,
  Hash,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Layers,
  Sparkles,
  Github,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  RotateCcw,
  ExternalLink,
  Code2,
  Server,
  Palette,
  CalendarCheck,
  Mic2,
  Film,
  Check,
  ShieldCheck,
  Terminal,
  Globe,
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
  Edit3,
  Lock,
  PhoneCall,
  Copy,
  X,
  PenTool
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { getApiBaseUrl } from '../config/api';

const RECRUITMENT_CONTACTS = [
  {
    name: 'Aakashraj S',
    phone: '9442311522',
    displayPhone: '+91 94423 11522'
  },
  {
    name: 'Ponnurajan R',
    phone: '9487790898',
    displayPhone: '+91 94877 90898'
  },
  {
    name: 'Varun M',
    phone: '7550172567',
    displayPhone: '+91 75501 72567'
  },
  {
    name: 'Venkatesh GS',
    phone: '8838077893',
    displayPhone: '+91 88380 77893'
  }
];

const DEPARTMENTS = [
  'CSE', 'AI&DS', 'AI&ML', 'IT', 'CYBER', 'ECE', 'EEE', 'MECH', 'MCT', 'BME', 'CIVIL', 'ACT', 'VLSI', 'CSBS'
];

const ROLE_OPTIONS = {
  'Tech': [
    'Frontend Developer',
    'Backend Developer'
  ],
  'Non-Tech': [
    'Public speaking',
    'Events',
    'Design',
    'Editor',
    'Content Creator'
  ]
};

// Brand logos & topic icons matching Recruitment.jsx
const renderSkillLogo = (skill) => {
  const s = skill.toLowerCase();

  // 1. Tech Stacks - SVG Brand Logos
  if (s.includes('react') || s.includes('next')) {
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
  if (s.includes('node') || s.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
        <path d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm0 2.4l6.8 3.9v5.4l-6.8 3.9-6.8-3.9V8.3l6.8-3.9z" fill="#68A063"/>
      </svg>
    );
  }
  if (s.includes('mongo')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#13AA52">
        <path d="M12 1.5C11.5 1.7 8.5 7.5 8.5 12c0 3.7 2 6.7 3.5 8.5.3-2.5.3-8 0-10.5 0-3 0-8.5 0-8.5s-.3 5.5 0 8.5c0 2.5 0 8-.3 10.5 1.5-1.8 3.8-4.8 3.8-8.5 0-4.5-3-10.3-3.5-10.5z"/>
      </svg>
    );
  }
  if (s.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    );
  }
  if (s.includes('html') || s.includes('css') || s.includes('js')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
        <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
        <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.9-.7 1.9-2.1v-5.2h-1.6v5.2c0 .6-.3.9-.7.9-.3 0-.6-.2-.8-.6L7 16.5zm8.5-4.4c-.8-.5-1.4-.8-1.4-1.3 0-.5.4-.8 1-.8.6 0 1 .3 1.3.8l1.3-.9c-.6-1-1.5-1.4-2.6-1.4-1.4 0-2.4.9-2.4 2.1 0 1.2.8 1.8 1.8 2.2.9.4 1.4.7 1.4 1.4 0 .6-.5 1-1.2 1-.8 0-1.4-.4-1.7-1.1l-1.3.8c.6 1.2 1.6 1.8 3 1.8 1.6 0 2.6-.9 2.6-2.3 0-1.4-.9-1.9-1.9-2.3z" fill="#000"/>
      </svg>
    );
  }
  if (s.includes('docker') || s.includes('cloud')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#2496ED">
        <path d="M13.9 8.2h1.6v1.6H13.9zm-2.2 0h1.6v1.6h-1.6zm-2.2 0h1.6v1.6H9.5zm-2.2 0H8.9v1.6H7.3zm4.4-2.2h1.6v1.6h-1.6zm-2.2 0h1.6v1.6H9.5zm-2.2 0H8.9v1.6H7.3zM22 12.3c-.5-.4-1.5-.5-2.2-.2-.2-.5-.5-.9-.9-1.2l-.6-.4-.4.6c-.3.6-.3 1.4-.1 2.1-.5.3-1.4.3-2.1.2H2.3c-.2.9 0 1.8.3 2.6.8 1.9 2.4 3.4 4.5 4 4.3 1.2 8.7.6 12.6-1.6 1.3-.8 2.2-2 2.6-3.5.1-.6.1-1.2 0-1.8-.1-.3-.2-.5-.3-.8z"/>
      </svg>
    );
  }
  if (s.includes('git')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.8 2.8c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.3-.4-2l-2.6-2.6v4.3c.3.2.6.5.7.9.4.9 0 2-.9 2.4-.9.4-2 0-2.4-.9-.4-.9 0-2 .9-2.4.4-.2.9-.2 1.3 0v-4.4c-.4-.2-.9-.2-1.3 0-.9.4-2 0-2.4-.9-.4-.9 0-2 .9-2.4.4-.2.9-.2 1.3 0L8.6 3.6 2.4 9.8c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z"/>
      </svg>
    );
  }
  if (s.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
        <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
        <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262"/>
        <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE"/>
        <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
        <path d="M8 12h4v2.5a2.5 2.5 0 1 1-4-2.5z" fill="#0ACF83"/>
      </svg>
    );
  }

  // 2. Protocols, Security & Non-Tech concepts
  if (s.includes('rest') || s.includes('api')) {
    return <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
  }
  if (s.includes('auth') || s.includes('security')) {
    return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
  }
  if (s.includes('animation')) {
    return <Sparkles className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />;
  }
  if (s.includes('graphic') || s.includes('design')) {
    return <Palette className="w-3.5 h-3.5 text-pink-400 shrink-0" />;
  }
  if (s.includes('typography') || s.includes('color')) {
    return <Type className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
  }
  if (s.includes('prototyping') || s.includes('ui/ux')) {
    return <Layout className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
  }
  if (s.includes('brand')) {
    return <Award className="w-3.5 h-3.5 text-yellow-400 shrink-0" />;
  }
  if (s.includes('stage') || s.includes('presence')) {
    return <Mic2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
  }
  if (s.includes('diction') || s.includes('articulate')) {
    return <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
  }
  if (s.includes('improvisation')) {
    return <Zap className="w-3.5 h-3.5 text-yellow-300 shrink-0" />;
  }
  if (s.includes('engagement') || s.includes('audience') || s.includes('leadership')) {
    return <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />;
  }
  if (s.includes('anchoring')) {
    return <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
  }
  if (s.includes('logistics')) {
    return <Package className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
  }
  if (s.includes('time')) {
    return <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
  }
  if (s.includes('video') || s.includes('premiere') || s.includes('davinci') || s.includes('capcut') || s.includes('motion') || s.includes('edit')) {
    return <Film className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
  }
  if (s.includes('crisis')) {
    return <Shield className="w-3.5 h-3.5 text-red-400 shrink-0" />;
  }
  if (s.includes('story') || s.includes('writing') || s.includes('copy')) {
    return <PenTool className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
  }
  if (s.includes('content') || s.includes('social')) {
    return <MessageSquare className="w-3.5 h-3.5 text-pink-400 shrink-0" />;
  }

  return <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />;
};

const ROLE_DETAILS = {
  'Frontend Developer': {
    division: 'Tech',
    code: 'FE-01',
    tagline: 'User Interfaces & Interactive Experiences',
    icon: Code2,
    accent: '#FFCC00',
    description: 'Focuses on crafting pixel-perfect, accessible, and high-performance client applications, interactive web tools, and design-to-code fidelity.',
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
    ],
    responsibilities: [
      'Building modern, responsive web interfaces for club portals and hackathons',
      'Implementing smooth animations, micro-interactions, and accessible UI patterns',
      'Collaborating with designers to translate Figma prototypes into performant code',
      'Optimizing client-side rendering speed and cross-browser responsiveness'
    ],
    skills: ['HTML/CSS','JS','Python', 'React / Next.js', 'Tailwind CSS', 'UI Animation', 'Git']
  },
  'Backend Developer': {
    division: 'Tech',
    code: 'BE-02',
    tagline: 'Server Architecture & Systems Infrastructure',
    icon: Server,
    accent: '#FFCC00',
    description: 'Engineers reliable server-side services, database schemas, authentication systems, API endpoints, and cloud deployments.',
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
    ],
    responsibilities: [
      'Designing resilient REST and GraphQL APIs for university and club platforms',
      'Architecting relational and NoSQL database schemas with high data integrity',
      'Handling secure authentication, role-based authorization, and rate limiting',
      'Deploying and maintaining server infrastructure, webhooks, and container workflows'
    ],
    skills: ['Node.js / Express', 'MongoDB / Mongoose', 'REST APIs', 'Auth & Security', 'Docker / Cloud']
  },
  'Public speaking': {
    division: 'Non-Tech',
    code: 'PS-01',
    tagline: 'Emceeing, Anchoring & Club Representation',
    icon: Mic2,
    accent: '#38bdf8',
    description: 'The voice of Celestius on stage, conducting opening ceremonies, introducing dignitaries, moderating panel talks, and representing the club.',
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
    ],
    responsibilities: [
      'Emceeing flagship hackathons, technical symposiums, and workshop openings',
      'Introducing guest speakers, conducting live Q&A sessions, and engaging audiences',
      'Delivering project pitches, club presentations, and induction briefings',
      'Maintaining high audience energy, stage poise, and articulate delivery'
    ],
    skills: ['Stage Presence', 'Articulate Diction', 'Improvisation', 'Audience Engagement', 'Anchoring']
  },
  'Events': {
    division: 'Non-Tech',
    code: 'EV-02',
    tagline: 'Logistics, Operations & Stage Management',
    icon: CalendarCheck,
    accent: '#a855f7',
    description: 'The operational engine behind flagship hackathons, technical symposiums, workshops, and guest speaker sessions.',
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
    ],
    responsibilities: [
      'Planning venue logistics, stage technical setups, and timeline execution',
      'Liaising with college administration, faculty advisors, and venue management',
      'Managing student registrations, participant hospitality, and on-ground help desks',
      'Coordinating technical judging panels, mentor slots, and prize distribution'
    ],
    skills: ['Event Logistics', 'Time Management', 'Crisis Resolution', 'On-ground Execution', 'Team Leadership']
  },
  'Design': {
    division: 'Non-Tech',
    code: 'DS-03',
    tagline: 'Visual Identity & Product Experience',
    icon: Palette,
    accent: '#38bdf8',
    description: 'Shapes the aesthetic language of Celestius through event banners, brand assets, social media creatives, and UI prototypes.',
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
    ],
    responsibilities: [
      'Designing high-impact event posters, certificates, badges, and social media collaterals',
      'Prototyping website interfaces and digital experiences in Figma',
      'Maintaining visual consistency and branding guidelines across all club assets',
      'Creating vector graphics, typography layouts, and merchandise designs'
    ],
    skills: ['Figma', 'Graphic Design', 'Typography & Color Theory', 'UI/UX Prototyping', 'Brand Identity']
  },
  'Editor': {
    division: 'Non-Tech',
    code: 'ED-04',
    tagline: 'Video Editing & Visual Storytelling',
    icon: Film,
    accent: '#38bdf8',
    description: 'Brings Celestius stories to life through event aftermovies, cinematic teasers, social media reels, and high-energy video content.',
    whatWeExpect: [
      'Interest in video editing and visual storytelling',
      'Basic familiarity with any editing tool (Premiere Pro, DaVinci Resolve, CapCut, etc.)',
      'Good sense of timing, composition and creativity',
      'Willingness to learn and experiment with different editing styles'
    ],
    whatYoullGet: [
      'Hands-on experience creating event videos, reels and promotional content',
      'Opportunities to work on real club content and projects',
      'A portfolio of creative work and practical production experience'
    ],
    responsibilities: [
      'Creating high-impact event teasers, recap videos, and promotional reels',
      'Editing footage with dynamic pacing, motion graphics, and audio mastering',
      'Experimenting with modern editing styles, color grading, and visual storytelling',
      'Collaborating with event and design teams to capture and showcase club milestones'
    ],
    skills: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Motion Design', 'Video Editing', 'Canva']
  },
  'Content Creator': {
    division: 'Non-Tech',
    code: 'CC-05',
    tagline: 'Content Strategy, Storytelling & Social Media',
    icon: PenTool,
    accent: '#38bdf8',
    description: 'Focuses on crafting engaging copy, storytelling narratives, social media strategies, and creative campaigns that represent the voice and spirit of Celestius.',
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
    ],
    responsibilities: [
      'Creating engaging copy for social media posts, event announcements, and newsletters',
      'Developing creative storytelling angles, campaign hooks, and promotional content',
      'Collaborating with design and video teams to produce unified multimedia content',
      'Experimenting with dynamic content formats, hooks, and community engagement strategies'
    ],
    skills: ['Storytelling', 'Copywriting', 'Content Strategy', 'Social Media', 'Creative Writing', 'Canva']
  }
};

const STEPS = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Contact' },
  { id: 3, name: 'Academics' },
  { id: 4, name: 'Role' },
  { id: 5, name: 'Profiles' },
  { id: 6, name: 'Review' }
];

const LOCAL_STORAGE_KEY = 'celestius_recruitment_application_draft_v3';
const LOCAL_STORAGE_STEP_KEY = 'celestius_recruitment_application_step_v3';
const LOCAL_STORAGE_MAX_STEP_KEY = 'celestius_recruitment_application_max_step_v3';

// Helper to safely read from localStorage with v2 migration fallback
const getStorageItem = (primaryKey, legacyKey) => {
  try {
    const val = localStorage.getItem(primaryKey);
    if (val !== null && val !== undefined) return val;
    if (legacyKey) return localStorage.getItem(legacyKey);
  } catch (e) {}
  return null;
};

// ==========================================
// CELESTIAL PLANETARY JOURNEY (STARTING FROM THE SUN IN ASTRONOMICAL ORDER)
// Step 1: The Sun (Sol - Radiant Star & Origin)
// Step 2: Mercury (Scorched Cratered Terrestrial Planet)
// Step 3: Venus (Golden Veiled Greenhouse Atmosphere)
// Step 4: Earth (The Blue Marble & Moon Orbit)
// Step 5: Mars (The Rust-Red Oxide Planet)
// Step 6: Jupiter (The Banded Gas Giant Monarch & Great Red Spot)
// ==========================================

// 1. The Sun (Sol - Step 1)
function CelestialSun({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 180 180" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`sunCore_${id}`} cx="42%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="20%" stopColor="#FEF08A" stopOpacity="1" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="1" />
          <stop offset="78%" stopColor="#D97706" stopOpacity="1" />
          <stop offset="100%" stopColor="#9A3412" stopOpacity="1" />
        </radialGradient>
        <filter id={`sunCorona_${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={`flareGlow_${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
        </filter>
      </defs>

      {/* Massive Outer Solar Corona Bloom */}
      <circle cx="90" cy="90" r="74" fill="#F59E0B" filter={`url(#sunCorona_${id})`} opacity="0.6" />
      <circle cx="90" cy="90" r="62" fill="#EA580C" filter={`url(#sunCorona_${id})`} opacity="0.4" />

      {/* Solar Prominence Flare Arcs */}
      <circle cx="90" cy="90" r="56" stroke="rgba(254, 240, 138, 0.55)" strokeWidth="3" strokeDasharray="18 26 10 34" filter={`url(#flareGlow_${id})`} />
      <circle cx="90" cy="90" r="53" stroke="rgba(251, 146, 60, 0.65)" strokeWidth="2" strokeDasharray="28 16 14 22" />

      {/* Main Solar Sphere */}
      <circle cx="90" cy="90" r="49" fill={`url(#sunCore_${id})`} />

      {/* Solar Surface Granules & Waves */}
      <path d="M 64 72 Q 88 62 116 76" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.65" strokeLinecap="round" />
      <path d="M 72 104 Q 96 114 112 96" stroke="#FEF08A" strokeWidth="1.6" opacity="0.55" strokeLinecap="round" />
      <circle cx="76" cy="74" r="3.5" fill="#78350F" opacity="0.45" />
      <circle cx="104" cy="86" r="2.5" fill="#78350F" opacity="0.4" />
    </svg>
  );
}

// 2. Mercury (Step 2)
function CelestialMercury({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`mercGrad_${id}`} cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#F5F5F4" stopOpacity="0.95" />
          <stop offset="22%" stopColor="#D6D3D1" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#78716C" stopOpacity="0.95" />
          <stop offset="85%" stopColor="#292524" stopOpacity="1" />
          <stop offset="100%" stopColor="#0C0A09" stopOpacity="1" />
        </radialGradient>
        <filter id={`mercGlow_${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Metallic Glow */}
      <circle cx="80" cy="80" r="54" fill="#A8A29E" filter={`url(#mercGlow_${id})`} opacity="0.45" />

      {/* Sphere Body */}
      <circle cx="80" cy="80" r="48" fill={`url(#mercGrad_${id})`} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {/* Craters & Caloris Basin features */}
      <ellipse cx="68" cy="62" rx="9" ry="7" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="#44403C" opacity="0.75" />
      <ellipse cx="69" cy="63" rx="6" ry="4" fill="#1C1917" opacity="0.85" />
      <ellipse cx="94" cy="74" rx="7" ry="5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="#292524" opacity="0.85" />
      <ellipse cx="64" cy="92" rx="12" ry="8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="#1C1917" opacity="0.7" />
      <circle cx="82" cy="104" r="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" fill="#0C0A09" opacity="0.8" />

      {/* Specular Limb Glint */}
      <path d="M 44 65 A 48 48 0 0 1 75 34" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// 3. Venus (Step 3)
function CelestialVenus({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`venusGrad_${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#D97706" stopOpacity="0.92" />
          <stop offset="82%" stopColor="#78350F" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#1E0B02" stopOpacity="1" />
        </radialGradient>
        <filter id={`venusGlow_${id}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Thick Greenhouse Atmospheric Haze Bloom */}
      <circle cx="80" cy="80" r="56" fill="#F59E0B" filter={`url(#venusGlow_${id})`} opacity="0.6" />

      {/* Venus Sphere */}
      <circle cx="80" cy="80" r="50" fill={`url(#venusGrad_${id})`} stroke="rgba(254,240,138,0.35)" strokeWidth="1" />

      {/* Swirling Sulfuric Atmosphere Cloud Belts */}
      <path d="M 40 68 Q 78 52 118 64" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M 44 86 Q 84 74 124 84" stroke="rgba(254,243,199,0.35)" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <path d="M 52 102 Q 86 92 118 100" stroke="rgba(217,119,6,0.55)" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      <path d="M 48 54 Q 72 44 100 50" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

      {/* Specular Glint */}
      <ellipse cx="60" cy="52" rx="10" ry="6" fill="#FFFFFF" opacity="0.65" transform="rotate(-25 60 52)" />
    </svg>
  );
}

// 4. Earth & Moon (Step 4)
function CelestialEarth({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 170 170" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`earthOcean_${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#0284C7" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.95" />
          <stop offset="85%" stopColor="#0F172A" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#020617" stopOpacity="1" />
        </radialGradient>
        <filter id={`earthAtmo_${id}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id={`moonGrad_${id}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F5F5F4" />
          <stop offset="60%" stopColor="#78716C" />
          <stop offset="100%" stopColor="#1C1917" />
        </radialGradient>
      </defs>

      {/* Radiant Cyan Atmospheric Limb Haze */}
      <circle cx="85" cy="85" r="58" fill="#38BDF8" filter={`url(#earthAtmo_${id})`} opacity="0.65" />

      {/* Ocean Sphere */}
      <circle cx="85" cy="85" r="52" fill={`url(#earthOcean_${id})`} stroke="rgba(125,211,252,0.4)" strokeWidth="1.2" />

      {/* Continents (Emerald / Amber landmasses) */}
      <path 
        d="M 68 56 Q 78 50 88 58 Q 98 68 85 78 Q 72 74 65 65 Z" 
        fill="#10B981" 
        opacity="0.85" 
      />
      <path 
        d="M 94 65 Q 112 60 120 74 Q 115 88 100 84 Q 92 78 94 65 Z" 
        fill="#059669" 
        opacity="0.8" 
      />
      <path 
        d="M 62 82 Q 74 78 78 92 Q 80 108 68 116 Q 58 104 62 82 Z" 
        fill="#047857" 
        opacity="0.85" 
      />
      <path 
        d="M 92 90 Q 106 88 112 98 Q 108 112 96 108 Z" 
        fill="#D97706" 
        opacity="0.75" 
      />

      {/* White Swirling Cloud Bands & Cyclones */}
      <path d="M 52 70 Q 82 56 122 72" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M 60 92 Q 95 82 126 94" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <path d="M 58 50 Q 80 44 105 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="108" cy="74" r="5" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.75" />

      {/* Atmospheric Rim Highlight */}
      <path d="M 48 70 A 52 52 0 0 1 85 33" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* Orbiting Moon in distance */}
      <circle cx="145" cy="42" r="8" fill={`url(#moonGrad_${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="145" cy="42" r="11" fill="#E0F2FE" filter={`url(#earthAtmo_${id})`} opacity="0.45" />
    </svg>
  );
}

// 5. Mars (Step 5)
function CelestialMars({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`marsGrad_${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#FB923C" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#EA580C" stopOpacity="0.92" />
          <stop offset="85%" stopColor="#9A3412" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#3C0A04" stopOpacity="1" />
        </radialGradient>
        <filter id={`marsGlow_${id}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Dusty Crimson Atmospheric Glow */}
      <circle cx="80" cy="80" r="54" fill="#EA580C" filter={`url(#marsGlow_${id})`} opacity="0.55" />

      {/* Mars Body */}
      <circle cx="80" cy="80" r="48" fill={`url(#marsGrad_${id})`} stroke="rgba(251,146,60,0.4)" strokeWidth="1" />

      {/* North Polar Ice Cap (Bright Frost) */}
      <ellipse cx="80" cy="36" rx="14" ry="5" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="80" cy="37" rx="10" ry="3" fill="#E0F2FE" opacity="0.8" />

      {/* Dark Basaltic Highland Features */}
      <path 
        d="M 64 68 Q 80 62 92 72 Q 88 88 74 94 Q 60 84 64 68 Z" 
        fill="#7C2D12" 
        opacity="0.8" 
      />
      {/* Valles Marineris Canyon System */}
      <path 
        d="M 52 82 Q 78 86 112 80" 
        stroke="#451A03" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.85" 
      />
      <path 
        d="M 56 84 Q 82 88 108 82" 
        stroke="#7C2D12" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.75" 
      />
      <path 
        d="M 68 105 Q 88 102 102 112 Q 85 118 68 105 Z" 
        fill="#431407" 
        opacity="0.85" 
      />

      {/* Specular Limb Highlight */}
      <path d="M 44 65 A 48 48 0 0 1 76 34" stroke="#FED7AA" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

// 6. Jupiter (Step 6)
function CelestialJupiter({ className = "", style = {} }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 180 180" className={className} style={style} fill="none">
      <defs>
        <radialGradient id={`jupGrad_${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#D97706" stopOpacity="0.92" />
          <stop offset="85%" stopColor="#78350F" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#1E0B02" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`redSpot_${id}`} cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
        <filter id={`jupGlow_${id}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id={`jupClip_${id}`}>
          <circle cx="90" cy="90" r="56" />
        </clipPath>
      </defs>

      {/* Ambient Gas Giant Halo */}
      <circle cx="90" cy="90" r="64" fill="#F59E0B" filter={`url(#jupGlow_${id})`} opacity="0.55" />

      {/* Main Jupiter Body with Clipped Atmospheric Belts */}
      <g clipPath={`url(#jupClip_${id})`}>
        <circle cx="90" cy="90" r="56" fill={`url(#jupGrad_${id})`} stroke="rgba(254,243,199,0.3)" strokeWidth="1" />

        {/* Horizontal Storm Belts & Zones */}
        <rect x="25" y="34" width="130" height="12" fill="#92400E" opacity="0.75" />
        <path d="M 25 54 Q 90 48 155 54" stroke="#78350F" strokeWidth="6" opacity="0.85" />
        <path d="M 25 68 Q 90 62 155 68" stroke="#B45309" strokeWidth="8" opacity="0.9" />
        <path d="M 25 82 Q 90 78 155 82" stroke="#FEF9C3" strokeWidth="7" opacity="0.75" />
        <path d="M 25 96 Q 90 92 155 96" stroke="#9A3412" strokeWidth="9" opacity="0.9" />
        <path d="M 25 112 Q 90 108 155 112" stroke="#7C2D12" strokeWidth="7" opacity="0.8" />
        <rect x="25" y="124" width="130" height="18" fill="#451A03" opacity="0.85" />

        {/* Swirling Storm Waves */}
        <path d="M 40 76 Q 60 70 80 76 T 120 76" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M 45 104 Q 70 100 95 104 T 135 104" stroke="#FED7AA" strokeWidth="1.8" opacity="0.7" strokeLinecap="round" />

        {/* THE GREAT RED SPOT */}
        <ellipse cx="112" cy="98" rx="14" ry="9" fill={`url(#redSpot_${id})`} stroke="#450A0A" strokeWidth="1" />
        <ellipse cx="112" cy="98" rx="8" ry="4" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.75" fill="none" />

        {/* Spherical Shadow Terminator Overlay for 3D depth */}
        <path d="M 90 34 A 56 56 0 0 1 146 90 A 56 56 0 0 1 90 146 Q 130 90 90 34 Z" fill="#050302" opacity="0.45" />
      </g>

      {/* Specular Limb Arc */}
      <path d="M 46 72 A 56 56 0 0 1 90 34" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

// Planetary metadata for astronomical tracking through the form
const PLANET_METADATA = {
  1: {
    name: 'SOL',
    title: 'THE SUN',
    distance: '0.0 AU',
    tag: '// SOL · 0.0 AU',
    aura1: '#F59E0B',
    aura2: '#EA580C',
    glow: 'rgba(245, 158, 11, 0.6)'
  },
  2: {
    name: 'MERCURY',
    title: 'MERCURY',
    distance: '0.39 AU',
    tag: '// MERCURY · 0.39 AU',
    aura1: '#A8A29E',
    aura2: '#78716C',
    glow: 'rgba(168, 162, 158, 0.5)'
  },
  3: {
    name: 'VENUS',
    title: 'VENUS',
    distance: '0.72 AU',
    tag: '// VENUS · 0.72 AU',
    aura1: '#F59E0B',
    aura2: '#D97706',
    glow: 'rgba(245, 158, 11, 0.55)'
  },
  4: {
    name: 'EARTH',
    title: 'EARTH & MOON',
    distance: '1.00 AU',
    tag: '// EARTH · 1.00 AU',
    aura1: '#38BDF8',
    aura2: '#0284C7',
    glow: 'rgba(56, 189, 248, 0.6)'
  },
  5: {
    name: 'MARS',
    title: 'MARS',
    distance: '1.52 AU',
    tag: '// MARS · 1.52 AU',
    aura1: '#EA580C',
    aura2: '#C2410C',
    glow: 'rgba(234, 88, 12, 0.55)'
  },
  6: {
    name: 'JUPITER',
    title: 'JUPITER',
    distance: '5.20 AU',
    tag: '// JUPITER · 5.20 AU',
    aura1: '#D97706',
    aura2: '#92400E',
    glow: 'rgba(217, 119, 6, 0.6)'
  }
};

// Master Celestial Planet Dispatcher
function StepCelestialPlanet({ step, className = "" }) {
  switch (step) {
    case 1:
      return <CelestialSun className={className} />;
    case 2:
      return <CelestialMercury className={className} />;
    case 3:
      return <CelestialVenus className={className} />;
    case 4:
      return <CelestialEarth className={className} />;
    case 5:
      return <CelestialMars className={className} />;
    case 6:
      return <CelestialJupiter className={className} />;
    default:
      return <CelestialSun className={className} />;
  }
}

// Metallic Smartcard Microchip SVG for Employee/Candidate ID Badge
function SmartCardChip({ className = "" }) {
  return (
    <svg viewBox="0 0 48 36" className={className} fill="none">
      <rect width="48" height="36" rx="5" fill="#D97706" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.2" />
      {/* Smart Card Contact Segments */}
      <rect x="4" y="4" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      <rect x="18.5" y="4" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      <rect x="33" y="4" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      
      <rect x="4" y="20" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      <rect x="18.5" y="20" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      <rect x="33" y="20" width="11" height="12" rx="1.5" fill="#F59E0B" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="0.75" />
      
      {/* Center Circuit trace */}
      <circle cx="24" cy="18" r="2" fill="#FEF3C7" />
      <line x1="15" y1="10" x2="33" y2="10" stroke="#FEF3C7" strokeWidth="0.7" />
      <line x1="15" y1="26" x2="33" y2="26" stroke="#FEF3C7" strokeWidth="0.7" />
    </svg>
  );
}

// Realistic Stylized Barcode SVG for ID Badge
function IdBadgeBarcode({ className = "" }) {
  const barPattern = [
    2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 4, 2, 1, 3, 2, 1, 
    1, 4, 2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4,
    1, 3, 2, 1, 2, 3, 1, 4, 2, 1
  ];
  return (
    <div className={`flex items-stretch gap-[1.5px] h-7 opacity-80 select-none ${className}`}>
      {barPattern.map((w, i) => (
        <span
          key={i}
          className="bg-white/70 h-full rounded-[0.5px]"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}

// Realistic Lanyard Strap and Chrome Carabiner Lobster Clasp
function LanyardHook({ className = "" }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <div className={`flex flex-col items-center select-none pointer-events-none -mb-3 z-30 relative ${className}`}>
      {/* Fabric Lanyard Ribbon */}
      <div className="w-9 h-11 bg-gradient-to-b from-zinc-400 via-zinc-100 to-zinc-300 rounded-t-sm shadow-md relative overflow-hidden border-x border-zinc-400/90">
        <div className="absolute inset-y-0 left-1.5 w-[1px] bg-zinc-400/50" />
        <div className="absolute inset-y-0 right-1.5 w-[1px] bg-zinc-400/50" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-zinc-300" />
      </div>

      {/* Metal Crimp Clamp */}
      <div className="w-10 h-3 bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-600 rounded-[2px] shadow-sm -mt-0.5 border border-zinc-400 flex items-center justify-center">
        <div className="w-6 h-[1px] bg-zinc-700/60" />
      </div>

      {/* Steel Swivel Ring */}
      <div className="w-6 h-6 rounded-full border-[3px] border-zinc-300 bg-transparent -mt-1 shadow-inner flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full border border-zinc-500/40" />
      </div>

      {/* Chrome Lobster Carabiner Clasp Hook entering badge hole */}
      <svg viewBox="0 0 32 46" className="w-7 h-10 -mt-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]" fill="none">
        <defs>
          <linearGradient id={`claspMetal_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4F4F5" />
            <stop offset="30%" stopColor="#E4E4E7" />
            <stop offset="70%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#52525B" />
          </linearGradient>
          <linearGradient id={`hookMetal_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#3F3F46" />
          </linearGradient>
        </defs>
        {/* Clasp Body */}
        <path d="M 16 2 C 10 2 9 8 9 13 L 9 24 C 9 30 13 35 16 38 C 19 35 23 30 23 24 L 23 13 C 23 8 22 2 16 2 Z" fill={`url(#claspMetal_${id})`} stroke="#3F3F46" strokeWidth="1" />
        {/* Interior Cutout */}
        <ellipse cx="16" cy="18" rx="4" ry="7" fill="#0b0f19" />
        {/* Retractable Lever Thumb Tab */}
        <rect x="21" y="15" width="3.5" height="9" rx="1.5" fill="#E4E4E7" stroke="#3F3F46" strokeWidth="0.8" />
        {/* Hook loop looping through badge hole */}
        <path d="M 16 34 C 11 34 11 44 16 44 C 21 44 21 34 16 34 Z" stroke={`url(#hookMetal_${id})`} strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
}

export default function RecruitmentApply({ 
  introCompleted = true, 
  setActivePage,
  recruitmentOpenStatus = true,
  recruitmentStatusLoading = false
}) {
  // Track whether the intro animation was running when this page mounted
  const wasIntroPlayingOnMount = useRef(!introCompleted);

  useEffect(() => {
    if (introCompleted) {
      const timer = setTimeout(() => {
        wasIntroPlayingOnMount.current = false;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [introCompleted]);

  // Refined Intro-aware Staged Animation Style
  const getAnimStyle = (delaySec, duration = '0.65s') => {
    if (!introCompleted) {
      return { opacity: 0 };
    }
    const base = wasIntroPlayingOnMount.current ? 0.25 : 0.0;
    return {
      animation: `scrollRevealUp ${duration} cubic-bezier(0.16, 1, 0.3, 1) ${(base + delaySec).toFixed(2)}s both`
    };
  };

  // Step State (1 to 6) strictly persisted in localStorage so refresh/revisit restores exact active step
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const savedStep = getStorageItem(LOCAL_STORAGE_STEP_KEY, 'celestius_recruitment_application_step_v2');
      if (savedStep) {
        const parsedStep = parseInt(savedStep, 10);
        if (parsedStep >= 1 && parsedStep <= 6) return parsedStep;
      }
    } catch (e) {}
    return 1;
  });

  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    try {
      const savedMax = getStorageItem(LOCAL_STORAGE_MAX_STEP_KEY, null);
      if (savedMax) {
        const parsedMax = parseInt(savedMax, 10);
        if (parsedMax >= 1 && parsedMax <= 6) return parsedMax;
      }
      const savedStep = getStorageItem(LOCAL_STORAGE_STEP_KEY, 'celestius_recruitment_application_step_v2');
      if (savedStep) {
        const parsedStep = parseInt(savedStep, 10);
        if (parsedStep >= 1 && parsedStep <= 6) return parsedStep;
      }
    } catch (e) {}
    return 1;
  });

  // Form Data with LocalStorage Persistence
  const [formData, setFormData] = useState(() => {
    // Check for role explicitly chosen via "Apply for this role" button
    let preselectedRole = null;
    try {
      const chosen = localStorage.getItem('celestius_recruitment_selected_role');
      if (chosen) {
        preselectedRole = JSON.parse(chosen);
      }
    } catch (e) {}

    try {
      const saved = getStorageItem(LOCAL_STORAGE_KEY, 'celestius_recruitment_application_draft_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          Name: parsed.Name || '',
          regNumber: parsed.regNumber || '',
          personalEmail: parsed.personalEmail || '',
          email: parsed.email || '',
          mobileNumber: parsed.mobileNumber || '',
          department: parsed.department || 'CSE',
          year: '1st Year', // Always strictly locked to 1st Year
          section: parsed.section || '',
          role: preselectedRole?.role || parsed.role || 'Tech',
          subRole: preselectedRole?.subRole || parsed.subRole || 'Frontend Developer',
          githubUsername: parsed.githubUsername || '',
          githubConfirmed: Boolean(parsed.githubConfirmed),
          linkedinUsername: parsed.linkedinUsername || ''
        };
      }
    } catch (e) {}
    return {
      Name: '',
      regNumber: '',
      personalEmail: '',
      email: '',
      mobileNumber: '',
      department: 'CSE',
      year: '1st Year',
      section: '',
      role: preselectedRole?.role || 'Tech',
      subRole: preselectedRole?.subRole || 'Frontend Developer',
      githubUsername: '',
      githubConfirmed: false,
      linkedinUsername: ''
    };
  });

  // Flag indicating a prior draft was restored upon visit
  const [hasRestoredDraft, setHasRestoredDraft] = useState(() => {
    try {
      const savedStep = getStorageItem(LOCAL_STORAGE_STEP_KEY, 'celestius_recruitment_application_step_v2');
      const savedData = getStorageItem(LOCAL_STORAGE_KEY, 'celestius_recruitment_application_draft_v2');
      return Boolean((savedStep && parseInt(savedStep, 10) > 1) || (savedData && JSON.parse(savedData)?.Name));
    } catch (e) {
      return false;
    }
  });

  // Validation & Status State
  const [stepErrors, setStepErrors] = useState({});
  const [checkingPersonalEmail, setCheckingPersonalEmail] = useState(false);
  const [personalEmailStatus, setPersonalEmailStatus] = useState('idle'); // 'idle' | 'checking' | 'valid' | 'conflict' | 'error'
  const [personalEmailConflictMsg, setPersonalEmailConflictMsg] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle' | 'checking' | 'valid' | 'conflict' | 'error'
  const [emailConflictMsg, setEmailConflictMsg] = useState('');
  const [checkingMobile, setCheckingMobile] = useState(false);
  const [mobileStatus, setMobileStatus] = useState('idle'); // 'idle' | 'checking' | 'valid' | 'conflict' | 'error'
  const [mobileConflictMsg, setMobileConflictMsg] = useState('');

  // GitHub Live Verification State
  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Help & Contact Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [copiedPhoneIndex, setCopiedPhoneIndex] = useState(null);

  const handleCopyPhone = (number, index) => {
    try {
      navigator.clipboard.writeText(number.replace(/\s+/g, ''));
      setCopiedPhoneIndex(index);
      setTimeout(() => setCopiedPhoneIndex(null), 2000);
    } catch (e) {}
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showHelpModal) {
        setShowHelpModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelpModal]);

  // Synchronize preselected role if user navigated from "Apply for this role" button
  useEffect(() => {
    try {
      const chosen = localStorage.getItem('celestius_recruitment_selected_role');
      if (chosen) {
        const parsed = JSON.parse(chosen);
        if (parsed?.role && parsed?.subRole) {
          setFormData((prev) => ({
            ...prev,
            role: parsed.role,
            subRole: parsed.subRole
          }));
        }
        localStorage.removeItem('celestius_recruitment_selected_role');
      }
    } catch (e) {}
  }, []);

  // Auto-save form data silently to localStorage on every input change (only while form active)
  useEffect(() => {
    try {
      if (!submitResult) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
      }
    } catch (e) {}
  }, [formData, submitResult]);

  // Auto-save current active step & max reached step to localStorage on every step change
  useEffect(() => {
    try {
      if (!submitResult) {
        localStorage.setItem(LOCAL_STORAGE_STEP_KEY, currentStep.toString());
        if (currentStep > maxReachedStep) {
          setMaxReachedStep(currentStep);
          localStorage.setItem(LOCAL_STORAGE_MAX_STEP_KEY, currentStep.toString());
        }
      }
    } catch (e) {}
  }, [currentStep, maxReachedStep, submitResult]);

  useEffect(() => {
    try {
      if (!submitResult) {
        localStorage.setItem(LOCAL_STORAGE_MAX_STEP_KEY, maxReachedStep.toString());
      }
    } catch (e) {}
  }, [maxReachedStep, submitResult]);

  // Reset draft handler to clear storage and start over fresh
  const handleResetDraft = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
      localStorage.removeItem(LOCAL_STORAGE_MAX_STEP_KEY);
      localStorage.removeItem('celestius_recruitment_application_draft_v2');
      localStorage.removeItem('celestius_recruitment_application_step_v2');
    } catch (e) {}
    setFormData({
      Name: '',
      regNumber: '',
      personalEmail: '',
      email: '',
      mobileNumber: '',
      department: 'CSE',
      year: '1st Year',
      section: '',
      role: 'Tech',
      subRole: 'Frontend Developer',
      githubUsername: '',
      githubConfirmed: false,
      linkedinUsername: ''
    });
    setCurrentStep(1);
    setMaxReachedStep(1);
    setStepErrors({});
    setPersonalEmailStatus('idle');
    setPersonalEmailConflictMsg('');
    setEmailStatus('idle');
    setEmailConflictMsg('');
    setMobileStatus('idle');
    setMobileConflictMsg('');
    setGithubData(null);
    setGithubLoading(false);
    setGithubError('');
    setHasRestoredDraft(false);
    setSubmitResult(null);
  };

  // GitHub API Live Fetch (Debounced)
  useEffect(() => {
    const rawUser = formData.githubUsername.trim().replace(/^@/, '');
    if (!rawUser) {
      setGithubData(null);
      setGithubError('');
      setGithubLoading(false);
      setFormData((prev) => (prev.githubConfirmed ? { ...prev, githubConfirmed: false } : prev));
      return;
    }

    const timer = setTimeout(async () => {
      setGithubLoading(true);
      setGithubError('');
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(rawUser)}`);
        if (res.ok) {
          const data = await res.json();
          setGithubData(data);
          setGithubError('');
        } else if (res.status === 404) {
          setGithubData(null);
          setGithubError('GitHub username not found on GitHub.');
          setFormData((prev) => (prev.githubConfirmed ? { ...prev, githubConfirmed: false } : prev));
        } else {
          setGithubData(null);
          setGithubError('Unable to verify GitHub profile.');
          setFormData((prev) => (prev.githubConfirmed ? { ...prev, githubConfirmed: false } : prev));
        }
      } catch (err) {
        setGithubData(null);
        setGithubError('Network issue contacting GitHub API.');
      } finally {
        setGithubLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.githubUsername]);

  // Check email, personalEmail, regNumber, and mobileNumber uniqueness against database
  const checkUniquenessApi = useCallback(async (email, regNumber, mobileNumber, personalEmail) => {
    try {
      const baseUrl = getApiBaseUrl();
      const apiUrl = baseUrl.endsWith('/api') ? `${baseUrl}/students/check` : `${baseUrl}/api/students/check`;

      const payload = {};
      if (email) payload.email = email.trim().toLowerCase();
      if (personalEmail) payload.personalEmail = personalEmail.trim().toLowerCase();
      if (regNumber) payload.regNumber = regNumber.trim().toUpperCase();
      if (mobileNumber) payload.mobileNumber = mobileNumber.replace(/\D/g, '');

      let res;
      try {
        res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch {
        res = await fetch('/api/students/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        const data = await res.json();
        return data; // { success: true, exists: boolean, message, field }
      }
      return { success: false, exists: false };
    } catch {
      return { success: false, exists: false };
    }
  }, []);

  // Live validation on Personal Email input (Compulsory: must end with @gmail.com & unique check)
  useEffect(() => {
    const cleanPersonal = formData.personalEmail.trim().toLowerCase();
    if (!cleanPersonal) {
      setPersonalEmailStatus('idle');
      setPersonalEmailConflictMsg('');
      return;
    }

    if (!cleanPersonal.endsWith('@gmail.com') || cleanPersonal === '@gmail.com') {
      setPersonalEmailStatus('error');
      setPersonalEmailConflictMsg('Personal email must end with @gmail.com');
      setStepErrors((prev) => ({ ...prev, personalEmail: 'Personal email must end with @gmail.com' }));
      return;
    }

    // Domain is valid, query DB with 450ms debounce
    setPersonalEmailStatus('checking');
    setPersonalEmailConflictMsg('');
    const timer = setTimeout(async () => {
      setCheckingPersonalEmail(true);
      const result = await checkUniquenessApi(null, null, null, cleanPersonal);
      setCheckingPersonalEmail(false);

      if (result.exists && (result.field === 'Personal email address' || !result.field)) {
        setPersonalEmailStatus('conflict');
        const msg = result.message || 'This personal email is already registered.';
        setPersonalEmailConflictMsg(msg);
        setStepErrors((prev) => ({ ...prev, personalEmail: msg }));
      } else {
        setPersonalEmailStatus('valid');
        setPersonalEmailConflictMsg('');
        setStepErrors((prev) => {
          const next = { ...prev };
          delete next.personalEmail;
          return next;
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.personalEmail, checkUniquenessApi]);

  // Live validation on Email input (Optional: if given, check domain and DB uniqueness)
  useEffect(() => {
    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setEmailStatus('idle');
      setEmailConflictMsg('');
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
      return;
    }

    if (!cleanEmail.endsWith('@citchennai.net')) {
      setEmailStatus('error');
      setEmailConflictMsg('Email must end with @citchennai.net');
      setStepErrors((prev) => ({ ...prev, email: 'Only official @citchennai.net accounts are permitted.' }));
      return;
    }

    // Email domain is valid, query DB with 450ms debounce
    setEmailStatus('checking');
    setEmailConflictMsg('');
    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      const result = await checkUniquenessApi(cleanEmail, null, null);
      setCheckingEmail(false);

      if (result.exists && (result.field === 'Email address' || !result.field)) {
        setEmailStatus('conflict');
        const msg = result.message || 'This email is already registered.';
        setEmailConflictMsg(msg);
        setStepErrors((prev) => ({ ...prev, email: msg }));
      } else {
        setEmailStatus('valid');
        setEmailConflictMsg('');
        setStepErrors((prev) => {
          const next = { ...prev };
          delete next.email;
          return next;
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.email, checkUniquenessApi]);

  // Live validation on Mobile Number input (Compulsory + unique check)
  useEffect(() => {
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanMobile) {
      setMobileStatus('idle');
      setMobileConflictMsg('');
      return;
    }

    if (cleanMobile.length < 10) {
      setMobileStatus('idle');
      setMobileConflictMsg('');
      return;
    }

    if (cleanMobile.length > 10) {
      setMobileStatus('error');
      setMobileConflictMsg('Please enter a valid 10-digit mobile number.');
      setStepErrors((prev) => ({ ...prev, mobileNumber: 'Please enter a valid 10-digit mobile number.' }));
      return;
    }

    // 10 digits provided, check DB uniqueness with 450ms debounce
    setMobileStatus('checking');
    setMobileConflictMsg('');
    const timer = setTimeout(async () => {
      setCheckingMobile(true);
      const result = await checkUniquenessApi(null, null, cleanMobile);
      setCheckingMobile(false);

      if (result.exists && (result.field === 'Mobile number' || !result.field)) {
        setMobileStatus('conflict');
        const msg = result.message || 'This mobile number is already registered.';
        setMobileConflictMsg(msg);
        setStepErrors((prev) => ({ ...prev, mobileNumber: msg }));
      } else {
        setMobileStatus('valid');
        setMobileConflictMsg('');
        setStepErrors((prev) => {
          const next = { ...prev };
          delete next.mobileNumber;
          return next;
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.mobileNumber, checkUniquenessApi]);

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStepErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'role') {
      const defaultSub = ROLE_OPTIONS[value] ? ROLE_OPTIONS[value][0] : '';
      setFormData((prev) => ({
        ...prev,
        role: value,
        subRole: defaultSub
      }));
    } else if (name === 'regNumber') {
      setFormData((prev) => ({
        ...prev,
        regNumber: value.toUpperCase()
      }));
    } else if (name === 'section') {
      setFormData((prev) => ({
        ...prev,
        section: value.toUpperCase()
      }));
    } else if (name === 'githubUsername') {
      const cleanUser = value.replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/\/+$/, '').trim();
      setFormData((prev) => ({ ...prev, githubUsername: cleanUser, githubConfirmed: false }));
    } else if (name === 'linkedinUsername') {
      const cleanUser = value.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i, '').replace(/\/+$/, '').trim();
      setFormData((prev) => ({ ...prev, linkedinUsername: cleanUser }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Validate specific step and set errors if invalid
  const validateStep = async (step) => {
    const errors = {};

    // STEP 1: Personal Info (Name compulsory, Register Number optional)
    if (step === 1) {
      if (!formData.Name.trim()) {
        errors.Name = 'Please enter your full name.';
      }
    }

    // STEP 2: Communication (Personal Email compulsory @gmail.com + unique, Mobile compulsory + unique, College Email optional + unique if given)
    if (step === 2) {
      const cleanPersonalEmail = formData.personalEmail.trim().toLowerCase();
      if (!cleanPersonalEmail) {
        errors.personalEmail = 'Personal email is required.';
      } else if (!cleanPersonalEmail.endsWith('@gmail.com') || cleanPersonalEmail === '@gmail.com') {
        errors.personalEmail = 'Personal email must end with @gmail.com';
      }

      const cleanEmail = formData.email.trim().toLowerCase();
      if (cleanEmail && !cleanEmail.endsWith('@citchennai.net')) {
        errors.email = 'Only official @citchennai.net accounts are permitted.';
      }

      const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
      if (!cleanMobile) {
        errors.mobileNumber = 'Mobile number is required.';
      } else if (cleanMobile.length !== 10) {
        errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
      }

      if (personalEmailStatus === 'conflict' && !errors.personalEmail) {
        errors.personalEmail = personalEmailConflictMsg || 'This personal email is already registered.';
      }
      if (mobileStatus === 'conflict' && !errors.mobileNumber) {
        errors.mobileNumber = mobileConflictMsg || 'This mobile number is already registered.';
      }
      if (cleanEmail && emailStatus === 'conflict' && !errors.email) {
        errors.email = emailConflictMsg || 'This email is already registered.';
      }

      // Check uniqueness against database
      if (!errors.personalEmail && !errors.email && !errors.mobileNumber) {
        setCheckingPersonalEmail(true);
        setCheckingMobile(true);
        if (cleanEmail) setCheckingEmail(true);
        const check = await checkUniquenessApi(cleanEmail || null, null, cleanMobile, cleanPersonalEmail);
        setCheckingPersonalEmail(false);
        setCheckingMobile(false);
        if (cleanEmail) setCheckingEmail(false);

        if (check.exists) {
          if (check.field === 'Personal email address') {
            errors.personalEmail = check.message;
            setPersonalEmailStatus('conflict');
            setPersonalEmailConflictMsg(check.message);
          } else if (cleanEmail && check.field === 'University email address') {
            errors.email = check.message;
            setEmailStatus('conflict');
            setEmailConflictMsg(check.message);
          } else {
            errors.mobileNumber = check.message;
            setMobileStatus('conflict');
            setMobileConflictMsg(check.message);
          }
          setStepErrors(errors);
          return false;
        } else {
          setPersonalEmailStatus('valid');
          if (cleanEmail) setEmailStatus('valid');
          setMobileStatus('valid');
        }
      }
    }

    // STEP 3: Academic Details (Department and Section are compulsory)
    if (step === 3) {
      if (!formData.department) {
        errors.department = 'Please choose your department.';
      }
      if (!formData.section.trim()) {
        errors.section = 'Please enter your section (e.g. A, B, or NIL).';
      }
    }

    // STEP 4: Role Selection (Track category and specific role are compulsory)
    if (step === 4) {
      if (!formData.role) {
        errors.role = 'Please select a track category.';
      }
      if (!formData.subRole) {
        errors.subRole = 'Please select a specific role.';
      }
    }

    // STEP 5: Developer Deck (GitHub is compulsory; LinkedIn remains optional)
    if (step === 5) {
      if (!formData.githubUsername.trim()) {
        errors.githubUsername = 'GitHub username is required.';
      } else if (githubLoading) {
        errors.githubUsername = 'Verifying GitHub profile... Please wait a moment.';
      } else if (githubError) {
        errors.githubUsername = githubError;
      } else if (githubData && !formData.githubConfirmed) {
        errors.githubUsername = 'Please click to select and confirm your GitHub profile card below.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return false;
    }

    setStepErrors({});
    return true;
  };

  // Step Validation & Navigation (Enforces exact required / optional rules)
  const validateAndProceed = async () => {
    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    setStepErrors({});
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxReachedStep((prev) => Math.max(prev, nextStep));
  };

  const handleGoBack = async () => {
    if (currentStep <= 1) return;

    // If the user has already reached subsequent steps and comes back to this step to change info,
    // they must meet validation before switching to any step
    if (maxReachedStep > currentStep) {
      const isValid = await validateStep(currentStep);
      if (!isValid) return;
    }

    setStepErrors({});
    setCurrentStep(currentStep - 1);
  };

  const handleJumpToStep = async (stepNumber) => {
    if (stepNumber === currentStep) return;
    if (stepNumber > maxReachedStep) return;

    // Validate the current step before allowing switch to ANY step
    const isValid = await validateStep(currentStep);
    if (!isValid) return;

    setStepErrors({});
    setCurrentStep(stepNumber);
  };

  // Final Submission Handler (Double-checks against duplicate before final commit)
  const handleFinalSubmit = async () => {
    // Validate all required steps prior to final submission
    for (let s = 1; s <= 5; s++) {
      const isStepValid = await validateStep(s);
      if (!isStepValid) {
        setCurrentStep(s);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const cleanPersonalEmail = formData.personalEmail.trim().toLowerCase();
    const cleanEmail = formData.email.trim().toLowerCase() || null;
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    const cleanSection = formData.section.trim().toUpperCase() || 'NIL';
    const cleanRegNumber = formData.regNumber.trim().toUpperCase() || '';
    const cleanGithubUrl = formData.githubUsername.trim() ? `https://github.com/${formData.githubUsername.trim()}` : '';
    const cleanLinkedinUrl = formData.linkedinUsername.trim() ? `https://linkedin.com/in/${formData.linkedinUsername.trim()}` : '';

    // Final pre-flight uniqueness re-check to prevent race conditions or bypassed edits
    const preCheck = await checkUniquenessApi(cleanEmail, null, cleanMobile, cleanPersonalEmail);
    if (preCheck.exists) {
      setIsSubmitting(false);
      setSubmitResult({
        status: 'conflict',
        message: 'Already Registered',
        details: preCheck.message || 'A student with this Mobile Number or Email has already registered.'
      });
      return;
    }

    const payload = {
      Name: formData.Name.trim(),
      personalEmail: cleanPersonalEmail,
      department: formData.department.trim(),
      year: '1st Year',
      section: cleanSection,
      mobileNumber: cleanMobile,
      regNumber: cleanRegNumber,
      role: formData.role,
      subRole: formData.subRole,
      githubUrl: cleanGithubUrl,
      linkedinUrl: cleanLinkedinUrl
    };

    if (cleanEmail) {
      payload.email = cleanEmail;
    }

    try {
      const baseUrl = getApiBaseUrl();
      const apiUrl = baseUrl.endsWith('/api') ? `${baseUrl}/students/register` : `${baseUrl}/api/students/register`;

      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (networkErr) {
        response = await fetch('/api/students/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json().catch(() => ({}));

      if (response.status === 201) {
        // Capture profiles before resetting form state
        const submittedProfiles = {
          githubUsername: formData.githubUsername.trim(),
          linkedinUsername: formData.linkedinUsername.trim(),
          githubConfirmed: formData.githubConfirmed
        };

        // Clear local storage draft and step upon confirmed success
        try {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
          localStorage.removeItem(LOCAL_STORAGE_MAX_STEP_KEY);
          localStorage.removeItem('celestius_recruitment_application_draft_v2');
          localStorage.removeItem('celestius_recruitment_application_step_v2');
        } catch (e) {}

        // Reset the form data state so no prior student information remains
        setFormData({
          Name: '',
          regNumber: '',
          personalEmail: '',
          email: '',
          mobileNumber: '',
          department: 'CSE',
          year: '1st Year',
          section: '',
          role: 'Tech',
          subRole: 'Frontend Developer',
          githubUsername: '',
          githubConfirmed: false,
          linkedinUsername: ''
        });
        setCurrentStep(1);
        setMaxReachedStep(1);
        setStepErrors({});
        setPersonalEmailStatus('idle');
        setPersonalEmailConflictMsg('');
        setEmailStatus('idle');
        setEmailConflictMsg('');
        setMobileStatus('idle');
        setMobileConflictMsg('');
        setGithubData(null);
        setGithubLoading(false);
        setGithubError('');
        setHasRestoredDraft(false);

        setSubmitResult({
          status: 'success',
          message: data.message || 'Application successfully registered!',
          data: data.data || payload,
          submittedProfiles
        });
      } else if (response.status === 409) {
        setSubmitResult({
          status: 'conflict',
          message: 'Already Registered',
          details: data.error || 'A candidate with this Email, Mobile Number, or Register Number has already applied.'
        });
      } else {
        setSubmitResult({
          status: 'error',
          message: data.message || 'Submission failed.',
          details: data.error || 'Please review your application parameters and try again.'
        });
      }
    } catch (err) {
      setSubmitResult({
        status: 'error',
        message: 'Network Error',
        details: 'Unable to reach the server. Ensure the backend server is active on port 5000.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTech = formData.role === 'Tech';
  const accentColor = isTech ? '#FFCC00' : '#38bdf8';
  const shapeTheme = isTech
    ? {
        light: '#FFFBEB',
        mid: '#FDE047',
        dark: '#EAB308',
        deep: '#78350F',
        glow: 'rgba(234, 179, 8, 0.5)'
      }
    : {
        light: '#E0F2FE',
        mid: '#38BDF8',
        dark: '#0284C7',
        deep: '#1E3A8A',
        glow: 'rgba(56, 189, 248, 0.5)'
      };

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

  const selectedRoleMeta = ROLE_DETAILS[formData.subRole] || ROLE_DETAILS['Frontend Developer'];
  const SelectedRoleIcon = selectedRoleMeta.icon || Layers;
  const activePlanet = PLANET_METADATA[currentStep] || PLANET_METADATA[1];

  // Protected route display when recruitment is closed
  if (!recruitmentOpenStatus) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-center space-y-8 select-none">
        <div className="relative overflow-hidden rounded-3xl bg-[#090a10]/85 border border-white/10 backdrop-blur-2xl p-8 sm:p-14 shadow-[0_0_80px_rgba(0,0,0,0.8)] space-y-8">
          {/* Subtle cosmic grid background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,204,0,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Ambient planetary glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#FFCC00]/10 blur-[90px] pointer-events-none" />

          {/* Planetary emblem */}
          <div className="relative z-10 flex flex-col items-center space-y-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                <Lock className="w-9 h-9 text-[#FFCC00]" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[#090a10] animate-pulse" />
            </div>

            {/* Status Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-500/30 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-bold uppercase tracking-wider">[ RECRUITMENT APPLICATIONS PAUSED ]</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h1 
              className="font-ndot text-4xl sm:text-6xl text-white tracking-wide uppercase leading-tight"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              STAY TUNED FOR APPLYING.
            </h1>
            <p className="font-mono text-sm sm:text-base text-[#FFCC00] uppercase tracking-wider font-semibold">
              // GET READY FOR JOINING THE CREW.
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2">
              Celestius recruitment submissions are currently closed as candidate applications undergo evaluation. Stay tuned for future intake announcements and track updates. In the meantime, explore all our technical and non-technical domains!
            </p>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (typeof setActivePage === 'function') {
                  setActivePage('recruitment');
                } else {
                  window.location.href = '/recruitment';
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,204,0,0.35)] active:scale-95 cursor-pointer"
            >
              <span>EXPLORE ROLES & TRACKS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (typeof setActivePage === 'function') {
                  setActivePage('home');
                } else {
                  window.location.href = '/';
                }
              }}
              className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOME</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderCareerTip = () => {
    const profiles = submitResult?.submittedProfiles || {
      githubUsername: formData.githubUsername?.trim(),
      linkedinUsername: formData.linkedinUsername?.trim()
    };

    const hasGithub = Boolean(profiles.githubUsername);
    const hasLinkedin = Boolean(profiles.linkedinUsername);

    // Case 1: Neither GitHub nor LinkedIn provided
    if (!hasGithub && !hasLinkedin) {
      return (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-left max-w-lg mx-auto shadow-lg backdrop-blur-md animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Quick Career Tip · Digital Presence
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Stay Ahead
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                You have not given your <strong className="text-white font-mono">GitHub</strong> and <strong className="text-white font-mono">LinkedIn</strong> usernames. If you don't have an account on these platforms, please go ahead and create your accounts to showcase your work and stay ahead of others!
              </p>
              <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                <a
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-200 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Create GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href="https://www.linkedin.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/30 text-[11px] font-mono text-sky-200 hover:text-sky-100 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Create LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Case 2: Only LinkedIn provided, GitHub missing
    if (!hasGithub && hasLinkedin) {
      return (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-left max-w-lg mx-auto shadow-lg backdrop-blur-md animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Quick Career Tip · Code Portfolio
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Stay Ahead
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                You have not given your <strong className="text-white font-mono">GitHub</strong> username. If you don't have an account on GitHub, please go ahead and create your account to showcase your code repositories and stay ahead of others!
              </p>
              <div className="pt-2">
                <a
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-200 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Create GitHub Account</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Case 3: Only GitHub provided, LinkedIn missing
    if (hasGithub && !hasLinkedin) {
      return (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-left max-w-lg mx-auto shadow-lg backdrop-blur-md animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Quick Career Tip · Professional Network
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Stay Ahead
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                You have not given your <strong className="text-white font-mono">LinkedIn</strong> username. If you don't have an account on LinkedIn, please go ahead and create your account to expand your network, connect with leaders, and stay ahead of others!
              </p>
              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/30 text-[11px] font-mono text-sky-200 hover:text-sky-100 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Create LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Case 4: Both provided
    return (
      <div className="mt-4 p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 text-left max-w-lg mx-auto shadow-lg backdrop-blur-md animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider block">
              Profiles Connected
            </span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Awesome! Both your GitHub and LinkedIn profiles are linked, giving your application strong visibility and setting you ahead.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 text-left space-y-4 sm:space-y-5 select-none">
      
      {/* 1. Header & Minimalist Step Progress */}
      <section 
        className="space-y-3"
        style={getAnimStyle(0.05, '0.7s')}
      >
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => setActivePage('recruitment')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/15 hover:border-[#FFCC00]/50 text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer group shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FFCC00] transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">Back to Roles</span>
          </button>
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FFCC00]/10 hover:bg-[#FFCC00]/20 border border-[#FFCC00]/30 hover:border-[#FFCC00] text-zinc-200 hover:text-[#FFCC00] font-mono text-xs transition-all shadow-sm group cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFCC00] group-hover:scale-110 transition-transform" />
              <span>Need help in recruitment? Reach us</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 font-mono text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00] shadow-[0_0_8px_rgba(255,204,0,0.8)] animate-pulse" />
              <span className="text-[#FFCC00] font-bold tracking-wider">Step 0{currentStep}</span>
              <span className="text-zinc-500">/</span>
              <span className="text-zinc-300 font-semibold">06</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h1 
            className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-none"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            Candidate Application
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Complete the details below to submit your recruitment application.
          </p>
        </div>

        {/* Minimalist Segmented Progress Bar */}
        <div className="pt-2">
          <div className="grid grid-cols-6 gap-2">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.id;
              const isCompleted = step.id < currentStep;
              const isAccessible = step.id <= maxReachedStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleJumpToStep(step.id)}
                  disabled={!isAccessible}
                  className={`group flex flex-col gap-2 text-left transition-all ${
                    isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'
                  }`}
                >
                  <div 
                    className={`h-1 w-full rounded-full transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-[#FFCC00] shadow-[0_0_8px_rgba(255,204,0,0.7)]' 
                        : isCompleted 
                          ? 'bg-white/50' 
                          : 'bg-white/10 group-hover:bg-white/20'
                    }`} 
                  />
                  <span className={`text-[11px] font-mono hidden sm:inline-block transition-colors ${
                    isCurrent 
                      ? 'text-[#FFCC00] font-bold' 
                      : isCompleted 
                        ? 'text-zinc-300' 
                        : 'text-zinc-600'
                  }`}>
                    0{step.id} {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Discreet Saved Draft Indicator */}
        {hasRestoredDraft && currentStep > 1 && !submitResult && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-500">
            <span>Resumed from saved draft (Step 0{currentStep})</span>
            <button
              onClick={handleResetDraft}
              className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              Reset draft
            </button>
          </div>
        )}
      </section>

      {/* 2. Main Multi-Step Form Container with 3D Celestial Planets & Multi-Layer Blur Depth */}
      <section 
        className="relative rounded-[28px] p-5 sm:p-7 lg:p-8 border border-white/15 bg-[#07070a]/85 backdrop-blur-3xl shadow-2xl overflow-hidden transition-all duration-700"
        style={{
          boxShadow: `0 0 75px ${activePlanet.aura1}25, 0 35px 90px rgba(0,0,0,0.95)`,
          ...getAnimStyle(0.18, '0.8s')
        }}
      >
        {/* Layer 1: Massive Ambient Liquid Mesh Aurora with Deep Diffuse Blur */}
        <div 
          className="absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full blur-[140px] pointer-events-none animate-bubble-1 opacity-50 transition-colors duration-700"
          style={{ backgroundColor: activePlanet.aura1 }}
        />
        <div 
          className="absolute -bottom-36 -right-36 w-[480px] h-[480px] rounded-full blur-[150px] pointer-events-none animate-bubble-2 opacity-40 transition-colors duration-700"
          style={{ backgroundColor: activePlanet.aura2 }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-[360px] h-[360px] rounded-full blur-[120px] pointer-events-none animate-bubble-3 opacity-25 transition-colors duration-700"
          style={{ backgroundColor: isTech ? '#D97706' : '#38BDF8' }}
        />

        {/* Single Signature Celestial Planet for Current Step (Top-Right) with Deep Blur Depth */}
        <div 
          key={`primary-planet-${currentStep}`}
          className="absolute -top-6 right-8 sm:right-16 w-48 h-48 sm:w-60 sm:h-60 pointer-events-none animate-bubble-1 opacity-90 transition-all duration-700 z-0"
        >
          {/* Intense Ambient Radial Blur Bloom behind the active planet */}
          <div 
            className="absolute inset-0 rounded-full blur-[60px] sm:blur-[85px] pointer-events-none opacity-80 -z-10"
            style={{ backgroundColor: activePlanet.glow }}
          />
          <StepCelestialPlanet 
            step={currentStep} 
            className="w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-transform duration-700" 
          />
        </div>

        {/* Soft Ambient Corner Light Blur */}
        <div 
          className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full pointer-events-none animate-bubble-2 opacity-25 blur-[60px]"
          style={{
            backgroundColor: activePlanet.aura1
          }}
        />

        {/* Subtle Dot Matrix Pattern Overlay */}
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        {/* Frosted Glass Vignette Overlay ensuring pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/55 via-[#07070a]/70 to-[#07070a]/85 pointer-events-none backdrop-blur-[1.5px]" />

        {/* SUBMISSION RESULT VIEWS */}
        {submitResult ? (
          <div className="relative z-10 animate-fade-in space-y-6 text-center py-4">
            {submitResult.status === 'success' ? (
              <div className="space-y-6">
                {/* Animated Tick Mark with Draw-In Stroke & Radial Pulse Shockwave */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center pt-2">
                  {/* Expanding Shockwave Ring 1 */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/40 pointer-events-none"
                    style={{ animation: 'submissionPulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite' }}
                  />
                  {/* Expanding Shockwave Ring 2 */}
                  <div 
                    className="absolute -inset-3 rounded-full border border-emerald-400/20 pointer-events-none"
                    style={{ animation: 'submissionPulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s infinite' }}
                  />
                  
                  {/* Glowing Emerald Aura */}
                  <div className="absolute inset-2 rounded-full bg-emerald-500/25 blur-xl pointer-events-none" />

                  {/* Main Animated SVG Checkmark Badge */}
                  <div 
                    className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-900/30 to-emerald-950/70 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.35)]"
                    style={{ animation: 'submissionBadgePop 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
                  >
                    <svg className="w-12 h-12" viewBox="0 0 52 52" fill="none">
                      {/* Background circle track */}
                      <circle 
                        cx="26" 
                        cy="26" 
                        r="22" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        className="text-emerald-500/25"
                      />
                      {/* Animated outer circle drawing in */}
                      <circle 
                        cx="26" 
                        cy="26" 
                        r="22" 
                        stroke="currentColor" 
                        strokeWidth="2.8" 
                        strokeLinecap="round"
                        className="text-emerald-400"
                        style={{
                          strokeDasharray: 140,
                          strokeDashoffset: 140,
                          transformOrigin: 'center',
                          transform: 'rotate(-90deg)',
                          animation: 'drawCheckCircle 0.8s cubic-bezier(0.65, 0, 0.45, 1) 0.15s forwards'
                        }}
                      />
                      {/* Animated tick drawing in */}
                      <path 
                        d="M15 27 L23 35 L37 19" 
                        stroke="currentColor" 
                        strokeWidth="3.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-emerald-300"
                        style={{
                          strokeDasharray: 40,
                          strokeDashoffset: 40,
                          animation: 'drawCheckTick 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.7s forwards'
                        }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wider"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    Application Submitted
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Your candidate profile has been recorded. Our team leads will review your application soon.
                  </p>
                </div>

                {/* DYNAMIC CAREER TIP BASED ON GITHUB & LINKEDIN USERNAMES */}
                {renderCareerTip()}

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActivePage('recruitment')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase cursor-pointer transition-all"
                  >
                    Back to Recruitment
                  </button>
                  <button
                    onClick={handleResetDraft}
                    className="px-5 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase cursor-pointer transition-all shadow-[0_0_20px_rgba(255,204,0,0.25)]"
                  >
                    New Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h2 
                    className="font-ndot text-3xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    {submitResult.status === 'conflict' ? 'Already Registered' : 'Submission Failed'}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    {submitResult.details || submitResult.message}
                  </p>
                </div>
                <button
                  onClick={() => setSubmitResult(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase cursor-pointer transition-all"
                >
                  Return to Form
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ACTIVE STEP CONTENT */
          <div key={`step-stage-${currentStep}`} className="relative z-10 space-y-5 animate-step-enter">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-step-enter">
                <div className="flex items-baseline justify-between pb-3 border-b border-white/10">
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide leading-tight">
                      Personal Details
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans">
                      Enter your legal full name.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                      placeholder="e.g. Alex Henderson"
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white font-sans text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.Name 
                          ? 'border-red-500' 
                          : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.Name && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.Name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Register Number <span className="text-zinc-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="regNumber"
                      value={formData.regNumber}
                      onChange={handleInputChange}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                      placeholder="e.g. 210424104001"
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.regNumber 
                          ? 'border-red-500' 
                          : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.regNumber && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.regNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CONTACT DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-step-enter">
                <div className="flex items-baseline justify-between pb-3 border-b border-white/10">
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide leading-tight">
                      Contact Information
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans">
                      Personal email (@gmail.com) and mobile number are required. College email is optional.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs text-zinc-300">
                        Personal Email * <span className="text-zinc-500 font-normal">(@gmail.com)</span>
                      </label>
                      {personalEmailStatus === 'checking' && (
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Checking...
                        </span>
                      )}
                      {personalEmailStatus === 'valid' && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Available
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      name="personalEmail"
                      value={formData.personalEmail}
                      onChange={handleInputChange}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                      placeholder="yourname@gmail.com"
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white font-sans text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.personalEmail || personalEmailStatus === 'conflict'
                          ? 'border-red-500' 
                          : personalEmailStatus === 'valid'
                            ? 'border-emerald-500/60'
                            : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.personalEmail ? (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.personalEmail}</p>
                    ) : personalEmailConflictMsg ? (
                      <p className="text-[11px] text-amber-400 font-mono">{personalEmailConflictMsg}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs text-zinc-300">
                        Mobile Number *
                      </label>
                      {mobileStatus === 'checking' && (
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Checking...
                        </span>
                      )}
                      {mobileStatus === 'valid' && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Available
                        </span>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-500 font-mono text-xs border-r border-white/10 pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`w-full pl-14 pr-4 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                          stepErrors.mobileNumber || mobileStatus === 'conflict'
                            ? 'border-red-500' 
                            : mobileStatus === 'valid'
                              ? 'border-emerald-500/60'
                              : 'border-white/10 focus:border-[#FFCC00]'
                        }`}
                      />
                    </div>
                    {stepErrors.mobileNumber ? (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.mobileNumber}</p>
                    ) : mobileConflictMsg ? (
                      <p className="text-[11px] text-amber-400 font-mono">{mobileConflictMsg}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs text-zinc-300">
                        College / University Email <span className="text-zinc-500 font-normal">(Optional · @citchennai.net)</span>
                      </label>
                      {emailStatus === 'checking' && (
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Checking...
                        </span>
                      )}
                      {emailStatus === 'valid' && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Available
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                      placeholder="username@citchennai.net"
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white font-sans text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.email || emailStatus === 'conflict'
                          ? 'border-red-500' 
                          : emailStatus === 'valid'
                            ? 'border-emerald-500/60'
                            : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.email ? (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.email}</p>
                    ) : emailConflictMsg ? (
                      <p className="text-[11px] text-amber-400 font-mono">{emailConflictMsg}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ACADEMIC DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-step-enter">
                <div className="flex items-baseline justify-between pb-3 border-b border-white/10">
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide leading-tight">
                      Academic Details
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans">
                      Recruitment is strictly open to 1st Year cohort students.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#FFCC00] cursor-pointer"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="bg-zinc-900 text-white">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Academic Year
                    </label>
                    <div className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-zinc-400 font-mono text-sm flex items-center justify-between cursor-not-allowed">
                      <span>1st Year</span>
                      <span className="text-[10px] text-zinc-500">[Locked]</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Section *
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                      placeholder="e.g. A, B, O, P, or NIL"
                      maxLength={5}
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.section 
                          ? 'border-red-500' 
                          : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.section && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.section}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ROLE SELECTION */}
            {currentStep === 4 && (() => {
              const selectedRoleMeta = ROLE_DETAILS[formData.subRole] || {
                code: 'SPEC',
                tagline: 'Team Member',
                description: 'Contribute to team projects and initiatives.',
                whatWeExpect: [],
                whatYoullGet: [],
                responsibilities: [],
                skills: []
              };
              const accentColor = formData.role === 'Tech' ? '#FFCC00' : '#38bdf8';
              const SelectedRoleIcon = selectedRoleMeta.icon || Layers;

              return (
                <div className="animate-step-enter">
                  {/* Two columns using full horizontal width: Left = Division & Role Selector, Right = Role Details Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    
                    {/* LEFT PANEL: Division & Role Picker */}
                    <div className="lg:col-span-4 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
                      {/* Subtle ambient glow */}
                      <div 
                        className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-30"
                        style={{ backgroundColor: accentColor }}
                      />

                      <div className="relative z-10 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          {/* Glass Capsule: Track */}
                          <div 
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                          >
                            <div 
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
                            >
                              <SelectedRoleIcon className="w-3 h-3" />
                            </div>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                              {formData.role === 'Tech' ? 'TECH TRACK' : 'NON-TECH TRACK'}
                            </span>
                          </div>
                        </div>

                        {/* Division Switcher */}
                        <div className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.03] border border-white/10 gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                role: 'Tech',
                                subRole: ROLE_OPTIONS['Tech'][0]
                              }));
                            }}
                            className={`py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer text-center ${
                              formData.role === 'Tech'
                                ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            Tech [{ROLE_OPTIONS['Tech']?.length || 2}]
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                role: 'Non-Tech',
                                subRole: ROLE_OPTIONS['Non-Tech'][0]
                              }));
                            }}
                            className={`py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer text-center ${
                              formData.role === 'Non-Tech'
                                ? 'bg-sky-400 text-black font-bold shadow-sm'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            Non-Tech [{ROLE_OPTIONS['Non-Tech']?.length || 4}]
                          </button>
                        </div>

                        {/* Role Buttons List */}
                        <div className="space-y-1.5 pt-1">
                          {ROLE_OPTIONS[formData.role]?.map((roleName) => {
                            const meta = ROLE_DETAILS[roleName];
                            const IconComp = meta?.icon || Layers;
                            const isSelected = formData.subRole === roleName;
                            const accent = formData.role === 'Tech' ? '#FFCC00' : '#38bdf8';

                            return (
                              <button
                                key={roleName}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, subRole: roleName }))}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                                  isSelected
                                    ? formData.role === 'Tech'
                                      ? 'border-[#FFCC00] bg-[#FFCC00]/10 text-white shadow-[0_0_12px_rgba(255,204,0,0.12)]'
                                      : 'border-sky-400 bg-sky-400/10 text-white shadow-[0_0_12px_rgba(56,189,248,0.12)]'
                                    : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div 
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                                    style={{
                                      backgroundColor: isSelected ? `${accent}25` : 'rgba(255,255,255,0.03)',
                                      borderColor: isSelected ? accent : 'rgba(255,255,255,0.1)',
                                      color: isSelected ? accent : '#a1a1aa'
                                    }}
                                  >
                                    <IconComp className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="font-mono text-xs font-semibold uppercase truncate">
                                    {roleName}
                                  </span>
                                </div>

                                <div 
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    isSelected 
                                      ? formData.role === 'Tech' ? 'bg-[#FFCC00]' : 'bg-sky-400' 
                                      : 'bg-white/10'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: Role Preview Details Card (Matching Inspiration Modal) */}
                    <div className="lg:col-span-8">
                      <div 
                        className="relative h-full rounded-2xl p-5 sm:p-6 border bg-white/[0.02] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                        style={{
                          borderColor: `${accentColor}35`,
                          boxShadow: `0 10px 35px rgba(0,0,0,0.5), 0 0 30px ${accentColor}12`
                        }}
                      >
                        {/* Ambient subtle glow */}
                        <div 
                          className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-[50px] pointer-events-none opacity-20"
                          style={{ backgroundColor: accentColor }}
                        />

                        <div className="relative z-10 space-y-4">
                          {/* Header: Role identity */}
                          <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                                style={{
                                  backgroundColor: `${accentColor}20`,
                                  borderColor: `${accentColor}50`,
                                  color: accentColor
                                }}
                              >
                                <SelectedRoleIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 
                                  className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white font-mono leading-none"
                                  style={{ fontFamily: "'VT323', monospace" }}
                                >
                                  {formData.subRole}
                                </h3>
                                <p className="text-xs text-zinc-300 font-sans mt-0.5">
                                  {selectedRoleMeta.tagline}
                                </p>
                              </div>
                            </div>

                            <span 
                              className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold border hidden sm:inline-block"
                              style={{
                                borderColor: `${accentColor}50`,
                                backgroundColor: `${accentColor}10`,
                                color: accentColor
                              }}
                            >
                              {selectedRoleMeta.division || formData.role} TRACK
                            </span>
                          </div>

                          {/* 2-Column Side-by-Side: What We Expect & What You'll Get */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 pt-1 text-left">
                            {/* Column 1: WHAT WE EXPECT */}
                            <div className="space-y-3">
                              <div className="flex items-baseline justify-between pb-1.5 border-b border-white/10">
                                <h4 
                                  className="text-2xl sm:text-3xl uppercase tracking-wider leading-none select-none"
                                  style={{ 
                                    fontFamily: "'VT323', monospace",
                                    color: accentColor 
                                  }}
                                >
                                  WHAT WE EXPECT
                                </h4>
                              </div>

                              <div className="space-y-2">
                                {(selectedRoleMeta.whatWeExpect || selectedRoleMeta.responsibilities)?.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 group">
                                    <span 
                                      className="font-mono text-base font-bold shrink-0 leading-none mt-0.5 select-none transition-transform duration-200 group-hover:translate-x-0.5"
                                      style={{ color: accentColor }}
                                    >
                                      ›
                                    </span>
                                    <p className="font-sans text-xs text-zinc-300 group-hover:text-white leading-snug transition-colors">
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Column 2: WHAT YOU’LL GET */}
                            <div className="space-y-3">
                              <div className="flex items-baseline justify-between pb-1.5 border-b border-white/10">
                                <h4 
                                  className="text-2xl sm:text-3xl uppercase tracking-wider leading-none text-white select-none"
                                  style={{ fontFamily: "'VT323', monospace" }}
                                >
                                  WHAT YOU’LL GET
                                </h4>
                              </div>

                              <div className="space-y-2">
                                {(selectedRoleMeta.whatYoullGet || selectedRoleMeta.skills)?.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 group">
                                    <span 
                                      className="font-mono text-xs font-bold shrink-0 leading-none mt-1 select-none transition-transform duration-200 group-hover:translate-x-0.5"
                                      style={{ color: accentColor }}
                                    >
                                      →
                                    </span>
                                    <p className="font-sans text-xs text-zinc-300 group-hover:text-white leading-snug transition-colors">
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

            {/* STEP 5: PROFILES */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-step-enter">
                <div className="flex items-baseline justify-between pb-3 border-b border-white/10">
                  <div className="space-y-0.5">
                    <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide leading-tight">
                      Online Profiles
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans">
                      Add your GitHub profile (required) and optional LinkedIn profile.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      GitHub Username <span className="text-[#FFCC00] font-normal">(Required)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        name="githubUsername"
                        value={formData.githubUsername}
                        onChange={handleInputChange}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                        placeholder="e.g. torvalds"
                        className={`w-full pl-8 pr-10 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                          stepErrors.githubUsername 
                            ? 'border-red-500' 
                            : 'border-white/10 focus:border-[#FFCC00]'
                        }`}
                      />
                      {githubLoading && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                        </div>
                      )}
                    </div>
                    {stepErrors.githubUsername && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.githubUsername}
                      </p>
                    )}
                    {githubError && !stepErrors.githubUsername && (
                      <p className="text-[11px] text-amber-400/90 font-mono flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        {githubError}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      LinkedIn Profile Handle <span className="text-zinc-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-xs">
                        in/
                      </span>
                      <input
                        type="text"
                        name="linkedinUsername"
                        value={formData.linkedinUsername}
                        onChange={handleInputChange}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); validateAndProceed(); } }}
                        placeholder="your-profile-slug"
                        className={`w-full pl-10 pr-4 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                          stepErrors.linkedinUsername 
                            ? 'border-red-500' 
                            : 'border-white/10 focus:border-sky-400'
                        }`}
                      />
                    </div>
                    {stepErrors.linkedinUsername && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {stepErrors.linkedinUsername}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive GitHub Profile Selection Result Card */}
                {githubData && (
                  <div className="space-y-2 pt-1 animate-step-enter">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <Github className="w-3.5 h-3.5 text-zinc-300" />
                        Search Result (1 found)
                      </span>
                      <span className={`text-[11px] font-mono flex items-center gap-1 font-semibold ${
                        formData.githubConfirmed ? 'text-[#FFCC00]' : 'text-amber-400/90'
                      }`}>
                        {formData.githubConfirmed ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" /> Profile Confirmed
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" /> Select below to confirm
                          </>
                        )}
                      </span>
                    </div>

                    {/* Interactive Selectable Profile Card */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, githubConfirmed: !prev.githubConfirmed }));
                        setStepErrors((prev) => {
                          const next = { ...prev };
                          delete next.githubUsername;
                          return next;
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setFormData((prev) => ({ ...prev, githubConfirmed: !prev.githubConfirmed }));
                          setStepErrors((prev) => {
                            const next = { ...prev };
                            delete next.githubUsername;
                            return next;
                          });
                        }
                      }}
                      className={`group relative p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none flex items-center justify-between gap-4 ${
                        formData.githubConfirmed
                          ? 'bg-[#FFCC00]/[0.08] border-[#FFCC00] shadow-[0_0_24px_rgba(255,204,0,0.18)] ring-1 ring-[#FFCC00]/50'
                          : 'bg-white/[0.02] border-white/10 hover:border-amber-400/50 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Profile Avatar */}
                        <div className="relative shrink-0">
                          <img 
                            src={githubData.avatar_url} 
                            alt={githubData.login} 
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border object-cover transition-colors ${
                              formData.githubConfirmed ? 'border-[#FFCC00]/60' : 'border-white/10'
                            }`}
                          />
                          {formData.githubConfirmed && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FFCC00] text-black flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Profile Details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-bold text-sm truncate font-mono">
                              {githubData.name || githubData.login}
                            </span>
                            {formData.githubConfirmed ? (
                              <span className="px-2 py-0.5 rounded-md bg-[#FFCC00]/20 border border-[#FFCC00]/40 text-[#FFCC00] font-mono text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Selected
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400 font-mono text-[10px] tracking-wider uppercase group-hover:border-amber-400/40 group-hover:text-amber-300 transition-colors">
                                Click to Select
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mt-0.5">
                            <span className="text-zinc-300">@{githubData.login}</span>
                            <span>•</span>
                            <span>{githubData.public_repos} {githubData.public_repos === 1 ? 'repo' : 'repos'}</span>
                            {githubData.bio && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span className="truncate max-w-[240px] text-zinc-400 hidden sm:inline">{githubData.bio}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action: Selection Radio & External Link */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {/* Radio Check Circle */}
                        <div 
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            formData.githubConfirmed
                              ? 'bg-[#FFCC00] border-[#FFCC00] text-black'
                              : 'border-white/20 bg-white/5 group-hover:border-amber-400/50'
                          }`}
                        >
                          {formData.githubConfirmed ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-amber-400/40 transition-colors" />
                          )}
                        </div>

                        {/* View on GitHub External Link */}
                        <a
                          href={githubData.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Open profile on GitHub (external tab)"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Helper status text below card */}
                    <div className="flex items-center justify-between px-1">
                      {formData.githubConfirmed ? (
                        <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          GitHub profile confirmed and connected to your application.
                        </p>
                      ) : (
                        <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          Click the card above to verify and confirm that this account belongs to you.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: REVIEW & SUBMIT (DUAL-SIDED LANYARD ID BADGE) */}
            {currentStep === 6 && (() => {
              const cardTheme = isTech
                ? {
                    gradient: 'from-[#FFE043] via-[#FFCC00] to-[#E5A800]',
                    accent: '#FFCC00',
                    tag: 'TECH DIVISION',
                    pillBg: 'bg-[#FFCC00]',
                    glow: 'rgba(255, 204, 0, 0.4)'
                  }
                : {
                    gradient: 'from-[#06B6D4] via-[#0284C7] to-[#1E3A8A]',
                    accent: '#38BDF8',
                    tag: 'NON-TECH DIVISION',
                    pillBg: 'bg-sky-400',
                    glow: 'rgba(56, 189, 248, 0.4)'
                  };

              return (
                <div className="space-y-4 sm:space-y-6 animate-step-enter">
                  {/* Top Step Header */}
                  <div className="flex items-baseline justify-between pb-2 border-b border-white/10">
                    <div className="space-y-0.5">
                      <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide leading-tight">
                        Review Application
                      </h2>
                      <p className="text-xs text-zinc-400 font-sans">
                        Verify your official candidate credential pass before final dispatch.
                      </p>
                    </div>
                  </div>

                  {/* GLASSY HANGING FRONT ID BADGE + STRUCTURED QUICK SUMMARY */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
                    
                    {/* ======================================================== */}
                    {/* 1. LEFT: SINGLE GLASSY HANGING FRONT ID BADGE (lg:col-span-5) */}
                    {/* ======================================================== */}
                    <div className="lg:col-span-5 flex flex-col items-center w-full max-w-[340px] sm:max-w-[360px] mx-auto animate-id-card-drop">
                      <div className="w-full flex flex-col items-center animate-badge-sway origin-top transition-transform">
                        {/* Realistic Chrome Swivel Lanyard Clasp */}
                        <LanyardHook />

                      {/* Front Card Body - Glassmorphic / Glassy UI */}
                      <div className="w-full rounded-[32px] overflow-hidden border border-white/25 bg-white/[0.04] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] relative flex flex-col justify-between text-left select-none group transition-all duration-500 hover:shadow-[0_30px_70px_rgba(255,204,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                        
                        {/* Diagonal Glass Specular Sheen Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.02] z-30" />

                        {/* Upper Fluid Color Wave & Diagonal Pill Accent */}
                        <div className={`relative h-56 w-full bg-gradient-to-br ${cardTheme.gradient} overflow-hidden`}>
                          {/* Smooth curved boundary at bottom of fluid section */}
                          <svg viewBox="0 0 360 220" className="absolute -bottom-1 inset-x-0 w-full h-28 pointer-events-none" preserveAspectRatio="none">
                            <path d="M 0 50 Q 180 130 360 30 L 360 220 L 0 220 Z" fill="#0b0f19" fillOpacity="0.85" />
                          </svg>

                          {/* Diagonal Passing Rounded Pill Stripe (Signature Reference Element) */}
                          <div className="absolute -top-6 right-2 w-52 h-14 rounded-full bg-white/90 backdrop-blur-md rotate-[32deg] shadow-lg pointer-events-none" />
                          <div className={`absolute top-20 right-8 w-8 h-8 rounded-full shadow-md pointer-events-none ${isTech ? 'bg-amber-100/90' : 'bg-emerald-400/90'}`} />

                          {/* Circular Lanyard Punch Hole */}
                          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#050508]/80 backdrop-blur-sm border-2 border-white/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)] z-20 flex items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-black/90" />
                          </div>

                          {/* Left-edge stacked triangles (Signature Reference Element) */}
                          <div className={`absolute top-20 left-4 flex flex-col gap-1 text-[8px] font-mono select-none ${isTech ? 'text-zinc-950/70' : 'text-white/80'}`}>
                            <span>▲</span>
                            <span>▲</span>
                            <span>▲</span>
                            <span>▲</span>
                          </div>

                          {/* Top URL / Subtitle */}
                          <div className={`absolute top-3.5 left-6 text-[10px] font-mono tracking-widest uppercase font-bold z-20 ${isTech ? 'text-zinc-950' : 'text-white'}`}>
                            CELESTIUS
                          </div>
                          <div className="absolute top-3.5 right-6 text-[10px] font-mono tracking-widest uppercase font-bold z-20 text-zinc-950">
                            {cardTheme.tag}
                          </div>
                        </div>

                        {/* Circular Avatar Photo (Overlapping the fluid boundary) */}
                        <div className="relative -mt-24 mx-auto z-20 flex flex-col items-center">
                          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_14px_35px_rgba(0,0,0,0.7)] relative group/avatar">
                            {formData.githubConfirmed && githubData?.avatar_url ? (
                              <img src={githubData.avatar_url} alt={formData.Name} className="w-full h-full rounded-full object-cover shadow-inner" />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 flex items-center justify-center shadow-inner">
                                <span className="font-ndot text-4xl sm:text-5xl text-white select-none leading-none" style={{ fontFamily: "'VT323', monospace" }}>
                                  {formData.Name ? formData.Name.trim().charAt(0).toUpperCase() : 'C'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Candidate Name & Role Section */}
                        <div className="px-6 text-center space-y-1.5 pt-2 z-10 relative">
                          <div className="leading-tight">
                            <span className="text-xl sm:text-2xl font-light text-zinc-300 block tracking-wide truncate px-2" title={formData.Name?.trim() || 'Candidate'}>
                              {formData.Name?.trim() || 'Candidate'}
                            </span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight block">
                              APPLICANT
                            </span>
                          </div>

                          {/* Role Title */}
                          <div className="flex items-center justify-center pt-1">
                            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 shadow-sm">
                              <SelectedRoleIcon className="w-3.5 h-3.5" style={{ color: cardTheme.accent }} />
                              <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                                {formData.subRole}
                              </span>
                            </div>
                          </div>

                          {/* Right edge small triangles on dark body */}
                          <div className="absolute top-12 right-4 flex flex-col gap-1 text-[8px] text-white/30 font-mono select-none">
                            <span>▲</span>
                            <span>▲</span>
                            <span>▲</span>
                            <span>▲</span>
                          </div>
                        </div>

                        {/* Bottom Divided Info Columns */}
                        <div className="mx-5 mt-5 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-3 text-left text-xs font-mono z-10">
                          <div>
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">ACADEMICS</span>
                            <p className="text-white font-bold text-xs truncate mt-0.5">{formData.regNumber || 'PENDING'}</p>
                            <p className="text-zinc-300 text-[11px] truncate">{formData.department} · Sec {formData.section || 'NIL'}</p>
                          </div>

                          <div>
                            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">CONTACT</span>
                            <p className="text-white font-bold text-xs truncate mt-0.5">+91 {formData.mobileNumber || '—'}</p>
                            <p className="text-zinc-300 text-[11px] truncate" title={formData.personalEmail || formData.email}>{formData.personalEmail || formData.email || '—'}</p>
                          </div>
                        </div>

                        {/* Integrated Bottom Barcode & Registration ID Strip */}
                        <div className="mx-5 my-4 pt-3 border-t border-white/10 flex flex-col items-center justify-center gap-1 z-10">
                          <IdBadgeBarcode />
                          <span className="text-[9px] font-mono text-zinc-400 block tracking-widest uppercase mt-0.5">
                            Reg-{formData.regNumber || '2026-2030'}
                          </span>
                        </div>

                        {/* Subtle Bottom Card Ambient Glow */}
                        <div 
                          className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-[40px] pointer-events-none opacity-25"
                          style={{ backgroundColor: cardTheme.accent }}
                        />
                      </div>
                    </div>
                  </div>

                    {/* ======================================================== */}
                    {/* 2. RIGHT: STRUCTURED QUICK SUMMARY LIST (lg:col-span-7)  */}
                    {/* ======================================================== */}
                    <div className="lg:col-span-7 space-y-3 w-full">
                      {/* Section Title */}
                      <div 
                        className="flex items-center justify-between pb-1 px-1 animate-detail-card"
                        style={{ animationDelay: '600ms' }}
                      >
                        <div>
                          <h3 className="text-sm sm:text-base font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#FFCC00]" />
                            <span>Quick Application Summary</span>
                          </h3>
                          <p className="text-xs text-zinc-400 font-sans mt-0.5">
                            Verify your details. Click any section's edit button to quickly adjust entries.
                          </p>
                        </div>
                      </div>

                      {/* 1. Personal Details (Step 01) */}
                      <div 
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 animate-detail-card"
                        style={{ animationDelay: '780ms' }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                              01 · Personal Information
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(1)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#FFCC00] hover:text-[#FFE066] hover:underline cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="text-xs font-mono">
                          <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Candidate Full Name</span>
                          <span className="text-white font-medium text-sm block mt-0.5 truncate">
                            {formData.Name || '—'}
                          </span>
                        </div>
                      </div>

                      {/* 2. Contact Details (Step 02) */}
                      <div 
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 animate-detail-card"
                        style={{ animationDelay: '960ms' }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                              <Mail className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                              02 · Contact Details
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(2)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#FFCC00] hover:text-[#FFE066] hover:underline cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Personal Email</span>
                            <span className="text-white font-medium text-xs block mt-0.5 truncate" title={formData.personalEmail}>
                              {formData.personalEmail || '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Mobile Number</span>
                            <span className="text-white font-medium text-xs block mt-0.5">
                              {formData.mobileNumber ? `+91 ${formData.mobileNumber}` : '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">College Email</span>
                            <span className="text-white font-medium text-xs block mt-0.5 truncate" title={formData.email}>
                              {formData.email || 'Not Provided'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Academic Credentials (Step 03) */}
                      <div 
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 animate-detail-card"
                        style={{ animationDelay: '1140ms' }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                              <GraduationCap className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                              03 · Academic Credentials
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(3)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#FFCC00] hover:text-[#FFE066] hover:underline cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Register No.</span>
                            <span className="text-white font-bold text-xs block mt-0.5 truncate">
                              {formData.regNumber || '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Department</span>
                            <span className="text-white font-medium text-xs block mt-0.5 truncate">
                              {formData.department || 'CSE'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Section</span>
                            <span className="text-white font-medium text-xs block mt-0.5">
                              {formData.section ? `Sec ${formData.section}` : 'NIL'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Year of Study</span>
                            <span className="text-white font-medium text-xs block mt-0.5">
                              {formData.year || '1st Year'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 4. Track & Role (Step 04) */}
                      <div 
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 animate-detail-card"
                        style={{ animationDelay: '1320ms' }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                              04 · Track & Role Selection
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(4)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#FFCC00] hover:text-[#FFE066] hover:underline cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Track Division</span>
                            <span className="text-white font-semibold text-xs inline-flex items-center gap-1.5 mt-0.5">
                              <span className={`w-2 h-2 rounded-full ${isTech ? 'bg-amber-400' : 'bg-sky-400'}`} />
                              {formData.role} Division
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Applied Role</span>
                            <span className="text-white font-bold text-xs flex items-center gap-1.5 mt-0.5">
                              <SelectedRoleIcon className="w-3.5 h-3.5" style={{ color: cardTheme.accent }} />
                              {formData.subRole}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 5. Online Presence & Portfolios (Step 05) */}
                      <div 
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-200 animate-detail-card"
                        style={{ animationDelay: '1500ms' }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-zinc-400/10 border border-zinc-400/20 flex items-center justify-center text-zinc-300">
                              <Globe className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-mono text-xs text-zinc-300 uppercase font-semibold tracking-wider">
                              05 · Digital Profiles & Portfolio
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleJumpToStep(5)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#FFCC00] hover:text-[#FFE066] hover:underline cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">GitHub Handle</span>
                            <span className="text-white font-medium text-xs flex items-center gap-1.5 mt-0.5 truncate">
                              <Github className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                              {formData.githubUsername ? (
                                <span className="inline-flex items-center gap-1.5 flex-wrap">
                                  <span>@{formData.githubUsername.replace(/^@/, '')}</span>
                                  {formData.githubConfirmed ? (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#FFCC00]/15 border border-[#FFCC00]/30 text-[#FFCC00] text-[9px] font-mono font-semibold">
                                      <Check className="w-2.5 h-2.5 stroke-[2.5]" /> Verified
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-500/15 border border-zinc-500/30 text-zinc-400 text-[9px] font-mono">
                                      Unconfirmed
                                    </span>
                                  )}
                                </span>
                              ) : '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">LinkedIn Profile</span>
                            <span className="text-white font-medium text-xs flex items-center gap-1.5 mt-0.5 truncate">
                              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                              {formData.linkedinUsername || '—'}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <p 
                    className="text-[11px] text-zinc-500 font-mono text-center pt-2 animate-detail-card"
                    style={{ animationDelay: '1680ms' }}
                  >
                    By submitting, you confirm that you are a 1st-year student at CIT Chennai and the submitted details are accurate.
                  </p>
                </div>
              );
            })()}

            {/* Action Bar Navigation */}
            <div 
              className={`pt-4 border-t border-white/10 flex items-center justify-between gap-4 ${currentStep === 6 ? 'animate-detail-card' : ''}`}
              style={currentStep === 6 ? { animationDelay: '1850ms' } : {}}
            >
              <div className="flex items-center gap-2">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white font-mono text-xs uppercase flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActivePage('recruitment')}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white font-mono text-xs uppercase flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-zinc-400 hover:text-[#FFCC00] font-mono text-xs transition-colors cursor-pointer"
                  title="Need help in recruitment? Reach us"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>Need help? Reach us</span>
                </button>
              </div>

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={validateAndProceed}
                  className="px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,204,0,0.25)] active:scale-95 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,204,0,0.35)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        )}
      </section>

      {/* RECRUITMENT ASSISTANCE / REACH US POPUP MODAL */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowHelpModal(false)}
        >
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-[#0d0f17] border border-white/15 p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,204,0,0.12)] space-y-5 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFCC00]/10 border border-[#FFCC00]/30 text-[#FFCC00] flex items-center justify-center shadow-inner">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
                    Recruitment Support
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Facing issues with the application? Reach out to our leads directly.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contacts List */}
            <div className="space-y-2.5">
              {RECRUITMENT_CONTACTS.map((contact, idx) => {
                const isCopied = copiedPhoneIndex === idx;
                return (
                  <div
                    key={contact.name}
                    className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#FFCC00]/40 transition-all duration-200 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center font-mono font-bold text-sm text-[#FFCC00] shrink-0 shadow-inner">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-white font-semibold text-sm font-mono block truncate">
                          {contact.name}
                        </span>
                        <span className="text-zinc-400 text-xs font-mono block mt-0.5 tracking-wider">
                          {contact.displayPhone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Copy number button */}
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(contact.phone, idx)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                        }`}
                        title="Copy mobile number"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-zinc-400" />
                            <span className="text-[11px] hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>

                      {/* Call direct link */}
                      <a
                        href={`tel:+91${contact.phone.replace(/\D/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-[#FFCC00]/15 hover:bg-[#FFCC00]/25 border border-[#FFCC00]/30 hover:border-[#FFCC00]/60 text-[#FFCC00] text-xs font-mono flex items-center gap-1.5 transition-all"
                        title="Call directly"
                      >
                        <Phone className="w-3 h-3" />
                        <span className="text-[11px] font-semibold">Call</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note / Action footer */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/5">
              <span>Support available during recruitment hours</span>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
