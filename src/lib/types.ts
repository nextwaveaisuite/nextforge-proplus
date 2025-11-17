export function createBlueprintPrompt(input: any): string {
  return `
  You are NextForge Pro+.
  Turn this user request into a complete codebase:

  ${JSON.stringify(input, null, 2)}

  Output strictly in this JSON format:
  {
    "files": {
      "path/to/file": "content here"
    }
  }
  `;
}

// Turn AI response text → { files: {} }
export function parseAIResponseToFiles(raw: string) {
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}") + 1;

    const extracted = raw.substring(start, end);

    const json = JSON.parse(extracted);

    return json.files || {};
  } catch {
    return {};
  }
}
