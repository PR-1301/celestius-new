import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  User, 
  Mail, 
  BookOpen, 
  Layers, 
  Hash, 
  Phone, 
  Save, 
  ShieldCheck, 
  Sparkles,
  Edit3,
  Github,
  Linkedin
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
const SECTIONS = ['Section A', 'Section B', 'Section C', 'Section D', 'Section E'];

export default function ProfileModal({ isOpen, onClose }) {
  const { user, dbUser, updateDbProfile } = useAuthContext();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const syncFormWithData = () => {
    const current = dbUser || user || {};
    setFullName(current.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || '');
    setDepartment(current.department || '');
    setYear(current.year || '');
    setSection(current.section || '');
    setMobileNumber(current.mobileNumber || '');
    setRegNumber(current.regNumber || '');
    setGithubUrl(current.githubUrl || '');
    setLinkedinUrl(current.linkedinUrl || '');
  };

  useEffect(() => {
    if (isOpen) {
      syncFormWithData();
      setIsEditing(false);
      setErrorMsg('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, dbUser, user]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full name cannot be left empty.');
      return;
    }
    if (!department) {
      setErrorMsg('Please specify your department.');
      return;
    }
    if (!year) {
      setErrorMsg('Please specify your year of study.');
      return;
    }
    if (!section) {
      setErrorMsg('Please specify your section.');
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (!regNumber.trim() || regNumber.trim().length < 5) {
      setErrorMsg('Please provide a valid college register / roll number.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateDbProfile({
        fullName: fullName.trim(),
        department,
        year,
        section,
        mobileNumber: cleanMobile,
        regNumber: regNumber.trim(),
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
      });

      if (res && res.success) {
        showToast('Profile credentials updated successfully.', 'success');
        setIsEditing(false);
      } else {
        setErrorMsg(res?.error || 'Failed to update profile. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while saving profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name, email) => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return 'CL';
  };

  const currentDisplayUser = dbUser || user;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0a0a0d] border border-[#FFCC00]/30 shadow-[0_0_60px_rgba(255,204,0,0.15)] rounded-3xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFCC00]/10 border border-[#FFCC00]/30 flex items-center justify-center text-[#FFCC00] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded bg-[#FFCC00]/15 text-[#FFCC00] border border-[#FFCC00]/30">
                  CIT VERIFIED IDENTITY
                </span>
                <span className="font-mono text-[10px] text-zinc-500">ID // {currentDisplayUser?.clerkId ? currentDisplayUser.clerkId.slice(-8).toUpperCase() : 'CIT-MEMBER'}</span>
              </div>
              <h2 className="font-ndot text-2xl sm:text-3xl text-white tracking-wider uppercase mt-1">
                STUDENT PROFILE
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 border border-white/20 text-zinc-400 hover:text-black hover:bg-[#FFCC00] hover:border-[#FFCC00] flex items-center justify-center transition-all shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Quick Identity Pill */}
        <div className="my-6 p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={currentDisplayUser?.fullName || 'User'} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FFCC00] shadow-[0_0_20px_rgba(255,204,0,0.2)]"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#FFCC00] text-black font-mono font-bold text-xl flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(255,204,0,0.2)]">
              {getInitials(currentDisplayUser?.fullName, currentDisplayUser?.email)}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left min-w-0">
            <h3 className="font-ndot text-xl text-white tracking-wide truncate">
              {currentDisplayUser?.fullName || 'Celestius Member'}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-[#FFCC00]" />
              <span className="font-mono text-xs text-[#FFCC00] truncate">
                {currentDisplayUser?.email || user?.email}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {currentDisplayUser?.department || 'Department Pending'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {currentDisplayUser?.year || 'Year Pending'}
              </span>
              {currentDisplayUser?.section && (
                <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {currentDisplayUser.section}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isEditing 
                ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' 
                : 'bg-[#FFCC00]/15 text-[#FFCC00] border border-[#FFCC00]/40 hover:bg-[#FFCC00] hover:text-black'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isEditing ? 'VIEW MODE' : 'EDIT PROFILE'}
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
            [ERROR] {errorMsg}
          </div>
        )}

        {/* Profile Content / Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 font-mono">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FFCC00]" /> Full Legal Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono transition-all outline-none ${
                isEditing 
                  ? 'bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white' 
                  : 'bg-zinc-950/60 border border-white/5 text-zinc-300 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#FFCC00]" /> Academic Department
            </label>
            {isEditing ? (
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono outline-none transition-all cursor-pointer"
              >
                <option value="" disabled className="text-zinc-600">Select Department...</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="bg-zinc-900 text-white">
                    {dept}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full bg-zinc-950/60 border border-white/5 text-zinc-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                {department || 'Not specified'}
              </div>
            )}
          </div>

          {/* Year of Study & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FFCC00]" /> Year of Study
              </label>
              {isEditing ? (
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled className="text-zinc-600">Select Year...</option>
                  {YEARS.map((yr) => (
                    <option key={yr} value={yr} className="bg-zinc-900 text-white">
                      {yr}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="w-full bg-zinc-950/60 border border-white/5 text-zinc-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                  {year || 'Not specified'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#FFCC00]" /> Section
              </label>
              {isEditing ? (
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled className="text-zinc-600">Select Section...</option>
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec} className="bg-zinc-900 text-white">
                      {sec}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="w-full bg-zinc-950/60 border border-white/5 text-zinc-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                  {section || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          {/* Mobile & Reg Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FFCC00]" /> Mobile Number
              </label>
              {isEditing ? (
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs text-zinc-500 font-mono">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white rounded-xl pl-12 pr-3.5 py-2.5 text-xs sm:text-sm font-mono placeholder:text-zinc-600 outline-none transition-all"
                  />
                </div>
              ) : (
                <div className="w-full bg-zinc-950/60 border border-white/5 text-zinc-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                  {mobileNumber ? `+91 ${mobileNumber}` : 'Not specified'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-zinc-500" /> College Register / Roll Number
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="210421104001"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono transition-all outline-none ${
                  isEditing 
                    ? 'bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white' 
                    : 'bg-zinc-950/60 border border-white/5 text-zinc-300 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Social Links (GitHub, LinkedIn) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-zinc-500" /> GitHub Profile (Optional)
              </label>
              <input
                type="url"
                disabled={!isEditing}
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono transition-all outline-none ${
                  isEditing 
                    ? 'bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white' 
                    : 'bg-zinc-950/60 border border-white/5 text-zinc-300 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-zinc-500" /> LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                disabled={!isEditing}
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono transition-all outline-none ${
                  isEditing 
                    ? 'bg-black/70 border border-white/15 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] text-white' 
                    : 'bg-zinc-950/60 border border-white/5 text-zinc-300 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  syncFormWithData();
                  setIsEditing(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FFCC00] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(255,204,0,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'SAVING...' : 'UPDATE CREDENTIALS'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
}
