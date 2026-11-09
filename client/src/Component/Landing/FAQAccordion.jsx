import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, Sparkles, Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const faqItemsData = [
  {
    id: 'faq-1',
    question: 'What courses are available at XentroX Labs?',
    answer:
      'We offer 50+ industry-oriented courses across Software Development (MERN Stack, Python Full Stack, Java Full Stack, Frontend, Backend, Django, Flutter), Programming Foundations (C, C++, Java, Python, DSA, SQL), Data Science & AI, Digital Marketing & Growth Ads, UI/UX Design in Figma, and Cloud & DevOps.'
  },
  {
    id: 'faq-2',
    question: 'Is this training suitable for beginners?',
    answer:
      'Yes, 100%! Over 40% of our successful alumni come from non-IT backgrounds (Mechanical, Civil, Commerce, Arts, Science). We begin every track from absolute core fundamentals and provide 1-on-1 mentor guidance so you never get stuck.'
  },
  {
    id: 'faq-3',
    question: 'Will I work on practical projects?',
    answer:
      'Yes! Unlike traditional institutes that assign trivial to-do list homework, students at XentroX Labs write code for real client applications handled by our parent studio, XentroX Solutions. You graduate with live deployed applications and verifiable GitHub repositories.'
  },
  {
    id: 'faq-4',
    question: 'Which technologies will I learn?',
    answer:
      'Depending on your track: React 19, Node.js, Express.js, MongoDB Atlas, Next.js, Python, Django, FastAPI, Java 21, Spring Boot, Flutter, PostgreSQL, Docker, AWS, Power BI, Figma, Google Ads, Meta Ads Manager, and modern AI development tools.'
  },
  {
    id: 'faq-5',
    question: 'Is mentorship available?',
    answer:
      'Yes! You receive dedicated 1:1 mentorship from active software engineers and growth architects. We review your code line-by-line, conduct paired programming sessions, and answer doubts in real time.'
  },
  {
    id: 'faq-6',
    question: 'What career support is provided?',
    answer:
      'We run a comprehensive 6-stage placement accelerator: technical skill audit, ATS developer resume engineering, GitHub polishing, mock coding rounds, behavioral interviews, and direct introductions to over 100+ partner tech companies.'
  },
  {
    id: 'faq-7',
    question: 'How can I enroll?',
    answer:
      'You can apply directly via the enrollment form below on this website, or message our admissions desk on WhatsApp at +91 9940727614. Our academic counselors will call you to confirm batch dates, schedules, and fee installment options.'
  },
  {
    id: 'faq-8',
    question: 'Where are the training studios located?',
    answer:
      'We have two strategic physical innovation hubs: Marthandam Studio & Training Lab (Kanyakumari District, Tamil Nadu 629165) and Trivandrum Tech Hub & Studio (Kazhakkoottam / Technopark corridor, Trivandrum, Kerala 695581). Both offline classroom and live online interactive modes are available.'
  }
];

export default function FAQAccordion({ items = faqItemsData }) {
  const [openIndex, setOpenIndex] = useState(0); // first open by default
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#FFFFFF] border-b border-[#E5EAE5] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5F9F5] text-[#003F35] border border-[#E5EAE5] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#78B82A]" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#101828] tracking-tight">
            Got Questions? <span className="text-[#003F35]">We've Got Answers.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#667085] font-medium leading-relaxed">
            Everything you need to know about our courses, studio training model, and admissions process.
          </p>
        </div>

        {/* Accordion Panels */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[idx] = el)}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#F5F9F5] border-[#78B82A]/70 shadow-md shadow-[#003F35]/5'
                    : 'bg-white border-[#E5EAE5] hover:border-[#78B82A]/40 hover:bg-[#F5F9F5]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4.5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-bold font-heading transition-colors ${
                      isOpen ? 'text-[#003F35]' : 'text-[#101828]'
                    }`}
                  >
                    {item.question}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#003F35] text-[#A3E635] rotate-180'
                        : 'bg-white border border-[#E5EAE5] text-[#667085]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13px] text-[#667085] leading-relaxed border-t border-[#E5EAE5]/60 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
