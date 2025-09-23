"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateMissionsAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";


const initialState = {
  missions: [],
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full text-base py-6">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Missions
        </>
      )}
    </Button>
  );
}

export function MissionForm() {
  const [state, formAction] = useFormState(generateMissionsAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: Array.isArray(state.error) ? state.error.join(', ') : typeof state.error === 'object' ? JSON.stringify(state.error) : state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">Enter Farm Details</h2>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crop">Primary Crop</Label>
          <Input id="crop" name="crop" placeholder="e.g., Wheat, Corn, Soybeans" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g., Kansas, Iowa" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="farmSize">Farm Size</Label>
           <Select name="farmSize" required>
              <SelectTrigger id="farmSize">
                  <SelectValue placeholder="Select farm size" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="small">Small (1-50 acres)</SelectItem>
                  <SelectItem value="medium">Medium (51-500 acres)</SelectItem>
                  <SelectItem value="large">Large (501+ acres)</SelectItem>
              </SelectContent>
          </Select>
        </div>
        <SubmitButton />
      </form>

      {state.missions && state.missions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary"/> Generated Missions</h3>
          <ul className="space-y-3 list-disc list-inside bg-primary/10 p-4 rounded-md text-sm text-primary-foreground/90">
            {state.missions.map((mission, index) => (
              <li key={index} className="transition-transform transform hover:translate-x-1">{mission}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
