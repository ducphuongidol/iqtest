"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/types";
import Card from "@/components/ui/Card";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full will-change-[transform,opacity]"
      >
        <Card variant="glass" padding="lg" className="w-full min-h-[400px] flex flex-col">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-400/20 text-pink-200 border border-pink-300/20 uppercase tracking-[0.2em]">
              {question.category}
            </span>
            <span className="text-white/30 text-[10px] font-mono">#{questionNumber}</span>
          </div>

          {/* Question text */}
          <div className="flex-1">
            <motion.p
              className="text-white text-lg md:text-xl font-medium leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {question.question}
            </motion.p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={selectedAnswer === null ? { scale: 1.01, x: 4 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                onClick={() => onAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  group relative w-full text-left px-5 py-3.5 rounded-2xl
                  flex items-center gap-4 border transition-all duration-200
                  ${
                    selectedAnswer === index
                      ? "bg-pink-400/20 border-pink-300/40"
                      : "bg-white/5 border-white/5 hover:border-white/20"
                  }
                  ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {/* Label bubble */}
                <motion.span
                  className={`
                    flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                    text-sm font-bold transition-all duration-300
                    ${
                      selectedAnswer === index
                        ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-md"
                        : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
                    }
                  `}
                  animate={
                    selectedAnswer === index
                      ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  {OPTION_LABELS[index]}
                </motion.span>

                {/* Option text */}
                <span
                  className={`text-sm md:text-base transition-colors duration-300 ${
                    selectedAnswer === index
                      ? "text-white font-medium"
                      : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {option}
                </span>

                {/* Selected ripple */}
                {selectedAnswer === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-pink-400/60"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
