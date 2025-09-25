
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateMissionsAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MissionSchema = z.object({
  crop: z.string().min(2, { message: "Crop must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  farmSize: z.string({ required_error: "Please select a farm size." }),
});

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
  const [state, formAction] = useActionState(generateMissionsAction, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof MissionSchema>>({
    resolver: zodResolver(MissionSchema),
    defaultValues: {
      crop: "",
      location: "",
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: Array.isArray(state.error) ? state.error.join(', ') : typeof state.error === 'object' ? JSON.stringify(state.error) : state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">Enter Farm Details</h2>
       <FormProvider {...form}>
        <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Crop</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Wheat, Corn, Soybeans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kansas, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="farmSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Size</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 acres)</SelectItem>
                      <SelectItem value="medium">Medium (51-500 acres)</SelectItem>
                      <SelectItem value="large">Large (501+ acres)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <SubmitButton />
        </form>
      </FormProvider>

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
