import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function KickstartAcademyBanner({ onOpenEnroll }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (e) => {
    if (typeof onOpenEnroll === 'function') {
      e.preventDefault();
      onOpenEnroll();
    } else {
      navigate('/career-assistance');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full overflow-hidden
        bg-[#F4FDF5]
        border-t border-[#E1EFE4]
        min-h-[340px] sm:min-h-[430px] md:min-h-[470px] lg:min-h-[520px] xl:min-h-[560px]
        py-10 sm:py-16 md:py-20 lg:py-24
        flex items-center
      "
      aria-label="XentroX Academy - Kick Start Your Career"
    >
      {/* Panoramic Artwork Background: /Kickstartyour.career.png */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/Kickstartyour.career.png"
          alt="Kick Start Your Career with XentroX Academy"
          className="w-full h-full object-cover object-[82%_center] sm:object-[72%_center] md:object-[65%_center] lg:object-center select-none"
          loading="lazy"
        />

        {/* Soft edge blending gradients */}
        {/* Mobile / Tablet text contrast layer so copy is 100% readable on small screens */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#F4FDF5]/95 via-[#F4FDF5]/90 to-[#F4FDF5]/60 sm:from-[#F4FDF5]/80 sm:via-[#F4FDF5]/40 sm:to-transparent lg:hidden"
        />

        {/* Seamless top and bottom blending */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-6 sm:h-10 bg-gradient-to-b from-white/70 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-6 sm:h-10 bg-gradient-to-t from-[#EAF7F0]/70 to-transparent pointer-events-none"
        />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div
          className={`
            max-w-xl lg:max-w-2xl
            transition-all duration-700 ease-out
            motion-reduce:transition-none
            ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          {/* Eyebrow: — XENTROX ACADEMY — */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-12 h-[1.5px] bg-[#2E6B56]/50 rounded-full" />
            <span className="text-[10.5px] xs:text-[11px] sm:text-xs md:text-[13px] font-bold font-heading tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#2E6B56]">
              XENTROX ACADEMY
            </span>
            <span className="w-6 sm:w-12 h-[1.5px] bg-[#2E6B56]/50 rounded-full" />
          </div>

          {/* Headline: Kick Start Your Career. */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold font-heading text-[#12261E] leading-[1.12] sm:leading-[1.06] tracking-tight mb-3 sm:mb-4 drop-shadow-xs">
            Kick Start Your{' '}
            <span className="block text-[#1EA355]">Career.</span>
          </h2>

          {/* Description */}
          <p className="text-xs xs:text-sm sm:text-base lg:text-[17px] text-[#4A5D54] leading-relaxed max-w-lg mb-5 sm:mb-8 font-normal drop-shadow-xs">
            Learn in-demand skills, get mentored by experts, and step into a brighter future.
          </p>

          {/* CTA Button: Get Started → */}
          <div>
            <button
              type="button"
              onClick={handleClick}
              className="
                group
                inline-flex items-center justify-center gap-2.5
                rounded-full
                bg-[#0B382C] hover:bg-[#124937]
                text-white
                font-semibold
                text-xs sm:text-base
                px-6 py-3 sm:px-8 sm:py-4
                border border-[#0B382C] hover:border-lime-400/50
                shadow-[0_4px_14px_rgba(11,56,44,0.22)]
                hover:shadow-[0_10px_26px_rgba(11,56,44,0.32)]
                transition-all duration-300 ease-out
                hover:-translate-y-1
                active:scale-95
                cursor-pointer
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B382C]
              "
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-lime-400" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
