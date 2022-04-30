import { ObjectId } from "mongodb";

export interface MongoUser {
  _id: ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  password: string;
}
