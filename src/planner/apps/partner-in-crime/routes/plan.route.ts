/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { UserActor } from "../../../views/user-actor/UserActor";

export const register = (app: any) => {
  const view = container.resolve(UserActor);

  app.get("/plans", async (req: Request, res: Response) => {
    try {
      const planList = await view.findAll();

      res.status(200).send({
        success: true,
        plans: planList.map((plan) => {
          plan.toPrimitives();
        }),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.post("/plans", async (req: Request, res: Response) => {
    try {
      // const user = await view.getUser(req.header.get("jwt token and descrypt"));
      const user = await view.getUser("626d3f7b7aa88b9339627665");

      if (!user) {
        return res.status(404).json();
      }

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

      return res.status(200).json({ planId: planId.toString() });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.patch(
    "/plans/:planId/join-request",
    async (req: Request, res: Response) => {
      try {
        // const user = await view.getUser(req.header.get("jwt token and descrypt"));
        const user = await view.getUser("626d3f7b7aa88b9339627665");

        view.joinPlanRequest(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "internal-error" });
      }
    }
  );
  app.patch(
    "/plans/:planId/accept-or-reject-request",
    async (req: Request, res: Response) => {
      view.acceptOrRejectJoinPlanRequest(req, res);
    }
  );
};
