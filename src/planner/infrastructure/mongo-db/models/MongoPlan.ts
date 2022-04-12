import { ObjectId } from "mongodb";

export interface MongoPlan {
  _id: ObjectId;
  owner: ObjectId;
  title: string;
  location: string;
  time: number;
  privacy: string;
  category: string;
  attendees: ObjectId[];
  description?: string;
}
