import { handleDeleteCookieOnFail } from "./core/middleware/auth-api/handle-delete-cookie-on-fail/handle-delete-cookie-on-fail";
import { handleRenewToken } from "./core/middleware/auth-api/handle-renew-token/handle-renew-token";
import { handleToken } from "./core/middleware/auth-api/handle-token/handle-token";

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(),
    redirect: jest.fn(),
  },
}));

jest.mock("./core/middleware/auth-api/handle-token/handle-token");
jest.mock(
  "./core/middleware/auth-api/handle-delete-cookie-on-fail/handle-delete-cookie-on-fail"
);
jest.mock("./core/middleware/auth-api/handle-renew-token/handle-renew-token");

describe("middleware test suites", () => {
  const handleTokenMock = jest.mocked(handleToken);
  const handleDeleteCookieOnFailMock = jest.mocked(handleDeleteCookieOnFail);
  const handleRenewTokenMock = jest.mocked(handleRenewToken);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shuold ", () => {});
});
