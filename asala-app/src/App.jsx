import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Process from './components/Process';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';

const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Lenis smooth scroll configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar onHomeRedirect={handleBack} />
      
      {/* Main Home Page wrapper - stays mounted to keep scroll position & performance */}
      <motion.div 
        key="home-page"
        animate={selectedProject ? { 
          scale: 0.95, 
          opacity: 0.35, 
          rotateX: 4,
          z: -100
        } : { 
          scale: 1, 
          opacity: 1, 
          rotateX: 0,
          z: 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          transformOrigin: 'top center', 
          perspective: 1200,
          pointerEvents: selectedProject ? 'none' : 'auto'
        }}
      >
        <Hero />
        <About />
        <Stats />
        <Process />
        <Marquee />
        <Services onProjectSelect={handleProjectSelect} />
        <Portfolio onProjectSelect={handleProjectSelect} />
        <Testimonials />
        <ContactForm />
        <Footer />
      </motion.div>

      {/* Project Details mounted on top as a fixed overlay */}
      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectDetail 
              key="project-detail"
              project={selectedProject} 
              onBack={handleBack} 
            />
          </Suspense>
        )}
      </AnimatePresence>

      <FloatingWhatsapp />
    </>
  );
}

export default App;
