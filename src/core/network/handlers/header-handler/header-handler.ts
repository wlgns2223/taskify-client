import { isServer } from "@tanstack/react-query";
import { HeaderContentType } from "../body-handler/body-handler";

export class HeaderHandler {
  private headers: Headers;
  private isServerSide: boolean;
  constructor() {
    this.headers = new Headers();
    this.isServerSide = isServer;
  }

  private async setServerSideCookie() {
    if (this.isServerSide) {
      await import("next/headers").then(({ cookies }) => {
        const _cookies = cookies().getAll();
        const cookieArr = _cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");
        this.headers.set("Cookie", cookieArr);
      });
    }
  }

  setHeader(headers: HeadersInit) {
    Object.entries(headers).forEach(([key, value]) => {
      this.headers.set(key, value);
    });
    if (
      this.headers.has("Content-Type") &&
      this.headers.get("Content-Type") === HeaderContentType.FORM_DATA
    ) {
      this.headers.delete("Content-Type");
    } else {
      this.headers.set("Content-Type", HeaderContentType.JSON);
    }
  }

  async getHeaders() {
    await this.setServerSideCookie();
    return this.headers;
  }
}
