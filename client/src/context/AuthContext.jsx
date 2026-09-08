import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ClerkProvider, useUser, useClerk, useSignIn, useSignUp } from '@clerk/clerk-react';
import { useToast, queuePersistentToast } from './ToastContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

// Validate key format (pk_test_... or pk_live_...)
export const isClerkKeyValid = Boolean(
  CLERK_KEY && 
  (CLERK_KEY.startsWith('pk_test_') || CLERK_KEY.startsWith('pk_live_')) &&
  !CLERK_KEY.includes('your_clerk_publishable_key_here')
);

export const isCitEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return email.trim().toLowerCase().endsWith('@citchennai.net');
};

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Helper to sync user to MongoDB backend
async function syncWithBackend(userData) {
  if (!userData?.clerkId) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/users/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[AUTH_SYNC] Backend sync notice:', err.message);
    return null;
  }
}

// Inner provider when live Clerk is active
function LiveClerkProvider({ children }) {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { showToast } = useToast();

  const [dbUser, setDbUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [googleConnecting, setGoogleConnecting] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Check URL params for any Clerk OAuth rejection signals
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const clerkStatus = urlParams.get('__clerk_status');
      const clerkError = urlParams.get('__clerk_error');
      const errorParam = urlParams.get('error') || urlParams.get('error_description');

      if (clerkStatus === 'error' || clerkError || errorParam) {
        const msg = 'Access Denied: Only official @citchennai.net university accounts are permitted by institutional policy.';
        showToast(msg, 'error', 15000);
        setAuthError(msg);
        setGoogleConnecting(false);
        sessionStorage.removeItem('celestius_oauth_pending');
        // Clean URL params while keeping /auth route
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch {
      // ignore
    }
  }, [showToast]);

  // Detect when user returns from Google OAuth but was rejected by Clerk's Allowlist
  useEffect(() => {
    if (!isUserLoaded) return;

    const oauthPending = sessionStorage.getItem('celestius_oauth_pending');
    if (oauthPending) {
      sessionStorage.removeItem('celestius_oauth_pending');
      setGoogleConnecting(false);

      // If user completed Google OAuth round-trip but was NOT signed in, Clerk blocked the email
      if (!isSignedIn) {
        const signUpError = signUp?.verifications?.externalAccount?.error?.message;
        const signInError = signIn?.firstFactorVerification?.error?.message;
        const detailError = signUpError || signInError;

        const msg = detailError && !detailError.toLowerCase().includes('unknown')
          ? `Access Denied: ${detailError}`
          : 'Access Denied: Only @citchennai.net university accounts are permitted.';

        queuePersistentToast(msg, 'error', 15000);
        showToast(msg, 'error', 15000);
        setAuthError(msg);
        sessionStorage.setItem('celestius_auth_error', msg);
      }
    }
  }, [isUserLoaded, isSignedIn, signUp, signIn, showToast]);

  // Sync to MongoDB whenever Clerk user is loaded & signed in, with strict domain check
  useEffect(() => {
    let isCancelled = false;

    const processAuth = async () => {
      if (!isSignedIn || !user) {
        setDbUser(null);
        return;
      }

      const email = (user.primaryEmailAddress?.emailAddress || '').trim().toLowerCase();

      // STRICT UNIVERSITY EMAIL RESTRICTION (Google OAuth or email)
      if (!isCitEmail(email)) {
        const errorMsg = `Access Denied: Account '${email}' does not belong to Chennai Institute of Technology. Only @citchennai.net university accounts are permitted.`;
        
        // Queue persistent toast so it survives any full-page reload
        queuePersistentToast(errorMsg, 'error', 15000);
        sessionStorage.setItem('celestius_auth_error', errorMsg);
        showToast(errorMsg, 'error', 15000);
        setAuthError(errorMsg);
        setDbUser(null);
        setGoogleConnecting(false);

        // Keep user on /login page
        if (window.location.pathname !== '/login') {
          window.history.replaceState(null, '', '/login');
        }

        try {
          await clerkSignOut({ redirectUrl: '/login' });
        } catch (err) {
          console.error('Error signing out unauthorized email:', err);
        }
        return;
      }

      // Valid CIT university email -> Sync with backend
      const payload = {
        clerkId: user.id,
        email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'CIT Student',
        imageUrl: user.imageUrl || '',
      };

      const syncResult = await syncWithBackend(payload);
      if (isCancelled) return;

      if (syncResult?.success && syncResult.user) {
        setDbUser(syncResult.user);
        // Check if onboarding is needed (missing required fields)
        const profileComplete = syncResult.user.isProfileComplete &&
          Boolean(syncResult.user.department && syncResult.user.year && syncResult.user.section && syncResult.user.mobileNumber && syncResult.user.regNumber);
        
        if (!profileComplete) {
          setIsOnboardingOpen(true);
        }
      }
      setGoogleConnecting(false);
    };

    processAuth();

    return () => {
      isCancelled = true;
    };
  }, [isSignedIn, user?.id]);

  // Update profile details in backend
  const updateDbProfile = useCallback(async (profileData) => {
    if (!user?.id) return { success: false, error: 'User not signed in' };
    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setDbUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Failed to update user profile.' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [user?.id]);

  // Google OAuth flow
  const handleGoogleAuth = async (isSignUp = false) => {
    setAuthError(null);
    setAuthLoading(true);
    setGoogleConnecting(true);
    try {
      sessionStorage.setItem('celestius_oauth_pending', 'true');
      sessionStorage.setItem('celestius_oauth_timestamp', Date.now().toString());
      if (isSignUp) {
        if (!isSignUpLoaded) throw new Error('Sign-up engine initializing...');
        await signUp.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/dashboard',
          continueSignUpUrl: '/login',
        });
      } else {
        if (!isSignInLoaded) throw new Error('Sign-in engine initializing...');
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/dashboard',
        });
      }
    } catch (err) {
      console.error('Google Auth Error:', err);
      const isDomainErr = err.errors?.[0]?.code?.includes('not_allowed') || err.message?.toLowerCase().includes('not allowed');
      const msg = isDomainErr 
        ? 'Access Denied: Only @citchennai.net university accounts are permitted.' 
        : (err.errors?.[0]?.longMessage || err.message || 'OAuth initialization failed');
      setAuthError(msg);
      showToast(msg, 'error', 10000);
      setGoogleConnecting(false);
      setAuthLoading(false);
    }
  };

  // Email / Password Sign In
  const handleEmailSignIn = async (email, password) => {
    setAuthError(null);

    // Strict Domain check before hitting Clerk
    if (!isCitEmail(email)) {
      const err = 'Access Denied: Only @citchennai.net university accounts are permitted to sign in.';
      setAuthError(err);
      showToast(err, 'error', 6000);
      return { success: false, error: err };
    }

    setAuthLoading(true);
    try {
      if (!isSignInLoaded) throw new Error('Sign-in service is initializing...');
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        showToast('Signed in successfully with university credentials.', 'success');
        return { success: true };
      } else {
        const msg = `Sign-in requirement pending: ${result.status}`;
        setAuthError(msg);
        return { success: false, error: msg };
      }
    } catch (err) {
      console.error('Sign In Error:', err);
      const isDomainErr = err.errors?.[0]?.code?.includes('not_allowed') || err.message?.toLowerCase().includes('not allowed');
      const msg = isDomainErr
        ? 'Access Denied: Only @citchennai.net university accounts are permitted.'
        : (err.errors?.[0]?.longMessage || err.message || 'Invalid email or password');
      setAuthError(msg);
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Email / Password Sign Up
  const handleEmailSignUp = async ({ email, password, firstName, lastName }) => {
    setAuthError(null);

    // Strict Domain check before registering
    if (!isCitEmail(email)) {
      const err = 'Access Denied: Only Chennai Institute of Technology accounts ending with @citchennai.net can create an account.';
      setAuthError(err);
      showToast(err, 'error', 6000);
      return { success: false, error: err };
    }

    setAuthLoading(true);
    try {
      if (!isSignUpLoaded) throw new Error('Sign-up service is initializing...');
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });

      // Send verification code to email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerificationPending(true);
      showToast('Verification code dispatched to your university inbox.', 'info');
      return { success: true, verificationPending: true };
    } catch (err) {
      console.error('Sign Up Error:', err);
      const isDomainErr = err.errors?.[0]?.code?.includes('not_allowed') || err.message?.toLowerCase().includes('not allowed');
      const msg = isDomainErr
        ? 'Access Denied: Only Chennai Institute of Technology accounts ending with @citchennai.net can create an account.'
        : (err.errors?.[0]?.longMessage || err.message || 'Failed to create account');
      setAuthError(msg);
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Verification Code confirmation
  const handleVerifyCode = async (code) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      if (!isSignUpLoaded) throw new Error('Verification service not ready');
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        setVerificationPending(false);
        showToast('Account email verified successfully!', 'success');
        return { success: true };
      } else {
        const msg = `Verification status: ${result.status}`;
        setAuthError(msg);
        return { success: false, error: msg };
      }
    } catch (err) {
      console.error('Code Verification Error:', err);
      const msg = err.errors?.[0]?.longMessage || err.message || 'Invalid verification code';
      setAuthError(msg);
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRequestPasswordResetOtp = async (targetEmail) => {
    const emailToUse = (targetEmail || user?.primaryEmailAddress?.emailAddress || '').toLowerCase().trim();
    if (!emailToUse) {
      const err = 'No university email specified for verification.';
      showToast(err, 'error');
      return { success: false, error: err };
    }

    try {
      // 1. Send OTP through Clerk's official email delivery if supported
      if (isSignInLoaded && signIn) {
        try {
          await signIn.create({
            strategy: 'reset_password_email_code',
            identifier: emailToUse,
          });
        } catch (clerkErr) {
          console.warn('[AUTH_RESET] Clerk client reset code notice:', clerkErr.message);
        }
      }

      // 2. Dispatch backend OTP service
      try {
        await fetch(`${API_BASE_URL}/auth/send-password-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailToUse }),
        });
      } catch (backendErr) {
        console.warn('[AUTH_RESET] Backend OTP notice:', backendErr.message);
      }

      showToast(`Verification code dispatched to ${emailToUse}. Please check your inbox.`, 'info', 8000);
      return { success: true };
    } catch (err) {
      console.error('Failed to dispatch password OTP:', err);
      const msg = err.errors?.[0]?.longMessage || err.message || 'Failed to dispatch verification code.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const handleVerifyOtpAndSetPassword = async ({ code, newPassword }) => {
    const emailToUse = (user?.primaryEmailAddress?.emailAddress || '').toLowerCase().trim();
    if (!code || !newPassword) {
      return { success: false, error: 'Verification code and new password are required.' };
    }
    if (newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    try {
      let success = false;

      // 1. Try Clerk signIn.attemptFirstFactor
      if (isSignInLoaded && signIn) {
        try {
          const res = await signIn.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code: code.trim(),
            password: newPassword,
          });
          if (res.status === 'complete') {
            await setSignInActive({ session: res.createdSessionId });
            success = true;
          }
        } catch (clerkErr) {
          console.warn('[AUTH_RESET] Clerk attemptFirstFactor notice:', clerkErr.message);
        }
      }

      // 2. Verify against backend OTP & Clerk Secret Key
      if (!success) {
        const backendRes = await fetch(`${API_BASE_URL}/auth/verify-and-update-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailToUse,
            clerkId: user?.id,
            code: code.trim(),
            newPassword,
          }),
        });
        const backendData = await backendRes.json();
        if (backendData.success) {
          success = true;
        } else if (!success) {
          throw new Error(backendData.error || 'Invalid or expired verification code.');
        }
      }

      // 3. If signed in, update user object password if possible
      if (user && typeof user.updatePassword === 'function') {
        try {
          await user.updatePassword({ newPassword });
        } catch {
          // ignore if already updated
        }
      }

      // Refresh user instance
      try {
        await user?.reload();
      } catch {
        // ignore
      }

      showToast('Password successfully updated! You can now use it to sign in.', 'success', 6000);
      return { success: true };
    } catch (err) {
      console.error('Password update error:', err);
      const msg = err.errors?.[0]?.longMessage || err.message || 'Verification failed. Please check the code.';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const handleSignOut = async () => {
    setDbUser(null);
    setIsOnboardingOpen(false);
    setIsProfileOpen(false);
    await clerkSignOut();
    showToast('Signed out of Celestius portal.', 'info');
  };

  const currentUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    fullName: dbUser?.fullName || user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'CIT Student',
    firstName: dbUser?.firstName || user.firstName || 'Student',
    lastName: dbUser?.lastName || user.lastName || '',
    imageUrl: user.imageUrl || '',
    passwordEnabled: Boolean(user.passwordEnabled),
    hasGoogleAuth: Boolean(user.externalAccounts?.length > 0 || user.externalAccounts?.some(acc => acc.provider?.includes('google'))),
  } : null;

  return (
    <AuthContext.Provider
      value={{
        isClerkConfigured: true,
        isLoaded: isUserLoaded,
        isSignedIn: Boolean(isSignedIn),
        user: currentUser,
        dbUser,
        updateDbProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isProfileOpen,
        setIsProfileOpen,
        authError,
        setAuthError,
        authLoading,
        googleConnecting,
        verificationPending,
        setVerificationPending,
        signInWithGoogle: () => handleGoogleAuth(false),
        signUpWithGoogle: () => handleGoogleAuth(true),
        signInWithEmail: handleEmailSignIn,
        signUpWithEmail: handleEmailSignUp,
        verifyEmailCode: handleVerifyCode,
        requestPasswordResetOtp: handleRequestPasswordResetOtp,
        verifyOtpAndSetPassword: handleVerifyOtpAndSetPassword,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Fallback provider when VITE_CLERK_PUBLISHABLE_KEY is not yet populated
function FallbackAuthProvider({ children }) {
  const { showToast } = useToast();
  const [demoUser, setDemoUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const updateDbProfile = useCallback(async (profileData) => {
    const updated = { ...(dbUser || demoUser), ...profileData };
    setDbUser(updated);
    setDemoUser(updated);
    try {
      await fetch(`${API_BASE_URL}/users/${demoUser?.id || 'demo_user'}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
    } catch {
      // offline fallback
    }
    return { success: true, user: updated };
  }, [dbUser, demoUser]);

  const handleDemoSignIn = async (email, password) => {
    setAuthError(null);
    if (!isCitEmail(email)) {
      const err = 'Access Denied: Only @citchennai.net university accounts are permitted to sign in.';
      setAuthError(err);
      showToast(err, 'error', 6000);
      return { success: false, error: err };
    }

    setAuthLoading(true);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const userObj = {
          id: `demo_${Date.now()}`,
          email: email.toLowerCase().trim(),
          fullName: email.split('@')[0].toUpperCase(),
          firstName: 'CIT',
          lastName: 'Student',
          imageUrl: '',
        };
        setDemoUser(userObj);
        setAuthLoading(false);
        showToast('Signed in successfully with university credentials.', 'success');

        const syncRes = await syncWithBackend({ clerkId: userObj.id, ...userObj });
        if (syncRes?.user) {
          setDbUser(syncRes.user);
          if (!syncRes.user.isProfileComplete) {
            setIsOnboardingOpen(true);
          }
        } else {
          setIsOnboardingOpen(true);
        }
        resolve({ success: true });
      }, 500);
    });
  };

  const handleDemoSignUp = async ({ email, firstName, lastName }) => {
    setAuthError(null);
    if (!isCitEmail(email)) {
      const err = 'Access Denied: Only Chennai Institute of Technology accounts ending with @citchennai.net can create an account.';
      setAuthError(err);
      showToast(err, 'error', 6000);
      return { success: false, error: err };
    }

    setAuthLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthLoading(false);
        setVerificationPending(true);
        showToast('Verification code dispatched to your university inbox.', 'info');
        resolve({ success: true, verificationPending: true });
      }, 500);
    });
  };

  const handleDemoVerify = async (code) => {
    setAuthLoading(true);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const userObj = {
          id: `user_${Date.now()}`,
          email: 'student@citchennai.net',
          fullName: 'CIT STUDENT',
          firstName: 'CIT',
          lastName: 'Student',
          imageUrl: '',
        };
        setDemoUser(userObj);
        setAuthLoading(false);
        setVerificationPending(false);
        showToast('Account email verified successfully!', 'success');
        setIsOnboardingOpen(true);
        await syncWithBackend({ clerkId: userObj.id, ...userObj });
        resolve({ success: true });
      }, 500);
    });
  };

  const handleGoogleBlocked = () => {
    showToast('Access Denied: Google OAuth requires an active @citchennai.net institutional account.', 'error');
  };

  return (
    <AuthContext.Provider
      value={{
        isClerkConfigured: false,
        isLoaded: true,
        isSignedIn: Boolean(demoUser),
        user: dbUser || demoUser,
        dbUser,
        updateDbProfile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isProfileOpen,
        setIsProfileOpen,
        authError,
        setAuthError,
        authLoading,
        googleConnecting: false,
        verificationPending,
        setVerificationPending,
        signInWithGoogle: handleGoogleBlocked,
        signUpWithGoogle: handleGoogleBlocked,
        signInWithEmail: handleDemoSignIn,
        signUpWithEmail: handleDemoSignUp,
        verifyEmailCode: handleDemoVerify,
        requestPasswordResetOtp: async (email) => {
          showToast(`Verification code dispatched to ${email || 'your university email'}.`, 'info', 6000);
          return { success: true };
        },
        verifyOtpAndSetPassword: async ({ code, newPassword }) => {
          if (!code || !newPassword) return { success: false, error: 'Code and password required.' };
          showToast('Password updated successfully! You can now use it to sign in.', 'success', 6000);
          return { success: true };
        },
        signOut: async () => {
          setDemoUser(null);
          setDbUser(null);
          setIsOnboardingOpen(false);
          setIsProfileOpen(false);
          showToast('Signed out of Celestius portal.', 'info');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Master Auth Provider
export default function AuthProvider({ children }) {
  if (isClerkKeyValid) {
    return (
      <ClerkProvider publishableKey={CLERK_KEY}>
        <LiveClerkProvider>
          {children}
        </LiveClerkProvider>
      </ClerkProvider>
    );
  }

  return (
    <FallbackAuthProvider>
      {children}
    </FallbackAuthProvider>
  );
}
