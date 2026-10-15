import React from 'react';
import { Code, Database, Globe, Cpu, Layers, Terminal, Sparkles, Smartphone, Shield } from 'lucide-react';

const techStack = [
  { name: "React.js", icon: Code, color: "text-cyan-500" },
  { name: "Node.js", icon: Terminal, color: "text-emerald-500" },
  { name: "Python", icon: Code, color: "text-amber-500" },
  { name: "Generative AI", icon: Cpu, color: "text-purple-500" },
  { name: "AWS Cloud", icon: Globe, color: "text-orange-500" },
  { name: "SQL & Databases", icon: Database, color: "text-blue-500" },
  { name: "Digital Marketing", icon: Layers, color: "text-pink-500" },
  { name: "UI/UX & Figma", icon: Sparkles, color: "text-cyan-400" },
  { name: "Mobile Development", icon: Smartphone, color: "text-indigo-500" },
  { name: "Cyber Security", icon: Shield, color: "text-red-500" }
];

export default function TechStackBanner() {
  return (
    <div id="techstack" className="py-10 border-y border-slate-200 overflow-hidden relative z-10 transition-colors duration-300">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
        <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
          Master Tools & Tech Demanded By Top Companies
        </p>
      </div>

      <div className="flex overflow-hidden relative">
        
        {/* Marquee Loop Track */}
        <div className="marquee-track flex gap-6 items-center py-2">
          {[...techStack, ...techStack, ...techStack].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-blue-500 transition-all flex-shrink-0 shadow-sm"
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs font-bold text-slate-800">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

