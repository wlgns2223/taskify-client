"use server";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from "../network/fetch";
import { cookies, headers } from "next/headers";
import { HTTPError, TokenExceptionType } from "../error/http-error";
import { match } from "ts-pattern";
import { AuthTokenStatus, AuthTokenType } from "./types/auth-status";

/**
 *
 * @returns ( ACCESS TOKEN , Expired ) or ( ACCESS TOKEN , Invalid )
 */
const verifyToken = async () => {
  const result = await apiHandler.post<any, { message: string }>(
    "/auth/verify",
    {},
    {
      credentials: "include",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return result;
};

export const enum HttpStatusCode {
  OK = 200,
  UNAUTHORIZED = 401,
}

export const handleToken = async (request: NextRequest) => {
  try {
    const res = await verifyToken();
    if (res.statusCode === HttpStatusCode.OK) {
      return true;
    }
  } catch (e) {
    return match(e)
      .when((e): e is HTTPError => e instanceof HTTPError, handleVerifyFail)
      .otherwise((e) => {
        console.error("default error");
        console.error(e);
        return false;
      });
  }
  return false;
};

const handleVerifyFail = (httpError: HTTPError) => {
  return match(httpError.statusCode)
    .with(HttpStatusCode.UNAUTHORIZED, () => handleUnauthorizeError(httpError))
    .otherwise(() => {
      console.error("다른 에러");
      return false;
    });
};

const handleUnauthorizeError = (httpError: HTTPError) => {
  return match(httpError.headers)
    .when(
      (headers) =>
        headers instanceof Headers && headers.has("www-authenticate"),
      handleErrorByRealm
    )
    .otherwise(() => false);
};

const handleErrorByRealm = (headers: Headers) => {
  const { realm, error } = extractRealmAndStatus(headers);
  console.log({ realm, error });
  return match([realm, error])
    .with(
      [AuthTokenType.ACCESS_TOKEN, AuthTokenStatus.EXPIRED],
      handleRenewToken
    )
    .otherwise(() => {
      console.log("모든 쿠키 삭제");
      return false;
    });
};

const handleRenewToken = async () => {
  try {
    console.log("access token 재발급");
    return true;
  } catch (e) {
    console.log("모든 쿠키 삭제");
    return false;
  }
};
const extractRealmAndStatus = (header: Headers) => {
  const authHeader = header.get("www-authenticate")!;
  const realm = getTokenInfo<AuthTokenType>(authHeader, "realm");
  const error = getTokenInfo<AuthTokenStatus>(authHeader, "error");
  return {
    realm,
    error,
  };
};
const getTokenInfo = <T>(authHeader: string, type: string) => {
  const regex = new RegExp(`${type}=([^,]+)`);
  const matched = authHeader.match(regex);
  if (!matched) {
    return null;
  }
  return matched[1] as unknown as T;
};
