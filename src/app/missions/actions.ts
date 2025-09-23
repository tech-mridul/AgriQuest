"use server";

import { generatePersonalizedMissions } from "@/ai/flows/generate-personalized-missions";
import { z } from "zod";

const MissionSchema = z.object({
  crop: z.string().min(1, { message: "Crop is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  farmSize: z.string().min(1, { message: "Farm size is required." }),
});

export async function generateMissionsAction(
  prevState: any,
  formData: FormData
) {
  const validatedFields = MissionSchema.safeParse({
    crop: formData.get("crop"),
    location: formData.get("location"),
    farmSize: formData.get("farmSize"),
  });

  if (!validatedFields.success) {
    return {
      missions: [],
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { crop, location, farmSize } = validatedFields.data;
    const result = await generatePersonalizedMissions({ crop, location, farmSize });
    
    if (result.missions && result.missions.length > 0) {
      return { missions: result.missions, error: null };
    } else {
      return { missions: [], error: "The AI could not generate missions for the given input. Please try different values." };
    }
  } catch (error) {
    console.error("Error generating missions:", error);
    return { missions: [], error: "An unexpected error occurred. Please try again later." };
  }
}
