export enum AuthTokenType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

export enum AuthTokenStatus {
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
  UNDEFINED = "UNDEFINED",
}

export enum TokenHandleResult {
  SUCCESS,
  RENEW,
  FAIL,
}
