export interface AIResultSuccess {
  success: true;
  files: Record<string, string>;
  message: string;
}

export interface AIResultError {
  success: false;
  message: string;
}

export type AIResult = AIResultSuccess | AIResultError;
