/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserView } from "../../../views/UserViewExpress";

export const register = (app: any) => {
  const view = container.resolve(UserView);

  app.post("/users", (req: Request, res: Response) =>
    view.createUser(req, res)
  );
  app.get("/users/:userId", (req: Request, res: Response) =>
    view.getUser(req.params.userId)
  );
  app.post("/login", (req: Request, res: Response) =>
    view.authenticateUser(req, res)
  );
};
