import { BodyHandler, HeaderContentType } from "./body-handler";

describe("body-handler test suites", () => {
  describe("transformBody test suites", () => {
    it("should throw an error when unsupported content type", () => {
      const unsupportedContentType =
        "unsupported content type" as HeaderContentType;

      expect(() =>
        BodyHandler.transformBody({}, unsupportedContentType)
      ).toThrow(new Error("Unsupported content type"));
    });
  });

  it("should return JSON stringified body when content type is JSON", () => {
    const body = { key: "value" };

    const actual = BodyHandler.transformBody(body, HeaderContentType.JSON);

    expect(actual).toBe(JSON.stringify(body));
  });

  it("should return URLSearchParams stringified body when content type is FORM", () => {
    const body = { foo: "bar", hello: "world" };

    const actual = BodyHandler.transformBody(body, HeaderContentType.FORM);

    expect(actual).toBe("foo=bar&hello=world");
  });

  it("should return FormData body when content type is FORM_DATA", () => {
    const body = { foo: "bar", hello: "world" };

    const actual = BodyHandler.transformBody(body, HeaderContentType.FORM_DATA);

    expect(actual).toBeInstanceOf(FormData);
    expect(actual.get("foo")).toBe("bar");
    expect(actual.get("hello")).toBe("world");
  });

  describe("toBody test suites", () => {
    it("should return undefined when body is empty", () => {
      const actual = BodyHandler.toBody();
      expect(actual).toBeUndefined();
    });
  });
});
