import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function AboutMissionBanner() {
  return (
    <div className="w-full">
      {/* ── Page Banner: Building a Digital Future for Kanyakumari (Matching Reference Model) ── */}
      <section className="relative overflow-hidden bg-[#03231d] text-white">
        {/* Background Artwork Image: /aboutus.png */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/aboutus.png"
            alt="Building a Digital Future for Kanyakumari"
            className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] md:object-center select-none"
            fetchPriority="high"
          />

          {/* Left-to-right atmospheric dark emerald gradient overlay so white copy is 100% crisp */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(2, 38, 32, 0.94) 0%, rgba(2, 38, 32, 0.85) 34%, rgba(2, 38, 32, 0.45) 54%, transparent 75%)',
            }}
          />

          {/* Subtle top shade */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(2, 38, 32, 0.5) 0%, transparent 100%)',
            }}
          />

          {/* Bottom seam blend */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 40%, transparent 100%)',
            }}
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 py-10 xs:py-14 sm:py-18 lg:py-24 relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow Pill: KANYAKUMARI TECH MISSION */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-lime-300 text-[10px] xs:text-[10.5px] sm:text-xs font-bold tracking-wide uppercase mb-3.5 backdrop-blur-sm shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              <span>KANYAKUMARI TECH MISSION</span>
            </div>

            {/* Headline: Building a Digital Future for Kanyakumari. */}
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-heading tracking-tight text-white leading-[1.15] xs:leading-[1.12] mb-3 sm:mb-4 drop-shadow-sm">
              Building a Digital Future for{' '}
              <span className="text-[#84CC16] block sm:inline">Kanyakumari.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200/95 max-w-xl leading-relaxed drop-shadow-sm font-normal">
              Empowering talents, fostering innovative ideas, and transforming Kanyakumari into a hub of technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dual Mission & Vision Cards Section (Matching Reference Model Directly Underneath Banner) ── */}
      <section className="bg-white py-6 sm:py-8 lg:py-10 border-b border-[#E2EBE5]">
        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">

            {/* Card 1: OUR MISSION */}
            <div className="p-4 xs:p-6 sm:p-7 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] flex items-start gap-3.5 xs:gap-4 sm:gap-5 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all duration-300 group">
              <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-lime-100 border border-lime-200 flex items-center justify-center shrink-0 text-[#003831] group-hover:scale-105 transition-transform duration-300">
                <Target className="w-4 xs:w-5 h-4 xs:h-5 text-[#003831] stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-[13px] font-bold font-heading text-[#003831] tracking-wider uppercase mb-1.5">
                  OUR MISSION
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  To empower local workforce through digital transformation, create opportunities for youth, and establish a thriving ecosystem that drives innovation and sustainable economic growth in our region.
                </p>
              </div>
            </div>

            {/* Card 2: OUR VISION */}
            <div className="p-4 xs:p-6 sm:p-7 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] flex items-start gap-3.5 xs:gap-4 sm:gap-5 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all duration-300 group">
              <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-[#003831] group-hover:scale-105 transition-transform duration-300">
                <Eye className="w-4 xs:w-5 h-4 xs:h-5 text-[#003831] stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-[13px] font-bold font-heading text-[#003831] tracking-wider uppercase mb-1.5">
                  OUR VISION
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  To transform Kanyakumari into a pioneering IT and innovation hub, where our talent leads breakthroughs worldwide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
