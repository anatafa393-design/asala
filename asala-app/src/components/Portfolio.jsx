import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { projects } from '../data';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = ({ onProjectSelect }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.portfolio-item');
    if (items.length > 0) {
      gsap.fromTo(items, 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="portfolio" className="section portfolio-section">
      <h2 className="section-title">معرض <span className="gold-text">أعمالنا</span></h2>
      <div className="portfolio-grid" ref={gridRef}>
        {projects.map((proj) => (
          <div key={proj.id} className="portfolio-item" onClick={() => onProjectSelect(proj)}>
            <motion.img 
              layoutId={`project-image-${proj.id}`}
              src={proj.cover} 
              alt={proj.title} 
              className="portfolio-cover" 
              loading="lazy" 
            />
            <div className="portfolio-overlay">
              <h3>{proj.title}</h3>
              <span>عرض تفاصيل المشروع</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
