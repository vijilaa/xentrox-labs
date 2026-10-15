import React from 'react';
import { Link } from 'react-router-dom';
import { headerInfo } from '../data/coursesData';
import {
  Building2, Target, Eye, MapPin, ArrowRight,
  CheckCircle2, Zap, Shield, BookOpen, Users,
  Sparkles, Code2, Award, Laptop
} from 'lucide-react';

const values = [
  { icon: Zap,      title: 'Production-First Learning', desc: 'Train on the exact tools, frameworks, and workflows used to ship real client software — not toy examples.' },
  { icon: Shield,   title: 'Measurable Competence',     desc: 'We issue credentials backed by verifiable GitHub repositories and real commercial code delivery.' },
  { icon: BookOpen, title: 'Practicing Engineers',     desc: 'All sessions are guided by active software architects and digital marketers who build for clients.' },
  { icon: Users,    title: 'Placement-Driven Culture',   desc: 'Career assistance starts on Day 1 — including resume audits, code reviews, and mock technical rounds.' },
];

const studioHighlights = [
  {
    title: 'Practical Coding Labs',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description: 'High-speed fiber workstations, live Linux dev servers, Docker containers, and multi-monitor setups.'
  },
  {
    title: '1-on-1 Code Reviews',
    category: 'Mentorship',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    description: 'Weekly whiteboarding, PR reviews, and line-by-line architecture critique from senior leads.'
  },
  {
    title: 'Digital Marketing & Growth Pod',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    description: 'Live ad spend management, Meta business manager simulation, and enterprise SEO tools.'
  }
];

export default function AboutPage({ onOpenEnroll }) {
  return (
    <div className="pt-20 bg-white">

      {/* ── Page Banner with studio backdrop ── */}
      <section className="relative bg-[#033B32] py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80"
            alt="XentroX Labs Engineering Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/95 to-[#064E3B]/90 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-lime-400/80 mb-6 font-mono">
            <Link to="/" className="hover:text-lime-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-lime-400">About Us</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-5">
            <Building2 className="w-3.5 h-3.5" />
            Our Training Academy
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.1] mb-5 max-w-3xl">
            Training South India's Next Generation of Tech Leaders.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
            <strong className="text-white font-bold">XentroX Labs</strong> is the official technology training academy of{' '}
            <strong className="text-white font-bold">XentroX Solutions</strong>. Founded in Marthandam &amp; Trivandrum, we bridge the gap between classroom theory and real commercial software engineering.
          </p>
        </div>
      </section>

      {/* ── Who We Are (Image + Story Grid) ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Story */}
            <div className="lg:col-span-6 space-y-6 animate-fade-up">
              <span className="institute-badge">Our Studio Philosophy</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
                Where Practical Skills Meet{' '}
                <span className="text-[#033B32]">Live Production.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Traditional institutes teach isolated, outdated syllabus exercises that recruiters immediately ignore. At XentroX Labs, students sit in the same working studio where XentroX Solutions develops software for actual business clients.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Every track revolves around production code — Git branches, automated build pipelines, relational and NoSQL databases, and real marketing budgets. You graduate with a demonstrable portfolio that proves your capabilities.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F9F6] border border-[#D4E8DC]">
                <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                  "We teach what modern engineering teams pay for: clean code architecture, Git discipline, problem-solving, and measurable business impact."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {['100% Practical Labs', 'Live Client Projects', 'Senior Lead Mentors', 'Direct Job Placement'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-lime-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image + Mission Cards */}
            <div className="lg:col-span-6 space-y-6 animate-fade-up delay-150">
              {/* Studio photo */}
              <div className="relative rounded-3xl overflow-hidden border border-[#D4E8DC] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&auto=format&fit=crop&q=80"
                  alt="Software engineers and trainees reviewing system architecture"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono font-bold uppercase text-lime-300 tracking-wider">
                    XentroX Solutions Studio
                  </span>
                  <p className="text-sm font-bold font-heading">
                    Active Development Hub · Marthandam &amp; Technopark Corridor
                  </p>
                </div>
              </div>

              {/* Mission & Vision Dual Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#D4E8DC]">
                  <div className="w-10 h-10 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-lime-700" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-1.5">Our Mission</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Empower students with job-ready tech mastery through hands-on studio training and direct employer hiring pipelines.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#D4E8DC]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                    <Eye className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-1.5">Our Vision</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Be South India's premier tech finishing school — graduating top software engineers and performance marketers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Studio Facilities Showcase with Curated Images ── */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="institute-badge mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Inside Our Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">
              The Learning Environment
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Designed from the ground up to mirror modern high-growth tech workplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioHighlights.map((facility, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl border border-[#D4E8DC] hover:border-lime-500 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-lime-400 text-[#022620]">
                    {facility.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold font-heading text-slate-900 mb-2 group-hover:text-[#033B32] transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="institute-badge mb-3">Our Principles</span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#D4E8DC] hover:border-lime-500 hover:shadow-md transition-all duration-300 group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime-50 border border-lime-100 flex items-center justify-center mb-4 group-hover:bg-lime-100 transition-colors">
                    <Icon className="w-5 h-5 text-lime-700" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Campuses ── */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-t border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="institute-badge mb-3">Our Campuses</span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">Training Locations</h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Two state-of-the-art studio locations across Tamil Nadu and Kerala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {headerInfo.locations.map((loc, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl bg-white border border-[#D4E8DC] hover:border-lime-500 hover:shadow-md transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-lime-50 border border-lime-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-lime-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900">{loc.city} Studio</h3>
                  <p className="text-xs font-bold text-lime-700 mb-1.5 uppercase tracking-wide">{loc.type}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="btn-primary text-sm sm:text-base py-3.5 px-9 rounded-xl font-bold inline-flex items-center gap-2 no-underline shadow-md"
            >
              Explore Training Tracks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
