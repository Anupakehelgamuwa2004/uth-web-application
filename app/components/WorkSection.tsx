"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { id: 1, title: "Project Alpha" },
  { id: 2, title: "Project Beta" },
  { id: 3, title: "Project Gamma" },
  { id: 4, title: "Project Delta" },
  { id: 5, title: "Project Epsilon" },
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-32 min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: "radial-gradient(circle at top, rgba(39, 39, 42, 0.2) 0%, rgba(9, 9, 11, 0.8) 50%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-zinc-500">
            Showcasing excellence in every project
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-6 px-6 sm:px-8 lg:px-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.1,
              }}
              className="flex-shrink-0 w-[400px] md:w-[500px] aspect-[4/3] rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(24, 24, 27, 0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-bold text-zinc-100 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
