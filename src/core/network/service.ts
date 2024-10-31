import { END_POINT } from "./end-point";
import { APIHanlder } from "./fetch";

export abstract class Service {
  protected apiHandler: APIHanlder;
  protected endPoints = END_POINT;
  private baseUrl: string = "http://localhost:4000/api/1";
  constructor() {
    this.apiHandler = new APIHanlder(this.baseUrl);
  }
}
