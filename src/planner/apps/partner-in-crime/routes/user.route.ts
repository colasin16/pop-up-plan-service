/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserViewExpress } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  const view = container.resolve(UserViewExpress);

  app.post("/user", (req: Request, res: Response) => view.createUser(req, res));
  app.post("/login", (req: Request, res: Response) =>
    view.authenticateUser(req, res)
  );
};
