import { match } from "ts-pattern";
import {
  AuthTokenStatus,
  AuthTokenType,
  TokenHandleResult,
} from "../../types/auth-status";
import { extractRealmAndStatus } from "../extract-realm-and-status/extract-realm-and-status";

export const handleErrorByRealm = (headers: Headers) => {
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
