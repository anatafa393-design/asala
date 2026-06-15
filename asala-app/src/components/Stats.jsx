import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ end, label, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let obj = { val: 0 };
    const tl = gsap.to(obj, {
      val: end,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.floor(obj.val)),
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      }
    });
    return () => tl.kill();
  }, [end]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number"><span className="gold-text">{count}</span>{suffix}</div>
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
