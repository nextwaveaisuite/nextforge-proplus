// src/lib/types.ts

export interface AIResultSuccess {
  success: true;
  message: string;
  files: Record<string, string>;
}

export interface AIResultError {
  success: false;
  message: string;
}

export type AIResult = AIResultSuccess | AIResultError;
