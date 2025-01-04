import { HTTPError } from "../../../error/http-error";

type NetworkError = {
  message?: string;
  path?: string;
};

export type ResponseType<T = any> = {
  data: T;
  headers: Headers;
  statusCode: number;
};

export class Responsehandler {
  static async handleResponse<T = any>(response: Response) {
    if (!response.ok) {
      const error = (await response.json()) as NetworkError;

      throw new HTTPError(error.message, response.status, response.headers);
    }

    const isJsonResponse = response.headers
      .get("Content-Type")
      ?.includes("application/json");

    const data = isJsonResponse ? await response.json() : await response.text();

    const returnValue: ResponseType<T> = {
      data,
      headers: response.headers,
      statusCode: response.status,
    };

    return returnValue;
  }
}
