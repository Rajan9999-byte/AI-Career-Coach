import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function CTASection() {
  const [, navigate] = useLocation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg md:text-xl opacity-90">
            Join thousands of successful candidates who have landed their dream jobs with AI-powered interview preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2" onClick={() => navigate("/interview")} data-testid="button-cta-start">
              Start Free Practice
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-cta-demo">
              Watch Demo
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Unlimited practice</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
