import { container } from "tsyringe";
import { MongoDBClient } from "../../../infrastructure/mongo-db/MongoDBClient";
import { UserActor } from "../../../views/user-actor/UserActor";

export class DependencyInjectionManager {
  async setup() {
    const MongoClientInstance = await new MongoDBClient().setup();

    container.register<MongoDBClient>(MongoDBClient, {
      useValue: MongoClientInstance,
    });
    container.register<UserActor>(UserActor, {
      useValue: new UserActor(),
    });
  }
}
