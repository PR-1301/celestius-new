import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Hash, 
  Phone, 
  Building2, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Globe,
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  UserCog,
  Shield,
  Save,
  RotateCcw,
  AlertCircle,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Check,
  Send
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const DEPARTMENTS = [
  'CSE - Computer Science & Engineering',
  'CSE - Artificial Intelligence & Machine Learning',
  'CSE - Cyber Security',
  'AIDS - Artificial Intelligence & Data Science',
  'IT - Information Technology',
  'ECE - Electronics & Communication Engineering',
  'EEE - Electrical & Electronics Engineering',
  'MECH - Mechanical Engineering',
  'MCT - Mechatronics Engineering',
  'BME - Biomedical Engineering',
  'CIVIL - Civil Engineering',
  'ACT - Advanced Communication Technology',
  'VLSI - Design & Technology',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function Profile({ setActivePage }) {
  const { 
    isSignedIn, 
    user, 
    dbUser, 
    updateDbProfile, 
    signOut, 
    requestPasswordResetOtp, 
    verifyOtpAndSetPassword 
  } = useAuthContext();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'socials', 'security'

  // Form states
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password Management States (Create for Google / Reset for Email via OTP)
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);
  const [passwordStep, setPasswordStep] = useState('request'); // 'request' | 'verify'
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Protect route
  useEffect(() => {
    if (!isSignedIn) {
      setActivePage('login');
    }
  }, [isSignedIn, setActivePage]);

  // Sync form with current user data
  useEffect(() => {
    resetForm();
  }, [dbUser, user]);

  const resetForm = () => {
    if (dbUser || user) {
      const current = dbUser || user || {};
      setFullName(current.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || '');
      setDepartment(current.department || '');
      setYear(current.year || '');
      setSection(current.section?.replace('Section ', '') || '');
      setMobileNumber(current.mobileNumber || '');
      setRegNumber(current.regNumber || '');
      setGithubUrl(current.githubUrl || '');
      setLinkedinUrl(current.linkedinUrl || '');
      setPortfolioUrl(current.portfolioUrl || '');
      setErrorMsg('');
    }
  };

  if (!isSignedIn) return null;

  const currentDisplayUser = dbUser || user;
  const isPasswordConfigured = Boolean(user?.passwordEnabled);

  const handleSave = async (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full legal name is required.');
      setActiveTab('personal');
      return;
    }
    if (!regNumber.trim() || regNumber.trim().length < 5) {
      setErrorMsg('Please enter a valid college register / roll number.');
      setActiveTab('personal');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      setActiveTab('personal');
      return;
    }
    if (!department) {
      setErrorMsg('Please select your academic department.');
      setActiveTab('personal');
      return;
    }
    if (!year) {
      setErrorMsg('Please select your year of study.');
      setActiveTab('personal');
      return;
    }
    if (!section) {
      setErrorMsg('Please select your section.');
      setActiveTab('personal');
      return;
    }

    setIsSaving(true);
    try {
      const formattedSection = section.startsWith('Section') ? section : `Section ${section}`;
      const res = await updateDbProfile({
        fullName: fullName.trim(),
        regNumber: regNumber.trim().toUpperCase(),
        department,
        year,
        section: formattedSection,
        mobileNumber: cleanMobile,
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        portfolioUrl: portfolioUrl.trim(),
        isProfileComplete: true,
      });

      if (res && res.success) {
        showToast('Profile credentials updated successfully.', 'success');
      } else {
        setErrorMsg(res?.error || 'Failed to update credentials. Please retry.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while saving profile.');
    } finally {
      setIsSaving(false);
    }
  };

  // Password OTP Dispatch
  const handleSendOtp = async () => {
    setPasswordError('');
    setIsOtpLoading(true);
    try {
      const email = currentDisplayUser?.email;
      const res = await requestPasswordResetOtp(email);
      if (res?.success) {
        setPasswordStep('verify');
      } else {
        setPasswordError(res?.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setPasswordError(err.message || 'Error requesting verification code.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  // Password OTP Verification & Set
  const handleVerifyAndSetPassword = async (e) => {
    e?.preventDefault();
    setPasswordError('');

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setPasswordError('Please enter the 6-digit verification code sent to your email.');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsOtpLoading(true);
    try {
      const res = await verifyOtpAndSetPassword({
        code: otpCode.trim(),
        newPassword,
      });

      if (res?.success) {
        setPasswordSuccess(true);
        setTimeout(() => {
          setShowPasswordPanel(false);
          setPasswordStep('request');
          setOtpCode('');
          setNewPassword('');
          setConfirmPassword('');
          setPasswordSuccess(false);
        }, 1800);
      } else {
        setPasswordError(res?.error || 'Verification code invalid or expired. Please retry.');
      }
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details', code: '01', icon: User },
    { id: 'socials', label: 'Socials & Portfolio', code: '02', icon: Globe },
    { id: 'security', label: 'Account & Security', code: '03', icon: Shield },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumbs */}
      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-4">
        <button
          onClick={() => setActivePage('dashboard')}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-[#FFCC00] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[DASHBOARD]</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-200 uppercase tracking-wider">SETTINGS // PROFILE</span>
      </div>

      {/* Main Pixel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shrink-0 mt-0.5 shadow-sm">
            <UserCog className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
              <span>CIT // MEMBER_CREDENTIALS</span>
            </div>
            <h1 className="font-ndot text-3xl sm:text-5xl text-white tracking-wide uppercase">
              MEMBER PROFILE &amp; <span className="text-[#FFCC00]">SETTINGS</span>
            </h1>
            <p className="font-mono text-xs text-zinc-400">
              Manage your student identity, college registration, department details, and portfolio presence.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('dashboard')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-black/70 hover:bg-black border border-white/15 hover:border-[#FFCC00]/40 text-zinc-200 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer shadow-sm"
        >
          [RETURN_TO_DASHBOARD]
        </button>
      </div>

      {/* Horizontal Pixel Capsule Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setErrorMsg('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#FFCC00] text-black font-bold shadow-md shadow-[#FFCC00]/15'
                  : 'bg-black/60 text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              <span className={`text-[10px] ${isActive ? 'text-black/70' : 'text-zinc-600'}`}>
                {tab.code}
              </span>
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Inline Form Error Notice */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs flex items-center gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tab 1: Personal & Academic Details */}
      {activeTab === 'personal' && (
        <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />
          
          {/* Card Sub-Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-ndot text-xl text-white tracking-wide uppercase">
                  Student Personal Identity
                </h3>
                <p className="font-mono text-xs text-zinc-400 mt-0.5">Your official details as registered under Chennai Institute of Technology.</p>
              </div>
            </div>

            <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED_STUDENT</span>
            </div>
          </div>

          {/* Form Grid (2 Columns) */}
          <form onSubmit={handleSave} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Legal Name */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  FULL LEGAL NAME *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Aakash Raj S"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Registered University Email (Locked) */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  REGISTERED EMAIL ADDRESS
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={currentDisplayUser?.email || ''}
                    disabled
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/30 border border-white/5 text-zinc-400 text-sm cursor-not-allowed select-all"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Linked to your official Celestius institutional SSO credentials.
                </p>
              </div>

              {/* College Register / Roll Number */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  COLLEGE REGISTER / ROLL NUMBER *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value.toUpperCase().replace(/\s/g, ''))}
                    placeholder="210422104001"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all uppercase tracking-wider font-mono"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Anna University or CIT Roll Number for event verification.
                </p>
              </div>

              {/* Personal Mobile Phone */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  PERSONAL MOBILE PHONE *
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-white/15 bg-zinc-950/80 text-zinc-400 text-xs font-mono select-none">
                    +91
                  </span>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-r-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Department */}
              <div className="md:col-span-2">
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  ACADEMIC DEPARTMENT *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm outline-none transition-all appearance-none cursor-pointer font-mono"
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">
                      Select your department...
                    </option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept} className="bg-zinc-900 text-white">
                        {dept}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Year of Study */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  YEAR OF STUDY *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm outline-none transition-all appearance-none cursor-pointer font-mono"
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">
                      Select year...
                    </option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-zinc-900 text-white">
                        {y}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Section */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  SECTION / BATCH *
                </label>
                <div className="relative">
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm outline-none transition-all appearance-none cursor-pointer font-mono"
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">
                      Select section...
                    </option>
                    {SECTIONS.map((sec) => (
                      <option key={sec} value={sec} className="bg-zinc-900 text-white">
                        Section {sec}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

            </div>

            {/* Form Action Controls */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSaving}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-zinc-400 hover:text-white font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>[DISCARD_CHANGES]</span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>SAVING_CHANGES...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>[SAVE_CHANGES]</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      )}

      {/* Tab 2: Socials & Portfolio */}
      {activeTab === 'socials' && (
        <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-ndot text-xl text-white tracking-wide uppercase">Developer Presence &amp; Portfolios</h3>
                <p className="font-mono text-xs text-zinc-400 mt-0.5">Showcase your GitHub repositories and professional profiles to club leads.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="relative z-10 space-y-6">
            <div className="space-y-5">
              
              {/* GitHub */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  GITHUB PROFILE URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourhandle"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  LINKEDIN PROFILE URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourhandle"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Portfolio Website */}
              <div>
                <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  PERSONAL PORTFOLIO / WEBSITE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/60 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm placeholder:text-zinc-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/15 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>SAVING_CHANGES...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>[SAVE_CHANGES]</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      )}

      {/* Tab 3: Account & Security */}
      {activeTab === 'security' && (
        <div className="rounded-3xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 nothing-dot-grid opacity-15 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-ndot text-xl text-white tracking-wide uppercase">Account Security &amp; Credentials</h3>
                <p className="font-mono text-xs text-zinc-400 mt-0.5">Overview of your authenticated institutional session and account safety.</p>
              </div>
            </div>
          </div>

          {/* Security Telemetry Tiles */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">// AUTH_PROVIDER</span>
              <p className="text-white font-medium text-sm">Google Workspace SSO</p>
              <p className="text-zinc-400 text-[11px]">Enforced via Chennai Institute of Technology</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">// DOMAIN_ALLOWLIST</span>
              <p className="text-emerald-400 font-medium text-sm">@citchennai.net</p>
              <p className="text-zinc-400 text-[11px]">Personal email sign-ins strictly blocked</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">// SESSION_INTEGRITY</span>
              <p className="text-white font-medium text-sm">Active &amp; Encrypted</p>
              <p className="text-zinc-400 text-[11px]">TLS 1.3 Transport Security</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">// RECORD_STATUS</span>
              <p className="text-white font-medium text-sm">Synchronized with Database</p>
              <p className="text-zinc-400 text-[11px]">Member ID: {user?.id || 'Active'}</p>
            </div>
          </div>

          {/* Password Management Card (Create for Google / Reset for Email via OTP) */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-black/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shrink-0 mt-0.5 shadow-sm">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                      {isPasswordConfigured ? 'Manual Sign-in Password' : 'Create Manual Sign-in Password'}
                    </h4>
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      isPasswordConfigured 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}>
                      {isPasswordConfigured ? 'ACTIVE' : 'NOT_SET'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    {isPasswordConfigured
                      ? 'You currently have a password configured for direct university email login. You can reset it anytime via email OTP verification.'
                      : 'You signed up with Google Workspace. Create a password to enable manual email/password sign-in alongside Google SSO.'}
                  </p>
                </div>
              </div>

              {!showPasswordPanel && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPanel(true);
                    setPasswordStep('request');
                    setPasswordError('');
                  }}
                  className="shrink-0 px-4 py-2 rounded-xl bg-black/70 hover:bg-black text-[#FFCC00] font-mono text-xs font-bold border border-[#FFCC00]/30 hover:border-[#FFCC00] transition-all cursor-pointer shadow-sm"
                >
                  {isPasswordConfigured ? '[RESET_PASSWORD]' : '[CREATE_PASSWORD]'}
                </button>
              )}
            </div>

            {/* Expandable Password OTP Flow */}
            {showPasswordPanel && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-fade-in font-mono text-xs">
                
                {passwordError && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Password successfully updated! You can now use it to sign in.</span>
                  </div>
                )}

                {/* Step 1: Request OTP Dispatch */}
                {passwordStep === 'request' && !passwordSuccess && (
                  <div className="p-4 rounded-2xl bg-black/80 border border-white/10 space-y-3">
                    <p className="text-zinc-300 font-sans">
                      To protect your university credentials, a 6-digit confirmation code will be dispatched to your registered address:
                    </p>
                    <div className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/10 font-mono text-xs text-[#FFCC00]">
                      {currentDisplayUser?.email}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isOtpLoading}
                        className="px-5 py-2 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/15 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isOtpLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>SENDING_CODE...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>[DISPATCH_OTP_CODE]</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordPanel(false);
                          setPasswordError('');
                        }}
                        className="px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer"
                      >
                        [CANCEL]
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Verify Code & Enter New Password */}
                {passwordStep === 'verify' && !passwordSuccess && (
                  <form onSubmit={handleVerifyAndSetPassword} className="space-y-4">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Mail className="w-4 h-4 text-[#FFCC00]" />
                        <span>Code dispatched to <strong className="text-white">{currentDisplayUser?.email}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isOtpLoading}
                        className="text-[#FFCC00] hover:underline text-[11px] font-mono cursor-pointer"
                      >
                        [RESEND_CODE]
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* OTP Code */}
                      <div>
                        <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          6-DIGIT CODE *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            required
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white font-mono text-center tracking-[0.25em] text-sm outline-none transition-all"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          NEW PASSWORD *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min 8 characters"
                            required
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm outline-none transition-all font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white cursor-pointer"
                            tabIndex={-1}
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          CONFIRM PASSWORD *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <KeyRound className="w-4 h-4" />
                          </div>
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repeat password"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00]/40 text-white text-sm outline-none transition-all font-mono"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isOtpLoading}
                        className="px-5 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/15 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isOtpLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>VERIFYING...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>[VERIFY_&amp;_SAVE_PASSWORD]</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordPanel(false);
                          setPasswordStep('request');
                          setPasswordError('');
                        }}
                        className="px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer"
                      >
                        [CANCEL]
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}
          </div>

          {/* Sign Out Area */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-ndot text-lg text-white tracking-wide uppercase">Sign Out of All Sessions</h4>
              <p className="font-mono text-xs text-zinc-400 mt-0.5">End your current Celestius session on this browser.</p>
            </div>

            <button
              onClick={async () => {
                await signOut();
                setActivePage('home');
              }}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 hover:border-red-500/40 font-mono text-xs tracking-wider transition-all cursor-pointer"
            >
              [SIGN_OUT_NOW]
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
