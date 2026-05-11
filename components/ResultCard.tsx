"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TestResult } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ResultCardProps {
  result: TestResult;
  onRetake: () => void;
}

export default function ResultCard({ result, onRetake }: ResultCardProps) {
  const [displayIQ, setDisplayIQ] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    // Count-up animation for IQ
    const start = 150;
    const end = result.fakeIQ;
    const duration = 2500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Stronger ease out
      const current = Math.round(start + (end - start) * eased);
      setDisplayIQ(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Confetti
    import("canvas-confetti").then((confettiModule) => {
      const confetti = confettiModule.default;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f472b6", "#c084fc", "#818cf8"],
      });
    });
  }, [result.fakeIQ]);

  const handleShare = () => {
    const text = `${result.shareText}\n\nMy IQ: ${result.fakeIQ} 🧠✨\nTake the test: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: "My IQ Test Result", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Đã sao chép vào bộ nhớ tạm! Đi chia sẻ thôi nào 💕");
      });
    }
  };

  // Circular progress math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const iqPercent = Math.max(0, Math.min(100, ((result.fakeIQ - 40) / 60) * 100));
  const strokeDashoffset = circumference - (iqPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      {/* Main IQ Card - Clean and massive */}
      <Card variant="glow" padding="lg" className="w-full text-center mb-12">
        <div className="flex flex-col items-center py-4">
          {/* Large Circular Meter */}
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70" cy="70" r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
              />
              <motion.circle
                cx="70" cy="70" r={radius}
                fill="none"
                stroke="url(#iqGradientResult)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="iqGradientResult" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white mb-1">{displayIQ}</span>
              <span className="text-pink-200/40 text-[9px] font-bold tracking-[0.3em]">ĐIỂM IQ</span>
            </div>
          </div>

          {/* Result Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <p className="text-3xl mb-4">✨</p>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight px-4">
              {result.message}
            </h2>
          </motion.div>
        </div>
      </Card>

      {/* Action Buttons - Massive spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="w-full flex flex-col gap-4"
      >
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleShare}
          className="py-5 text-lg rounded-2xl"
        >
          Chia Sẻ Kết Quả
        </Button>
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={onRetake}
          className="py-4 text-sm border-white/10 text-white/40 hover:text-white"
        >
          Làm Lại Kiểm Tra
        </Button>
      </motion.div>
    </motion.div>
  );
}
