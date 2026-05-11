"use client";

import { AnimatePresence, motion } from "framer-motion";
import FloatingParticles from "@/components/FloatingParticles";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import LoadingScreen from "@/components/LoadingScreen";
import ResultCard from "@/components/ResultCard";
import Button from "@/components/ui/Button";
import { useTest } from "@/hooks/useTest";

// ─── Landing Hero ────────────────────────────────────────────────────────────
function LandingSection({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-20 text-center"
    >
      {/* Small Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-200/60 text-[10px] uppercase tracking-[0.3em] font-bold"
      >
        Neural Assessment v2.0
      </motion.div>

      {/* Main Title - Increased spacing and cleaner look */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-12"
      >
        <h1
          className="text-5xl md:text-7xl font-black tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="text-white">Ai </span>
          <span className="gradient-text">Thông Minh Hơn</span>
          <br />
          <span className="text-white">Học Sinh Lớp 5?</span>
        </h1>
        <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
          Bài kiểm tra khoa học tối thượng dành cho những{" "}
          <span className="text-pink-300/60 italic font-semibold">thiên tài vô tri.</span>
        </p>
      </motion.div>

      {/* Stats - More minimal and airy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-12 mb-20"
      >
        {[
          { label: "CÂU HỎI", value: "20" },
          { label: "PHÚT", value: "~5" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="text-white text-2xl font-bold tracking-tight">{s.value}</span>
            <span className="text-white/20 text-[10px] font-bold tracking-[0.2em] mt-1">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button - Huge and focused */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          id="start-test-btn"
          variant="primary"
          size="lg"
          onClick={onStart}
          className="relative text-xl px-12 py-6 font-bold tracking-wide rounded-3xl"
        >
          Bắt Đầu Kiểm Tra
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ─── Test Section ─────────────────────────────────────────────────────────────
function TestSection({
  currentQuestion,
  currentIndex,
  totalQuestions,
  progress,
  selectedAnswer,
  onAnswer,
  onQuit,
}: {
  currentQuestion: ReturnType<typeof useTest>["currentQuestion"];
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  selectedAnswer: number | null;
  onAnswer: (i: number) => void;
  onQuit: () => void;
}) {
  if (!currentQuestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="min-h-dvh px-4 py-8 flex flex-col max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span
            className="text-white font-bold text-lg hidden sm:block"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Thử Thách IQ
          </span>
        </div>
        <button
          onClick={onQuit}
          className="text-white/30 hover:text-white/60 text-sm transition-colors px-3 py-1 rounded-lg hover:bg-white/5"
        >
          ✕ Thoát
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar
          current={currentIndex + 1}
          total={totalQuestions}
          percentage={progress}
        />
      </div>

      {/* Question */}
      <div className="flex-1">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      </div>

      {/* Bottom hint */}
      <motion.p
        className="text-center text-white/25 text-xs mt-6"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Chọn một đáp án để tự động tiếp tục
      </motion.p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    questions,
    result,
    selectedAnswer,
    startTest,
    answerQuestion,
    resetTest,
    progress,
  } = useTest();

  return (
    <main className="relative min-h-dvh">
      <FloatingParticles />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "landing" && (
            <motion.div key="landing" className="w-full flex justify-center">
              <LandingSection onStart={startTest} />
            </motion.div>
          )}

          {phase === "test" && (
            <motion.div key="test" className="w-full flex justify-center">
              <TestSection
                currentQuestion={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                progress={progress}
                selectedAnswer={selectedAnswer}
                onAnswer={answerQuestion}
                onQuit={resetTest}
              />
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              className="min-h-dvh w-full flex items-center justify-center px-4"
            >
              <LoadingScreen />
            </motion.div>
          )}

          {phase === "result" && result && (
            <motion.div
              key="result"
              className="min-h-dvh w-full px-6 py-12 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-lg">
                <ResultCard result={result} onRetake={resetTest} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grand Footer */}
      <footer className="relative z-10 pb-8 pt-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex flex-col items-center gap-2 group cursor-default"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent mb-2 group-hover:w-24 transition-all duration-500" />
          <h3 className="text-sm font-medium tracking-tight text-white/40 group-hover:text-white/60 transition-colors duration-300">
            Designed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 font-bold">Phuong Nguyen</span>
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1 h-1 rounded-full bg-pink-500/40 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-purple-500/40 animate-pulse delay-75" />
            <span className="w-1 h-1 rounded-full bg-blue-500/40 animate-pulse delay-150" />
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
