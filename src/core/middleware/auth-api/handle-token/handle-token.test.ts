import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../verify-token/verify-token";
import { AuthTokenStatus, TokenHandleResult } from "../../types/auth-status";
import { HTTPError } from "../../../error/http-error";
import { handleToken } from "./handle-token";
import * as ModuleUnderTest from "../handle-verify-fail/handle-verify-fail";

jest.mock("../verify-token/verify-token", () => ({
  verifyToken: jest.fn(),
}));

jest.mock("../handle-verify-fail/handle-verify-fail", () => ({
  handleVerifyFail: jest.fn(),
}));

describe("handle token middleware test suites", () => {
  const verifyTokenMock = jest.mocked(verifyToken);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shuold return a TokenHandleResult response", async () => {
    verifyTokenMock.mockResolvedValue({
      statusCode: StatusCodes.OK,
      data: {},
      headers: new Headers(),
    });
    const actual = await handleToken({} as any);

    expect(actual).toBe(TokenHandleResult.SUCCESS);
  });

  it("shuold call handleVerifyFail when verifyToken throws an HTTPError", async () => {
    const httpError = new HTTPError(
      AuthTokenStatus.EXPIRED,
      StatusCodes.UNAUTHORIZED,
      new Headers()
    );
    verifyTokenMock.mockRejectedValue(httpError);

    const handleVerifyFailSpy = jest.spyOn(ModuleUnderTest, "handleVerifyFail");

    await handleToken({} as any);

    expect(handleVerifyFailSpy).toHaveBeenCalledTimes(1);
  });
});
