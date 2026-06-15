import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhotoStackCard } from './PhotoStackCard';
import { projects } from '../data';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { 
    title: 'تصميم الأسقف', 
    category: 'تصميم داخلي', 
    desc: 'تصاميم مبتكرة للأسقف مع إضاءة مدمجة.',
    images: ["/images/ديكورات_اسقف/1.webp", "/images/ديكورات_اسقف/8YbkmBJYfo8M.webp", "/images/ديكورات_اسقف/MbhWdJl96nte.webp"],
    projectId: 'ديكورات_اسقف'
  },
  { 
    title: 'ديكور الجدران', 
    category: 'تصميم داخلي', 
    desc: 'معالجات جدارية أنيقة وتلبيسات مخصصة.',
    images: ["/images/ديكورات_جدران/1.webp", "/images/ديكورات_جدران/4kLpxtROBLdv.webp", "/images/ديكورات_جدران/5o1z83Ojift2.webp"],
    projectId: 'ديكورات_جدران'
  },
  { 
    title: 'المطابخ', 
    category: 'تصميم داخلي', 
    desc: 'مساحات مطابخ حديثة ومتكاملة ومريحة.',
    images: ["/images/ديكورات_مطابخ/1.webp", "/images/ديكورات_مطابخ/CMHEu0hDidiX.webp", "/images/ديكورات_مطابخ/d1iw7RlZvmtE.webp"],
    projectId: 'ديكورات_مطابخ'
  },
  { 
    title: 'غرف النوم', 
    category: 'تصميم داخلي', 
    desc: 'تصاميم داخلية مريحة وفاخرة لغرف النوم.',
    images: ["/images/ديكورات_غرف_نوم/1.webp", "/images/ديكورات_غرف_نوم/6gRkhPqMYbXn.webp", "/images/ديكورات_غرف_نوم/B0wS0zPR8kVK.webp"],
    projectId: 'ديكورات_غرف_نوم'
  },
  { 
    title: 'التصميم الخارجي', 
    category: 'تصميم خارجي', 
    desc: 'واجهات مذهلة وتنسيق حدائق خارجية.',
    images: ["/images/ديكورات_خارجيه/1.webp", "/images/ديكورات_خارجيه/4fY50d4dHTZf.webp", "/images/ديكورات_خارجيه/BPCbDADvuPP7.webp"],
    projectId: 'ديكورات_خارجيه'
  },
  { 
    title: 'تسليم مفتاح', 
    category: 'مقاولات عامة', 
    desc: 'تنفيذ شامل وتسليم المشاريع بالكامل من الألف للياء.',
    images: ["/images/صور ديكور مكاتب/imgi_108_modern-office-decor.webp", "/images/ديكورات_مجالس/1.webp", "/images/ديكورات_حمامات/1.webp"],
    projectId: 'ديكورات_مجالس'
  }
];

const Services = ({ onProjectSelect }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-wrapper');
    gsap.fromTo(cards, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const handleViewProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project && onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
    <section id="services" className="section services-section" ref={containerRef}>
      <h2 className="section-title">استكشف <span className="gold-text">خدماتنا</span></h2>
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {servicesList.map((srv, index) => (
          <div key={index} className="service-wrapper">
            <PhotoStackCard
              images={srv.images}
              category={srv.category}
              title={srv.title}
              subtitle={srv.desc}
              isActive={index === activeIndex}
              onClick={() => {
                setActiveIndex(index);
                handleViewProject(srv.projectId);
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;


