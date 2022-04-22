import { Request, Response } from "express";
import {
  AlreadyExistsError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../core/ResponseErrors";
import { StatusCode } from "./statusCodes";
import { ControllerReturnMessage } from "./types";

export class View {
  protected controllerClass;
  private _controllerInstance;

  public async render(req: Request, res: Response): Promise<void> {
    try {
      await this.doRender(req, res);
    } catch (e) {
      // if (e instanceof ResponseError) { // TODO: Check how it's possible to do so
      if (
        e instanceof NotFoundError ||
        e instanceof BadRequestError ||
        e instanceof AlreadyExistsError ||
        e instanceof ForbiddenError
      ) {
        res.status(e.statusCode.valueOf()).send(`${e.errorName}: ${e.message}`);
        return;
      }
      res.status(StatusCode.INTERNAL_ERROR_500).send("internal server error");
      throw e;
    }
  }

  protected async doRender(req: Request, res: Response): Promise<void> {
    const message = req.body;
    const controllerResponseMessage = await this.control(message);
    res
      //TODO: get response status code from controller?
      .status(StatusCode.CREATED_201)
      .send({ success: true, data: controllerResponseMessage.data });
  }

  protected control(message): ControllerReturnMessage {
    return this.controllerInstance.control(message);
  }

  private get controllerInstance() {
    return this._controllerInstance
      ? this._controllerInstance
      : new this.controllerClass();
  }
}
