import { NextRequest } from "next/server";
import { HTTPError } from "../../../error/http-error";

import { TokenHandleResult } from "../../types/auth-status";
import { verifyToken } from "../verify-token/verify-token";
import { StatusCodes } from "http-status-codes";
import { handleVerifyFail } from "../handle-verify-fail/handle-verify-fail";

export const handleToken = async (request: NextRequest) => {
  try {
    const res = await verifyToken();
    if (res.statusCode === StatusCodes.OK) {
      return TokenHandleResult.SUCCESS;
    }
  } catch (e) {
    console.error("verify failed");
    if (e instanceof HTTPError) {
      return handleVerifyFail(e);
    }
  }
  return TokenHandleResult.FAIL;
};
