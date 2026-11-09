import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Hammer, UserCheck, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const journeySteps = [
  {
    step: '01',
    title: 'Learn the Fundamentals',
    icon: BookOpen,
    subtitle: 'Month 1',
    description:
      'Master language core syntax, data structures, algorithm problem-solving, and clean coding standards from scratch.',
    bullets: ['Deep dive into ES6+ / Python syntax', 'Command-line power & Git setup', '1:1 daily syntax debugging']
  },
  {
    step: '02',
    title: 'Build Practical Projects',
    icon: Hammer,
    subtitle: 'Month 2',
    description:
      'Transition from basic syntax to full applications. Integrate databases, state management, REST APIs, and authentication.',
    bullets: ['Frontend & backend integration', 'MongoDB & SQL database models', 'Containerizing with Docker']
  },
  {
    step: '03',
    title: 'Work With Mentors',
    icon: UserCheck,
    subtitle: 'Month 3',
    description:
      'Pair-program with working software engineers from XentroX Solutions on production client codebases and live sprint workflows.',
    bullets: ['Real client project tickets', 'Line-by-line pull request reviews', 'Agile standups & code standards']
  },
  {
    step: '04',
    title: 'Prepare for Career Opportunities',
    icon: Briefcase,
    subtitle: 'Month 4',
    description:
      'Complete 1-on-1 technical mock interviews, polish your GitHub profile, optimize ATS resumes, and interview with hiring partners.',
    bullets: ['ATS developer resume optimization', 'Technical whiteboarding & DSA rounds', '100+ partner hiring referrals']
  }
];

export default function LearningJourney({ onOpenEnroll }) {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress line on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5
            }
          }
        );
      }

      // Staggered step entrance
      gsap.from(stepsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.16,
        duration: 0.8,
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
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5EAE5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#78B82A]" />
            Your Path to Industry Readiness
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#101828] tracking-tight">
            The XentroX <span className="text-[#003F35]">Learning Journey</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#667085] font-medium leading-relaxed">
            A structured, 4-stage engineering sprint transforming learners into confident, job-ready technology professionals.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-14 left-12 right-12 h-1 bg-[#E5EAE5] -z-0">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-[#003F35] via-[#78B82A] to-[#A3E635] origin-left"
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {journeySteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  ref={(el) => (stepsRef.current[idx] = el)}
                  className="flex flex-col rounded-3xl p-6 bg-[#F5F9F5] border border-[#E5EAE5] hover:border-[#78B82A] hover:bg-white hover:shadow-xl hover:shadow-[#003F35]/6 transition-all duration-300 group"
                >
                  {/* Step Marker Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#003F35] text-[#A3E635] flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono font-black text-[#003F35]">
                        STEP {item.step}
                      </span>
                      <span className="text-[10px] font-semibold text-[#667085]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#101828] font-heading leading-tight group-hover:text-[#003F35] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#667085] mt-2.5 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#E5EAE5] space-y-1.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-[#101828]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#78B82A] shrink-0" />
                        <span className="line-clamp-1">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#003F35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#052E27] shadow-xl">
          <div>
            <h4 className="text-xl font-bold font-heading text-white">
              Ready to begin Step 01?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Join upcoming weekday or weekend cohorts in Marthandam or Trivandrum.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnroll && onOpenEnroll('Next Cohort')}
            className="px-6 py-3 rounded-full text-xs font-bold text-[#003F35] bg-[#A3E635] hover:bg-[#84CC16] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer whitespace-nowrap"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
