import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target, Eye,
  Zap, Shield, BookOpen, Users,
  Code2, Megaphone, Paintbrush
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Zap, title: 'Production-First Learning', desc: 'Train on the exact tools, frameworks, and workflows used to ship real client software — not toy examples.' },
  { icon: Shield, title: 'Measurable Competence', desc: 'We issue credentials backed by verifiable GitHub repositories and real commercial code delivery.' },
  { icon: BookOpen, title: 'Practicing Engineers', desc: 'All sessions are guided by active software architects and digital marketers who build for clients.' },
  { icon: Users, title: 'Placement-Driven Culture', desc: 'Career assistance starts on Day 1 — including resume audits, code reviews, and mock technical rounds.' },
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
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect user's motion preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // ── 1. Page Hero Banner Animations ──
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      heroTl
        .fromTo('.about-hero-bg',
          { scale: 1.06, opacity: 0.8 },
          { scale: 1.0, opacity: 1, duration: 1.3, ease: 'power2.out' }
        )
        .fromTo('.about-hero-title',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.6'
        )
        .fromTo('.about-hero-sub',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );

      // Parallax scroll on hero background
      gsap.to('.about-hero-bg', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // ── 2. Mission & Vision Dual Cards ──
      gsap.fromTo('.mv-card',
        { y: 35, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mv-section',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo('.mv-icon-badge',
        { scale: 0.6, rotate: -15, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.16,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: '.mv-section',
            start: 'top 82%',
          },
        }
      );

      // Ambient gentle floating waves
      gsap.to('.mv-wave-left', {
        x: 6,
        y: -4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.mv-wave-right', {
        x: -6,
        y: 4,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ── 3. Story Section (/image.png) ──
      // Subtle background parallax
      gsap.to('.story-bg-img', {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Story Content Sequence
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' },
      });

      storyTl
        .fromTo('.story-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }
        )
        .fromTo('.story-eyebrow',
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          '-=0.35'
        )
        .fromTo('.story-headline',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        )
        .fromTo('.story-paragraph',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo('.story-badge-item',
          { scale: 0.88, y: 12, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.2'
        );

      // ── 5. Core Values Cards ──
      gsap.fromTo('.value-card',
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 bg-white selection:bg-lime-200 selection:text-slate-900">

      {/* ── 1. Page Banner: Building a Digital Future for Kanyakumari ── */}
      <section className="about-hero-section relative overflow-hidden bg-[#03231d] text-white">
        {/* Background Artwork Image: /aboutus.png with parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/aboutus.png"
            alt="Building a Digital Future for Kanyakumari"
            className="about-hero-bg w-full h-full object-cover object-[70%_center] md:object-center select-none will-change-transform"
            fetchPriority="high"
          />

          {/* Left subtle gradient vignette for pristine contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(3, 35, 29, 0.45) 0%, transparent 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-18 md:py-22 lg:py-26 relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow Pill */}


            {/* Headline */}
            <h1 className="about-hero-title text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold font-heading tracking-tight text-white leading-[1.14] mb-3 sm:mb-4 drop-shadow-md">
              Building a Digital Future for{' '}
              <span className="text-[#84CC16]">Kanyakumari.</span>
            </h1>

            {/* Subtitle */}
            <p className="about-hero-sub text-xs sm:text-sm md:text-base text-slate-100/95 max-w-lg leading-relaxed drop-shadow-sm font-normal">
              Empowering local businesses, creating opportunities for youth and driving innovation through technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Dual Mission & Vision Cards Section ── */}
      <section className="mv-section relative bg-white py-8 sm:py-14 lg:py-16 overflow-hidden border-b border-[#E2EBE5]">
        {/* Decorative background contour waves with floating ambient motion */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Bottom-left flowing waves */}
          <svg
            className="mv-wave-left absolute -bottom-6 -left-10 w-96 h-48 text-emerald-500/20 will-change-transform"
            viewBox="0 0 400 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M-20,180 C80,120 160,190 260,130 C320,95 360,110 420,70" />
            <path d="M-20,150 C70,90 170,160 270,100 C330,65 370,80 430,40" />
            <path d="M-20,120 C60,60 180,130 280,70 C340,35 380,50 440,10" />
          </svg>

          {/* Bottom-right flowing waves */}
          <svg
            className="mv-wave-right absolute -bottom-8 -right-10 w-96 h-48 text-emerald-500/20 will-change-transform"
            viewBox="0 0 400 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M-20,80 C60,130 150,70 250,130 C320,170 360,150 420,190" />
            <path d="M-20,50 C70,100 160,40 260,100 C330,140 370,120 430,160" />
            <path d="M-20,20 C80,70 170,10 270,70 C340,110 380,90 440,130" />
          </svg>
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

            {/* Card 1: OUR MISSION */}
            <div className="mv-card p-6 sm:p-7 md:p-8 rounded-2xl bg-[#F4FAF7] border border-[#D1EBE0] flex items-start gap-4 sm:gap-5 shadow-xs hover:border-lime-500 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
              <div className="mv-icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#bbf7d0] transition-all duration-300">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#15803D] stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-[13px] font-bold font-heading text-[#15803D] tracking-wider uppercase mb-2 group-hover:text-emerald-700 transition-colors">
                  OUR MISSION
                </h2>
                <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed font-normal">
                  To empower local businesses through digital transformation, create opportunities for young people through technology and build innovative software products that make a global impact.
                </p>
              </div>
            </div>

            {/* Card 2: OUR VISION */}
            <div className="mv-card p-6 sm:p-7 md:p-8 rounded-2xl bg-[#F4FAF7] border border-[#D1EBE0] flex items-start gap-4 sm:gap-5 shadow-xs hover:border-lime-500 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
              <div className="mv-icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#bbf7d0] transition-all duration-300">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-[#15803D] stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-[13px] font-bold font-heading text-[#15803D] tracking-wider uppercase mb-2 group-hover:text-emerald-700 transition-colors">
                  OUR VISION
                </h2>
                <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed font-normal">
                  To transform Kanyakumari into an emerging IT and innovation hub, where local talent build technology for the world.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Story Section: About XentroX Labs (with /image.png) ── */}
      <section className="story-section relative overflow-hidden bg-[#F4FAF7]">
        {/* Full-bleed Background Artwork Image with smooth parallax */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/image.png"
            alt="About XentroX Labs - Turning Local Dreams Into Global Opportunities"
            className="story-bg-img w-full h-[108%] -top-[4%] relative object-cover object-[24%_center] sm:object-[28%_center] md:object-[32%_center] lg:object-center select-none will-change-transform"
            loading="lazy"
          />

          {/* Soft left-edge blend on small screens so text has pristine contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/70 lg:hidden pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

            {/* Left 6 columns spacer on desktop so Thiruvalluvar Statue, Vivekanandar Rock, & Kanyakumari Digi Map are completely clear */}
            <div className="hidden lg:block lg:col-span-6" aria-hidden="true" />

            {/* Right 6 columns: Story Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 lg:pl-4 xl:pl-8">
              {/* Eyebrow: — ABOUT XENTROX LABS */}
              <div className="flex items-center gap-3">
                <span className="story-rule w-8 sm:w-10 h-[2px] bg-[#15803D] rounded-full origin-left" />
                <span className="story-eyebrow text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#15803D] uppercase font-heading">
                  About XentroX Labs
                </span>
              </div>

              {/* Headline: Turning Local Dreams Into Global Opportunities. */}
              <h2 className="story-headline text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[44px] font-extrabold font-heading text-slate-900 leading-[1.18] tracking-tight">
                Turning Local Dreams <br className="hidden sm:inline" />
                <span className="text-[#15803D]">Into Global Opportunities.</span>
              </h2>

              {/* Story Paragraphs */}
              <div className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm md:text-[14.5px] lg:text-[15px] leading-relaxed font-normal">
                <p className="story-paragraph">
                  XentroX Labs was born from a powerful vision — to put Kanyakumari on the map as a growing hub for businesses, technology, and digital innovation.
                </p>
                <p className="story-paragraph">
                  We believe that businesses in Kanyakumari deserve the same opportunities, digital presence, and growth potential as leading companies in major cities. Through Kanyakumari DigiMission, we aim to bridge this gap by helping local businesses embrace digital transformation, build strong brands, reach wider audiences, and compete confidently in the modern marketplace.
                </p>
                <p className="story-paragraph">
                  By bringing together digital marketing, creative design, and web development under one roof, XentroX Labs helps turn local ideas into ambitious businesses. Based across Marthandam, Tamil Nadu, and Trivandrum, Kerala, we are working towards a future where businesses from Kanyakumari don’t just grow locally — they stand alongside leading firms across India and beyond.
                </p>
              </div>

              {/* Bottom Services Strip: Digital Marketing | Creative Design | Web Development */}
              <div className="pt-2 sm:pt-5 flex flex-wrap sm:flex-nowrap items-center gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
                {/* 1. Digital Marketing */}
                <div className="story-badge-item group flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E6F4EA] border border-[#C8E6C9]/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#d4f8e0] transition-all duration-300">
                    <Megaphone className="w-5 h-5 text-[#15803D]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 whitespace-nowrap group-hover:text-emerald-800 transition-colors">
                    Digital Marketing
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-px h-7 bg-slate-300/80" aria-hidden="true" />

                {/* 2. Creative Design */}
                <div className="story-badge-item group flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E6F4EA] border border-[#C8E6C9]/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#d4f8e0] transition-all duration-300">
                    <Paintbrush className="w-5 h-5 text-[#15803D]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 whitespace-nowrap group-hover:text-emerald-800 transition-colors">
                    Creative Design
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-px h-7 bg-slate-300/80" aria-hidden="true" />

                {/* 3. Web Development */}
                <div className="story-badge-item group flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E6F4EA] border border-[#C8E6C9]/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#d4f8e0] transition-all duration-300">
                    <Code2 className="w-5 h-5 text-[#15803D]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 whitespace-nowrap group-hover:text-emerald-800 transition-colors">
                    Web Development
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Studio Facilities Showcase ── */}


      {/* ── 5. Core Values ── */}
      <section className="values-section py-12 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <span className="text-xs font-bold tracking-wider text-lime-700 uppercase">
              Core Principles
            </span>
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900 tracking-tight mt-1">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="value-card p-6 rounded-2xl bg-white border border-[#E2EBE5] hover:border-lime-500/80 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime-50 border border-lime-200/60 flex items-center justify-center mb-4 group-hover:bg-lime-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-5 h-5 text-lime-700" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
