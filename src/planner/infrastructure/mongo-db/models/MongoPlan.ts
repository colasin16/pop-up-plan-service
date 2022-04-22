import { ObjectId } from "mongodb";

export interface MongoPlan {
  ownerId: ObjectId;
  title: string;
  location: string;
  time: number;
  privacy: string;
  category: string;
  attendeesId: ObjectId[];
  pendingAttendeesId: ObjectId[];
  description?: string;
  image?: string;
}
