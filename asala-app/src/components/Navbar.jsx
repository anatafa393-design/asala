import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onHomeRedirect }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    setIsOpen(false);
    if (onHomeRedirect) {
      // If we are in project detail view, go back home first
      onHomeRedirect();
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-content">
        <a href="#hero" className="logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          <img 
            src="/logo.png" 
            alt="أصالة للتصميم" 
            className="nav-logo" 
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.getElementById('fallback-text');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span id="fallback-text" style={{ display: 'none' }}>
            <span className="gold-text">أصالة</span> للتصميم
          </span>
        </a>

        {/* Hamburger Menu Icon for Mobile */}
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}>الرئيسية</a></li>
          <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>نبذة عنا</a></li>
          <li><a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>خدماتنا</a></li>
          <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, 'portfolio')}>معرض أعمالنا</a></li>
          <li><a href="#testimonials" onClick={(e) => handleLinkClick(e, 'testimonials')}>آراء العملاء</a></li>
          <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>تواصل معنا</a></li>
          <li className="mobile-only-cta">
            <MagneticButton variant="primary" onClick={() => window.open('https://wa.me/966507030093', '_blank')}>
              اطلب تسعيرة
            </MagneticButton>
          </li>
        </ul>

        <div className="nav-desktop-cta">
          <MagneticButton variant="primary" strength={0.3} onClick={() => window.open('https://wa.me/966507030093', '_blank')}>
            اطلب تسعيرة
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
