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
    .describe('A list of personalized missions for the farmer.'),
});
export type GeneratePersonalizedMissionsOutput = z.infer<
  typeof GeneratePersonalizedMissionsOutputSchema
>;

export async function generatePersonalizedMissions(
  input: GeneratePersonalizedMissionsInput
): Promise<GeneratePersonalizedMissionsOutput> {
  return generatePersonalizedMissionsFlow(input);
}

const determineSustainablePractices = ai.defineTool({
  name: 'determineSustainablePractices',
  description: 'Determines appropriate sustainable practices for a given crop, location, and farm size.',
  inputSchema: z.object({
    crop: z.string().describe('The type of crop the farmer is growing.'),
    location: z.string().describe('The location of the farm.'),
    farmSize: z.string().describe('The size of the farm (e.g., small, medium, large).'),
  }),
  outputSchema: z.array(z.string()).describe('A list of sustainable practices.'),
}, async (input) => {
  // Placeholder implementation for determining sustainable practices.
  // In a real application, this would likely involve calling an external API
  // or querying a database of sustainable practices.
  // This dummy implementation just returns a few hardcoded suggestions.
  if (input.crop === 'wheat' && input.location === 'Kansas' && input.farmSize === 'large') {
    return [
      'Implement no-till farming practices to reduce soil erosion.',
      'Use cover crops to improve soil health and reduce weed pressure.',
      'Optimize irrigation to conserve water.',
    ];
  } else if (input.crop === 'corn' && input.location === 'Iowa' && input.farmSize === 'medium') {
    return [
      'Use precision planting techniques to optimize plant density.',
      'Apply nitrogen fertilizer based on soil testing to minimize nutrient runoff.',
      'Rotate crops to break pest cycles.',
    ];
  } else {
    return [
      'Consider implementing integrated pest management strategies.',
      'Explore options for reducing fertilizer use.',
      'Improve water management practices.',
    ];
  }
});

const prompt = ai.definePrompt({
  name: 'generatePersonalizedMissionsPrompt',
  input: {schema: GeneratePersonalizedMissionsInputSchema},
  output: {schema: GeneratePersonalizedMissionsOutputSchema},
  tools: [determineSustainablePractices],
  prompt: `You are an AI assistant designed to generate personalized missions for farmers to adopt sustainable practices.

  Based on the farmer's crop, location, and farm size, suggest missions they can complete to improve their sustainability.

  Use the determineSustainablePractices tool to identify appropriate sustainable practices for the farmer, then format those practices into a list of missions.

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
