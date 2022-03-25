import { PlanRepository } from "../../models/PlanRepository";
import { Plan } from "../../models/Plan";
import { Identifier } from "../../models/Identifier";
import { Category } from "../../types/Category";
import { MongoClient, WithId } from "mongodb";

const MONGODB_DATABASE_URL: string = "mongodb://mongo:27017/";
const client = new MongoClient(MONGODB_DATABASE_URL);
async function tmpFunc() {
  await client.connect();
}
tmpFunc();

// const client = new MongoClient(MONGODB_DATABASE_URL);
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

// interface Haiku {
//   title: string;
//   content: string;
// }
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("planner");
//     // Specifying a Schema is optional, but it enables type hints on
//     // finds and inserts
//     const haiku = database.collection<Haiku>("haiku");
//     const result = await haiku.insertOne({
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     });

//     // await haiku.drop();
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

const PLAN_COLLECTION_NAME: string = "plans";
const DB_NAME: string = "planner";

export class MongoPlanRepository implements PlanRepository {
  private collectionName: string;

  constructor() {
    // TODO: Use this variable
    this.collectionName = "plans";
  }

  public create(plan: Plan): void {
    console.log(`**************create`);
    async function run() {
      try {
        const database = client.db(DB_NAME);
        console.log(`database: ${database}`);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        console.log(`plan_collection: ${plan_collection}`);
        const result = await plan_collection.insertOne(plan);

        console.log("Plan created!! ", plan.getId().toString());

        // console.log(
        //   `A document was inserted with the _id: ${result.insertedId}`
        // );
      } finally {
        // await client.close();
      }
    }
    run().catch(console.dir);
  }

  public find(id: Identifier): Plan | null {
    async function run() {
      try {
        const database = client.db(DB_NAME);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        const foundPlan = await plan_collection.findOne({ id: id });
        return foundPlan;
      } finally {
        // await client.close();
      }
    }

    let returnPlan: Plan | null = null;

    run()
      .then((plan) => {
        // TODO: ASK about the type annotation correctness
        returnPlan = plan as Plan | null;
      })
      .catch(console.dir);

    return returnPlan;
  }

  public async findAll(): Promise<Plan[]> {
    // let returnPlans: any = [];

    async function run() {
      try {
        const database = client.db(DB_NAME);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        const foundPlan = await plan_collection.find().toArray();
        // returnPlans = foundPlan;
        // console.log(`returnPlans: ${returnPlans[0].location}`);
        return foundPlan;
        // return foundPlan;
      } finally {
        // await client.close();
      }
    }

    // TODO: Fix type annotation
    // let returnPlans: WithId<Plan>[] = [];
    // let returnPlans: any = [];
    // run().catch(console.dir);
    let plans: any[] = [];

    plans = await run();

    return plans;

    // run()
    //   .then(async (plan) => {
    //     // plan.toArray()
    //     // TODO: ASK about the type annotation correctness
    //     // while (plan.hasNext()) {
    //     //   if (plan.closed) {
    //     //     return;
    //     //   }
    //     //   let tmpPlan = await plan.next();
    //     //   if (tmpPlan) {
    //     //     returnPlans.push(tmpPlan);
    //     //   }
    //     // }
    //     // returnPlan = plan as unknown as Plan | null;
    //   })
    //   .catch(console.dir)
    //   .finally(() => {
    //     console.log(`returnPlans: ${returnPlans[0].location}`);
    //     return returnPlans;
    //   });
  }

  public async findByCategory(category: Category): Promise<Plan[]> {
    // TODO: Fix type annotation
    // let returnPlans: WithId<Plan>[] = [];

    async function run() {
      try {
        const database = client.db(DB_NAME);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        const foundPlan = await plan_collection
          .find({ category: category })
          .toArray();
        return foundPlan;
      } finally {
        // await client.close();
      }
    }

    // let returnPlans: any = [];
    let plans: any = [];
    plans = await run();

    return plans;
    // run()
    //   .then(async (plan) => {
    //     // TODO: ASK about the type annotation correctness
    //     // while (plan.hasNext()) {
    //     //   let tmpPlan = await plan.next();
    //     //   if (tmpPlan) {
    //     //     returnPlans.push(tmpPlan);
    //     //   }
    //     // }
    //     // returnPlan = plan as unknown as Plan | null;
    //   })
    //   .catch(console.dir)
    //   .finally(() => {
    //     console.log(`returnPlans: ${returnPlans[0].location}`);
    //     return returnPlans;
    //   });
  }

  public update(plan: Plan): void {
    async function run() {
      try {
        const database = client.db(DB_NAME);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        const foundPlan = await plan_collection.updateOne(
          { id: plan.getId() },
          plan
        );
        return foundPlan;
      } finally {
        // await client.close();
      }
    }

    run().catch(console.dir);

    // this.map.set(plan.getId().toString(), plan);
  }

  public delete(id: Identifier): void {
    let plan = this.find(id);

    // TODO: return a boolean to show whether plan exists or not

    async function run() {
      if (!plan) {
        // no plan is founded, so no operation is needed
        return;
      }

      try {
        const database = client.db(DB_NAME);
        // Specifying a Schema is optional, but it enables type hints on
        // finds and inserts
        const plan_collection = database.collection<Plan>(PLAN_COLLECTION_NAME);
        const result = await plan_collection.deleteOne(plan);

        console.log("Plan deleted!! ", plan.getId().toString());
      } finally {
        // await client.close();
      }
    }
    run().catch(console.dir);
  }
}
