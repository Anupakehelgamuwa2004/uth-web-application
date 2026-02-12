"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import Link from "next/link";

const features = [
  { title: "Reels/Shorts", description: "Short-form content optimized for maximum retention" },
  { title: "Long-form Editing", description: "Cinematic storytelling for YouTube and beyond" },
  { title: "Motion Graphics", description: "Dynamic animations that bring brands to life" },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-black bg-grid-white/[0.02] text-white">
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
                Marketing Videos
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-zinc-400 leading-relaxed"
              >
                Motion drives emotion. We edit high-retention videos, reels, and ads designed to stop the scroll and tell your story in seconds.
              </motion.p>
            </div>

            {/* Right Side - The Kinetic Wave */}
            <div className="flex items-center justify-center relative h-64">
              {/* Pulsing Play Icon */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer ripple circles */}
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="absolute w-32 h-32 border border-white/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 2],
                      opacity: [0.8, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
                
                {/* Play Icon */}
                <motion.div
                  className="relative z-10 w-0 h-0 border-l-[24px] border-l-white border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent ml-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Waveform visualization */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white/40"
                    animate={{
                      height: [20, Math.random() * 60 + 20, 20],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                  />
                ))}
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
