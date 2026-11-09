import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Layers,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenEnroll }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.hero-heading',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-primary-btn',
          { y: 14, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45 },
          '-=0.2'
        )
        .fromTo(
          '.hero-secondary-btn',
          { y: 14, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45 },
          '-=0.3'
        )
        .fromTo(
          '.hero-trust',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.15'
        );

      // Warm golden breathing aura behind the statue
      gsap.to('.hero-statue-glow', {
        opacity: 0.85,
        scale: 1.08,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Subtle slow parallax on scroll
      gsap.to('.hero-panorama-img', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section relative isolate flex items-center overflow-hidden"
    >
      {/* ── Panoramic Artwork as the Full Hero Canvas ── */}
      <div className="hero-panorama absolute inset-0 -z-20 overflow-hidden">
        <img
          src="/kanyakumari-tech-hero.png"
          alt="XentroX Labs - Practical Tech Education with Kanyakumari Coastline & Modern Tech Skyline"
          className="hero-panorama-img h-full w-full object-cover object-[36%_38%] sm:object-left lg:object-[28%_center] xl:object-[35%_center]"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* ── Soft Vignette Overlays for Flawless Readability & Section Blending ── */}
      {/* Left dark gradient behind text */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hero-left-vignette"
      />

      {/* Top subtle fade to blend with navbar */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(3, 35, 29, 0.75) 0%, transparent 100%)',
        }}
      />

      {/* Bottom subtle fade to melt into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10"
        style={{
          background: 'linear-gradient(0deg, #03231d 0%, rgba(3, 35, 29, 0.5) 45%, transparent 100%)',
        }}
      />

      {/* Golden halo glow behind the Thiruvalluvar Statue */}
      <div className="hero-statue-glow pointer-events-none absolute -z-10" />

      {/* Pulsing micro-beacons on the tech nodes in the sky (desktop) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block overflow-hidden">
        {/* AI node beacon */}
        <div className="hero-node-beacon absolute left-[75.6%] top-[22.5%]">
          <span className="hero-beacon-ring" />
          <span className="hero-beacon-dot" />
        </div>
        {/* Code </> node beacon */}
        <div className="hero-node-beacon absolute left-[85.2%] top-[25.2%]">
          <span className="hero-beacon-ring hero-delay-1" />
          <span className="hero-beacon-dot" />
        </div>
        {/* Cloud node beacon */}
        <div className="hero-node-beacon absolute left-[64.6%] top-[31.5%]">
          <span className="hero-beacon-ring hero-delay-2" />
          <span className="hero-beacon-dot" />
        </div>
        {/* Laptop / device node beacon */}
        <div className="hero-node-beacon absolute left-[94.8%] top-[39.2%]">
          <span className="hero-beacon-ring hero-delay-3" />
          <span className="hero-beacon-dot" />
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <div className="hero-container relative z-10 mx-auto w-full max-w-[1440px] px-4 xs:px-5 pt-[88px] xs:pt-[96px] sm:pt-28 md:pt-32 lg:pt-20 pb-10 xs:pb-12 sm:pb-16 lg:pb-20">
        <div className="hero-copy max-w-md sm:max-w-lg lg:max-w-[480px] pt-0 sm:pt-2 lg:pt-16 xl:pt-20">

          {/* Headline - High-impact executive landing page typography */}
          <h1 className="hero-heading mb-4 sm:mb-6 font-heading text-2xl xs:text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-extrabold leading-[1.14] tracking-tight text-white">
            <span className="block text-white drop-shadow-xs">
              Connecting Kanyakumari
            </span>
            <span className="hero-heading-accent mt-1 sm:mt-1.5 block">
              to a Smarter World
            </span>
          </h1>

          {/* Action Buttons - Decreased size, sleek & modern with page-matched animations */}
          <div className="hero-actions mb-6 sm:mb-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <Link
              to="/courses"
              className="hero-primary-btn group inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold no-underline shadow-sm"
            >
              <span className="relative z-10">Explore 50+ Courses</span>
              <ArrowRight
                size={15}
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-1.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => onOpenEnroll?.()}
              className="hero-secondary-btn group inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white cursor-pointer"
            >
              <span>Enroll in Next Batch</span>
            </button>
          </div>

          {/* Key Trust Benefits with clean dividers */}
          <div className="hero-trust flex flex-wrap items-center gap-2 xs:gap-2.5 sm:gap-3.5 text-xs sm:text-[13px] font-medium text-white/90">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="shrink-0 text-lime-400" />
              <span className="font-semibold text-white/95">Practical Labs</span>
            </div>

            <span className="inline-block h-3.5 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <Layers size={15} className="shrink-0 text-lime-400" />
              <span className="font-semibold text-white/95">Live Projects</span>
            </div>

            <span className="hidden xs:inline-block h-3.5 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <Users size={15} className="shrink-0 text-lime-400" />
              <span className="font-semibold text-white/95">Expert Mentors</span>
            </div>
          </div>

        </div>
      </div>

      {/* Component-specific styles */}
      <style>{`
        .hero-section {
          position: relative;
          min-height: min(640px, 80svh);
          background: #03231d;
          color: #fff;
        }

        .hero-left-vignette {
          background: linear-gradient(
            90deg,
            rgba(3, 35, 29, 0.94) 0%,
            rgba(3, 35, 29, 0.85) 28%,
            rgba(3, 35, 29, 0.38) 42%,
            transparent 58%
          );
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: auto !important;
            padding-bottom: 2.5rem;
          }
          .hero-left-vignette {
            background: linear-gradient(
              90deg,
              rgba(3, 35, 29, 0.95) 0%,
              rgba(3, 35, 29, 0.82) 48%,
              rgba(3, 35, 29, 0.28) 72%,
              rgba(3, 35, 29, 0.08) 100%
            ) !important;
          }
          .hero-statue-glow {
            left: 76% !important;
            top: 36% !important;
            transform: translate(-50%, -50%) !important;
            width: 240px !important;
            height: 280px !important;
            opacity: 0.75 !important;
          }
        }

        .hero-heading {
          font-family: 'Outfit', var(--font-heading), sans-serif;
          letter-spacing: -0.03em;
        }

        .hero-heading-accent {
          background: linear-gradient(
            100deg,
            #e4fec5 0%,
            #a3e635 42%,
            #4ade80 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 20px rgba(163, 230, 53, 0.28));
          display: inline-block;
        }

        .hero-statue-glow {
          left: 45%;
          top: 30%;
          width: 320px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(255, 184, 65, 0.25) 0%,
            rgba(245, 158, 11, 0.12) 40%,
            transparent 72%
          );
          filter: blur(40px);
          opacity: 0.65;
        }

        /* Tech node pulsing beacon animations */
        .hero-node-beacon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);
        }

        .hero-beacon-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid rgba(163, 230, 53, 0.75);
          animation: beaconPulse 3.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        .hero-beacon-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #a3e635;
          box-shadow: 0 0 8px #a3e635;
          animation: beaconDotPulse 3.4s ease-in-out infinite;
        }

        .hero-delay-1 { animation-delay: 0.9s; }
        .hero-delay-2 { animation-delay: 1.7s; }
        .hero-delay-3 { animation-delay: 2.5s; }

        @keyframes beaconPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.9;
          }
          65% {
            transform: scale(2.4);
            opacity: 0;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        @keyframes beaconDotPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        /* ── Hero Buttons: Tech Pulse & Luminous Glow ── */
        .hero-primary-btn {
          position: relative;
          color: #04241d;
          background: linear-gradient(135deg, #c5f879 0%, #a3e635 48%, #84cc16 100%);
          box-shadow:
            0 0 0 0 rgba(163, 230, 53, 0.45),
            0 4px 18px rgba(163, 230, 53, 0.28);
          overflow: hidden;
          isolation: isolate;
          animation: heroPrimaryPulse 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transition:
            background 250ms ease,
            box-shadow 250ms ease,
            transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Diagonal high-tech light shimmer sweep across button */
        .hero-primary-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -120%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 100%
          );
          transform: rotate(25deg);
          animation: heroSheenSweep 3.6s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        .hero-primary-btn:hover {
          background: linear-gradient(135deg, #d9f99d 0%, #b7f35c 50%, #84cc16 100%);
          box-shadow:
            0 0 28px rgba(163, 230, 53, 0.55),
            0 6px 22px rgba(0, 0, 0, 0.35);
          transform: translateY(-2px);
          animation-play-state: paused;
        }

        .hero-primary-btn:active {
          transform: scale(0.97) translateY(0);
        }

        .hero-secondary-btn {
          position: relative;
          border: 1px solid rgba(163, 230, 53, 0.32);
          background: rgba(3, 35, 29, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          transition:
            background-color 250ms ease,
            border-color 250ms ease,
            box-shadow 250ms ease,
            transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-secondary-btn:hover {
          background: rgba(163, 230, 53, 0.12);
          border-color: rgba(163, 230, 53, 0.75);
          box-shadow:
            0 0 22px rgba(163, 230, 53, 0.28),
            0 6px 20px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .hero-secondary-btn:active {
          transform: scale(0.97) translateY(0);
        }

        /* Pulsing beacon indicator on next batch button */
        .hero-btn-beacon-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #a3e635;
          opacity: 0.75;
          animation: beaconPulse 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        .hero-btn-beacon-dot {
          position: relative;
          display: inline-flex;
          height: 100%;
          width: 100%;
          border-radius: 9999px;
          background: #a3e635;
          box-shadow: 0 0 6px #a3e635;
        }

        @keyframes heroPrimaryPulse {
          0%, 100% {
            box-shadow:
              0 0 0 0 rgba(163, 230, 53, 0.4),
              0 4px 16px rgba(163, 230, 53, 0.22);
          }
          50% {
            box-shadow:
              0 0 20px 2px rgba(163, 230, 53, 0.5),
              0 6px 24px rgba(163, 230, 53, 0.32);
          }
        }

        @keyframes heroSheenSweep {
          0%, 25% {
            left: -120%;
          }
          65%, 100% {
            left: 220%;
          }
        }

        .hero-primary-btn:focus-visible,
        .hero-secondary-btn:focus-visible {
          outline: 2px solid #c5f879;
          outline-offset: 3px;
        }

        @media (min-width: 1024px) {
          .hero-section {
            height: 84vh;
            min-height: 620px;
            max-height: 800px;
          }
        }

        @media (min-width: 1440px) {
          .hero-section {
            height: 82vh;
            max-height: 840px;
          }
        }

        @media (max-width: 1023px) {
          .hero-section {
            min-height: auto;
          }

          .hero-left-vignette {
            background: linear-gradient(
              180deg,
              rgba(3, 35, 29, 0.94) 0%,
              rgba(3, 35, 29, 0.86) 50%,
              rgba(3, 35, 29, 0.55) 80%,
              rgba(3, 35, 29, 0.35) 100%
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-section *,
          .hero-section *::before,
          .hero-section *::after,
          .hero-beacon-ring,
          .hero-beacon-dot {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
