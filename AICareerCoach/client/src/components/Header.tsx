import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [, navigate] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-serif font-bold text-xl text-foreground">AI Career Coach</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#roles" className="text-sm font-medium hover:text-primary transition-colors">
            Roles
          </a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-login">
            Log In
          </Button>
          <Button onClick={() => navigate("/interview")} data-testid="button-signup">
            Sign Up
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
