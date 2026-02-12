"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  originalX: number;
  originalY: number;
  originalZ: number;
}

interface NeuralNetworkProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  radius?: number;
}

export default function NeuralNetwork({
  className = "",
  particleCount = 180,
  connectionDistance = 100,
  radius = 200,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rotationYRef = useRef(0);
  const rotationXRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles - random positions within sphere volume
    const initializeParticles = (): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        // Random point within sphere volume
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * radius; // Cube root for uniform distribution in volume

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        particles.push({
          x,
          y,
          z,
          vx: (Math.random() - 0.5) * 0.3, // Small drift velocity
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.3,
          originalX: x,
          originalY: y,
          originalZ: z,
        });
      }
      return particles;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particlesRef.current = initializeParticles();

    // Mouse tracking for interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      };
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseRef.current = { x: 0, y: 0 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const centerX = (canvas.width / 2) + 90; // Shift right by 90px for better visual balance
      const centerY = canvas.height / 2;
      const fov = 400; // Field of view for perspective

      // Update rotation (faster when hovered)
      const rotationSpeed = isHovered ? 0.01 : 0.005;
      rotationYRef.current += rotationSpeed;
      
      // Subtle X-axis tilt based on mouse position
      rotationXRef.current = mouseRef.current.y * 0.3;

      // Rotate particles around Y and X axes
      const cosY = Math.cos(rotationYRef.current);
      const sinY = Math.sin(rotationYRef.current);
      const cosX = Math.cos(rotationXRef.current);
      const sinX = Math.sin(rotationXRef.current);

      // Update particle positions with drift
      particles.forEach((particle) => {
        // Apply independent drift
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Keep particles within bounds (soft boundary)
        const distance = Math.sqrt(
          particle.x * particle.x + particle.y * particle.y + particle.z * particle.z
        );
        if (distance > radius) {
          // Push back towards center
          const factor = radius / distance;
          particle.x *= factor;
          particle.y *= factor;
          particle.z *= factor;
          // Reverse velocity
          particle.vx *= -0.5;
          particle.vy *= -0.5;
          particle.vz *= -0.5;
        }

        // Apply rotation around Y-axis
        const tempX = particle.x * cosY - particle.z * sinY;
        const tempZ = particle.x * sinY + particle.z * cosY;

        // Apply rotation around X-axis
        const finalX = tempX;
        const finalY = particle.y * cosX - tempZ * sinX;
        const finalZ = particle.y * sinX + tempZ * cosX;

        // Project 3D to 2D with perspective
        const scale = fov / (fov + finalZ);
        const screenX = finalX * scale + centerX;
        const screenY = finalY * scale + centerY;

        // Store projected position for connection drawing
        (particle as any).screenX = screenX;
        (particle as any).screenY = screenY;
        (particle as any).finalZ = finalZ;
        (particle as any).scale = scale;
      });

      // Draw connections (Plexus effect) - draw first so nodes appear on top
      ctx.shadowBlur = 0; // No shadow for lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i] as any;
          const p2 = particles[j] as any;

          // Calculate 3D distance
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance3D < connectionDistance) {
            // Opacity based on distance (closer = more opaque)
            const opacity = (1 - distance3D / connectionDistance) * 0.2;
            
            // Also consider Z-depth
            const avgZ = (p1.finalZ + p2.finalZ) / 2;
            const zFactor = Math.max(0.3, Math.min(1, (fov + avgZ) / (fov * 1.5)));

            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * zFactor})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (particles) with glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      
      particles.forEach((particle: any) => {
        // Node size based on Z-depth
        const nodeSize = 1.5 * particle.scale;
        
        // Opacity based on Z-depth (fade if far back)
        const baseOpacity = Math.max(0.3, Math.min(1, particle.scale));
        const nodeOpacity = baseOpacity * (1 - Math.max(0, -particle.finalZ) / (fov * 2));

        ctx.beginPath();
        ctx.arc(particle.screenX, particle.screenY, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`;
        ctx.fill();
      });

      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, connectionDistance, radius, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
