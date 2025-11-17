// src/lib/ai-engine.ts

import { openai } from "@/lib/openai";
import { GeneratorRequest, GeneratorResponse } from "./types";

export async function generateSaaS(req: GeneratorRequest): Promise<GeneratorResponse> {
  try {
    const prompt = `
You are NextForge Pro+ — the world's fastest SaaS generator.

Build the full output based on this request:
Idea: ${req.idea}
Description: ${req.description}
Framework: ${req.framework}
Features: ${req.features.join(", ")}
Output Mode: ${req.output}

Produce:
1. A clean folder structure
2. Actual source code for each file (no placeholders)
3. README.md with install/run instructions
4. Metadata for deployment
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You output ONLY valid JSON." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const data = JSON.parse(completion.choices?.[0]?.message?.content || "{}");

    return {
      success: true,
      ...data
    };

  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Generation error"
    };
  }
}
