"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// ORDER: Services BEFORE Work
const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#work" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're on the home page, use smooth scroll
    if (pathname === "/" && href.includes("#")) {
      const hash = href.split("#")[1];
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    
    // Otherwise, navigate to the page
    window.location.href = href;
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[5000] flex justify-center items-start pointer-events-none p-4">
      <motion.div
        initial={{ width: "100%", y: 0, borderRadius: "0px", opacity: 0 }}
        animate={{
          width: isScrolled ? "600px" : "100%",
          y: isScrolled ? 12 : 0,
          opacity: 1,
          // ANIMATE BORDER RADIUS WITH WIDTH
          borderRadius: isScrolled ? "100px" : "0px",
          backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.9)" : "transparent",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        // HIGH STIFFNESS SPRING = Rounds the corners INSTANTLY as it shrinks
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        
        className={`pointer-events-auto flex items-center justify-between backdrop-blur-md border overflow-hidden ${
          isScrolled ? "px-6 py-3" : "px-10 py-5"
        }`}
        style={{ minWidth: isScrolled ? "600px" : "100%" }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* LOGO */}
        <motion.a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          className="font-bold text-xl text-white tracking-tighter shrink-0 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          UTH
        </motion.a>

        {/* LINKS */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="relative px-4 py-2 text-xs font-medium uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
              onMouseEnter={() => setHoveredIdx(idx)}
            >
              {/* THE VISIBLE LIQUID PILL */}
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-neutral-700/80 rounded-full z-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6
                  }}
                />
              )}
              
              {/* TEXT (Must be z-10 to sit on top of the pill) */}
              <span className="relative z-10">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
