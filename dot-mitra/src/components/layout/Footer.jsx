import { Mail, Phone, MapPin } from 'lucide-react';
import logoWhite from '../../assets/Logo white.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer__content">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <a href="/" className="footer__logo" aria-label="Dot Mitra home">
                <img
                  src={logoWhite}
                  alt="Dot Mitra"
                  className="footer__logo-img"
                  style={{ height: '36px', width: 'auto' }}
                />
              </a>
              <p className="footer__brand-desc">
                Your AI-powered knowledge assistant for government and enterprise.
              </p>
            </div>

            {/* Product Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Product</h4>
              <ul className="footer__column-links">
                <li><a href="#features" className="footer__link">Features</a></li>
                <li><a href="#pricing" className="footer__link">Pricing</a></li>
                <li><a href="#faq" className="footer__link">FAQ</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__column-links">
                <li><a href="#about" className="footer__link">About Us</a></li>
                <li><a href="#contact" className="footer__link">Contact</a></li>
                <li><a href="#privacy" className="footer__link">Privacy Policy</a></li>
                <li><a href="#terms" className="footer__link">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer__column">
              <h4 className="footer__column-title">Contact</h4>
              <ul className="footer__column-links footer__contact-list">
                <li className="footer__contact-item">
                  <Mail size={16} className="footer__contact-icon" />
                  <a href="mailto:info@dotmitra.gov.in" className="footer__link">info@dotmitra.gov.in</a>
                </li>
                <li className="footer__contact-item">
                  <Phone size={16} className="footer__contact-icon" />
                  <a href="tel:+911123456789" className="footer__link">+91 11 2345 6789</a>
                </li>
                <li className="footer__contact-item">
                  <MapPin size={16} className="footer__contact-icon" />
                  <span className="footer__contact-text">New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">© 2026 Dot Mitra. All rights reserved.</p>
            <div className="footer__bottom-links">
              <a href="#privacy" className="footer__bottom-link">Privacy</a>
              <a href="#terms" className="footer__bottom-link">Terms</a>
              <a href="#cookies" className="footer__bottom-link">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
