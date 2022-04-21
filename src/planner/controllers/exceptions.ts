export class NotFoundError extends Error {
  public constructor(msg: string = "not found") {
    super(msg);
  }
}
