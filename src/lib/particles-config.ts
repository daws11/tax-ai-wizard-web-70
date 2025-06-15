import { useMemo } from 'react';
import type { ISourceOptions } from 'tsparticles-engine';

export const useParticlesConfig = () => {
  return useMemo(() => {
    const screenWidth = window.innerWidth;
    let particleCount = 80; // Increased default for mobile
    let particleSize = { min: 2, max: 3 }; // Larger default size for mobile
    
    if (screenWidth > 1920) {
      particleCount = 50;
      particleSize = { min: 1, max: 2 };
    } else if (screenWidth > 1440) {
      particleCount = 70;
      particleSize = { min: 1, max: 2 };
    } else if (screenWidth > 1024) {
      particleCount = 100;
      particleSize = { min: 1.5, max: 2.5 };
    } else if (screenWidth > 768) {
      particleCount = 80;
      particleSize = { min: 1.8, max: 3 };
    }

    const config: ISourceOptions = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 2,
          },
          grab: {
            distance: 150,
            links: {
              opacity: 0.7 // Increased opacity when hovering
            }
          },
        },
      },
      particles: {
        color: {
          value: "#1d4ed8", // Darker blue for better visibility on light backgrounds
        },
        links: {
          color: "#1e40af",
          distance: screenWidth > 768 ? 120 : 100, // Shorter distance on mobile
          enable: true,
          opacity: screenWidth > 768 ? 0.3 : 0.4, // More visible on mobile
          width: screenWidth > 768 ? 1 : 1.2, // Thicker lines on mobile
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: particleCount,
        },
        opacity: {
          value: { min: 0.5, max: 0.8 }, // Higher and variable opacity for better visibility
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.4,
            sync: false
          }
        },
        shape: {
          type: ["circle"],
        },
        size: {
          value: particleSize,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false
          }
        },
      },
      detectRetina: false,
    };

    return config;
  }, []);
}; 