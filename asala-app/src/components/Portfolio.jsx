import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

// Map project IDs to categories
const categoryMap = {
  ديكورات_اسقف: 'residential',
  ديكورات_جدران: 'residential',
  ديكورات_حمامات: 'residential',
  ديكورات_خزاين: 'residential',
  ديكورات_غرف_نوم: 'residential',
  ديكورات_مجالس: 'residential',
  ديكورات_مداخل: 'residential',
  ديكورات_مطابخ: 'residential',
  ديكورات_تلفزيون: 'commercial',
  'صور ديكور مطاعم فاخره': 'commercial',
  'صور ديكور مكاتب': 'commercial',
  ديكورات_خارجيه: 'exterior'
};

const filterTabs = [
  { id: 'all', label: 'الكل' },
  { id: 'residential', label: 'تصميم سكني' },
  { id: 'commercial', label: 'تصميم تجاري' },
  { id: 'exterior', label: 'تصميم خارجي' }
];

const Portfolio = ({ onProjectSelect }) => {
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const items = gsap.utils.toArray('.portfolio-item');
    if (items.length > 0) {
      gsap.fromTo(items, 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, [filter]); // Re-run animation when filter changes

  const filteredProjects = projects.filter(proj => {
    if (filter === 'all') return true;
    return categoryMap[proj.id] === filter;
  });

  return (
    <section id="portfolio" className="section portfolio-section">
      <h2 className="section-title">معرض <span className="gold-text">أعمالنا</span></h2>
      
      {/* Category Filter Tabs */}
      <div className="portfolio-filters">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
            {filter === tab.id && (
              <motion.span 
                layoutId="active-filter-indicator" 
                className="filter-indicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="portfolio-grid" ref={gridRef}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={proj.id} 
              className="portfolio-item" 
              onClick={() => onProjectSelect(proj)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onProjectSelect(proj);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`عرض تفاصيل ${proj.title}`}
            >
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
