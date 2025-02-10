import React, { useEffect, useRef } from "react";
import GlitchFilter from "./components/Effects/GlitchFilter";
import HeroSection from "./components/Sections/Hero/HeroSection";
import AboutSection from "./components/Sections/About/AboutSection";
import ProjectSection from "./components/Sections/Project/ProjectSection";
import "./App.css";
import { gsap } from "gsap";

function App() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            triggerGlitch(index);
          }
        });
      },
      { threshold: 0.2 } // Lower threshold to trigger earlier
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  function triggerGlitch(index) {
   const displacementMap = document.getElementById("displacementMap");
    if (!displacementMap) {
      return;
    }
  
    gsap.fromTo(
      displacementMap,
      { attr: { scale: 0 } },
      {
        attr: { scale: 30 },  // Increase for stronger effect
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "visible";
    }, 400);
  }
  

  return (
    <>
      <GlitchFilter /> {/* Keep this outside of .app-container to always be available */}
      
      <div className="app-container">
        <div ref={(el) => (sectionRefs.current[0] = el)} data-index="0">
          <HeroSection />
        </div>
        <div ref={(el) => (sectionRefs.current[2] = el)} data-index="2">
          <ProjectSection />
        </div>
        <div ref={(el) => (sectionRefs.current[1] = el)} data-index="1">
          <AboutSection />
        </div>
      </div>
    </>
  );
}

export default App;
