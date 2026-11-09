import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { placementStages } from '../data/coursesData';
import {
  Briefcase, Award, Users, Clock, Star,
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
      <section className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden page-banner bg-[#022B22] scroll-reveal">
        {/* Background Artwork: Career roadmap & graduation illustration */}
        <img
          src="/image copy 4.png"
          alt="Career Placement Support"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-40 sm:opacity-90 lg:opacity-100"
        />

        {/* Subtle left-side dark gradient to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00221A]/95 via-[#00221A]/70 to-[#00221A]/40 sm:via-[#00221A]/40 sm:to-transparent pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10 py-10 sm:py-16">
          <div className="max-w-xl">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold font-heading tracking-tight text-white leading-[1.18] drop-shadow-md">
              Launch Your Career with Dedicated Industry Placement Support
            </h1>
          </div>
        </div>
      </section>

      {/* Key Placement Stats Bar */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#E2EBE5]">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div data-anim="stagger" data-stagger="90" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] text-center hover:border-lime-500/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center mx-auto mb-2.5 border border-lime-200/60">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#003831] font-heading leading-tight">{s.value}</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Placement Spotlight: Real Mock Session Image + Pillars */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Left Visual Card */}
            <div data-anim="fade-right" data-delay="100" className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2EBE5] shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                  alt="Career mentoring and job interview preparation"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono uppercase bg-lime-400 text-[#003831] px-2.5 py-0.5 rounded font-bold mb-2 inline-block">
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
            <div data-anim="fade-left" data-delay="150" className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
                  Comprehensive Training
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 leading-tight tracking-tight mt-1">
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
                      className="p-5 sm:p-6 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 flex flex-col"
                    >
                      <div className="w-9 h-9 rounded-xl bg-lime-50 border border-lime-200/60 text-lime-700 flex items-center justify-center mb-3 shrink-0">
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
      <section className="py-12 sm:py-20 lg:py-24 bg-[#F7FAF8] border-y border-[#E2EBE5]">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
              Proven Methodology
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 tracking-tight mt-1">
              The 6-Step Career Pipeline
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mt-2 sm:mt-2.5">
              From foundational gap audits to your first commercial software contract.
            </p>
          </div>

          <div data-anim="stagger" data-stagger="80" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {placementStages.map((stage, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#E2EBE5] hover:border-lime-500/70 hover:shadow-xs transition-all duration-200 flex flex-col"
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
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
            Industry Connections
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight mt-1 mb-2.5 sm:mb-3">
            Partnered with 100+ Companies Across India
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm mb-6 sm:mb-8">
            Our graduates work at tech agencies, product startups, enterprise IT firms, and remote digital marketing operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 max-w-3xl mx-auto">
            {[
              'Bangalore Product Startups', 'Trivandrum Technopark', 'Kochi Infopark IT Teams',
              'Chennai Tech Agencies', 'Remote Global Teams', 'Direct In-House Studio Placements'
            ].map(partner => (
              <span
                key={partner}
                className="px-4 py-2.5 rounded-xl bg-[#F7FAF8] border border-[#E2EBE5] text-xs font-bold text-slate-800 shadow-xs"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-20 bg-[#F7FAF8] border-t border-[#E2EBE5]">
        <div className="max-w-3xl w-full mx-auto px-4 xs:px-5 sm:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
              Got Questions?
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight mt-1">
              Common Questions About Placement
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-[#E2EBE5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-[#F7FAF8] transition-colors"
                >
                  <span className="text-xs sm:text-base font-bold text-slate-900">{faq.q}</span>
                  <span className="text-lime-700 font-bold text-lg sm:text-xl ml-3 sm:ml-4 shrink-0">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#F0F5F2] pt-3 sm:pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button
              type="button"
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="btn-primary text-xs sm:text-sm h-10 px-5.5 rounded-lg font-bold cursor-pointer inline-flex items-center justify-center gap-2 w-full xs:w-auto shadow-xs active:scale-95 transition-all"
            >
              Enroll &amp; Start Career Prep <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
