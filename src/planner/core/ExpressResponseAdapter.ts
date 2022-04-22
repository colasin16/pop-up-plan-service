import { Response } from "express";
import { StatusCode } from "./StatusCodes";
import { ResponseData } from "./types";

export class ExpressResponseAdapter {
  private response: Response;

  public constructor(response: Response) {
    this.response = response;
  }

  public sendResponse(statusCode: StatusCode, responseData: ResponseData) {
    this.response.status(statusCode).send(responseData);
  }
}
