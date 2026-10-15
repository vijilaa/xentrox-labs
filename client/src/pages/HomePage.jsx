import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Component/Hero';
import Highlights from '../Component/Highlights';
import CourseCategories from '../Component/CourseCategories';
import BlogsBanner from '../Component/BlogsBanner';
import KickstartBanner from '../Component/KickstartBanner';
import { portfolioProjects } from '../data/coursesData';
import { ArrowRight, Code2, FolderGit2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage({ onOpenEnroll, onSelectCourse }) {
  const navigate = useNavigate();
  const [courseSearch, setCourseSearch] = useState('');

  return (
    <div>
      {/* 1. Hero with rich visual */}
      <Hero onOpenEnroll={onOpenEnroll} />

      {/* 2. Core Pillars & Practical Advantage with visual training banner */}
      <Highlights onOpenEnroll={onOpenEnroll} />

      {/* 3. Courses — limited preview of first 2 categories */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="institute-badge mb-3">
                <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                Industry-Curated Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
                Industry-Oriented <span className="text-[#003831]">Tech &amp; Marketing</span> <span className="text-lime-600">Courses</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-xl font-medium">
                Learn from professionals. Work on real projects. Build your future.
              </p>
            </div>
            <Link
              to="/courses"
              className="btn-dark-green text-sm sm:text-base py-3 px-6 rounded-xl font-bold inline-flex items-center gap-2 shrink-0 no-underline btn-interactive"
            >
              View All 6 Domains <ArrowRight className="w-4 h-4 text-lime-400" />
            </Link>
          </div>

          {/* Show first 3 poster categories */}
          <CourseCategories
            searchQuery={courseSearch}
            setSearchQuery={setCourseSearch}
            onSelectCourse={onSelectCourse}
            onOpenEnroll={onOpenEnroll}
            maxCategories={3}
          />

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="btn-primary text-base py-4 px-10 rounded-xl font-extrabold inline-flex items-center gap-2 no-underline shadow-lg btn-interactive"
            >
              See All 50+ Training Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Practical Projects Snapshot with real project visual thumbnails */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="institute-badge mb-3">
                <FolderGit2 className="w-3.5 h-3.5" />
                Live Client Deliveries
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">
                Real Systems Our Trainees Build
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-lg">
                Not generic to-do apps — production software shipped to real commercial clients inside our studio.
              </p>
            </div>
            <Link
              to="/projects"
              className="btn-outline text-sm py-3 px-6 rounded-xl font-bold inline-flex items-center gap-2 no-underline shrink-0"
            >
              View All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {portfolioProjects.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-[#D4E8DC] hover:border-lime-500 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Project Image Preview */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-lime-400 text-[#022620] shadow-sm">
                    {item.category}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs text-white/90 font-mono">
                    Client: {item.client}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#033B32] transition-colors font-heading mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="p-3 rounded-xl bg-[#F4F9F6] border border-[#D4E8DC] text-xs text-slate-700 mb-4">
                    <strong className="text-lime-700">Outcome: </strong>{item.outcomes}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EEF3F0]">
                    {item.tags.slice(0, 4).map(t => (
                      <span key={t} className="tech-tag text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Career Placement banner */}
      <KickstartBanner onOpenEnroll={onOpenEnroll} />

      {/* 6. Blogs */}
      <BlogsBanner />

      {/* 7. Final Call to Action */}
      <section className="py-20 bg-[#033B32] relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(132,204,22,0.15) 0%, transparent 60%)'
        }} />
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-6">
            Admissions Open · 2026 Batches
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight mb-5 text-white leading-tight">
            Ready to Accelerate Your<br className="hidden sm:block" /> Tech Career?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Join our next studio cohort in Marthandam or Trivandrum. Speak with our engineering mentors, tour the labs, and choose your track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3.5 rounded-xl bg-white text-[#022620] font-bold text-sm sm:text-base hover:bg-slate-100 transition-colors shadow-lg no-underline"
            >
              Explore 50+ Courses
            </Link>
            <button
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="btn-primary text-sm sm:text-base py-3.5 px-9 rounded-xl font-extrabold cursor-pointer"
            >
              Enroll Now — Free Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
