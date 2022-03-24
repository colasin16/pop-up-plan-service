import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";
import { Category } from "../../types/Category";
import { MongoClient } from "mongodb";

const MONGODB_DATABASE_URL: string = "mongodb://mongo:27017/";

// > show dbs
// admin    0.000GB
// config   0.000GB
// local    0.000GB
// planner  0.000GB
// > use planner
// switched to db planner
// > db.haiku.find()
// { "_id" : ObjectId("623c57ea7f7bdb1cbaede985"), "title" : "Record of a Shriveled Datum", "content" : "No bytes, no problem. Just insert a document, in MongoDB" }
// { "_id" : ObjectId("623c57f755fe3414cb77a773"), "title" : "Record of a Shriveled Datum", "content" : "No bytes, no problem. Just insert a document, in MongoDB" }
// >
const client = new MongoClient(MONGODB_DATABASE_URL);

interface Haiku {
  title: string;
  content: string;
}
async function run() {
  try {
    await client.connect();
    const database = client.db("planner");
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const haiku = database.collection<Haiku>("haiku");
    const result = await haiku.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });

    // await haiku.drop();
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

export class MongoPlanRepository implements PlanRepository {
  private map: Map<string, Plan>;

  constructor() {
    this.map = new Map<string, Plan>();
  }

  public create(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan);
    console.log("Plan created!! ", plan.getId().toString());
  }

  public find(id: Identifier): Plan | null {
    const plan = this.map.get(id.toString());
    if (!plan) {
      return null;
    }
    return plan;
  }

  public findAll(): Plan[] {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => plans.push(plan));
    return plans;
  }

  public findByCategory(category: Category): Plan[] {
    const plans = new Array<Plan>();
    this.map.forEach((plan) => {
      if (plan.hasCategory(category)) {
        plans.push(plan);
      }
    });
    return plans;
  }

  public update(plan: Plan): void {
    this.map.set(plan.getId().toString(), plan);
  }

  public delete(id: Identifier): void {
    let plan = this.find(id);
    plan = null;
    this.map.delete(id.toString());
  }
}
