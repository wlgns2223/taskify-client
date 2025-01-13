import { TokenHandler } from "../token-handler/token-handler";
import { StatusCodes } from "http-status-codes";
import { HeaderHandler } from "../header-handler/header-handler";
import { Responsehandler } from "../response-handler/response-handler";

export class FetchHandler {
  constructor(
    private baseUrl: string,
    private tokenhandler: TokenHandler,
    private headerHandler: HeaderHandler
  ) {}

  async handlefetch<T = any>(url: string, options?: RequestInit) {
    this.headerHandler.setHeader({ ...options?.headers });
    const _headers = await this.headerHandler.getHeaders();

    const _options: RequestInit = {
      ...options,
      credentials: "include",
      headers: _headers,
    };

    let response = await fetch(`${this.baseUrl}${url}`, _options);

    // access token 만료시 refresh token을 통해 재발급
    if (response.status === StatusCodes.UNAUTHORIZED) {
      await this.tokenhandler.refreshTokens();
      response = await fetch(`${this.baseUrl}${url}`, _options);
    }

    return Responsehandler.handleResponse<T>(response);
  }
}
