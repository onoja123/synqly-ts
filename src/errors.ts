export class SynqlyError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'SynqlyError';
    Object.setPrototypeOf(this, SynqlyError.prototype);
  }
}

export class APIError extends SynqlyError {
  constructor(message: string, statusCode: number, public responseBody?: unknown) {
    super(message, statusCode);
    this.name = 'APIError';
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class ValidationError extends SynqlyError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}