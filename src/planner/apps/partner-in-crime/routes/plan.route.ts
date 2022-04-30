/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { Identifier } from "../../../models/Identifier";
import { JoinRequest } from "../../../models/join-request/JoinRequest";
import { User } from "../../../models/user/User";
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
      // TODO: get user id from the jwt in the Authorization Bearer header
      // const user = await view.getUser(req.header.get("Authorization Bearer"));
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

  app.post(
    "/plans/:planId/join-request",
    async (req: Request, res: Response) => {
      try {
        // TODO: get user id from the jwt in the Authorization Bearer header
        // const user = await view.getUser(req.header.get("Authorization Bearer"));
        const user = await view.getUser("626d41aaf7dd454d1de11ffa");
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

        if (!user) {
          return res
            .status(404)
            .json({ message: "Requested plan no longer has an owner" });
        }

        await view.createJoinRequest({
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

  app.patch(
    "/plans/:planId/answer-join-request",
    async (req: Request, res: Response) => {
      try {
        // TODO: get user id from the jwt in the Authorization Bearer header
        // const user = await view.getUser(req.header.get("Authorization Bearer"));
        const user = await view.getUser("626d3f7b7aa88b9339627665");
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

        if (!user) {
          return res
            .status(404)
            .json({ message: "Requested plan no longer has an owner" });
        }

        // TODO: Implement join-request.route.ts with endpoints to fetch the join requests
        // TODO: implement and use view.getJoinRequestById()
        const fakeRequesterUser = await view.getUser(
          "626d41aaf7dd454d1de11ffa"
        );
        const fakeJoinRequest = new JoinRequest(
          requestedPlan,
          fakeRequesterUser as User
        );

        await view.answerJoinRequest({
          joinRequest: fakeJoinRequest,
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
