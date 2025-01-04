import { StatusCodes } from "http-status-codes";
import { ResponseType } from "../../../network/handlers/response-handler/response-handler";
import { verifyToken } from "./verify-token";
import { apiHandler } from "../../../network/handlers/fetch/fetch";
import { cookies } from "next/headers";

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

  it("debug cookie", () => {
    console.log(cookies().toString());
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
});
