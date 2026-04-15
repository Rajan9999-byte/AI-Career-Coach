import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Brain, Award, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Feedback",
    description: "Get instant, detailed feedback on technical accuracy, communication style, and confidence level for every answer."
  },
  {
    icon: Target,
    title: "Role-Specific Questions",
    description: "Practice with questions tailored to your target role, industry, and experience level for maximum relevance."
  },
  {
    icon: Zap,
    title: "Real-Time Evaluation",
    description: "Receive immediate scoring and suggestions during mock interviews to improve on the spot."
  },
  {
    icon: Award,
    title: "Performance Analytics",
    description: "Track your progress with detailed dashboards showing strengths, weaknesses, and improvement trends."
  },
  {
    icon: Clock,
    title: "Practice Anytime",
    description: "24/7 access to unlimited mock interviews. Practice at your own pace, whenever it suits you."
  },
  {
    icon: Shield,
    title: "Interview Confidence",
    description: "Build genuine confidence through repeated practice with AI that adapts to your skill level."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive features designed to maximize your interview performance
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-chart-2/10 text-chart-2">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
