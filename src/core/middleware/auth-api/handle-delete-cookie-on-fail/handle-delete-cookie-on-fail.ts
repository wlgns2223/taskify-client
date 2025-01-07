import { NextRequest, NextResponse } from "next/server";
import { PATH } from "../../../types/path";

export const handleDeleteCookieOnFail = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL(PATH.signIn(), request.url));
  response.cookies.delete("refreshToken");
  response.cookies.delete("accessToken");
  return response;
};
