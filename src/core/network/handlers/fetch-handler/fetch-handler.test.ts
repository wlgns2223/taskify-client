import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../../../error/http-error";
import { Responsehandler } from "../response-handler/response-handler";

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe("fetch handler test suites", () => {
  it("should throw an error when ok is false", async () => {
    const message = "error";
    const error: HTTPError = new HTTPError(
      message,
      StatusCodes.BAD_REQUEST,
      new Headers()
    );
    const response: Partial<Response> = {
      ok: false,
      json: jest.fn().mockResolvedValue(error),
      status: StatusCodes.BAD_REQUEST,
    };

    try {
      await Responsehandler.handleResponse(response as Response);
    } catch (e) {
      const error = e as HTTPError;
      expect(error).toBeInstanceOf(HTTPError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
    }
  });

  it("should return data, headers, statusCode when ok is true", async () => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const data = { data: "hello" };
    const resposne: Partial<Response> = {
      ok: true,
      headers,
      json: jest.fn().mockResolvedValue(data),
      status: StatusCodes.OK,
    };

    const actual = await Responsehandler.handleResponse(resposne as Response);

    expect(actual.data).toBe(data);
    expect(actual.headers).toBe(headers);
    expect(actual.statusCode).toBe(StatusCodes.OK);
  });
});
