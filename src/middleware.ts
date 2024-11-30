import { NextRequest, NextResponse } from "next/server";
import { handleToken } from "./core/middleware/handle-token";
import { TokenHandleResult } from "./core/middleware/types/auth-status";
import { handleFailedCookie } from "./core/middleware/auth-api/delete-cookie";
import { handleRenewToken } from "./core/middleware/auth-api/renew-token";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|signin|signup).*)",
  ],
};

export const NEXT_FULL_URL_HEADER = "x-next-full-url";

export async function middleware(request: NextRequest) {
  // if (
  //   !request.cookies.has("accessToken") &&
  //   !request.cookies.has("refreshToken")
  // ) {
  //   return NextResponse.redirect(new URL(PATH.signIn(), request.url));
  // }

  const response = NextResponse.next();
  response.headers.set(NEXT_FULL_URL_HEADER, request.nextUrl.href);

  try {
    const result = await handleToken(request);
    switch (result) {
      case TokenHandleResult.SUCCESS:
        return response;

      case TokenHandleResult.FAIL:
        const failedResponse = handleFailedCookie(request);
        return failedResponse;
      case TokenHandleResult.RENEW:
        const tokenRenewResponse = await handleRenewToken();
        return tokenRenewResponse;
      default:
        return response;
    }
  } catch (e) {
    console.error("error", e);
    const failedResponse = handleFailedCookie(request);
    return failedResponse;
  }
}
