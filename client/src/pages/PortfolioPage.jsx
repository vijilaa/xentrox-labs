import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects } from '../data/coursesData';
import { FolderGit2, ArrowRight, Tag, Sparkles, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PortfolioPage({ onOpenEnroll }) {
  return (
    <div className="pt-20 bg-white">

      {/* Page Banner with visual overlay */}
      <section className="relative bg-[#033B32] py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&auto=format&fit=crop&q=80"
            alt="Engineering team reviewing production software"
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
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Every XentroX Labs student trains directly on production systems shipped to actual businesses — not isolated dummy apps. Review our live software case studies below.
          </p>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="py-14 sm:py-20 bg-[#FAFCFA]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="institute-badge mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Live Case Studies
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-slate-900">
                Production Systems Shipped
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-xl">
                High-concurrency web platforms, automated SEO architectures, telematics portals, and brand systems.
              </p>
            </div>
            <button
              onClick={() => onOpenEnroll ? onOpenEnroll() : null}
              className="btn-primary text-xs sm:text-sm py-3 px-6 rounded-xl font-bold cursor-pointer inline-flex items-center gap-2 shrink-0 shadow-sm"
            >
              Build Projects Like These <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolioProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border border-[#D4E8DC] hover:border-lime-500 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Project Image Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#022620] bg-lime-400 px-3 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-mono text-lime-300 font-semibold drop-shadow-sm">
                      Client: {project.client}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white">
                        Featured Build
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-[#033B32] transition-colors mb-2.5 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Outcome Pill */}
                  <div className="p-3.5 rounded-xl bg-[#F4F9F6] border border-[#D4E8DC] text-xs text-slate-700 mb-4">
                    <span className="font-bold text-lime-700 block mb-0.5">Measurable Outcome:</span>
                    {project.outcomes}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EEF3F0]">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#F4F9F6] text-slate-700 border border-[#D4E8DC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
