import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import SectionHeader from '../../components/ui/SectionHeader';
import { faqItems } from '../../data/faq';
import './FAQSection.css';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__question">{question}</span>
        <motion.span
          className="faq__chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="faq__answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
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
        .from('.section-header', { y: 100, opacity: 0 }, 0)
        .from('.faq__item', { y: 80, opacity: 0, stagger: 0.1 }, 0.1);

    }, container);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" className="section--off-white">
      <div className="container" ref={containerRef}>
        <SectionHeader
          title="Frequently Asked Questions"
          highlightWord="Questions"
          subtitle="Everything you need to know about DoT Mitra. Can't find what you're looking for? Contact our team."
        />

        <div className="faq__list">
          {faqItems.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
