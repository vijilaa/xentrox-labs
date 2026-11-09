import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 xs:py-16 bg-white">
      <div className="max-w-md w-full text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center justify-center w-16 xs:w-20 h-16 xs:h-20 rounded-2xl xs:rounded-3xl bg-lime-50 border border-lime-200 text-lime-600 mb-5 xs:mb-6 shadow-sm">
          <span className="text-2xl xs:text-3xl font-black font-mono tracking-tight">404</span>
        </div>

        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading mb-2.5 xs:mb-3">
          Page Not Found
        </h1>

        <p className="text-xs xs:text-sm text-slate-500 leading-relaxed mb-6 xs:mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-lime-400 hover:bg-lime-500 text-[#022620] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-lime-400/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Explore Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

