import { cookies } from "next/headers";
import { apiHandler } from "../../network/fetch";
import { PATH } from "../../path";

/**
 *
 * @returns ( ACCESS TOKEN , Expired ) or ( ACCESS TOKEN , Invalid )
 */
export const verifyToken = async () => {
  const result = await apiHandler.post<any, { message: string }>(
    PATH.verifyToken(),
    {},
    {
      credentials: "include",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  return result;
};
