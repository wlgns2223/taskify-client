import { StatusCodes } from "http-status-codes";
import { ResponseType } from "../../../network/handlers/response-handler/response-handler";
import { verifyToken } from "./verify-token";
import { apiHandler } from "../../../network/handlers/fetch/fetch";
import { cookies } from "next/headers";
import { HTTPError } from "../../../error/http-error";
import { PATH } from "../../../types/path";

jest.mock("next/headers", () => {
  return {
    cookies: () => ({
      toString: () => "cookie=cookie",
    }),
  };
});

jest.mock("../../../network/handlers/fetch/fetch", () => {
  return {
    apiHandler: {
      post: jest.fn(),
    },
  };
});

describe("verify token middleware test suites", () => {
  const postMock = apiHandler.post as jest.Mock;
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shuold return a ResponseType response", async () => {
    const response: ResponseType = {
      data: {
        message: "Valid Token",
      },
      headers: new Headers(),
      statusCode: StatusCodes.OK,
    };
    postMock.mockResolvedValue(response);

    const actual = await verifyToken();
    expect(actual).toEqual(response);
  });

  it("should throw an error when the token is expired", async () => {
    const error = new HTTPError(
      "EXPIRED",
      StatusCodes.UNAUTHORIZED,
      new Headers()
    );
    postMock.mockRejectedValue(error);

    try {
      await verifyToken();
    } catch (e) {
      expect(e).toBeInstanceOf(HTTPError);
      expect(e).toEqual(error);
    }
  });

  it("shuold test if apiHandler.post is called with the correct arguments", async () => {
    const response: ResponseType = {
      data: {
        message: "Valid Token",
      },
      headers: new Headers(),
      statusCode: StatusCodes.OK,
    };
    postMock.mockResolvedValue(response);

    await verifyToken();

    expect(postMock).toHaveBeenCalledWith(
      PATH.verifyToken(),
      {},
      {
        credentials: "include",
        headers: {
          Cookie: "cookie=cookie",
        },
      }
    );
  });
});
