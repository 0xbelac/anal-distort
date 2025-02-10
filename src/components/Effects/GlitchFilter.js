import React from "react";

function GlitchFilter() {
  return (
    <svg style={{ display: "none" }}>
      <filter id="glitch-displacement">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.00 0.2"  // Increase for stronger noise effect
          numOctaves="3"
          result="turbulence"
        />
        <feDisplacementMap
          id="displacementMap"
          in2="turbulence"
          in="SourceGraphic"
          xChannelSelector="R"
          yChannelSelector="G"
          scale="40"  // Increase for a stronger glitch
        />
      </filter>
    </svg>
  );
}

export default GlitchFilter;
