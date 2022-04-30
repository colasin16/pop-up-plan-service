/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlanMessage } from "../../../controllers/plan/CreatePlanController";
import { UserView } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  const view = container.resolve(UserView);

  app.get("/plans", (req: Request, res: Response) => view.findAll(req, res));
  app.post("/plans", async (req: Request, res: Response) => {
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
  });
};
