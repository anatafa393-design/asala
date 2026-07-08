import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onBack }) => {
  const overlayRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [project]);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
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

        {/* Even Grid Layout */}
        <motion.div 
          className="project-gallery-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {project.gallery.map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="project-gallery-item"
              onClick={() => setLightboxIndex(idx)}
            >
              <img src={imgSrc} alt={`${project.title} - ${idx + 1}`} loading="lazy" />
              <div className="gallery-item-overlay">
                <Maximize2 size={24} className="gold-text" />
                <span>تكبير الصورة</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal rendered via React Portal directly to document.body to bypass CSS transform context */}
      {createPortal(
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
                <img src={project.gallery[lightboxIndex]} alt={`${project.title} - ${lightboxIndex + 1}`} />
                <div className="lightbox-caption">{lightboxIndex + 1} / {project.gallery.length}</div>
              </motion.div>

              <button className="lightbox-nav-btn next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                <ChevronLeft size={30} />
              </button>

              <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};

export default ProjectDetail;
