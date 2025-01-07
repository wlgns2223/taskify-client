import { NextRequest, NextResponse } from "next/server";
import { handleDeleteCookieOnFail } from "./handle-delete-cookie-on-fail";
import { PATH } from "../../../types/path";

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn().mockReturnValue({
      cookies: {
        delete: jest.fn(),
      },
    }),
  },
}));

describe("handle-delete-cookie-on-fail test suites", () => {
  const NextResponseMock = jest.mocked(NextResponse);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete cookies and return response", () => {
    const request = {
      url: new URL("https://example.com"),
    };

    const response = handleDeleteCookieOnFail(request as any);

    expect(NextResponseMock.redirect).toHaveBeenCalledWith(
      new URL(PATH.signIn(), request.url)
    );
    expect(response.cookies.delete).toHaveBeenCalledTimes(2);
    expect(response.cookies.delete).toHaveBeenCalledWith("refreshToken");
    expect(response.cookies.delete).toHaveBeenCalledWith("accessToken");
  });
});
