import { Request, Response } from "express";
import { User } from "../models/User";
import { CreatePlanMessage, CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";
import { InMemoryPlanRepository } from "../utils/repositories/InMemoryPlanRepository";
import {
  FindPlanByCategoryMessage,
  FindPlanByCategoryView,
} from "./FindPlanByCategoryView";
import { FindPlanByIdMessage, FindPlanByIdView } from "./findPlanByIdView";
import {
  FindPlanByOwnerMessage,
  FindPlanByOwnerView,
} from "./findPlanByOwnerView";
import { INTERNAL_ERROR, ResponseData } from "./responses";

// I don't understand, why here we have UserViewExpress which contains all other views?
// All the future views will be included in `UserViewExpress` later?
export class UserViewExpress {
  private user: User;
  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;
  private findPlanByCategoryView: FindPlanByCategoryView;
  private FindPlanByIdView: FindPlanByIdView;
  private FindPlanByOwnerView: FindPlanByOwnerView;

  constructor() {
    this.user = new User();
    const planRepository = new InMemoryPlanRepository();
    this.createPlanView = new CreatePlanView(this.user, planRepository);
    this.findPlanView = new FindPlanView(this.user, planRepository);
    this.findPlanByCategoryView = new FindPlanByCategoryView(
      this.user,
      planRepository
    );
    this.FindPlanByIdView = new FindPlanByIdView(planRepository);
    this.FindPlanByOwnerView = new FindPlanByOwnerView(planRepository);
  }

  public createPlan(req: Request, res: Response): void {
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
      res.status(500).send(INTERNAL_ERROR);
    }
  }

  public findAll(req: Request, res: Response): void {
    try {
      const plans = this.findPlanView.interact();
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
      res.status(500).send(INTERNAL_ERROR);
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
      res.status(500).send(INTERNAL_ERROR);
    }
  }

  /**
   * get the ower id somehow from the API request
   * @param req
   * @param res
   */
  public findByOwner(req: Request, res: Response): void {
    const message: FindPlanByOwnerMessage = { ownerId: req.params.ownerId };

    try {
      const plans = this.FindPlanByOwnerView.interact(message);

      const response: ResponseData = {
        success: true,
        data: plans.map((plan) => {
          return {
            ...plan.serialize(),
            // TODO: replace this with real user
            owner: {
              id: plan.serialize().owner.id,
              name: {
                firstName: "Deivasss",
                lastName: "Cuellaar",
              },
            },
          };
        }),
        message: "",
      };
      res.status(200).send(response);
    } catch (e) {
      console.error(e.toString());
      res.status(500).send({
        ...INTERNAL_ERROR,
        message: INTERNAL_ERROR.message + "," + e.toString(),
      });
    }
  }

  public findById(req: Request, res: Response): void {
    const message: FindPlanByIdMessage = {
      id: req.params.id,
    };

    try {
      const plan = this.FindPlanByIdView.interact(message);

      if (!plan) {
        res.status(404).send("Not found");
        return;
      }
      res.status(200).send({
        success: true,
        plan: {
          ...plan.serialize(),
          // TODO: The reason behind this is we don't have coded anything related with plan owners.
          // Once everything with plans is working kind of properly we can introduce the owner concept/idea and fix this
          owner: {
            id: plan.serialize().owner.id,
            name: {
              firstName: "Deivasss",
              lastName: "Cuellaar",
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(INTERNAL_ERROR);
    }
  }
}
