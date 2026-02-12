"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import ParticlesBackground from "./ParticlesBackground";

const services = [
  {
    title: "Software Solutions",
    description: "Custom apps, websites, and automation infrastructure.",
    href: "/software",
  },
  {
    title: "Marketing Posts",
    description: "High-conversion static visuals and graphic design.",
    href: "/posts",
  },
  {
    title: "Marketing Videos",
    description: "Motion graphics and video editing that stops the scroll.",
    href: "/videos",
  },
  {
    title: "Social Media Management",
    description: "Community growth, analytics, and full-stack account handling.",
    href: "/management",
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
      className="relative py-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center overflow-hidden bg-zinc-950"
    >
      {/* Particles Background */}
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
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
          style={{ gridAutoRows: "minmax(0, 1fr)" }}
          initial="hidden"
        >
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href || "#"}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 150,
                  delay: index * 0.1,
                }}
                className="group relative rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden bg-zinc-900 cursor-pointer h-full flex flex-col"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
              {/* Spotlight effect - reveals glow */}
              {hoveredCard === index && (
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: "400px",
                    height: "400px",
                    left: mousePosition.x - 200,
                    top: mousePosition.y - 200,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Radial gradient glow */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                    }}
                  />
                </motion.div>
              )}

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition-all duration-300" />

              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-3 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-zinc-400">{service.description}</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Cinematic Deep Fade Overlay */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        {/* Layer 1: The Long, Subtle Mist (Start fading early) */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-b from-transparent via-black/20 to-black" />
        
        {/* Layer 2: The Solid Base (Ensure total black at the seam) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
    </section>
  );
}
