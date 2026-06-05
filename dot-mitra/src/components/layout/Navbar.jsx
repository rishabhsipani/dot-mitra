import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CTAButton from '../ui/CTAButton';
import { NAV_LINKS } from '../../utils/constants';
import logoWhite from '../../assets/Logo white.svg';
import logoBlack from '../../assets/Logo black.svg';
import { ScrollTrigger } from '../../utils/gsapConfig';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Switch to light theme only after the Hero's pinned sequence is fully scrolled past
    const trigger = ScrollTrigger.create({
      trigger: '#problem',
      start: 'top 80px',
      onEnter: () => setIsLight(true),
      onLeaveBack: () => setIsLight(false),
      // Handle page refreshes at scroll positions past the hero section
      onRefresh: (self) => {
        setIsLight(self.scroll() > self.start);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isLight ? 'navbar--light' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          <a href="/" className="navbar__logo" aria-label="Dot Mitra home">
            <img
              src={isLight ? logoBlack : logoWhite}
              alt="Dot Mitra"
              className="navbar__logo-img"
              style={{ height: '36px', width: 'auto' }}
            />
          </a>

          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <CTAButton label="Request Demo" href="#" variant="primary" />
          </div>

          <button
            className="navbar__menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
          <ul className="navbar__mobile-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CTAButton label="Request Demo" href="#" variant="primary" className="navbar__mobile-cta" />
        </div>
      </nav>
    </>
  );
}
