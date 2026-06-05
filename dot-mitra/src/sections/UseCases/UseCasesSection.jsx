import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionHeader from '../../components/ui/SectionHeader';
import card1 from '../../assets/card 1.png';
import card2 from '../../assets/card 2.png';
import card3 from '../../assets/card 3.png';
import card4 from '../../assets/card4.png';
import './UseCasesSection.css';

const cards = [
  { src: card1, alt: 'Citizen Helpdesk', rotation: 0 },
  { src: card2, alt: 'Enterprise Knowledge Hub', rotation: -3 },
  { src: card3, alt: 'Licensing & Compliance', rotation: -6 },
  { src: card4, alt: 'Internal Operations', rotation: -9 },
];

export default function UseCasesSection() {
  const pinRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    const stackEl = stackRef.current;
    if (!pinEl || !stackEl) return;

    const cardEls = stackEl.querySelectorAll('.uc__card');
    if (cardEls.length < 4) return;

    const ctx = gsap.context(() => {
      // Subtle Container Parallax
      gsap.to('.uc__inner', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      // Header Stagger
      gsap.from('.uc__header-area', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: pinEl,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.5,
        }
      });

      // Initially hide cards 2–4 below the visible area of the stack
      gsap.set(Array.from(cardEls).slice(1), {
        yPercent: 120,
        opacity: 1,
      });

      // Build a timeline using CSS sticky instead of GSAP pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // Animate each card up one at a time with its target rotation
      tl.to(cardEls[1], {
        yPercent: 0,
        rotation: cards[1].rotation,
        duration: 1,
        ease: 'power2.out',
      })
      .to(cardEls[2], {
        yPercent: 0,
        rotation: cards[2].rotation,
        duration: 1,
        ease: 'power2.out',
      })
      .to(cardEls[3], {
        yPercent: 0,
        rotation: cards[3].rotation,
        duration: 1,
        ease: 'power2.out',
      });

      // Exit animation: lift up and fade out as the section scrolls away
      gsap.to('.uc__header-area', {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(stackEl, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, pinEl);

    return () => ctx.revert();
  }, []);

  return (
    <section id="use-cases" className="uc__section" ref={pinRef}>
      <div className="uc__inner">
        <div className="uc__header-area">
          <SectionHeader
            title="Built for Real-World Applications"
            highlightWord="Applications"
            subtitle="From citizen services to enterprise operations, Dot Mitra helps organizations deliver faster, smarter, and more accessible information experiences."
            alignment="center"
            className="uc__header"
          />
        </div>

        <div className="uc__stack" ref={stackRef}>
          {cards.map((card, i) => (
            <div
              key={card.alt}
              className="uc__card"
              style={{ zIndex: i + 1 }}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="uc__card-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
