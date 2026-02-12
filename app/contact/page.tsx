"use client";

import { motion } from "framer-motion";
import FloatingNav from "../components/FloatingNav";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 px-6 sm:px-8 lg:px-12 flex items-center justify-center min-h-[calc(100vh-8rem)]"
      >
        <div className="max-w-2xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8"
            >
              Establish Uplink.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-400 leading-relaxed"
            >
              Ready to deploy? Transmit your requirements. We prioritize technical clarity and ambitious scope.
            </motion.p>
          </div>

          {/* The Pulse - Radar Circles */}
          <div className="relative flex items-center justify-center mb-16 h-64">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="absolute w-64 h-64 border border-white/10 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.75,
                  ease: "easeOut",
                }}
              />
            ))}
            {/* Center dot */}
            <div className="absolute w-4 h-4 bg-white rounded-full" />
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div>
              <input
                type="text"
                placeholder="NAME"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors uppercase tracking-wider text-sm"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors uppercase tracking-wider text-sm"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="MESSAGE"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors uppercase tracking-wider text-sm resize-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all uppercase tracking-widest font-medium text-sm"
            >
              TRANSMIT
            </motion.button>
          </motion.form>
        </div>
      </motion.main>
    </div>
  );
}
