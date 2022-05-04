/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { GetPlanMessage } from "../../../controllers/plan/GetPlanController";
import { Identifier } from "../../../models/Identifier";
import { User } from "../../../models/user/User";
import { UserActor } from "../../../views/user-actor/UserActor";

export const register = (app: any) => {
  const view = container.resolve(UserActor);

  app.get("/plans", async (req: Request, res: Response) => {
    try {
      const planList = await view.findAll();

      res.status(200).send({
        success: true,
        plans: planList.map((plan) => plan.toPrimitives()),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.get("/plans/:planId", async (req: Request, res: Response) => {

    try {
      const message: GetPlanMessage = {
        id: req.params.planId as string
      }

      const gottenPlan = await view.getPlan(message);

      if (!gottenPlan) {
        res.status(404).send({
          success: false,
        });
      }

      res.status(200).send({
        success: true,
        plan: gottenPlan?.toPrimitives(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.post("/plans", async (req: Request, res: Response) => {
    try {
      const user: User = req["user"]

      const createPlanMessage: CreatePlanMessage = {
        owner: user.toPrimitives(),
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        category: req.body.category,
        privacy: req.body.privacy,
        description: req.body.description,
        image: req.body.image,
      };

      const planId = await view.createPlan(createPlanMessage);

      if (!planId) {
        return res.status(500).json({ message: "Error creating plan" });
      }

      return res.status(201).json({ success: true, planId: planId.toString() });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.post(
    "/plans/:planId/post-message",
    async (req: Request, res: Response) => {
      try {
        const user: User = req["user"]

        const planId = req.params.planId as string;
        const content = req.body.content as string;

        await view.postPlanMessage({
          user,
          planId: Identifier.fromString(planId),
          content,
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "internal-error" });
      }
    }
  );

  app.post(
    "/plans/:planId/join-request",
    async (req: Request, res: Response) => {
      try {
        const user: User = req["user"]

        const planId = req.params.planId as string;

        // TODO: Use the view.findPlanById()
        const plans = await view.findAll();

        const requestedPlan = plans.find((plan) =>
          plan.getId().equals(Identifier.fromString(planId))
        );

        if (!requestedPlan) {
          return res
            .status(404)
            .json({ message: "Requested plan does not exist" });
        }

        await view.createJoinPlanRequest({
          plan: requestedPlan.toPrimitives(),
          requester: user.toPrimitives(),
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "internal-error" });
      }
    }
  );

  app.get(
    "/plans/:planId/join-requests",
    async (req: Request, res: Response) => {
      try {
        const user: User = req["user"]

        const planId = req.params.planId as string;
        const joinPlanRequests = await view.getJoinPlanRequests();
        const joinPlanRequestPrimitives = joinPlanRequests
          .filter(
            (request) =>
              request.plan.getId().equals(Identifier.fromString(planId)) &&
              request.isPlanOwner(user)
          )
          .map((request) => request.toPrimitives());

        return res
          .status(200)
          .json({ success: true, data: joinPlanRequestPrimitives });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "internal-error" });
      }
    }
  );
};
