import { HeaderHandler } from "./header-handler";

describe("header handler test suites", () => {
  let headerHandler: HeaderHandler;

  beforeEach(() => {
    headerHandler = new HeaderHandler();
  });

  it("should initiate header handler", () => {
    expect(headerHandler).toBeDefined();
  });

  it("should append header", () => {
    const firstHeeader: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const secondHeader: Record<string, string> = {
      Cookie: "accessToken=1234",
    };

    headerHandler.setHeader(firstHeeader);

    expect(headerHandler.getHeaders().get("Content-Type")).toBe(
      "application/json"
    );

    headerHandler.setHeader(secondHeader);

    expect(headerHandler.getHeaders().get("Cookie")).toBe("accessToken=1234");
  });
});
