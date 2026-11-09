
import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    id: 'practical',
    title: 'Learn by Doing',
    description: 'Build real projects from day one.',
    points: ['Hands-on coding', 'Git and code reviews'],
  },
  {
    id: 'projects',
    title: 'Real Projects',
    description: 'Create work that shows your skills.',
    points: ['Web and mobile apps', 'Portfolio-ready projects'],
  },
  {
    id: 'mentors',
    title: 'Expert Mentors',
    description: 'Learn from experienced developers.',
    points: ['Personal feedback', 'Code reviews'],
  },
  {
    id: 'career',
    title: 'Career Support',
    description: 'Prepare for your next step in tech.',
    points: ['Resume preparation', 'Interview practice'],
  },
];

export default function Highlights({ onOpenEnroll }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.why-reveal');

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('why-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('why-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-section relative isolate overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Soft transition from the dark hero */}
      <div
        aria-hidden="true"
        className="why-top-blend pointer-events-none absolute inset-x-0 top-0 -z-10"
      />

      {/* Subtle green background lighting */}
      <div
        aria-hidden="true"
        className="why-orb why-orb-one pointer-events-none absolute -z-10"
      />
      <div
        aria-hidden="true"
        className="why-orb why-orb-two pointer-events-none absolute -z-10"
      />

      <div className="why-container mx-auto w-full max-w-[1440px] px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading */}
        <div className="why-reveal why-up why-header mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <h2
              id="why-heading"
              className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight tracking-tight text-slate-900"
            >
              Why Choose{' '}
              <span className="text-[#003831]">
                XentroX Labs?
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              Think creatively. Build confidently. Grow your tech skills with hands-on practice.
            </p>
          </div>
        </div>

        {/* Image and feature cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 lg:grid-cols-5 lg:gap-8">

          {/* Featured image */}
          <div className="why-reveal why-left relative min-h-[260px] xs:min-h-[300px] overflow-hidden rounded-2xl border border-[#E2EBE5] bg-emerald-50 shadow-[0_12px_32px_rgba(3,59,50,0.06)] sm:min-h-[380px] lg:col-span-2 lg:min-h-[440px]">
            <img
              src="/why-us.png"
              alt="Students collaborating on creative technology and software projects"
              loading="lazy"
              className="why-feature-image absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Blend the image into the card */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#022620]/90 via-[#022620]/25 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <h3 className="max-w-sm font-heading text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                Ideas become real solutions.
              </h3>

              <p className="mt-2 max-w-xs text-xs sm:text-sm leading-6 text-white/85">
                Learn together. Build what matters.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3 lg:gap-5">
            {pillars.map((pillar, index) => {
              return (
                <article
                  key={pillar.id}
                  className="why-reveal why-up why-card group flex min-w-0 flex-col rounded-2xl border border-[#E2EBE5] bg-white p-5 sm:p-6 transition-all duration-300 hover:border-lime-500/60 hover:shadow-[0_14px_36px_rgba(3,59,50,0.08)] hover:-translate-y-1"
                  style={{
                    transitionDelay: `${index * 70}ms`,
                  }}
                >
                  <h3 className="font-heading text-base font-bold leading-snug text-slate-900">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-600 flex-1">
                    {pillar.description}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-[#EEF4F0] pt-4">
                    {pillar.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-lime-600"
                        />
                        <span className="font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .why-section {
          width: 100%;
          background: #FFFFFF;
          padding: 72px 0;
          color: #0f172a;
        }

        .why-top-blend {
          height: 100px;
          background: linear-gradient(
            180deg,
            rgba(187, 225, 202, 0.2) 0%,
            rgba(240, 250, 244, 0.35) 45%,
            transparent 100%
          );
        }

        .why-container {
          position: relative;
          z-index: 1;
        }

        .why-brand-text {
          color: #076747;
          background: linear-gradient(
            100deg,
            #087653,
            #075b43
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .why-orb {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.15;
        }

        .why-orb-one {
          top: 15%;
          left: -180px;
          background: #a3e635;
        }

        .why-orb-two {
          right: -180px;
          bottom: 5%;
          background: #34d399;
        }

        .why-header {
          min-width: 0;
        }

        .why-feature-image {
          transition: transform 700ms cubic-bezier(.2,.7,.2,1);
        }

        .why-section .why-reveal {
          opacity: 0;
          transition:
            opacity 550ms ease,
            transform 550ms cubic-bezier(.2,.7,.2,1),
            border-color 250ms ease,
            box-shadow 250ms ease;
        }

        .why-section .why-up {
          transform: translateY(16px);
        }

        .why-section .why-left {
          transform: translateX(-16px);
        }

        .why-section .why-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .why-card {
          box-shadow: 0 4px 18px rgba(7, 80, 55, 0.025);
        }

        .why-card:hover {
          border-color: #b5e4cb;
          box-shadow: 0 12px 28px rgba(7, 80, 55, 0.07);
          transform: translateY(-3px);
        }

        .why-apply-btn {
          background: linear-gradient(110deg, #087653, #075b43);
          box-shadow: 0 5px 14px rgba(7, 94, 65, 0.12);
        }

        .why-apply-btn:hover {
          box-shadow: 0 8px 20px rgba(7, 94, 65, 0.2);
        }

        @media (min-width: 1024px) {
          .why-section {
            padding-top: 58px;
            padding-bottom: 48px;
          }

          .why-header {
            margin-bottom: 32px;
          }
        }

        @media (max-width: 640px) {
          .why-section {
            padding-top: 38px;
            padding-bottom: 32px;
          }

          .why-header h2 {
            font-size: clamp(1.7rem, 6vw, 2.1rem);
          }

          .why-card {
            padding: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-section .why-reveal,
          .why-card,
          .why-feature-image,
          .why-icon-box,
          .why-apply-btn {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
