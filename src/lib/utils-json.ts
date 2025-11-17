// src/lib/utils-json.ts

/**
 * Extracts first valid JSON object from any messy AI text output.
 * Handles backticks, triple backticks, extra words, or mixed text.
 */
export function extractJsonObject(text: string): any | null {
  if (!text) return null;

  // Try to find a JSON block inside fenced code
  const fencedMatch = text.match(/```json([\s\S]*?)```/i);
  if (fencedMatch) {
    try {
      return JSON.parse(fencedMatch[1]);
    } catch {
      // ignore and fall through
    }
  }

  // Try to find the first { ... } JSON block
  const braceStart = text.indexOf("{");
  const braceEnd = text.lastIndexOf("}");

  if (braceStart !== -1 && braceEnd !== -1) {
    const jsonStr = text.substring(braceStart, braceEnd + 1);

    try {
      return JSON.parse(jsonStr);
    } catch {
      // ignore and fall through
    }
  }

  // If everything else fails
  return null;
}
