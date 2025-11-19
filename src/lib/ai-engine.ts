import { openai } from "./openai";

export async function generateBlueprint(userPrompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You generate JSON blueprints for software scaffolding."
        },
        {
          role: "user",
          content: userPrompt
        }
      ]
    });

    const raw = completion.choices[0].message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    return {
      success: true,
      blueprint: parsed
    };

  } catch (err) {
    console.error("AI ENGINE ERROR:", err);
    return {
      success: false,
      error: "Failed to generate blueprint."
    };
  }
}
