"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ["✨", "💕", "🌸", "💫", "⭐", "🌷", "💖", "🦋"];

export default function FloatingParticles() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use memo to prevent regeneration on every re-render
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 10 + 10, // Slower for smoothness
      delay: Math.random() * 5,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Reduced and optimized background blobs using will-change */}
      <motion.div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #f472b6, #c084fc)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #e879f9, #818cf8)",
          willChange: "transform",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Optimized emoji particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -120],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
