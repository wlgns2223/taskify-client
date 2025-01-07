import { AuthTokenStatus, AuthTokenType } from "../../types/auth-status";
import { getTokenInfo } from "./get-token-info";

describe("getTokenInfo test suite", () => {
  it("should return null if no match", () => {
    const authHeader = "";

    const actual = getTokenInfo(authHeader, "realm");

    expect(actual).toBeNull();
  });

  it("should return ACCESS_TOKEN when AuthTokenType is requested", () => {
    const realms = Object.keys(AuthTokenType);
    const errors = Object.keys(AuthTokenStatus);

    for (const realm of realms) {
      for (const error of errors) {
        const authHeader = `Bear realm=${realm};error=${error}`;

        const realmActual = getTokenInfo(authHeader, "realm");
        const errorActual = getTokenInfo(authHeader, "error");

        expect(realmActual).toBe(realm);
        expect(errorActual).toBe(error);
      }
    }
  });
});
