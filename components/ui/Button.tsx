"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center font-semibold rounded-2xl cursor-pointer transition-all duration-200 select-none overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-white shadow-lg shadow-pink-300/40 hover:shadow-pink-400/60 hover:shadow-xl",
    secondary:
      "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30",
    ghost:
      "bg-transparent border-2 border-pink-300/60 text-pink-200 hover:bg-pink-300/10 hover:border-pink-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Glossy shine overlay */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
