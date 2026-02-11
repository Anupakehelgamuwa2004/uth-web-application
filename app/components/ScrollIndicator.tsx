"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {/* Mouse Shape */}
      <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
        {/* Animated Wheel */}
        <motion.div
          className="w-1 h-1.5 bg-white rounded-full"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Scroll Text with Bounce */}
      <motion.div
        className="flex flex-col items-center gap-1"
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-4 h-4 text-white/60" />
        <span className="text-xs text-white/60 tracking-widest font-mono uppercase">
          SCROLL
        </span>
      </motion.div>
    </motion.div>
  );
}
