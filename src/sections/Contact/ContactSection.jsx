import { useState, useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import TypewriterText from '../../components/ui/TypewriterText';
import contactUsBg from '../../assets/contact us.png';
import { Mail, Phone } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic here if needed
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };

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
        .from('.contact__card', { y: 150, opacity: 0, scale: 0.95 }, 0)
        .from('.contact__info', { y: 100, opacity: 0 }, 0.1)
        .from('.contact__form', { y: 100, opacity: 0 }, 0.2);

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="contact" className="contact__section">
      <div className="container" ref={containerRef}>
        <div className="contact__card" style={{ backgroundImage: `url(${contactUsBg})` }}>
            
            {/* Left Column: CTA Info */}
            <div className="contact__info">
              <span className="contact__subtitle">Ready to Transform Knowledge Access?</span>
              <h2 className="contact__title">
                Bring DoT Mitra to Your <TypewriterText text="Organization" color="#A4C2FF" />
              </h2>
              <p className="contact__desc">
                Empower departments, enterprises, and citizen-facing platforms with instant access to trusted information through an AI-powered knowledge assistant.
              </p>
              <div className="contact__details">
                <span className="contact__detail-item">
                  <Mail className="contact__detail-icon" />
                  info@dotmitra.gov.in
                </span>
                <span className="contact__detail-divider">|</span>
                <span className="contact__detail-item">
                  <Phone className="contact__detail-icon" />
                  +91-11 2345 6789
                </span>
              </div>
            </div>

            {/* Right Column: Form */}
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__field">
                <label className="contact__label">Name<span className="contact__required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="contact__input"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label">Email<span className="contact__required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="uxbynrj@gmail.com"
                  required
                  className="contact__input"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="1"
                  className="contact__input contact__textarea"
                />
              </div>

              <div className="contact__actions">
                <button type="submit" className="contact__btn contact__btn--submit">
                  Submit
                </button>
                <button type="button" onClick={handleReset} className="contact__btn contact__btn--reset">
                  Reset
                </button>
              </div>
            </form>

          </div>
      </div>
    </SectionWrapper>
  );
}
