
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Award,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import logoSymbol from '../assets/Images/logo-symbol.png';

const services = [
  {
    icon: Award,
    title: 'ATS Resume & GitHub',
    desc: 'Resume and GitHub portfolio tailored to pass recruiter screens.',
    chips: ['ATS-Optimized', 'Portfolio Audits'],
  },
  {
    icon: Users,
    title: 'Live Mock Interviews',
    desc: '1-on-1 practical rounds covering DSA, system design, and HR.',
    chips: ['1-on-1 Feedback', 'System Design'],
  },
  {
    icon: Briefcase,
    title: 'Direct Referrals',
    desc: 'Direct recommendations to tech leads across 100+ partner companies.',
    chips: ['100+ Partners', 'TVM & Remote'],
  },
];

const statistics = [
  { target: 98, suffix: '%', label: 'Placement Success Rate' },
  { target: 100, suffix: '+', label: 'Hiring Partners' },
  { target: 500, suffix: '+', label: 'Engineers Placed' },
  { target: 30, suffix: ' Days', label: 'Avg. Offer Timeframe' },
];

function AnimatedNumber({ target, suffix = '', shouldStart }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      setCount(target);
      return;
    }

    let startTime = null;
    let frameId;

    const duration = 1300;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [shouldStart, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function KickstartBanner() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const section = sectionRef.current;
    const stats = statsRef.current;

    if (!section || !stats) return;

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    revealObserver.observe(section);
    statsObserver.observe(stats);

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  return (
    <div className="overflow-hidden">

      {/* Career Assistance Section */}
      <section
        ref={sectionRef}
        className="
          relative isolate overflow-hidden
          bg-[#03231d] text-white
          py-8 sm:py-10 lg:py-12
        "
      >
        {/* Panoramic Background Image - Brightened & Enhanced */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          <img
            src="/background.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[center_60%] lg:object-center select-none brightness-120 contrast-105"
            loading="lazy"
          />
        </div>

        {/* Multi-layer atmospheric emerald blending overlays - Lighter to reveal scenic details */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(3, 35, 29, 0.55) 0%, rgba(6, 60, 51, 0.30) 50%, rgba(3, 35, 29, 0.55) 100%)',
          }}
        />

        {/* Radial highlight to let the scenic coastal artwork and tech waves breathe through brightly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 94% 82% at 50% 50%, rgba(6, 60, 51, 0.04) 0%, rgba(3, 35, 29, 0.48) 100%)',
          }}
        />

        {/* Ambient lighting accents: vibrant golden sunrise aura on the left, luminous emerald aura on the right */}
        <div
          aria-hidden="true"
          className="absolute -left-16 top-1/4 w-80 h-80 rounded-full -z-10 pointer-events-none filter blur-[60px]"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-1/4 w-80 h-80 rounded-full -z-10 pointer-events-none filter blur-[60px]"
          style={{
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, transparent 70%)',
          }}
        />

        {/* Top & bottom seam fades to seamlessly melt into adjacent sections */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 -z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #03231d 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 -z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #03231d 0%, transparent 100%)',
          }}
        />

        <div
          className={`
            max-w-[1440px] w-full mx-auto
            px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16
            relative z-10
            transition-all duration-700 ease-out
            motion-reduce:transition-none
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
            }
          `}
        >

          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-7">

            <div className="flex items-center gap-3 sm:gap-4 min-w-0">

              <div className="shrink-0 flex items-center justify-center">
                <img
                  src={logoSymbol}
                  alt="XentroX Symbol"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold font-heading leading-tight tracking-tight text-white">
                  Launch Your Career with XentroX Labs
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Interview prep, verified project audits, and direct partner referrals.
                </p>
              </div>

            </div>

            <Link
              to="/career-assistance"
              className="
                group
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto self-start lg:self-center shrink-0
                px-4 xs:px-5 py-2.5
                rounded-lg
                bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400
                text-[#082C24]
                text-xs sm:text-sm font-bold
                no-underline
                shadow-sm hover:shadow-[0_4px_16px_rgba(132,204,22,0.35)]
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                active:scale-95
              "
            >
              <span>View Placement Program</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  style={{
                    transitionDelay: isVisible
                      ? `${index * 90}ms`
                      : '0ms',
                  }}
                  className={`
                    group min-w-0
                    flex flex-col
                    rounded-xl
                    border border-white/[0.12]
                    bg-[#03231d]/65
                    backdrop-blur-md
                    p-4 sm:p-4.5
                    shadow-md shadow-black/20
                    transition-all duration-300 ease-out
                    motion-reduce:transition-none
                    hover:bg-[#03231d]/85
                    hover:border-lime-300/40
                    hover:shadow-lime-400/5
                    hover:-translate-y-0.5
                    ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                    }
                  `}
                >

                  {/* Icon */}
                  <div className="
                    w-8 h-8
                    flex items-center justify-center
                    rounded-lg
                    bg-lime-400/10
                    border border-lime-300/20
                    text-lime-300
                    mb-2.5
                  ">
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>

                  {/* Service Content */}
                  <h3 className="text-sm sm:text-base font-semibold font-heading text-white leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1.5 mb-3.5 flex-1">
                    {service.desc}
                  </p>

                  {/* Service Features */}
                  <div className="
                    flex flex-wrap gap-1.5
                    pt-3
                    border-t border-white/10
                  ">
                    {service.chips.map((chip) => (
                      <span
                        key={chip}
                        className="
                          inline-flex items-center gap-1.5
                          text-[10.5px] font-medium
                          text-lime-200
                          bg-white/[0.045]
                          border border-white/10
                          px-2 py-1
                          rounded-md
                        "
                      >
                        <CheckCircle2
                          className="w-3 h-3 text-lime-400 shrink-0"
                        />
                        {chip}
                      </span>
                    ))}
                  </div>

                </article>
              );
            })}

          </div>

          {/* Placement Statistics Ribbon */}
          <div
            ref={statsRef}
            className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-white/15"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
              {statistics.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center text-center py-3 px-3 sm:py-3.5 sm:px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.07] hover:border-lime-400/30 transition-all duration-300"
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading tracking-tight text-[#84CC16] leading-tight tabular-nums">
                    <AnimatedNumber
                      target={stat.target}
                      suffix={stat.suffix}
                      shouldStart={hasAnimated}
                    />
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
