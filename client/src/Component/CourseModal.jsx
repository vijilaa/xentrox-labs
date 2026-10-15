import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Clock, Award, CheckCircle2, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

export default function CourseModal({ course, category, onClose, onOpenEnroll }) {
  useEffect(() => {
    if (course) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [course]);

  if (!course) return null;

  const modalJSX = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-backdrop"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-lime-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-[10000] animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F4F9F6] border border-[#DCEBE2] text-slate-500 hover:text-[#003831] hover:bg-lime-50 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-50 border border-lime-200 text-[#003831] text-xs font-extrabold uppercase tracking-wider mb-3.5">
          <Layers className="w-3.5 h-3.5 text-lime-600" />
          {category ? category.title : 'XentroX Labs Domain Academy'}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-[#003831] mb-4 pr-8 font-heading leading-tight">
          {course.name}
        </h3>

        {/* Meta Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#F4F9F6] border border-[#DCEBE2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime-100 flex items-center justify-center text-[#003831] shrink-0 font-bold">
              <Clock className="w-4 h-4 text-lime-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Duration</p>
              <p className="text-sm font-bold text-slate-900">{course.duration || 'Studio Cohort'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#003831] shrink-0 font-bold">
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Skill Level</p>
              <p className="text-sm font-bold text-slate-900">{course.level || 'All Levels'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-[#003831] shrink-0 font-bold">
              <BookOpen className="w-4 h-4 text-teal-700" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Training Format</p>
              <p className="text-sm font-bold text-slate-900">Practical Studio Lab</p>
            </div>
          </div>
        </div>

        {/* Syllabus & Practical Highlights */}
        <div className="space-y-4 mb-7">
          <h4 className="text-xs sm:text-sm font-bold text-[#003831] uppercase tracking-wider font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-600" />
            What You Build &amp; Master in this Track:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#DCEBE2] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 flex-shrink-0" />
              <span>Real commercial client software codebases &amp; live studio delivery.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#DCEBE2] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 flex-shrink-0" />
              <span>Weekly 1-on-1 code reviews with active software leads and architects.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#DCEBE2] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 flex-shrink-0" />
              <span>Mock technical interviews, DSA drills, and ATS-optimized resume polish.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#DCEBE2] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 flex-shrink-0" />
              <span>Recognized XentroX Labs graduation certification &amp; GitHub portfolio.</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-[#DCEBE2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DCEBE2] text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenEnroll) onOpenEnroll(course.name);
            }}
            className="w-full sm:w-auto btn-primary py-3 px-6 text-xs sm:text-sm rounded-xl font-extrabold cursor-pointer flex items-center justify-center gap-2 shadow-md btn-interactive"
          >
            <span>Enroll in {course.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modalJSX, document.body);
}
