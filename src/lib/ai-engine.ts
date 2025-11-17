import { openai } from "./openai";

export async function generateSaaS(input: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You generate SaaS source code files and folder structures."
        },
        {
          role: "user",
          content: JSON.stringify(input, null, 2)
        }
      ]
    });

    const responseText = completion.choices[0].message.content || "";

    let parsed = {};
    try {
      parsed = JSON.parse(responseText);
    } catch {
      parsed = { raw: responseText };
    }

    return {
      success: true,
      ...parsed
    };

  } catch (err: any) {
    return {
      success: false,
      message: err.message
    };
  }
}
