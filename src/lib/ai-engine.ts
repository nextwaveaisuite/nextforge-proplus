import { openai } from "@/lib/openai";
import { buildPrompt } from "@/lib/generator";

export async function generateBlueprint(prompt: string, formats: any) {
  return await buildPrompt(prompt, formats);
}
