import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateAllFormats(options: {
  description: string;
  includeBackend: boolean;
  includeFlutter: boolean;
}) {
  const { description, includeBackend, includeFlutter } = options;

  // 🔥 Step 1: Ask GPT to generate the master blueprint
  const blueprintPrompt = `
You are the engine behind NextForge Pro+. 
Generate a full SaaS blueprint with:

- features
- models
- pages
- API routes
- integrations
- data schema
- user roles

App Description: ${description}
`;

  const blueprintRes = await openai.responses.create({
    model: "gpt-4.1",
    input: blueprintPrompt,
  });

  const blueprintText = blueprintRes.output_text;
  const blueprint = JSON.parse(blueprintText);

  // 🔥 Step 2: Generate all formats
  const payload = {
    blueprint,
    formats: {
      nextjs: true,
      microapp: true,
      backend: includeBackend,
      flutter: includeFlutter,
    },
  };

  // 🔥 Step 3: Ask GPT to generate ZIP content
  const zipPrompt = `
Generate a ZIP file content structure as a JSON object.
Each field contains filename → full file content.

Blueprint:
${JSON.stringify(payload, null, 2)}
`;

  const zipRes = await openai.responses.create({
    model: "gpt-4.1",
    input: zipPrompt,
  });

  const zipJson = JSON.parse(zipRes.output_text);

  // The UI expects a URL — we return base64 for now
  return {
    blueprint,
    zipUrl: "data:application/zip;base64," + zipJson.base64,
  };
}
