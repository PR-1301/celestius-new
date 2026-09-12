import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Code2, 
  Server, 
  Palette, 
  CalendarCheck, 
  Mic2, 
  Sparkles,
  X,
  ArrowRight,
  Terminal,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  User,
  Mail,
  Phone,
  Hash,
  Building2,
  GraduationCap,
  Layers,
  Github,
  Linkedin,
  Send,
  RotateCcw
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Role Definitions according to Backend Schema
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

const DEPARTMENTS = [
  'CSE', 'AI&DS', 'AI&ML', 'IT', 'CYBER', 'ECE', 'EEE', 'MECH', 'MCT', 'BME', 'CIVIL', 'ACT', 'VLSI', 'CSBS'
];

const YEARS = ['1st Year'];

const RECRUITMENT_TEAMS = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    division: 'Tech',
    subRole: 'Frontend Developer',
    tagline: 'User Interfaces & Interactive Experiences',
    icon: Code2,
    description: 'Focuses on crafting pixel-perfect, accessible, and high-performance client applications, interactive web tools, and design-to-code fidelity.',
    responsibilities: [
      'Building modern, responsive web interfaces for club portals and hackathons',
      'Implementing smooth animations, micro-interactions, and accessible UI patterns',
      'Collaborating with designers to translate Figma prototypes into performant code',
      'Optimizing client-side rendering speed and cross-browser responsiveness'
    ],
    skills: ['HTML/CSS/JS', 'React / Next.js', 'Tailwind CSS', 'UI Animation', 'Git']
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    division: 'Tech',
    subRole: 'Backend Developer',
    tagline: 'Server Architecture & Systems Infrastructure',
    icon: Server,
    description: 'Engineers reliable server-side services, database schemas, authentication systems, API endpoints, and cloud deployments.',
    responsibilities: [
      'Designing resilient REST and GraphQL APIs for university and club platforms',
      'Architecting relational and NoSQL database schemas with high data integrity',
      'Handling secure authentication, role-based authorization, and rate limiting',
      'Deploying and maintaining server infrastructure, webhooks, and container workflows'
    ],
    skills: ['Node.js / Express', 'MongoDB / Mongoose', 'REST APIs', 'Auth & Security', 'Docker / Cloud']
  },
  {
    id: 'public-speaking',
    name: 'Public speaking',
    division: 'Non-Tech',
    subRole: 'Public speaking',
    tagline: 'Emceeing, Anchoring & Club Representation',
    icon: Mic2,
    description: 'The voice of Celestius on stage, conducting opening ceremonies, introducing dignitaries, moderating panel talks, and representing the club.',
    responsibilities: [
      'Emceeing flagship hackathons, technical symposiums, and workshop openings',
      'Introducing guest speakers, conducting live Q&A sessions, and engaging audiences',
      'Delivering project pitches, club presentations, and induction briefings',
      'Maintaining high audience energy, stage poise, and articulate delivery'
    ],
    skills: ['Stage Presence', 'Articulate Diction', 'Improvisation', 'Audience Engagement', 'Anchoring']
  },
  {
    id: 'events',
    name: 'Events',
    division: 'Non-Tech',
    subRole: 'Events',
    tagline: 'Logistics, Operations & Stage Management',
    icon: CalendarCheck,
    description: 'The operational engine behind flagship hackathons, technical symposiums, workshops, and guest speaker sessions.',
    responsibilities: [
      'Planning venue logistics, stage technical setups, and timeline execution',
      'Liaising with college administration, faculty advisors, and venue management',
      'Managing student registrations, participant hospitality, and on-ground help desks',
      'Coordinating technical judging panels, mentor slots, and prize distribution'
    ],
    skills: ['Event Logistics', 'Time Management', 'Crisis Resolution', 'On-ground Execution', 'Team Leadership']
  },
  {
    id: 'design',
    name: 'Design',
    division: 'Non-Tech',
    subRole: 'Design',
    tagline: 'Visual Identity & Product Experience',
    icon: Palette,
    description: 'Shapes the aesthetic language of Celestius through event banners, brand assets, social media creatives, and UI prototypes.',
    responsibilities: [
      'Designing high-impact event posters, certificates, badges, and social media collaterals',
      'Prototyping website interfaces and digital experiences in Figma',
      'Maintaining visual consistency and branding guidelines across all club assets',
      'Creating vector graphics, typography layouts, and merchandise designs'
    ],
    skills: ['Figma', 'Graphic Design', 'Typography & Color Theory', 'UI/UX Prototyping', 'Brand Identity']
  }
];

