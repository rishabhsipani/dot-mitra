import SectionWrapper from '../../components/ui/SectionWrapper';
import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionHeader from '../../components/ui/SectionHeader';
import { pricingTiers } from '../../data/pricing';
import { Check } from 'lucide-react';
import './PricingSection.css';

export default function PricingSection() {
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
        .from(container.querySelector('.pricing__section-header'), { y: 40, opacity: 0 }, 0)
        .from(container.querySelectorAll('.pricing__card'), { y: 50, opacity: 0, stagger: 0.1 }, 0.1);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="pricing" className="section--off-white">
      <div className="container" ref={containerRef}>
        <SectionHeader
          title="Flexible Plans for Every Scale"
          highlightWord="Every Scale"
          subtitle="Whether for pilot deployments or nationwide implementations, DoT Mitra grows with your organization."
          alignment="center"
          className="pricing__section-header"
        />

        <div className="pricing__grid">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing__card ${tier.popular ? 'pricing__card--popular' : ''}`}
            >
              {tier.popular && (
                <div className="pricing__badge">Most Popular</div>
              )}
              <div className="pricing__card-header">
                <h3 className="pricing__tier-name">{tier.name}</h3>
                <div className="pricing__price">
                  {tier.price !== 'Custom Pricing' && <span className="pricing__currency">₹</span>}
                  <span className="pricing__amount">{tier.price}</span>
                  {tier.period && <span className="pricing__period">{tier.period}</span>}
                </div>
                <p className="pricing__description">{tier.description}</p>
              </div>

              <ul className="pricing__features">
                {tier.features.map((feature) => (
                  <li key={feature} className="pricing__feature-item">
                    <Check size={16} className={`pricing__check ${tier.popular ? 'pricing__check--popular' : ''}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`pricing__cta-btn ${tier.popular ? 'pricing__cta-btn--popular' : ''}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
