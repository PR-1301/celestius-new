import React, { useEffect } from 'react';
import { 
  ChevronRight, 
  Edit3, 
  LogOut, 
  ArrowRight, 
  Layers, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Megaphone
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

export default function Dashboard({ setActivePage }) {
  const { isSignedIn, user, dbUser, signOut } = useAuthContext();

  // If unauthenticated, redirect to login
  useEffect(() => {
    if (!isSignedIn) {
      setActivePage('login');
    }
  }, [isSignedIn, setActivePage]);

  if (!isSignedIn) {
    return null;
  }

  const currentUser = dbUser || user;
  const fullName = dbUser?.fullName || user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Student Member';
  const firstName = fullName.split(' ')[0] || 'Member';

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb & User Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="text-[#FFCC00]">CELESTIUS</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-zinc-200 uppercase tracking-wider">PORTAL // ANNOUNCEMENTS</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('profile')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 hover:bg-black border border-white/15 hover:border-[#FFCC00]/50 text-zinc-200 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer shadow-sm group"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FFCC00] group-hover:rotate-12 transition-transform" />
            <span>[EDIT_PROFILE]</span>
          </button>

          <button
            onClick={async () => {
              await signOut();
              setActivePage('home');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 hover:border-red-500/40 font-mono text-xs tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>[SIGN_OUT]</span>
          </button>
        </div>
      </div>

      {/* Main Greeting & Pixel Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/10 border border-[#FFCC00]/30 font-mono text-[10px] text-[#FFCC00]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
          <span>(STATUS // ACTIVE_MEMBER)</span>
        </div>

        <h1 className="font-ndot text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          Welcome back, <span className="text-[#FFCC00]">{firstName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-2xl leading-relaxed">
          [ OFFICIAL ANNOUNCEMENTS // RECRUITMENT NOTICES // CELESTIUS UPDATES ]
        </p>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-6">
        
        {/* Featured Hero Announcement: Recruitment */}
        <div className="rounded-3xl border border-[#FFCC00]/30 bg-[#0c0d12]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Glow and Pixel Dot Matrix Grid */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFCC00]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 nothing-dot-grid opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Header Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-black/80 border border-[#FFCC00]/40 flex items-center justify-center text-[#FFCC00] shadow-sm">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-bold text-[#FFCC00] bg-[#FFCC00]/10 px-2.5 py-1 rounded-lg border border-[#FFCC00]/25 uppercase tracking-wider">
                  NOTICE // 01
                </span>
                <span className="text-zinc-300 font-medium tracking-wide">
                  OFFICIAL ANNOUNCEMENT
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-[#FFCC00]" />
                <span>TERM // COHORT_2026</span>
              </div>
            </div>

            {/* Announcement Headline */}
            <div>
              <h2 className="font-ndot text-2xl sm:text-4xl text-white tracking-wide uppercase leading-tight">
                Get Ready! Celestius Club Recruitment <span className="text-[#FFCC00]">Will Begin Shortly</span>
              </h2>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed max-w-3xl font-sans">
                The official recruitment drive for the 2026 term is currently in preparation and will open for applications soon. 
                Positions will be available across technical software engineering, artificial intelligence, UI/UX product design, 
                media production, and technical event operations.
              </p>
            </div>

            {/* Track Highlights Pill Grid */}
            <div className="pt-2">
              <span className="font-mono text-[11px] font-bold text-[#FFCC00] uppercase tracking-widest block mb-2.5">
                // UPCOMING OPEN DOMAINS:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-zinc-200 hover:border-[#FFCC00]/40 transition-colors">
                  [01] Technical Engineering (Web, AI/ML, Cloud)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-zinc-200 hover:border-[#FFCC00]/40 transition-colors">
                  [02] UI/UX & Product Design
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-zinc-200 hover:border-[#FFCC00]/40 transition-colors">
                  [03] Technical Event Operations
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 text-zinc-200 hover:border-[#FFCC00]/40 transition-colors">
                  [04] Media & Creative Documentation
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-mono text-xs text-zinc-400">
                &gt; Verify your <span className="text-white font-medium">Department, Roll No., and Portfolio</span> in profile settings.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivePage('recruitment')}
                  className="px-5 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/15 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>PREVIEW_TRACKS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Announcements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Hackathons Bulletin */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 space-y-4 relative overflow-hidden hover:border-[#FFCC00]/30 transition-all">
            <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center text-[#FFCC00]">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-wider">
                  SCHEDULED
                </span>
              </div>

              <div>
                <h3 className="font-ndot text-xl text-white tracking-wide uppercase">
                  Upcoming Hackathons & Bootcamps
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                  Inter and intra-college technical hackathon schedules for Chennai Institute of Technology will be announced alongside recruitment.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActivePage('events')}
                  className="font-mono text-xs text-[#FFCC00] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>[EVENTS_CATALOG]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Profile Status Notice */}
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 space-y-4 relative overflow-hidden hover:border-[#FFCC00]/30 transition-all">
            <div className="absolute inset-0 nothing-dot-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-zinc-300 uppercase tracking-wider">
                  ACTIVE_PASS
                </span>
              </div>

              <div>
                <h3 className="font-ndot text-xl text-white tracking-wide uppercase">
                  Student Profile Verification
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-sans">
                  Your institutional CIT university credentials have been verified. Keep your contact details and GitHub profile up to date for recruitment shortlisting.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActivePage('profile')}
                  className="font-mono text-xs text-[#FFCC00] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>[MANAGE_SETTINGS]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
