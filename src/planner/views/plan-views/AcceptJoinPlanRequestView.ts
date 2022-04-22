import { Request, Response } from "express";
import {
  AccepJoinPlanRequestController,
  AcceptJoinPlanRequestMessage,
} from "../../controllers/plan-controllers/AcceptJoinPlanRequest";
import { ExpressResponseAdapter } from "../../core/ExpressResponseAdapter";
import { StatusCode } from "../../core/StatusCodes";
import { View } from "../../core/View";

export class AcceptJoinPlanRequestView extends View {
  protected controllerClass = AccepJoinPlanRequestController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const planId = req.params.planId;

    const userId = req.body.userId;

    const message: AcceptJoinPlanRequestMessage = {
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
