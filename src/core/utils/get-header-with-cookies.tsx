"use server";

import { cookies } from "next/headers";

export const getHeaderWithCookies = async () => {
  const allCookieArr = cookies().getAll();
  const allCookies = allCookieArr
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const headers = new Headers();
  headers.set("Cookie", allCookies);
  return headers;
};
