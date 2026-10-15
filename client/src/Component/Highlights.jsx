import React from 'react';
import { Code2, FolderGit2, Users2, Briefcase, CheckCircle2, Sparkles, ArrowRight, Laptop, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    id: 'practical',
    icon: Code2,
    number: '01',
    title: 'Practical Hands-On Coding',
    description: 'You write code from Day 1. Solve real programming challenges and build applications with modern developer toolchains.',
    points: ['Live terminal & cloud dev environments', 'Real Git branching & PR reviews', 'Automated testing standards'],
    accent: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  },
  {
    id: 'projects',
    icon: FolderGit2,
    number: '02',
    title: 'Real Client Project Experience',
    description: 'Train on active codebases and digital campaigns delivered by XentroX Solutions for real businesses.',
    points: ['Production web & mobile apps', 'Database architecture & APIs', 'Measurable outcomes on live systems'],
    accent: 'bg-lime-50 border-lime-100 text-lime-700',
  },
  {
    id: 'mentors',
    icon: Users2,
    number: '03',
    title: 'Mentorship by Working Engineers',
    description: 'Learn from software developers and growth marketers who build and ship production software every single day.',
    points: ['Weekly 1-on-1 code reviews', 'Architectural design best practices', 'Direct feedback on code quality'],
    accent: 'bg-teal-50 border-teal-100 text-teal-700',
  },
  {
    id: 'placement',
    icon: Briefcase,
    number: '04',
    title: 'Career & Placement Support',
    description: 'End-to-end career preparation — from portfolio to job offer — bridging the gap between learning and hiring.',
    points: ['ATS resume & GitHub portfolio', 'Mock interviews & DSA practice', 'Direct hiring partner referrals'],
    accent: 'bg-violet-50 border-violet-100 text-violet-700',
  },
];

export default function Highlights({ onOpenEnroll }) {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#D4E8DC]">
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="institute-badge mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              The Practical Advantage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900">
              Why Choose <span className="text-[#033B32]">XentroX Labs</span>?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              We focus strictly on job readiness. Our training model replaces dry lectures with direct participation in active software and marketing projects.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/why-xentrox"
              className="btn-outline text-xs sm:text-sm py-3 px-5 rounded-xl font-bold inline-flex items-center gap-2 shrink-0 no-underline"
            >
              Compare with Bootcamps <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {pillars.map(pillar => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group p-6 rounded-2xl bg-white border border-[#D4E8DC] hover:border-lime-500 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-lime-500 transition-colors">
                    {pillar.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                  {pillar.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-[#EEF3F0]">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Training Studio Banner Callout */}
        <div className="relative rounded-3xl overflow-hidden bg-[#033B32] p-8 sm:p-10 text-white shadow-xl">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80"
              alt="Practical software studio learning session"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/90 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-wider block">
                Studio-Driven Learning Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
                Train inside the same studio that ships software to global clients.
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                Rather than working in isolation on theoretical homework, our trainees pair-program with active software architects, review git diffs, and deploy real microservices.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onOpenEnroll ? onOpenEnroll() : null}
                className="btn-primary py-3 px-6 text-xs sm:text-sm rounded-xl font-extrabold cursor-pointer text-center"
              >
                Apply for Next Batch
              </button>
              <Link
                to="/about"
                className="py-3 px-6 text-xs sm:text-sm rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors text-center no-underline"
              >
                Learn About Our Studio
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
