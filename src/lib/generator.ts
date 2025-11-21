// src/lib/generator.ts

import { openai } from "@/lib/openai";

export async function buildPrompt(prompt: string, formats: any) {
  const system = `
You are NextForge Pro+, an ultra-structured SaaS blueprint generator.
You output JSON only.
`;

  const user = `
Build a full structured blueprint for this app:

"${prompt}"

Formats requested: ${JSON.stringify(formats, null, 2)}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content);
}
