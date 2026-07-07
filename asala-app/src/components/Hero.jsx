import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

// ── Two sets of images for the two ticker strips ──────────────────────
const tickerCol1 = [
  '/images/ديكورات_مجالس/1.webp',
  '/images/ديكورات_اسقف/1.webp',
  '/images/ديكورات_مطابخ/1.webp',
  '/images/ديكورات_غرف_نوم/1.webp',
  '/images/ديكورات_جدران/1.webp',
  '/images/ديكورات_خارجيه/1.webp',
];

const tickerCol2 = [
  '/images/ديكورات_حمامات/1.webp',
  '/images/ديكورات_خزاين/1.webp',
  '/images/ديكورات_مداخل/1.webp',
  '/images/صور ديكور مطاعم فاخره/imgi_114_pexels-asadphoto-1449773-scaled.webp',
  '/images/صور ديكور مكاتب/imgi_108_modern-office-decor.webp',
  '/images/ديكورات_تلفزيون/1.webp',
];

const VerticalTicker = ({ images, direction = 'up', speed = 30 }) => {
  // Duplicate 3× so the loop is seamless regardless of screen height
  const items = [...images, ...images, ...images];

  return (
    <div className="vticker-strip" dir="ltr">
      <div
        className={`vticker-track vticker-${direction}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((src, i) => (
          <div key={i} className="vticker-item">
            <img src={src} alt={`project ${i}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1.4, ease: 'power3.out', delay: 0.4 }
    );
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Dark background */}
      <div className="hero-bg-solid" />

      {/* ── Layout: Text LEFT · Tickers RIGHT ── */}
      <div className="hero-layout">

        {/* Text column */}
        <div className="hero-text-col" ref={textRef}>
          <p className="hero-eyebrow">شركة أصالة للديكور والمقاولات العامة</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}>
            ( تصميم - توريد - تنفيذ - تسليم )<br />
            <span className="gold-text">تجاري - سكني</span>
          </h1>
          <p className="hero-subtitle">
            نحوّل المساحات من خلال تصاميم مبتكرة<br />وتنفيذ احترافي من الألف للياء.
          </p>

          <div className="hero-cta-row">
            <MagneticButton
              variant="primary"
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
            >
              استكشف مشاريعنا
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => window.open('https://wa.me/966507030093', '_blank')}
            >
              تواصل معنا
            </MagneticButton>
          </div>

          {/* Quick trust badges */}
          <div className="hero-badges">
            <div className="hero-badge"><span className="gold-text">+150</span><span>مشروع منجز</span></div>
            <div className="hero-badge-divider" />
            <div className="hero-badge"><span className="gold-text">+15</span><span>سنة خبرة</span></div>
            <div className="hero-badge-divider" />
            <div className="hero-badge"><span className="gold-text">100%</span><span>رضا العملاء</span></div>
          </div>
        </div>

        {/* Vertical tickers column */}
        <div className="hero-tickers-col" aria-hidden="true">
          <VerticalTicker images={tickerCol1} direction="up"   speed={28} />
          <VerticalTicker images={tickerCol2} direction="down" speed={24} />
        </div>

      </div>

      {/* Bottom fade-out gradient */}
      <div className="hero-bottom-fade" />
    </section>
  );
};

export default Hero;
