"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]') && !target.closest('[data-mobile-button]')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // If we're on the home page, use smooth scroll
    if (pathname === "/" && href.includes("#")) {
      const hash = href.split("#")[1];
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    
    // Otherwise, navigate to the page using Next.js router
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[5000] flex justify-center items-start pointer-events-none p-2 sm:p-4">
      <motion.div
        initial={{ width: "100%", y: 0, borderRadius: "0px", opacity: 0 }}
        animate={{
          width: isScrolled ? (typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "600px") : "100%",
          y: isScrolled ? 12 : 0,
          opacity: 1,
          borderRadius: isScrolled ? "100px" : "0px",
          backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.9)" : "transparent",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        
        className={`pointer-events-auto flex items-center justify-between backdrop-blur-md border overflow-hidden ${
          isScrolled ? "px-4 py-2 sm:px-6 sm:py-3" : "px-4 py-3 sm:px-10 sm:py-5"
        }`}
        style={{ minWidth: isScrolled && typeof window !== "undefined" && window.innerWidth >= 768 ? "600px" : "100%" }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* LOGO */}
        <motion.a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            router.push("/");
          }}
          className="font-bold text-lg sm:text-xl text-white tracking-tighter shrink-0 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          UTH
        </motion.a>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 whitespace-nowrap">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                handleClick(e, item.href);
                setIsMobileMenuOpen(false);
              }}
              className="relative px-2 lg:px-4 py-2 text-xs font-medium uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
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
              
              {/* TEXT */}
              <span className="relative z-10">{item.name}</span>
            </motion.a>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          data-mobile-button
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-[4999] pointer-events-auto"
            data-mobile-menu
          >
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleClick(e, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative px-4 py-3 text-sm font-medium uppercase tracking-widest text-zinc-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
