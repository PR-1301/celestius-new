import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, useUser, useClerk, useSignIn, useSignUp } from '@clerk/clerk-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

// Validate key format (pk_test_... or pk_live_...)
export const isClerkKeyValid = Boolean(
  CLERK_KEY && 
  (CLERK_KEY.startsWith('pk_test_') || CLERK_KEY.startsWith('pk_live_')) &&
  !CLERK_KEY.includes('your_clerk_publishable_key_here')
);

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

  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);

  // Sync to MongoDB whenever Clerk user is loaded & signed in
  useEffect(() => {
    if (isSignedIn && user) {
      const payload = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'Student Member',
        imageUrl: user.imageUrl || '',
      };
      syncWithBackend(payload);
    }
  }, [isSignedIn, user?.id]);

  // Google OAuth flow
  const handleGoogleAuth = async (isSignUp = false) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      if (isSignUp) {
        if (!isSignUpLoaded) throw new Error('Sign-up engine initializing...');
        await signUp.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/',
        });
      } else {
        if (!isSignInLoaded) throw new Error('Sign-in engine initializing...');
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/',
        });
      }
    } catch (err) {
      console.error('Google Auth Error:', err);
      setAuthError(err.errors?.[0]?.longMessage || err.message || 'OAuth initialization failed');
    } finally {
      setAuthLoading(false);
    }
  };

  // Email / Password Sign In
  const handleEmailSignIn = async (email, password) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      if (!isSignInLoaded) throw new Error('Sign-in service is initializing...');
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        return { success: true };
      } else {
        const msg = `Sign-in requirement pending: ${result.status}`;
        setAuthError(msg);
        return { success: false, error: msg };
      }
    } catch (err) {
      console.error('Sign In Error:', err);
      const msg = err.errors?.[0]?.longMessage || err.message || 'Invalid email or password';
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Email / Password Sign Up
  const handleEmailSignUp = async ({ email, password, firstName, lastName }) => {
    setAuthError(null);
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
      return { success: true, verificationPending: true };
    } catch (err) {
      console.error('Sign Up Error:', err);
      const msg = err.errors?.[0]?.longMessage || err.message || 'Failed to create account';
      setAuthError(msg);
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
      return { success: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await clerkSignOut();
  };

  const currentUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Student Member',
    firstName: user.firstName || 'Student',
    lastName: user.lastName || '',
    imageUrl: user.imageUrl || '',
  } : null;

  return (
    <AuthContext.Provider
      value={{
        isClerkConfigured: true,
        isLoaded: isUserLoaded,
        isSignedIn: Boolean(isSignedIn),
        user: currentUser,
        authError,
        setAuthError,
        authLoading,
        verificationPending,
        setVerificationPending,
        signInWithGoogle: () => handleGoogleAuth(false),
        signUpWithGoogle: () => handleGoogleAuth(true),
        signInWithEmail: handleEmailSignIn,
        signUpWithEmail: handleEmailSignUp,
        verifyEmailCode: handleVerifyCode,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Fallback provider when VITE_CLERK_PUBLISHABLE_KEY is not yet populated
function FallbackAuthProvider({ children }) {
  const [demoUser, setDemoUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);

  const handleDemoSignIn = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const userObj = {
          id: `demo_${Date.now()}`,
          email: email || 'student@citchennai.net',
          fullName: email ? email.split('@')[0].toUpperCase() : 'DEMO USER',
          firstName: 'Demo',
          lastName: 'Member',
          imageUrl: '',
        };
        setDemoUser(userObj);
        setAuthLoading(false);
        await syncWithBackend({ clerkId: userObj.id, ...userObj });
        resolve({ success: true });
      }, 600);
    });
  };

  const handleDemoSignUp = async ({ email, firstName, lastName }) => {
    setAuthLoading(true);
    setAuthError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthLoading(false);
        setVerificationPending(true);
        resolve({ success: true, verificationPending: true });
      }, 600);
    });
  };

  const handleDemoVerify = async (code) => {
    setAuthLoading(true);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const userObj = {
          id: `user_${Date.now()}`,
          email: 'citian@citchennai.net',
          fullName: 'CIT STUDENT',
          firstName: 'CIT',
          lastName: 'Student',
          imageUrl: '',
        };
        setDemoUser(userObj);
        setAuthLoading(false);
        setVerificationPending(false);
        await syncWithBackend({ clerkId: userObj.id, ...userObj });
        resolve({ success: true });
      }, 600);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isClerkConfigured: false,
        isLoaded: true,
        isSignedIn: Boolean(demoUser),
        user: demoUser,
        authError,
        setAuthError,
        authLoading,
        verificationPending,
        setVerificationPending,
        signInWithGoogle: () => {
          setAuthError('Google sign-in service is currently initializing. Please try email sign-in or check back shortly.');
        },
        signUpWithGoogle: () => {
          setAuthError('Google registration service is currently initializing. Please try email registration or check back shortly.');
        },
        signInWithEmail: handleDemoSignIn,
        signUpWithEmail: handleDemoSignUp,
        verifyEmailCode: handleDemoVerify,
        signOut: async () => setDemoUser(null),
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
