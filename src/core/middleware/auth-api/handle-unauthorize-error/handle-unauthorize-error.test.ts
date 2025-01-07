import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../../../error/http-error";
import { handleUnauthorizeError } from "./handle-unauthorize-error";
import {
  AuthTokenStatus,
  AuthTokenType,
  TokenHandleResult,
} from "../../types/auth-status";
import { extractRealmAndStatus } from "../extract-realm-and-status/extract-realm-and-status";
import { handleErrorByRealm } from "../handle-error-by-realm/handle-error-by-realm";

jest.mock("../handle-error-by-realm/handle-error-by-realm");

describe("handle-unauthorize-error test suites", () => {
  const handleErrorByRealmMock = jest.mocked(handleErrorByRealm);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shuold return TokenHandleResult.Fail when headers is not instance of Headers ", () => {
    const httpError = new HTTPError("", StatusCodes.UNAUTHORIZED, {});

    const actual = handleUnauthorizeError(httpError);

    expect(actual).toBe(TokenHandleResult.FAIL);
  });
  it("shuold return TokenhandleResult.Fail when headers does not have www-authenticate property ", () => {
    const httpError = new HTTPError(
      "",
      StatusCodes.UNAUTHORIZED,
      new Headers()
    );

    const actual = handleUnauthorizeError(httpError);

    expect(actual).toBe(TokenHandleResult.FAIL);
  });

  it("shuold return TokenHandleResult.RENEW when headers have www-authenticate property ", () => {
    const headers = new Headers();
    headers.set("www-authenticate", "Bearer realm=ACCESS_TOKEN,error=EXPIRED");
    const httpError = new HTTPError("", StatusCodes.UNAUTHORIZED, headers);
    handleErrorByRealmMock.mockReturnValue(TokenHandleResult.RENEW);

    const actual = handleUnauthorizeError(httpError);

    expect(actual).toBe(TokenHandleResult.RENEW);
  });
});
