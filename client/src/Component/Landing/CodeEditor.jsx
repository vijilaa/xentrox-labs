import React, { useState, useEffect } from 'react';
import { Terminal, GitBranch, Cpu, CheckCircle2, ShieldCheck, Sparkles, Play } from 'lucide-react';

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState('code');
  const [typingIndex, setTypingIndex] = useState(0);

  const terminalCommands = [
    'git status --short',
    'npm run deploy:studio-lab',
    '✓ 14 microservices verified',
    '✓ Atlas cluster synced [99.98% SLA]',
    '🚀 Live client deployment successful.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl bg-[#052E27] border border-[#003F35] shadow-2xl shadow-emerald-950/40 overflow-hidden font-mono text-xs select-none">
      {/* Ambient Radial Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Editor Top Titlebar */}
      <div className="bg-[#021f1a] px-4 py-3 flex items-center justify-between border-b border-[#003F35]/80">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#10B981]/90 inline-block" />
          <span className="ml-2 text-[11px] font-sans font-semibold text-emerald-300/80 hidden sm:inline">
            XentroX Studio Lab Engine — Production v2.4
          </span>
        </div>

        {/* Live Lab Indicator */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-lime-400/15 text-lime-300 border border-lime-400/30 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            Live Lab Active
          </span>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400/70">
            <GitBranch className="w-3.5 h-3.5 text-lime-400" />
            <span>feature/studio-client</span>
          </div>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="bg-[#032620] px-3 pt-2 flex items-center gap-1 border-b border-[#003F35]/60 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1.5 rounded-t-lg text-[11px] font-sans font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'code'
              ? 'bg-[#052E27] text-white border-t-2 border-lime-400'
              : 'text-emerald-400/70 hover:text-white'
          }`}
        >
          <span className="text-cyan-400 font-mono">⚛</span>
          <span>StudioLab.jsx</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api')}
          className={`px-3 py-1.5 rounded-t-lg text-[11px] font-sans font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'api'
              ? 'bg-[#052E27] text-white border-t-2 border-lime-400'
              : 'text-emerald-400/70 hover:text-white'
          }`}
        >
          <span className="text-amber-400 font-mono">⚡</span>
          <span>pipeline.service.js</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('terminal')}
          className={`px-3 py-1.5 rounded-t-lg text-[11px] font-sans font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'terminal'
              ? 'bg-[#052E27] text-white border-t-2 border-lime-400'
              : 'text-emerald-400/70 hover:text-white'
          }`}
        >
          <Terminal className="w-3 h-3 text-lime-400" />
          <span>telemetry.log</span>
        </button>
      </div>

      {/* Syntax Highlighted Code Area */}
      <div className="p-4 sm:p-5 text-[11.5px] leading-relaxed text-emerald-100 overflow-x-auto min-h-[220px]">
        {activeTab === 'code' && (
          <pre className="space-y-1">
            <code>
              <span className="text-purple-400">import</span> React, &#123; useState, useEffect &#125;{' '}
              <span className="text-purple-400">from</span> <span className="text-lime-300">'react'</span>;
            </code>
            <br />
            <code>
              <span className="text-emerald-400/60">// 🚀 Working alongside senior software engineers on live client code</span>
            </code>
            <br />
            <code>
              <span className="text-purple-400">export default function</span>{' '}
              <span className="text-cyan-300 font-bold">ClientTelemetryDashboard</span>() &#123;
            </code>
            <br />
            <code className="pl-4">
              <span className="text-purple-400">const</span> [metrics, setMetrics] ={' '}
              <span className="text-blue-300">useState</span>(&#123;{' '}
              <span className="text-lime-300">latency</span>: <span className="text-amber-300">14</span>,{' '}
              <span className="text-lime-300">status</span>: <span className="text-lime-300">'HEALTHY'</span> &#125;);
            </code>
            <br />
            <code className="pl-4">
              <span className="text-purple-400">const</span> sprintSprintGoal ={' '}
              <span className="text-lime-300">'LEARN • BUILD • GROW'</span>;
            </code>
            <br />
            <code className="pl-4">
              <span className="text-purple-400">return</span> (
            </code>
            <br />
            <code className="pl-8">
              &lt;<span className="text-cyan-400">StudioLab</span> <span className="text-amber-300">realProjects</span>=&#123;<span className="text-lime-300">true</span>&#125; <span className="text-amber-300">mentor</span>=<span className="text-lime-300">"Subin S &amp; Team"</span>&gt;
            </code>
            <br />
            <code className="pl-12">
              &lt;<span className="text-cyan-400">ProductionWorkflow</span> <span className="text-amber-300">gitSync</span>=<span className="text-lime-300">"automated"</span> /&gt;
            </code>
            <br />
            <code className="pl-8">
              &lt;/<span className="text-cyan-400">StudioLab</span>&gt;
            </code>
            <br />
            <code className="pl-4">);</code>
            <br />
            <code>&#125;</code>
          </pre>
        )}

        {activeTab === 'api' && (
          <pre className="space-y-1">
            <code>
              <span className="text-emerald-400/60">// Automated CI/CD Pipeline &amp; MongoDB Atlas Indexing</span>
            </code>
            <br />
            <code>
              <span className="text-purple-400">const</span> deployPayload = &#123;
            </code>
            <br />
            <code className="pl-4">
              <span className="text-lime-300">academy</span>: <span className="text-lime-300">"XentroX Labs"</span>,
            </code>
            <br />
            <code className="pl-4">
              <span className="text-lime-300">studioBacking</span>: <span className="text-lime-300">"XentroX Solutions"</span>,
            </code>
            <br />
            <code className="pl-4">
              <span className="text-lime-300">hiringPartners</span>: <span className="text-amber-300">100</span>,
            </code>
            <br />
            <code className="pl-4">
              <span className="text-lime-300">placementRate</span>: <span className="text-lime-300">"98%"</span>
            </code>
            <br />
            <code>&#125;;</code>
          </pre>
        )}

        {activeTab === 'terminal' && (
          <pre className="space-y-1">
            <code className="text-emerald-400/70"># Initializing production socket feed...</code>
            <br />
            <code className="text-cyan-300">[INFO] Connected to MongoDB Atlas cluster "xentroxlabscluster"</code>
            <br />
            <code className="text-lime-300">[OK] 50+ Specialized Courses Loaded</code>
            <br />
            <code className="text-lime-300">[OK] Student Project Sandboxes: Active</code>
            <br />
            <code className="text-amber-300">[STATUS] 2026 Batch Admissions Open</code>
          </pre>
        )}
      </div>

      {/* Terminal Footer with Live Typing Simulation */}
      <div className="bg-[#021814] px-4 py-2.5 border-t border-[#003F35]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 text-emerald-300 font-mono">
          <span className="text-lime-400 font-extrabold">&gt;</span>
          <span className="text-white font-semibold">
            {terminalCommands[typingIndex]}
          </span>
          <span className="inline-block w-2 h-3.5 bg-lime-400 animate-pulse ml-0.5 align-middle" />
        </div>

        {/* Tech Stack Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 font-sans text-[10px] font-bold">
            React 19
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-emerald-300 font-sans text-[10px] font-bold">
            Node.js
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-lime-300 font-sans text-[10px] font-bold">
            MongoDB
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-amber-300 font-sans text-[10px] font-bold">
            Docker
          </span>
        </div>
      </div>
    </div>
  );
}
