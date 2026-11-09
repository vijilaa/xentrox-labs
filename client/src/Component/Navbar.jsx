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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileOpen
            ? 'bg-white shadow-md py-2.5 border-b border-[#E2EBE5]'
            : scrolled
            ? 'shadow-xs py-2 bg-white/95 backdrop-blur-md border-b border-[#E2EBE5]'
            : 'py-2.5 bg-white/90 backdrop-blur-md border-b border-[#E2EBE5]/50'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-2 sm:gap-3">

          {/* Logo with official Dark Teal + Lime theme */}
          <div className="shrink-0 max-w-[160px] xs:max-w-[210px] sm:max-w-none">
            <Logo size="md" href="/" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-[13px] tracking-normal no-underline transition-colors group ${
                    isActive ? 'text-[#003831] font-semibold' : 'text-slate-600 hover:text-[#003831] font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#84CC16] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right: Search + Enroll */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <div ref={searchRef} className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  aria-label="Search courses"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onFocus={() => setShowDrop(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowDrop(true); }}
                  className="w-36 xl:w-48 h-9 rounded-lg pl-8 pr-7 text-[12px] bg-[#F4F9F6] border border-[#E2EBE5] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#84CC16] focus:ring-1 focus:ring-[#84CC16]/30 transition-all"
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
                <div className="absolute top-full mt-2 left-0 min-w-[300px] bg-white border border-[#E2EBE5] rounded-2xl shadow-xl overflow-hidden z-50 animate-scale-in">
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

            {/* Enroll Now with Sleek Compact Button */}
            <button
              type="button"
              onClick={handleEnrollClick}
              className={`inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-bold rounded-lg bg-[#84CC16] hover:bg-[#92dc1d] active:bg-[#78ba14] text-[#003831] shadow-xs hover:shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer select-none border border-[#72b513]/30 active:scale-95 ${
                isEnrolling ? 'scale-95' : ''
              }`}
            >
              <span>Enroll Now</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile: Hamburger Button (Visible on all screens < lg) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0 z-50">
            <button
              type="button"
              onClick={handleEnrollClick}
              className="px-3 h-9 text-xs font-bold rounded-xl bg-[#84CC16] hover:bg-[#92dc1d] active:bg-[#78ba14] text-[#003831] shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              Enroll
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-xl border shadow-xs transition-all cursor-pointer active:scale-90 ${
                mobileOpen
                  ? 'bg-[#84CC16] text-[#003831] border-lime-500 shadow-lime-400/20'
                  : 'bg-white hover:bg-slate-50 border-[#D4E2D8] text-slate-800'
              }`}
            >
              {mobileOpen ? (
                <X size={18} className="stroke-[2.5] animate-scale-in" />
              ) : (
                <Menu size={18} className="stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Drawer with Solid 100% Opaque Background */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-[#E2EBE5] px-4 sm:px-5 py-4 sm:py-5 shadow-2xl max-h-[calc(100dvh-60px)] overflow-y-auto animate-drawer overscroll-contain">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search 50+ courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl py-2.5 pl-10 pr-3 text-sm bg-[#F4F9F6] border border-[#E2EBE5] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
                />
              </div>
            </form>

            <div className="flex flex-col space-y-1 mb-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-[15px] font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#EBF7EE] text-[#003831] border border-[#BDE8CA] font-bold shadow-xs'
                        : 'text-slate-800 hover:bg-[#F4F9F6] hover:text-[#003831] bg-white border border-transparent'
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
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
