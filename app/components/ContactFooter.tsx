"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative py-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center overflow-hidden"
    >
      {/* Mesh Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 0% 100%, rgba(88, 28, 135, 0.3) 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(30, 58, 138, 0.3) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(88, 28, 135, 0.2) 0%, transparent 50%),
            radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.2) 0%, transparent 50%),
            #000000
          `,
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
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
            Get in Touch
          </h2>
          <p className="text-xl text-zinc-500 mb-16">
            Let's build something extraordinary together
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.1,
              }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Mail className="w-6 h-6 text-zinc-500" />
                  <span className="text-sm text-zinc-500 uppercase tracking-wider font-mono">
                    Email
                  </span>
                </div>
                <a
                  href="mailto:hello@uth.agency"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 hover:text-white transition-colors block font-mono"
                >
                  hello@uth.agency
                </a>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.2,
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm text-zinc-500 mb-2 font-mono uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder=">"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-zinc-800 px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors font-mono text-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2 font-mono uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=">"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-zinc-800 px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors font-mono text-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2 font-mono uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder=">"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-transparent border-0 border-b-2 border-zinc-800 px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none font-mono text-lg"
                />
              </div>
              <motion.button
                type="submit"
                className="flex items-center gap-3 bg-zinc-100 text-zinc-950 px-8 py-4 font-medium hover:bg-white transition-colors font-mono uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Send</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm font-mono"
          >
            <p>© {new Date().getFullYear()} UTH. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
