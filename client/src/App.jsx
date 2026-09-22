import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import IntroAnimation from './components/IntroAnimation';
import DynamicBackground from './components/DynamicBackground';
import CircularLoader from './components/CircularLoader';
import RecruitmentPopup from './components/RecruitmentPopup';
import { getApiBaseUrl } from './config/api';

// Route-based code-split dynamic imports for optimal load times
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const Recruitment = lazy(() => import('./pages/Recruitment'));
const RecruitmentApply = lazy(() => import('./pages/RecruitmentApply'));
const Contact = lazy(() => import('./pages/Contact'));
const AllEvents = lazy(() => import('./pages/AllEvents'));

export default function App() {
  const getInitialPage = () => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    
    if (rawPath === 'recruitment/apply' || rawPath === 'apply') {
      return 'recruitment/apply';
    }
    if (rawPath === 'all-events' || rawPath === 'events/all') {
      return 'all-events';
    }

    const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'recruitment/apply', 'all-events'];

    if (validPages.includes(rawPath)) {
      if (rawPath === 'home') {
        window.history.replaceState(null, '', '/');
      }
      return rawPath;
    }

    // Redirect obsolete auth paths directly to home
    if (['login', 'auth', 'sign-in', 'sign-up', 'dashboard', 'profile', 'sso-callback'].includes(rawPath)) {
      window.history.replaceState(null, '', '/');
      return 'home';
    }

    // Automatically migrate any legacy #hash links (e.g. /#recruitment -> /recruitment)
    if (validPages.includes(rawHash)) {
      const cleanPath = rawHash === 'home' ? '/' : `/${rawHash}`;
      window.history.replaceState(null, '', cleanPath);
      return rawHash;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Always show intro animation on load
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  // Global recruitment open status control step
  const [recruitmentOpenStatus, setRecruitmentOpenStatus] = useState(true);
  const [recruitmentStatusLoading, setRecruitmentStatusLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRecruitmentStatus = async () => {
      try {
        const baseUrl = getApiBaseUrl();
        const apiUrl = baseUrl.endsWith('/api') ? `${baseUrl}/recruitment/status` : `${baseUrl}/api/recruitment/status`;

        const res = await fetch(apiUrl);
        if (res && res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (isMounted && typeof data.recruitmentOpenStatus === 'boolean') {
              setRecruitmentOpenStatus(data.recruitmentOpenStatus);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch recruitment status:', err);
      } finally {
        if (isMounted) setRecruitmentStatusLoading(false);
      }
    };

    fetchRecruitmentStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
  };

  const handleReplayIntro = () => {
    setIntroCompleted(false);
    setShowIntro(true);
  };

  // Browser back/forward navigation support
  useEffect(() => {
    const handlePopState = () => {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const validPages = ['home', 'events', 'team', 'recruitment', 'contact', 'recruitment/apply', 'all-events'];
      const page = validPages.includes(rawPath) ? rawPath : 'home';
      setActivePage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO metadata per route for enhanced search engine ranking and social cards
  useEffect(() => {
    const pageTitles = {
      home: "Celestius | Chennai Institute of Technology (CIT Chennai)",
      recruitment: "Celestius Recruitment & Roles | CIT Chennai",
      "recruitment/apply": "Apply Online: Student Application Portal | Celestius CIT",
      events: "Flagship Events & Hackathons | Celestius CIT (PromptVerse, Symposiums)",
      "all-events": "Event Chronicles & Archives | Celestius CIT",
      team: "Core Team & Leadership | Celestius CIT",
      contact: "Contact & Inquiries | Celestius CIT"
    };

    const pageDescriptions = {
      home: "Celestius is the student-led engineering & innovation community at Chennai Institute of Technology (CIT Chennai), driving software development, creative media, and hackathons.",
      recruitment: "Explore Celestius CIT recruitment across 7 domains: Frontend Developer, Backend Developer, Public Speaking, Events, Design, Editor, and Content Creator. Open to all CIT Chennai students.",
      "recruitment/apply": "Official 6-step student application console for Celestius at Chennai Institute of Technology. Register your domain and submit your application online.",
      events: "Explore Celestius flagship events at CIT Chennai: PromptVerse Continuum, Takshashila Tech, Deadlock algorithmic battles, and hands-on workshops.",
      "all-events": "Complete archive of hackathons, technical conferences, websites, and community milestones built by Celestius CIT.",
      team: "Meet the executive leads, core engineers, designers, and domain architects driving Celestius at Chennai Institute of Technology.",
      contact: "Get in touch with Celestius CIT leadership. Official inquiries, partnerships, event sponsorships, and campus collaborations."
    };

    if (pageTitles[activePage]) {
      document.title = pageTitles[activePage];
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pageDescriptions[activePage]) {
      metaDesc.setAttribute('content', pageDescriptions[activePage]);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && pageTitles[activePage]) {
      ogTitle.setAttribute('content', pageTitles[activePage]);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const path = activePage === 'home' ? '' : activePage;
      ogUrl.setAttribute('content', `https://celestius.in/${path}`);
    }
  }, [activePage]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
    let targetPath = '/';
    if (newPage === 'home') targetPath = '/';
    else if (newPage === 'recruitment/apply') targetPath = '/recruitment/apply';
    else if (newPage === 'all-events') targetPath = '/all-events';
    else targetPath = `/${newPage}`;

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col bg-[#060608] text-zinc-100 antialiased selection:bg-[#FFCC00] selection:text-black overflow-x-hidden font-sans"
    >
      {/* Intro Boot Animation featuring Athena & Hephaestus */}
      {showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Minimal Animated Dynamic Celestial Background (Common across all pages) */}
      <DynamicBackground mousePos={mousePos} />

      {/* Floating Nothing OS Navbar with Mechanical Holder */}
      <Navbar 
        activePage={
          activePage === 'recruitment/apply' 
            ? 'recruitment' 
            : (activePage === 'all-events' ? 'events' : activePage)
        } 
        setActivePage={handlePageChange} 
        introCompleted={introCompleted}
      />

      {/* Main Page Container with Simple Circular Loader Fallback */}
      <main key={activePage} className="relative z-10 flex-1 w-full animate-page-enter pb-16 md:pb-0">
        <Suspense fallback={<CircularLoader />}>
          {activePage === 'home' && (
            <Home 
              setActivePage={handlePageChange} 
              setSelectedEvent={setSelectedEvent} 
              introCompleted={introCompleted}
              recruitmentOpenStatus={recruitmentOpenStatus}
            />
          )}
          {activePage === 'events' && (
            <Events 
              setActivePage={handlePageChange}
              introCompleted={introCompleted}
            />
          )}
          {activePage === 'all-events' && (
            <AllEvents 
              setActivePage={handlePageChange}
              introCompleted={introCompleted}
            />
          )}
          {activePage === 'team' && (
            <Team 
              introCompleted={introCompleted} 
              setActivePage={handlePageChange}
            />
          )}
          {activePage === 'recruitment' && (
            <Recruitment 
              introCompleted={introCompleted} 
              setActivePage={handlePageChange}
              recruitmentOpenStatus={recruitmentOpenStatus}
              recruitmentStatusLoading={recruitmentStatusLoading}
            />
          )}
          {activePage === 'recruitment/apply' && (
            <RecruitmentApply 
              introCompleted={introCompleted} 
              setActivePage={handlePageChange}
              recruitmentOpenStatus={recruitmentOpenStatus}
              recruitmentStatusLoading={recruitmentStatusLoading}
            />
          )}
          {activePage === 'contact' && (
            <Contact introCompleted={introCompleted} />
          )}
        </Suspense>
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Bespoke Holographic Recruitment Invitation Popup */}
      <RecruitmentPopup 
        onNavigateApply={handlePageChange} 
        introCompleted={introCompleted} 
        activePage={activePage} 
      />

      {/* Celestius Gold Minimal Footer with Replay Intro trigger */}
      <Footer setActivePage={handlePageChange} onReplayIntro={handleReplayIntro} />

    </div>
  );
}
