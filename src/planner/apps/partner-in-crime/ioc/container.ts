import { container } from "tsyringe";
import { MongoDBClient } from "../../../infrastructure/mongo-db/MongoDBClient";
import { UserViewExpress } from "../../../views/UserViewExpress";

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
