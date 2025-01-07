import { NextResponse } from "next/server";
import { TokenCookies } from "../../types/renew-auth-token";
import { fetchTokenCookie } from "../fetch-token-cookie/fetch-token-cookie";
import { handleRenewToken } from "./handle-renew-token";

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({
      cookies: {
        set: jest.fn(),
      },
    })),
  },
}));

jest.mock("../fetch-token-cookie/fetch-token-cookie");

const fakeCookies: TokenCookies = {
  accessTokenCookie: {
    cookieOptions: {
      expires: "2022-01-01",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
    tokenName: "accessToken",
    token: "fakeAccessToken",
  },
  refreshTokenCookie: {
    cookieOptions: {
      expires: "2022-01-01",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
    tokenName: "refreshToken",
    token: "fakeRefreshToken",
  },
};

describe("handleRenewToken test suite", () => {
  const fetchTokenCookieMock = jest.mocked(fetchTokenCookie);
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call set Cookie with fetched cookie options", async () => {
    fetchTokenCookieMock.mockResolvedValue(fakeCookies);

    const accessTokenCookieOptions = {
      ...fakeCookies.accessTokenCookie.cookieOptions,
      expires: new Date(fakeCookies.accessTokenCookie.cookieOptions.expires),
    };

    const refreshTokenCookieOptions = {
      ...fakeCookies.refreshTokenCookie.cookieOptions,
      expires: new Date(fakeCookies.refreshTokenCookie.cookieOptions.expires),
    };

    const response = await handleRenewToken();

    expect(response.cookies.set).toHaveBeenCalledTimes(2);
    expect(response.cookies.set).toHaveBeenCalledWith(
      fakeCookies.accessTokenCookie.tokenName,
      fakeCookies.accessTokenCookie.token,
      accessTokenCookieOptions
    );
    expect(response.cookies.set).toHaveBeenCalledWith(
      fakeCookies.refreshTokenCookie.tokenName,
      fakeCookies.refreshTokenCookie.token,
      refreshTokenCookieOptions
    );
  });
});
