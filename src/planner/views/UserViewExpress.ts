import { container } from "tsyringe";
import { Request, Response } from "express";

import { User } from "../models/User";
import { CreatePlanMessage, CreatePlanView } from "./CreatePlanView";
import { FindPlanView } from "./FindPlanView";
import {
  FindPlanByCategoryMessage,
  FindPlanByCategoryView,
} from "./FindPlanByCategoryView";
import { FindPlanByIdMessage, FindPlanByIdView } from "./findPlanByIdView";
import { MongoPlanRepository } from "../infrastructure/mongo-db/MongoPlanRepository";
import { MongoDBClient } from "../apps/PlannerMongo";
import { CreateUserMessage, CreateUserView } from "./CreateUserView";

import { Identifier } from "../models/Identifier";
import { ObjectId } from "bson";
import { loginUserMessage, LoginUserView } from "./LoginUserView";
import { MongoUserRepository } from "../infrastructure/mongo-db/MongoUserRepository";
import { PlanRepository } from "../models/PlanRepository";

// I don't understand, why here we have UserViewExpress which contains all other views?
// All the future views will be included in `UserViewExpress` later?

// This is becoming too big, be should separate views
// PlanView
// --/CreatePlanView
// --/CreateUserView
// --/FindPlanView;
// --/FindPlanByCategoryView;

// UserView
// --/CreateUserView;

export class UserViewExpress {
  private user: User;

  private createPlanView: CreatePlanView;
  private findPlanView: FindPlanView;
  private findPlanByCategoryView: FindPlanByCategoryView;
  private findPlanByIdView: FindPlanByIdView;

  private createUserView: CreateUserView;
  private loginUserView: LoginUserView;

  constructor(async_param) {
    // User doing the call
    //ref: https://stackoverflow.com/a/43433773/5377615
    if (typeof async_param === "undefined") {
      throw new Error("Cannot be called directly");
    }
  }

  public static async build(): Promise<UserViewExpress> {
    //TODO: check this
    const user = await User.build(
      new Identifier(new ObjectId("624880125f84a6b5fe84e485")),
      { firstName: "Random", lastName: "Random" },
      "random@random.com",
      "+1111111111",
      "mypassword"
    );
    const mongoDBClient = container.resolve(MongoDBClient);

    // TODO: change InMemoryPlanRepository to MongoPlanRepository
    const mongoPlanRepository: PlanRepository = new MongoPlanRepository(
      mongoDBClient
    );
    // const planRepository = new InMemoryPlanRepository();

    const userViewExpress: UserViewExpress = new UserViewExpress(user);
    userViewExpress.findPlanView = new FindPlanView(
      userViewExpress.user,
      mongoPlanRepository
    );
    userViewExpress.findPlanByCategoryView = new FindPlanByCategoryView(
      userViewExpress.user,
      mongoPlanRepository
    );
    userViewExpress.findPlanByIdView = new FindPlanByIdView(
      mongoPlanRepository
    );

    userViewExpress.createPlanView = new CreatePlanView(
      userViewExpress.user,
      mongoPlanRepository
    );

    const mongoUserRepository = new MongoUserRepository(mongoDBClient);
    userViewExpress.createUserView = new CreateUserView(mongoUserRepository);
    userViewExpress.loginUserView = new LoginUserView(mongoUserRepository);

    return userViewExpress;
  }

  public createPlan(req: Request, res: Response): void {
    const message: CreatePlanMessage = {
      ownerId: req.body.owner.id,
      title: req.body.title,
      location: req.body.location,
      time: req.body.time,
      category: req.body.category,
      privacy: req.body.privacy,
      capacity: req.body.capacity,
      description: req.body.description,
    };
    try {
      const planId = this.createPlanView.interact(message);
      res.status(201).send({ success: true, planId: planId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    console.debug(`req.body: ${JSON.stringify(req.body)}`);
    const message: CreateUserMessage = {
      email: req.body.email,
      id: req.body.id,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    try {
      const userId = await this.createUserView.interact(message);
      console.debug(`user '${userId.toString()} has been created!`);
      res.status(201).send({ success: true, userId: userId.toString() });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }

  public async authenticateUser(req: Request, res: Response): Promise<void> {
    console.debug(`req.body: ${JSON.stringify(req.body)}`);
    const message: loginUserMessage = {
      // Currently we accept email as username, maybe in future we implement username
      // TODO: check emails uniqueness when create a new user
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const token = await this.loginUserView.interact(message);
      // console.debug(`user '${userId.toString()} has been created!`);
      // TODO: implement token part
      if (!token) {
        res.status(403).send({ success: false, token: token });
        return;
      }
      res.status(201).send({ success: true, token: token });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.findPlanView.interact();
      res.status(200).send({
        success: true,
        plans: plans.map((plan) => {
          return {
            ...plan.serialize(),
            owner: {
              id: plan.serialize().owner,
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

  // README: que no se haga la lista muy grande de findByNske findByNscuantos findBySkibidi... Criteria pattern si se va de las manos
  public async findByCategory(req: Request, res: Response): Promise<void> {
    const message: FindPlanByCategoryMessage = {
      category: req.params.category,
    };
    try {
      const plans = await this.findPlanByCategoryView.interact(message);
      res.status(200).send({
        success: true,
        plans: plans.map((plan) => {
          return {
            ...plan.serialize(),
            owner: {
              id: plan.serialize().owner,
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

  public async findById(req: Request, res: Response): Promise<void> {
    const message: FindPlanByIdMessage = {
      id: req.params.id,
    };
    try {
      const plan = await this.findPlanByIdView.interact(message);

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
            id: plan.serialize().owner,
            name: {
              firstName: "Deivasss",
              lastName: "Cuellaar",
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "internal-error" });
    }
  }
}
