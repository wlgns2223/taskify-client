"use server";

import { NextRequest } from "next/server";
import { HTTPError } from "../error/http-error";
import { match } from "ts-pattern";
import {
  AuthTokenStatus,
  AuthTokenType,
  TokenHandleResult,
} from "./types/auth-status";
import { verifyToken } from "./auth-api/verify-token";
import { StatusCodes } from "http-status-codes";

export const handleToken = async (request: NextRequest) => {
  try {
    const res = await verifyToken();
    if (res.statusCode === StatusCodes.OK) {
      return TokenHandleResult.SUCCESS;
    }
  } catch (e) {
    console.error("verify failed");
    return match(e)
      .when((e): e is HTTPError => e instanceof HTTPError, handleVerifyFail)
      .otherwise((e) => {
        console.error("default error");
        return TokenHandleResult.FAIL;
      });
  }
  return TokenHandleResult.FAIL;
};

const handleVerifyFail = (httpError: HTTPError) => {
  console.error("handle verify failed");
  return match(httpError.statusCode)
    .with(StatusCodes.UNAUTHORIZED, () => handleUnauthorizeError(httpError))
    .otherwise(() => {
      console.error("다른 에러");
      return TokenHandleResult.FAIL;
    });
};

const handleUnauthorizeError = (httpError: HTTPError) => {
  console.log("handle unauthorize error");
  return match(httpError.headers)
    .when(
      (headers) =>
        headers instanceof Headers && headers.has("www-authenticate"),
      handleErrorByRealm
    )
    .otherwise(() => TokenHandleResult.FAIL);
};

const handleErrorByRealm = (headers: Headers) => {
  const { realm, error } = extractRealmAndStatus(headers);

  console.log("realm", realm, error);

  return match([realm, error])
    .with(
      [AuthTokenType.ACCESS_TOKEN, AuthTokenStatus.EXPIRED],
      () => TokenHandleResult.RENEW
    )
    .with(
      [AuthTokenType.ACCESS_TOKEN, AuthTokenStatus.UNDEFINED],
      () => TokenHandleResult.RENEW
    )
    .otherwise(() => TokenHandleResult.FAIL);
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
