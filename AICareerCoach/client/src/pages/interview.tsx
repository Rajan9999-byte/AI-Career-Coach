import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Loader2 } from "lucide-react";
import InterviewSimulation from "@/components/InterviewSimulation";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { startInterview } from "@/lib/interviewApi";
import type { Role, Difficulty } from "@shared/schema";

type RoleValue = Role | "";
type DifficultyValue = Difficulty | "";

export default function Interview() {
  const [started, setStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [role, setRole] = useState<RoleValue>("");
  const [difficulty, setDifficulty] = useState<DifficultyValue>("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);

  const startMutation = useMutation({
    mutationFn: () =>
      startInterview(role as Role, difficulty as Difficulty),
    onSuccess: (data) => {
      setSessionData(data);
      setStarted(true);
      setShowFeedback(false);
    },
  });

  const handleStart = () => {
    if (role && difficulty) {
      startMutation.mutate();
    }
  };

  const handleBack = () => {
    setStarted(false);
    setShowFeedback(false);
    setSessionData(null);
    setCurrentFeedback(null);
    setRole("");
    setDifficulty("");
  };

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleFeedback = (feedback: any) => {
    setCurrentFeedback(feedback);
    setShowFeedback(true);
  };

  const handleComplete = () => {
    setShowFeedback(true);
  };

  const roles: Role[] = [
    "Data Analyst",
    "Software Engineer",
    "Product Manager",
    "HR Associate",
    "Marketing Manager",
    "Data Scientist",
    "Business Analyst",
    "UI/UX Designer",
  ];

  const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="font-serif font-bold text-xl text-foreground">AI Career Coach</span>
            </div>
          </div>
          
          {started && (
            <Button variant="outline" onClick={toggleFeedback} data-testid="button-toggle-feedback">
              {showFeedback ? "Continue Interview" : "View Feedback"}
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!started ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="font-serif font-bold text-3xl text-foreground mb-2">
                Start Mock Interview
              </h1>
              <p className="text-muted-foreground">
                Configure your interview session and begin practicing
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Interview Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Role</label>
                  <Select value={role} onValueChange={(val) => setRole(val as Role)}>
                    <SelectTrigger data-testid="select-role">
                      <SelectValue placeholder="Choose a role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty Level</label>
                  <Select value={difficulty} onValueChange={(val) => setDifficulty(val as Difficulty)}>
                    <SelectTrigger data-testid="select-difficulty">
                      <SelectValue placeholder="Choose difficulty..." />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {startMutation.error && (
                  <div className="text-sm text-destructive p-3 bg-destructive/10 rounded-md">
                    Error: {(startMutation.error as any)?.message || "Failed to start interview"}
                  </div>
                )}

                <div className="pt-4">
                  <Button 
                    onClick={handleStart} 
                    className="w-full" 
                    size="lg"
                    disabled={!role || !difficulty || startMutation.isPending}
                    data-testid="button-start-interview"
                  >
                    {startMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Start Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {showFeedback && currentFeedback ? (
              <div>
                <h2 className="font-serif font-bold text-2xl text-foreground mb-6">
                  Your Performance
                </h2>
                <FeedbackDisplay 
                  overallScore={currentFeedback.score}
                  technicalAccuracy={currentFeedback.technicalAccuracy}
                  communication={currentFeedback.communication}
                  confidence={currentFeedback.confidence}
                />
              </div>
            ) : sessionData ? (
              <InterviewSimulation 
                role={role as Role}
                difficulty={difficulty as Difficulty}
                sessionId={sessionData.sessionId}
                initialQuestion={sessionData.question}
                onFeedback={handleFeedback}
                onComplete={handleComplete}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
