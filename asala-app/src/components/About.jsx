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

        {/* ── Text Column (يمين في RTL) ───────────────────────── */}
        <div className="about-text-col" ref={textRef}>
          <p className="about-eyebrow">من نحن</p>
          <h2 className="section-title" style={{ textAlign: 'right', marginBottom: '24px' }}>
            شركة <span className="gold-text">أصالة</span> للديكور<br />والمقاولات العامة
          </h2>

          <p className="about-text" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gold)' }}>
            نحوّل الأفكار إلى مساحات تنبض بالجمال والجودة.
          </p>

          <p className="about-text">
            تُعد شركة أصالة للديكور والمقاولات العامة إحدى الشركات المتخصصة في تنفيذ أعمال الديكور الداخلي والمقاولات العامة، حيث نجمع بين الإبداع الهندسي، وجودة التنفيذ، والدقة في التفاصيل لنقدم حلولاً متكاملة تلبي تطلعات عملائنا.
          </p>

          <p className="about-text">
            نؤمن بأن كل مشروع يحمل هوية خاصة، لذلك نعمل على تصميم وتنفيذ المساحات السكنية والتجارية والإدارية بأسلوب احترافي يجمع بين الفخامة، والوظيفة، والاستدامة. ويشرف على جميع مراحل العمل فريق متخصص يلتزم بأعلى معايير الجودة، مع الحرص على الالتزام بالجدول الزمني والميزانية المتفق عليها.
          </p>
          
          <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '10px' }}>رؤيتنا</h3>
          <p className="about-text">أن نكون الخيار الأول في قطاع الديكور والمقاولات، من خلال تقديم مشاريع تجمع بين الإبداع، والجودة، والالتزام.</p>
          
          <h3 style={{ color: 'white', marginTop: '20px', marginBottom: '10px' }}>رسالتنا</h3>
          <p className="about-text">تقديم حلول تصميم وتنفيذ متكاملة تضيف قيمة حقيقية لكل مشروع، مع بناء علاقات طويلة الأمد تقوم على الثقة والاحترافية.</p>
          
          <p className="about-text" style={{ fontStyle: 'italic', opacity: 0.9 }}>
            في أصالة لا نقدم مجرد أعمال ديكور أو مقاولات، بل نصنع بيئات تعكس هوية عملائنا وتحقق أعلى مستويات الجودة والإتقان، لنمنح كل مشروع بصمة فريدة تستحق أن تُروى.
          </p>

          <h3 style={{ color: 'white', marginTop: '30px', marginBottom: '15px' }}>خدماتنا</h3>

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
