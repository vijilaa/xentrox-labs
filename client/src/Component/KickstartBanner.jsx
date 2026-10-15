import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Award, Briefcase, Sparkles, Star } from 'lucide-react';

const services = [
  {
    icon: Award,
    title: 'ATS Resume Engineering',
    points: ['ATS-optimized templates', 'Keyword-rich tech profiles', 'Quantified project outcomes', 'GitHub & portfolio linking'],
  },
  {
    icon: Users,
    title: 'Technical Mock Rounds',
    points: ['DSA & system design', 'Behavioral STAR coaching', 'Framework deep dives', 'Salary negotiation'],
  },
  {
    icon: Briefcase,
    title: 'Direct Hiring Referrals',
    points: ['100+ hiring partner companies', 'Bangalore, Chennai, TVM, Kochi', 'Remote engineering teams', 'Product firms & startups'],
  },
];

export default function KickstartBanner({ onOpenEnroll }) {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 bg-[#033B32] relative overflow-hidden text-white">
      {/* Background imagery with subtle dark overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&auto=format&fit=crop&q=80"
          alt="Successful hiring handshake & career placement"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#033B32] via-[#033B32]/95 to-[#064E3B]/90 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Career &amp; Placement Support
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white leading-tight">
              Launch Your Career with XentroX Labs
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              We don't just teach code — we coach you all the way through mock interviews, GitHub audits, and direct company referrals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/career-assistance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-[#022620] text-sm font-extrabold hover:bg-lime-300 transition-colors shadow-md no-underline"
            >
              <span>View Placement Program</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Service Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/5 border border-lime-500/20 hover:border-lime-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col backdrop-blur-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center mb-5 shrink-0">
                  <Icon className="w-6 h-6 text-lime-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-4">{svc.title}</h3>
                <ul className="space-y-2.5 flex-1">
                  {svc.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-lime-500/20">
          {[
            { value: '98%', label: 'Placement Success Rate' },
            { value: '100+', label: 'Hiring Partners' },
            { value: '500+', label: 'Trainees Placed' },
            { value: '30 Days', label: 'Avg. Offer Timeframe' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-black text-lime-400 font-heading leading-tight">{stat.value}</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
