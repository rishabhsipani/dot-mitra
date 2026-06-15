import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionWrapper from '../../components/ui/SectionWrapper';
import TypewriterText from '../../components/ui/TypewriterText';
import testimonialImg from '../../assets/testimonial.png';
import { gsap } from '../../utils/gsapConfig';
import './TestimonialsSection.css';

const testimonials = [
  {
    company: "Ministry of Telecom",
    quote: "DoT Mitra has made telecom policies, regulations, and notifications significantly easier to access. Teams can now find relevant information instantly instead of manually navigating through extensive documentation.",
    author: "Senior Officer",
    role: "Ministry of Telecommunications",
    rating: 5,
  },
  {
    company: "Municipal Corp",
    quote: "Municipal queries dropped by 40% after deploying DoT Mitra. Citizens get direct answers regarding municipal guidelines and local procedures in regional languages instantly.",
    author: "Municipal Commissioner",
    role: "Municipal Corporation",
    rating: 5,
  },
  {
    company: "Admin Reforms",
    quote: "On-boarding new officers used to take weeks of training on service rules. With DoT Mitra, they can query the system for administrative rules and receive instant, compliant responses.",
    author: "Director of HR",
    role: "Dept of Administrative Reforms",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Setup refs array
  cardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Re-arrange cards with animation when activeIndex changes
  useEffect(() => {
    if (cardsRef.current.length === 0) return;

    cardsRef.current.forEach((card, i) => {
      // Calculate relative index relative to activeIndex
      const relativeIndex = (i - activeIndex + testimonials.length) % testimonials.length;

      // Base styles for stacking
      let zIndex = testimonials.length - relativeIndex;
      let scale = 1 - relativeIndex * 0.04;
      let yOffset = relativeIndex * 12;
      
      // Rotations: top card is straight, subsequent cards are slightly tilted in alternate directions
      let rotation = 0;
      if (relativeIndex === 1) rotation = -2.5;
      if (relativeIndex === 2) rotation = 3;

      // Set z-index instantly to avoid overlaps during transition
      gsap.set(card, { zIndex });

      // Animate card into its stack position
      gsap.to(card, {
        scale,
        y: yOffset,
        rotation,
        x: 0,
        opacity: relativeIndex > 2 ? 0 : 1, // Hide overflow cards
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  }, [activeIndex]);

  // Premium GSAP Scroll Animations
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

      // Scrubbed Entrance Stagger
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      enterTl
        .from('.testimonials__header', { y: 100, opacity: 0 }, 0)
        .from('.testimonials__stack-container', { y: 150, opacity: 0, scale: 0.95 }, 0.1);

    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-shuffle testimonials every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentCard = cardsRef.current[activeIndex];
    
    // Shuffle animation: animate top card out to the side
    gsap.to(currentCard, {
      x: 320,
      rotation: 12,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Move activeIndex to next card
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }
    });
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // To go backwards, we animate the target card (the new top card) from the side into the stack
    const prevIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    const prevCard = cardsRef.current[prevIndex];

    // Put prevCard out of stack first
    gsap.set(prevCard, {
      x: -320,
      rotation: -12,
      opacity: 0,
      zIndex: testimonials.length + 1,
    });

    // Update state to make it top card
    setActiveIndex(prevIndex);

    // Animate it in
    gsap.to(prevCard, {
      x: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setIsAnimating(false);
      }
    });
  };

  return (
    <div ref={sectionRef} className="testimonials-wrapper">
      <SectionWrapper id="testimonials" className="testimonials__section">
        <div className="container testimonials__container">
          
          {/* Centered Header */}
          <div className="testimonials__header">
            <h2 className="testimonials__title">
              Trusted by Teams That Serve <TypewriterText text="Millions" />
            </h2>
            <p className="testimonials__subtitle">
              Helping departments, enterprises, and public platforms deliver faster access to trusted information.
            </p>
          </div>

          {/* Centered Stack of Cards */}
          <div className="testimonials__stack-container">
            <div className="testimonials__stack">
              {testimonials.map((item, i) => (
                <div 
                  key={i} 
                  ref={addToRefs}
                  className="testimonial__card"
                >
                  {/* Card Top Header */}
                  <div className="testimonial__card-header">
                    <div className="testimonial__card-logo">
                      <span className="testimonial__card-logo-dot">●</span>
                      <span className="testimonial__card-logo-text">{item.company}</span>
                    </div>
                    <div className="testimonial__card-dots">•••</div>
                  </div>

                  {/* Quote content */}
                  <div className="testimonial__card-body">
                    <span className="testimonial__card-quote-mark">“</span>
                    <p className="testimonial__card-quote">
                      {item.quote}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="testimonial__card-footer">
                    <div className="testimonial__profile">
                      <img 
                        src={testimonialImg} 
                        alt={item.author} 
                        className="testimonial__avatar" 
                      />
                      <div className="testimonial__profile-details">
                        <span className="testimonial__author">{item.author}</span>
                        <span className="testimonial__role">{item.role}</span>
                      </div>
                    </div>
                    <div className="testimonial__card-social">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="testimonial__controls">
              <button 
                className="testimonial__control-btn testimonial__control-btn--active"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                disabled={isAnimating}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="testimonial__control-btn testimonial__control-btn--active"
                onClick={handleNext}
                aria-label="Next testimonial"
                disabled={isAnimating}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
