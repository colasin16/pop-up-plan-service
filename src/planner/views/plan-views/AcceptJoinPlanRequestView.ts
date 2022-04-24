import { Request, Response } from "express";
import {
  AcceptOrRejectJoinPlanRequestController,
  AcceptOrRejectJoinPlanRequestMessage,
} from "../../controllers/plan-controllers/AcceptJoinPlanRequest";
import { ExpressResponseAdapter } from "../../core/ExpressResponseAdapter";
import { StatusCode } from "../../core/StatusCodes";
import { View } from "../../core/View";

export class AcceptJoinPlanRequestView extends View {
  protected controllerClass = AcceptOrRejectJoinPlanRequestController;

  protected async doRender(req: Request, res: Response): Promise<void> {
    const planId = req.params.planId;
    const userId = req.body.userId;
    const status = req.body.status;


    const message: AcceptOrRejectJoinPlanRequestMessage = {
      planId,
      userId,
      status
    };

    const { data } = await this.control(message);

    const expresResponseAdapter = new ExpressResponseAdapter(res);
    expresResponseAdapter.sendResponse(StatusCode.OK_200, {
      success: true,
      data,
      errors: [],
    });
  }
}
