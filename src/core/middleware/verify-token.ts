import { NextRequest } from "next/server";
import { apiHandler } from "../network/fetch";
import { cookies } from "next/headers";
import { HTTPError, TokenExceptionType } from "../error/http-error";

export const verifyToken = async (token: string) => {
  try {
    const result = await apiHandler.post(
      "/auth/verify",
      {},
      {
        credentials: "include",
        headers: {
          Cookie: cookies().toString(),
        },
      }
    );
    return result;
  } catch (e) {
    if (e instanceof HTTPError) {
      const statusCode = e.statusCode;
      const cause = e.message;
      const isExpired =
        statusCode === 401 && cause === TokenExceptionType.EXPIRED;
      if (isExpired) {
        await apiHandler.post(
          "/auth/refresh",
          {},
          {
            credentials: "include",
            headers: {
              Cookie: cookies().toString(),
            },
          }
        );
      }
    } else {
      throw e;
    }
  }
};

export const handleToken = async (request: NextRequest) => {
  // 1. 액세스 토큰 가져옴

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // 2. 액세스 토큰이 유효한지 확인
  const isValid = await verifyToken(accessToken?.value ?? "");

  // 3. 유효하면 진행
  // 4. 만료되었으면 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받음
  // 5. 리프레스 토큰도 유효하지 않으면 로그인 페이지로 이동
};
