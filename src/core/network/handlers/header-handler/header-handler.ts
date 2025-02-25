import { isServer } from "@tanstack/react-query";

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
  }

  async getHeaders() {
    await this.setServerSideCookie();
    return this.headers;
  }
}
