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
  Check,
  ShieldCheck,
  Terminal
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
    'Design'
  ]
};

const ROLE_DETAILS = {
  'Frontend Developer': {
    division: 'Tech',
    tagline: 'User Interfaces, Micro-Interactions & Design Systems',
    icon: Code2,
    accent: '#FFCC00',
    description: 'Build futuristic Nothing OS style responsive web applications, interactive visual components, smooth animations, and high-performance client tooling for Celestius.',
    skills: ['HTML5 & Modern CSS', 'React / Next.js', 'Tailwind CSS', 'Framer / UI Motion', 'Responsive Architecture'],
    tasks: ['Develop symposium portals', 'Refine cross-device layouts', 'Translate Figma tokens to code']
  },
  'Backend Developer': {
    division: 'Tech',
    tagline: 'Server Architecture, REST APIs & Distributed Compute',
    icon: Server,
    accent: '#FFCC00',
    description: 'Design robust backend microservices, resilient MongoDB schemas, real-time socket connections, authentication flows, and scalable API pipelines.',
    skills: ['Node.js & Express', 'MongoDB & Mongoose', 'REST & GraphQL', 'Auth & JWT Security', 'System Optimization'],
    tasks: ['Design registration APIs', 'Build data validation rules', 'Maintain deployment infrastructure']
  },
  'Public speaking': {
    division: 'Non-Tech',
    tagline: 'Keynotes, Emceeing, Anchoring & Stage Representation',
    icon: Mic2,
    accent: '#38bdf8',
    description: 'Represent the university on stage during premier hackathons, tech talks, panel discussions, and symposiums as the authoritative voice of Celestius.',
    skills: ['Stage Command', 'Clear Vocal Articulation', 'Audience Engagement', 'Improvisation', 'Keynote Delivery'],
    tasks: ['Emcee flagship events', 'Introduce guest luminaries', 'Host speaker sessions & fireside chats']
  },
  'Events': {
    division: 'Non-Tech',
    tagline: 'Logistics, Arena Operations & Stage Production',
    icon: CalendarCheck,
    accent: '#a855f7',
    description: 'Power the heartbeat of campus events. Orchestrate hackathon arenas, coordinate hardware setups, manage registrations, and execute stage operations.',
    skills: ['Operations Management', 'Venue Logistics', 'Crisis Resolution', 'Sponsorship Liaison', 'Team Leadership'],
    tasks: ['Coordinate campus venues', 'Manage live participant operations', 'Supervise timeline execution']
  },
  'Design': {
    division: 'Non-Tech',
    tagline: 'Visual Brand Language, UI/UX & Motion Identity',
    icon: Palette,
    accent: '#38bdf8',
    description: 'Direct the visual storytelling and cyberpunk design ethos of Celestius across event banners, digital posters, social creative decks, and Figma UI prototypes.',
    skills: ['Figma Mastery', 'Graphic Design', 'Typography & Layout', 'Color Harmony', 'Brand Identity Systems'],
    tasks: ['Design high-impact posters', 'Prototype digital web experiences', 'Maintain Celestius brand tokens']
  }
};

const STEPS = [
  { id: 1, title: 'IDENTITY', short: 'Personal' },
  { id: 2, title: 'COMMUNICATION', short: 'Contact' },
  { id: 3, title: 'ACADEMICS', short: 'College' },
  { id: 4, title: 'ROLE SELECTION', short: 'Role' },
  { id: 5, title: 'DEVELOPER DECK', short: 'Profiles' },
  { id: 6, title: 'DISPATCH SUMMARY', short: 'Review' }
];

const LOCAL_STORAGE_KEY = 'celestius_recruitment_application_draft_v2';
const LOCAL_STORAGE_STEP_KEY = 'celestius_recruitment_application_step_v2';

