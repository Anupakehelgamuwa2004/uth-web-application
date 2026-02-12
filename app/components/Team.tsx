"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Video, Code, TrendingUp } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";

const roles = [
  {
    title: "Video Production",
    description: "Cinematic storytellers",
    icon: Video,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Software Engineering",
    description: "Architects of code",
    icon: Code,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Social Media Strategy",
    description: "Viral growth engines",
    icon: TrendingUp,
    color: "from-purple-600 to-violet-500",
  },
];

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="team"
      className="relative py-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center overflow-hidden bg-black z-20"
      style={{ backgroundColor: '#000000', zIndex: 20 }}
    >
      {/* White/Gray Spotlight */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(212, 212, 216, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - The Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            {/* Section Label */}
            <motion.div
              className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              OUR TEAM
            </motion.div>
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Built by Visionaries.
            </motion.h2>
            <motion.p
              className="text-xl text-zinc-400 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A collective of world-class creators.
            </motion.p>

            {/* Roles - Hover Cards */}
            <div className="space-y-4">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative"
                  >
                    <motion.div
                      className="relative p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm cursor-pointer overflow-hidden"
                      whileHover={{ scale: 1.02, borderColor: "rgba(147, 51, 234, 0.5)" }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient Glow on Hover */}
                      {hoveredIndex === index && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-20 blur-xl`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                          exit={{ opacity: 0 }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${role.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100 mb-1">
                            {role.title}
                          </h3>
                          <p className="text-sm text-zinc-400">{role.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Description Text */}
            <motion.p
              className="mt-12 text-lg text-zinc-500 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              We don&apos;t just hire employees; we assemble experts. From award-winning video producers to full-stack engineers and viral content strategists, our team is the engine behind your growth.
            </motion.p>
          </motion.div>

          {/* Right Side - Particle Network */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: 0.2,
            }}
          >
            {/* Neural Network Cloud Canvas */}
            <NeuralNetwork particleCount={180} connectionDistance={100} radius={200} />

            {/* Bottom Fade Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
