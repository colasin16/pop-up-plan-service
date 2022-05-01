import { ObjectId } from "mongodb";
import { MongoUser } from "./MongoUser";

export interface MongoMessage {
  _id: ObjectId;
  user: MongoUser;
  content: string;
}