export default function RecruitmentApply({ introCompleted = true, setActivePage }) {
  // Step State (1 to 6) persisted in localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
      if (savedStep) {
        const parsedStep = parseInt(savedStep, 10);
        if (parsedStep >= 1 && parsedStep <= 6) return parsedStep;
      }
    } catch (e) {}
    return 1;
  });

  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
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
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
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

  // Auto-save form data & active step silently to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {}
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_STEP_KEY, currentStep.toString());
    } catch (e) {}
  }, [currentStep]);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-28 text-left space-y-8 select-none">
      
      {/* 1. Header Bar: Breadcrumb Navigation & Route Tag */}
      <section className="space-y-4 border-b border-white/10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage('recruitment')}
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>RECRUITMENT</span>
                <span className="text-zinc-600">/</span>
                <span className="text-[#FFCC00] font-bold">APPLY</span>
              </button>
            </div>
            <h1 
              className="font-ndot text-4xl sm:text-5xl text-white tracking-wide uppercase leading-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              CANDIDATE ONBOARDING
            </h1>
          </div>

          {/* Step indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[11px] text-[#FFCC00] font-bold tracking-wider self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
            <span>2026_ADMISSIONS // STEP 0{currentStep}_OF_06</span>
          </div>
        </div>

        {/* 2. Interactive Step Pagination Rail (Allows switching between completed sections) */}
        <div className="pt-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center min-w-max gap-2 py-1">
            {STEPS.map((step) => {
              const isCurrent = currentStep === step.id;
              const isCompleted = step.id < currentStep;
              const isAccessible = step.id <= maxReachedStep;

              return (
                <button
                  key={step.id}
                  onClick={() => handleJumpToStep(step.id)}
                  disabled={!isAccessible}
                  className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-[#FFCC00] text-black font-bold border-[#FFCC00] shadow-[0_0_20px_rgba(255,204,0,0.35)] scale-102'
                      : isCompleted
                        ? 'bg-white/[0.06] text-white border-white/20 hover:border-[#FFCC00]/60 cursor-pointer'
                        : isAccessible
                          ? 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/25 cursor-pointer'
                          : 'bg-white/[0.01] text-zinc-600 border-white/5 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent 
                      ? 'bg-black text-[#FFCC00]' 
                      : isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-white/10 text-zinc-400'
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                  </span>
                  <span className="uppercase whitespace-nowrap">{step.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Multi-Step Form Chassis */}
      <section className="relative rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#0a0a0f]/90 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: selectedRoleMeta.accent }}
        />
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        {/* SUBMISSION RESULT VIEWS */}
        {submitResult ? (
          <div className="relative z-10 animate-fade-in space-y-6">
            {submitResult.status === 'success' ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/40 text-center space-y-6 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <h2 
                    className="font-ndot text-4xl sm:text-5xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    DISPATCH TRANSMISSION CONFIRMED
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    Your candidate profile has been recorded in the Celestius central database. Our team leads will review your GitHub and credentials.
                  </p>
                </div>

                {/* Candidate Overview Card */}
                <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/25 max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Candidate</span>
                    <span className="text-white font-bold truncate block">{submitResult.data?.Name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Reg Number</span>
                    <span className="text-white font-bold block">{submitResult.data?.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Division</span>
                    <span className="text-[#FFCC00] font-bold block">{submitResult.data?.role}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Track</span>
                    <span className="text-sky-400 font-bold truncate block">{submitResult.data?.subRole}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActivePage('recruitment')}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    RETURN TO RECRUITMENT
                  </button>
                  <button
                    onClick={() => {
                      setSubmitResult(null);
                      setCurrentStep(1);
                      setMaxReachedStep(1);
                    }}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    NEW APPLICATION
                  </button>
                </div>
              </div>
            ) : submitResult.status === 'conflict' ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-amber-500/[0.07] border border-amber-500/40 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-9 h-9" />
                </div>
                <h2 
                  className="font-ndot text-4xl sm:text-5xl text-white uppercase"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  APPLICATION ALREADY REGISTERED
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-lg mx-auto">
                  {submitResult.details}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitResult(null);
                      setCurrentStep(2);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    MODIFY CONTACT INFO
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-12 rounded-2xl bg-red-500/[0.07] border border-red-500/40 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-9 h-9" />
                </div>
                <h2 
                  className="font-ndot text-4xl sm:text-5xl text-white uppercase"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  DISPATCH FAILED
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-lg mx-auto">
                  {submitResult.details || submitResult.message}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    BACK TO SUMMARY & RETRY
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ACTIVE STEP CONTENT */
          <div className="relative z-10 space-y-8">
            
            {/* STEP 1: IDENTITY & PERSONAL INFORMATION */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 01 // IDENTITY_PARAMETERS
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    ENTER PERSONAL CREDENTIALS
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Please provide your legal full name and official CIT register/roll number.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <User className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Henderson"
                      autoFocus
                      className={`w-full px-4 py-3.5 bg-black/60 border rounded-xl text-white font-sans text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                        stepErrors.Name 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.Name && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.Name}</span>
                      </p>
                    )}
                  </div>

                  {/* Register Number */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <Hash className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>Register / Roll Number *</span>
                    </label>
                    <input
                      type="text"
                      name="regNumber"
                      value={formData.regNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 210424104001"
                      className={`w-full px-4 py-3.5 bg-black/60 border rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-500 focus:outline-none transition-all ${
                        stepErrors.regNumber 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.regNumber && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.regNumber}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: COMMUNICATION & VERIFICATION */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 02 // COMMUNICATION_CHANNELS
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    CONTACT & VALIDATION
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Email must end with @citchennai.net. Validation checks in real-time against duplicate applicants.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* University Email */}
                  <div className="space-y-2">
                    <label className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#FFCC00]" />
                        <span>University Email *</span>
                      </span>
                      {emailStatus === 'checking' && (
                        <span className="text-[10px] text-[#FFCC00] font-mono flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> CHECKING...
                        </span>
                      )}
                      {emailStatus === 'valid' && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-3 h-3" /> VERIFIED_AVAILABLE
                        </span>
                      )}
                      {emailStatus === 'conflict' && (
                        <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> ALREADY_REGISTERED
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="username@citchennai.net"
                      autoFocus
                      className={`w-full px-4 py-3.5 bg-black/60 border rounded-xl text-white font-sans text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                        emailStatus === 'conflict' || stepErrors.email
                          ? 'border-amber-500 focus:ring-1 focus:ring-amber-500' 
                          : emailStatus === 'valid'
                            ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                            : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.email ? (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.email}</span>
                      </p>
                    ) : emailConflictMsg ? (
                      <p className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{emailConflictMsg}</span>
                      </p>
                    ) : (
                      <p className="font-mono text-[10px] text-zinc-500">
                        Must end with @citchennai.net. Used for interview call dispatches.
                      </p>
                    )}
                  </div>

                  {/* 10-Digit Mobile Number */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <Phone className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>10-Digit Mobile Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength={10}
                      className={`w-full px-4 py-3.5 bg-black/60 border rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                        stepErrors.mobileNumber 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.mobileNumber && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.mobileNumber}</span>
                      </p>
                    )}
                    <p className="font-mono text-[10px] text-zinc-500">
                      Primary mobile line for WhatsApp updates and cohort discord invites.
                    </p>
                  </div>
                </div>

                {checkingEmail && (
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2 text-xs font-mono text-[#FFCC00]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying registry status in real-time...</span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: ACADEMIC DETAILS (Department, Year Locked, Section) */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 03 // ACADEMIC_CLASSIFICATION
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    DEPARTMENT & SECTION
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Recruitment is strictly locked to 1st Year cohort students. Enter NIL for section if only one section exists.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Department */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <Building2 className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>Department *</span>
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-zinc-900 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all cursor-pointer"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept} className="bg-zinc-900 text-white">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Study Year - Strictly Locked to 1st Year */}
                  <div className="space-y-2">
                    <label className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#FFCC00]" />
                        <span>Academic Year</span>
                      </span>
                      <span className="text-[10px] text-[#FFCC00] font-mono">[LOCKED]</span>
                    </label>
                    <div className="w-full px-4 py-3.5 bg-black/80 border border-white/10 rounded-xl text-zinc-300 font-mono text-sm flex items-center justify-between cursor-not-allowed">
                      <span>1st Year</span>
                      <ShieldCheck className="w-4 h-4 text-[#FFCC00]" />
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500">
                      Admissions exclusively open for 1st Year students.
                    </p>
                  </div>

                  {/* Section */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <Layers className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>Section *</span>
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      placeholder="e.g. A, B or NIL"
                      maxLength={5}
                      className={`w-full px-4 py-3.5 bg-black/60 border rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-500 focus:outline-none transition-all ${
                        stepErrors.section 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                      }`}
                    />
                    {stepErrors.section && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.section}</span>
                      </p>
                    )}
                    <p className="text-[10px] font-mono text-zinc-500">
                      Enter NIL if only one section exists in your branch.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ROLE CATEGORY & SPECIFIC ROLE WITH PREVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 04 // ROLE_TAXONOMY_&_PREVIEW
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    SELECT TRACK & SPECIALIZATION
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Choose your primary category and sub-role. An interactive preview of the role appears below.
                  </p>
                </div>

                {/* Division & Sub-Role Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs font-bold text-zinc-300 uppercase">
                      1. Role Division *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-zinc-900 border border-[#FFCC00]/50 rounded-xl text-[#FFCC00] font-mono text-sm font-bold focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all cursor-pointer"
                    >
                      <option value="Tech">Technical Division</option>
                      <option value="Non-Tech">Non-Technical Division</option>
                    </select>
                  </div>

                  {/* Specific Role */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs font-bold text-zinc-300 uppercase">
                      2. Specific Role *
                    </label>
                    <select
                      name="subRole"
                      value={formData.subRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-zinc-900 border border-sky-400/50 rounded-xl text-sky-400 font-mono text-sm font-bold focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all cursor-pointer"
                    >
                      {ROLE_OPTIONS[formData.role]?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LIVE ROLE SPECIFICATION PREVIEW CARD */}
                <div className="p-6 rounded-2xl bg-black/60 border border-white/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{ 
                          backgroundColor: `${selectedRoleMeta.accent}15`,
                          borderColor: `${selectedRoleMeta.accent}40`,
                          color: selectedRoleMeta.accent 
                        }}
                      >
                        <SelectedRoleIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span 
                          className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                          style={{ 
                            backgroundColor: `${selectedRoleMeta.accent}15`,
                            borderColor: `${selectedRoleMeta.accent}30`,
                            color: selectedRoleMeta.accent 
                          }}
                        >
                          {formData.role} // SPECIFICATION
                        </span>
                        <h3 
                          className="font-ndot text-2xl text-white uppercase mt-0.5 leading-none"
                          style={{ fontFamily: "'VT323', monospace" }}
                        >
                          {formData.subRole}
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline-block">
                      [LIVE PREVIEW]
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {selectedRoleMeta.description}
                  </p>

                  {/* Skills Looked For */}
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      // EXPECTED SKILLS & TOOLING
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRoleMeta.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono text-[11px] text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: DEVELOPER DECK & GITHUB USERNAME API LOOKUP */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 05 // DEVELOPER_CHANNELS
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    GITHUB & LINKEDIN PROFILES
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Enter your GitHub and LinkedIn usernames. We automatically verify and display your GitHub profile metadata.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GitHub User ID */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                      <Github className="w-3.5 h-3.5 text-[#FFCC00]" />
                      <span>GitHub Username *</span>
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
                        placeholder="e.g. torvalds"
                        className={`w-full pl-8 pr-4 py-3.5 bg-black/60 border rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          stepErrors.githubUsername 
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]'
                        }`}
                      />
                    </div>
                    {stepErrors.githubUsername && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.githubUsername}</span>
                      </p>
                    )}
                  </div>

                  {/* LinkedIn User ID */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-sky-400 uppercase">
                      <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                      <span>LinkedIn Profile Handle / ID *</span>
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
                        placeholder="your-profile-slug"
                        className={`w-full pl-10 pr-4 py-3.5 bg-black/60 border rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          stepErrors.linkedinUsername 
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400'
                        }`}
                      />
                    </div>
                    {stepErrors.linkedinUsername && (
                      <p className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{stepErrors.linkedinUsername}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* GITHUB LIVE VERIFIED CARD VIA GITHUB API */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Terminal className="w-4 h-4 text-[#FFCC00]" />
                      <span>GITHUB API VERIFICATION STATUS</span>
                    </div>
                    {githubLoading && (
                      <span className="font-mono text-xs text-[#FFCC00] flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 animate-spin" /> Querying API...
                      </span>
                    )}
                  </div>

                  {githubData ? (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={githubData.avatar_url} 
                          alt={githubData.login} 
                          className="w-12 h-12 rounded-xl border border-white/20 object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-white text-base">
                              {githubData.name || githubData.login}
                            </span>
                            <span className="font-mono text-xs text-[#FFCC00]">
                              (@{githubData.login})
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 font-sans line-clamp-1">
                            {githubData.bio || 'Active GitHub Developer Profile'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs text-zinc-400 self-end sm:self-auto">
                        <div>
                          <span className="text-[10px] block text-zinc-500 uppercase">Repos</span>
                          <span className="text-white font-bold">{githubData.public_repos}</span>
                        </div>
                        <div>
                          <span className="text-[10px] block text-zinc-500 uppercase">Followers</span>
                          <span className="text-white font-bold">{githubData.followers}</span>
                        </div>
                        <a
                          href={githubData.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ) : githubError ? (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{githubError}</span>
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-zinc-500">
                      Type your GitHub username above to live preview your account info.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 6: DISPATCH SUMMARY & FINAL CONFIRMATION */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-[#FFCC00] tracking-wider uppercase">
                    STEP 06 // DISPATCH_SUMMARY_REVIEW
                  </span>
                  <h2 
                    className="font-ndot text-3xl sm:text-4xl text-white uppercase"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    REVIEW YOUR APPLICATION
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Verify all parameters before official dispatch. You can click any previous step button to modify credentials.
                  </p>
                </div>

                {/* Summary Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Identity & Academics */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-bold text-[#FFCC00] uppercase">// CANDIDATE PROFILE</span>
                      <button 
                        onClick={() => setCurrentStep(1)} 
                        className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                      >
                        [EDIT]
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Full Name:</span>
                        <span className="text-white font-bold">{formData.Name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Register Number:</span>
                        <span className="text-white font-bold">{formData.regNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Department:</span>
                        <span className="text-white font-bold">{formData.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Year / Section:</span>
                        <span className="text-white font-bold">1st Year // Sec {formData.section}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Contact Details */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-bold text-[#FFCC00] uppercase">// CONTACT CHANNELS</span>
                      <button 
                        onClick={() => setCurrentStep(2)} 
                        className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                      >
                        [EDIT]
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">University Email:</span>
                        <span className="text-white font-bold truncate max-w-[200px]">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Mobile Number:</span>
                        <span className="text-white font-bold">{formData.mobileNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Email Status:</span>
                        <span className="text-emerald-400 font-bold">@citchennai.net [VERIFIED]</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Selected Track */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-bold text-[#FFCC00] uppercase">// SELECTED TRACK</span>
                      <button 
                        onClick={() => setCurrentStep(4)} 
                        className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                      >
                        [EDIT]
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Division:</span>
                        <span className="text-white font-bold">{formData.role} Division</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Specialization:</span>
                        <span className="text-sky-400 font-bold">{formData.subRole}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Web Presence */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-bold text-[#FFCC00] uppercase">// DEVELOPER PROFILES</span>
                      <button 
                        onClick={() => setCurrentStep(5)} 
                        className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                      >
                        [EDIT]
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">GitHub:</span>
                        <span className="text-white font-bold">github.com/{formData.githubUsername}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">LinkedIn:</span>
                        <span className="text-white font-bold">linkedin.com/in/{formData.linkedinUsername}</span>
                      </div>
                      {githubData && (
                        <div className="flex justify-between text-emerald-400">
                          <span>API Profile:</span>
                          <span>{githubData.name || githubData.login} [VERIFIED]</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Action Bar Navigation Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>PREVIOUS</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActivePage('recruitment')}
                  className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>CANCEL</span>
                </button>
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={validateAndProceed}
                  className="px-7 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,204,0,0.3)] active:scale-95 cursor-pointer"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_35px_rgba(255,204,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING APPLICATION...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>APPLY NOW // DISPATCH CREDENTIALS</span>
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
