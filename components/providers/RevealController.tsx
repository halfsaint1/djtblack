'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RevealController() {
  // The layout persists across client navigation, so triggers are rebuilt for
  // each page; otherwise newly rendered [data-reveal] content stays hidden.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      root.classList.remove('js-ready');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        const delay = Number(element.dataset.revealDelay ?? 0);
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach((element) => {
        const inner = element.firstElementChild;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once: true,
          },
        });
        timeline.to(element, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          ease: 'power3.inOut',
        });
        if (inner) {
          timeline.to(inner, { scale: 1, duration: 1.1, ease: 'power3.out' }, 0);
        }
      });
    });

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return null;
}
