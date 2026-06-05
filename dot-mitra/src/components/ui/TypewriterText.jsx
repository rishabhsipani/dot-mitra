import { useEffect, useRef, useState } from 'react';
import './TypewriterText.css';

export default function TypewriterText({ text, active = true, color }) {
  const wrapperRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !active) return;

    // Use the parent section-header (a block element) as the observation target
    // so IntersectionObserver has a proper bounding box to work with
    const observeTarget = el.closest('.section-header') || el.closest('h2') || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(observeTarget);

    return () => observer.disconnect();
  }, [active]);

  if (!text) return null;

  const chars = text.split('');
  // Total reveal duration based on character count
  const totalDuration = chars.length * 60; // ms per char
  const charStyle = color ? { color, WebkitTextFillColor: color } : {};

  return (
    <span ref={wrapperRef} className="tw-wrapper" aria-label={text}>
      {/* Hidden full text for layout stability & SEO */}
      <span className="tw-sizer">{text}</span>
      {/* Animated characters */}
      <span className="tw-chars" aria-hidden="true">
        {chars.map((char, i) => (
          <span
            key={i}
            className={`tw-char ${revealed ? 'tw-char--show' : ''}`}
            style={{ 
              ...charStyle,
              animationDelay: revealed ? `${i * 60}ms` : undefined 
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span
          className={`tw-cursor ${revealed ? 'tw-cursor--show' : ''}`}
          style={{ animationDelay: revealed ? `${totalDuration}ms` : undefined }}
        >
          |
        </span>
      </span>
    </span>
  );
}
