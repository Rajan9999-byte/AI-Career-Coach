import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Send, SkipForward, X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { submitAnswer } from "@/lib/interviewApi";
import type { Role, Difficulty } from "@shared/schema";

interface InterviewSimulationProps {
  role: Role;
  difficulty: Difficulty;
  sessionId: string;
  initialQuestion: string;
  onFeedback?: (feedback: any) => void;
  onComplete?: () => void;
}

export default function InterviewSimulation({
  role,
  difficulty,
  sessionId,
  initialQuestion,
  onFeedback,
  onComplete,
}: InterviewSimulationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState("");
  const totalQuestions = 10;
  const progress = (currentQuestion / totalQuestions) * 100;

  const answerMutation = useMutation({
    mutationFn: (answer: string) =>
      submitAnswer(sessionId, answer, currentQuestion),
    onSuccess: (data: any) => {
      onFeedback?.(data.evaluation);
      
      if (data.isComplete) {
        onComplete?.();
      } else {
        setQuestion(data.nextQuestion);
        setCurrentQuestion(data.nextQuestionNumber);
        setAnswer("");
      }
    },
  });

  const handleSubmit = () => {
    if (answer.trim()) {
      answerMutation.mutate(answer);
    }
  };

  const handleSkip = () => {
    setAnswer("");
    setCurrentQuestion(prev => Math.min(prev + 1, totalQuestions));
  };

  const isLoading = answerMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Badge variant="outline" className="font-semibold">
            {role}
          </Badge>
          <Badge variant="secondary">
            {difficulty}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} data-testid="progress-interview" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Question {currentQuestion}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed" data-testid="text-question">
            {question}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">Your Answer</label>
        <Textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isLoading}
          rows={8}
          className="resize-none"
          data-testid="input-answer"
        />
        <div className="text-xs text-muted-foreground text-right">
          {answer.length} characters
        </div>
      </div>

      {answerMutation.error && (
        <div className="text-sm text-destructive p-3 bg-destructive/10 rounded-md">
          Error: {(answerMutation.error as any)?.message || "Failed to submit answer"}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <Button 
          variant="outline" 
          onClick={handleSkip}
          disabled={isLoading}
          data-testid="button-skip"
        >
          <SkipForward className="h-4 w-4 mr-2" />
          Skip
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!answer.trim() || isLoading}
          data-testid="button-submit-answer"
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Send className="h-4 w-4 mr-2" />
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
