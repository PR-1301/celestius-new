import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, AlertOctagon, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function PolicyModal({ type, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return createPortal(
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className={`relative w-full ${isPrivacy ? 'max-w-4xl' : 'max-w-3xl'} max-h-[90vh] overflow-y-auto bg-[#0a0a0d] border ${
          isPrivacy 
            ? 'border-[#FFCC00]/30 shadow-[0_0_50px_rgba(255,204,0,0.12)]' 
            : 'border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.12)]'
        } rounded-3xl p-6 sm:p-8 text-left`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {isPrivacy ? (
              <div className="w-12 h-12 rounded-2xl bg-[#FFCC00]/10 border border-[#FFCC00]/30 flex items-center justify-center text-[#FFCC00] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
            )}

            <div>
              <h2 className="font-ndot text-3xl sm:text-4xl text-white tracking-wider uppercase leading-none">
                {isPrivacy ? 'Privacy Policy' : 'Refund Policy'}
              </h2>
              <p className={`font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-1.5 ${isPrivacy ? 'text-[#FFCC00]' : 'text-red-500'}`}>
                {isPrivacy ? 'CONFIDENTIAL DATA PROTOCOL' : 'REGISTRATION POLICY'}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full bg-zinc-900 border border-white/20 text-zinc-400 ${
              isPrivacy 
                ? 'hover:text-black hover:bg-[#FFCC00] hover:border-[#FFCC00]' 
                : 'hover:text-white hover:bg-red-500 hover:border-red-500'
            } flex items-center justify-center transition-all shrink-0 cursor-pointer`}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-300 font-sans mt-5 leading-relaxed">
          {isPrivacy 
            ? 'At Club Celestius, we implement robust measures to protect your digital records and ensure a secure registration pipeline.'
            : 'Please review our registration guidelines before completing your booking.'
          }
        </p>

        {/* Cards Grid */}
        {isPrivacy ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-[#111116]/90 border border-white/5 text-left flex flex-col justify-start">
              <div className="flex items-center gap-2 text-[#FFCC00]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h3 className="font-ndot text-lg sm:text-xl tracking-wider uppercase text-[#FFCC00]">
                  1. CONFIDENTIALITY
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                All student details collected during registration (name, email address, phone number, and department) are kept strictly confidential and stored on encrypted databases.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-[#111116]/90 border border-white/5 text-left flex flex-col justify-start">
              <div className="flex items-center gap-2 text-[#FFCC00]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h3 className="font-ndot text-lg sm:text-xl tracking-wider uppercase text-[#FFCC00]">
                  2. ZERO SHARING
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                Your data is never shared, sold, leased, or distributed to third-party advertisers, sponsors, or outer corporate organizations. Your consent remains absolute.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-[#111116]/90 border border-white/5 text-left flex flex-col justify-start">
              <div className="flex items-center gap-2 text-[#FFCC00]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h3 className="font-ndot text-lg sm:text-xl tracking-wider uppercase text-[#FFCC00]">
                  3. OPERATIONAL PURPOSE
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                Data gathered is solely utilized for verification, generating certificate credentials, and distributing workshop coordinate links and source code repositories.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-[#111116]/90 border border-white/5 text-left flex flex-col justify-start">
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h3 className="font-ndot text-lg sm:text-xl tracking-wider uppercase text-red-400">
                  1. BOOKING COMMITMENTS
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                All workshop bookings are final. Since seats are limited and event resources are allocated in advance, we are unable to process cancellations or refunds.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-[#111116]/90 border border-white/5 text-left flex flex-col justify-start">
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h3 className="font-ndot text-lg sm:text-xl tracking-wider uppercase text-red-400">
                  2. ABSENCE & SCHEDULE
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                We are unable to issue refunds or transfer registration passes due to personal absences, schedule conflicts, or technical connectivity issues during the live sessions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
