import { useMemo } from 'react';
import type { ISourceOptions } from 'tsparticles-engine';

export const useParticlesConfig = () => {
  return useMemo(() => {
    const screenWidth = window.innerWidth;
    let particleCount = 50; // Default for small screens
    
    if (screenWidth > 1920) {
      particleCount = 50; // Reduce for very large screens
    } else if (screenWidth > 1440) {
      particleCount = 70; // Medium for large screens
    } else if (screenWidth > 1024) {
      particleCount = 100; // Normal for medium screens
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
              opacity: 0.2
            }
          },
        },
      },
      particles: {
        color: {
          value: "#3b82f6",
        },
        links: {
          color: "#3b82f6",
          distance: 120,
          enable: true,
          opacity: 0.15,
          width: 1,
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
          value: 0.25,
        },
        shape: {
          type: ["circle"],
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: false,
    };

    return config;
  }, []);
}; 