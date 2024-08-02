export const enum TokenExceptionType {
  INVALID_TOKEN = "INVALID",
  UNDEFINED = "UNDEFINED",
  EXPIRED = "EXPIRED",
}

export class HTTPError extends Error {
  public statusCode: number;

  constructor(cause: TokenExceptionType | string, statusCode: number) {
    super(cause);
    this.statusCode = statusCode;
  }

  get message(): TokenExceptionType {
    return this.message as TokenExceptionType;
  }
}
