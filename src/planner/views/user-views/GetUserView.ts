import { Request, Response } from "express";
import {
  GetUserController,
  GetUserMessage,
} from "../../controllers/user-controllers/GetUserController";
import { ExpressResponseAdapter } from "../../core/ExpressResponseAdapter";
import { StatusCode } from "../../core/StatusCodes";
import { View } from "../../core/View";
import { Identifier } from "../../core/model/Identifier";

export class GetUserView extends View {
  protected controllerClass = GetUserController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    // Because here we need some things in params, we have to override the super class method
    // TODO: How can we add this logic to super class? maybe we can have multiple types of controller base classes
    const message: GetUserMessage = {
      id: Identifier.fromString(req.params.userId),
    };

    const { data } = await this.control(message);

    const constExpresResponseAdapter = new ExpressResponseAdapter(res);

    constExpresResponseAdapter.sendResponse(StatusCode.OK_200, {
      success: true,
      data,
      errors: [],
    });
  }
}
