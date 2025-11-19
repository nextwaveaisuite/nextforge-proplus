import { client } from "./openai";

export async function generateBlueprint(userPrompt: string) {
  try {
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "system",
          content:
            "You generate structured JSON blueprints for building SaaS apps.",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    // The new OpenAI SDK returns output_text directly
    const raw = completion.output_text;

    if (!raw) {
      throw new Error("OpenAI returned no output_text.");
    }

    const parsed = JSON.parse(raw);

    return {
      name: parsed.name,
      description: parsed.description,
      files: parsed.files,
    };
  } catch (error: any) {
    console.error("AI Engine Error:", error);
    throw new Error(error.message || "AI generation failed.");
  }
}
