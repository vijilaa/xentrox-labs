import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, TrendingUp, Building2, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const defaultStatsData = [
  {
    id: 'trainees',
    number: 500,
    suffix: '+',
    label: 'Trainees Placed',
    subtext: 'Across high-growth IT firms & product startups',
    icon: Users
  },
  {
    id: 'placement-rate',
    number: 98,
    suffix: '%',
    label: 'Placement Rate',
    subtext: 'Backed by 6-stage interview accelerator sprints',
    icon: TrendingUp
  },
  {
    id: 'partners',
    number: 100,
    suffix: '+',
    label: 'Hiring Partners',
    subtext: 'Direct recruitment network across India & remote',
    icon: Building2
  },
  {
    id: 'studios',
    number: 2,
    suffix: '',
    label: 'Training Studios',
    subtext: 'Marthandam (TN) & Trivandrum Technopark (KL)',
    icon: MapPin
  }
];

export default function StatisticsSection({ statsData = defaultStatsData }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered card entrance
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      });

      // 2. Animated Counter for each statistic
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const targetNumber = statsData[index]?.number || 0;
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl) return;

        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: targetNumber,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          },
          onUpdate: () => {
            numberEl.textContent = Math.round(countObj.val);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [statsData]);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 bg-[#FFFFFF] border-b border-[#E5EAE5]"
      aria-label="Key Achievements and Statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F5F9F5] border border-[#E5EAE5] hover:border-[#78B82A]/50 hover:bg-[#ebf5ef] hover:shadow-xl hover:shadow-[#003F35]/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#003F35] border border-[#E5EAE5] flex items-center justify-center shadow-2xs group-hover:bg-[#003F35] group-hover:text-[#A3E635] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085]">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#003F35] tracking-tight flex items-baseline">
                    <span className="stat-number">0</span>
                    <span className="text-[#78B82A] ml-0.5">{stat.suffix}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#101828] mt-1 font-heading">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-[#667085] mt-1 leading-snug">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
