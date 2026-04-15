import { Card, CardContent } from "@/components/ui/card";
import { UserCircle, MessageSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Select Your Role",
    description: "Choose from 50+ career paths including Data Analyst, Software Engineer, Product Manager, and more.",
    step: "01"
  },
  {
    icon: MessageSquare,
    title: "Practice with AI",
    description: "Answer role-specific questions with real-time AI evaluation and personalized feedback on every response.",
    step: "02"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your performance with detailed analytics, skill breakdowns, and readiness scores.",
    step: "03"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to interview success
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative hover-elevate">
              <CardContent className="p-8">
                <div className="absolute top-6 right-6 text-6xl font-bold text-muted/20">
                  {step.step}
                </div>
                <div className="relative">
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
