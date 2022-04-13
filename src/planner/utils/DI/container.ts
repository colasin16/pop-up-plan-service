import { container } from "tsyringe";
import { MongoDBClient } from "../../apps/PlannerMongo";

export class DependencyInjectionManager {
  async setup() {
    const MongoClientInstance = await new MongoDBClient().setup();

    container.register<MongoDBClient>(MongoDBClient, {
      useValue: MongoClientInstance,
    });
  }
}
