"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import { useState } from "react";

const projects = [
  { id: 1, name: "Fintech Infrastructure", client: "Global Payments", year: "2024", description: "Real-time transaction processing at scale" },
  { id: 2, name: "Consumer Platform", client: "Tech Corp", year: "2024", description: "Millions of daily active users" },
  { id: 3, name: "Enterprise Suite", client: "Fortune 500", year: "2023", description: "Mission-critical operations platform" },
  { id: 4, name: "Mobile Ecosystem", client: "Startup Inc", year: "2023", description: "Cross-platform native experience" },
  { id: 5, name: "Data Pipeline", client: "Analytics Co", year: "2024", description: "Petabyte-scale processing infrastructure" },
];

export default function WorkPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 sm:px-8 lg:px-12"
      >
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8"
          >
            Impact at Scale.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 leading-relaxed max-w-3xl"
          >
            We build software that lives in the real world. From fintech infrastructure to consumer apps, our work handles millions of interactions with zero friction.
          </motion.p>
        </div>

        {/* Particle Earth Visualization */}
        <div className="max-w-7xl mx-auto mb-32 flex justify-center">
          <div className="relative w-96 h-96">
            {/* Simple dot-matrix representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-white/10 relative overflow-hidden">
                {/* Animated dots representing global reach */}
                {Array.from({ length: 50 }).map((_, i) => {
                  const angle = (i / 50) * Math.PI * 2;
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.04,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto space-y-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative overflow-hidden border-b border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between py-8 px-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tighter mb-2">{project.name}</h3>
                  <p className="text-zinc-400 text-sm">{project.client} • {project.year}</p>
                </div>
                <p className="text-zinc-500 text-sm hidden md:block">{project.description}</p>
              </div>
              
              {/* Grayscale Preview Image on Hover */}
              {hoveredProject === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 300 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-zinc-900 to-transparent"
                >
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-zinc-700 text-sm">Preview Image</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
