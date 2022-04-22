import { Request, Response } from "express";
import {
  JoinPlanRequestController,
  JoinPlanRequestMessage,
} from "../../controllers/JoinPlanRequestController";
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
    res.status(201).send({ success: true, data });
  }
}
