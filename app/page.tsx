"use client";
import { useState, useEffect, useCallback } from "react";
import WelcomeScreen from "./_components/landingPage";
import ResultScreen from "./_components/Result";
import QuizScreen from "./_components/quizscreen";
import questionsDataRaw from "./data/data.json";

// Define the structure of a quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

// Cast questionsDataRaw to QuizQuestion[] while ensuring correct type for difficulty
const questionsData: QuizQuestion[] = questionsDataRaw.map((question) => ({
  ...question,
  difficulty: question.difficulty as "easy" | "medium" | "hard", // cast difficulty to the correct type
}));

export default function FootballQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard" | "all">("all");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(questionsData);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // Filter questions based on difficulty
  useEffect(() => {
    if (difficultyLevel === "all") {
      setQuizQuestions(questionsData);
    } else {
      setQuizQuestions(questionsData.filter((q) => q.difficulty === difficultyLevel));
    }

    // Reset quiz when difficulty changes
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStarted(false);
  }, [difficultyLevel]);

  // Define handleNextQuestion with useCallback to avoid stale closures
  const handleNextQuestion = useCallback(() => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      setShowResult(true);
    }
  }, [currentQuestion, quizQuestions.length]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (quizStarted && timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleNextQuestion();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timerActive, quizStarted, handleNextQuestion]);

  const handleAnswer = (option: string) => {
    setTimerActive(false);
    setSelectedOption(option);

    const correct = option === quizQuestions[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setBestStreak((prevBest) => Math.max(prevBest, streak + 1));
    } else {
      setStreak(0);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(15);
    setTimerActive(true);
    setStreak(0);
    setQuizStarted(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Render appropriate screen based on app state
  if (!quizStarted && !showResult) {
    return (
      <WelcomeScreen 
        difficultyLevel={difficultyLevel}
        setDifficultyLevel={setDifficultyLevel}
        startQuiz={startQuiz}
        quizQuestions={quizQuestions}
      />
    );
  }

  if (showResult) {
    return (
      <ResultScreen 
        score={score}
        quizQuestions={quizQuestions}
        bestStreak={bestStreak}
        restartQuiz={restartQuiz}
        setQuizStarted={setQuizStarted}
        setShowResult={setShowResult}
      />
    );
  }

  return (
    <QuizScreen
      currentQuestion={currentQuestion}
      quizQuestions={quizQuestions}
      score={score}
      timeLeft={timeLeft}
      streak={streak}
      progressPercentage={progressPercentage}
      selectedOption={selectedOption}
      isCorrect={isCorrect}
      handleAnswer={handleAnswer}
      handleNextQuestion={handleNextQuestion}
    />
  );
}
