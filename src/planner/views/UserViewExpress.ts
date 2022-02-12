import { User } from "../models/User";
import { CreatePlanMessage, CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";
import { InMemoryPlanRepository } from "../utils/repositories/InMemoryPlanRepository";
import { PlanDocument } from "../models/documents/PlanDocument";
import { Request, Response } from "express";
import {
  FindPlanByCategoryMessage,
  FindPlanByCategoryView,
} from "./FindPlanByCategoryView";

export class UserViewExpress {
  private user: User;
  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;
  private findPlanByCategoryView: FindPlanByCategoryView;

  constructor() {
    this.user = new User();
    const planRepository = new InMemoryPlanRepository();
    this.createPlanView = new CreatePlanView(this.user, planRepository);
    this.findPlanView = new FindPlanView(this.user, planRepository);
    this.findPlanByCategoryView = new FindPlanByCategoryView(
      this.user,
      planRepository
    );
  }

  public createPlan(req: Request, res: Response): void {
    console.log("create plan called", req.body);
    const message: CreatePlanMessage = {
      owner: req.body.owner.id,
      title: req.body.title,
      location: req.body.location,
      time: req.body.time,
      category: req.body.category,
      privacy: req.body.privacy,
      capacity: req.body.capacity,
    };
    try {
      const planId = this.createPlanView.interact(message);
      res.status(200).send({ success: true, planId: planId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
  //prettier-ignore
  public findAll(req: Request, res: Response): void {
    try {
      const plans = this.findPlanView.interact();
      res
        .status(200)
        .send({
          success: true,
          plans: plans.map(
            (plan) => {
              return {
                ...plan.serialize(),
                owner: {
                  id: plan.serialize().owner.id,
                  name: {
                    firstName: "Deivasss", lastName: "Cuellaar"
                  }
                }
              }
            }
          ),
        });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }

  // README: que no se haga la lista muy grande de findByNske findByNscuantos findBySkibidi... Criteria pattern si se va de las manos
  public findByCategory(req: Request, res: Response): void {
    const message: FindPlanByCategoryMessage = {
      category: req.params.category,
    };
    try {
      const plans = this.findPlanByCategoryView.interact(message);
      res.status(200).send({
        success: true,
        plans: plans.map((plan) => {
          return {
            ...plan.serialize(),
            owner: {
              id: plan.serialize().owner.id,
              name: {
                firstName: "Deivasss",
                lastName: "Cuellaar",
              },
            },
          };
        }),
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
