'use server';
/**
 * @fileOverview A Genkit flow for generating a quiz from AI-generated topic notes.
 *
 * - generateQuizFromAITopicNotes - A function that handles the quiz generation process.
 * - GenerateQuizFromAITopicNotesInput - The input type for the generateQuizFromAITopicNotes function.
 * - GenerateQuizFromAITopicNotesOutput - The return type for the generateQuizFromAITopicNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizFromAITopicNotesInputSchema = z
  .string()
  .describe('The AI-generated study notes from which to create a quiz.');
export type GenerateQuizFromAITopicNotesInput = z.infer<
  typeof GenerateQuizFromAITopicNotesInputSchema
>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z
    .array(z.string())
    .describe('An array of possible answer options for multiple-choice questions.')
    .optional(),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  type: z
    .enum(['multiple-choice', 'short-answer'])
    .describe('The type of question.'),
});

const GenerateQuizFromAITopicNotesOutputSchema = z.object({
  quizTitle: z.string().describe('A title for the quiz.'),
  questions: z
    .array(QuizQuestionSchema)
    .describe('An array of quiz questions.'),
});
export type GenerateQuizFromAITopicNotesOutput = z.infer<
  typeof GenerateQuizFromAITopicNotesOutputSchema
>;

export async function generateQuizFromAITopicNotes(
  input: GenerateQuizFromAITopicNotesInput
): Promise<GenerateQuizFromAITopicNotesOutput> {
  return generateQuizFromAITopicNotesFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizFromAITopicNotesInputSchema},
  output: {schema: GenerateQuizFromAITopicNotesOutputSchema},
  prompt: `Act as a professional quiz generator. Your task is to create a quiz based on the provided study notes.
The quiz should help students test their understanding of the key concepts, definitions, and examples discussed in the notes.
Aim for a mix of multiple-choice and short-answer questions, if appropriate, but ensure each question has a single correct answer.
Generate at least 5 questions and include a quiz title.

Notes:
{{{input}}}

Your output MUST be a JSON object conforming to the following schema:
{{json_schema GenerateQuizFromAITopicNotesOutputSchema}}`,
});

const generateQuizFromAITopicNotesFlow = ai.defineFlow(
  {
    name: 'generateQuizFromAITopicNotesFlow',
    inputSchema: GenerateQuizFromAITopicNotesInputSchema,
    outputSchema: GenerateQuizFromAITopicNotesOutputSchema,
  },
  async (input) => {
    const {output} = await generateQuizPrompt(input);
    return output!;
  }
);
