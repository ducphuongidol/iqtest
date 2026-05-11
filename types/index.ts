export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  category: "logic" | "math" | "pattern" | "word" | "sequence" | "visual";
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  fakeIQ: number;
  message: string;
  analysis: string;
  shareText: string;
}

export interface TestState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  isFinished: boolean;
  startTime: number;
}

export type GamePhase = "landing" | "test" | "loading" | "result";
