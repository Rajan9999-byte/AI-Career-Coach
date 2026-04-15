import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Star, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Students Prepared",
    color: "text-chart-1"
  },
  {
    icon: Star,
    value: "95%",
    label: "Success Rate",
    color: "text-chart-2"
  },
  {
    icon: TrendingUp,
    value: "$30B",
    label: "Market by 2030",
    color: "text-chart-3"
  },
  {
    icon: Zap,
    value: "60%",
    label: "Cost Reduction",
    color: "text-chart-4"
  }
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of successful interview candidates
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-elevate" data-testid={`card-stat-${index}`}>
              <CardContent className="p-8">
                <div className={`mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
