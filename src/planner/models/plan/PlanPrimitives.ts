import { ECategory } from "../../types/Category";
import { EPrivacy } from "../../types/Privacy";
import { MessagePrimitives } from "../message/MessagePrimitives";
import { UserPrimitives } from "../user/UserPrimitives";

export interface PlanPrimitives {
  id: string;
  owner: UserPrimitives;
  title: string;
  description?: string;
  location: string;
  time: number;
  privacy: EPrivacy;
  category: ECategory;
  attendees: UserPrimitives[];
  image?: string;
  feed: MessagePrimitives[];
}
