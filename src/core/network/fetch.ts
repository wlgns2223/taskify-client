const baseURl = "http://localhost:4000/api";

type HeaderContentType =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";

class APIHanlder {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async apiHandler<T = any>(url: string, options?: RequestInit) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
      body: options?.body
        ? this.transformBody(
            options.body,
            headers["Content-Type" as keyof HeadersInit] as HeaderContentType
          )
        : undefined,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json() as T;
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
  public async post<T = any>(url: string, options?: RequestInit) {
    return await this.apiHandler<T>(url, {
      method: "POST",
      ...options,
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
