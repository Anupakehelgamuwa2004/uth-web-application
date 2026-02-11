"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    title: "Web Development",
    description: "Cutting-edge web solutions that scale",
  },
  {
    title: "Marketing Posts",
    description: "Content that converts and engages",
  },
  {
    title: "Cinematic Video",
    description: "Visual storytelling that captivates",
  },
  {
    title: "Social Media Management",
    description: "Strategic presence across platforms",
  },
];

export default function BentoGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(index);
  };

  return (
    <section
      id="services"
      className="relative py-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(128, 128, 128, 0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 128, 128, 0.07) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
          className="mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-4">
            Services
          </h2>
          <p className="text-xl text-zinc-500">What we offer</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.1,
              }}
              className="group relative rounded-2xl p-8 sm:p-12 overflow-hidden"
              style={{
                background: "rgba(24, 24, 27, 0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", damping: 20 }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Spotlight effect */}
              {hoveredCard === index && (
                <motion.div
                  className="absolute pointer-events-none rounded-full opacity-20 blur-3xl"
                  style={{
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    left: mousePosition.x - 150,
                    top: mousePosition.y - 150,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-300" />

              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-zinc-500">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
