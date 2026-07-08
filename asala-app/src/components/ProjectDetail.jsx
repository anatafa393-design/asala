import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PageFlip } from 'page-flip';
import MagneticButton from './MagneticButton';
import './ProjectDetail.css';

// ── 1. EDITORIAL GRID LAYOUT ──────────────────────────────────────────
const EditorialGrid = ({ gallery, title }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  return (
    <div className="editorial-grid-wrapper">
      <div className="editorial-grid">
        {gallery.map((imgSrc, idx) => {
          let sizeClass = "grid-item-standard";
          if (idx % 6 === 0) sizeClass = "grid-item-wide";
          else if (idx % 6 === 3) sizeClass = "grid-item-tall";
          
          return (
            <div 
              key={idx} 
              className={`editorial-grid-item ${sizeClass}`}
              onClick={() => setLightboxIndex(idx)}
            >
              <img src={imgSrc} alt={`${title} - ${idx + 1}`} loading="lazy" />
              <div className="grid-item-overlay">
                <Maximize2 size={24} className="gold-text" />
                <span>عرض الصورة كاملة</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="lightbox-nav-btn prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
              <ChevronRight size={30} />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={gallery[lightboxIndex]} alt={`${title} - ${lightboxIndex + 1}`} />
              <div className="lightbox-caption">{lightboxIndex + 1} / {gallery.length}</div>
            </motion.div>

            <button className="lightbox-nav-btn next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
              <ChevronLeft size={30} />
            </button>

            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── 2. PARALLAX HORIZONTAL SLIDER ────────────────────────────────────
const ParallaxSlider = ({ gallery, title }) => {
  const trackRef = useRef(null);

  return (
    <div className="parallax-slider-wrapper">
      <div className="slider-instructions">
        <span>← اسحب أفقياً لتصفح الكتالوج البصري →</span>
      </div>
      <div className="parallax-slider-container" ref={trackRef}>
        <div className="parallax-slider-track">
          {gallery.map((imgSrc, idx) => (
            <div key={idx} className="parallax-slider-card">
              <div className="parallax-card-inner">
                <img src={imgSrc} alt={`${title} - ${idx + 1}`} loading="lazy" />
              </div>
              <div className="parallax-card-num">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── 3. 3D REALISTIC FLIPBOOK (CUSTOM TEMPLATE INTEGRATION) ────────────
const RealisticFlipbook = ({ gallery, title }) => {
  const bookRef = useRef(null);
  const pageFlipRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let pageFlipInstance = null;

    if (bookRef.current) {
      pageFlipInstance = new PageFlip(bookRef.current, {
        width: 450, // Base page width
        height: 600, // Base page height
        size: "stretch",
        minWidth: 290,
        maxWidth: 900,
        minHeight: 380,
        maxHeight: 1200,
        maxShadowOpacity: 0.5,
        showCover: true,
        drawShadow: true,
        usePortrait: true, // Adapt to single page on narrow screen
        flippingTime: 850,
        swipeDistance: 30
      });

      pageFlipRef.current = pageFlipInstance;

      const pages = bookRef.current.querySelectorAll('.page');
      pageFlipInstance.loadFromHTML(pages);

      setTotalPages(pageFlipInstance.getPageCount());

      pageFlipInstance.on('flip', (e) => {
        setCurrentPage(e.data);
      });
    }

    return () => {
      if (pageFlipInstance) {
        try {
          pageFlipInstance.destroy();
        } catch (err) {
          console.warn("Clean up PageFlip warning:", err);
        }
      }
    };
  }, [gallery]);

  const handleNext = () => {
    pageFlipRef.current?.flipNext();
  };

  const handlePrev = () => {
    pageFlipRef.current?.flipPrev();
  };

  return (
    <div className="flipbook-wrapper">
      <div id="book-wrap">
        <div ref={bookRef} id="book">
          {/* Front Cover (Hard) */}
          <div className="page --hard" data-density="hard">
            <div className="cover-inner">
              <div className="ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: '34px', height: '34px', color: '#C79A5F' }}><rect x="3" y="7" width="18" height="13" rx="1"/><path d="M8 7V4h8v3"/></svg>
              </div>
              <h2>كتالوج الأعمال<span>{title.toUpperCase()} — PORTFOLIO</span></h2>
              <p>مجموعة مختارة من مشاريعنا في التصميم الداخلي والخارجي</p>
            </div>
          </div>

          {/* Left Cover Inner (Hard) */}
          <div className="page" data-density="hard">
            <div className="cover-inner">
              <h2>شركة أصالة للديكور</h2>
              <p>مساحات مبتكرة وتصاميم هندسية فاخرة تعكس تطلعاتكم</p>
            </div>
          </div>

          {/* Dynamic Gallery Pages (Soft) */}
          {gallery.map((imgSrc, idx) => (
            <div key={idx} className="page" data-density="soft">
              <div className="page-content">
                <div className="photo-area" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.4)), url('${imgSrc}')` }}>
                  <span className="badge">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                </div>
                <div className="caption">
                  <h3>{title}</h3>
                  <p>تنفيذ وأعمال الديكور والتشطيب الفاخرة لشركة أصالة</p>
                </div>
                <span className="page-number">{idx + 1}</span>
              </div>
            </div>
          ))}

          {/* Back Cover Inner (Hard) */}
          <div className="page" data-density="hard">
            <div className="cover-inner">
              <h2>تواصل معنا</h2>
              <p>نسعد بتنفيذ وتجسيد مشاريعكم على أرض الواقع</p>
            </div>
          </div>

          {/* Back Cover (Hard) */}
          <div className="page --hard" data-density="hard">
            <div className="cover-inner">
              <div className="ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: '34px', height: '34px', color: '#C79A5F' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <p className="hint">نهاية الكتالوج</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          className="ctrl-btn" 
          onClick={handlePrev} 
          disabled={currentPage === 0}
          aria-label="الصفحة السابقة"
        >
          <ChevronRight size={22} />
        </button>
        <div className="counter">
          {currentPage + 1} / {totalPages}
        </div>
        <button 
          className="ctrl-btn" 
          onClick={handleNext} 
          disabled={currentPage >= totalPages - 1}
          aria-label="الصفحة التالية"
        >
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="hint">اسحب أطراف الصفحات بالماوس أو الإصبع لتقليب الكتالوج بشكل تفاعلي.</div>
    </div>
  );
};

// ── MAIN PROJECT DETAIL ROUTER ────────────────────────────────────────
const ProjectDetail = ({ project, onBack }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [project]);

  // Determine which layout to render based on project ID
  const renderGallery = () => {
    switch (project.id) {
      case 'ديكورات_اسقف':
        // Test user's realistic 3D book mockup on the first project
        return <RealisticFlipbook gallery={project.gallery} title={project.title} />;
      default:
        // Other projects display clean grid
        return <EditorialGrid gallery={project.gallery} title={project.title} />;
    }
  };

  return (
    <motion.div 
      ref={overlayRef}
      className="project-detail-page"
      data-lenis-prevent
      initial={{ opacity: 0, scale: 1.08, rotateX: -8, y: 50 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      exit={{ opacity: 0, scale: 1.08, rotateX: -8, y: 50 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'center center', perspective: 1200 }}
    >
      {/* Shared Element Header Image */}
      <div className="project-detail-hero">
        <motion.img 
          layoutId={`project-image-${project.id}`}
          src={project.cover} 
          alt={project.title} 
          className="project-detail-cover"
        />
        <div className="project-detail-overlay"></div>
        <div className="project-detail-header-content">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="project-title-large"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      <div className="project-detail-content">
        <div className="project-back-nav">
          <MagneticButton variant="outline" onClick={onBack}>
            <ArrowRight size={20} />
            العودة لمعرض الأعمال
          </MagneticButton>
        </div>

        {/* Dynamic Gallery Render */}
        <div className="project-gallery-container">
          {renderGallery()}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
