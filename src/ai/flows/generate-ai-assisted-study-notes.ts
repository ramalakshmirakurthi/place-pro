'use server';
/**
 * @fileOverview A Genkit flow that generates structured, placement-focused study notes
 * based on a user-provided topic.
 *
 * - generateAIAssistedStudyNotes - A function that handles the notes generation process.
 * - GenerateAIAssistedStudyNotesInput - The input type for the generateAIAssistedStudyNotes function.
 * - GenerateAIAssistedStudyNotesOutput - The return type for the generateAIAssistedStudyNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAIAssistedStudyNotesInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate study notes.'),
});
export type GenerateAIAssistedStudyNotesInput = z.infer<
  typeof GenerateAIAssistedStudyNotesInputSchema
>;

const GenerateAIAssistedStudyNotesOutputSchema = z.object({
  title: z.string().describe('The title of the notes, based on the topic.'),
  definition: z.string().describe('A clear definition of the topic.'),
  keyConcepts: z.array(z.string()).describe('A list of key concepts related to the topic.'),
  importantFormulas: z
    .array(z.string())
    .optional()
    .describe('A list of important formulas if applicable, otherwise an empty array.'),
  example: z.string().describe('A practical example demonstrating the topic.'),
  codeSnippet: z
    .string()
    .optional()
    .describe(
      'A relevant code snippet if the topic is technical, explaining its purpose.'
    ),
  interviewQuestions: z
    .array(z.string())
    .describe('A list of common interview questions related to the topic.'),
  quickRevisionPoints: z
    .array(z.string())
    .describe('Concise points for quick revision.'),
});
export type GenerateAIAssistedStudyNotesOutput = z.infer<
  typeof GenerateAIAssistedStudyNotesOutputSchema
>;

export async function generateAIAssistedStudyNotes(
  input: GenerateAIAssistedStudyNotesInput
): Promise<GenerateAIAssistedStudyNotesOutput> {
  return generateAIAssistedStudyNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIAssistedStudyNotesPrompt',
  input: {schema: GenerateAIAssistedStudyNotesInputSchema},
  output: {schema: GenerateAIAssistedStudyNotesOutputSchema},
  prompt: `Act as a placement preparation tutor. Your goal is to generate structured, concise,
interview-focused study notes for the given topic. The notes should be easy to understand
and help a student quickly grasp the essential information for technical interviews and exams.

Generate the notes for the following topic:

Topic: {{{topic}}}

The notes must include the following sections, formatted as a JSON object as per the output schema:

1.  **Title**: A clear and concise title for the notes.
2.  **Definition**: A brief and precise definition of the topic.
3.  **Key Concepts**: A bulleted list of fundamental concepts associated with the topic.
4.  **Important Formulas** (if applicable): A bulleted list of any critical formulas or equations. If not applicable, provide an empty array.
5.  **Example**: A clear, illustrative example demonstrating the topic's application or principle.
6.  **Code Snippet** (if technical topic): A small, well-commented code snippet (if the topic is technical) that shows the concept in action. If not technical, this field can be omitted.
7.  **Interview Questions**: A bulleted list of common interview questions related to the topic.
8.  **Quick Revision Points**: A bulleted list of short, critical points for quick review before an interview or exam.

Ensure the content is accurate, concise, and highly relevant for placement preparation.
`,
});

const generateAIAssistedStudyNotesFlow = ai.defineFlow(
  {
    name: 'generateAIAssistedStudyNotesFlow',
    inputSchema: GenerateAIAssistedStudyNotesInputSchema,
    outputSchema: GenerateAIAssistedStudyNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
