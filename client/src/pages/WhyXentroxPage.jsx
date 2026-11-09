import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Boxes,
  MonitorPlay,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award
} from 'lucide-react';

export default function WhyXentroxPage({ onOpenEnroll }) {
  const navigate = useNavigate();

  const comparisonRows = [
    {
      feature: 'Curriculum Foundation',
      traditional: 'Outdated university syllabus or generic recorded videos',
      xentrox: 'Derived directly from live XentroX Solutions client production code'
    },
    {
      feature: 'Learning Format',
      traditional: 'Passive theory lectures and copy-pasting toy code',
      xentrox: '100% hands-on coding labs with Git, terminals, and real APIs'
    },
    {
      feature: 'Projects Built',
      traditional: 'Basic todo apps and calculators ignored by recruiters',
      xentrox: 'Full-stack client apps (Fleet telematics, SEO engines, E-Commerce)'
    },
    {
      feature: 'Faculty Profile',
      traditional: 'Academic lecturers without recent industry experience',
      xentrox: 'Working software engineers, solution architects & growth leads'
    },
    {
      feature: 'Code Reviews',
      traditional: 'None or automated regex checks that miss architecture flaws',
      xentrox: 'Weekly 1-on-1 human code reviews on code style, speed & security'
    },
    {
      feature: 'Placement Assistance',
      traditional: 'Random job board links sent via broadcast email',
      xentrox: 'ATS resume polish, technical mock rounds, and direct hiring referrals'
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* 1. Header */}
      <section className="py-10 xs:py-14 sm:py-20 bg-[#F8FAF8] border-b border-[#E2ECE6] transition-colors">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-bold font-heading tracking-tight text-slate-900 leading-[1.18] mb-3 sm:mb-4">
              Built for Real Job Readiness, Not Paper Certificates.
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              Most bootcamps teach isolated toy apps. At <strong>XentroX Labs</strong>, you train inside an active software development agency on production codebases that solve real client challenges.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Direct Comparison Table */}
      <section className="py-10 xs:py-14 sm:py-20 bg-white transition-colors">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading text-slate-900">
              XentroX Labs vs Traditional Institutes
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-slate-600 mt-2">
              See how our studio-driven apprenticeship model differs from standard coaching centers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E2ECE6] shadow-sm">
            <table className="w-full min-w-[580px] sm:min-w-[620px] text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAF8] border-b border-[#E2ECE6]">
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold text-slate-900 w-1/4">Feature</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold text-slate-500 w-3/8">Traditional Institutes</th>
                  <th className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold text-lime-700 w-3/8 bg-lime-50/50">
                    XentroX Labs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECE6]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-medium text-slate-900 bg-lime-50/30">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                        <span>{row.xentrox}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Box */}
          <div className="mt-10 sm:mt-14 p-5 xs:p-6 sm:p-8 rounded-2xl bg-[#F8FAF8] border border-[#E2ECE6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mb-1">
                Experience the Difference Yourself
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Attend a free 1-on-1 counseling session with our software mentors in Marthandam or Trivandrum.
              </p>
            </div>
            <button
              onClick={() => {
                if (onOpenEnroll) onOpenEnroll();
                else navigate('/enroll');
              }}
              className="btn-primary text-xs sm:text-sm h-10 px-5 rounded-lg font-bold whitespace-nowrap cursor-pointer shrink-0 active:scale-95 transition-all w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <span>Enroll / Book Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


