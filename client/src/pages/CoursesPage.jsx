import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCategories from "../Component/CourseCategories";
import { BookOpen, Sparkles, Code2, Users, CheckCircle2, Award } from "lucide-react";

export default function CoursesPage({ onOpenEnroll, onSelectCourse }) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('track');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  return (
    <div className="pt-20 bg-white">

      {/* Page Banner with visual training context */}
      <section className="relative bg-[#033B32] py-14 sm:py-20 overflow-hidden">
        {/* Soft background glow & imagery */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80"
            alt="Students collaborating in practical tech training"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/95 to-[#064E3B]/90 pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                50+ Industry-Curated Programs
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight mb-4">
                Industry-Oriented <br className="hidden sm:inline" />
                <span className="text-white">Tech &amp; Marketing </span>
                <span className="text-lime-400">Courses</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Learn from professionals. Work on real projects. Build your future.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10">
                {[
                  { label: 'Practical Training', icon: Code2 },
                  { label: 'Live Projects & Case Studies', icon: CheckCircle2 },
                  { label: 'Guidance from Industry Experts', icon: Users },
                  { label: 'Certification Support', icon: Award },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2 text-xs font-bold text-lime-300">
                      <Icon className="w-4 h-4 text-lime-400" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick highlight box */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <span className="text-[11px] font-mono uppercase text-lime-400 font-bold block mb-1">
                  XentroX Studio Advantage
                </span>
                <h3 className="text-lg font-bold font-heading mb-2">Real Job Readiness</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Graduates build 3+ production systems on GitHub, pass rigorous mock interview cycles, and receive direct referrals to our 100+ hiring partner network.
                </p>
                <button
                  onClick={() => onOpenEnroll ? onOpenEnroll() : null}
                  className="w-full py-2.5 px-4 bg-lime-400 hover:bg-lime-300 text-[#022620] font-extrabold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Schedule Free Counseling
                </button>
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
