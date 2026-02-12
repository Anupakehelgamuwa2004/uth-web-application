"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import Link from "next/link";
import { useState } from "react";

const features = [
  { title: "Ad Creatives", description: "High-converting visuals designed for maximum engagement" },
  { title: "Social Posts", description: "Branded content that resonates with your audience" },
  { title: "Infographics", description: "Complex data made simple and shareable" },
];

export default function PostsPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cards = [0, 1, 2];

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
                Marketing Posts
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-zinc-400 leading-relaxed"
              >
                Visuals that convert. We design static assets that capture attention instantly. Thumbnails, ad creatives, and brand identity.
              </motion.p>
            </div>

            {/* Right Side - The Floating Stack */}
            <div
              className="flex items-center justify-center relative h-64"
              style={{ perspective: "1000px" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: (e.clientX - rect.left - rect.width / 2) / 20,
                  y: (e.clientY - rect.top - rect.height / 2) / 20,
                });
              }}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            >
              {cards.map((index) => (
                <motion.div
                  key={index}
                  className="absolute w-48 h-64 border border-white/20 bg-black/50 backdrop-blur-sm"
                  style={{
                    zIndex: cards.length - index,
                    transformStyle: "preserve-3d",
                    transform: `translateY(${index * -8}px) translateX(${index * 4}px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) rotateZ(${index * 2}deg)`,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                />
              ))}
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
