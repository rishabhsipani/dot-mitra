import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import CTAButton from '../../components/ui/CTAButton';
import TypewriterText from '../../components/ui/TypewriterText';
import './SolutionSection.css';

// Import Assets
import laptopMockup from '../../assets/laptop image.png';
import customBrandingIcon from '../../assets/custom branding.svg';
import fastResponsesIcon from '../../assets/fast real time responses.svg';
import aiSearchIcon from '../../assets/ai search.svg';
import multiDeptImg from '../../assets/multi department setup.png';
import arrowSvg from '../../assets/Line.svg';
import shapeBg from '../../assets/semi circle.png';

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const laptopRef = useRef(null);
  const pill1Ref = useRef(null);
  const pill2Ref = useRef(null);
  const pill3Ref = useRef(null);
  const pill4Ref = useRef(null);

  const handleMouseMove = (e, ref) => {
    // Only apply hover effect on desktop
    if (window.innerWidth <= 1024 || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15deg to 15deg max)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(ref.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3
    });
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle Container Parallax
      gsap.to(section, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      // Scrubbed Entrance Stagger for header and CTA
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      enterTl
        .from('.solution__header', { y: 100, opacity: 0 }, 0)
        .from('.solution__cta-wrapper', { y: 80, opacity: 0 }, 0.2);

      // Laptop entrance
      gsap.fromTo(laptopRef.current,
        { y: 150, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
          }
        }
      );

      // Parallax for floating pills
      const pills = [
        { ref: pill1Ref.current, yOffset: -80, speed: 1.2 },
        { ref: pill2Ref.current, yOffset: -50, speed: 0.8 },
        { ref: pill3Ref.current, yOffset: -120, speed: 1.5 },
        { ref: pill4Ref.current, yOffset: -90, speed: 1.1 },
      ];

      pills.forEach((pill, i) => {
        gsap.fromTo(pill.ref,
          { y: 100 + (i * 30), opacity: 0 },
          {
            y: pill.yOffset,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 45%', // Reaches full opacity quickly as it enters
              scrub: true
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <SectionWrapper id="solution" className="solution-section">
        <div className="container">

          <div className="solution__header">
            <h2 className="solution__title">
              One Platform.<br />
              <span className="solution__title-highlight">
                <TypewriterText text="Instant Answers." />
              </span>
            </h2>

            <div className="solution__arrow-wrapper">
              <img src={arrowSvg} alt="Arrow pointing right" className="solution__arrow-img" />
            </div>

            <p className="solution__description">
              DoT Mitra converts official documents into a secure AI-powered knowledge assistant that delivers accurate, context-aware responses using verified organizational data only.
            </p>
          </div>

          <div className="solution__interactive-area">
            {/* Translucent Semi-Circle Rings */}
            <div className="solution__rings">
              <div className="solution__ring solution__ring-1"></div>
              <div className="solution__ring solution__ring-2"></div>
              <div className="solution__ring solution__ring-3"></div>
            </div>

            {/* Background Shape */}
            <div className="solution__shape-wrapper">
              <img src={shapeBg} alt="Background abstract shape" className="solution__shape-img" />
            </div>

            {/* Main Laptop */}
            <div className="solution__laptop-wrapper" ref={laptopRef}>
              <img src={laptopMockup} alt="DoT Mitra Dashboard" className="solution__laptop-img" />
            </div>

            {/* Floating Elements */}
            <div className="solution__floating-elements">

              <div 
                className="solution__pill solution__pill--custom" 
                ref={pill1Ref}
                onMouseMove={(e) => handleMouseMove(e, pill1Ref)}
                onMouseLeave={() => handleMouseLeave(pill1Ref)}
              >
                <img src={customBrandingIcon} alt="Custom Branding" className="solution__pill-icon" />
                <span>Custom Branding <br />& Workflows</span>
              </div>

              <div 
                className="solution__pill solution__pill--fast" 
                ref={pill2Ref}
                onMouseMove={(e) => handleMouseMove(e, pill2Ref)}
                onMouseLeave={() => handleMouseLeave(pill2Ref)}
              >
                <img src={fastResponsesIcon} alt="Fast Responses" className="solution__pill-icon" />
                <span>Fast Real-Time <br />Responses</span>
              </div>

              <div 
                className="solution__pill solution__pill--ai" 
                ref={pill3Ref}
                onMouseMove={(e) => handleMouseMove(e, pill3Ref)}
                onMouseLeave={() => handleMouseLeave(pill3Ref)}
              >
                <img src={aiSearchIcon} alt="AI Search" className="solution__pill-icon" />
                <span>AI-Based <br />Knowledge Search</span>
              </div>

              <div 
                className="solution__card solution__card--secure" 
                ref={pill4Ref}
                onMouseMove={(e) => handleMouseMove(e, pill4Ref)}
                onMouseLeave={() => handleMouseLeave(pill4Ref)}
              >
                <img src={multiDeptImg} alt="Multi Department Setup" className="solution__card-img" />
                <span className="solution__card-text">Secure Multi-Department<br />Setup</span>
              </div>

            </div>
          </div>

          <div className="solution__cta-wrapper">
            <CTAButton label="See Live Demo" href="#demo" variant="primary" />
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
