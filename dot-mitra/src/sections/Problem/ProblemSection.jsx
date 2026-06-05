import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import TypewriterText from '../../components/ui/TypewriterText';
import { problemCards } from '../../data/features';
import './ProblemSection.css';

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Parallax Exit for previous section (Hero)
      // When ProblemSection enters the viewport from the bottom, animate the hero elements upward faster
      gsap.to('#hero .hero__content', {
        y: -150,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // When top of ProblemSection hits bottom of viewport
          end: 'top top', // Until it reaches the top
          scrub: 1,
        }
      });

      gsap.to('#hero .hero__cta-group', {
        y: -100, // Slightly different speed for layered effect
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        }
      });

      // Parallax entrance for Problem Section elements
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 150 + (index * 40), opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'center center',
              scrub: 1.5, // slightly slower scrub for that layered parallax feel
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="problem-wrapper">
      <SectionWrapper id="problem" className="problem-section-wrapper">
        <div className="container">
          <div className="problem__gradient-box">
            <h2 className="problem__title" ref={titleRef}>
              Finding Information Shouldn't <TypewriterText text="Take Hours" color="#A4C2FF" />
            </h2>

            <div className="problem__grid">
              {problemCards.map((card, index) => (
                <div 
                  key={card.title} 
                  className="problem__card"
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <div className="problem__card-image-wrapper">
                    <img src={card.image} alt={card.title} className="problem__card-image" />
                  </div>
                  <h3 className="problem__card-title">{card.title}</h3>
                  <p className="problem__card-description">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
