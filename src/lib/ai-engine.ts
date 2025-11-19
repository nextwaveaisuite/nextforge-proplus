import { openai } from "./openai";

export async function generateBlueprint(userPrompt: string) {
  try {
    const completion = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "user",
          content: `Generate a JSON blueprint for a SaaS app based on this user request:\n\n${userPrompt}\n\nYour output MUST be strictly JSON.`
        }
      ]
    });

    const first = completion.output?.[0];

    if (!first) throw new Error("Empty OpenAI response.");

    let textContent = "";

    // Safely extract:
    // - direct text
    // - content array
    // - tool call
    if ("content" in first) {
      const c = (first as any).content?.[0]?.text;
      if (c) textContent = c;
    }
    if (!textContent && "text" in first) {
      textContent = (first as any).text ?? "";
    }

    if (!textContent) {
      throw new Error("No text content found in OpenAI output.");
    }

    const parsed = JSON.parse(textContent);

    return parsed;
  } catch (err: any) {
    console.error("AI ENGINE ERROR:", err);
    throw new Error(err.message ?? "AI engine failed.");
  }
}
