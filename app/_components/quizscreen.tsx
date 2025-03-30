"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Clock } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizScreenProps {
  currentQuestion: number;
  quizQuestions: QuizQuestion[];
  score: number;
  timeLeft: number;
  streak: number;
  progressPercentage: number;
  selectedOption: string | null;
  isCorrect: boolean | null;   
  handleAnswer: (option: string) => void;
  handleNextQuestion: () => void;
}

export default function QuizScreen({
  currentQuestion,
  quizQuestions,
  score,
  timeLeft,
  streak,
  progressPercentage,
  selectedOption,
  isCorrect,
  handleAnswer,
  handleNextQuestion
}: QuizScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <div className="w-full max-w-md mb-6 flex justify-between items-center">
        <div className="bg-white px-4 py-2 rounded-lg font-medium text-black">
          Score: {score}/{quizQuestions.length}
        </div>
        <div className="bg-white px-4 py-2 rounded-lg font-medium flex items-center text-black">
          <Clock className="h-4 w-4 mr-2" /> {timeLeft}s
        </div>
      </div>

      <div className="w-full max-w-md mb-4">
        <div className="flex justify-between items-center mb-1 text-sm text-black">
          <span>Question {currentQuestion + 1}/{quizQuestions.length}</span>
          <span>Streak: {streak}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-gray-300" />
      </div>

      <Card className="w-full max-w-md border border-gray-300 bg-white shadow-lg">
        <CardContent className="pt-6">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-black">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="grid gap-3 mb-6">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                let buttonStyle = "bg-black hover:bg-gray-900 text-white";
                
                if (selectedOption !== null) {
                  if (option === quizQuestions[currentQuestion].answer) {
                    buttonStyle = "bg-green-600 hover:bg-green-600 text-white";
                  } else if (option === selectedOption) {
                    buttonStyle = "bg-red-600 border border-red-500 text-white";
                  } else {
                    buttonStyle = "bg-gray-800 opacity-50 text-white";
                  }
                }

                return (
                  <Button
                    key={index}
                    className={`text-left justify-start p-4 h-auto ${buttonStyle}`}
                    onClick={() => !selectedOption && handleAnswer(option)}
                    disabled={selectedOption !== null}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="mb-6">
                <p className={`font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                  {isCorrect
                    ? "Correct! Well done!"
                    : `Incorrect. The correct answer is ${quizQuestions[currentQuestion].answer}.`}
                </p>
              </div>
            )}

            {selectedOption && (
              <div>
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next Question"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
