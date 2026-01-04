import type { Client } from './client';
import type { ChatCreateParams, ChatResponse, APIResponse } from './types';
import { ValidationError } from './errors';

export class ChatService {
  constructor(
    private client: Client
  ) {}

  async create(params: ChatCreateParams): Promise<ChatResponse> {
    // Validation
    if (!params.modelType) {
      throw new ValidationError('modelType is required');
    }
    if (!params.messages || params.messages.length === 0) {
      throw new ValidationError('messages array cannot be empty');
    }

    const response = await this.client.request<APIResponse<ChatResponse>>(
      'POST',
      '/api/v1/chat/create-chat',
      params
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Chat completion failed');
    }

    return response.data;
  }
}