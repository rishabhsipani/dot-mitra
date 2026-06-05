import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from '../../utils/gsapConfig';
import SectionWrapper from '../../components/ui/SectionWrapper';
import SectionHeader from '../../components/ui/SectionHeader';
import { departments } from '../../data/departments';
import deptIcon from '../../assets/department icon.svg';
import './DepartmentsSection.css';

export default function DepartmentsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % departments.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // auto-rotate every 3 seconds
    
    // Premium Parallax & Reveal effect on scroll
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        
        // Staggered scrubbed entrance for elements
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.5, // Smooth lag effect
          }
        });

        enterTl
          .from('.dept__header-icon', { y: 100, opacity: 0, rotation: -15, scale: 0.8 }, 0)
          .from('.dept__header', { y: 120, opacity: 0 }, 0.1)
          .from('.dept__carousel-track', { y: 150, opacity: 0, scale: 0.95 }, 0.2)
          .from('.dept__footer-text', { y: 80, opacity: 0 }, 0.3);

        // Ongoing subtle parallax for the entire container
        gsap.to(containerRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [nextSlide]);

  return (
    <SectionWrapper id="departments" className="section--off-white">
      <div className="container dept__container-wide">
        
        <div ref={containerRef} className="dept__main-container">
          <div className="dept__header-wrapper">
            <img src={deptIcon} alt="Department Icon" className="dept__header-icon" />
            <SectionHeader
              title="Designed for Every Department"
              highlightWord="Department"
              alignment="center"
              className="dept__header"
            />
          </div>

          <div className="dept__carousel-scene">
            <div className="dept__carousel-track">
              {departments.map((dept, i) => {
                let offset = (i - activeIndex) % departments.length;
                if (offset < -3) offset += departments.length;
                if (offset > 3) offset -= departments.length;

                const isCenter = offset === 0;
                const isNeighbor = Math.abs(offset) === 1;
                const isJumping = offset === 3;
                
                // Calculate dynamic styles
                let translateX = offset * 210; // tight gap between outer cards
                if (offset > 0) translateX += 50; // push right side away from middle slightly
                if (offset < 0) translateX -= 50; // push left side away from middle slightly
                
                const translateY = Math.abs(offset) * 40; // curve depth
                const rotateZ = offset * 8; // tilt
                const scale = 1 - Math.abs(offset) * 0.15;
                const zIndex = 10 - Math.abs(offset);
                
                let opacity = 0.25;
                if (isCenter) opacity = 1;
                else if (isNeighbor) opacity = 0.6;

                return (
                  <div
                    key={dept.name}
                    className="dept__card"
                    style={{
                      transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: isJumping ? 'none' : 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  >
                    <div className="dept__card-image-container">
                      <img src={dept.image} alt={dept.name} className="dept__card-image" />
                    </div>
                    <h4 className="dept__card-title">{dept.name}</h4>
                  </div>
                );
              })}
            </div>
            
            <div className="dept__footer-text">
              <p>Customize Dot Mitra for ministries, enterprises, public<br/>portals, and citizen-facing platforms.</p>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
