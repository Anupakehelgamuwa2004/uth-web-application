"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  { id: 1, name: "Alex Chen", role: "Lead Architect", image: "/team/alex.jpg" },
  { id: 2, name: "Sam Rivera", role: "Design Director", image: "/team/sam.jpg" },
  { id: 3, name: "Jordan Kim", role: "Engineering Lead", image: "/team/jordan.jpg" },
  { id: 4, name: "Taylor Morgan", role: "Product Strategist", image: "/team/taylor.jpg" },
  { id: 5, name: "Casey Lee", role: "Systems Engineer", image: "/team/casey.jpg" },
  { id: 6, name: "Morgan Blake", role: "Creative Technologist", image: "/team/morgan.jpg" },
];

export default function TeamPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 30;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fill();

        // Draw connections
        nodes.forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.stroke();
          }
        });

        // Mouse interaction
        const dx = node.x - mousePos.x;
        const dy = node.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          node.vx += (dx / distance) * force * 0.1;
          node.vy += (dy / distance) * force * 0.1;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePos]);

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 sm:px-8 lg:px-12"
      >
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8"
          >
            The Collective Mind.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 leading-relaxed max-w-3xl"
          >
            We are a decentralized unit of specialists. No managers, just makers. Every member of UTH is a senior contributor with autonomy and mastery.
          </motion.p>
        </div>

        {/* Constellation Canvas */}
        <div className="max-w-7xl mx-auto mb-32 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-96 border border-white/10"
          />
        </div>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group relative aspect-square border border-white/10 overflow-hidden bg-black hover:border-white/20 transition-all"
            >
              {/* Spotlight Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-radial from-white/0 via-white/0 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Placeholder for photo - reveals on hover */}
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                <span className="text-zinc-700 text-sm group-hover:text-zinc-500 transition-colors">
                  {member.name}
                </span>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-xl font-bold tracking-tighter mb-1">{member.name}</h3>
                <p className="text-zinc-400 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
