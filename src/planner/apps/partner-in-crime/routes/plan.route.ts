/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserViewExpress } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  // TODO: Ask? Why do we need dependecy injection here? It my mind UserViewExpress is independent
  // from express and it's our domain logic

  const view = container.resolve(UserViewExpress);

  app.get("/plans", (req: Request, res: Response) => view.findAll(req, res));
  app.post("/plans", (req: Request, res: Response) =>
    view.createPlan(req, res)
  );
  app.patch("/plans/:planId/join-request", (req: Request, res: Response) =>
    view.joinPlanRequest(req, res)
  );
  app.patch("/plans/:planId/accept-request", (req: Request, res: Response) =>
    view.acceptJoinPlanRequest(req, res)
  );
};
