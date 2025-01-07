import { AuthTokenStatus, AuthTokenType } from "../../types/auth-status";
import { getTokenInfo } from "../get-token-info/get-token-info";

export const extractRealmAndStatus = (header: Headers) => {
  const authHeader = header.get("www-authenticate")!;
  const realm = getTokenInfo<AuthTokenType>(authHeader, "realm");
  const error = getTokenInfo<AuthTokenStatus>(authHeader, "error");
  return {
    realm,
    error,
  };
};
