import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Laptop, TrendingUp, PenTool, Cpu, Briefcase,
  ArrowRight, Search, CheckCircle2, Sparkles, ChevronRight,
  Monitor, Users, Award, Box, Check, Flame
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   EXACT 6 DOMAIN ACADEMIES & COURSES DIRECT FROM THE OFFICIAL POSTER
   ────────────────────────────────────────────────────────────────────────── */
export const posterCategories = [
  {
    id: 'software-dev',
    title: 'Software Development',
    icon: Code2,
    theme: 'dark', // Dark Teal from Logo
    badge: 'High Demand',
    courses: [
      'Full Stack Web Development',
      'MERN Stack Development',
      'Python Full Stack Development',
      'Java Full Stack Development',
      'Front-End Development',
      'Back-End Development',
      'React.js Development',
      'Node.js Development',
      'Django Development',
      'PHP & MySQL Development',
      'Mobile App Development',
      'Software Testing & QA',
      'Git & GitHub'
    ]
  },
  {
    id: 'prog-cs',
    title: 'Programming & Computer Science',
    icon: Laptop,
    theme: 'light', // Crisp White with Dark Teal Text
    badge: 'Core Foundations',
    courses: [
      'Python Programming',
      'Java Programming',
      'C Programming',
      'C++ Programming',
      'JavaScript',
      'Data Structures & Algorithms',
      'SQL & Database Management',
      'Object-Oriented Programming',
      'API Development & Integration'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: TrendingUp,
    theme: 'dark', // Dark Teal from Logo
    badge: 'High ROI',
    courses: [
      'Complete Digital Marketing',
      'Social Media Marketing',
      'Search Engine Optimization (SEO)',
      'Google Ads',
      'Meta Ads',
      'Content Marketing',
      'Email Marketing',
      'WhatsApp Marketing',
      'Lead Generation',
      'Influencer Marketing',
      'Affiliate Marketing',
      'Google Analytics & Search Console',
      'Digital Marketing Strategy'
    ]
  },
  {
    id: 'creative-media',
    title: 'Creative & Media',
    icon: PenTool,
    theme: 'light', // Crisp White
    badge: 'Design & Edit',
    courses: [
      'Graphic Design',
      'Canva Design',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Video Editing',
      'Premiere Pro',
      'After Effects',
      'Motion Graphics',
      'Reels & Short-Form Video Editing',
      'Content Creation',
      'Branding & Brand Identity',
      'UI/UX Design'
    ]
  },
  {
    id: 'ai-modern-tech',
    title: 'AI & Modern Technologies',
    icon: Cpu,
    theme: 'dark', // Dark Teal from Logo
    badge: 'Future Ready',
    courses: [
      'AI Tools for Professionals',
      'Generative AI',
      'Prompt Engineering',
      'AI for Developers',
      'AI for Digital Marketing',
      'Automation Tools',
      'No-Code Tools',
      'Cloud Basics (AWS / GCP)',
      'DevOps & CI/CD (Basics)',
      'Cyber Security (Basics)'
    ]
  },
  {
    id: 'career-skills',
    title: 'Career & Industry Skills',
    icon: Briefcase,
    theme: 'light', // Crisp White
    badge: 'Job Ready',
    courses: [
      'Freelancing',
      'Personal Branding',
      'Portfolio Building',
      'GitHub & LinkedIn Profile Building',
      'Interview Preparation',
      'Resume & CV Development',
      'Client Handling & Project Management',
      'Entrepreneurship & Startup Basics'
    ]
  }
];

/* 5 Feature Pillars from top of Poster */
const posterPillars = [
  { icon: Box, label: 'Practical Training' },
  { icon: Monitor, label: 'Live Projects & Case Studies' },
  { icon: Users, label: 'Guidance from Industry Experts' },
  { icon: Award, label: 'Certification Support' },
  { icon: Briefcase, label: 'Placement Assistance' }
];

/* ── Poster-Styled Domain Card ── */
function PosterCourseCard({
  category,
  onSelectCourse,
  onOpenEnroll,
  searchQuery = '',
  index = 0
}) {
  const navigate = useNavigate();
  const Icon = category.icon;
  const isDark = category.theme === 'dark';
  const query = (searchQuery || '').trim().toLowerCase();

  const handleCourseClick = (courseName) => {
    if (onSelectCourse) {
      onSelectCourse({ name: courseName, level: 'All Levels', duration: 'Studio Cohort' }, category);
    } else {
      navigate(`/courses?track=${encodeURIComponent(courseName)}`);
    }
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    if (onOpenEnroll) {
      onOpenEnroll(category.title);
    } else {
      navigate('/enroll');
    }
  };

  return (
    <div
      className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl scroll-reveal stagger-${(index % 6) + 1} ${
        isDark
          ? 'bg-[#003831] text-white border-2 border-[#004D43] hover:border-lime-400/80 shadow-lg'
          : 'bg-white text-slate-900 border-2 border-[#DCEBE2] hover:border-lime-500 shadow-md'
      }`}
    >
      <div>
        {/* Card Header: Icon Box + Domain Title + Arrow Button */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-lime-500/20">
          <div className="flex items-center gap-3.5">
            {/* Logo-themed Icon Box */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                isDark
                  ? 'bg-lime-400 text-[#003831]'
                  : 'bg-[#003831] text-lime-400'
              }`}
            >
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
                  isDark
                    ? 'bg-white/10 text-lime-300 border border-lime-400/30'
                    : 'bg-lime-100 text-lime-800 border border-lime-300'
                }`}
              >
                {category.badge}
              </span>
              <h3
                className={`text-lg sm:text-xl font-black font-heading tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-[#003831]'
                }`}
              >
                {category.title}
              </h3>
            </div>
          </div>

          {/* Clean Arrow Button > */}
          <button
            type="button"
            onClick={handleEnrollClick}
            aria-label={`Enroll in ${category.title}`}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              isDark
                ? 'bg-white/10 text-white hover:bg-lime-400 hover:text-[#003831]'
                : 'bg-[#F4F9F6] text-[#003831] hover:bg-[#003831] hover:text-lime-400 border border-[#DCEBE2]'
            } group-hover:translate-x-1`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Clean, Simple Bulleted Course List Direct From Poster */}
        <ul className="space-y-2 mb-6">
          {category.courses.map((course, idx) => {
            const isMatch = query && course.toLowerCase().includes(query);

            return (
              <li
                key={idx}
                onClick={() => handleCourseClick(course)}
                className={`group/item flex items-center gap-2.5 text-xs sm:text-[13.5px] font-semibold py-1 px-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isMatch
                    ? 'bg-lime-400/20 text-lime-400 font-bold scale-[1.02]'
                    : isDark
                    ? 'text-slate-200 hover:text-lime-300 hover:bg-white/5 hover:translate-x-1.5'
                    : 'text-slate-700 hover:text-[#003831] hover:bg-lime-50 hover:translate-x-1.5'
                }`}
              >
                {/* Clean Bullet Dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                    isMatch
                      ? 'bg-lime-400 ring-2 ring-lime-400/50'
                      : 'bg-lime-500 group-hover/item:scale-150'
                  }`}
                />
                <span className="leading-snug">{course}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-lime-500/15 flex items-center justify-between gap-3">
        <span
          className={`text-xs font-mono font-bold ${
            isDark ? 'text-lime-300/80' : 'text-slate-500'
          }`}
        >
          {category.courses.length} Certified Tracks
        </span>

        <button
          type="button"
          onClick={handleEnrollClick}
          className={`py-2 px-4 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm btn-interactive ${
            isDark
              ? 'bg-lime-400 hover:bg-lime-300 text-[#003831]'
              : 'bg-[#003831] hover:bg-[#004D43] text-lime-400'
          }`}
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN COURSE CATEGORIES SECTION (POSTER ACCURATE + LOGO THEME)
   ────────────────────────────────────────────────────────────────────────── */
export default function CourseCategories({
  searchQuery,
  setSearchQuery,
  onOpenEnroll,
  onSelectCourse,
  maxCategories
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Filter logic
  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? posterCategories
      : posterCategories.filter((c) => c.id === activeFilter);

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((cat) => {
        const titleMatch = cat.title.toLowerCase().includes(q);
        const hasMatch = cat.courses.some((c) => c.toLowerCase().includes(q));
        return titleMatch || hasMatch;
      });
    }

    return list;
  }, [activeFilter, searchQuery]);

  const visibleList = maxCategories ? filtered.slice(0, maxCategories) : filtered;
  const isPreview = !!maxCategories;

  return (
    <section className={isPreview ? 'py-0' : 'py-14 sm:py-20 bg-[#F8FAF9]'}>
      <div className={isPreview ? 'w-full' : 'max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10'}>

        {/* ── Top Header matching the Poster ── */}
        {!isPreview && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="institute-badge mb-3">
              <Sparkles className="w-3.5 h-3.5 text-lime-600" />
              Official Curriculum Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#003831] leading-tight">
              Industry-Oriented <br className="hidden sm:inline" />
              <span className="text-[#003831]">Tech &amp; Marketing </span>
              <span className="text-lime-600">Courses</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 font-medium">
              Learn from professionals. Work on real projects. Build your future.
            </p>
          </div>
        )}

        {/* ── 5 Feature Pillars from Poster ── */}
        {!isPreview && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {posterPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#DCEBE2] hover:border-lime-500 shadow-xs flex items-center gap-3 transition-all hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-lime-50 border border-lime-200 text-lime-700 flex items-center justify-center shrink-0">
                    <PillarIcon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight">
                    {pillar.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Filter Pills & Search Bar ── */}
        {!isPreview && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#003831] text-lime-400 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-[#DCEBE2]'
                }`}
              >
                All Domains (50+)
              </button>
              {posterCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === cat.id
                      ? 'bg-[#003831] text-lime-400 shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-[#DCEBE2]'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search courses..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#DCEBE2] rounded-xl focus:outline-none focus:border-lime-500 text-slate-800 shadow-xs"
              />
            </div>
          </div>
        )}

        {/* ── The 6 Domain Cards Grid (Matching Poster Layout 1-to-1) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {visibleList.map((category, idx) => (
            <PosterCourseCard
              key={category.id}
              category={category}
              onSelectCourse={onSelectCourse}
              onOpenEnroll={onOpenEnroll}
              searchQuery={searchQuery}
              index={idx}
            />
          ))}
        </div>

        {/* ── Empty State ── */}
        {visibleList.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCEBE2] p-8 max-w-md mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 font-heading">No course match</h3>
            <p className="text-sm text-slate-500 mt-1">
              No courses matching "<strong className="text-slate-800">{searchQuery}</strong>".
            </p>
            <button
              onClick={() => setSearchQuery && setSearchQuery('')}
              className="mt-4 px-5 py-2 bg-lime-400 text-[#003831] font-bold text-xs rounded-xl cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* ── Bottom Kickstart Banner Direct from Poster ── */}
        {!isPreview && (
          <div className="mt-14 rounded-3xl bg-[#003831] p-6 sm:p-8 text-white border-2 border-[#004D43] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider block">
                Official Placement Accelerator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
                Kickstart Your Career with <span className="text-lime-400">XentroX Labs</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Industry Oriented Courses • Real World Projects • Learn from Experts • Placement Support
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="btn-primary py-3.5 px-8 text-sm sm:text-base font-black rounded-2xl cursor-pointer flex items-center gap-2 shadow-lg shrink-0 btn-interactive"
            >
              <span>ENROLL NOW</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
