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

// ── 3. 3D REALISTIC FLIPBOOK (USING STPAGEFLIP) ──────────────────────
const RealisticFlipbook = ({ gallery, title }) => {
  const bookRef = useRef(null);
  const pageFlipRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let pageFlipInstance = null;

    if (bookRef.current) {
      // Initialize the realistic 3D book mockup
      pageFlipInstance = new PageFlip(bookRef.current, {
        width: 450, // Base page width
        height: 600, // Base page height
        size: "stretch",
        minWidth: 290,
        maxWidth: 900,
        minHeight: 380,
        maxHeight: 1200,
        maxShadowOpacity: 0.6,
        showCover: false,
        drawShadow: true,
        usePortrait: true, // Switch to single page on small mobile screens
        flippingTime: 800,
        swipeDistance: 30
      });

      pageFlipRef.current = pageFlipInstance;

      const pages = bookRef.current.querySelectorAll('.flipbook-page-item');
      pageFlipInstance.loadFromHTML(pages);

      setTotalPages(pageFlipInstance.getPageCount());

      // Sync page state on flip
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
      <div className="flipbook-container-outer">
        {/* Real physical book mockup wrapper */}
        <div className="book-mockup-frame">
          {/* Central binding spine */}
          <div className="book-mockup-spine"></div>
          
          <div ref={bookRef} className="flipbook-js-container">
            {gallery.map((imgSrc, idx) => (
              <div key={idx} className="flipbook-page-item">
                <div className="flipbook-page-content">
                  <img src={imgSrc} alt={`${title} - صفحة ${idx + 1}`} />
                  
                  {/* Subtle 3D inner binding shadow */}
                  <div className="page-spine-gradient"></div>
                  
                  {/* Page number badge */}
                  <div className="page-number-pill">{idx + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flipbook-controls">
        <button 
          className="flip-ctrl-btn" 
          onClick={handlePrev} 
          disabled={currentPage === 0}
        >
          <ChevronRight size={20} /> الصفحة السابقة
        </button>
        <span className="flipbook-progress">الصفحة {currentPage + 1} من {totalPages}</span>
        <button 
          className="flip-ctrl-btn" 
          onClick={handleNext} 
          disabled={currentPage >= totalPages - 1}
        >
          الصفحة التالية <ChevronLeft size={20} />
        </button>
      </div>
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
        return <EditorialGrid gallery={project.gallery} title={project.title} />;
      case 'ديكورات_تلفزيون':
        return <ParallaxSlider gallery={project.gallery} title={project.title} />;
      case 'ديكورات_جدران':
        return <RealisticFlipbook gallery={project.gallery} title={project.title} />;
      default:
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
