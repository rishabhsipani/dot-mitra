import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from './utils/gsapConfig';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './sections/Hero/HeroSection';
import ProblemSection from './sections/Problem/ProblemSection';
import SolutionSection from './sections/Solution/SolutionSection';
import EnterpriseFeaturesSection from './sections/EnterpriseFeatures/EnterpriseFeaturesSection';
import DeploymentSection from './sections/Deployment/DeploymentSection';
import DepartmentsSection from './sections/Departments/DepartmentsSection';
import PersonalizeSection from './sections/Personalize/PersonalizeSection';
import DemoSection from './sections/Demo/DemoSection';
import UseCasesSection from './sections/UseCases/UseCasesSection';
import PricingSection from './sections/Pricing/PricingSection';
import TestimonialsSection from './sections/Testimonials/TestimonialsSection';
import AnalyticsSection from './sections/Analytics/AnalyticsSection';
import ContactSection from './sections/Contact/ContactSection';
import FAQSection from './sections/FAQ/FAQSection';

import './App.css';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on image loads / layout shifts
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleRefresh);
    window.addEventListener('resize', handleRefresh);
    
    // Fallback refresh after initial render
    const timeoutId = setTimeout(handleRefresh, 500);
    const timeoutId2 = setTimeout(handleRefresh, 1500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleRefresh);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <EnterpriseFeaturesSection />
        <DeploymentSection />
        <DemoSection />
        <UseCasesSection />
        <DepartmentsSection />
        <PersonalizeSection />
        <PricingSection />
        <TestimonialsSection />
        <AnalyticsSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
