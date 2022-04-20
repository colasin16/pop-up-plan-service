/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserViewExpress } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  const view = container.resolve(UserViewExpress);

  app.get("/plans", (req: Request, res: Response) => view.findAll(req, res));
  app.post("/plans", (req: Request, res: Response) =>
    view.createPlan(req, res)
  );
};
