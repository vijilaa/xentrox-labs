import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioItems } from '../services/api';
import { portfolioProjects as initialFallbackProjects } from '../data/coursesData';
import { resolveImageUrl, handleImageError, DEFAULT_PORTFOLIO_FALLBACK } from '../utils/imageHelper';
import {
  FolderGit2, ArrowRight, Tag, ExternalLink,
  CheckCircle2, Search, X, Loader2, Code2, Globe, Layers
} from 'lucide-react';

export default function PortfolioPage({ onOpenEnroll }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real portfolio items from backend API
  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      const res = await getPortfolioItems();
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setProjects(res.data);
      } else {
        // Fallback to initial verified projects if backend has no records yet
        setProjects(initialFallbackProjects);
      }
    } catch (err) {
      console.warn('Backend portfolio load warning, using initial data:', err.message);
      setProjects(initialFallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();

    // Listen for portfolio updates triggered by Admin panel
    const handlePortfolioUpdate = () => {
      loadPortfolioData();
    };
    window.addEventListener('portfolio_updated', handlePortfolioUpdate);
    return () => window.removeEventListener('portfolio_updated', handlePortfolioUpdate);
  }, []);

  // Compute dynamic category filters from actual projects list
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (project.category && project.category.toLowerCase() === activeCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch = project.title && project.title.toLowerCase().includes(q);
      const descMatch = project.description && project.description.toLowerCase().includes(q);
      const clientMatch = project.client && project.client.toLowerCase().includes(q);
      const tagsMatch =
        Array.isArray(project.tags) &&
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || descMatch || clientMatch || tagsMatch);
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="pt-20 bg-white">

      {/* ── Page Banner ── */}
      <section className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] flex items-center overflow-hidden page-banner bg-[#002B22]">
        {/* Layer 1: wide digital wave background */}
        <img
          src="/image copy.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none"
        />

        {/* Layer 2: robot on glowing podium with icons from image copy 3.png, seamlessly blended */}
        <img
          src="/image copy 3.png"
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-contain object-right pointer-events-none select-none opacity-40 sm:opacity-90 lg:opacity-100"
          style={{
            maxWidth: '65%',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 30%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 30%)',
          }}
        />

        {/* Layer 3: subtle dark fade to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B22]/95 via-[#002B22]/70 to-[#002B22]/40 sm:via-[#002B22]/35 sm:to-transparent pointer-events-none" />

        {/* Content: headline anchored on the left */}
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 py-10 sm:py-16">
          <div className="max-w-xs sm:max-w-md lg:max-w-xl">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold font-heading tracking-tight text-white leading-[1.2] drop-shadow-md">
              Systems Built by Trainees.<br className="hidden sm:inline" />
              Delivered to Real Clients.
            </h1>
          </div>
        </div>
      </section>

      {/* ── Projects Showcase Grid with Filters ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7FAF8]">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* Section Header */}
          <div data-anim="fade-up" data-delay="80" className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
                Work Showcase
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 tracking-tight mt-1">
                Production Systems Shipped
              </h2>
              <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-xl leading-relaxed">
                High-concurrency web platforms, automated technical SEO pipelines, telematics portals, and enterprise brand systems.
              </p>
            </div>

            <button
              type="button"
              onClick={() => (onOpenEnroll ? onOpenEnroll() : null)}
              className="btn-primary text-xs sm:text-sm h-10 px-5 rounded-lg font-bold cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 shadow-xs active:scale-95 transition-all"
            >
              Build Projects Like These <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-[#E2EBE5]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 xs:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${activeCategory === cat
                    ? 'bg-[#003831] text-lime-400 border border-[#003831] shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-[#E2EBE5]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E2EBE5] rounded-lg h-9 pl-9 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Projects Cards Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-lime-600 animate-spin mb-3" />
              <p className="text-xs font-bold text-slate-500">Loading production portfolio projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E2EBE5] p-8 shadow-xs">
              <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                No Projects Found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
                No portfolio projects matched your filter criteria. Try choosing another category or clearing your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn-outline text-xs py-2 px-5 rounded-xl font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div data-anim="stagger" data-stagger="90" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => {
                const projectId = project._id || project.id;
                const projectTags = Array.isArray(project.tags)
                  ? project.tags
                  : typeof project.tags === 'string'
                    ? project.tags.split(',').map((t) => t.trim())
                    : [];

                return (
                  <div
                    key={projectId}
                    className="group bg-white rounded-2xl border border-[#E2EBE5] hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 flex flex-col justify-between overflow-hidden h-full"
                  >
                    <div>
                      {/* Project Image Preview */}
                      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={resolveImageUrl(project.image, DEFAULT_PORTFOLIO_FALLBACK)}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          loading="lazy"
                          onError={e => handleImageError(e, DEFAULT_PORTFOLIO_FALLBACK)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                        {/* Category Badge on image */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#003831] bg-lime-400 px-2.5 py-1 rounded-full shadow-xs">
                            {project.category || 'Software Project'}
                          </span>
                        </div>

                        {/* Client details & feature pill */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="font-mono text-lime-300 font-semibold drop-shadow-sm truncate max-w-[70%]">
                            Client: {project.client || 'Client Build'}
                          </span>
                          {project.featured && (
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white shrink-0">
                              Featured Build
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-[17px] font-bold font-heading text-slate-900 group-hover:text-[#003831] transition-colors mb-1.5 leading-snug line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem]">
                          {project.description}
                        </p>

                        {/* Measurable Outcome Pill if available */}
                        {project.outcomes && (
                          <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-[#E2EBE5] text-xs text-slate-700 mb-3 leading-relaxed">
                            <span className="font-bold text-lime-700 block mb-0.5">Measurable Outcome:</span>
                            <span className="line-clamp-1">{project.outcomes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Tech Tags & Live Preview */}
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 mt-auto">
                      {projectTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F0F5F2] mb-3">
                          {projectTags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F7FAF8] text-slate-700 border border-[#E2EBE5]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-0.5">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 hover:underline"
                          >
                            <span>Live System Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">
                            Studio Production Repo
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => (onOpenEnroll ? onOpenEnroll(project.title) : null)}
                          className="text-xs font-bold text-[#003831] hover:text-lime-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          Learn Tech Stack <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ── Call To Action Section ── */}
      <section data-anim="scale-in" data-delay="100" className="py-16 sm:py-20 bg-gradient-to-r from-[#032D27] via-[#063C33] to-[#075044] text-white">
        <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
              Real Studio Apprenticeship
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading tracking-tight">
              Ready to Build Production-Level Software?
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Skip theoretical homework. Join XentroX Labs and work on live systems with code reviews, real Git branches, and measurable client delivery.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="btn-primary text-xs sm:text-sm h-10 px-5.5 rounded-lg font-bold inline-flex items-center gap-2 no-underline shadow-xs active:scale-95 transition-all"
              >
                Explore Training Tracks <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
