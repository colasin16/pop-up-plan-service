import { ObjectId } from "mongodb";
import { MongoMessage } from "./MongoMessage";
import { MongoUser } from "./MongoUser";

export interface MongoPlan {
  _id: ObjectId;
  owner: MongoUser;
  title: string;
  location: string;
  time: number;
  privacy: string;
  category: string;
  attendees: MongoUser[];
  description?: string;
  image?: string;
  feed: MongoMessage[];
}
