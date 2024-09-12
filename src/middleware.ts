import { NextRequest, NextResponse } from "next/server";
import { handleToken } from "./core/middleware/handle-token";
import { TokenHandleResult } from "./core/middleware/types/auth-status";
import { handleFailedCookie } from "./core/middleware/auth-api/delete-cookie";
import { handleRenewToken } from "./core/middleware/auth-api/renew-token";
import { PATH } from "./core/path";

export const config = {
  matcher: ["/mydashboard"],
};

export async function middleware(request: NextRequest) {
  if (
    !request.cookies.has("accessToken") &&
    !request.cookies.has("refreshToken")
  ) {
    return NextResponse.redirect(new URL(PATH.signIn(), request.url));
  }

  try {
    const result = await handleToken(request);
    console.log("result", result);
    switch (result) {
      case TokenHandleResult.SUCCESS:
        return NextResponse.next();

      case TokenHandleResult.FAIL:
        const failedResponse = handleFailedCookie(request);
        return failedResponse;
      case TokenHandleResult.RENEW:
        const tokenRenewResponse = await handleRenewToken();
        return tokenRenewResponse;
      default:
        return NextResponse.next();
    }
  } catch (e) {
    console.error("error", e);
    const failedResponse = handleFailedCookie(request);
    return failedResponse;
  }
}
