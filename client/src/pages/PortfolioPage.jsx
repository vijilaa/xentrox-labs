import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioItems } from '../services/api';
import { portfolioProjects as initialFallbackProjects } from '../data/coursesData';
import {
  FolderGit2, ArrowRight, Tag, Sparkles, ExternalLink,
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
      <section className="relative bg-[#033B32] py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&auto=format&fit=crop&q=80"
            alt="Engineering team shipping client software"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/95 to-[#064E3B]/90 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-xs font-mono mb-3 flex items-center gap-2 text-lime-400/80">
            <Link to="/" className="hover:text-lime-300 transition-colors">Home</Link>
            <span className="text-lime-400/40">/</span>
            <span className="text-lime-400">Projects</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            Client Software Portfolio
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight mb-4 max-w-2xl">
            Systems Built by Trainees. Delivered to Real Clients.
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            Every XentroX Labs student trains directly on production systems shipped to actual commercial businesses. Explore our live client deliverables and software case studies below.
          </p>
        </div>
      </section>

      {/* ── Projects Showcase Grid with Filters ── */}
      <section className="py-14 sm:py-20 bg-[#FAFCFA]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="institute-badge mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Live Case Studies ({projects.length} Total)
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-slate-900">
                Production Systems Shipped
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-xl">
                High-concurrency web platforms, automated technical SEO pipelines, telematics portals, and enterprise brand systems.
              </p>
            </div>

            <button
              onClick={() => (onOpenEnroll ? onOpenEnroll() : null)}
              className="btn-primary text-xs sm:text-sm py-3 px-6 rounded-xl font-bold cursor-pointer inline-flex items-center gap-2 shrink-0 shadow-sm"
            >
              Build Projects Like These <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D4E8DC]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#033B32] text-lime-400 shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#D4E8DC]'
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
                className="w-full bg-white border border-[#D4E8DC] rounded-xl px-3.5 py-2 pl-9 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
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
            <div className="text-center py-16 bg-white rounded-3xl border border-[#D4E8DC] p-8 shadow-xs">
              <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                No Projects Found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
                No portfolio projects matched your filter criteria. Try choosing another category or clearing your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn-outline text-xs py-2 px-5 rounded-xl font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                    className="group bg-white rounded-3xl border border-[#D4E8DC] hover:border-lime-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
                  >
                    <div>
                      {/* Project Image Preview */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={
                            project.image ||
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
                          }
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category Badge on image */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#022620] bg-lime-400 px-3 py-1 rounded-full shadow-sm">
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
                      <div className="p-6">
                        <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-[#033B32] transition-colors mb-2.5 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Measurable Outcome Pill if available */}
                        {project.outcomes && (
                          <div className="p-3.5 rounded-xl bg-[#F4F9F6] border border-[#D4E8DC] text-xs text-slate-700 mb-4">
                            <span className="font-bold text-lime-700 block mb-0.5">Measurable Outcome:</span>
                            <span>{project.outcomes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Tech Tags & Live Preview */}
                    <div className="px-6 pb-6 pt-0">
                      {projectTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EEF3F0] mb-3">
                          {projectTags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#F4F9F6] text-slate-700 border border-[#D4E8DC]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
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
                          onClick={() => (onOpenEnroll ? onOpenEnroll(project.title) : null)}
                          className="text-xs font-bold text-[#033B32] hover:text-lime-700 flex items-center gap-1 cursor-pointer transition-colors"
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
      <section className="py-16 bg-[#033B32] text-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
              Real Studio Apprenticeship
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading">
              Ready to Build Production-Level Software?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skip theoretical homework. Join XentroX Labs and work on live systems with code reviews, real Git branches, and measurable client delivery.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="btn-primary text-sm py-3.5 px-8 rounded-xl font-bold inline-flex items-center gap-2 no-underline"
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
