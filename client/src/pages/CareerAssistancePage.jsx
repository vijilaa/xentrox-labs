import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { placementStages } from '../data/coursesData';
import {
  Briefcase, Award, Users, Clock, Star, Sparkles,
  ArrowRight, CheckCircle2, ChevronDown, ShieldCheck,
  FileText, Code2, MessageSquare, Handshake
} from 'lucide-react';

export default function CareerAssistancePage({ onOpenEnroll }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const stats = [
    { value: '98%', label: 'Placement Support Success', icon: Award },
    { value: '100+', label: 'Hiring Partner Network', icon: Users },
    { value: '500+', label: 'Trainees Placed', icon: Star },
    { value: '30 Days', label: 'Avg. Time to Job Offer', icon: Clock },
  ];

  const pillars = [
    {
      icon: FileText,
      title: 'ATS Resume & GitHub Audit',
      desc: 'We transform your resume into an ATS-clearing document with verified metrics and clean GitHub code repositories.'
    },
    {
      icon: Code2,
      title: 'Technical Whiteboard & DSA',
      desc: 'Weekly mock coding interviews, algorithmic problem solving, and architecture question rounds with senior engineers.'
    },
    {
      icon: MessageSquare,
      title: 'Behavioral & STAR Coaching',
      desc: 'Master communication, client handling, salary negotiations, and behavioral questions with realistic role-playing.'
    },
    {
      icon: Handshake,
      title: 'Direct Hiring Referrals',
      desc: 'Direct introductions to founders, CTOs, and HR leads across our 100+ hiring partners in South India and remote teams.'
    }
  ];

  const faqs = [
    {
      q: 'When does placement support begin?',
      a: 'Career readiness starts on Day 1 with GitHub commit discipline and clean code practices. Formal mock interviews, resume audits, and hiring partner pipelines begin 6 weeks before course completion.'
    },
    {
      q: 'Do you support candidates with non-CS or gap backgrounds?',
      a: 'Yes — over 40% of our successful alumni come from non-CS degrees or career breaks. Modern tech companies prioritize working codebases, deployed applications, and problem-solving over college degrees.'
    },
    {
      q: 'How many mock interviews do trainees receive?',
      a: 'You get unlimited mock rounds with practicing engineers until you comfortably pass benchmark evaluations in data structures, architecture, and behavioral communication.'
    },
    {
      q: 'What types of companies hire from XentroX Labs?',
      a: 'Leading tech agencies, fast-scaling product startups in Bangalore, Chennai, Kochi, and Trivandrum, plus international remote engineering companies.'
    }
  ];

  return (
    <div className="pt-20 bg-white">

      {/* Page Banner with visual overlay */}
      <section className="relative bg-[#033B32] py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80"
            alt="Career mentoring and technical interview preparation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/95 to-[#064E3B]/90 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-xs font-mono mb-3 flex items-center gap-2 text-lime-400/80">
            <Link to="/" className="hover:text-lime-300 transition-colors">Home</Link>
            <span className="text-lime-400/40">/</span>
            <span className="text-lime-400">Career Assistance</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            End-to-End Placement Assistance
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight mb-4 max-w-2xl">
            Launch Your Career with Dedicated Industry Placement Support
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            From your very first code review to your final offer letter — our dedicated career cell prepares you with ATS resumes, GitHub polish, rigorous mock interviews, and direct employer introductions.
          </p>
        </div>
      </section>

      {/* Key Placement Stats Bar */}
      <section className="py-10 bg-white border-b border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#D4E8DC] text-center hover:border-lime-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center mx-auto mb-2 border border-lime-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-[#033B32] font-heading leading-tight">{s.value}</p>
                  <p className="text-xs font-bold text-slate-600 mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Placement Spotlight: Real Mock Session Image + Pillars */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#D4E8DC] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                  alt="Career mentoring and job interview preparation"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono uppercase bg-lime-400 text-[#022620] px-2.5 py-0.5 rounded font-bold mb-2 inline-block">
                    1-on-1 Guidance
                  </span>
                  <h4 className="text-lg font-bold font-heading">
                    Trained by Real Engineers, Hired by Top Companies
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Direct access to lead software developers and hiring managers throughout your journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="institute-badge mb-3">Our Core Strategy</span>
                <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 leading-tight">
                  How We Get You Hired
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Our comprehensive placement program prepares every candidate across technical, algorithmic, and interpersonal benchmarks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAFCFA] border border-[#D4E8DC] hover:border-lime-500 transition-all flex flex-col"
                    >
                      <div className="w-9 h-9 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center mb-3 shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-base font-bold font-heading text-slate-900 mb-1.5">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6-Step Placement Pipeline */}
      <section className="py-16 sm:py-20 bg-[#FAFCFA] border-y border-[#D4E8DC]">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="institute-badge mb-3">Roadmap to Offer Letter</span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">
              The 6-Step Career Pipeline
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              From foundational gap audits to your first commercial software contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {placementStages.map((stage, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-[#D4E8DC] hover:border-lime-500 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-lime-700 bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
                    Step {stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-2">{stage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partner Callout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="institute-badge mb-3">Employment Network</span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 mb-4">
            Partnered with 100+ Companies Across India
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm mb-8">
            Our graduates work at tech agencies, product startups, enterprise IT firms, and remote digital marketing operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {[
              'Bangalore Product Startups', 'Trivandrum Technopark', 'Kochi Infopark IT Teams',
              'Chennai Tech Agencies', 'Remote Global Teams', 'Direct In-House Studio Placements'
            ].map(partner => (
              <span
                key={partner}
                className="px-4 py-2.5 rounded-xl bg-[#FAFCFA] border border-[#D4E8DC] text-xs font-bold text-slate-700 shadow-xs"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-[#FAFCFA] border-t border-[#D4E8DC]">
        <div className="max-w-3xl w-full mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <span className="institute-badge mb-3">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              Common Questions About Placement
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-[#D4E8DC] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-[#FAFCFA]"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</span>
                  <span className="text-lime-700 font-bold text-xl ml-4 shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EEF3F0] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="btn-primary text-sm sm:text-base py-3.5 px-9 rounded-xl font-extrabold cursor-pointer inline-flex items-center gap-2 shadow-md"
            >
              Enroll &amp; Start Career Prep <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
