"use client";

import { useState, useCallback } from "react";
import { Question, TestResult } from "@/types";
import { getRandomQuestions } from "@/utils/getRandomQuestions";
import { calculateFakeIQ } from "@/utils/calculateFakeIQ";

export type TestPhase = "landing" | "test" | "loading" | "result";

export function useTest() {
  const [phase, setPhase] = useState<TestPhase>("landing");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startTest = useCallback(() => {
    const randomQuestions = getRandomQuestions(20);
    setQuestions(randomQuestions);
    setCurrentIndex(0);
    setAnswers(new Array(20).fill(null));
    setResult(null);
    setSelectedAnswer(null);
    setIsAnimating(false);
    setPhase("test");
  }, []);

  const answerQuestion = useCallback(
    (answerIndex: number) => {
      if (isAnimating || selectedAnswer !== null) return;

      setSelectedAnswer(answerIndex);
      setIsAnimating(true);

      const newAnswers = [...answers];
      newAnswers[currentIndex] = answerIndex;
      setAnswers(newAnswers);

      // Auto-advance after short delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnimating(false);
        } else {
          // Calculate result
          const correctAnswers = newAnswers.filter(
            (ans, i) => ans === questions[i]?.correctAnswer
          ).length;
          const testResult = calculateFakeIQ(correctAnswers);
          setResult(testResult);
          setPhase("loading");

          // Show loading for 4 seconds then reveal result
          setTimeout(() => {
            setPhase("result");
          }, 4500);
        }
      }, 600);
    },
    [isAnimating, selectedAnswer, answers, currentIndex, questions]
  );

  const resetTest = useCallback(() => {
    setPhase("landing");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setSelectedAnswer(null);
    setIsAnimating(false);
  }, []);

  return {
    phase,
    questions,
    currentIndex,
    answers,
    result,
    selectedAnswer,
    isAnimating,
    startTest,
    answerQuestion,
    resetTest,
    progress:
      questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0,
    currentQuestion: questions[currentIndex] || null,
  };
}
