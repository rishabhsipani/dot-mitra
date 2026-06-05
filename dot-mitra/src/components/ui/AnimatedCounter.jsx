import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import GradientText from './GradientText';

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  label,
  useGradient = true,
}) {
  const counterRef = useRef(null);
  const numberRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          setHasAnimated(true);

          if (prefersReducedMotion) {
            if (numberRef.current) {
              numberRef.current.textContent = typeof end === 'number' ? end.toLocaleString('en-IN') : end;
            }
            return;
          }

          const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''));
          const isDecimal = String(end).includes('.');
          const obj = { val: 0 };

          gsap.to(obj, {
            val: numericEnd,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              if (numberRef.current) {
                const formatted = isDecimal
                  ? obj.val.toFixed(1)
                  : Math.floor(obj.val).toLocaleString('en-IN');
                numberRef.current.textContent = formatted;
              }
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration, hasAnimated]);

  const NumberDisplay = useGradient ? GradientText : 'span';

  return (
    <div ref={counterRef} className="animated-counter">
      <div className="animated-counter__number">
        {prefix && <span className="animated-counter__prefix">{prefix}</span>}
        <NumberDisplay as="span">
          <span ref={numberRef}>0</span>
        </NumberDisplay>
        {suffix && <span className="animated-counter__suffix">{suffix}</span>}
      </div>
      {label && <div className="animated-counter__label">{label}</div>}
    </div>
  );
}
