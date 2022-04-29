import { Request, Response } from "express";
import { GetPlanController, GetPlanMessage } from "../../controllers/plan-controllers/GetPlanController";
import { ExpressResponseAdapter } from "../../core/ExpressResponseAdapter";
import { StatusCode } from "../../core/StatusCodes";
import { View } from "../../core/View";
import { Identifier } from "../../core/model/Identifier";

export class GetPlanView extends View {
  protected controllerClass = GetPlanController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    // Because here we need some things in params, we have to override the super class method
    // TODO: How can we add this logic to super class? maybe we can have multiple types of controller base classes
    const message: GetPlanMessage = {
      id: Identifier.fromString(req.params.planId),
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
