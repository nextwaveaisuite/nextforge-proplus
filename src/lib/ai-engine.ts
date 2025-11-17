import OpenAI from "openai";
import { createBlueprintPrompt } from "./types";
import { parseAIResponseToFiles } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Main function your API route expects
export async function runBlueprint(input: any) {
  try {
    const prompt = createBlueprintPrompt(input);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are NextForge Pro+ AI Engine." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";

    const files = parseAIResponseToFiles(raw);

    return {
      success: true,
      files,
      message: "Blueprint generated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "AI Engine Error",
    };
  }
}
