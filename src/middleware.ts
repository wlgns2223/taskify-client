import { NextRequest, NextResponse } from "next/server";
import { PATH } from "./core/path";
import { handleToken } from "./core/middleware/verify-token";

export const config = {
  matcher: ["/mydashboard"],
};

export async function middleware(request: NextRequest) {
  if (
    !request.cookies.has("accessToken") ||
    !request.cookies.has("refreshToken")
  ) {
    return NextResponse.redirect(new URL(PATH.signIn(), request.url));
  }

  const result = await handleToken(request);
  if (result === false) {
    return NextResponse.redirect(new URL(PATH.signIn(), request.url));
  }

  return NextResponse.next();
}
