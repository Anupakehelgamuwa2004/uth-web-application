"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

interface RocketPreloaderProps {
  onComplete: () => void;
}

export default function RocketPreloader({ onComplete }: RocketPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Simulated loading - exactly 2.5 seconds
    const duration = 2500; // 2.5 seconds
    const interval = 16; // ~60fps updates
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(timer);
          setIsLaunching(true);
          // Rocket flies off, then fade out screen
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onComplete();
            }, 500); // Small delay after fade completes
          }, 1000); // Time for rocket to fly off + fade
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={
            isLaunching
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1,
                }
          }
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.5,
            delay: isLaunching ? 0.5 : 0, // Fade starts after rocket begins flying
          }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          style={{ backgroundColor: '#000000' }}
        >
          {/* UTH Text - Large and Bold */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-8xl font-black tracking-tighter text-white mb-16"
          >
            UTH
          </motion.h1>

          {/* Progress Bar Container */}
          <div className="relative w-80 h-[2px] bg-zinc-800">
            {/* Progress Fill - Cyan Gradient */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-400 to-cyan-500"
              style={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.1,
                ease: 'linear',
              }}
            />

            {/* Rocket Container - vertically centered with track */}
            <div className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 overflow-visible">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `calc(${progress}% - 20px)`, // Center rocket on progress position (20px = half of w-10)
                }}
                animate={
                  isLaunching
                    ? {
                        x: 2000, // Fly off screen to the right
                        opacity: [1, 1, 0],
                      }
                    : {}
                }
                transition={
                  isLaunching
                    ? {
                        x: {
                          duration: 0.8,
                          ease: 'easeOut',
                        },
                        opacity: {
                          duration: 0.8,
                          ease: 'easeOut',
                        },
                      }
                    : {
                        duration: 0.1,
                        ease: 'linear',
                      }
                }
              >
                {/* Rocket Icon - Small and Sleek, pointing horizontally right */}
                <Rocket
                  className="w-10 h-10 text-white"
                  style={{
                    transform: 'rotate(45deg)', // Fine-tuned to point perfectly horizontal right
                    filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 255, 255, 0.4))',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
