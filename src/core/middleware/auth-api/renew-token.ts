import { cookies } from "next/headers";
import { apiHandler } from "../../network/handlers/fetch/fetch";
import { PATH } from "../../types/path";
import { NextResponse } from "next/server";
import { TokenCookies } from "../types/renew-auth-token";

export const fetchTokenCookie = async () => {
  const result = await apiHandler.get<TokenCookies>(PATH.renewToken(), {
    credentials: "include",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return result.data;
};

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
