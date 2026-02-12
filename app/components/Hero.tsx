"use client";

import { motion } from "framer-motion";
import Globe from "./Globe";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden bg-zinc-950"
    >
      {/* Globe - offset to the right */}
      <div className="absolute inset-0 flex items-center justify-end pt-24">
        <motion.div
          className="w-full h-full max-w-5xl max-h-5xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          <Globe />
        </motion.div>
      </div>

      {/* Text - positioned on the left */}
      <motion.div
        className="relative z-10 text-left px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="space-y-2 sm:space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-zinc-100 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Fast.
          </motion.h1>
          <motion.h1
            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-zinc-100 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Smart.
          </motion.h1>
          <motion.h1
            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-zinc-100 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Global.
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
