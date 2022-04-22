import { Request, Response } from "express";
import {
  JoinPlanRequestController,
  JoinPlanRequestMessage,
} from "../../controllers/plan-controllers/JoinPlanRequestController";
import { ExpressResponseAdapter } from "../../core/ExpressResponseAdapter";
import { StatusCode } from "../../core/StatusCodes";
import { View } from "../../core/View";

export class JoinPlanRequestView extends View {
  protected controllerClass = JoinPlanRequestController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const planId = req.params.planId;

    const userId = req.body.userId;

    const message: JoinPlanRequestMessage = {
      planId,
      userId,
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
