"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getRandomLoadingMessages } from "@/data/loadingMessages";

export default function LoadingScreen() {
  const [messages] = useState(() => getRandomLoadingMessages(5));
  const [currentMsg, setCurrentMsg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-10"
    >
      {/* Brain animation */}
      <div className="relative">
        {/* Outer rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor:
                i === 0
                  ? "rgba(244,114,182,0.6)"
                  : i === 1
                  ? "rgba(192,132,252,0.4)"
                  : "rgba(129,140,248,0.2)",
              margin: `${-i * 20}px`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
            transition={{
              rotate: { duration: 3 + i * 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}

        {/* Core brain emoji */}
        <motion.div
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 backdrop-blur-xl border border-white/20 flex items-center justify-center text-5xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🧠
        </motion.div>
      </div>

      {/* Loading text */}
      <div className="text-center space-y-4 max-w-sm">
        <h2 className="text-2xl font-bold text-white">
          Đang Phân Tích Kết Quả...
        </h2>

        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMsg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-white/70 text-base"
            >
              {messages[currentMsg]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {messages.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor:
                i <= currentMsg
                  ? "#f472b6"
                  : "rgba(255,255,255,0.2)",
              scale: i === currentMsg ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Loading bar */}
      <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #f472b6, #c084fc, #818cf8)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
