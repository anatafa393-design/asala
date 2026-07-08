import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const values = [
  'الديكور الداخلي والتصميم ثلاثي الأبعاد',
  'تنفيذ أعمال الجبس والأسقف المستعارة',
  'تنفيذ الإضاءات الحديثة وأنظمة البروفايل',
  'تركيب الأرضيات والبدائل الخشبية والبورسلان',
  'تنفيذ أعمال التشطيبات السكنية والتجارية',
  'تصميم وتنفيذ المكاتب والمعارض والمحلات',
  'تنفيذ الأثاث والتجهيزات الداخلية',
  'إدارة المشاريع والمقاولات العامة'
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
        
        {/* ── ZONE 1: Intro Grid (Text Right, Collage Left) ── */}
        <div className="about-hero-grid">
          
          {/* Text Column */}
          <div className="about-text-col" ref={textRef}>
            <p className="about-eyebrow">من نحن</p>
            <h2 className="section-title" style={{ textAlign: 'right', marginBottom: '24px' }}>
              شركة <span className="gold-text">أصالة</span> للديكور<br />والمقاولات العامة
            </h2>

            <p className="about-text-highlight">
              نحوّل الأفكار إلى مساحات تنبض بالجمال والجودة.
            </p>

            <p className="about-text">
              تُعد شركة أصالة للديكور والمقاولات العامة إحدى الشركات المتخصصة في تنفيذ أعمال الديكور الداخلي والمقاولات العامة، حيث نجمع بين الإبداع الهندسي، وجودة التنفيذ، والدقة في التفاصيل لنقدم حلولاً متكاملة تلبي تطلعات عملائنا.
            </p>

            <p className="about-text">
              نؤمن بأن كل مشروع يحمل هوية خاصة، لذلك نعمل على تصميم وتنفيذ المساحات السكنية والتجارية والإدارية بأسلوب احترافي يجمع بين الفخامة، والوظيفة، والاستدامة. ويشرف على جميع مراحل العمل فريق متخصص يلتزم بأعلى معايير الجودة، مع الحرص على الالتزام بالجدول الزمني والميزانية المتفق عليها.
            </p>

            <MagneticButton
              variant="primary"
              style={{ marginTop: '24px' }}
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
            >
              شاهد أعمالنا
            </MagneticButton>
          </div>

          {/* Collage Column */}
          <div className="about-images" ref={imagesRef}>
            {/* Big image */}
            <div className="about-img-wrapper about-img-main">
              <img
                src="/images/about_main.png"
                alt="تصميم داخلي فاخر من شركة أصالة"
                className="about-img"
              />
              <div className="about-img-label">مشاريعنا السكنية الفاخرة</div>
            </div>

            {/* Small images */}
            <div className="about-img-secondary-group">
              <div className="about-img-wrapper about-img-sm">
                <img
                  src="/images/about_detail.png"
                  alt="تفاصيل تشطيبات جبس وإضاءة حديثة"
                  className="about-img"
                />
                <div className="about-img-label">دقة التنفيذ والتشطيب</div>
              </div>

              <div className="about-img-wrapper about-img-sm">
                <img
                  src="/images/about_office.png"
                  alt="تصميم مكاتب ومعارض تجارية"
                  className="about-img"
                />
                <div className="about-img-label">المشاريع التجارية والإدارية</div>
              </div>
            </div>

            {/* Floating gold badge */}
            <div className="about-badge">
              <span className="about-badge-number gold-text">+15</span>
              <span className="about-badge-text">سنة خبرة</span>
            </div>
          </div>

        </div>

        {/* ── ZONE 2: Vision & Mission (Side by Side Cards) ── */}
        <div className="about-vision-mission-row">
          <div className="about-card glass-card">
            <div className="about-card-icon">🎯</div>
            <h3>رؤيتنا</h3>
            <p>أن نكون الخيار الأول في قطاع الديكور والمقاولات، من خلال تقديم مشاريع تجمع بين الإبداع، والجودة، والالتزام.</p>
          </div>

          <div className="about-card glass-card">
            <div className="about-card-icon">✉️</div>
            <h3>رسالتنا</h3>
            <p>تقديم حلول تصميم وتنفيذ متكاملة تضيف قيمة حقيقية لكل مشروع، مع بناء علاقات طويلة الأمد تقوم على الثقة والاحترافية.</p>
          </div>
        </div>

        {/* ── ZONE 3: Services Grid (4 Columns) ── */}
        <div className="about-services-section">
          <h3 className="about-services-title">تشمل أعمالنا</h3>
          <div className="about-services-grid">
            {values.map((v, i) => (
              <div key={i} className="about-service-card">
                <CheckCircle size={20} className="gold-text" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ZONE 4: Quote Banner ── */}
        <div className="about-quote-banner">
          <span className="quote-mark">“</span>
          <p className="about-quote-text">
            في أصالة لا نقدم مجرد أعمال ديكور أو مقاولات، بل نصنع بيئات تعكس هوية عملائنا وتحقق أعلى مستويات الجودة والإتقان، لنمنح كل مشروع بصمة فريدة تستحق أن تُروى.
          </p>
          <span className="quote-mark">”</span>
        </div>

      </div>
    </section>
  );
};

export default About;
