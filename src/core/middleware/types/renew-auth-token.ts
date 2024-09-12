type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none"; // Adjust if other values are needed
  expires: string;
};

type TokenCookie = {
  tokenName: string;
  token: string;
  cookieOptions: CookieOptions;
};

export type TokenCookies = {
  accessTokenCookie: TokenCookie;
  refreshTokenCookie: TokenCookie;
};
