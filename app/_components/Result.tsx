"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw } from "lucide-react";

interface ResultScreenProps {
  score: number;
  quizQuestions: { question: string; options: string[]; answer: string }[];
  bestStreak: number;
  restartQuiz: () => void;
  setQuizStarted: (value: boolean) => void;
  setShowResult: (value: boolean) => void;
}

export default function ResultScreen({
  score,
  quizQuestions,
  bestStreak,
  restartQuiz,
  setQuizStarted,
  setShowResult
}: ResultScreenProps) {
  const percentage: number = Math.round((score / quizQuestions.length) * 100);
  let message: string = "";
  if (percentage >= 90) message = "Incredible! You're a football genius!";
  else if (percentage >= 70) message = "Great job! You really know your football!";
  else if (percentage >= 50) message = "Not bad! You have decent football knowledge.";
  else message = "Keep learning! You'll be a football expert soon.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-gray-300 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>
              <div className="flex items-center justify-center mb-4">
                <Trophy className="text-green-600 h-12 w-12" />
              </div>
              <span className="text-2xl font-semibold">Quiz Completed!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-bold mb-2">
                Your Score: {score} / {quizQuestions.length}
              </p>
              <p className="text-lg font-semibold mb-4">{percentage}%</p>
              <div className="my-4">
                <Progress value={percentage} className="h-2 bg-gray-300" />
              </div>
              <p className="italic text-gray-500 mb-6">{message}</p>
              <p className="mb-2 text-gray-700">Best Streak: {bestStreak}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                onClick={restartQuiz}
              >
                <RotateCcw className="h-4 w-4" />
                Restart Quiz
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 border-gray-300 text-black"
                onClick={() => {
                  setQuizStarted(false);
                  setShowResult(false);
                }}
              >
                Change Difficulty
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
