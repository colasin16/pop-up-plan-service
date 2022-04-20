import { container } from "tsyringe";
import { MongoDBClient } from "../../../infrastructure/mongo-db/MongoDBClient";
import { MongoPlanRepository } from "../../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../../models/PlanRepository";
import { UserViewExpress } from "../../../views/UserViewExpress";
import { types } from "./types";

export class DependencyInjectionManager {
  async setup() {
    const MongoClientInstance = await new MongoDBClient().setup();

    container.register<MongoDBClient>(MongoDBClient, {
      useValue: MongoClientInstance,
    });
    container.register<UserViewExpress>(UserViewExpress, {
      useValue: new UserViewExpress(),
    });
  }
}
