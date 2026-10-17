import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import CourseModal from './Component/CourseModal';
import EnrollmentModal from './Component/EnrollmentModal';
import WhatsAppButton from './Component/WhatsAppButton';
import AdminLayout from './Component/Admin/AdminLayout';
import useScrollReveal from './hooks/useScrollReveal';
import { LayoutDashboard } from 'lucide-react';
import { LogoSymbol } from './Component/Logo';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhyXentroxPage from './pages/WhyXentroxPage';
import CoursesPage from './pages/CoursesPage';
import PortfolioPage from './pages/PortfolioPage';
import CareerAssistancePage from './pages/CareerAssistancePage';
import BlogsPage from './pages/BlogsPage';
import ContactPage from './pages/ContactPage';
import EnrollPage from './pages/EnrollPage';

import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollTrack, setEnrollTrack] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin'
      ? 'admin'
      : 'public';
  });

  useScrollReveal();

  // Force light theme always
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') setViewMode('admin');
      else if (window.location.hash === '' || window.location.hash === '#') setViewMode('public');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (location.pathname === '/admin' || window.location.hash === '#admin') setViewMode('admin');
    else setViewMode('public');
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
          <Route path="/why-xentrox" element={<WhyXentroxPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/courses" element={<CoursesPage onSelectCourse={handleSelectCourse} onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/projects" element={<PortfolioPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/portfolio" element={<PortfolioPage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/career-assistance" element={<CareerAssistancePage onOpenEnroll={handleOpenEnroll} />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/insights" element={<Navigate to="/blogs" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          <Route path="/admin" element={<AdminLayout theme="light" toggleTheme={() => { }} onBackToSite={() => navigate('/')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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

      <WhatsAppButton />
    </div>
  );
}
