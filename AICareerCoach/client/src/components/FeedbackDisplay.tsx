import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

interface FeedbackDisplayProps {
  overallScore: number;
  technicalAccuracy: number;
  communication: number;
  confidence: number;
}

export default function FeedbackDisplay({ 
  overallScore, 
  technicalAccuracy, 
  communication, 
  confidence 
}: FeedbackDisplayProps) {
  //todo: remove mock functionality
  const mockFeedback = "Great answer! You demonstrated a solid understanding of the core concepts. Your explanation was clear and well-structured. To improve further, consider adding more specific examples from your experience.";
  const mockImprovements = [
    "Add quantitative metrics to support your claims",
    "Practice explaining complex concepts more concisely",
    "Include industry-specific terminology where appropriate"
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", variant: "default" as const };
    if (score >= 60) return { text: "Good", variant: "secondary" as const };
    return { text: "Needs Work", variant: "destructive" as const };
  };

  const scoreBadge = getScoreBadge(overallScore);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="font-serif">Overall Performance</CardTitle>
            <Badge variant={scoreBadge.variant}>{scoreBadge.text}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`} data-testid="text-overall-score">
              {overallScore}
            </div>
            <div className="text-sm text-muted-foreground mt-1">out of 100</div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Technical Accuracy</span>
                <span className="text-muted-foreground">{technicalAccuracy}%</span>
              </div>
              <Progress value={technicalAccuracy} className="h-2" data-testid="progress-technical" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Communication</span>
                <span className="text-muted-foreground">{communication}%</span>
              </div>
              <Progress value={communication} className="h-2" data-testid="progress-communication" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Confidence & Clarity</span>
                <span className="text-muted-foreground">{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-2" data-testid="progress-confidence" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-chart-2/50 bg-chart-2/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-chart-2" />
            <CardTitle className="font-serif text-lg">AI Feedback</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">
            {mockFeedback}
          </p>
        </CardContent>
      </Card>

      <Card className="border-chart-3/50 bg-chart-3/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-chart-3" />
            <CardTitle className="font-serif text-lg">Improvement Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockImprovements.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
