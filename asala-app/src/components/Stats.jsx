import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ end, label, suffix = '+' }) => {
  const numberRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let obj = { val: 0 };
    const tl = gsap.to(obj, {
      val: end,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(obj.val);
        }
      }
    });
    return () => tl.kill();
  }, [end]);

  return (
    <div className="stat-item" ref={containerRef}>
      <div className="stat-number">
        <span className="gold-text" ref={numberRef}>0</span>
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-overlay"></div>
      <div className="stats-container">
        <StatItem end={150} label="مشروع منجز" />
        <StatItem end={120} label="عميل راضٍ" />
        <StatItem end={15} label="سنة خبرة" />
      </div>
    </section>
  );
};

export default Stats;
