import SectionWrapper from '../../components/ui/SectionWrapper';
import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionHeader from '../../components/ui/SectionHeader';
import playBtnIcon from '../../assets/play button icon.svg';
import './DemoSection.css';

export default function DemoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Subtle Container Parallax
      gsap.to(container, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      // Scrubbed Entrance Stagger
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      enterTl
        .from('.demo__header', { y: 100, opacity: 0 }, 0)
        .from('.demo__video-wrapper', { y: 150, opacity: 0, scale: 0.95 }, 0.1)
        .from('.demo__cta', { y: 80, opacity: 0 }, 0.2);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="demo" className="section--off-white">
      <div className="container" ref={containerRef}>
        <SectionHeader
          title="Experience Dot Mitra"
          highlightWord="Dot Mitra"
          subtitle="See how AI-powered knowledge assistants simplify access to official information in real time."
          alignment="center"
          className="demo__header"
        />

        <div className="demo__video-wrapper">
          <div className="demo__video-container">
            {/* Video placeholder — replace src when video is provided */}
            <div className="demo__video-placeholder">
              <img src={playBtnIcon} alt="Play Demo" className="demo__play-button-img" />
            </div>
          </div>
        </div>

        <div className="demo__cta">
          <button className="demo__launch-btn">Launch Demo</button>
        </div>
      </div>
    </SectionWrapper>
  );
}
