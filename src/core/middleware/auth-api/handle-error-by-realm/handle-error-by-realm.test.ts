import {
  AuthTokenStatus,
  AuthTokenType,
  TokenHandleResult,
} from "../../types/auth-status";
import { extractRealmAndStatus } from "../extract-realm-and-status/extract-realm-and-status";
import { handleErrorByRealm } from "./handle-error-by-realm";

jest.mock("../extract-realm-and-status/extract-realm-and-status");

describe("handleErrorByRealm test suite", () => {
  const extractRealmAndStatusMock = jest.mocked(extractRealmAndStatus);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shuold return TokenHandleResult.Fail if realm and error are null", () => {
    const headers = new Headers();

    extractRealmAndStatusMock.mockReturnValue({
      realm: null,
      error: null,
    });

    const actual = handleErrorByRealm(headers);

    expect(actual).toBe(TokenHandleResult.FAIL);
  });

  it.each([
    [
      { realm: AuthTokenType.ACCESS_TOKEN, error: AuthTokenStatus.EXPIRED },
      TokenHandleResult.RENEW,
    ],
    [
      { realm: AuthTokenType.ACCESS_TOKEN, error: AuthTokenStatus.UNDEFINED },
      TokenHandleResult.RENEW,
    ],
    [
      { realm: "OTHER_TOKEN" as any, error: AuthTokenStatus.EXPIRED },
      TokenHandleResult.FAIL,
    ],
    [
      { realm: AuthTokenType.ACCESS_TOKEN, error: "OTHER_ERROR" as any },
      TokenHandleResult.FAIL,
    ],
  ])(
    "should return %s when extractRealmAndStatus returns %o",
    (mockReturnValue, expected) => {
      const headers = new Headers();

      // 모킹된 extractRealmAndStatus 함수의 반환값 설정
      extractRealmAndStatusMock.mockReturnValue(mockReturnValue);

      const actual = handleErrorByRealm(headers);

      expect(actual).toBe(expected);
      expect(extractRealmAndStatusMock).toHaveBeenCalledWith(headers);
    }
  );
});
