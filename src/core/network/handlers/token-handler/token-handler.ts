import { HTTPError } from "../../../error/http-error";
import { END_POINT } from "../../end-point";

export class TokenHandler {
  constructor(private baseUrl: string) {}

  async refreshTokens() {
    const res = await fetch(`${this.baseUrl}${END_POINT.auth.refresh()}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new HTTPError("토큰 갱신에 실패했습니다.", res.status, res.headers);
    }
  }
}
