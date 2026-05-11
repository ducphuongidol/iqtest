"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "glass" | "solid" | "glow";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export default function Card({
  children,
  variant = "glass",
  padding = "md",
  hover = false,
  className = "",
  ...props
}: CardProps) {
  const variants = {
    glass:
      "bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-pink-900/10",
    solid:
      "bg-gradient-to-br from-pink-50/90 to-purple-50/90 backdrop-blur-xl border border-pink-100/60 shadow-xl",
    glow: "bg-white/10 backdrop-blur-xl border border-pink-300/30 shadow-2xl shadow-pink-400/20",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8 md:p-10",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        rounded-3xl
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
