import { Request, Response } from "express";
import {
  AlreadyExistsError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../core/ResponseErrors";
import { ExpressResponseAdapter } from "./ExpressResponseAdapter";
import { StatusCode } from "./StatusCodes";
import { ResponseData } from "./types";

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
        const errorMessage = `${e.errorName}: ${e.message}`;
        const responseData: ResponseData = {
          errors: [errorMessage],
          data: null,
          success: false,
        };

        const statusCode = e.statusCode.valueOf();

        const constExpresResponseAdapter = new ExpressResponseAdapter(res);
        constExpresResponseAdapter.sendResponse(statusCode, responseData);
        return;
      }

      const constExpresResponseAdapter = new ExpressResponseAdapter(res);
      constExpresResponseAdapter.sendResponse(StatusCode.INTERNAL_ERROR_500, {
        success: false,
        data: null,
        errors: ["internal server error"],
      });
      throw e;
    }
  }

  protected async doRender(req: Request, res: Response): Promise<void> {
    const message = req.body;
    const responseData = await this.control(message);

    //TODO: get response status code from controller?
    const constExpresResponseAdapter = new ExpressResponseAdapter(res);
    constExpresResponseAdapter.sendResponse(
      StatusCode.CREATED_201,
      responseData
    );
  }

  protected control(message): ResponseData {
    return this.controllerInstance.control(message);
  }

  private get controllerInstance() {
    return this._controllerInstance
      ? this._controllerInstance
      : new this.controllerClass();
  }
}
