"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function BackgroundGrid() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const starIdCounter = useRef(0);

  useEffect(() => {
    // Generate shooting stars periodically
    const generateStar = () => {
      // Ensure unique ID by combining timestamp with counter
      const uniqueId = Date.now() * 1000 + starIdCounter.current++;
      
      const newStar: ShootingStar = {
        id: uniqueId,
        x: Math.random() * 100,
        y: Math.random() * 50, // Start from top half
        duration: 1 + Math.random() * 2,
        delay: 0,
      };
      
      setShootingStars((prev) => [...prev, newStar]);

      // Remove star after animation completes
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, (newStar.duration + newStar.delay) * 1000);
    };

    // Generate a star every 2-5 seconds
    const interval = setInterval(() => {
      generateStar();
    }, 2000 + Math.random() * 3000);

    // Generate initial stars
    for (let i = 0; i < 3; i++) {
      setTimeout(generateStar, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid that slowly pans */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        animate={{
          x: [0, 50],
          y: [0, 50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing grid overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.02) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 2px, transparent 2px)`,
          backgroundSize: "100px 100px",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.5)",
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: [0, 100, 200],
            y: [0, 50, 100],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "easeOut",
          }}
        >
          {/* Shooting star trail */}
          <motion.div
            className="absolute top-0 left-0 w-20 h-[1px] bg-gradient-to-r from-white to-transparent origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ))}

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
    </div>
  );
}
