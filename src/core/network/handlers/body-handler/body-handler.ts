export enum HeaderContentType {
  JSON = "application/json",
  FORM = "application/x-www-form-urlencoded",
  FORM_DATA = "multipart/form-data",
}

export class BodyHandler {
  static toBody(headers?: HeadersInit, body: any = {}) {
    if (Object.keys(body).length === 0) {
      return undefined;
    }
    const contentType = headers?.["Content-Type" as keyof HeadersInit] as
      | HeaderContentType
      | undefined;

    return this.transformBody(body, contentType);
  }

  static transformBody(
    body: any,
    contentType: HeaderContentType = HeaderContentType.JSON
  ): any {
    switch (contentType) {
      case HeaderContentType.JSON:
        return JSON.stringify(body);
      case HeaderContentType.FORM:
        const params = new URLSearchParams();
        for (const key in body) {
          params.append(key, body[key]);
        }
        return params.toString();
      case HeaderContentType.FORM_DATA:
        const formData = new FormData();
        for (const key in body) {
          if (Array.isArray(body[key])) {
            formData.append(key, JSON.stringify(body[key]));
          } else {
            formData.append(key, body[key]);
          }
        }

        return formData;
      default:
        throw new Error("Unsupported content type");
    }
  }
}
