import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import { enterpriseFeatures } from '../../data/features';
import TypewriterText from '../../components/ui/TypewriterText';
import './EnterpriseFeaturesSection.css';

export default function EnterpriseFeaturesSection() {
  const sectionRef = useRef(null);
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

      // Header Stagger
      gsap.from('.enterprise__header', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      // Entrance Parallax: Animate previous section (solution) out
      gsap.to('#solution .solution__interactive-area', {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
        }
      });

      // Animate the cards entering
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 100 + (i * 20), opacity: 0 },
          {
            y: 0, opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      });
      
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="enterprise-wrapper">
      <SectionWrapper id="enterprise-features" className="section--off-white enterprise-section">
        <div className="container">
          
          <div className="enterprise__header">
            <h2 className="enterprise__title">
              Enterprise-Grade <span className="enterprise__title-highlight">
                <TypewriterText text="Architecture" />
              </span>
            </h2>
            <p className="enterprise__subtitle">
              Built for secure, scalable, and enterprise-ready AI deployments.
            </p>
          </div>

          <div className="enterprise__grid">
            {enterpriseFeatures.map((feature, index) => {
              // Custom class for the 4th item (index 3) to span 2 columns
              const isWide = index === 3;
              return (
                <div 
                  key={feature.title} 
                  className={`enterprise__card ${isWide ? 'enterprise__card--wide' : ''}`}
                  ref={el => cardsRef.current[index] = el}
                >
                  <div className="enterprise__card-image-wrapper">
                    <img src={feature.image} alt={feature.title} className="enterprise__card-image" />
                  </div>
                  <div className="enterprise__card-content">
                    <h3 className="enterprise__card-title">{feature.title}</h3>
                    <p className="enterprise__card-desc">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </SectionWrapper>
    </div>
  );
}
