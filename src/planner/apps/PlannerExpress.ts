const express = require("express");
import { Express } from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { UserViewExpress } from "../views/UserViewExpress";

const SERVER_PORT = Number(process.env.SERVER_PORT);

// TODO: deberia ser una implementacion de una abstracta pura (interface) HttpServer o se podria montar jerarquia de API pero hacer los contratos
export class PlannerExpress {
  private app: Express;
  private port: number;
  private view: UserViewExpress;

  constructor(async_param) {
    //ref: https://stackoverflow.com/a/43433773/5377615
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly");
    }
  }

  public static async build(): Promise<PlannerExpress> {
    const view = new UserViewExpress();
    const planner = new PlannerExpress(view);

    planner.app = express();
    planner.port = SERVER_PORT || 8080;
    planner.view = view;

    return planner;
  }

  public setup(): PlannerExpress {
    this.app.use(bodyParser.json());
    // TODO: It would be better if we add trailing slash for all API urls
    this.app.get("/plans", (req: Request, res: Response) =>
      this.view.findAll(req, res)
    );

    // TODO: Support query parameters -> https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
    // e.g, GET /plans/?id=62212a4479c1c54757a32283&category=RUN
    // this.app.get("/plans/id/:id", (req: Request, res: Response) =>
    //   this.view.findById(req, res)
    // );

    // this.app.get("/plans/:category", (req: Request, res: Response) =>
    //   this.view.findByCategory(req, res)
    // );

    this.app.post("/plan", (req: Request, res: Response) =>
      this.view.createPlan(req, res)
    );

    this.app.post("/user", (req: Request, res: Response) =>
      this.view.createUser(req, res)
    );

    this.app.post("/login", (req: Request, res: Response) =>
      this.view.authenticateUser(req, res)
    );

    return this;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`PlannerExpress up on port ${this.port}`);
    });
  }
}
