import { BodyHandler } from "../body-handler/body-handler";
import { FetchHandler } from "../fetch-handler/fetch-handler";
import { HeaderHandler } from "../header-handler/header-handler";
import { TokenHandler } from "../token-handler/token-handler";

export const baseURL = "http://localhost:4000/api/1";

export class APIHanlder {
  constructor(private fetchHandler: FetchHandler) {}

  public async get<T = any>(url: string, options?: RequestInit) {
    return await this.fetchHandler.handlefetch<T>(url, options);
  }

  public async post<BodyType = any>(
    url: string,
    body: BodyType,
    options?: Omit<RequestInit, "body">
  ) {
    return await this.fetchHandler.handlefetch<BodyType>(url, {
      method: "POST",
      ...options,
      body: BodyHandler.toBody(options?.headers, body),
    });
  }

  public async put<BodyType = any, ResponseType = any>(
    url: string,
    body: BodyType,
    options?: Omit<RequestInit, "body">
  ) {
    return await this.fetchHandler.handlefetch<ResponseType>(url, {
      method: "PUT",
      ...options,
      body: BodyHandler.toBody(options?.headers, body),
    });
  }

  public async delete<T = any>(url: string, options?: RequestInit) {
    return await this.fetchHandler.handlefetch<T>(url, {
      method: "DELETE",
      ...options,
    });
  }
}

const tokenHandler = new TokenHandler(baseURL);
const headerHandler = new HeaderHandler();
const fetchHandler = new FetchHandler(baseURL, tokenHandler, headerHandler);

export const apiHandler = new APIHanlder(fetchHandler);