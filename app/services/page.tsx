"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import { useEffect, useRef } from "react";

export default function ServicesPage() {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rotation = 0;
    const animate = () => {
      rotation += 0.5;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rotation}deg) rotateY(${rotation * 0.7}deg)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const pillars = [
    { title: "Design", description: "Visual systems that communicate instantly" },
    { title: "Dev", description: "Code that scales without compromise" },
    { title: "Scale", description: "Infrastructure that grows with you" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 sm:px-8 lg:px-12"
      >
        {/* Hero Section - Split Screen */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left Side - Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8"
            >
              Systems Engineering.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-400 leading-relaxed"
            >
              We don't just write code; we architect ecosystems. Our process begins with a deep dive into your operational logic, stripping away the unnecessary to reveal the essential.
            </motion.p>
          </div>

          {/* Right Side - Rotating 3D Cube */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 perspective-1000">
              <div
                ref={cubeRef}
                className="absolute inset-0 preserve-3d"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "translateZ(128px)" }} />
                {/* Back */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "translateZ(-128px) rotateY(180deg)" }} />
                {/* Right */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "rotateY(90deg) translateZ(128px)" }} />
                {/* Left */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "rotateY(-90deg) translateZ(128px)" }} />
                {/* Top */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "rotateX(90deg) translateZ(128px)" }} />
                {/* Bottom */}
                <div className="absolute w-full h-full border border-white/20" style={{ transform: "rotateX(-90deg) translateZ(128px)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="border border-white/10 p-8 hover:border-white/20 transition-colors"
            >
              <h3 className="text-2xl font-bold tracking-tighter mb-4">{pillar.title}</h3>
              <p className="text-zinc-400">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
