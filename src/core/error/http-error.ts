export const enum TokenExceptionType {
  INVALID_TOKEN = "INVALID",
  UNDEFINED = "UNDEFINED",
  EXPIRED = "EXPIRED",
}

export class HTTPError extends Error {
  private _statusCode: number;
  private _headers: unknown;

  constructor(
    cause: TokenExceptionType | string,
    statusCode: number,
    headers: unknown
  ) {
    super(cause);
    this._statusCode = statusCode;
    this._headers = headers;
  }

  get message(): TokenExceptionType {
    return this.message as TokenExceptionType;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get headers(): unknown {
    return this._headers;
  }
}
