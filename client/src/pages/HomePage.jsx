
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Component/Hero';
import Highlights from '../Component/Highlights';
import CourseCategories from '../Component/CourseCategories';
import KickstartBanner from '../Component/KickstartBanner';
import KickstartAcademyBanner from '../Component/KickstartAcademyBanner';
import { getPortfolioItems } from '../services/api';
import { portfolioProjects as initialFallbackProjects } from '../data/coursesData';
import { resolveImageUrl, handleImageError, DEFAULT_PORTFOLIO_FALLBACK } from '../utils/imageHelper';
import { ArrowRight } from 'lucide-react';

export default function HomePage({ onOpenEnroll, onSelectCourse }) {
  const navigate = useNavigate();
  const [courseSearch, setCourseSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch real backend portfolio items
  const loadPortfolio = async () => {
    try {
      const res = await getPortfolioItems();

      if (
        res &&
        res.data &&
        Array.isArray(res.data) &&
        res.data.length > 0
      ) {
        setProjects(res.data);
      } else {
        setProjects(initialFallbackProjects);
      }
    } catch {
      setProjects(initialFallbackProjects);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    loadPortfolio();

    const handlePortfolioUpdate = () => {
      loadPortfolio();
    };

    window.addEventListener('portfolio_updated', handlePortfolioUpdate);

    return () =>
      window.removeEventListener(
        'portfolio_updated',
        handlePortfolioUpdate
      );
  }, []);

  return (
    <div className="bg-white text-slate-800">

      {/* 1. Hero */}
      <Hero onOpenEnroll={onOpenEnroll} />

      {/* 2. Core Pillars */}
      <Highlights onOpenEnroll={onOpenEnroll} />

      {/* 3. Professional Courses Section */}
      <section
        data-anim="fade-up"
        data-delay="50"
        className="
          relative
          py-12 sm:py-16
          bg-[#F7FAF8]
          border-y border-[#E2EBE5]
        "
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* Section Heading - Highlighted, clean, not oversized */}
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-10">

            <div className="max-w-3xl">
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 leading-tight tracking-tight">
                Industry-Oriented{' '}
                <span className="text-[#003831]">
                  Tech &amp; Marketing
                </span>{' '}
                <span className="text-lime-600">
                  Courses
                </span>
              </h2>
            </div>

            <Link
              to="/courses"
              className="
                group
                btn-dark-green
                text-xs sm:text-sm
                py-2.5 px-4.5
                rounded-lg
                font-semibold
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto shrink-0
                no-underline
                transition-all duration-200
                hover:-translate-y-0.5
                active:scale-95
              "
            >
              <span>View All 6 Domains</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-400 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Course Categories */}
          <div
            className="
              [&_.grid]:!gap-6
              [&_.grid]:!gap-y-6
              [&_.grid>*]:min-w-0
              [&_.grid>*]:h-full
              [&_.grid>*]:rounded-xl
              [&_.grid>*]:transition-all
              [&_.grid>*]:duration-300
            "
          >
            <CourseCategories
              searchQuery={courseSearch}
              setSearchQuery={setCourseSearch}
              onSelectCourse={onSelectCourse}
              onOpenEnroll={onOpenEnroll}
              maxCategories={3}
            />
          </div>

        </div>
      </section>

      {/* 4. Practical Projects */}
      <section data-anim="fade-up" data-delay="80" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* Projects Heading */}
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-10">

            <div className="max-w-2xl">
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 tracking-tight leading-tight">
                Real Systems Our Trainees Build
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Not generic to-do apps — production software shipped to real commercial clients inside our studio.
              </p>
            </div>

            <Link
              to="/projects"
              className="btn-outline text-xs sm:text-sm py-2.5 px-4.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 w-full sm:w-auto no-underline shrink-0 active:scale-95 transition-all group"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#003831] group-hover:text-lime-600 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Project Cards */}
          <div data-anim="stagger" data-stagger="110" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 items-stretch">

            {projects.slice(0, 3).map((item, index) => {
              const itemId = item._id || item.id;

              const itemTags = Array.isArray(item.tags)
                ? item.tags
                : typeof item.tags === 'string'
                  ? item.tags.split(',').map((t) => t.trim())
                  : [];

              return (
                <article
                  key={itemId}
                  style={{ transitionDelay: `${index * 90}ms` }}
                  className="
                    scroll-reveal
                    group
                    bg-white
                    rounded-2xl
                    border border-[#E2EBE5]
                    hover:border-lime-500/60
                    shadow-xs
                    hover:shadow-[0_14px_36px_rgba(3,59,50,0.08)]
                    transition-all duration-300
                    hover:-translate-y-1
                    flex flex-col
                    overflow-hidden
                    h-full
                  "
                >

                  <div>
                    {/* Project Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">

                      <img
                        src={resolveImageUrl(item.image, DEFAULT_PORTFOLIO_FALLBACK)}
                        alt={item.title}
                        className="
                          w-full h-full object-cover
                          transition-transform duration-500 ease-out
                          group-hover:scale-105
                        "
                        loading="lazy"
                        onError={e => handleImageError(e, DEFAULT_PORTFOLIO_FALLBACK)}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <span
                        className="
                          absolute top-3 left-3
                          text-[10px] font-extrabold uppercase tracking-wider
                          px-2.5 py-1
                          rounded-lg
                          bg-lime-400 text-[#003831]
                          shadow-xs
                        "
                      >
                        {item.category || 'Software Build'}
                      </span>

                      <span
                        className="
                          absolute bottom-3 left-3 right-3
                          text-xs text-white/95 font-medium
                          drop-shadow-sm
                          truncate
                        "
                      >
                        Client: {item.client || 'Client Project'}
                      </span>

                    </div>

                    {/* Project Content */}
                    <div className="p-5 sm:p-6">

                      <h3
                        className="
                          text-base sm:text-[17px]
                          font-bold text-slate-900
                          group-hover:text-[#003831]
                          transition-colors
                          font-heading
                          mb-2 leading-snug
                          line-clamp-1
                        "
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5 line-clamp-2 min-h-[2.5rem]">
                        {item.description}
                      </p>

                      {item.outcomes && (
                        <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#E2EBE5] text-xs text-slate-700 mb-3 leading-relaxed">
                          <strong className="text-lime-700 font-bold block mb-0.5">
                            Measurable Outcome:
                          </strong>
                          <span className="line-clamp-1">{item.outcomes}</span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Project Card Footer */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 mt-auto">

                    {itemTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-100 mb-3.5">

                        {itemTags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F7FAF8] text-slate-700 border border-[#E2EBE5]"
                          >
                            {t}
                          </span>
                        ))}

                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">

                      <Link
                        to="/projects"
                        className="
                          text-xs
                          font-bold text-[#003831]
                          hover:text-lime-700
                          inline-flex items-center gap-1.5
                          transition-colors
                          no-underline
                          group/link
                        "
                      >
                        <span>Explore Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 text-lime-600" />
                      </Link>

                    </div>
                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* 5. Career Placement Banner */}
      <KickstartBanner onOpenEnroll={onOpenEnroll} />

      {/* 6. XentroX Academy - Kick Start Your Career Banner (Matching Reference Model) */}
      <KickstartAcademyBanner onOpenEnroll={onOpenEnroll} />

    </div>
  );
}
