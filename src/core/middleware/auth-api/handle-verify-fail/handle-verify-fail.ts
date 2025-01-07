import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../../../error/http-error";
import { TokenHandleResult } from "../../types/auth-status";
import { handleUnauthorizeError } from "../handle-unauthorize-error/handle-unauthorize-error";

export const handleVerifyFail = (httpError: HTTPError) => {
  console.error("handle verify failed");
  if (httpError.statusCode === StatusCodes.UNAUTHORIZED) {
    return handleUnauthorizeError(httpError);
  }
  return TokenHandleResult.FAIL;
};
