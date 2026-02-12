"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

interface MagneticStarsProps {
  className?: string;
  starCount?: number;
}

export default function MagneticStars({ 
  className = "", 
  starCount 
}: MagneticStarsProps) {
  // Reduce star count on mobile for better performance
  const effectiveStarCount = starCount || (typeof window !== "undefined" && window.innerWidth < 768 ? 75 : 150);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: -1, y: -1 });
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Reinitialize stars on resize
      initializeStars();
    };

    const initializeStars = () => {
      const stars: Star[] = [];
      const count = typeof window !== "undefined" && window.innerWidth < 768 ? 75 : (starCount || 150);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2, // Slow natural drift
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1 + 0.5, // 0.5px to 1.5px
          baseRadius: Math.random() * 1 + 0.5,
        });
      }
      starsRef.current = stars;
    };

    resizeCanvas();
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Mouse tracking - track mouse position relative to canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Track mouse position if within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
        setIsMouseActive(true);
      } else {
        setIsMouseActive(false);
        mouseRef.current = { x: -1, y: -1 };
      }
    };

    const handleMouseLeave = () => {
      setIsMouseActive(false);
      mouseRef.current = { x: -1, y: -1 };
    };

    // Track mouse on window level but calculate relative to canvas
    window.addEventListener("mousemove", handleMouseMove);
    // Use mouseleave on canvas to detect when leaving the section
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      // Clear canvas to transparent - let the pure black background show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const attractionStrength = 0.02; // How strongly stars are attracted
      const maxAttractionDistance = 200; // Maximum distance for attraction
      const minDistance = 30; // Minimum distance before stars slow down

      stars.forEach((star) => {
        // Natural drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Magnetic attraction to mouse
        if (isMouseActive && mouse.x >= 0 && mouse.y >= 0) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxAttractionDistance && distance > 0) {
            // Calculate attraction force (stronger when closer, but reduces when very close)
            let force = attractionStrength;
            
            // Slow down when very close to cursor (magnetic effect)
            if (distance < minDistance) {
              force *= (distance / minDistance) * 0.3; // Reduce force significantly when close
            } else {
              // Normalize force based on distance (inverse square law approximation)
              force *= (1 - distance / maxAttractionDistance);
            }

            // Apply velocity towards mouse
            star.vx += (dx / distance) * force;
            star.vy += (dy / distance) * force;

            // Add slight pulsing effect when close to cursor
            if (distance < minDistance * 2) {
              star.radius = star.baseRadius * (1 + 0.3 * (1 - distance / (minDistance * 2)));
            } else {
              star.radius = star.baseRadius;
            }
          } else {
            star.radius = star.baseRadius;
          }
        } else {
          star.radius = star.baseRadius;
        }

        // Damping to prevent infinite acceleration
        star.vx *= 0.98;
        star.vy *= 0.98;

        // Limit maximum velocity
        const maxVelocity = 2;
        const velocity = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        if (velocity > maxVelocity) {
          star.vx = (star.vx / velocity) * maxVelocity;
          star.vy = (star.vy / velocity) * maxVelocity;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + star.radius * 0.3})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [effectiveStarCount, isMouseActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none bg-transparent ${className}`}
      style={{ zIndex: 0, backgroundColor: 'transparent' }}
    />
  );
}
