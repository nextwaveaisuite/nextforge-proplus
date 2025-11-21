// lib/ai-engine.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateBlueprint(prompt: string) {
  if (!prompt) {
    throw new Error("Prompt missing");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional SaaS architect. Output JSON only.",
      },
      {
        role: "user",
        content: `Generate a structured SaaS blueprint for: ${prompt}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const data = response.choices[0].message.content;

  try {
    return JSON.parse(data!);
  } catch (err) {
    console.error("Blueprint parse error:", err);
    throw new Error("Blueprint creation failed");
  }
}
