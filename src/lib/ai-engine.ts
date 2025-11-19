import { client } from "./openai";

export async function generateBlueprint(userPrompt: string) {
  try {
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: [
        { role: "system", content: "Generate structured JSON only." },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = completion.output_text;

    if (!raw) {
      throw new Error("No AI output received");
    }

    const parsed = JSON.parse(raw);

    return {
      name: parsed.name,
      description: parsed.description,
      files: parsed.files,
    };
  } catch (err: any) {
    console.error("AI ENGINE ERROR:", err);
    throw new Error(err.message || "Blueprint generation failed");
  }
}
