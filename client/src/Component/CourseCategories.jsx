import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Laptop, TrendingUp, PenTool, Cpu, Briefcase,
  ArrowRight, Search, CheckCircle2, ChevronRight,
  Monitor, Users, Award, Box
} from 'lucide-react';

export const posterCategories = [
  {
    id: 'software-dev',
    title: 'Software Development',
    icon: Code2,
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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
    theme: 'light',
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

const posterPillars = [
  { icon: Box,      label: 'Practical Training' },
  { icon: Monitor,  label: 'Live Projects' },
  { icon: Users,    label: 'Expert Guidance' },
  { icon: Award,    label: 'Certification' },
  { icon: Briefcase,label: 'Placement Support' }
];

function PosterCourseCard({ category, onSelectCourse, onOpenEnroll, searchQuery = '', index = 0 }) {
  const navigate = useNavigate();
  const Icon = category.icon;
  const isDark = false;
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
    if (onOpenEnroll) onOpenEnroll(category.title);
    else navigate('/enroll');
  };

  return (
    <div
      className="cc-card group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full bg-white text-slate-900 border border-[#E2EBE5] hover:border-lime-500/60 shadow-xs hover:shadow-[0_12px_32px_rgba(3,59,50,0.08)] hover:-translate-y-1 transition-all duration-300"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-lime-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cc-icon bg-[#003831] text-lime-400 shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading tracking-tight leading-snug text-[#003831]">
                {category.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEnrollClick}
            aria-label={`Enroll in ${category.title}`}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer bg-[#F4F9F6] text-[#003831] hover:bg-[#003831] hover:text-lime-400 border border-[#E2EBE5] hover:border-[#003831] active:scale-95"
          >
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Course List */}
        <ul className="space-y-1.5 mb-5">
          {category.courses.map((course, idx) => {
            const isMatch = query && course.toLowerCase().includes(query);
            return (
              <li
                key={idx}
                onClick={() => handleCourseClick(course)}
                className={`cc-course-item flex items-center gap-2 text-[11px] sm:text-xs font-semibold py-1 px-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isMatch
                    ? 'bg-lime-400/20 text-lime-700 font-bold'
                    : 'text-slate-600 hover:text-[#003831] hover:bg-[#F4F9F6] hover:translate-x-1'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                    isMatch ? 'bg-lime-500 ring-2 ring-lime-400/50' : 'bg-lime-500'
                  }`}
                />
                <span className="leading-snug">{course}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">

        <button
          type="button"
          onClick={handleEnrollClick}
          className="btn-dark-green text-[11px] py-1.5 px-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 w-full xs:w-auto transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-3 h-3 text-lime-400" />
        </button>
      </div>
    </div>
  );
}

export default function CourseCategories({ searchQuery, setSearchQuery, onOpenEnroll, onSelectCourse, maxCategories }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.cc-reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('cc-revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = useMemo(() => {
    let list = activeFilter === 'all' ? posterCategories : posterCategories.filter((c) => c.id === activeFilter);
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((cat) => cat.title.toLowerCase().includes(q) || cat.courses.some((c) => c.toLowerCase().includes(q)));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const visibleList = maxCategories ? filtered.slice(0, maxCategories) : filtered;
  const isPreview = !!maxCategories;

  return (
    <section ref={sectionRef} className={isPreview ? 'py-0' : 'py-12 sm:py-20 lg:py-24 bg-[#F7FAF8] border-y border-[#E2EBE5]'}>
      <div className={isPreview ? 'w-full' : 'max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16'}>

        {/* Header — clean and direct */}
        {!isPreview && (
          <div className="cc-reveal cc-reveal-up text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading tracking-tight text-[#003831] leading-tight">
              Tech &amp; Marketing{' '}
              <span className="text-lime-600">Courses</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Learn from people who do the work. Build things that matter. Get hired.
            </p>
          </div>
        )}

        {/* Feature Pillars */}
        {!isPreview && (
          <div className="cc-reveal cc-reveal-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 xs:gap-2.5 sm:gap-3.5 mb-6 sm:mb-9" style={{ transitionDelay: '80ms' }}>
            {posterPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`cc-pillar p-2 xs:p-2.5 sm:p-3 rounded-xl bg-white border border-[#E2EBE5] flex items-center gap-2 xs:gap-2.5 transition-all hover:border-lime-500/50 hover:shadow-xs ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-lg bg-lime-50 border border-lime-200 text-lime-700 flex items-center justify-center shrink-0">
                    <PillarIcon className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                  </div>
                  <span className="text-[11px] xs:text-xs font-semibold text-slate-700 leading-tight">{pillar.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter + Search */}
        {!isPreview && (
          <div className="cc-reveal cc-reveal-up flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-3.5 mb-6 sm:mb-9" style={{ transitionDelay: '140ms' }}>
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#003831] text-lime-400 shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2EBE5]'
                }`}
              >
                All Domains (50+)
              </button>
              {posterCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === cat.id
                      ? 'bg-[#003831] text-lime-400 shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E2EBE5]'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search courses..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E2EBE5] rounded-xl focus:outline-none focus:border-lime-500 text-slate-800 shadow-xs"
              />
            </div>
          </div>
        )}

        {/* Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {visibleList.map((category, idx) => (
            <div key={category.id} className="cc-reveal cc-reveal-up" style={{ transitionDelay: `${200 + idx * 70}ms` }}>
              <PosterCourseCard
                category={category}
                onSelectCourse={onSelectCourse}
                onOpenEnroll={onOpenEnroll}
                searchQuery={searchQuery}
                index={idx}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {visibleList.length === 0 && (
          <div className="text-center py-14 bg-white rounded-2xl border border-[#E2EBE5] p-8 max-w-sm mx-auto shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 font-heading">No courses found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No results for "<strong className="text-slate-700">{searchQuery}</strong>".
            </p>
            <button
              onClick={() => setSearchQuery && setSearchQuery('')}
              className="mt-4 px-5 py-2 bg-lime-400 text-[#003831] font-bold text-xs rounded-xl cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
