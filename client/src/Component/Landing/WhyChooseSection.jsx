import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, MonitorPlay, Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const whyChooseCards = [
  {
    number: '01',
    title: 'Practical Hands-On Coding',
    icon: Code2,
    description:
      'Write code from Day 1. Solve real programming challenges and build robust applications with modern development tools.',
    bullets: [
      'Zero passive video lectures',
      'Daily paired coding & debugging tasks',
      'Production Git & GitHub workflows'
    ]
  },
  {
    number: '02',
    title: 'Real Client Project Experience',
    icon: MonitorPlay,
    description:
      'Learn project workflows, collaborate with agile teams, review code diffs, and understand enterprise engineering practices.',
    bullets: [
      'Actual client specs from XentroX Solutions',
      'Production deployment on AWS & Vercel',
      'Verifiable commercial experience letters'
    ]
  },
  {
    number: '03',
    title: 'Mentorship by Working Engineers',
    icon: Users,
    description:
      'Learn from experienced software architects, developers, and digital marketing leads who build client software every day.',
    bullets: [
      '1:1 line-by-line code reviews',
      'Architecture & clean code principles',
      'Direct guidance from lead architects'
    ]
  },
  {
    number: '04',
    title: 'Career & Placement Support',
    icon: Briefcase,
    description:
      'Prepare production portfolios, master technical interviews, practice live coding rounds, and connect with 100+ hiring partners.',
    bullets: [
      'ATS developer resume engineering',
      'Mock whiteboarding & DSA rounds',
      'Direct partner company introductions'
    ]
  }
];

export default function WhyChooseSection({ onOpenEnroll }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true
        }
      });

      // Cards staggered reveal with blur-to-sharp
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 45,
        filter: 'blur(6px)',
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#F5F9F5] border-b border-[#E5EAE5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#003F35] border border-[#E5EAE5] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
            The XentroX Advantage
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#101828] tracking-tight">
            Why Choose <span className="text-[#003F35]">XentroX Labs?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#667085] leading-relaxed">
            We focus on job readiness. Our training model replaces dry lectures with direct participation in active software and marketing projects.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E5EAE5] hover:border-[#78B82A] hover:shadow-xl hover:shadow-[#003F35]/8 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5] flex items-center justify-center group-hover:bg-[#003F35] group-hover:text-[#A3E635] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#F5F9F5] text-[#003F35]">
                      {card.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#101828] font-heading leading-snug group-hover:text-[#003F35] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#667085] mt-2.5 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5EAE5] space-y-2">
                  {card.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-[#101828]/80 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#78B82A] shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onOpenEnroll && onOpenEnroll('General Technical Inquiry')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#003F35] hover:bg-[#052E27] shadow-lg shadow-[#003F35]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Experience Our Practical Studio Labs</span>
            <ArrowRight className="w-4 h-4 text-[#A3E635]" />
          </button>
        </div>
      </div>
    </section>
  );
}
