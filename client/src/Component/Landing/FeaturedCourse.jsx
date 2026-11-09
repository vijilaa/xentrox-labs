import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Server,
  Layout,
  Terminal,
  ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const featuredMernCourseData = {
  title: 'MERN Stack Development Mastertrack',
  badge: 'Flagship Career Track',
  duration: '4 Months Intensive',
  schedule: 'Weekday & Weekend Cohorts Available',
  description:
    'Our flagship software engineering program trains you to design, build, and deploy high-performance full-stack web applications using production MongoDB, Express, React 19, and Node.js architectures.',
  technologies: [
    { name: 'React 19', role: 'Frontend & State', icon: Layout, color: 'text-cyan-400' },
    { name: 'Node.js', role: 'Runtime Engine', icon: Server, color: 'text-emerald-400' },
    { name: 'Express.js', role: 'REST API & Auth', icon: Code2, color: 'text-lime-300' },
    { name: 'MongoDB Atlas', role: 'Document Database', icon: Database, color: 'text-green-400' }
  ],
  learningOutcomes: [
    'Architect robust single-page applications with React 19, Hooks & Tailwind CSS',
    'Build production REST APIs with JWT authentication, rate limiting & role permissions',
    'Design complex MongoDB schemas with Aggregation Pipelines & database indexing',
    'Implement real-time bidirectional messaging with WebSockets & Redis caching',
    'Deploy scalable containers via Docker, Vercel, and AWS EC2 with CI/CD automation'
  ],
  projectHighlights: [
    {
      name: 'Flowline Logistics Telematics Dashboard',
      desc: 'Real-time vehicle telemetry tracker processing 15,000+ daily location pings'
    },
    {
      name: 'GreenRoots Headless E-Commerce Engine',
      desc: 'Multi-vendor marketplace with Stripe payment gateway & dynamic inventory'
    }
  ]
};

export default function FeaturedCourse({
  courseData = featuredMernCourseData,
  onOpenEnroll,
  onSelectCourse
}) {
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spotlightRef.current,
          start: 'top 75%',
          once: true
        }
      });

      gsap.from(diagramRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: spotlightRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, spotlightRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={spotlightRef}
      className="py-20 sm:py-24 bg-[#F5F9F5] border-b border-[#E5EAE5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark-Green Feature Spotlight Panel */}
        <div className="rounded-3xl bg-[#003F35] text-white p-7 sm:p-10 lg:p-12 border border-[#052E27] shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Area */}
            <div ref={contentRef} className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-[#A3E635] border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                  {courseData.badge}
                </span>

                <span className="text-xs font-mono font-semibold text-emerald-200/80">
                  {courseData.duration} • {courseData.schedule}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white leading-tight">
                {courseData.title}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                {courseData.description}
              </p>

              {/* Technologies Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {courseData.technologies.map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${tech.color}`} />
                        <span className="text-xs font-bold text-white font-mono">
                          {tech.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-200/70 block mt-1">
                        {tech.role}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Key Learning Outcomes */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  What You Will Build &amp; Master:
                </h4>
                {courseData.learningOutcomes.map((outcome, oIdx) => (
                  <div key={oIdx} className="flex items-start gap-2 text-xs text-emerald-100/90 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenEnroll && onOpenEnroll('MERN Stack Development')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-extrabold text-[#003F35] bg-[#A3E635] hover:bg-[#84CC16] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll in MERN Track</span>
                  <ArrowRight className="w-4 h-4 text-[#003F35]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse({ title: 'MERN Stack Development' });
                    else if (onOpenEnroll) onOpenEnroll('MERN Stack Development');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inspect Full Syllabus</span>
                  <Code2 className="w-4 h-4 text-emerald-300" />
                </button>
              </div>
            </div>

            {/* Right Stack Visual Diagram */}
            <div ref={diagramRef} className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl bg-[#052E27] border border-[#003F35] p-5 shadow-xl font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="text-[11px] text-emerald-300 flex items-center gap-1.5 font-sans font-bold">
                    <Layers className="w-3.5 h-3.5 text-[#A3E635]" /> Full-Stack Architecture
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-lime-400/20 text-lime-300">
                    Production Stack
                  </span>
                </div>

                {/* Layer 1: Client UI */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-2.5">
                  <div className="flex items-center justify-between text-cyan-300 font-bold mb-1">
                    <span>1. Client Tier (React 19 &amp; Tailwind)</span>
                    <span className="text-[10px] text-emerald-400">Vercel Edge</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70 font-sans">
                    Component design systems, responsive viewports, custom hooks, and dynamic client routing.
                  </p>
                </div>

                {/* Layer 2: API Gateway */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-2.5">
                  <div className="flex items-center justify-between text-lime-300 font-bold mb-1">
                    <span>2. Backend Service (Node.js &amp; Express)</span>
                    <span className="text-[10px] text-emerald-400">Dockerized</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70 font-sans">
                    JWT authentication middleware, REST endpoints, CORS policies, WebSockets event streams.
                  </p>
                </div>

                {/* Layer 3: Database & Cache */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                    <span>3. Persistence (MongoDB Atlas &amp; Redis)</span>
                    <span className="text-[10px] text-emerald-400">Multi-Cloud</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70 font-sans">
                    Indexed document collections, Aggregation pipelines, and in-memory Redis session caching.
                  </p>
                </div>
              </div>

              {/* Client Project Box */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635] block mb-2 font-mono">
                  ★ Production Client Capstone:
                </span>
                <p className="text-xs font-bold text-white font-heading">
                  Flowline Logistics Fleet Telematics Portal
                </p>
                <p className="text-[11px] text-emerald-100/80 mt-1">
                  Built and deployed by XentroX trainees to monitor real-time vehicle routes across 15,000+ daily location telemetry pings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
