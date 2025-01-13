import { HeaderHandler } from "./header-handler";

describe("header handler test suites", () => {
  let headerHandler: HeaderHandler;

  beforeEach(() => {
    headerHandler = new HeaderHandler();
  });

  it("should initiate header handler", () => {
    expect(headerHandler).toBeDefined();
  });

  it("should append header", async () => {
    const firstHeeader: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const secondHeader: Record<string, string> = {
      Cookie: "accessToken=1234",
    };

    headerHandler.setHeader(firstHeeader);
    const header = await headerHandler.getHeaders();

    expect(header.get("Content-Type")).toBe("application/json");

    headerHandler.setHeader(secondHeader);

    expect(header.get("Cookie")).toBe("accessToken=1234");
  });
});
