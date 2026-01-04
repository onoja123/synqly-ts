// Named exports
export { Client } from './client';
export { ChatService } from './chat';
export { SynqlyError, APIError, ValidationError } from './errors';
export { default as Logger } from './logger';

// Type exports
export type {
  Message,
  ChatCreateParams,
  ChatResponse,
  Usage,
  Choice,
  APIResponse,
  ErrorResponse,
} from './types';

export type { ClientConfig } from './client';

// Default export
import { Client as ClientClass } from './client';
export default ClientClass;