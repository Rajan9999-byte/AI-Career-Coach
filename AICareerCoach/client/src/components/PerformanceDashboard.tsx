import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

export default function PerformanceDashboard() {
  //todo: remove mock functionality
  const mockStats = {
    avgScore: 78,
    sessionsCompleted: 12,
    weakestSkill: "System Design",
    totalTimeSpent: "8.5 hours"
  };

  const mockRecentSessions = [
    { role: "Data Analyst", score: 85, date: "2 hours ago", difficulty: "Intermediate" },
    { role: "Software Engineer", score: 72, date: "1 day ago", difficulty: "Advanced" },
    { role: "Product Manager", score: 88, date: "2 days ago", difficulty: "Beginner" }
  ];

  const mockSkillScores = [
    { skill: "SQL", score: 92 },
    { skill: "Python", score: 85 },
    { skill: "Communication", score: 78 },
    { skill: "System Design", score: 65 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(mockStats.avgScore)}`} data-testid="text-avg-score">
              {mockStats.avgScore}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground" data-testid="text-sessions">
              {mockStats.sessionsCompleted}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across 4 roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weakest Area</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold text-foreground" data-testid="text-weakest">
              {mockStats.weakestSkill}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Focus here next</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Practiced</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground" data-testid="text-time">
              {mockStats.totalTimeSpent}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Sessions</CardTitle>
            <CardDescription>Your latest practice interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between gap-4 pb-4 border-b last:border-0 last:pb-0" data-testid={`row-session-${index}`}>
                  <div className="space-y-1 flex-1">
                    <div className="font-medium text-sm">{session.role}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{session.difficulty}</Badge>
                      <span className="text-xs text-muted-foreground">{session.date}</span>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(session.score)}`}>
                    {session.score}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Skill Breakdown</CardTitle>
            <CardDescription>Performance by skill category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSkillScores.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.skill}</span>
                    <span className={`font-semibold ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
