import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, BookOpen, CheckCircle2, Code2, Globe,
  Layers, Users, Award, Star, Terminal, Sparkles, ShieldCheck,
  Check, Laptop, GitPullRequest, Activity, Cpu, Server, Play
} from 'lucide-react';

/* ── Interactive Modern Studio Console Visual ── */
function HeroStudioConsole({ onOpenEnroll }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('code');

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Studio Workspace Card */}
      <div className="bg-[#022620] border border-[#045244] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-lime-400/50">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#011C17] px-5 py-3.5 flex items-center justify-between border-b border-[#033B32]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-xs" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-300 ml-1">
              xentrox-labs / studio-telematics
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[11px] font-mono text-lime-400 font-bold uppercase tracking-wider">
              Live Lab v2.4
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#011C17]/60 px-4 pt-2 border-b border-[#033B32] gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#022620] text-lime-400 border-t-2 border-lime-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>telemetry.service.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'review'
                ? 'bg-[#022620] text-lime-400 border-t-2 border-lime-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>PR Review #142</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'deploy'
                ? 'bg-[#022620] text-lime-400 border-t-2 border-lime-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Production Metrics</span>
          </button>
        </div>

        {/* Workspace Body */}
        <div className="p-5 font-mono text-xs">
          {activeTab === 'code' && (
            <div className="space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
              <div className="text-[11px] text-lime-400/90 font-bold mb-2">
                // Real Client Telematics Stream Engine · Trained on Day 45
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">01</span>
                <span><span className="text-pink-400">import</span> &#123; <span className="text-lime-300">useFleetStream</span> &#125; <span className="text-pink-400">from</span> <span className="text-amber-300">'@xentrox/engine'</span>;</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">02</span>
                <span><span className="text-pink-400">export function</span> <span className="text-cyan-300">TelemetryMonitor</span>() &#123;</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">03</span>
                <span className="pl-4"><span className="text-pink-400">const</span> &#123; <span className="text-lime-300">vehicles</span>, <span className="text-lime-300">latency</span> &#125; = <span className="text-cyan-300">useFleetStream</span>(&#123;</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">04</span>
                <span className="pl-8"><span className="text-slate-400">cluster:</span> <span className="text-amber-300">'south-india-hubs'</span>,</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">05</span>
                <span className="pl-8"><span className="text-slate-400">refreshMs:</span> <span className="text-purple-300">250</span></span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">06</span>
                <span className="pl-4">&#125;);</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">07</span>
                <span className="pl-4"><span className="text-pink-400">return</span> &lt;<span className="text-lime-300">LiveClusterMap</span> <span className="text-slate-400">data</span>=&#123;vehicles&#125; <span className="text-slate-400">status</span>=<span className="text-amber-300">"active"</span> /&gt;;</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-600 select-none w-5 text-right">08</span>
                <span>&#125;</span>
              </div>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="space-y-3 font-sans">
              <div className="p-3.5 rounded-2xl bg-[#033B32]/70 border border-lime-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-lime-400 font-mono">
                    Senior Architect Review · Sherin Singh
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    APPROVED
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  "Superb optimization on the MongoDB compound index. Latency reduced from 180ms to 14ms across South India hubs. Ready for client production deploy."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#011C17] border border-[#045244] text-slate-300">
                  <span className="text-slate-400 block text-[10px]">GIT COMMIT</span>
                  <span className="text-lime-300 font-bold">14 passed · 0 errors</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#011C17] border border-[#045244] text-slate-300">
                  <span className="text-slate-400 block text-[10px]">COVERAGE</span>
                  <span className="text-lime-300 font-bold">96.4% Unit Tests</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#011C17] border border-[#045244]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Real-Time Traffic</p>
                  <p className="text-lg font-black text-white font-mono mt-0.5">15,820 <span className="text-xs text-lime-400 font-normal">req/s</span></p>
                </div>
                <div className="p-3 rounded-2xl bg-[#011C17] border border-[#045244]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Cluster Uptime</p>
                  <p className="text-lg font-black text-lime-400 font-mono mt-0.5">99.98%</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#033B32]/70 border border-lime-500/30 text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">Deployed Client System:</span>
                Flowline Logistics Telematics Dashboard — Shipped directly by XentroX apprentice cohort.
              </div>
            </div>
          )}
        </div>

        {/* Studio Highlights Bar */}
        <div className="p-5 bg-[#011C17] border-t border-[#033B32] space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#022620] border border-[#045244] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-lime-400/15 border border-lime-400/30 text-lime-400 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Stack</p>
                <p className="text-xs font-bold text-white">React 19 • Python • AI</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#022620] border border-[#045244] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">Hiring Rate</p>
                <p className="text-xs font-bold text-white">98% Verified Offers</p>
              </div>
            </div>
          </div>

          {/* Social Proof & Direct Action */}
          <div className="flex items-center justify-between pt-2 border-t border-[#033B32]">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80'
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Trainee avatar"
                    className="w-7 h-7 rounded-full border-2 border-[#022620] object-cover"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300">500+ Trainees Placed</span>
            </div>

            <button
              onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
              className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Apply for Next Cohort <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Hero({ onOpenEnroll }) {
  const navigate = useNavigate();

  const pillars = [
    { icon: Layers, label: '100% Practical Labs' },
    { icon: Globe, label: 'Live Client Projects' },
    { icon: Users, label: 'Working Tech Mentors' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full bg-white pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden"
    >
      {/* Subtle tech background texture */}
      <div className="absolute inset-0 tech-bg-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Content: Headline & Value Proposition ── */}
          <div className="lg:col-span-7 space-y-7 animate-fade-up">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="institute-badge">
                <Star className="w-3.5 h-3.5 text-lime-600" />
                Industry-Oriented Tech Finishing School
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F4F9F6] text-slate-800 border border-[#D4E8DC] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                2026 Batch Admissions Open
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.12] font-heading text-slate-900">
                Master Practical Software <br className="hidden sm:inline" />
                <span className="text-[#033B32]">Engineering</span> Inside an{' '}
                <span className="text-lime-600">Active Studio.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              <strong className="text-slate-900 font-bold">XentroX Labs</strong> is the official technology training academy of{' '}
              <strong className="text-slate-900 font-bold">XentroX Solutions</strong>. Learn full-stack development, Python, AI, and digital marketing by working directly on active client codebases with senior engineers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to="/courses"
                className="btn-primary text-sm sm:text-base py-3.5 px-7 sm:px-8 rounded-xl font-extrabold inline-flex items-center gap-2 shadow-md no-underline"
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Explore 50+ Courses</span>
              </Link>
              <button
                onClick={() => onOpenEnroll ? onOpenEnroll() : navigate('/enroll')}
                className="btn-dark-green text-sm sm:text-base py-3.5 px-8 sm:px-9 rounded-xl font-bold cursor-pointer inline-flex items-center gap-2 shadow-sm"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4.5 h-4.5 text-lime-400" />
              </button>
            </div>

            {/* Key Pillars */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-[#D4E8DC]">
              {pillars.map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-lime-50 border border-lime-200 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-lime-700" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{p.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Trust Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { value: '500+', label: 'Trainees Placed' },
                { value: '98%', label: 'Placement Rate' },
                { value: '100+', label: 'Hiring Partners' },
                { value: '2 Studios', label: 'Marthandam & TVM' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#F4F9F6] border border-[#D4E8DC] text-center hover:border-lime-400 transition-colors"
                >
                  <p className="text-2xl font-black text-[#033B32] font-heading leading-none">{stat.value}</p>
                  <p className="text-[11px] font-medium text-slate-600 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Technology Visual: Modern Studio Console ── */}
          <div className="lg:col-span-5 relative animate-fade-up delay-100">
            <HeroStudioConsole onOpenEnroll={onOpenEnroll} />
          </div>

        </div>
      </div>
    </section>
  );
}
