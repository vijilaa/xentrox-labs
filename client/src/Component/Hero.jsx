import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { statistics } from '../data/coursesData';
import {
  ArrowRight, BookOpen, CheckCircle2, Code2, Globe,
  Cpu, TrendingUp, Layers, Zap, Users, Award, Star,
  Terminal, Sparkles, ShieldCheck, Laptop
} from 'lucide-react';

/* ── Typing Animation ── */
function TypingTrack({ words }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const current = words[wordIdx];
    const speed = deleting ? 35 : 75;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 2200);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
        if (charIdx === 1) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [wordIdx, charIdx, deleting, words]);

  return (
    <span className="text-lime-600 inline-block font-black">
      {display}<span className="animate-pulse text-lime-500">|</span>
    </span>
  );
}

/* ── Hero Technology Visual Showcase ── */
function HeroVisual({ onOpenEnroll }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Decorative gradient aura */}
      <div className="absolute -inset-2 bg-gradient-to-r from-lime-400/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

      {/* Main visual frame */}
      <div className="relative bg-white border border-[#D4E8DC] rounded-3xl shadow-2xl overflow-hidden">
        {/* Terminal / IDE Header */}
        <div className="bg-[#033B32] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />
            </div>
            <span className="text-xs font-mono font-bold text-lime-300 ml-2">
              xentrox-labs/studio-session.tsx
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[11px] font-mono text-lime-400/90 font-bold uppercase tracking-wider">
              Live Studio
            </span>
          </div>
        </div>

        {/* Real practical training image with overlay */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
            alt="Students and engineers collaborating on code inside XentroX Labs studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Floating badge over photo */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-800 font-heading">
              100% Practical Training
            </span>
          </div>

          {/* Bottom caption inside image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-xs font-mono text-lime-300 font-bold uppercase tracking-wider mb-1">
              Production Apprenticeship
            </p>
            <h4 className="text-base font-bold font-heading leading-tight drop-shadow-sm">
              Work on Real Client Software with Experienced Engineers
            </h4>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="p-5 bg-[#FAFCFA] border-t border-[#D4E8DC] space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-white border border-[#D4E8DC] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-lime-50 text-lime-700 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Curriculum</p>
                <p className="text-xs font-bold text-slate-800">MERN • Python • AI</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#D4E8DC] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Outcome</p>
                <p className="text-xs font-bold text-slate-800">98% Placement Rate</p>
              </div>
            </div>
          </div>

          {/* Quick Action row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80',
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
              className="text-xs font-extrabold text-[#033B32] hover:text-lime-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Apply for 2026 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating accent badge on top right */}
      <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-white border border-[#D4E8DC] px-3.5 py-2 rounded-2xl shadow-lg animate-float">
        <Sparkles className="w-4 h-4 text-lime-500" />
        <span className="text-xs font-bold text-slate-800 font-heading">
          Live Client Projects
        </span>
      </div>

      {/* Floating accent badge on bottom left */}
      <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 bg-white border border-[#D4E8DC] px-3.5 py-2 rounded-2xl shadow-lg animate-float" style={{ animationDelay: '1.2s' }}>
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-bold text-slate-800 font-heading">
          South India's Top Studio Lab
        </span>
      </div>
    </div>
  );
}

export default function Hero({ onOpenEnroll }) {
  const navigate = useNavigate();

  const typingWords = [
    'Full Stack Web Dev',
    'Python & AI Engineering',
    'Digital Marketing & SEO',
    'MERN Stack Architecture',
    'UI/UX & Product Design',
  ];

  const pillars = [
    { icon: Layers, label: '100% Practical Labs' },
    { icon: Globe, label: 'Live Client Projects' },
    { icon: Users, label: 'Dedicated Mentors' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full bg-white pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 tech-bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-lime-100/60 via-emerald-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Content ── */}
          <div className="lg:col-span-7 space-y-7 animate-fade-up">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="institute-badge">
                <Star className="w-3.5 h-3.5 text-lime-600" />
                Premier Tech Finishing School
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F4F9F6] text-slate-800 border border-[#D4E8DC] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                Admissions Open · 2026 Batch
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.12] font-heading text-slate-900">
                Master{' '}
                <TypingTrack words={typingWords} />{' '}
                <br />
                <span className="text-slate-900">Inside a Live</span>{' '}
                <span className="text-[#033B32]">Software Studio.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              <strong className="text-slate-900 font-bold">XentroX Labs</strong> is the official technology training academy of{' '}
              <strong className="text-slate-900 font-bold">XentroX Solutions</strong>. Learn full-stack engineering, programming, and digital marketing by working directly on active client codebases.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to="/courses"
                className="btn-dark-green text-sm sm:text-base py-3.5 px-7 sm:px-8 rounded-xl font-bold inline-flex items-center gap-2 shadow-sm no-underline"
              >
                <BookOpen className="w-4.5 h-4.5 text-lime-400" />
                <span>Explore Courses</span>
              </Link>
              <button
                onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
                className="btn-primary text-sm sm:text-base py-3.5 px-8 sm:px-9 rounded-xl font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Pillars */}
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

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {statistics.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#F4F9F6] border border-[#D4E8DC] text-center hover:border-lime-400 transition-colors"
                >
                  <p className="text-2xl font-black text-[#033B32] font-heading leading-none">{stat.value}</p>
                  <p className="text-[11px] font-medium text-slate-600 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Technology Visual ── */}
          <div className="lg:col-span-5 relative animate-fade-up delay-150">
            <HeroVisual onOpenEnroll={onOpenEnroll} />
          </div>

        </div>
      </div>
    </section>
  );
}
