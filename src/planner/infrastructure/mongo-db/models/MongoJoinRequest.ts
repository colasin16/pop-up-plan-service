import { ObjectId } from "mongodb";
import { MongoPlan } from "./MongoPlan";
import { MongoUser } from "./MongoUser";

export interface MongoJoinPlanRequest {
  _id: ObjectId;
  plan: MongoPlan;
  requester: MongoUser;
}
