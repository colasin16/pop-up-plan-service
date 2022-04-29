/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserViewExpress } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  const view = container.resolve(UserViewExpress);

  app.get("/plans", (req: Request, res: Response) => view.findAll(req, res));
  app.get("/plans/:planId", (req: Request, res: Response) => view.getPlan(req, res));

  app.post("/plans", (req: Request, res: Response) =>
    view.createPlan(req, res)
  );
  app.patch("/plans/:planId/join-request", (req: Request, res: Response) =>
    view.joinPlanRequest(req, res)
  );
  app.patch("/plans/:planId/accept-or-reject-request", (req: Request, res: Response) =>
    view.acceptOrRejectJoinPlanRequest(req, res)
  );
};
