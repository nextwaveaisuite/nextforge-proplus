// src/lib/ai-engine.ts

import OpenAI from "openai";
import { AIResult } from "./types";
import { extractJsonObject } from "./utils-json";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function runBlueprint(body: any): Promise<AIResult> {
  try {
    if (!body || !body.prompt) {
      return {
        success: false,
        message: "Missing prompt",
      };
    }

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
       You are a SaaS builder engine.
       Return ONLY valid JSON:
       {
         "message": "...",
         "files": {
           "path/to/file": "content"
         }
       }

       USER INPUT:
       ${body.prompt}
      `,
    });

    const text = completion.output_text;

    const parsed = extractJsonObject(text);

    if (!parsed || !parsed.files) {
      return {
        success: false,
        message: "Could not parse AI response",
      };
    }

    return {
      success: true,
      message: parsed.message || "OK",
      files: parsed.files,
    };

  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Unexpected error",
    };
  }
}
