import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Search, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { posterCategories } from './CourseCategories';

export default function Navbar({ onOpenEnroll, onSelectCourse }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setShowDrop(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open to prevent overlapping scroll bugs
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Projects', path: '/projects' },
    { label: 'Career Assistance', path: '/career-assistance' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
  ];

  // Flat list from the official poster categories
  const liveResults = searchQuery.trim().length > 0
    ? posterCategories.flatMap((cat) =>
        cat.courses
          .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((c) => ({ name: c, categoryTitle: cat.title, categoryObj: cat }))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setShowDrop(false);
      setMobileOpen(false);
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectResult = (course) => {
    setShowDrop(false);
    setSearchQuery('');
    setMobileOpen(false);
    if (onSelectCourse) onSelectCourse(course, course.categoryObj);
    else navigate(`/courses?search=${encodeURIComponent(course.name)}`);
  };

  const handleEnrollClick = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      setMobileOpen(false);
      if (onOpenEnroll) {
        onOpenEnroll();
      } else {
        navigate('/enroll');
      }
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-header ${
          scrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3">

          {/* Logo with official Dark Teal + Lime theme */}
          <div className="shrink-0 max-w-[210px] sm:max-w-none">
            <Logo size="md" href="/" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1.5 text-sm font-semibold no-underline transition-colors group ${
                    isActive ? 'text-[#003831] font-bold' : 'text-slate-700 hover:text-lime-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full bg-lime-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right: Search + Enroll */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div ref={searchRef} className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  aria-label="Search courses"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onFocus={() => setShowDrop(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowDrop(true); }}
                  className="w-40 xl:w-52 rounded-full py-2 pl-9 pr-7 text-xs bg-[#F4F9F6] border border-[#DCEBE2] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
                />
              </form>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setShowDrop(false); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}

              {showDrop && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 left-0 min-w-[300px] bg-white border border-[#DCEBE2] rounded-2xl shadow-xl overflow-hidden z-50 animate-scale-in">
                  <div className="px-3.5 py-2.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex justify-between">
                    <span>Matching Courses</span>
                    <span className="text-lime-600">{liveResults.length} found</span>
                  </div>
                  {liveResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">No match. Press Enter to view all.</div>
                  ) : (
                    <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                      {liveResults.map((course, idx) => (
                        <div
                          key={idx}
                          onMouseDown={(e) => { e.preventDefault(); handleSelectResult(course); }}
                          className="px-3.5 py-2.5 hover:bg-[#F0FDF4] cursor-pointer flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{course.name}</p>
                            <p className="text-[11px] text-lime-700 font-semibold">{course.categoryTitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    onMouseDown={(e) => { e.preventDefault(); handleSearchSubmit(); }}
                    className="px-3 py-2 text-center bg-[#F6FAF8] text-xs font-bold text-[#003831] hover:underline cursor-pointer border-t border-slate-100"
                  >
                    View all in catalog →
                  </div>
                </div>
              )}
            </div>

            {/* Enroll Now with Logo Theme & Click Animation */}
            <button
              type="button"
              onClick={handleEnrollClick}
              className={`btn-primary text-sm font-extrabold px-5 py-2.5 whitespace-nowrap cursor-pointer btn-interactive shadow-sm ${
                isEnrolling ? 'scale-95' : ''
              }`}
            >
              <span>Enroll Now</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile: Hamburger Button (Visible on all screens < lg) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0 z-50">
            <button
              type="button"
              onClick={handleEnrollClick}
              className="px-3 py-1.5 text-xs font-black rounded-lg bg-lime-400 text-[#003831] shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              Enroll
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={`w-9.5 h-9.5 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                mobileOpen
                  ? 'bg-lime-400 text-[#003831] border-lime-500'
                  : 'bg-[#EEF8F2] border-[#D0E8DC] text-slate-800'
              } active:scale-90`}
            >
              {mobileOpen ? <X size={20} className="animate-scale-in" /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Drawer with Backdrop Overlay & Zero Overlap */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-[#DDE9E4] px-5 py-6 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto animate-drawer">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search 50+ courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl py-2.5 pl-10 pr-3 text-sm bg-[#F0F8F3] border border-[#D0E8DC] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
                />
              </div>
            </form>

            <div className="flex flex-col space-y-1.5 mb-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3.5 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-lime-50 text-[#003831] border border-lime-300 font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="opacity-40" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="w-full btn-primary py-3.5 text-sm justify-center font-black shadow-md cursor-pointer"
              >
                <span>ENROLL NOW</span>
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                XentroX Labs • Official Academy of XentroX Solutions
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay on phone view */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
