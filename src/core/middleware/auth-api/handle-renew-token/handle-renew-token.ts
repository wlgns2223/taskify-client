import { NextResponse } from "next/server";
import { fetchTokenCookie } from "../fetch-token-cookie/fetch-token-cookie";

export const handleRenewToken = async () => {
  console.log("handle Renew Token");
  const result = await fetchTokenCookie();
  const response = NextResponse.next();

  const accessTokenCookieOptions = {
    ...result.accessTokenCookie.cookieOptions,
    expires: new Date(result.accessTokenCookie.cookieOptions.expires),
  };

  const refreshTokenCookieOptions = {
    ...result.refreshTokenCookie.cookieOptions,
    expires: new Date(result.refreshTokenCookie.cookieOptions.expires),
  };

  response.cookies.set(
    result.accessTokenCookie.tokenName,
    result.accessTokenCookie.token,
    accessTokenCookieOptions
  );

  response.cookies.set(
    result.refreshTokenCookie.tokenName,
    result.refreshTokenCookie.token,
    refreshTokenCookieOptions
  );

  return response;
};
