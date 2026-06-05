import { useRef, useState, useEffect } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import SectionHeader from '../../components/ui/SectionHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DeploymentSection.css';

import step1Img from '../../assets/STEP 1.png';
import step2Img from '../../assets/step 2.png';
import step3Img from '../../assets/step 3.png';
import step4Img from '../../assets/step 4.png';
import step5Img from '../../assets/step 5.png';

const steps = [
  {
    image: step1Img,
    title: 'Create Workspace',
    desc: 'Set up a dedicated assistant for your department or organization.'
  },
  {
    image: step2Img,
    title: 'Upload Documents',
    desc: 'Add circulars, manuals, regulations, FAQs, and notifications.'
  },
  {
    image: step3Img,
    title: 'Customize Experience',
    desc: 'Configure branding, chatbot behavior, quick links, and disclaimers.'
  },
  {
    image: step4Img,
    title: 'Customize Experience',
    desc: 'Configure branding, chatbot behavior, quick links, and disclaimers.'
  },
  {
    image: step5Img,
    title: 'Deploy on Your Website',
    desc: 'Integrate Dot Mitra using a lightweight deployment script.'
  }
];

export default function DeploymentSection() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5); // 5px tolerance
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
      window.addEventListener('resize', handleScroll);
    }
    
    // Premium Parallax Reveal
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        // Subtle Container Parallax
        gsap.to(containerRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        });

        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.5,
          }
        });

        enterTl
          .from('.deploy__header', { y: 100, opacity: 0 }, 0)
          .from('.deploy__card', { y: 150, opacity: 0, stagger: 0.1, rotation: 2 }, 0.1)
          .from('.deploy__controls', { y: 50, opacity: 0 }, 0.3);
      }
    }, containerRef);

    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
      ctx.revert();
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 882 : 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionWrapper id="deployment" className="section--off-white deploy-wrapper">
      <div ref={containerRef} className="container">
        <SectionHeader
          title="Simple Deployment Process"
          highlightWord="Process"
          alignment="center"
          className="deploy__header"
        />

        <div className="deploy__carousel-container">
          <div className="deploy__track" ref={scrollRef}>
            {steps.map((step, i) => (
              <div key={i} className="deploy__card">
                <div className="deploy__card-header">
                  <h3 className="deploy__step-label">Step {i + 1}</h3>
                  <p className="deploy__step-text">
                    <span className="deploy__step-title">{step.title}-</span> {step.desc}
                  </p>
                </div>
                <div className="deploy__card-image-wrapper">
                  <img src={step.image} alt={`Step ${i + 1}`} className="deploy__card-image" />
                </div>
              </div>
            ))}
          </div>

          <div className="deploy__controls">
            <button 
              className={`deploy__control-btn ${!canScrollLeft ? 'deploy__control-btn--disabled' : 'deploy__control-btn--active'}`} 
              onClick={() => scroll('left')} 
              aria-label="Previous step"
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={`deploy__control-btn ${!canScrollRight ? 'deploy__control-btn--disabled' : 'deploy__control-btn--active'}`} 
              onClick={() => scroll('right')} 
              aria-label="Next step"
              disabled={!canScrollRight}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
