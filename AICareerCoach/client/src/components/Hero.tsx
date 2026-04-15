import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import heroImage from "@assets/generated_images/Career_professionals_collaborating_da12363b.png";

export default function Hero() {
  const [, navigate] = useLocation();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Interview Prep</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Master Your Next Interview with AI Coaching
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Get personalized, role-based interview questions, real-time feedback, and performance insights powered by advanced AI. Practice like a pro, land your dream job.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" onClick={() => navigate("/interview")} data-testid="button-start-free">
                Start Free Practice
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Students Prepared</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Role Types</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-lg blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Career professionals collaborating" 
              className="relative rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
