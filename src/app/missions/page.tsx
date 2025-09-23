import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MissionForm } from "./mission-form";
import { Lightbulb } from "lucide-react";

export default function MissionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Missions</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personalized Mission Generator</CardTitle>
          <CardDescription>
            Use our AI to generate new sustainable farming missions tailored to your farm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-2">How it works:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-6">
                <li>Enter your primary crop type.</li>
                <li>Specify your farm's location.</li>
                <li>Select the approximate size of your farm.</li>
                <li>Our AI will analyze the data and suggest new quests!</li>
              </ol>
              <div className="bg-muted p-4 rounded-lg flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-accent-foreground mt-1" />
                <div>
                  <h4 className="font-semibold text-accent-foreground">Pro Tip</h4>
                  <p className="text-sm text-accent-foreground/80">Be as specific as you can for the best results. For example, instead of "vegetables", try "tomatoes".</p>
                </div>
              </div>
            </div>

            <MissionForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
