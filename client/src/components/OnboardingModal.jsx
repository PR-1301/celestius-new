import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Search, 
  Loader2, 
  User, 
  Hash, 
  Phone, 
  GraduationCap, 
  Building2,
  Terminal
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const DEPARTMENTS = [
  { code: 'CSE', name: 'Computer Science & Engineering', full: 'CSE - Computer Science & Engineering' },
  { code: 'AI&ML', name: 'Artificial Intelligence & Machine Learning', full: 'CSE - Artificial Intelligence & Machine Learning' },
  { code: 'CYBER', name: 'Cyber Security', full: 'CSE - Cyber Security' },
  { code: 'AI&DS', name: 'Artificial Intelligence & Data Science', full: 'AIDS - Artificial Intelligence & Data Science' },
  { code: 'IT', name: 'Information Technology', full: 'IT - Information Technology' },
  { code: 'ECE', name: 'Electronics & Communication Engineering', full: 'ECE - Electronics & Communication Engineering' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering', full: 'EEE - Electrical & Electronics Engineering' },
  { code: 'MECH', name: 'Mechanical Engineering', full: 'MECH - Mechanical Engineering' },
  { code: 'MCT', name: 'Mechatronics Engineering', full: 'MCT - Mechatronics Engineering' },
  { code: 'BME', name: 'Biomedical Engineering', full: 'BME - Biomedical Engineering' },
  { code: 'CIVIL', name: 'Civil Engineering', full: 'CIVIL - Civil Engineering' },
  { code: 'ACT', name: 'Advanced Communication Technology', full: 'ACT - Advanced Communication Technology' },
  { code: 'VLSI', name: 'VLSI Design & Technology', full: 'VLSI - Design & Technology' },
];

const YEARS = [
  { id: '1st Year', label: '1ST YEAR', cohort: '2026-2030' },
  { id: '2nd Year', label: '2ND YEAR', cohort: '2025-2029' }
];

const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];

const STEPS = [
  { id: 1, title: 'Personal Details', subtitle: 'Name, Reg No & Mobile' },
  { id: 2, title: 'Department', subtitle: 'Academic Branch' },
  { id: 3, title: 'Cohort & Section', subtitle: 'Study Year & Section' },
];

