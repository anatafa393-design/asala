import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const values = [
  'جودة عالية في كل تفصيلة',
  'فريق محترف ومتخصص',
  'التزام بالمواعيد والميزانية',
  'تسليم مفتاح من الألف للياء',
];

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    // Text animation
    gsap.fromTo(textRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );

    // Images staggered animation
    const imgs = imagesRef.current.querySelectorAll('.about-img-wrapper');
    gsap.fromTo(imgs,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-inner">

        {/* ── Text Column (يمين في RTL) ───────────────────────── */}
        <div className="about-text-col" ref={textRef}>
          <p className="about-eyebrow">من نحن</p>
          <h2 className="section-title" style={{ textAlign: 'right', marginBottom: '24px' }}>
            شركة <span className="gold-text">أصالة</span> للديكور<br />والمقاولات العامة
          </h2>

          <p className="about-text">
            أصالة هي شركة سعودية متخصصة في التصميم الداخلي والديكور والتجهيزات والمقاولات العامة.
            نقدم حلولاً متكاملة (تسليم مفتاح) للمشاريع السكنية والتجارية والمؤسسية، وندير كل مرحلة
            بدءاً من تطوير الفكرة والتصميم، وحتى التنفيذ والتشطيب وتسليم المشروع.
          </p>

          <p className="about-text">
            نهدف إلى تقديم مشاريع عالية الجودة تجمع بين الأداء الوظيفي والجماليات العصرية، ودقة التنفيذ،
            والقيمة طويلة المدى — لتلبية تطلعات عملائنا بأعلى المعايير والاهتمام بأدق التفاصيل.
          </p>

          <ul className="about-values-list">
            {values.map((v, i) => (
              <li key={i} className="about-value-item">
                <CheckCircle size={20} className="gold-text" />
                <span>{v}</span>
              </li>
            ))}
          </ul>

          <MagneticButton
            variant="primary"
            style={{ marginTop: '40px' }}
            onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
          >
            شاهد أعمالنا
          </MagneticButton>
        </div>

        {/* ── Images Column (يسار في RTL) ────────────────────── */}
        <div className="about-images" ref={imagesRef}>
          {/* Big image */}
          <div className="about-img-wrapper about-img-main">
            <img
              src="/images/ديكورات_مجالس/1.webp"
              alt="فريق أصالة للتصميم"
              className="about-img"
            />
            <div className="about-img-label">مشاريعنا الفاخرة</div>
          </div>

          {/* Small images */}
          <div className="about-img-secondary-group">
            <div className="about-img-wrapper about-img-sm">
              <img
                src="/images/ديكورات_مداخل/1.webp"
                alt="عملية التصميم"
                className="about-img"
              />
              <div className="about-img-label">رقي المداخل والتصميم</div>
            </div>

            <div className="about-img-wrapper about-img-sm">
              <img
                src="/images/ديكورات_جدران/1.webp"
                alt="مشروع منجز"
                className="about-img"
              />
              <div className="about-img-label">مشاريعنا المنجزة</div>
            </div>
          </div>

          {/* Floating gold badge — now on the right side of images */}
          <div className="about-badge">
            <span className="about-badge-number gold-text">+15</span>
            <span className="about-badge-text">سنة خبرة</span>
          </div>
        </div>

      </div>
    </section>

  );
};

export default About;
