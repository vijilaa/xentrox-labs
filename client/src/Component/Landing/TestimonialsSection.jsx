import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, Sparkles, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const sampleTestimonials = [
  {
    id: 'test-1',
    name: 'Anandhu R.',
    role: 'Associate Full-Stack Engineer',
    course: 'MERN Stack Development',
    outcome: 'Placed at Technopark IT Studio',
    rating: 5,
    avatar: 'AR',
    quote:
      'Unlike my college where we only saw slides, at XentroX Labs I wrote real Express routes and connected MongoDB Atlas collections on day one. Building the Flowline logistics capstone project helped me ace my technical interview.'
  },
  {
    id: 'test-2',
    name: 'Meera Krishnan',
    role: 'Python & Django Developer',
    course: 'Python Full Stack Development',
    outcome: 'Career Transition from Non-IT (Mechanical)',
    rating: 5,
    avatar: 'MK',
    quote:
      'I had a 2-year career gap after my mechanical engineering degree and was scared of coding. The 1-on-1 mentorship by Subin sir and Sherin sir broke everything down into simple logic. Now I write production APIs with confidence!'
  },
  {
    id: 'test-3',
    name: 'Jithin Thomas',
    role: 'Performance Marketing Specialist',
    course: 'Digital Marketing & Growth',
    outcome: 'Growth Marketer at E-Commerce Brand',
    rating: 5,
    avatar: 'JT',
    quote:
      'Learning digital marketing while managing real studio ad spend on Google and Meta Ads Manager completely changed my perspective. I learned technical SEO, Google Tag Manager, and ROAS calculations that immediately won client deals.'
  }
];

export default function TestimonialsSection({ testimonials = sampleTestimonials }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 35,
        stagger: 0.14,
        duration: 0.8,
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

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#F5F9F5] border-b border-[#E5EAE5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#003F35] border border-[#E5EAE5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#78B82A]" />
            Student Perspectives &amp; Outcomes
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#101828] tracking-tight">
            Trainee Experiences at <span className="text-[#003F35]">XentroX Labs</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#667085] font-medium leading-relaxed">
            Real feedback from graduates who transitioned into technology careers through our practical studio tracks.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="rounded-3xl bg-white p-7 border border-[#E5EAE5] shadow-sm hover:shadow-xl hover:shadow-[#003F35]/5 hover:border-[#78B82A] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <Quote className="w-7 h-7 text-[#003F35]/15" />
                </div>

                <p className="text-xs sm:text-[13px] text-[#101828]/85 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E5EAE5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#003F35] text-[#A3E635] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  {item.avatar}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#101828] font-heading leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#78B82A] font-semibold">
                    {item.course}
                  </p>
                  <p className="text-[10px] text-[#667085] mt-0.5">
                    {item.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
