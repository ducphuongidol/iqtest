import { Question } from "@/types";
import { questionBank } from "@/data/questions";

export function getRandomQuestions(count: number = 20): Question[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function shuffleOptions(question: Question): {
  question: Question;
  correctAnswerIndex: number;
} {
  const optionsWithIndex = question.options.map((opt, i) => ({
    text: opt,
    isCorrect: i === question.correctAnswer,
  }));

  const shuffledOptions = optionsWithIndex.sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledOptions.findIndex((opt) => opt.isCorrect);

  return {
    question: {
      ...question,
      options: shuffledOptions.map((opt) => opt.text),
      correctAnswer: newCorrectIndex,
    },
    correctAnswerIndex: newCorrectIndex,
  };
}
