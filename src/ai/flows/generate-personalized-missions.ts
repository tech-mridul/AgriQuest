'use server';

/**
 * @fileOverview A flow for generating personalized missions for farmers based on their crop, location, and farm size.
 *
 * - generatePersonalizedMissions - A function that generates personalized missions for farmers.
 * - GeneratePersonalizedMissionsInput - The input type for the generatePersonalizedMissions function.
 * - GeneratePersonalizedMissionsOutput - The return type for the generatePersonalizedMissions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedMissionsInputSchema = z.object({
  crop: z.string().describe('The type of crop the farmer is growing.'),
  location: z.string().describe('The location of the farm.'),
  farmSize: z.string().describe('The size of the farm (e.g., small, medium, large).'),
});
export type GeneratePersonalizedMissionsInput = z.infer<
  typeof GeneratePersonalizedMissionsInputSchema
>;

const GeneratePersonalizedMissionsOutputSchema = z.object({
  missions: z
    .array(z.string())
    .describe('A list of 3 to 5 personalized, actionable, and gamified mission titles for the farmer.'),
});
export type GeneratePersonalizedMissionsOutput = z.infer<
  typeof GeneratePersonalizedMissionsOutputSchema
>;

export async function generatePersonalizedMissions(
  input: GeneratePersonalizedMissionsInput
): Promise<GeneratePersonalizedMissionsOutput> {
  return generatePersonalizedMissionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedMissionsPrompt',
  input: {schema: GeneratePersonalizedMissionsInputSchema},
  output: {schema: GeneratePersonalizedMissionsOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized, gamified missions for farmers to adopt sustainable practices.

  Based on the farmer's crop, location, and farm size, suggest a list of 3 to 5 creative and actionable missions they can complete to improve their sustainability.
  Frame them as exciting "quests" or "missions" with clear, concise titles. Do not add descriptions, just the titles.

  For example: "Launch a Cover Crop Crusade on 15 Acres" or "Become a Water Wizard with Drip Irrigation".

  Crop: {{{crop}}}
  Location: {{{location}}}
  Farm Size: {{{farmSize}}}

Missions:
`,
});

const generatePersonalizedMissionsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedMissionsFlow',
    inputSchema: GeneratePersonalizedMissionsInputSchema,
    outputSchema: GeneratePersonalizedMissionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
