"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface WelcomeScreenProps {
  difficultyLevel: "easy" | "medium" | "hard" | "all";
  setDifficultyLevel: (level: "easy" | "medium" | "hard" | "all") => void;
  startQuiz: () => void;
  quizQuestions: QuizQuestion[];
}

export default function WelcomeScreen({
  difficultyLevel,
  setDifficultyLevel,
  startQuiz,
  quizQuestions
}: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <div className="w-full max-w-md">
        <Card className="bg-white text-black border border-gray-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-extrabold text-center">
              Football Quiz Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6 text-gray-700">
              Test your football knowledge with our interactive quiz!
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-black">Select Difficulty:</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={difficultyLevel === "easy" ? "default" : "outline"}
                  onClick={() => setDifficultyLevel("easy")}
                  className={`${
                    difficultyLevel === "easy" ? "bg-black text-white" : "border-black text-black"
                  } hover:bg-black hover:text-white transition`}
                >
                  Easy
                </Button>
                <Button
                  variant={difficultyLevel === "medium" ? "default" : "outline"}
                  onClick={() => setDifficultyLevel("medium")}
                  className={`${
                    difficultyLevel === "medium" ? "bg-black text-white" : "border-black text-black"
                  } hover:bg-black hover:text-white transition`}
                >
                  Medium
                </Button>
                <Button
                  variant={difficultyLevel === "hard" ? "default" : "outline"}
                  onClick={() => setDifficultyLevel("hard")}
                  className={`${
                    difficultyLevel === "hard" ? "bg-black text-white" : "border-black text-black"
                  } hover:bg-black hover:text-white transition`}
                >
                  Hard
                </Button>
              </div>
              <Button
                variant={difficultyLevel === "all" ? "default" : "outline"}
                onClick={() => setDifficultyLevel("all")}
                className={`w-full mt-4 ${
                  difficultyLevel === "all" ? "bg-black text-white" : "border-black text-black"
                } hover:bg-black hover:text-white transition`}
              >
                All Questions
              </Button>
            </div>
            <div className="text-center">
              <p className="mb-2 text-gray-700">Total Questions: {quizQuestions.length}</p>
              <p className="mb-6 text-gray-700">Time per Question: 15 seconds</p>
              <Button
                className="w-full bg-black text-white hover:bg-gray-800 transition"
                onClick={startQuiz}
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
