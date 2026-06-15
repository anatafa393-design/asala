import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    // Lenis smooth scroll configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleProjectSelect = (project) => {
    setScrollPos(window.scrollY);
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
    // Restore scroll after a brief delay to allow DOM to render
    setTimeout(() => {
      window.scrollTo({ top: scrollPos, behavior: 'instant' });
    }, 50);
  };

  return (
    <>
      <Navbar onHomeRedirect={handleBack} />
      
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4a259' }}>جاري التحميل...</div>}>
            <ProjectDetail 
              key="project-detail"
              project={selectedProject} 
              onBack={handleBack} 
            />
          </Suspense>
        ) : (
          <motion.div 
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <Hero />
            <About />
            <Stats />
            <Marquee />
            <Services onProjectSelect={handleProjectSelect} />
            <Portfolio onProjectSelect={handleProjectSelect} />
            <Testimonials />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
