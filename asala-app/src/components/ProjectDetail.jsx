import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onBack }) => {
  useEffect(() => {
    // Scroll to top instantly when opening the project to prepare for animation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div 
      className="project-detail-page"
      initial={{ opacity: 0, rotateY: 85, x: '10%' }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: 85, x: '10%' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: 'right center', perspective: 2000 }}
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

        <motion.div 
          className="project-gallery-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {project.gallery.map((imgSrc, idx) => (
            <div key={idx} className="project-gallery-item">
              <img src={imgSrc} alt={`${project.title} - ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
