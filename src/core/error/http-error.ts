export const enum TokenExceptionType {
  INVALID_TOKEN = "INVALID",
  UNDEFINED = "UNDEFINED",
  EXPIRED = "EXPIRED",
}

const defaultErrorMessage = "원인을 알 수 없는 에러입니다. (에러메세지 없음)";
export class HTTPError extends Error {
  private _statusCode: number;
  private _headers: unknown;

  constructor(
    cause: TokenExceptionType | string = defaultErrorMessage,
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
