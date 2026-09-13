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
  Shield
} from 'lucide-react';

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
    'Editor'
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
    responsibilities: [
      'Building modern, responsive web interfaces for club portals and hackathons',
      'Implementing smooth animations, micro-interactions, and accessible UI patterns',
      'Collaborating with designers to translate Figma prototypes into performant code',
      'Optimizing client-side rendering speed and cross-browser responsiveness'
    ],
    skills: ['HTML/CSS/JS', 'React / Next.js', 'Tailwind CSS', 'UI Animation', 'Git']
  },
  'Backend Developer': {
    division: 'Tech',
    code: 'BE-02',
    tagline: 'Server Architecture & Systems Infrastructure',
    icon: Server,
    accent: '#FFCC00',
    description: 'Engineers reliable server-side services, database schemas, authentication systems, API endpoints, and cloud deployments.',
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
    responsibilities: [
      'Creating high-impact event teasers, recap videos, and promotional reels',
      'Editing footage with dynamic pacing, motion graphics, and audio mastering',
      'Experimenting with modern editing styles, color grading, and visual storytelling',
      'Collaborating with event and design teams to capture and showcase club milestones'
    ],
    skills: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Motion Design', 'Video Editing']
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

export default function RecruitmentApply({ introCompleted = true, setActivePage }) {
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
    try {
      const saved = getStorageItem(LOCAL_STORAGE_KEY, 'celestius_recruitment_application_draft_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          Name: parsed.Name || '',
          regNumber: parsed.regNumber || '',
          email: parsed.email || '',
          mobileNumber: parsed.mobileNumber || '',
          department: parsed.department || 'CSE',
          year: '1st Year', // Always strictly locked to 1st Year
          section: parsed.section || '',
          role: parsed.role || 'Tech',
          subRole: parsed.subRole || 'Frontend Developer',
          githubUsername: parsed.githubUsername || '',
          linkedinUsername: parsed.linkedinUsername || ''
        };
      }
    } catch (e) {}
    return {
      Name: '',
      regNumber: '',
      email: '',
      mobileNumber: '',
      department: 'CSE',
      year: '1st Year',
      section: '',
      role: 'Tech',
      subRole: 'Frontend Developer',
      githubUsername: '',
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
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle' | 'checking' | 'valid' | 'conflict' | 'error'
  const [emailConflictMsg, setEmailConflictMsg] = useState('');

  // GitHub Live Verification State
  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Auto-save form data silently to localStorage on every input change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {}
  }, [formData]);

  // Auto-save current active step & max reached step to localStorage on every step change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_STEP_KEY, currentStep.toString());
      if (currentStep > maxReachedStep) {
        setMaxReachedStep(currentStep);
        localStorage.setItem(LOCAL_STORAGE_MAX_STEP_KEY, currentStep.toString());
      }
    } catch (e) {}
  }, [currentStep, maxReachedStep]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MAX_STEP_KEY, maxReachedStep.toString());
    } catch (e) {}
  }, [maxReachedStep]);

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
      email: '',
      mobileNumber: '',
      department: 'CSE',
      year: '1st Year',
      section: '',
      role: 'Tech',
      subRole: 'Frontend Developer',
      githubUsername: '',
      linkedinUsername: ''
    });
    setCurrentStep(1);
    setMaxReachedStep(1);
    setStepErrors({});
    setHasRestoredDraft(false);
  };

  // GitHub API Live Fetch (Debounced)
  useEffect(() => {
    const rawUser = formData.githubUsername.trim().replace(/^@/, '');
    if (!rawUser) {
      setGithubData(null);
      setGithubError('');
      setGithubLoading(false);
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
        } else {
          setGithubData(null);
          setGithubError('Unable to verify GitHub profile.');
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

  // Check email and regNumber uniqueness against database
  const checkUniquenessApi = useCallback(async (email, regNumber, mobileNumber) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/api/students/check`
        : 'http://localhost:5000/api/students/check';

      const payload = {};
      if (email) payload.email = email.trim().toLowerCase();
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

  // Live validation on Email input (Smooth debounced real-time check)
  useEffect(() => {
    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setEmailStatus('idle');
      setEmailConflictMsg('');
      return;
    }

    if (!cleanEmail.endsWith('@citchennai.net')) {
      setEmailStatus('error');
      setEmailConflictMsg('Email must end with @citchennai.net');
      setStepErrors((prev) => ({ ...prev, email: 'Only official @citchennai.net accounts are permitted.' }));
      return;
    }

    // Email domain is valid, query DB with 400ms debounce
    setEmailStatus('checking');
    setEmailConflictMsg('');
    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      const result = await checkUniquenessApi(cleanEmail, formData.regNumber);
      setCheckingEmail(false);

      if (result.exists) {
        setEmailStatus('conflict');
        const msg = result.message || 'This email or reg number is already registered.';
        setEmailConflictMsg(msg);
        setStepErrors((prev) => ({ ...prev, email: msg }));
      } else {
        setEmailStatus('valid');
        setEmailConflictMsg('');
        setStepErrors((prev) => ({ ...prev, email: '' }));
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.email, formData.regNumber, checkUniquenessApi]);

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
      setFormData((prev) => ({ ...prev, githubUsername: cleanUser }));
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

  // Step Validation & Navigation (Prevents bypassing duplicated email or regNumber)
  const validateAndProceed = async () => {
    const errors = {};

    // STEP 1: Personal Info (Name, Register Number)
    if (currentStep === 1) {
      if (!formData.Name.trim()) {
        errors.Name = 'Please enter your full name.';
      }
      if (!formData.regNumber.trim()) {
        errors.regNumber = 'Please enter your register number.';
      } else if (formData.regNumber.trim().length < 6) {
        errors.regNumber = 'Please enter a valid register number.';
      } else {
        // Verify register number is not already registered
        const check = await checkUniquenessApi(null, formData.regNumber);
        if (check.exists && check.field === 'Register number') {
          errors.regNumber = check.message;
        }
      }
    }

    // STEP 2: Communication (University Email, Mobile)
    if (currentStep === 2) {
      const cleanEmail = formData.email.trim().toLowerCase();
      if (!cleanEmail) {
        errors.email = 'University email is required.';
      } else if (!cleanEmail.endsWith('@citchennai.net')) {
        errors.email = 'Only official @citchennai.net accounts are permitted.';
      }

      const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
      if (!cleanMobile) {
        errors.mobileNumber = 'Mobile number is required.';
      } else if (cleanMobile.length !== 10) {
        errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
      }

      // Strict real-time check against duplicate email or mobile
      if (!errors.email && !errors.mobileNumber) {
        setCheckingEmail(true);
        const check = await checkUniquenessApi(cleanEmail, formData.regNumber, cleanMobile);
        setCheckingEmail(false);

        if (check.exists) {
          errors.email = check.message;
          setEmailStatus('conflict');
          setEmailConflictMsg(check.message);
          setStepErrors(errors);
          return;
        } else {
          setEmailStatus('valid');
        }
      }
    }

    // STEP 3: Academic Details (Department, Year, Section)
    if (currentStep === 3) {
      if (!formData.department) {
        errors.department = 'Please choose your department.';
      }
      if (!formData.section.trim()) {
        errors.section = 'Please enter your section (e.g. A, B, or NIL).';
      }
    }

    // STEP 4: Role Selection (Category, Specific Role)
    if (currentStep === 4) {
      if (!formData.role) {
        errors.role = 'Please select a role category.';
      }
      if (!formData.subRole) {
        errors.subRole = 'Please select a specific role.';
      }
    }

    // STEP 5: Developer Deck (GitHub & LinkedIn usernames)
    if (currentStep === 5) {
      if (!formData.githubUsername.trim()) {
        errors.githubUsername = 'Please provide your GitHub username.';
      }
      if (!formData.linkedinUsername.trim()) {
        errors.linkedinUsername = 'Please provide your LinkedIn username/handle.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }

    setStepErrors({});
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxReachedStep((prev) => Math.max(prev, nextStep));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber) => {
    // Only allow switching between already completed or reached sections
    if (stepNumber <= maxReachedStep) {
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Final Submission Handler (Double-checks against duplicate before final commit)
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    const cleanSection = formData.section.trim().toUpperCase() || 'NIL';
    const cleanGithubUrl = `https://github.com/${formData.githubUsername.trim()}`;
    const cleanLinkedinUrl = `https://linkedin.com/in/${formData.linkedinUsername.trim()}`;

    // Final pre-flight uniqueness re-check to prevent race conditions or bypassed edits
    const preCheck = await checkUniquenessApi(cleanEmail, formData.regNumber, cleanMobile);
    if (preCheck.exists) {
      setIsSubmitting(false);
      setSubmitResult({
        status: 'conflict',
        message: 'Already Registered',
        details: preCheck.message || 'A student with this Email or Register Number has already registered.'
      });
      return;
    }

    const payload = {
      Name: formData.Name.trim(),
      email: cleanEmail,
      department: formData.department.trim(),
      year: '1st Year',
      section: cleanSection,
      mobileNumber: cleanMobile,
      regNumber: formData.regNumber.trim().toUpperCase(),
      role: formData.role,
      subRole: formData.subRole,
      githubUrl: cleanGithubUrl,
      linkedinUrl: cleanLinkedinUrl
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/register`
        : 'http://localhost:5000/register';

      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch {
        response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (response.status === 201) {
        // Clear local storage draft and step upon confirmed success
        try {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
        } catch (e) {}

        setSubmitResult({
          status: 'success',
          message: data.message || 'Application successfully registered!',
          data: data.data || payload
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

  const selectedRoleMeta = ROLE_DETAILS[formData.subRole] || ROLE_DETAILS['Frontend Developer'];
  const SelectedRoleIcon = selectedRoleMeta.icon;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 text-left space-y-8 select-none">
      
      {/* 1. Header & Minimalist Step Progress */}
      <section className="space-y-5">
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => setActivePage('recruitment')}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Roles</span>
          </button>
          
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="text-[#FFCC00] font-bold">Step 0{currentStep}</span>
            <span>/</span>
            <span>06</span>
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
        {hasRestoredDraft && currentStep > 1 && (
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

      {/* 2. Main Multi-Step Form Container */}
      <section className="relative rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#07070a]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[110px] opacity-15 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: formData.role === 'Tech' ? '#FFCC00' : '#38bdf8' }}
        />
        <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />

        {/* SUBMISSION RESULT VIEWS */}
        {submitResult ? (
          <div className="relative z-10 animate-fade-in space-y-6 text-center py-4">
            {submitResult.status === 'success' ? (
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    Application Submitted
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Your candidate profile has been recorded. Our team leads will review your application soon.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setActivePage('recruitment')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase cursor-pointer transition-all"
                  >
                    Back to Recruitment
                  </button>
                  <button
                    onClick={handleResetDraft}
                    className="px-5 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase cursor-pointer transition-all"
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
          <div className="relative z-10 space-y-8">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                    Personal Details
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    Enter your legal full name and CIT roll number.
                  </p>
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
                      autoFocus
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
                      Register Number *
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
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                    Contact Information
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    Email must end with @citchennai.net. Used for interview alerts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs text-zinc-300">
                        College Email *
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
                      autoFocus
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

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      Mobile Number *
                    </label>
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
                          stepErrors.mobileNumber 
                            ? 'border-red-500' 
                            : 'border-white/10 focus:border-[#FFCC00]'
                        }`}
                      />
                    </div>
                    {stepErrors.mobileNumber && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.mobileNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ACADEMIC DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                    Academic Details
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    Recruitment is strictly open to 1st Year cohort students.
                  </p>
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
                      placeholder="e.g. A, B or NIL"
                      maxLength={5}
                      className={`w-full px-4 py-2.5 bg-white/[0.03] border rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-600 focus:outline-none transition-colors ${
                        stepErrors.section 
                          ? 'border-red-500' 
                          : 'border-white/10 focus:border-[#FFCC00]'
                      }`}
                    />
                    <div className="flex items-center gap-1.5 pt-1">
                      {['A', 'B', 'C', 'NIL'].map((pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, section: pill }));
                            setStepErrors((prev) => ({ ...prev, section: '' }));
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                            formData.section === pill
                              ? 'bg-white/20 text-white border-white/40'
                              : 'bg-white/[0.02] text-zinc-500 border-white/5 hover:text-zinc-300'
                          }`}
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                    {stepErrors.section && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.section}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ROLE SELECTION (Inspired by Recruitment.jsx) */}
            {currentStep === 4 && (() => {
              const selectedRoleMeta = ROLE_DETAILS[formData.subRole] || {
                code: 'SPEC',
                tagline: 'Team Member',
                description: 'Contribute to team projects and initiatives.',
                responsibilities: [],
                skills: []
              };
              const accentColor = formData.role === 'Tech' ? '#FFCC00' : '#38bdf8';
              const SelectedRoleIcon = selectedRoleMeta.icon || Sparkles;

              return (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1 pb-4 border-b border-white/10">
                    <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                      Choose Role
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                      Select your division and preferred role.
                    </p>
                  </div>

                  {/* Division Pill Switcher */}
                  <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          role: 'Tech',
                          subRole: ROLE_OPTIONS['Tech'][0]
                        }));
                      }}
                      className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                        formData.role === 'Tech'
                          ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Technical [{ROLE_OPTIONS['Tech']?.length || 2}]
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
                      className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                        formData.role === 'Non-Tech'
                          ? 'bg-sky-400 text-black font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Non-Technical [{ROLE_OPTIONS['Non-Tech']?.length || 4}]
                    </button>
                  </div>

                  {/* Role Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {ROLE_OPTIONS[formData.role]?.map((roleName) => {
                      const meta = ROLE_DETAILS[roleName];
                      const IconComp = meta?.icon || Sparkles;
                      const isSelected = formData.subRole === roleName;
                      const accent = formData.role === 'Tech' ? '#FFCC00' : '#38bdf8';

                      return (
                        <button
                          key={roleName}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, subRole: roleName }))}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                            isSelected
                              ? formData.role === 'Tech'
                                ? 'border-[#FFCC00] bg-[#FFCC00]/[0.06] shadow-[0_0_20px_rgba(255,204,0,0.15)]'
                                : 'border-sky-400 bg-sky-400/[0.06] shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center border"
                              style={{
                                backgroundColor: isSelected ? `${accent}20` : 'rgba(255,255,255,0.03)',
                                borderColor: isSelected ? accent : 'rgba(255,255,255,0.1)',
                                color: isSelected ? accent : '#a1a1aa'
                              }}
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-white' : 'bg-transparent border border-white/20'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-mono text-sm font-bold text-white uppercase">
                              {roleName}
                            </h4>
                            <p className="text-xs text-zinc-400 font-sans mt-0.5 line-clamp-2">
                              {meta?.tagline}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* ID CARD PREVIEW */}
                  <div className="relative mt-8 pt-2">
                    {/* Lanyard punch hole */}
                    <div className="w-16 h-3 rounded-full bg-black/90 border border-white/20 mx-auto -mb-1.5 shadow-inner relative z-20 flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-white/10" />
                    </div>

                    {/* Card body */}
                    <div 
                      className="relative rounded-3xl p-6 sm:p-8 border bg-gradient-to-b from-[#14151f] via-[#090a10] to-[#040407] backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500"
                      style={{
                        borderColor: `${accentColor}40`,
                        boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${accentColor}15`
                      }}
                    >
                      {/* Subtle holographic gradient shine */}
                      <div 
                        className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                        style={{ background: accentColor }}
                      />
                      <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />

                      {/* Top Header Row: Metallic SIM Chip & Badge ID */}
                      <div className="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          {/* Metallic Chip */}
                          <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-600 border border-amber-300/60 shadow-inner flex flex-col justify-around p-1 shrink-0">
                            <div className="w-full h-px bg-amber-800/40" />
                            <div className="w-full h-px bg-amber-800/40" />
                            <div className="w-full h-px bg-amber-800/40" />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block">
                              ID: CLS-2024-{selectedRoleMeta.code || 'SPEC'}
                            </span>
                            <span className="font-mono text-xs font-bold text-white tracking-wider">
                              CELESTIUS // INDUCTION PASS
                            </span>
                          </div>
                        </div>

                        <div 
                          className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold border flex items-center gap-1.5"
                          style={{
                            borderColor: `${accentColor}60`,
                            backgroundColor: `${accentColor}15`,
                            color: accentColor
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                          {selectedRoleMeta.division || formData.role} DIVISION
                        </div>
                      </div>

                      {/* Role Identity Block */}
                      <div className="relative z-10 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-white/10">
                        <div 
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            borderColor: `${accentColor}50`,
                            color: accentColor
                          }}
                        >
                          <SelectedRoleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                            DESIGNATED SPECIALIZATION
                          </span>
                          <h3 
                            className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white font-mono"
                            style={{ fontFamily: "'VT323', monospace" }}
                          >
                            {formData.subRole}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                            {selectedRoleMeta.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Role Overview */}
                      <div className="relative z-10 py-5 border-b border-white/10 space-y-2">
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block">
                          // ROLE OVERVIEW
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                          {selectedRoleMeta.description}
                        </p>
                      </div>

                      {/* Key Responsibilities */}
                      {selectedRoleMeta.responsibilities && selectedRoleMeta.responsibilities.length > 0 && (
                        <div className="relative z-10 py-5 border-b border-white/10 space-y-3">
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block">
                            // KEY RESPONSIBILITIES
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {selectedRoleMeta.responsibilities.map((resp, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 font-sans leading-relaxed"
                              >
                                <CheckCircle2 
                                  className="w-3.5 h-3.5 mt-0.5 shrink-0" 
                                  style={{ color: accentColor }} 
                                />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expected Skills & Tooling */}
                      {selectedRoleMeta.skills && selectedRoleMeta.skills.length > 0 && (
                        <div className="relative z-10 py-5 border-b border-white/10 space-y-3">
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase block">
                            // EXPECTED SKILLS & TOOLING
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {selectedRoleMeta.skills.map((skill, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 transition-colors"
                              >
                                {renderSkillLogo(skill)}
                                <span>{skill}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Card Footer / Digital Barcode Strip */}
                      <div className="relative z-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-[2px] h-6 px-2 py-1 bg-white/5 rounded border border-white/10">
                            <div className="w-[3px] h-full bg-white/70" />
                            <div className="w-[1px] h-full bg-white/40" />
                            <div className="w-[2px] h-full bg-white/70" />
                            <div className="w-[4px] h-full bg-white/80" />
                            <div className="w-[1px] h-full bg-white/40" />
                            <div className="w-[3px] h-full bg-white/70" />
                            <div className="w-[2px] h-full bg-white/50" />
                            <div className="w-[1px] h-full bg-white/30" />
                            <div className="w-[3px] h-full bg-white/70" />
                            <div className="w-[2px] h-full bg-white/60" />
                            <div className="w-[4px] h-full bg-white/80" />
                            <div className="w-[1px] h-full bg-white/40" />
                          </div>
                          <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                            AUTH: CIT-CLS-2024
                          </span>
                        </div>

                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
                          ACTIVE ROLE SPECIFICATION
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* STEP 5: PROFILES */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                    Online Profiles
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    Enter your GitHub and LinkedIn handles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      GitHub Username *
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
                        autoFocus
                        className={`w-full pl-8 pr-4 py-3 bg-white/[0.03] border rounded-xl text-white font-mono text-sm placeholder-zinc-600 focus:outline-none transition-colors ${
                          stepErrors.githubUsername 
                            ? 'border-red-500' 
                            : 'border-white/10 focus:border-[#FFCC00]'
                        }`}
                      />
                    </div>
                    {stepErrors.githubUsername && (
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.githubUsername}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-zinc-300">
                      LinkedIn Profile Handle *
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
                      <p className="text-[11px] text-red-400 font-mono">{stepErrors.linkedinUsername}</p>
                    )}
                  </div>
                </div>

                {/* Minimal GitHub Profile Preview (if found) */}
                {githubData && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <img 
                        src={githubData.avatar_url} 
                        alt={githubData.login} 
                        className="w-9 h-9 rounded-lg border border-white/10 object-cover"
                      />
                      <div>
                        <span className="text-white font-bold block">{githubData.name || githubData.login}</span>
                        <span className="text-zinc-500 text-[11px]">@{githubData.login} • {githubData.public_repos} repos</span>
                      </div>
                    </div>
                    <a
                      href={githubData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: REVIEW & SUBMIT */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl text-white font-mono uppercase tracking-wide">
                    Review Application
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    Please review your information before final dispatch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  {/* Personal */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-zinc-400 font-bold uppercase">Personal</span>
                      <button onClick={() => setCurrentStep(1)} className="text-[#FFCC00] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="flex justify-between"><span className="text-zinc-500">Name:</span> <span className="text-white">{formData.Name}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Reg No:</span> <span className="text-white">{formData.regNumber}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Dept:</span> <span className="text-white">{formData.department} (Sec {formData.section})</span></div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-zinc-400 font-bold uppercase">Contact</span>
                      <button onClick={() => setCurrentStep(2)} className="text-[#FFCC00] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="flex justify-between"><span className="text-zinc-500">Email:</span> <span className="text-white truncate max-w-[170px]">{formData.email}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Mobile:</span> <span className="text-white">+91 {formData.mobileNumber}</span></div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-zinc-400 font-bold uppercase">Selected Role</span>
                      <button onClick={() => setCurrentStep(4)} className="text-[#FFCC00] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="flex justify-between"><span className="text-zinc-500">Division:</span> <span className="text-white">{formData.role}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Role:</span> <span className="text-[#FFCC00] font-bold">{formData.subRole}</span></div>
                    </div>
                  </div>

                  {/* Profiles */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-zinc-400 font-bold uppercase">Profiles</span>
                      <button onClick={() => setCurrentStep(5)} className="text-[#FFCC00] hover:underline cursor-pointer">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="flex justify-between"><span className="text-zinc-500">GitHub:</span> <span className="text-white">github.com/{formData.githubUsername}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">LinkedIn:</span> <span className="text-white">linkedin.com/in/{formData.linkedinUsername}</span></div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 font-mono">
                  By submitting, you confirm that you are a 1st-year student at CIT Chennai and the submitted details are accurate.
                </p>
              </div>
            )}

            {/* Action Bar Navigation */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
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

    </div>
  );
}
