"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export default function ProgressBar({
  current,
  total,
  percentage,
}: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white/70 text-sm font-medium">
          Câu hỏi <span className="text-white font-bold">{current}</span> trên{" "}
          <span className="text-white font-bold">{total}</span>
        </span>
        <span className="text-white/70 text-sm font-medium">
          Hoàn thành <span className="text-pink-200 font-bold">{Math.round(percentage)}%</span>
        </span>
      </div>

      {/* Track */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: "linear-gradient(90deg, #f472b6, #c084fc, #818cf8)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-1 justify-center mt-1">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === current - 1 ? 16 : 6,
              backgroundColor:
                i < current - 1
                  ? "#f472b6"
                  : i === current - 1
                  ? "#e879f9"
                  : "rgba(255,255,255,0.2)",
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
