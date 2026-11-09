import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Building2, Terminal, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StudioBanner({ onOpenEnroll }) {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const bgPatternRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text entrance
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
          once: true
        }
      });

      // Subtle parallax on background decorative grid
      if (bgPatternRef.current) {
        gsap.to(bgPatternRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="py-20 sm:py-24 bg-[#003F35] text-white relative overflow-hidden border-y border-[#052E27]"
    >
      {/* Decorative Technical Grid Pattern */}
      <div
        ref={bgPatternRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#A3E635 1px, transparent 1px), radial-gradient(#A3E635 1px, #003F35 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#052E27]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div ref={contentRef} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#A3E635] border border-white/15 backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5 text-[#A3E635]" />
            Powered by XentroX Solutions Tech Studio
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Train Inside the Same Studio That Ships Software to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-emerald-300">
              Global Clients.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Move beyond theoretical homework. Pair-program with engineers, review Git diffs, build production-ready applications, and understand how real software teams work.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenEnroll && onOpenEnroll('Live Studio Batch')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-extrabold text-[#003F35] bg-[#A3E635] hover:bg-[#84CC16] shadow-xl shadow-lime-950/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for Next Batch</span>
              <ArrowRight className="w-4 h-4 text-[#003F35]" />
            </button>

            <a
              href="#about-studio"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/about';
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Learn About Our Studio</span>
              <Terminal className="w-3.5 h-3.5 text-emerald-300" />
            </a>
          </div>

          {/* Quick Pillars */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs text-emerald-200/80">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
              <span>Real Git Code Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
              <span>Daily Agile Standups</span>
            </div>
            <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
              <span>Commercial Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
