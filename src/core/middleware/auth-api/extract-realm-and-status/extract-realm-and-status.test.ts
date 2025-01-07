import { getTokenInfo } from "../get-token-info/get-token-info";
import { extractRealmAndStatus } from "./extract-realm-and-status";

jest.mock("../get-token-info/get-token-info");

describe("extractRealmAndStatus test suite", () => {
  const headerKey = "www-authenticate";
  const getTokenInfoMock = jest.mocked(getTokenInfo);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if no match", () => {
    const headers = new Headers({
      [headerKey]: "",
    });

    getTokenInfoMock.mockReturnValue(null);

    const actual = extractRealmAndStatus(headers);

    expect(actual).toEqual({ realm: null, error: null });
  });

  it("should return ACCESS_TOKEN, UNDEFINED when header is set", () => {
    const headers = new Headers({
      [headerKey]: "Bearer realm=ACCESS_TOKEN;error=UNDEFINED",
    });

    getTokenInfoMock
      .mockReturnValueOnce("ACCESS_TOKEN")
      .mockReturnValueOnce("UNDENIED");

    const actual = extractRealmAndStatus(headers);

    expect(getTokenInfoMock).toHaveBeenCalledTimes(2);
    expect(actual).toEqual({
      realm: "ACCESS_TOKEN",
      error: "UNDENIED",
    });
  });
});
