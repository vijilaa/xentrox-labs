import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * XentroX Labs — Global Scroll Animation System
 *
 * Covers every page automatically:
 *  • [data-anim="fade-up"]    — fade in + slide up          (default)
 *  • [data-anim="fade-down"]  — fade in + slide down
 *  • [data-anim="fade-left"]  — fade in + slide from left
 *  • [data-anim="fade-right"] — fade in + slide from right
 *  • [data-anim="scale-in"]   — fade in + scale up
 *  • [data-anim="flip-up"]    — 3-D flip on the X-axis
 *  • [data-anim="stagger"]    — stagger-reveals all direct children
 *  • .scroll-reveal           — legacy compatibility kept intact
 *
 * Optional data attributes:
 *  • data-delay="300"         — delay in ms (default 0)
 *  • data-duration="800"      — duration in ms (default 700)
 *  • data-distance="40"       — translate distance in px (default 36)
 *  • data-stagger="100"       — stagger step in ms for [data-anim="stagger"]
 */
export default function useScrollReveal() {
  useEffect(() => {
    // ── Respect prefers-reduced-motion ──
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make everything visible immediately
      document.querySelectorAll('[data-anim], .scroll-reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    document.body.classList.add('js-observer');

    // ─────────────────────────────────────────────────────────
    // 1. LEGACY  .scroll-reveal  — keep existing behaviour
    // ─────────────────────────────────────────────────────────
    const revealLegacy = () => {
      document.querySelectorAll('.scroll-reveal:not(.active)').forEach(el => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= vh + 50 && rect.bottom >= -50) {
          el.classList.add('active');
        }
      });
    };

    revealLegacy();
    window.addEventListener('scroll', revealLegacy, { passive: true });
    window.addEventListener('resize', revealLegacy, { passive: true });

    const legacyObserver = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { root: null, rootMargin: '50px 0px 50px 0px', threshold: 0.01 }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => legacyObserver.observe(el));

    // ─────────────────────────────────────────────────────────
    // 2. NEW  [data-anim]  — GSAP-powered scroll animations
    // ─────────────────────────────────────────────────────────
    const triggers = [];

    /** Parse numeric data-attribute with a fallback */
    const attr = (el, name, fallback) => {
      const v = parseFloat(el.dataset[name]);
      return isNaN(v) ? fallback : v;
    };

    /** Build the "from" tween vars for each animation type */
    const fromVars = (el) => {
      const type = el.dataset.anim || 'fade-up';
      const dist = attr(el, 'distance', 36);
      const base = { opacity: 0 };

      switch (type) {
        case 'fade-up':    return { ...base, y: dist };
        case 'fade-down':  return { ...base, y: -dist };
        case 'fade-left':  return { ...base, x: dist };
        case 'fade-right': return { ...base, x: -dist };
        case 'scale-in':   return { ...base, scale: 0.88, y: dist * 0.5 };
        case 'flip-up':    return { ...base, rotationX: 20, y: dist, transformOrigin: 'top center', transformPerspective: 800 };
        case 'stagger':    return null; // handled separately
        default:           return { ...base, y: dist };
      }
    };

    const initAnimations = () => {
      document.querySelectorAll('[data-anim]').forEach(el => {
        // Skip if already initialised
        if (el._animInit) return;
        el._animInit = true;

        const type     = el.dataset.anim || 'fade-up';
        const delay    = attr(el, 'delay', 0) / 1000;
        const duration = attr(el, 'duration', 700) / 1000;
        const ease     = 'power3.out';

        // ── Stagger: animate direct children ──
        if (type === 'stagger') {
          const children = Array.from(el.children);
          if (!children.length) return;

          const staggerStep = attr(el, 'stagger', 100) / 1000;
          const dist = attr(el, 'distance', 28);

          gsap.set(children, { opacity: 0, y: dist });

          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              gsap.to(children, {
                opacity: 1,
                y: 0,
                duration,
                ease,
                stagger: staggerStep,
                delay,
              });
            },
          });
          triggers.push(st);
          return;
        }

        // ── All other animation types ──
        const from = fromVars(el);
        if (!from) return;

        gsap.set(el, from);

        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration,
              ease,
              delay,
            });
          },
        });
        triggers.push(st);
      });
    };

    // Run immediately + re-run when new elements appear (route changes, lazy loads)
    initAnimations();

    const mutObs = new MutationObserver(() => {
      initAnimations();
      revealLegacy();
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    // ─────────────────────────────────────────────────────────
    // 3. GLOBAL SECTION HEADERS — auto-animate section heading
    //    groups that have NOT been given explicit data-anim
    // ─────────────────────────────────────────────────────────
    const autoAnimate = () => {
      const autoTargets = document.querySelectorAll(
        'section:not([data-no-auto]) h2:not([data-anim-done]),' +
        'section:not([data-no-auto]) h1:not([data-anim-done])'
      );

      autoTargets.forEach(heading => {
        // Skip if inside a component that already handles its own GSAP
        const insideGsap = heading.closest('[data-anim], .about-hero-title, .about-hero-sub, .story-headline, .about-hero-section');
        if (insideGsap) return;

        heading.dataset.animDone = 'true';

        gsap.set(heading, { opacity: 0, y: 20 });

        const st = ScrollTrigger.create({
          trigger: heading,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(heading, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' });
          },
        });
        triggers.push(st);
      });
    };

    setTimeout(autoAnimate, 150);

    // ─────────────────────────────────────────────────────────
    // 4. FOOTER — gentle fade-up
    // ─────────────────────────────────────────────────────────
    const footer = document.querySelector('#footer');
    if (footer && !footer._animInit) {
      footer._animInit = true;
      gsap.set(footer, { opacity: 0, y: 24 });
      const st = ScrollTrigger.create({
        trigger: footer,
        start: 'top 95%',
        once: true,
        onEnter: () => gsap.to(footer, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
      });
      triggers.push(st);
    }

    // ─────────────────────────────────────────────────────────
    // Cleanup
    // ─────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('scroll', revealLegacy);
      window.removeEventListener('resize', revealLegacy);
      legacyObserver.disconnect();
      mutObs.disconnect();
      triggers.forEach(t => t?.kill());

      // Reset _animInit flags so re-mounting re-initialises
      document.querySelectorAll('[data-anim]').forEach(el => { delete el._animInit; });
      const f = document.querySelector('#footer');
      if (f) delete f._animInit;

      document.body.classList.remove('js-observer');
    };
  }, []);
}
