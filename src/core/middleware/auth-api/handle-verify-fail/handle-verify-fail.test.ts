import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../../../error/http-error";
import { handleVerifyFail } from "./handle-verify-fail";
import { TokenHandleResult } from "../../types/auth-status";
import { handleUnauthorizeError } from "../handle-unauthorize-error/handle-unauthorize-error";

jest.mock("../handle-unauthorize-error/handle-unauthorize-error");

describe("handle-verify-fail test suites", () => {
  const handleUnauthorizeErrorMock = jest.mocked(handleUnauthorizeError);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return TokenHandleResult.FAIL when httpError.statusCode is not StatusCodes.UNAUTHORIZED", () => {
    const httpError = new HTTPError("", StatusCodes.ACCEPTED, {});

    const actual = handleVerifyFail(httpError);

    expect(actual).toBe(TokenHandleResult.FAIL);
  });

  it.each([[TokenHandleResult.RENEW], [TokenHandleResult.FAIL]])(
    "shuold return handleUnauthorizeError result when httpError.statusCode is StatusCodes.UNAUTHORIZED",
    (result) => {
      const httpError = new HTTPError("", StatusCodes.UNAUTHORIZED, {});
      handleUnauthorizeErrorMock.mockReturnValue(result);

      const actual = handleVerifyFail(httpError);

      expect(actual).toBe(result);
    }
  );
});
