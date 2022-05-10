/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response } from "express";
import { container } from "tsyringe";
import { LoginMessage } from "../../../controllers/LoginController";
import { CreateUserMessage } from "../../../controllers/user/CreateUserController";
import { UserActor } from "../../../views/user-actor/UserActor";

export const USER_PATH = {
  LOGIN: "/login"
}

export const register = (app: any) => {
  const view = container.resolve(UserActor);

  app.post("/users", async (req: Request, res: Response) => {
    try {
      const message: CreateUserMessage = {
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
      };

      const userId = await view.createUser(message);

      if (!userId) {
        return res.status(500).json({ message: "Error creating user" });
      }

      return res.status(200).json({ success: true, userId: userId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.get("/users/:userId", async (req: Request, res: Response) => {
    try {
      const user = await view.getUser(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ success: true, user: user.toPrimitives() });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });

  app.post(USER_PATH.LOGIN, async (req: Request, res: Response) => {
    try {
      const message: LoginMessage = {
        username: req.body.username,
        password: req.body.password,
      };
      const responseMessage = await view.authenticateUser(message);

      if (!responseMessage) {
        return res.status(403).send({ success: false, token: "" });
      }

      return res.status(201).send({
        success: true,
        token: responseMessage.token,
        user: responseMessage.user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "internal-error" });
    }
  });
};
