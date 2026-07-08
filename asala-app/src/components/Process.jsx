import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "٠١",
    title: "الاستشارة والتخطيط",
    desc: "نجلس معك لفهم رؤيتك وتطلعاتك للمساحة، وندرس المخططات لنضع خطة عمل واضحة تتناسب مع ميزانيتك والجدول الزمني."
  },
  {
    num: "٠٢",
    title: "التصميم ثلاثي الأبعاد",
    desc: "نحوّل الأفكار إلى تصاميم ورسومات 3D تفصيلية تحاكي الواقع بدقة، لتتمكن من رؤية وتعديل كل تفصيلة قبل بدء التنفيذ."
  },
  {
    num: "٠٣",
    title: "التنفيذ والتجهيز",
    desc: "يبدأ فريقنا الهندسي والفني المتخصص بتنفيذ المخططات على أرض الواقع بدقة متناهية، ملتزمين بأعلى معايير الجودة."
  },
  {
    num: "٠٤",
    title: "التسليم والضمان",
    desc: "نسلمك المساحة جاهزة بالكامل (تسليم مفتاح) متطابقة تماماً مع التصاميم المعتمدة، مع تقديم الدعم والضمانات المستمرة."
  }
];

const Process = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.process-step-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="process" className="section process-section" ref={containerRef}>
      <h2 className="section-title">كيف <span className="gold-text">نعمل؟</span></h2>
      <p className="process-subtitle">منهجية عمل هندسية ومنظمة نضمن بها فخامة التصميم وجودة التنفيذ</p>
      
      <div className="process-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="process-step-card">
            <div className="step-num-bg">{step.num}</div>
            <div className="step-content">
              <span className="step-number-pill">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
            {idx < steps.length - 1 && <div className="step-connector" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
