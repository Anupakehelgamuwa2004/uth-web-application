"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import Link from "next/link";
import { useEffect, useRef } from "react";

const features = [
  { title: "Web Development", description: "Responsive, performant websites built with modern frameworks" },
  { title: "App Development", description: "Native and cross-platform mobile applications" },
  { title: "SaaS Architecture", description: "Scalable cloud infrastructure and microservices" },
];

export default function SoftwarePage() {
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

  return (
    <div className="min-h-screen bg-black bg-grid-white/[0.02] text-white relative">
      {/* FORCE VISIBLE BACK BUTTON */}
      <div className="fixed top-24 left-5 z-[9999] pointer-events-auto">
        <Link 
          href="/#services"
          className="flex items-center gap-2 px-4 py-2 bg-black/80 border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-all backdrop-blur-xl shadow-2xl"
        >
          <span>←</span> Back
        </Link>
      </div>
      
      <FloatingNav />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 sm:px-8 lg:px-12 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            {/* Left Side - Text */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8"
              >
                Software Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-zinc-400 leading-relaxed"
              >
                We build digital infrastructure. From scalable web apps to complex automation, our code is clean, efficient, and future-proof.
              </motion.p>
            </div>

            {/* Right Side - The Matrix Cube */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64" style={{ perspective: "1000px" }}>
                <div
                  ref={cubeRef}
                  className="absolute inset-0"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "translateZ(128px)" }} />
                  {/* Back */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "translateZ(-128px) rotateY(180deg)" }} />
                  {/* Right */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "rotateY(90deg) translateZ(128px)" }} />
                  {/* Left */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "rotateY(-90deg) translateZ(128px)" }} />
                  {/* Top */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "rotateX(90deg) translateZ(128px)" }} />
                  {/* Bottom */}
                  <div className="absolute w-full h-full border border-white/30" style={{ transform: "rotateX(-90deg) translateZ(128px)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border border-white/10 p-8 hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold tracking-tighter mb-4">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all uppercase tracking-widest font-medium text-sm"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
