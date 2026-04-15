import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { BarChart3, Code, Megaphone, Users, Briefcase, Database, LineChart, Palette } from "lucide-react";

const roles = [
  {
    icon: BarChart3,
    title: "Data Analyst",
    skills: ["SQL", "Python", "Tableau", "Excel"],
    companies: "Deloitte, TCS, Accenture"
  },
  {
    icon: Code,
    title: "Software Engineer",
    skills: ["DSA", "System Design", "Git", "APIs"],
    companies: "Amazon, Infosys, Wipro"
  },
  {
    icon: Briefcase,
    title: "Product Manager",
    skills: ["Strategy", "Analytics", "User Research"],
    companies: "Google, Microsoft, Meta"
  },
  {
    icon: Users,
    title: "HR Associate",
    skills: ["Recruitment", "Communication", "HRIS"],
    companies: "LinkedIn, Workday, SAP"
  },
  {
    icon: Megaphone,
    title: "Marketing Manager",
    skills: ["SEO", "Analytics", "Content Strategy"],
    companies: "HubSpot, Adobe, Salesforce"
  },
  {
    icon: Database,
    title: "Data Scientist",
    skills: ["ML", "Statistics", "Python", "R"],
    companies: "Netflix, Airbnb, Uber"
  },
  {
    icon: LineChart,
    title: "Business Analyst",
    skills: ["Requirements", "Process Mapping"],
    companies: "McKinsey, BCG, Bain"
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    skills: ["Figma", "User Testing", "Prototyping"],
    companies: "Apple, Dropbox, Spotify"
  }
];

export default function RolesSection() {
  const [, navigate] = useLocation();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Practice for Any Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored interview preparation for 50+ career paths
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-role-${index}`}>
              <CardHeader>
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-lg">{role.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-1">{role.companies}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" size="sm" onClick={() => navigate("/interview")} data-testid={`button-practice-${index}`}>
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
