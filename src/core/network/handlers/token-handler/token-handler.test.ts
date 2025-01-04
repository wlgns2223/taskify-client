import { StatusCodes } from "http-status-codes";
import { baseURL } from "../fetch/fetch";
import { HTTPError } from "../../../error/http-error";
import { TokenHandler } from "./token-handler";

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe("handle token test suites", () => {
  let tokenHandler: TokenHandler;
  beforeEach(() => {
    tokenHandler = new TokenHandler(baseURL);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should instantiate tokenHandler", () => {
    expect(tokenHandler).toBeInstanceOf(TokenHandler);
    expect(tokenHandler).not.toBeNull();
  });

  it("should return undefined when ", async () => {
    const response: Partial<Response> = { ok: true };
    fetchMock.mockResolvedValue(response);

    await expect(tokenHandler.refreshTokens()).resolves.toBeUndefined();
  });

  it("shuold throw HTTP Error when response is not ok", async () => {
    const response: Partial<Response> = {
      ok: false,
      status: StatusCodes.UNAUTHORIZED,
      headers: new Headers(),
    };
    fetchMock.mockResolvedValue(response);

    try {
      await tokenHandler.refreshTokens();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(HTTPError);
      expect(error as HTTPError).toHaveProperty(
        "message",
        "토큰 갱신에 실패했습니다."
      );
      expect(error as HTTPError).toHaveProperty(
        "statusCode",
        StatusCodes.UNAUTHORIZED
      );
      expect(error as HTTPError).toHaveProperty("headers", response.headers);
    }
  });
});
