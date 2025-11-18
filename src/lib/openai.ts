// src/lib/openai.ts

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Missing OPENAI_API_KEY. Add it in Vercel → Project → Settings → Environment Variables."
  );
}

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Default export (fixes the Vercel build error)
export default client;
