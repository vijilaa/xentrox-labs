import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, BookOpen, CheckCircle2, Code2, Globe,
  Layers, Users, Award, Star, Terminal, Sparkles, ShieldCheck,
  Check, Laptop
} from 'lucide-react';

/* ── Hero Technology Studio Showcase Visual ── */
function HeroVisual({ onOpenEnroll }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Studio Frame Card */}
      <div className="relative bg-white border border-[#D4E8DC] rounded-3xl shadow-xl overflow-hidden">
        {/* Terminal / IDE Header */}
        <div className="bg-[#033B32] px-5 py-3.5 flex items-center justify-between border-b border-[#022620]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400/90 inline-block" />
            </div>
            <span className="text-xs font-mono font-bold text-lime-300 ml-2">
              xentrox-labs / production-telematics.tsx
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[11px] font-mono text-lime-300 font-semibold uppercase tracking-wider">
              Live Studio
            </span>
          </div>
        </div>

        {/* Real practical training image with overlay */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
            alt="Engineers collaborating in XentroX Labs Studio"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

          {/* Clean Location Tag on Image */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span className="text-xs font-bold text-slate-800 font-heading">
              100% Practical Studio Labs
            </span>
          </div>

          {/* Bottom caption inside image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[11px] font-mono text-lime-300 font-bold uppercase tracking-wider mb-1">
              Live Client Software Delivery
            </p>
            <h4 className="text-base sm:text-lg font-bold font-heading leading-tight drop-shadow-sm">
              Work on Production Software with Senior Engineers
            </h4>
          </div>
        </div>

        {/* Structured Studio Metrics & Deliverables */}
        <div className="p-5 sm:p-6 bg-[#FAFCFA] border-t border-[#D4E8DC] space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-[#D4E8DC] flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 border border-lime-200 flex items-center justify-center shrink-0">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Curriculum</p>
                <p className="text-xs font-bold text-slate-900">MERN • Python • AI</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#D4E8DC] flex items-center gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Placement</p>
                <p className="text-xs font-bold text-slate-900">98% Success Rate</p>
              </div>
            </div>
          </div>

          {/* Bottom Trainees Proof & Quick Link */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8F0EB]">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Trainee avatar"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">500+ Trainees Placed</span>
            </div>

            <button
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="text-xs font-bold text-[#033B32] hover:text-lime-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Apply for 2026 Batch <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onOpenEnroll }) {
  const navigate = useNavigate();

  const pillars = [
    { icon: Layers, label: '100% Practical Labs' },
    { icon: Globe, label: 'Live Client Projects' },
    { icon: Users, label: 'Working Tech Mentors' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full bg-white pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden"
    >
      {/* Subtle grid texture without harsh glowing blobs */}
      <div className="absolute inset-0 tech-bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Content ── */}
          <div className="lg:col-span-7 space-y-7 animate-fade-up">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="institute-badge">
                <Star className="w-3.5 h-3.5 text-lime-600" />
                Industry-Oriented Tech Finishing School
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F4F9F6] text-slate-800 border border-[#D4E8DC] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                2026 Cohort Admissions Open
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.12] font-heading text-slate-900">
                Master Practical Software <br className="hidden sm:inline" />
                <span className="text-[#033B32]">Engineering</span> Inside an{' '}
                <span className="text-lime-600">Active Studio.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              <strong className="text-slate-900 font-bold">XentroX Labs</strong> is the official technology training academy of{' '}
              <strong className="text-slate-900 font-bold">XentroX Solutions</strong>. Learn full-stack development, Python, AI, and digital marketing by working directly on active client codebases with senior engineers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to="/courses"
                className="btn-primary text-sm sm:text-base py-3.5 px-7 sm:px-8 rounded-xl font-extrabold inline-flex items-center gap-2 shadow-md no-underline"
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Explore 50+ Courses</span>
              </Link>
              <button
                onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
                className="btn-dark-green text-sm sm:text-base py-3.5 px-8 sm:px-9 rounded-xl font-bold cursor-pointer inline-flex items-center gap-2 shadow-sm"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4.5 h-4.5 text-lime-400" />
              </button>
            </div>

            {/* Key Pillars */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-[#D4E8DC]">
              {pillars.map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-lime-50 border border-lime-200 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-lime-700" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{p.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Trust Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { value: '500+', label: 'Trainees Placed' },
                { value: '98%', label: 'Placement Rate' },
                { value: '100+', label: 'Hiring Partners' },
                { value: '2 Studios', label: 'Marthandam & TVM' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#F4F9F6] border border-[#D4E8DC] text-center hover:border-lime-400 transition-colors"
                >
                  <p className="text-2xl font-black text-[#033B32] font-heading leading-none">{stat.value}</p>
                  <p className="text-[11px] font-medium text-slate-600 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Technology Visual ── */}
          <div className="lg:col-span-5 relative animate-fade-up delay-100">
            <HeroVisual onOpenEnroll={onOpenEnroll} />
          </div>

        </div>
      </div>
    </section>
  );
}
