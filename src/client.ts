import axios, { AxiosInstance, AxiosError } from 'axios';
import { ChatService } from './chat';
import { APIError, SynqlyError } from './errors';

export interface ClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

export class Client {
  private axiosInstance: AxiosInstance;
  public chat: ChatService;


  constructor(config: ClientConfig) {
    if (!config.apiKey) {
      throw new SynqlyError('API key is required');
    }

    this.axiosInstance = axios.create({
      baseURL: config.baseURL || 'https://synqly.onrender.com',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        'x-synqly-key': config.apiKey,
      },
    });

    // Initialize services
    this.chat = new ChatService(this);

    // Setup interceptors
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const data = error.response.data as any;
          throw new APIError(
            data?.message || error.message,
            error.response.status,
            data
          );
        }

        // Network / CORS / timeout / DNS errors (no HTTP response)
        const anyErr = error as any;
        const code: string | undefined = anyErr?.code;
        const method: string | undefined = anyErr?.config?.method;
        const baseURL: string | undefined = anyErr?.config?.baseURL;
        const url: string | undefined = anyErr?.config?.url;
        const fullUrl = baseURL && url ? `${baseURL}${url}` : undefined;

        const details = [
          code ? `code=${code}` : undefined,
          method && (fullUrl || url) ? `${method.toUpperCase()} ${(fullUrl || url)}` : undefined,
        ]
          .filter(Boolean)
          .join(' ');

        const message = details ? `${error.message} (${details})` : error.message;
        throw new SynqlyError(message, undefined, error);
      }
    );
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: any
  ): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      method,
      url: path,
      data,
    });
    return response.data;
  }

  setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  setTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }

  /**
   * Internal axios instance (useful for advanced use cases and testing).
   */
  get http(): AxiosInstance {
    return this.axiosInstance;
  }
}
