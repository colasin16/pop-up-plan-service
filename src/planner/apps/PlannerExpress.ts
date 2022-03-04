const express = require("express");
import { Express } from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { UserViewExpress } from "../views/UserViewExpress";

// TODO: deberia ser una implementacion de una abstracta pura (interface) HttpServer o se podria montar jerarquia de API pero hacer los contratos
export class PlannerExpress {
  private app: Express;
  private port: number;
  private view: UserViewExpress;

  constructor() {
    this.app = express();
    this.port = 8080;
    this.view = new UserViewExpress();
  }

  public setup(): PlannerExpress {
    this.app.use(bodyParser.json());
    this.app.get("/plans", (req: Request, res: Response) =>
      this.view.findAll(req, res)
    );

    // TODO: Support query parameters -> https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
    // e.g, GET /plans/?id=62212a4479c1c54757a32283&category=RUN
    this.app.get("/plans/id/:id", (req: Request, res: Response) =>
      this.view.find(req, res)
    );

    this.app.get("/plans/:category", (req: Request, res: Response) =>
      this.view.findByCategory(req, res)
    );

    this.app.post("/plan", (req: Request, res: Response) =>
      this.view.createPlan(req, res)
    );
    return this;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`PlannerExpress up on port ${this.port}`);
    });
  }
}
