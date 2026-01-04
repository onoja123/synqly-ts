export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCreateParams {
  provider: string;
  modelType: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  fallback?: boolean;
  stream?: boolean;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

export interface ChatResponse {
  id: string;
  provider: string;
  modelType?: string;
  model?: string;
  messages?: Message[];
  choices?: Choice[];
  content?: string;
  usage: Usage;
  finish_reason?: string;
  cached: boolean;
  cache_hit: boolean;
  created?: string;
  created_at?: string;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}
