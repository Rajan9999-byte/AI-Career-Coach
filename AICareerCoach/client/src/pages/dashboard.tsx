import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, Play, BarChart3, Settings, LogOut } from "lucide-react";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import RolesSection from "@/components/RolesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-serif font-bold text-xl text-foreground">AI Career Coach</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" data-testid="button-settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Continue your interview preparation journey
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2" data-testid="tab-practice">
              <Play className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2" data-testid="tab-analytics">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PerformanceDashboard />
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div>
              <h2 className="font-serif font-semibold text-2xl text-foreground mb-6">
                Choose a Role to Practice
              </h2>
              <RolesSection />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <PerformanceDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
