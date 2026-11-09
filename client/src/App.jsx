import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import CourseModal from './Component/CourseModal';
import EnrollmentModal from './Component/EnrollmentModal';
import Chatbot from './Component/Chatbot';
import AdminLayout from './Component/Admin/AdminLayout';
import useScrollReveal from './hooks/useScrollReveal';
import { LayoutDashboard } from 'lucide-react';
import { LogoSymbol } from './Component/Logo';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PortfolioPage from './pages/PortfolioPage';
import CareerAssistancePage from './pages/CareerAssistancePage';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import EnrollPage from './pages/EnrollPage';
import NotFoundPage from './pages/NotFoundPage';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);
  return null;
}

// Helper to detect if current route is the protected admin path
const isAdminPath = (pathname = '', hash = '') => {
  const p = (pathname || '').toLowerCase();
  const h = (hash || '').toLowerCase();
  return (
    p === '/xentroxadmin' ||
    p.startsWith('/xentroxadmin/') ||
    h === '#xentroxadmin' ||
    h.startsWith('#xentroxadmin/')
  );
};

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollTrack, setEnrollTrack] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState(() => {
    return isAdminPath(window.location.pathname, window.location.hash)
      ? 'admin'
      : 'public';
  });

  useScrollReveal();

  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    });

    window.lenis = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Force light theme always
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (isAdminPath(window.location.pathname, window.location.hash)) {
        setViewMode('admin');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        setViewMode('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isAdminPath(location.pathname, window.location.hash)) {
      setViewMode('admin');
    } else {
      setViewMode('public');
    }
  }, [location.pathname]);

  const handleOpenEnroll = (trackName = '') => {
    setEnrollTrack(trackName);
    setIsEnrollOpen(true);
  };

  const handleSelectCourse = (course, category) => {
    setSelectedCourse(course);
    setSelectedCategory(category);
  };

  if (viewMode === 'admin') {
    return (
      <AdminLayout
        theme="light"
        toggleTheme={() => { }}
        onBackToSite={() => {
          window.location.hash = '';
          setViewMode('public');
          navigate('/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-white text-slate-900 selection:bg-lime-400 selection:text-[#022620]">
      <ScrollToTop />

      <Navbar
        onOpenEnroll={() => handleOpenEnroll('')}
        onSelectCourse={handleSelectCourse}
      />

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<HomePage onOpenEnroll={handleOpenEnroll} onSelectCourse={handleSelectCourse} />} />
          <Route path="/about" element={<AboutPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/why-xentrox" element={<Navigate to="/" replace />} />
          <Route path="/courses" element={<CoursesPage onSelectCourse={handleSelectCourse} onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/projects" element={<PortfolioPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/portfolio" element={<PortfolioPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/career-assistance" element={<CareerAssistancePage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/insights" element={<Navigate to="/blogs" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          {/* New Admin Routes */}
          <Route path="/XentroXadmin" element={<AdminLayout theme="light" toggleTheme={() => { }} onBackToSite={() => navigate('/')} />} />
          <Route path="/XentroXadmin/*" element={<AdminLayout theme="light" toggleTheme={() => { }} onBackToSite={() => navigate('/')} />} />
          <Route path="/xentroxadmin" element={<Navigate to="/XentroXadmin" replace />} />
          <Route path="/xentroxadmin/*" element={<Navigate to="/XentroXadmin" replace />} />

          {/* Old /admin route explicitly displays 404 Page Not Found */}
          <Route path="/admin" element={<NotFoundPage />} />
          <Route path="/admin/*" element={<NotFoundPage />} />

          {/* Global Fallback: 404 Page Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onOpenEnroll={handleOpenEnroll} />

      <CourseModal
        course={selectedCourse}
        category={selectedCategory}
        onClose={() => setSelectedCourse(null)}
        onOpenEnroll={handleOpenEnroll}
      />

      <EnrollmentModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        initialCourse={enrollTrack}
      />


      <Chatbot
        onOpenEnroll={handleOpenEnroll}
        onSelectCourse={handleSelectCourse}
      />
    </div>
  );
}
