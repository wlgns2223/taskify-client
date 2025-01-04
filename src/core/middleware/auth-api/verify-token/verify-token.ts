import { cookies } from "next/headers";
import { apiHandler } from "../../../network/handlers/fetch/fetch";
import { PATH } from "../../../types/path";

/**
 *
 * @returns ( ACCESS TOKEN , Expired ) or ( ACCESS TOKEN , Invalid )
 */
export const verifyToken = async () => {
  const result = await apiHandler.post(
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
