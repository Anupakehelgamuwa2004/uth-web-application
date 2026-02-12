"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
}

interface NetworkSphereProps {
  className?: string;
  pointCount?: number;
  connectionDistance?: number;
  radius?: number;
}

export default function NetworkSphere({
  className = "",
  pointCount = 120,
  connectionDistance = 80,
  radius = 150,
}: NetworkSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point3D[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rotationYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fibonacci Sphere Algorithm - generates evenly distributed points on a sphere
    const generateFibonacciSphere = (n: number, r: number): Point3D[] => {
      const points: Point3D[] = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y
        const theta = goldenAngle * i; // golden angle increment

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        points.push({
          x: x * r,
          y: y * r,
          z: z * r,
          originalX: x * r,
          originalY: y * r,
          originalZ: z * r,
        });
      }

      return points;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Reinitialize points on resize
      pointsRef.current = generateFibonacciSphere(pointCount, radius);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize points
    pointsRef.current = generateFibonacciSphere(pointCount, radius);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const perspective = 500; // Perspective distance

      // Increment rotation
      rotationYRef.current += 0.005;

      // Rotate points around Y-axis
      const cosY = Math.cos(rotationYRef.current);
      const sinY = Math.sin(rotationYRef.current);

      const projectedPoints = points.map((point) => {
        // Rotate around Y-axis
        const rotatedX = point.originalX * cosY - point.originalZ * sinY;
        const rotatedZ = point.originalX * sinY + point.originalZ * cosY;
        const rotatedY = point.originalY;

        // Project 3D to 2D with perspective
        const scale = perspective / (perspective + rotatedZ);
        const screenX = rotatedX * scale + centerX;
        const screenY = rotatedY * scale + centerY;

        return {
          x: rotatedX,
          y: rotatedY,
          z: rotatedZ,
          screenX,
          screenY,
          scale,
        };
      });

      // Draw connections first (so nodes appear on top)
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];

          // Calculate 3D distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance3D < connectionDistance) {
            // Opacity based on distance (closer = brighter)
            const opacity = (1 - distance3D / connectionDistance) * 0.15;
            
            // Also consider Z-depth for additional depth effect
            const avgZ = (p1.z + p2.z) / 2;
            const zOpacity = Math.max(0, (perspective + avgZ) / (perspective * 2));

            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * zOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (particles)
      projectedPoints.forEach((point) => {
        // Node size based on Z-depth (closer = larger)
        const nodeSize = 1.5 * point.scale;
        const nodeOpacity = Math.max(0.4, Math.min(1, point.scale));

        ctx.beginPath();
        ctx.arc(point.screenX, point.screenY, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`;
        ctx.fill();

        // Add subtle glow for closer nodes
        if (point.scale > 0.8) {
          ctx.beginPath();
          ctx.arc(point.screenX, point.screenY, nodeSize * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(point.scale - 0.8) * 0.1})`;
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pointCount, connectionDistance, radius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
