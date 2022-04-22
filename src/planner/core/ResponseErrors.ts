import { StatusCode } from "../controllers/statusCodes";

export class ResponseError extends Error {
  public statusCode: StatusCode;
  public constructor(msg: string = "not found") {
    super(msg);
  }

  /**
   * gets Error class name: e.g. "ResponseError", "NotFoundError" ...
   */
  public get errorName(): string {
    return this.constructor.name;
  }
}

export class NotFoundError extends ResponseError {
  public constructor(msg: string = "not found") {
    super(msg);
    this.statusCode = StatusCode.NOT_FOUND;
  }
}

export class BadRequestError extends ResponseError {
  public constructor(msg: string = "bad request") {
    super(msg);
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}

export class AlreadyExistsError extends BadRequestError {
  public constructor(msg: string = "already exists") {
    super(msg);
  }
}