export default function OnboardingModal({ isOpen, onClose }) {
  const { user, dbUser, updateDbProfile } = useAuthContext();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [deptSearch, setDeptSearch] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill fields if user information already exists in database or Clerk
  useEffect(() => {
    if (user || dbUser) {
      const initialName = dbUser?.fullName || user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || '';
      setFullName(initialName);
      setRegNumber(dbUser?.regNumber || '');
      setDepartment(dbUser?.department || '');
      setYear(dbUser?.year || '');
      setSection(dbUser?.section?.replace('Section ', '') || '');
      setMobileNumber(dbUser?.mobileNumber || '');
    }
  }, [user, dbUser]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setErrorMsg('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Step 1 Validation: Name, Reg Number, Mobile Number
  const handleNextFromStep1 = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanReg = regNumber.trim().toUpperCase();
    if (!cleanReg) {
      setErrorMsg('Please enter your register / roll number.');
      return;
    }
    if (cleanReg.length < 5) {
      setErrorMsg('Please enter a valid register number (minimum 5 characters).');
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setStep(2);
  };

  // Step 2 Validation: Department Selection
  const handleNextFromStep2 = () => {
    setErrorMsg('');
    if (!department) {
      setErrorMsg('Please select your academic department.');
      return;
    }
    setStep(3);
  };

  // Step 3 Final Submission
  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!year) {
      setErrorMsg('Please select your current year of study.');
      return;
    }
    if (!section) {
      setErrorMsg('Please select your section.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedSection = section.startsWith('Section') ? section : `Section ${section}`;
      const cleanMobile = mobileNumber.replace(/\D/g, '');
      const cleanReg = regNumber.trim().toUpperCase();

      const res = await updateDbProfile({
        fullName: fullName.trim(),
        regNumber: cleanReg,
        department,
        year,
        section: formattedSection,
        mobileNumber: cleanMobile,
        isProfileComplete: true,
      });

      if (res && res.success) {
        showToast('Profile completed successfully. Welcome to Celestius!', 'success');
        if (onClose) onClose();
      } else {
        setErrorMsg(res?.error || 'Failed to save profile. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDepts = DEPARTMENTS.filter((d) => {
    const q = deptSearch.trim().toLowerCase();
    if (!q) return true;
    return d.code.toLowerCase().includes(q) || d.name.toLowerCase().includes(q);
  });

  const selectedDeptCode = department ? department.split('-')[0].trim() : '';

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 text-left transition-all border border-[#FFCC00]/50 bg-gradient-to-b from-[#14120b] via-[#0b0c0f] to-[#060608] shadow-[0_0_35px_rgba(255,204,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Icon Badge & Card Headline */}
        <div>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-black/80 border border-[#FFCC00]/40 text-[#FFCC00] flex items-center justify-center shadow-sm">
              <Terminal className="w-5 h-5 text-[#FFCC00]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#FFCC00] bg-[#FFCC00]/10 px-3 py-1 rounded-lg border border-[#FFCC00]/25 uppercase tracking-wider">
              Celestius // Onboarding
            </span>
          </div>

          <div className="mt-4">
            <h2 className="font-ndot text-3xl sm:text-4xl text-[#FFCC00] tracking-wide uppercase leading-none">
              LET US KNOW YOU
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
              Complete your details to set up your Celestius account and unlock events.
            </p>
          </div>
        </div>

        {/* Card Divider */}
        <div className="w-full h-px bg-[#FFCC00]/25 my-6" />

        {/* Dual-Column Body: Left = Vertical Progress Bar, Right = Form */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Left: Vertical Progress Stepper Rail */}
          <div className="w-full md:w-60 shrink-0 bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col gap-6 sm:gap-7 relative">
              {STEPS.map((s, idx) => {
                const isCompleted = step > s.id;
                const isActive = step === s.id;
                const isLast = idx === STEPS.length - 1;

                return (
                  <div key={s.id} className="flex items-start gap-3.5 relative">
                    {/* Vertical Connector Line */}
                    {!isLast && (
                      <div 
                        className={`absolute left-4 top-8 w-0.5 h-7 -ml-[1px] transition-colors duration-300 ${
                          step > s.id ? 'bg-[#FFCC00]' : 'bg-white/15'
                        }`}
                      />
                    )}

                    {/* Circular Node */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-300 z-10 ${
                        isCompleted
                          ? 'bg-[#FFCC00] text-black shadow-[0_0_12px_rgba(255,204,0,0.4)]'
                          : isActive
                          ? 'bg-[#FFCC00] text-black ring-4 ring-[#FFCC00]/25 shadow-[0_0_18px_rgba(255,204,0,0.5)] scale-105'
                          : 'bg-black/80 text-zinc-500 border border-white/15'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{s.id}</span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0 pt-0.5">
                      <div 
                        className={`font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                          isActive 
                            ? 'text-[#FFCC00] font-bold' 
                            : isCompleted 
                            ? 'text-zinc-200' 
                            : 'text-zinc-500'
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="hidden md:block text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                        {s.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Step Forms */}
          <div className="flex-1 w-full min-w-0">
            {/* Inline Error Notice */}
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-2 animate-shake">
                <span className="font-bold text-red-400 shrink-0 font-mono">[ERROR]</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <form onSubmit={handleNextFromStep1} className="space-y-4">
                <div>
                  <h3 className="font-ndot text-2xl text-white uppercase tracking-wide flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FFCC00]" />
                    <span>PERSONAL DETAILS</span>
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Enter your name, register number, and phone.
                  </p>
                </div>

                <div className="space-y-3.5 font-mono">
                  {/* Full Legal Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aakash Raj S"
                      required
                      autoFocus
                      className="w-full bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono placeholder:text-zinc-600 outline-none transition-all"
                    />
                  </div>

                  {/* Register Number */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Register / Roll Number</span>
                      </span>
                      <span className="text-zinc-600 text-[10px]">College ID</span>
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value.toUpperCase().replace(/\s/g, ''))}
                      placeholder="e.g. 210422104001"
                      required
                      className="w-full bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono placeholder:text-zinc-600 outline-none transition-all tracking-wider uppercase"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                      Your unique college registration or roll number.
                    </p>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Mobile Number</span>
                      </span>
                      <span className="text-zinc-600 text-[10px]">10 Digits</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-xs text-zinc-400 font-mono font-semibold">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        required
                        className="w-full bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl pl-14 pr-4 py-2.5 text-xs sm:text-sm font-mono placeholder:text-zinc-600 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#ffe066] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#FFCC00]/15"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Academic Department */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-ndot text-2xl text-white uppercase tracking-wide flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#FFCC00]" />
                    <span>ACADEMIC DEPARTMENT</span>
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Select your enrolled engineering discipline.
                  </p>
                </div>

                {/* Filter Search Input */}
                <div className="relative flex items-center font-mono">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                  <input
                    type="text"
                    value={deptSearch}
                    onChange={(e) => setDeptSearch(e.target.value)}
                    placeholder="Search branch code or title..."
                    className="w-full bg-black/70 border border-white/15 focus:border-[#FFCC00] text-white rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>

                {/* Department Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredDepts.map((d) => {
                    const isSelected = department === d.full;
                    return (
                      <button
                        key={d.code}
                        type="button"
                        onClick={() => {
                          setDepartment(d.full);
                          setErrorMsg('');
                        }}
                        className={`p-3 rounded-xl border text-left font-mono transition-all cursor-pointer flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'border-[#FFCC00] bg-[#FFCC00]/15 text-white shadow-sm'
                            : 'border-white/10 bg-black/50 hover:bg-white/5 text-zinc-300'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-ndot text-lg tracking-wider ${isSelected ? 'text-[#FFCC00]' : 'text-white'}`}>
                              {d.code}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate mt-0.5 font-mono">
                            {d.name}
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#FFCC00] shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Controls */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg('');
                      setStep(1);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextFromStep2}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#ffe066] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#FFCC00]/15"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Cohort & Section */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div>
                  <h3 className="font-ndot text-2xl text-white uppercase tracking-wide flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FFCC00]" />
                    <span>COHORT & SECTION</span>
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Designate your current year and classroom section.
                  </p>
                </div>

                {/* Year Selection */}
                <div className="space-y-1 font-mono">
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400">
                    Year of Study
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {YEARS.map((y) => {
                      const isSelected = year === y.id;
                      return (
                        <button
                          key={y.id}
                          type="button"
                          onClick={() => {
                            setYear(y.id);
                            setErrorMsg('');
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FFCC00] bg-[#FFCC00]/15 text-[#FFCC00]'
                              : 'border-white/10 bg-black/50 hover:bg-white/5 text-zinc-300'
                          }`}
                        >
                          <div className="font-ndot text-lg tracking-wider">{y.label}</div>
                          <div className="text-[9px] text-zinc-500 font-mono mt-0.5">{y.cohort}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Classroom Section Selection */}
                <div className="space-y-1 font-mono">
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400">
                    Classroom Section [Choose 'A' if only one section exists in department]
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {SECTIONS.map((sec) => {
                      const isSelected = section === sec;
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => {
                            setSection(sec);
                            setErrorMsg('');
                          }}
                          className={`py-2 rounded-xl border font-ndot text-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FFCC00] bg-[#FFCC00] text-black shadow-md shadow-[#FFCC00]/20'
                              : 'border-white/10 bg-black/50 hover:bg-white/5 text-zinc-300'
                          }`}
                        >
                          {sec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary Readout */}
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>STUDENT</span>
                    <span className="text-white font-semibold truncate max-w-[200px]">
                      {fullName} ({regNumber.trim().toUpperCase() || '—'})
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>DEPARTMENT</span>
                    <span className="text-white font-semibold truncate max-w-[200px]">
                      {selectedDeptCode || 'None selected'}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>COHORT</span>
                    <span className="text-[#FFCC00] font-semibold">
                      {year || 'Year Pending'} {section ? `· Section ${section}` : ''}
                    </span>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setErrorMsg('');
                      setStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#ffe066] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-[#FFCC00]/15"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Setup</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


