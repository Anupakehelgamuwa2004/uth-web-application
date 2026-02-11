"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { id: 1, title: "Project Alpha" },
  { id: 2, title: "Project Beta" },
  { id: 3, title: "Project Gamma" },
  { id: 4, title: "Project Delta" },
  { id: 5, title: "Project Epsilon" },
];

interface ProjectCardProps {
  project: { id: number; title: string };
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.1,
      }}
      className="flex-shrink-0 w-[400px] md:w-[500px] aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{ scale: 1.05, y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative overflow-hidden">
        {/* Parallax Image Background */}
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{ 
            y: imageY,
            background: "linear-gradient(135deg, rgba(39, 39, 42, 0.9) 0%, rgba(24, 24, 27, 0.9) 100%)",
          }}
        >
          {/* Grid pattern that becomes visible on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
              opacity: isHovered ? 0.5 : 0.2,
            }}
          />
          
          {/* Grayscale overlay that reduces on hover */}
          <motion.div
            className="absolute inset-0 bg-zinc-900/50"
            animate={{
              opacity: isHovered ? 0 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Project Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-zinc-100 relative z-10 px-6 text-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
}

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
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
