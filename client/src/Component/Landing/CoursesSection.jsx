import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Laptop,
  Cpu,
  TrendingUp,
  PenTool,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const courseCategoriesData = [
  {
    id: 'software-dev',
    title: 'Software Development',
    badge: 'High Demand',
    icon: Code2,
    theme: 'dark', // Dark-green background matching reference design
    description: 'Master full-stack engineering, production APIs, database architecture, and live cloud deployment.',
    courses: [
      'Full Stack Web Development',
      'MERN Stack Development',
      'Python Full Stack Development',
      'Java Full Stack Development',
      'Front-End Development',
      'Back-End Development',
      'React.js Development',
      'Node.js Development',
      'Django Development',
      'PHP & MySQL Development',
      'Mobile App Development',
      'Software Testing & QA',
      'Git & GitHub'
    ]
  },
  {
    id: 'prog-cs',
    title: 'Programming & Computer Science',
    badge: 'Core Foundations',
    icon: Laptop,
    theme: 'light',
    description: 'Build algorithmic thinking, clean logic, data structures, and computer science fundamentals.',
    courses: [
      'Python Programming',
      'Java Programming',
      'C Programming',
      'C++ Programming',
      'JavaScript (ES6+)',
      'Data Structures & Algorithms',
      'SQL & Database Management',
      'Object-Oriented Programming',
      'API Development & Integration'
    ]
  },
  {
    id: 'data-ai',
    title: 'Data Science & Artificial Intelligence',
    badge: 'Next-Gen Tech',
    icon: Cpu,
    theme: 'light',
    description: 'Harness predictive data pipelines, machine learning models, Power BI analytics, and Generative AI.',
    courses: [
      'Data Analytics with Power BI & SQL',
      'Python for Data Science',
      'Machine Learning Foundations',
      'Deep Learning with PyTorch',
      'Generative AI & LLM Engineering',
      'Natural Language Processing (NLP)'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    badge: 'High ROI',
    icon: TrendingUp,
    theme: 'dark', // Dark-green featured card
    description: 'Master performance advertising, high-ROAS Meta & Google ads, and enterprise technical SEO.',
    courses: [
      'Performance Marketing & Ads',
      'Technical SEO & Growth Architecture',
      'Google Ads & Search Engine Marketing',
      'Meta (Instagram/Facebook) Ads Manager',
      'Social Media Strategy & Short-Form Content',
      'Conversion Rate Optimization (CRO)'
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    badge: 'Creative Craft',
    icon: PenTool,
    theme: 'light',
    description: 'Design intuitive interfaces, interactive prototypes in Figma, and design systems for enterprise web apps.',
    courses: [
      'UI/UX Design Masterclass',
      'Figma & Advanced Prototyping',
      'Design Systems & Auto-Layout',
      'Mobile App Design (iOS & Android)',
      'Wireframing & User Journey Mapping',
      'Design to Code Handoff'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Computing & DevOps',
    badge: 'Enterprise Architecture',
    icon: Cloud,
    theme: 'light',
    description: 'Deploy automated CI/CD pipelines, containerize with Docker, and architect scalable AWS cloud environments.',
    courses: [
      'AWS Cloud Infrastructure',
      'Docker & Containerization',
      'CI/CD with GitHub Actions',
      'Linux Administration & Shell',
      'Kubernetes Cluster Basics',
      'Microservices & Security Hardening'
    ]
  }
];

export default function CoursesSection({ onOpenEnroll, onSelectCourse }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5EAE5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#78B82A]" />
            Curated Career Tracks
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#101828] tracking-tight">
            Industry-Oriented <span className="text-[#003F35]">Tech &amp; Marketing</span> Courses
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#667085] font-medium leading-relaxed">
            Learn from professionals. Work on real projects. Build your future.
          </p>
        </div>

        {/* Course Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courseCategoriesData.map((cat, idx) => {
            const Icon = cat.icon;
            const isDark = cat.theme === 'dark';
            const isExpanded = expandedCard === cat.id;
            const displayCourses = isExpanded ? cat.courses : cat.courses.slice(0, 6);

            return (
              <div
                key={cat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                  isDark
                    ? 'bg-[#003F35] text-white border-[#052E27] shadow-xl shadow-[#003F35]/15'
                    : 'bg-white text-[#101828] border-[#E5EAE5] shadow-sm hover:shadow-xl hover:shadow-[#003F35]/6 hover:border-[#78B82A]/60'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                        isDark
                          ? 'bg-white/10 text-[#A3E635] border border-white/15'
                          : 'bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30'
                            : 'bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5]'
                        }`}
                      >
                        {cat.badge}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isDark ? 'text-emerald-300/80' : 'text-[#667085]'
                        }`}
                      >
                        {cat.courses.length} Tracks
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold font-heading tracking-tight ${
                      isDark ? 'text-white' : 'text-[#101828]'
                    }`}
                  >
                    {cat.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-[13px] mt-2 leading-relaxed ${
                      isDark ? 'text-emerald-100/80' : 'text-[#667085]'
                    }`}
                  >
                    {cat.description}
                  </p>

                  {/* Course List Items */}
                  <div className="mt-5 space-y-2">
                    {displayCourses.map((cName, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => {
                          if (onSelectCourse) onSelectCourse({ title: cName });
                          else if (onOpenEnroll) onOpenEnroll(cName);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                          isDark
                            ? 'bg-white/5 hover:bg-white/15 text-emerald-100'
                            : 'bg-[#F5F9F5] hover:bg-[#ebf5ef] text-[#101828]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isDark ? 'text-[#A3E635]' : 'text-[#78B82A]'
                            }`}
                          />
                          <span className="line-clamp-1">{cName}</span>
                        </div>
                        <ArrowRight
                          className={`w-3 h-3 shrink-0 opacity-40 hover:opacity-100 ${
                            isDark ? 'text-[#A3E635]' : 'text-[#003F35]'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {cat.courses.length > 6 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(cat.id)}
                      className={`mt-2.5 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark
                          ? 'text-[#A3E635] hover:text-white'
                          : 'text-[#003F35] hover:text-[#78B82A]'
                      }`}
                    >
                      <span>
                        {isExpanded
                          ? 'Show Less'
                          : `+ View ${cat.courses.length - 6} More Tracks`}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div
                  className={`mt-6 pt-5 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-white/10' : 'border-[#E5EAE5]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onOpenEnroll && onOpenEnroll(cat.title)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer shadow-sm ${
                      isDark
                        ? 'bg-[#A3E635] hover:bg-[#84CC16] text-[#003F35]'
                        : 'bg-[#003F35] hover:bg-[#052E27] text-white'
                    }`}
                  >
                    Enroll Now
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse({ title: cat.courses[0] });
                      else if (onOpenEnroll) onOpenEnroll(cat.title);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/20 hover:bg-white/10 text-white'
                        : 'border-[#E5EAE5] hover:bg-[#F5F9F5] text-[#101828]'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
