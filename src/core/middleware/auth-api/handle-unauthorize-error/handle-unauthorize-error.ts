import { HTTPError } from "../../../error/http-error";
import { TokenHandleResult } from "../../types/auth-status";
import { handleErrorByRealm } from "../handle-error-by-realm/handle-error-by-realm";

export const handleUnauthorizeError = (httpError: HTTPError) => {
  console.error("handle unauthorize error");
  if (
    httpError.headers instanceof Headers &&
    httpError.headers.has("www-authenticate")
  ) {
    return handleErrorByRealm(httpError.headers);
  }

  return TokenHandleResult.FAIL;
};
