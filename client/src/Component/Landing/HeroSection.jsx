import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Users, Code2, MonitorPlay } from 'lucide-react';
import CodeEditor from './CodeEditor';

export default function HeroSection({ onOpenEnroll }) {
  const heroRef = useRef(null);
  const badgesRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);
  const editorWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Badges fade & move up
      tl.from(badgesRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
      })
        // 2. Headline words reveal with stagger
        .from(
          headlineRef.current.querySelectorAll('.hero-word'),
          {
            opacity: 0,
            y: 35,
            stagger: 0.05,
            duration: 0.8
          },
          '-=0.3'
        )
        // 3. Supporting subtitle fade in
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6
          },
          '-=0.4'
        )
        // 4. CTA buttons animate into view
        .from(
          ctaRef.current.children,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6
          },
          '-=0.3'
        )
        // 5. Trust indicators appear sequentially
        .from(
          trustRef.current.children,
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.5
          },
          '-=0.2'
        )
        // 6. Code editor enters with subtle upward scale transition
        .from(
          editorWrapperRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
            duration: 1.0,
            ease: 'expo.out'
          },
          '-=0.8'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToCourses = (e) => {
    e.preventDefault();
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineWords = [
    'Master',
    'Practical',
    'Software',
    'Engineering',
    'Inside',
    'an'
  ];

  return (
    <section
      ref={heroRef}
      className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-gradient-to-b from-[#F5F9F5] via-white to-white overflow-hidden border-b border-[#E5EAE5]"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-lime-400/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text, Badges, CTAs, Trust Indicators */}
          <div className="lg:col-span-6 space-y-6">
            {/* Small Badges */}
            <div ref={badgesRef} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#003F35] border border-[#E5EAE5] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
                Industry-Oriented Tech Finishing School
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#003F35] text-[#A3E635] shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#A3E635]" />
                2026 Batch Admissions Open
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading text-[#101828] tracking-tight leading-[1.12]"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="hero-word inline-block mr-2 sm:mr-3">
                  {word}
                </span>
              ))}
              <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#003F35] via-[#78B82A] to-[#84CC16]">
                Active Studio.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-[#667085] leading-relaxed font-normal max-w-xl"
            >
              XentroX Labs is the technology training academy of XentroX Solutions. Learn full-stack development, Python, AI, and digital marketing by working directly on active client projects with experienced engineers.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#courses"
                onClick={scrollToCourses}
                className="px-6 py-3.5 rounded-full text-xs font-bold text-white bg-[#003F35] hover:bg-[#052E27] shadow-xl shadow-[#003F35]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore 50+ Courses</span>
                <ArrowRight className="w-4 h-4 text-[#A3E635]" />
              </a>

              <button
                type="button"
                onClick={() => onOpenEnroll && onOpenEnroll('General Technical Inquiry')}
                className="px-6 py-3.5 rounded-full text-xs font-bold text-[#003F35] bg-[#A3E635] hover:bg-[#84CC16] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <Sparkles className="w-3.5 h-3.5 text-[#003F35]" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              ref={trustRef}
              className="pt-4 border-t border-[#E5EAE5] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#101828] font-bold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                <span>100% Practical Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                <span>Live Client Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#78B82A]" />
                <span>Working Tech Mentors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor Component */}
          <div ref={editorWrapperRef} className="lg:col-span-6 w-full">
            <CodeEditor />
          </div>
        </div>
      </div>
    </section>
  );
}
