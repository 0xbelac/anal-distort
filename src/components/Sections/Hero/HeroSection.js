import React, { useEffect, useRef, useState } from "react";
import heroBackground from "../../../assets/images/analog-distortions-the-city.png";
import "./style.css";
import { gsap } from "gsap";

const HeroSection = () => {
  const subtitleRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const subtitleGlitchEffect = () => {
      if (!subtitleRef.current) return;

      gsap.fromTo(
        subtitleRef.current,
        { filter: "url(#glitch-displacement)" },
        {
          filter: "none",
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    };

    const glitchInterval = setInterval(() => {
      if (!isHovering) {
        subtitleGlitchEffect();
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);

    const displacementMap = document.getElementById("displacementMap");
    if (displacementMap) {
      gsap.fromTo(
        displacementMap,
        { attr: { scale: 0 } },
        {
          attr: { scale: 50 },
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }

    gsap.fromTo(
      subtitleRef.current,
      { filter: "url(#glitch-displacement)" },
      {
        filter: "none",
        duration: 0.1,
        yoyo: true,
        repeat: -1,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    gsap.killTweensOf(subtitleRef.current);
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectSection = document.getElementById("project-section");
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="section hero-section"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-title-container">
        <h1 className="glitch" data-text="Analog Distortions">
          Analog Distortions
        </h1>
        <a
          href="#project-section"
          className="glitch-subtitle"
          data-text="Enter the City. A story by WrathTank"
          ref={subtitleRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={scrollToProjects}
        >
          Enter the City. A story by WrathTank
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
