import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    // Add js-observer class to body for smooth scroll animations
    document.body.classList.add('js-observer');

    const revealElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is inside or near viewport, reveal immediately
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 50 && rect.bottom >= -50) {
          el.classList.add('active');
        }
      });
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeAll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 50 && rect.bottom >= -50) {
          el.classList.add('active');
        }
      });
    };

    // Initial check
    observeAll();

    // Listen to scroll and resize
    window.addEventListener('scroll', revealElements, { passive: true });
    window.addEventListener('resize', revealElements, { passive: true });

    // MutationObserver to catch tab changes, category filter switches, or search re-renders
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('scroll', revealElements);
      window.removeEventListener('resize', revealElements);
      mutationObserver.disconnect();
      observer.disconnect();
      document.body.classList.remove('js-observer');
    };
  }, []);
}
