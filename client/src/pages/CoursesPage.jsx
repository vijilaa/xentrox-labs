import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCategories from "../Component/CourseCategories";
import { BookOpen, Code2, Users, CheckCircle2, Award } from "lucide-react";

export default function CoursesPage({ onOpenEnroll, onSelectCourse }) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('track');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  return (
    <div className="pt-20 bg-white">

      {/* Page Banner: Industry-Oriented Tech & Marketing Courses (50vh Height) */}
      <section className="relative overflow-hidden bg-[#022B25] text-white min-h-[340px] sm:min-h-[420px] lg:min-h-[50vh] flex items-center scroll-reveal">
        {/* Full-bleed Seamless Background Image containing students artwork on left and clean gradient on right */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/courses-hero-clean.png"
            alt="Industry-Oriented Tech & Marketing Courses"
            className="w-full h-full object-cover object-[24%_center] sm:object-left lg:object-center select-none"
            fetchPriority="high"
          />

          {/* Left subtle overlay on smaller screens so text remains crisp */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#022B25]/90 sm:bg-gradient-to-r sm:from-[#022B25]/90 sm:via-[#022B25]/60 sm:to-transparent lg:hidden pointer-events-none"
          />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 relative z-10 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">

            {/* Left Column Spacer on desktop to showcase students collaboration artwork with 100% perfection */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-5" aria-hidden="true" />

            {/* Right Column: Content Block */}
            <div data-anim="fade-left" data-delay="200" className="lg:col-span-7 xl:col-span-7 lg:pl-6 xl:pl-8">
              {/* Headline */}
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold font-heading tracking-tight text-white leading-[1.15] mb-2.5 sm:mb-3 drop-shadow-sm">
                Industry-Oriented <br className="hidden sm:inline" />
                <span className="text-white">Tech &amp; Marketing </span>
                <span className="text-[#84CC16]">Courses</span>
              </h1>

              {/* Thin Divider Line */}
              <div className="w-full h-px bg-white/15 mb-4 sm:mb-5" />

              {/* Feature Badges matching reference 2-row layout */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-7 gap-y-2 text-xs sm:text-[13px] font-bold text-lime-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                    <span>Practical Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                    <span>Live Projects &amp; Case Studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#84CC16] shrink-0" />
                    <span>Guidance from Industry Experts</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Course Catalog Component */}
      <CourseCategories
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenEnroll={onOpenEnroll}
        onSelectCourse={onSelectCourse}
      />

    </div>
  );
}
