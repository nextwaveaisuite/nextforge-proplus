// src/lib/types.ts

export interface GeneratorRequest {
  idea: string;
  description: string;
  features: string[];
  framework: "nextjs" | "react" | "html" | "node";
  output: "source" | "instructions" | "both";
}

export interface GeneratorResponse {
  success: boolean;
  message?: string;
  files?: Record<string, string>;
  readme?: string;
  instructions?: string;
}
