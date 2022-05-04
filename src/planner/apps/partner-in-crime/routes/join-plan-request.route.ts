/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserActor } from "../../../views/user-actor/UserActor";
import { Identifier } from "../../../models/Identifier";

export const register = (app: any) => {
  const view = container.resolve(UserActor);

  app.get("/join-plan-requests", async (req: Request, res: Response) => {
    try {
      const userId: string = req["userId"]
      const user = await view.getUser(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Requested plan no longer has an owner" });
      }

      const joinPlanRequests = await view.getJoinPlanRequests();
      const joinPlanRequestsPrimitives = joinPlanRequests
        .filter((request) => request.isPlanOwner(user))
        .map((request) => request.toPrimitives());

      res.status(200).send({
        success: true,
        data: joinPlanRequestsPrimitives,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.patch(
    "/join-plan-requests/:joinPlanRequestId/answer",
    async (req: Request, res: Response) => {
      try {
        const userId: string = req["userId"]
        const user = await view.getUser(userId);

        if (!user) {
          return res
            .status(404)
            .json({ message: "Requested plan no longer has an owner" });
        }

        const joinPlanRequestId = req.params.joinPlanRequestId as string;
        const joinPlanRequests = await view.getJoinPlanRequests();
        const joinPlanRequest = joinPlanRequests.find((request) =>
          request.getId().equals(Identifier.fromString(joinPlanRequestId))
        );

        if (!joinPlanRequest) {
          return res.status(404).json({
            message: "No join request was found for this plan to be answered",
          });
        }

        await view.answerJoinPlanRequest({
          joinRequest: joinPlanRequest,
          answer: req.body.accept,
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "internal-error" });
      }
    }
  );
};
