import { MongoClient } from "mongodb";
import { singleton } from "tsyringe";

@singleton()
export class MongoDBClient {
  public client: MongoClient;
  private readonly uri = `mongodb+srv://be-service:${"ficbe-service"}@cluster0.whnkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  public async setup() {
    const client = new MongoClient(this.uri);

    try {
      await client.connect();

      if (client) {
        this.client = client;
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }
}
