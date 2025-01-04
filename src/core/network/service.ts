import { END_POINT } from "./end-point";
import { APIHanlder, apiHandler } from "./handlers/fetch/fetch";

export abstract class Service {
  protected apiHandler: APIHanlder;
  protected endPoints = END_POINT;
  constructor() {
    this.apiHandler = apiHandler;
  }
}
