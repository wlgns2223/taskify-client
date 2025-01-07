import { cookies } from "next/headers";
import { apiHandler } from "../../../network/handlers/fetch/fetch";
import { PATH } from "../../../types/path";
import { TokenCookies } from "../../types/renew-auth-token";

export const fetchTokenCookie = async () => {
  const result = await apiHandler.get<TokenCookies>(PATH.renewToken(), {
    credentials: "include",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return result.data;
};
