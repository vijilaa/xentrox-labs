import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hook to apply a simple scroll‑reveal animation to every element that has the
 * `scroll-reveal` class. It uses GSAP + ScrollTrigger and runs once on mount.
 *
 * Elements will animate from opacity 0 and a slight downward offset. The
 * animation is triggered when the element reaches 80 % of the viewport height.
 *
 * The hook is imported in `App.jsx` (already present) so the effect runs for the
 * whole application. Cleanup removes all ScrollTriggers when the component tree
 * unmounts (e.g., hot‑module reload).
 */
export default function useScrollReveal() {
  useEffect(() => {
    // Register the plugin in case it hasn't been registered elsewhere.
    if (!gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        // Each element gets its own ScrollTrigger.
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', // when top of element hits 80% down the viewport
          toggleActions: 'play none none none',
        },
      });
    });

    // Cleanup all ScrollTriggers created by this hook.
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}

