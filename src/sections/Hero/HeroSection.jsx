import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import HeroCanvas from './HeroCanvas';
import useFrameSequence from './useFrameSequence';
import CTAButton from '../../components/ui/CTAButton';
import { FRAME_COUNT } from '../../utils/constants';
import './HeroSection.css';

const TICKER_WORDS = ['Policies', 'Rules', 'Public Services'];
const SUBTITLES = [
  'Navigate complex policy documents with instant, context-aware AI assistance.',
  'Simplify compliance by finding the right regulations and operational guidelines in seconds.',
  'Enable faster access to citizen services, schemes, and official information through AI-powered support.'
];
const WORD_BREAKPOINTS = [0, 0.25, 0.50]; // scroll progress thresholds

export default function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const tickerRef = useRef(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const { getFrame, criticalLoaded, loadingProgress } = useFrameSequence();

  useEffect(() => {
    if (!criticalLoaded) return;

    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from('.hero__title-fixed', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
          .from('.hero__ticker-container', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.5')
          .from('.hero__subtitle-container', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.5')
          .from('.hero__cta-group', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.4');
      }

      // Main scroll-driven animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.3,
        anticipatePin: 1,
        refreshPriority: 10, // HIGHEST PRIORITY: Calculate this pin before everything else!
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update canvas frame
          const newFrameIndex = Math.min(
            Math.floor(progress * (FRAME_COUNT - 1)),
            FRAME_COUNT - 1
          );
          setFrameIndex(newFrameIndex);

          // Determine active word based on scroll progress
          let newWordIndex = 0;
          for (let i = WORD_BREAKPOINTS.length - 1; i >= 0; i--) {
            if (progress >= WORD_BREAKPOINTS[i]) {
              newWordIndex = i;
              break;
            }
          }
          setActiveWordIndex(newWordIndex);

          if (!prefersReducedMotion) {
            // Ensure full visibility during active scrolling
            if (contentRef.current) {
              contentRef.current.style.transform = 'translateY(0px)';
              contentRef.current.style.opacity = 1;
            }
            if (ctaRef.current) {
              ctaRef.current.style.transform = 'translateY(0px)';
              ctaRef.current.style.opacity = 1;
            }
          }
        },
      });

      // Crucial: Force GSAP to recalculate all trigger positions now that 
      // the HeroSection's massive 400% pin-spacer has been injected into the DOM.
      // This prevents subsequent sections (like UseCases) from pinning at the wrong height.
      setTimeout(() => {
        ScrollTrigger.sort(); // Sort by DOM order just to be safe
        ScrollTrigger.refresh();
      }, 50);

    }, section);

    return () => ctx.revert();
  }, [criticalLoaded]);

  // Loading screen
  if (!criticalLoaded) {
    return (
      <section className="hero-loader" aria-label="Loading">
        <div className="hero-loader__content">
          <div className="hero-loader__logo">
            <span className="hero-loader__dot">●</span>
            <span className="hero-loader__text">DoT Mitra</span>
          </div>
          <div className="hero-loader__bar-track">
            <div
              className="hero-loader__bar-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="hero-loader__percent">{loadingProgress}%</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="hero" className="hero">
      {/* Canvas Background */}
      <HeroCanvas getFrame={getFrame} frameIndex={frameIndex} />

      {/* Content Overlay */}
      <div className="hero__overlay">
        <div className="container hero__container">
          <div ref={contentRef} className="hero__content">
            <h1 className="hero__title">
              <span className="hero__title-fixed">Your Intelligent Assistant for</span>
              <span className="hero__ticker-container" ref={tickerRef}>
                <span className="hero__ticker-viewport">
                  {TICKER_WORDS.map((word, i) => (
                    <span
                      key={word}
                      className={`hero__ticker-word ${i === activeWordIndex ? 'hero__ticker-word--active' : ''} ${i < activeWordIndex ? 'hero__ticker-word--exit' : ''
                        } ${i > activeWordIndex ? 'hero__ticker-word--enter' : ''}`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <div className="hero__subtitle-container">
              {SUBTITLES.map((subtitle, i) => (
                <p
                  key={i}
                  className={`hero__subtitle-dynamic ${
                    i === activeWordIndex ? 'hero__subtitle-dynamic--active' : ''
                  } ${
                    i < activeWordIndex ? 'hero__subtitle-dynamic--exit' : ''
                  } ${
                    i > activeWordIndex ? 'hero__subtitle-dynamic--enter' : ''
                  }`}
                >
                  {subtitle}
                </p>
              ))}
            </div>
          </div>

          <div ref={ctaRef} className="hero__cta-group">
            <CTAButton label="Request Demo" href="#" variant="primary" icon />
          </div>
        </div>
      </div>
    </section>
  );
}
