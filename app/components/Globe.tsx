"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;
    
    const getSize = () => {
      if (!canvasRef.current) return { width: 800, height: 800 };
      return {
        width: canvasRef.current.offsetWidth || 800,
        height: canvasRef.current.offsetHeight || 800,
      };
    };
    
    const initGlobe = () => {
      if (!canvasRef.current) return;
      const { width, height } = getSize();
      
      if (globe) {
        globe.destroy();
      }
      
      // Reduce quality on mobile for better performance
      const isMobile = window.innerWidth < 768;
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: isMobile ? 1 : 2,
        width: width * (isMobile ? 1 : 2),
        height: height * (isMobile ? 1 : 2),
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: isMobile ? 10000 : 20000,
      mapBrightness: 4,
      baseColor: [0.9, 0.9, 0.9], // White/grey base
      markerColor: [1, 1, 1], // White markers
      glowColor: [0.8, 0.8, 0.8], // Silver glow
      scale: 1,
      markers: [
        // Add some global markers for visual interest
        { location: [37.7749, -122.4194], size: 0.1 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.1 }, // New York
        { location: [51.5074, -0.1278], size: 0.1 }, // London
        { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003; // Slow auto-rotation
      },
    });
    };
    
    // Initialize on mount
    initGlobe();
    
    // Throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initGlobe();
      }, 200);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-end pr-4 sm:pr-8 md:pr-16 lg:pr-24">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "900px",
          maxHeight: "900px",
        }}
      />
    </div>
  );
}
