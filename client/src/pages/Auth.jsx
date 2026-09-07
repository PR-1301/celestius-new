import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  ArrowLeft,
  Terminal,
  Cpu,
  Lock,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Auth({ setActivePage }) {
  const {
    isSignedIn,
    user,
    authError,
    setAuthError,
    authLoading,
    verificationPending,
    setVerificationPending,
    signInWithGoogle,
    signUpWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    verifyEmailCode,
    signOut,
  } = useAuthContext();

  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const isSignIn = mode === 'signin';

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  // Clear errors on mode change
  useEffect(() => {
    setAuthError(null);
    setVerificationPending(false);
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (verificationPending) {
      if (!verificationCode.trim()) {
        setAuthError('Please enter the verification code.');
        return;
      }
      const res = await verifyEmailCode(verificationCode.trim());
      if (res?.success) {
        setActionSuccess(true);
        setTimeout(() => {
          setActivePage('home');
        }, 1200);
      }
      return;
    }

    if (isSignIn) {
      if (!email.trim() || !password) {
        setAuthError('Please enter your email and password.');
        return;
      }
      const res = await signInWithEmail(email.trim(), password);
      if (res?.success) {
        setActionSuccess(true);
        setTimeout(() => {
          setActivePage('home');
        }, 1200);
      }
    } else {
      if (!email.trim() || !password) {
        setAuthError('Email and password are required.');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match.');
        return;
      }
      if (password.length < 8) {
        setAuthError('Password must be at least 8 characters long.');
        return;
      }
      const res = await signUpWithEmail({
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      if (res?.success && !res.verificationPending) {
        setActionSuccess(true);
        setTimeout(() => {
          setActivePage('home');
        }, 1200);
      }
    }
  };

  const handleGoogleAuth = () => {
    if (isSignIn) {
      signInWithGoogle();
    } else {
      signUpWithGoogle();
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto z-10">
        
        {/* Navigation Breadcrumb / Return CTA */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white font-mono text-xs transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[RETURN // HOME]</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
            <span>MEMBER_PORTAL // ACCESS_GATEWAY</span>
          </div>
        </div>

        {/* If Already Signed In State */}
        {isSignedIn && user ? (
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#0a0a0e] border border-white/15 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FFCC00]/10 border border-[#FFCC00] flex items-center justify-center text-[#FFCC00]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs text-[#FFCC00] uppercase tracking-widest">[SESSION_ACTIVE]</span>
              <h2 className="font-ndot text-3xl text-white mt-1">AUTHENTICATED</h2>
              <p className="font-mono text-xs text-zinc-400 mt-2">
                You are signed in as <span className="text-white font-bold">{user.fullName || user.email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-left space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>ACCOUNT:</span>
                <span className="text-white truncate max-w-[200px]">{user.email}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>MEMBERSHIP:</span>
                <span className="text-[#FFCC00]">STUDENT // MEMBER</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setActivePage('home')}
                className="flex-1 py-3 px-6 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all"
              >
                GO TO DASHBOARD
              </button>
              <button
                onClick={async () => {
                  await signOut();
                }}
                className="py-3 px-6 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-xs font-semibold border border-red-500/30 transition-all"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        ) : (
          /* Split Layout: Left Info Terminal + Right Interactive Auth Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Terminal / Club Information Side */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#08080b]/90 border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Background Geometric Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFCC00]/5 rounded-bl-full pointer-events-none" />

              <div className="space-y-6">
                {/* Brand Header */}
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="Celestius" className="h-7 w-auto object-contain" />
                  <div>
                    <h3 className="font-ndot text-lg text-white tracking-wider">CELESTIUS</h3>
                    <p className="font-mono text-[10px] text-zinc-500 tracking-tight">CHENNAI INSTITUTE OF TECHNOLOGY</p>
                  </div>
                </div>

                {/* Pixel Headline */}
                <div>
                  <div className="font-mono text-[10px] text-[#FFCC00] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>MEMBER_ACCESS</span>
                  </div>
                  <h1 className="font-ndot text-3xl sm:text-4xl text-white tracking-wide leading-tight">
                    {isSignIn ? 'MEMBER' : 'JOIN THE'} <br />
                    <span className="text-[#FFCC00]">{isSignIn ? 'LOGIN' : 'COMMUNITY'}</span>
                  </h1>
                  <p className="font-mono text-xs text-zinc-400 mt-3 leading-relaxed">
                    Access Chennai Institute of Technology's technical club portal, register for hackathons, and apply for recruitment tracks.
                  </p>
                </div>

                {/* Feature Telemetry Blocks */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs">
                    <Cpu className="w-4 h-4 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Hackathons & Workshops</div>
                      <div className="text-zinc-500 text-[11px]">Instant registration and digital event passes.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs">
                    <Shield className="w-4 h-4 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Verified Member Profile</div>
                      <div className="text-zinc-500 text-[11px]">Unified credentials across all technical and creative domains.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs">
                    <Layers className="w-4 h-4 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Recruitment Tracks</div>
                      <div className="text-zinc-500 text-[11px]">Technical engineering, design, media, and event operations.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Security Telemetry */}
              <div className="pt-6 mt-6 border-t border-white/10 font-mono text-[10px] text-zinc-500 flex items-center justify-between">
                <span>SECURITY: ENCRYPTED // TLS 1.3</span>
                <span className="text-[#FFCC00]">STATUS // ACTIVE</span>
              </div>
            </div>

            {/* Right Interactive Auth Form Side */}
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#0a0a0e] border border-white/15 shadow-2xl relative">
              
              {/* Success Overlay Animation */}
              {actionSuccess && (
                <div className="absolute inset-0 bg-[#0a0a0e]/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00] flex items-center justify-center text-[#FFCC00] mb-4">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-ndot text-2xl text-white">ACCESS GRANTED</h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">Initializing user session and redirecting...</p>
                </div>
              )}

              {/* Form Header */}
              <div className="space-y-6">
                
                {/* Mode Selector Tabs (Sign In / Sign Up) */}
                {!verificationPending && (
                  <div className="grid grid-cols-2 p-1 bg-black/70 rounded-2xl border border-white/10 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError(null);
                        setMode('signin');
                      }}
                      className={`py-3 rounded-xl font-bold transition-all tracking-wider ${
                        isSignIn
                          ? 'bg-[#FFCC00] text-black shadow-md shadow-[#FFCC00]/20'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      [SIGN_IN]
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError(null);
                        setMode('signup');
                      }}
                      className={`py-3 rounded-xl font-bold transition-all tracking-wider ${
                        !isSignIn
                          ? 'bg-[#FFCC00] text-black shadow-md shadow-[#FFCC00]/20'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      [SIGN_UP]
                    </button>
                  </div>
                )}

                {/* Error Message Box */}
                {authError && (
                  <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs flex items-start gap-2.5 animate-fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                    <div>
                      <span className="font-bold text-red-400">[ERROR] </span>
                      <span>{authError}</span>
                    </div>
                  </div>
                )}

                {/* Google OAuth Button */}
                {!verificationPending && (
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={authLoading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 hover:border-white/40 text-white font-mono text-xs font-bold tracking-wider transition-all duration-200 active:scale-[0.99] disabled:opacity-50 shadow-sm"
                    >
                      {/* Official Google Vector Logo */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.41 7.37 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.59 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span>{isSignIn ? 'LOGIN WITH GOOGLE' : 'REGISTER WITH GOOGLE'}</span>
                    </button>

                    {/* Monospace Divider */}
                    <div className="relative flex items-center justify-center my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative px-3 bg-[#0a0a0e] font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                        OR CONTINUE WITH EMAIL
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {verificationPending ? (
                    // Verification Code Block
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-[#FFCC00]/10 flex items-center justify-center text-[#FFCC00]">
                          <Lock className="w-5 h-5" />
                        </div>
                        <h4 className="font-ndot text-lg text-white">VERIFY YOUR EMAIL</h4>
                        <p className="font-mono text-xs text-zinc-400">
                          A confirmation code was sent to <span className="text-white">{email}</span>.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          CONFIRMATION CODE
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="w-full px-4 py-3.5 bg-black/70 border border-white/20 focus:border-[#FFCC00] rounded-2xl font-mono text-center text-2xl tracking-[0.4em] text-white placeholder:text-zinc-700 focus:outline-none transition-colors"
                          autoFocus
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FFCC00] hover:bg-[#FFE066] text-black font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50 shadow-md shadow-[#FFCC00]/15"
                      >
                        {authLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                        ) : (
                          <>
                            <span>COMPLETE REGISTRATION</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setVerificationPending(false)}
                        className="w-full text-center font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                      >
                        [← BACK TO REGISTRATION]
                      </button>
                    </div>
                  ) : (
                    // Regular Form Fields
                    <>
                      {/* Name Fields (Sign Up only) */}
                      {!isSignIn && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                              FIRST NAME
                            </label>
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Kavya"
                              className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#FFCC00] rounded-xl font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                              required={!isSignIn}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                              LAST NAME
                            </label>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Sundaram"
                              className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-[#FFCC00] rounded-xl font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@citchennai.net"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-[#FFCC00] rounded-xl font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                          PASSWORD
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-3 pr-11 bg-black/60 border border-white/15 focus:border-[#FFCC00] rounded-xl font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password Field (Sign Up only) */}
                      {!isSignIn && (
                        <div className="space-y-1.5">
                          <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                            CONFIRM PASSWORD
                          </label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-[#FFCC00] rounded-xl font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                            required={!isSignIn}
                          />
                        </div>
                      )}

                      {/* Submit CTA */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={authLoading}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FFCC00] hover:bg-[#FFE066] active:scale-[0.99] text-black font-mono text-xs font-bold tracking-wider transition-all shadow-md shadow-[#FFCC00]/20 disabled:opacity-50"
                        >
                          {authLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                          ) : (
                            <>
                              <span>{isSignIn ? 'AUTHENTICATE & ENTER' : 'CREATE ACCOUNT'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                {/* Bottom Mode Switcher */}
                {!verificationPending && (
                  <div className="text-center font-mono text-xs text-zinc-400 pt-2 border-t border-white/10">
                    {isSignIn ? (
                      <span>
                        Need an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setMode('signup');
                          }}
                          className="text-[#FFCC00] hover:underline font-semibold"
                        >
                          Register here
                        </button>
                      </span>
                    ) : (
                      <span>
                        Already registered?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setMode('signin');
                          }}
                          className="text-[#FFCC00] hover:underline font-semibold"
                        >
                          Sign in here
                        </button>
                      </span>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
