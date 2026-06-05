import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  distance = 40,
  className = '',
  stagger = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const fromVars = { opacity: 0, duration, delay, ease: 'power2.out' };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
      case 'scale':
        fromVars.scale = 0.92;
        break;
      default:
        fromVars.y = distance;
    }

    if (stagger > 0) {
      fromVars.stagger = stagger;
    }

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? el.children : el;
      gsap.from(targets, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, direction, duration, distance, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
