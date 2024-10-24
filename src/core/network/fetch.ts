import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../error/http-error";

const baseURl = "http://localhost:4000/api/1";

type HeaderContentType =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";

type NetworkError = {
  message?: string;
  path?: string;
};

type ReturnType<T> = {
  data: T;
  headers: Headers;
  statusCode: number;
};

class APIHanlder {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async refreshTokens() {
    const res = await fetch(`${this.baseUrl}/auth/client-renew`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new HTTPError("토큰 갱신에 실패했습니다.", res.status, res.headers);
    }
  }

  private async apiHandler<T = any>(url: string, options?: RequestInit) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    const _options: RequestInit = {
      ...options,
      credentials: "include",
      headers,
    };

    let response = await fetch(`${this.baseUrl}${url}`, _options);

    if (response.status === StatusCodes.UNAUTHORIZED) {
      await this.refreshTokens();
      response = await fetch(`${this.baseUrl}${url}`, _options);
    }

    if (!response.ok) {
      const error = (await response.json()) as NetworkError;
      const defaultErrorMessage =
        "원인을 알 수 없는 에러입니다. (에러메세지 없음)";
      throw new HTTPError(
        error.message ?? defaultErrorMessage,
        response.status,
        response.headers
      );
    }

    const returnValue: ReturnType<T> = {
      data: await response.json(),
      headers: response.headers,
      statusCode: response.status,
    };

    return returnValue;
  }

  private toBody(
    contentType: HeaderContentType = "application/json",
    body: any = {}
  ) {
    if (!body) {
      return undefined;
    }

    return this.transformBody(body, contentType);
  }

  private transformBody(
    body: any,
    contentType: HeaderContentType = "application/json"
  ): any {
    switch (contentType) {
      case "application/json":
        return JSON.stringify(body);
      case "application/x-www-form-urlencoded":
        const params = new URLSearchParams();
        for (const key in body) {
          params.append(key, body[key]);
        }
        return params.toString();
      case "multipart/form-data":
        const formData = new FormData();
        for (const key in body) {
          formData.append(key, body[key]);
        }
        return formData;
      default:
        throw new Error("Unsupported content type");
    }
  }

  public async get<T = any>(url: string, options?: RequestInit) {
    return await this.apiHandler<T>(url, options);
  }

  public async post<BodyType = any, ResponseType = any>(
    url: string,
    body: BodyType,
    options?: Omit<RequestInit, "body">
  ) {
    const contentType = options?.headers?.[
      "Content-Type" as keyof HeadersInit
    ] as HeaderContentType | undefined;
    return await this.apiHandler<ResponseType>(url, {
      method: "POST",
      ...options,
      body: this.toBody(contentType, body),
    });
  }

  public async put<T = any>(url: string, options?: RequestInit) {
    return await this.apiHandler<T>(url, { method: "PUT", ...options });
  }

  public async delete<T = any>(url: string, options?: RequestInit) {
    return await this.apiHandler<T>(url, { method: "DELETE", ...options });
  }
}

export const apiHandler = new APIHanlder(baseURl);
