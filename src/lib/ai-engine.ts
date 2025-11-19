import { openai } from "./openai";
import { AIResult } from "./types";

export async function runBlueprint(prompt: string): Promise<AIResult> {
  try {
    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const raw = completion.output[0].content[0].text;
    const parsed = JSON.parse(raw);

    return {
      success: true,
      files: parsed.files || {},
      message: "OK",
    };
  } catch (err) {
    return {
      success: false,
      message: `AI engine error: ${err}`,
    };
  }
}
