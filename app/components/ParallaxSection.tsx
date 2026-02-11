"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextRotator from "./TextRotator";

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        className="text-center px-6 sm:px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <TextRotator
          phrases={[
            "Inspired by Innovation.",
            "Driven by Intelligence.",
            "Fueled by Passion.",
          ]}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-zinc-100"
        />
      </motion.div>
    </section>
  );
}