export default function Recruitment({ introCompleted = true }) {
  const { showToast } = useToast ? useToast() : { showToast: () => {} };
  const formRef = useRef(null);

  const [activeDivision, setActiveDivision] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);
  const wasIntroPlayingOnMount = useRef(!introCompleted);

  // Form State
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    department: 'CSE',
    year: '1st Year',
    section: '',
    mobileNumber: '',
    regNumber: '',
    role: 'Tech',
    subRole: 'Frontend Developer',
    githubUrl: '',
    linkedinUrl: ''
  });

  // Submission Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { status: 'success' | 'conflict' | 'error', message, details, data }
  const [formError, setFormError] = useState('');

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

  // Dynamic Typewriter Effect for Hero
  const phrases = [
    "RECRUITMENT APPLICATIONS ARE NOW ACTIVE.",
    "APPLY FOR TECH & NON-TECH ROLES.",
    "JOIN THE CELESTIUS INNOVATION CREW.",
    "SUBMIT YOUR APPLICATION BELOW."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
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
  }, [displayText, isDeleting, phraseIndex]);

  // Form Field Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormError('');

    if (name === 'role') {
      // Automatically default subRole to the first available option in that category
      const defaultSubRole = ROLE_OPTIONS[value] ? ROLE_OPTIONS[value][0] : '';
      setFormData((prev) => ({
        ...prev,
        role: value,
        subRole: defaultSubRole
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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Scroll to Form and Pre-select role
  const handleApplyForRole = (team) => {
    setFormData((prev) => ({
      ...prev,
      role: team.division,
      subRole: team.subRole
    }));
    setSelectedRole(null);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Form Submission
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitResult(null);

    // Client-side Validations
    if (!formData.Name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@citchennai.net')) {
      setFormError('Please enter a valid @citchennai.net university email address.');
      return;
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.regNumber.trim()) {
      setFormError('Please enter your register number.');
      return;
    }

    if (!formData.section.trim()) {
      setFormError('Please enter your section (e.g. A).');
      return;
    }

    if (!formData.githubUrl.trim()) {
      setFormError('Please provide your GitHub profile URL.');
      return;
    }

    if (!formData.linkedinUrl.trim()) {
      setFormError('Please provide your LinkedIn profile URL.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      email: cleanEmail,
      mobileNumber: cleanMobile,
      regNumber: formData.regNumber.trim().toUpperCase(),
      section: formData.section.trim().toUpperCase(),
      Name: formData.Name.trim(),
      department: formData.department.trim(),
      githubUrl: formData.githubUrl.trim(),
      linkedinUrl: formData.linkedinUrl.trim()
    };

    try {
      // Backend route is /register on port 5000 (or relative /register)
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/register` 
        : 'http://localhost:5000/register';

      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Fallback to relative URL
        response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const resultData = await response.json();

      if (response.status === 201) {
        setSubmitResult({
          status: 'success',
          message: resultData.message || 'Response successfully received',
          data: resultData.data
        });
      } else if (response.status === 409) {
        setSubmitResult({
          status: 'conflict',
          message: resultData.message || 'Already registered',
          details: resultData.error || 'A student with this Email or Phone number has already registered.'
        });
      } else {
        setSubmitResult({
          status: 'error',
          message: resultData.message || 'Submission failed.',
          details: resultData.error || 'Please check all details and try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitResult({
        status: 'error',
        message: 'Network error or backend unreachable.',
        details: 'Please make sure the Celestius backend server is active on port 5000.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitResult(null);
    setFormError('');
    setFormData({
      Name: '',
      email: '',
      department: 'CSE',
      year: '1st Year',
      section: '',
      mobileNumber: '',
      regNumber: '',
      role: 'Tech',
      subRole: 'Frontend Developer',
      githubUrl: '',
      linkedinUrl: ''
    });
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 text-left space-y-20">
      
      {/* 1. Dynamic Hero Section */}
      <section className="relative space-y-6 pt-2 pb-2">
        <div className="space-y-5 max-w-4xl">
          <div className="flex items-center gap-2.5 font-mono text-xs text-[#FFCC00]">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
            <span className="tracking-widest uppercase font-bold">[ CELESTIUS ADMISSIONS PORTAL 2026 ]</span>
          </div>

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

          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
            Celestius recruitments are now officially live. Explore our Technical and Non-Technical divisions, choose your specialization, and submit your official university registration below.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,204,0,0.35)] active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>APPLY NOW [FORM]</span>
            </button>

            <a
              href="#roles-taxonomy"
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-sm tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>EXPLORE ROLES ({RECRUITMENT_TEAMS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Role Directory & Track Selector */}
      <section id="roles-taxonomy" className="space-y-8 scroll-mt-28">
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
              ALL_TEAMS [5]
            </button>
            <button
              onClick={() => setActiveDivision('technical')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeDivision === 'technical'
                  ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              TECH [2]
            </button>
            <button
              onClick={() => setActiveDivision('nonTechnical')}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeDivision === 'nonTechnical'
                  ? 'bg-sky-400 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              NON-TECH [3]
            </button>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDisplayedRoles().map((role) => {
            const IconComp = role.icon || Sparkles;
            const isTech = role.division === 'Tech';

            return (
              <div 
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ease-out border flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 hover:scale-[1.01] ${
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
                    <Sparkles className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>SPECIFICATION</span>
                  </span>
                  <span 
                    className={`font-bold flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
                      isTech ? 'text-[#FFCC00]' : 'text-sky-400'
                    }`}
                  >
                    <span>VIEW & APPLY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Role Specification Popup Modal */}
      {selectedRole && createPortal(
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedRole(null)}
        >
          {(() => {
            const isRoleTech = selectedRole.division === 'Tech';
            const roleBorder = isRoleTech ? 'border-[#FFCC00]/40' : 'border-sky-400/40';
            const roleShadow = isRoleTech ? 'shadow-[0_20px_70px_rgba(255,204,0,0.18)]' : 'shadow-[0_20px_70px_rgba(56,189,248,0.18)]';
            const roleBg = isRoleTech ? 'bg-[#FFCC00]/10' : 'bg-sky-400/10';
            const roleText = isRoleTech ? 'text-[#FFCC00]' : 'text-sky-400';
            const roleBtn = isRoleTech ? 'bg-[#FFCC00] text-black hover:bg-[#FFE066]' : 'bg-sky-400 text-black hover:bg-sky-300';

            return (
              <div 
                className={`relative w-full max-w-2xl max-h-[90vh] bg-[#0a0a0e]/95 ${roleBorder} rounded-3xl ${roleShadow} flex flex-col overflow-hidden text-left border backdrop-blur-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Header */}
                <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${roleBg} border ${roleBorder} ${roleText} flex items-center justify-center`}>
                      {React.createElement(selectedRole.icon || Sparkles, { className: 'w-6 h-6' })}
                    </div>
                    <div>
                      <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${roleBg} ${roleBorder} ${roleText}`}>
                        {selectedRole.division} TRACK
                      </span>
                      <h3 
                        className="font-ndot text-3xl sm:text-4xl text-white uppercase mt-1 leading-none"
                        style={{ fontFamily: "'VT323', monospace" }}
                      >
                        {selectedRole.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRole(null)}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-zinc-200">
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Terminal className={`w-4 h-4 ${roleText}`} />
                      <span className={`font-mono text-xs font-bold uppercase tracking-wider ${roleText}`}>
                        MISSION SCOPE
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {selectedRole.description}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2.5">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
                      // KEY RESPONSIBILITIES
                    </span>
                    <div className="space-y-2">
                      {selectedRole.responsibilities.map((resp, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${roleText}`} />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2.5">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
                      // SKILLS & COMPETENCIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-black border border-white/15 font-mono text-xs text-zinc-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-black/60 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-zinc-400 hidden sm:inline-block">
                    READY TO APPLY?
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 font-mono text-xs uppercase cursor-pointer"
                    >
                      CLOSE
                    </button>
                    <button
                      onClick={() => handleApplyForRole(selectedRole)}
                      className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl ${roleBtn} font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>APPLY FOR THIS ROLE</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>,
        document.body
      )}

      {/* 4. STUDENT RECRUITMENT REGISTRATION FORM (Integrated with Backend POST /register) */}
      <section 
        ref={formRef} 
        id="apply-form" 
        className="relative rounded-3xl p-6 sm:p-10 border border-[#FFCC00]/30 bg-gradient-to-b from-[#121218]/95 via-[#0c0c10]/95 to-[#060608] shadow-[0_20px_70px_rgba(0,0,0,0.9)] space-y-8 scroll-mt-28"
      >
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#FFCC00]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-sky-400/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00] animate-pulse" />
              <span className="font-mono text-xs text-[#FFCC00] uppercase tracking-widest font-bold">
                APPLICATION_PORTAL // 2026_COHORT
              </span>
            </div>
            <h2 
              className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide leading-none"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              STUDENT REGISTRATION FORM
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              Fill in your official university credentials. All fields are mandatory. Submissions are strictly verified against existing records.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
            <span>ADMISSIONS ACTIVE</span>
          </div>
        </div>

        {/* If Form has been submitted or conflict occurred, close form and show dedicated state */}
        {submitResult ? (
          <div className="relative z-10 animate-fade-in space-y-6">
            {submitResult.status === 'success' ? (
              /* SUCCESS STATE: Form is closed, response is confirmed */
              <div className="p-8 sm:p-12 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <h3 
                    className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide pt-2"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    YOUR RESPONSE HAS BEEN SUCCESSFULLY SUBMITTED
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    Thank you for applying. Your registration has been received and securely stored. Our team will review your application shortly.
                  </p>
                </div>

                {/* Candidate Summary Box */}
                <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/20 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Candidate</span>
                    <span className="text-white font-bold text-sm truncate block">{submitResult.data?.Name || formData.Name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Reg Number</span>
                    <span className="text-white font-bold text-sm block">{submitResult.data?.regNumber || formData.regNumber}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Role Track</span>
                    <span className="text-[#FFCC00] font-bold text-sm block">{submitResult.data?.role || formData.role}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Specialization</span>
                    <span className="text-sky-400 font-bold text-sm block">{submitResult.data?.subRole || formData.subRole}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>REGISTER ANOTHER CANDIDATE</span>
                  </button>
                </div>
              </div>
            ) : submitResult.status === 'conflict' ? (
              /* CONFLICT STATE: User already registered, form is closed */
              <div className="p-10 sm:p-16 rounded-2xl bg-amber-500/[0.07] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-center space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <AlertTriangle className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <h3 
                    className="font-ndot text-4xl sm:text-6xl text-white uppercase tracking-wide pt-2"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    ALREADY REGISTERED
                  </h3>
                </div>
              </div>
            ) : (
              /* GENERAL ERROR STATE */
              <div className="p-8 sm:p-12 rounded-2xl bg-red-500/[0.07] border border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center space-y-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-9 h-9 sm:w-11 sm:h-11" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                    [ SUBMISSION ERROR ]
                  </span>
                  <h3 
                    className="font-ndot text-3xl sm:text-5xl text-white uppercase tracking-wide pt-2"
                    style={{ fontFamily: "'VT323', monospace" }}
                  >
                    UNABLE TO SUBMIT RESPONSE
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {submitResult.details || submitResult.message}
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>BACK TO FORM & EDIT</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Interactive Form (Only shown when not submitted / conflict) */
          <form onSubmit={handleSubmitApplication} className="relative z-10 space-y-6">
            
            {/* Validation Error Banner */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-red-300 font-mono">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            
            {/* Row 1: Full Name & University Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  required
                  placeholder="e.g. Alex Henderson"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                  <Mail className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>University Email (@citchennai.net) *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="username@citchennai.net"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>
            </div>

            {/* Row 2: Register Number & Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  required
                  placeholder="e.g. 210421104001"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm placeholder-zinc-500 uppercase focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>

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
                  required
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>
            </div>

            {/* Row 3: Department, Year, Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                  <Building2 className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>Department *</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all cursor-pointer"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept} className="bg-zinc-900 text-white">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>Study Year *</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all cursor-pointer"
                >
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr} className="bg-zinc-900 text-white">
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

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
                  required
                  placeholder="e.g. A"
                  maxLength={5}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm uppercase placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>
            </div>

            {/* Row 4: CASCADING ROLE DROPDOWNS (Tech / Non-Tech + SubRoles) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/15 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFCC00]" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    ROLE TRACK & SPECIALIZATION DROPDOWNS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline-block">
                  [ DYNAMIC CASCADING SELECTION ]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* DROPDOWN 1: Main Role Category */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs font-bold text-zinc-300 uppercase">
                    1. Role Category *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-[#FFCC00]/40 rounded-xl text-[#FFCC00] font-mono text-sm font-bold focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all cursor-pointer"
                  >
                    <option value="Tech" className="bg-zinc-900 text-white">Tech Division</option>
                    <option value="Non-Tech" className="bg-zinc-900 text-white">Non-Tech Division</option>
                  </select>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Switching this category dynamically updates the specific roles below.
                  </p>
                </div>

                {/* DROPDOWN 2: Specific Sub-Role */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs font-bold text-zinc-300 uppercase">
                    2. Specific Role (Dropdown) *
                  </label>
                  <select
                    name="subRole"
                    value={formData.subRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-sky-400/40 rounded-xl text-sky-400 font-mono text-sm font-bold focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all cursor-pointer"
                  >
                    {ROLE_OPTIONS[formData.role]?.map((opt) => (
                      <option key={opt} value={opt} className="bg-zinc-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Allowed for {formData.role}: {ROLE_OPTIONS[formData.role]?.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Row 5: GitHub & LinkedIn URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                  <Github className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>GitHub Profile URL *</span>
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://github.com/your-username"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-300 uppercase">
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn Profile URL *</span>
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm placeholder-zinc-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-[#FFCC00]" />
                <span>Official University Verification Required.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(255,204,0,0.35)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SUBMITTING APPLICATION...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT REGISTRATION RESPONSE</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </section>

      {/* 5. Preparation Guide */}
      <section className="relative rounded-3xl p-6 sm:p-8 border border-white/15 bg-black/60 space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest font-bold">
            // NEXT STEPS AFTER SUBMISSION
          </span>
          <h3 
            className="font-ndot text-3xl sm:text-4xl text-white uppercase"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            APPLICATION REVIEW TIMELINE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs sm:text-sm text-zinc-300">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs text-[#FFCC00] font-bold">STAGE 01</span>
            <h4 className="text-white font-bold">Application Screening</h4>
            <p className="text-zinc-400 text-xs">Profile verification, GitHub review, and portfolio check.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs text-sky-400 font-bold">STAGE 02</span>
            <h4 className="text-white font-bold">Practical Task / Challenge</h4>
            <p className="text-zinc-400 text-xs">Hands-on micro task specific to your selected role.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs text-emerald-400 font-bold">STAGE 03</span>
            <h4 className="text-white font-bold">Lead Discussion & Onboarding</h4>
            <p className="text-zinc-400 text-xs">Informal interaction with team leads and cohort induction.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
