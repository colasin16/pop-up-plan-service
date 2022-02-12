import { Id } from "../../types/id";
import { CustomLocation } from "../../types/location";
import { Timestamp } from "../../types/timestamp";
import { Plan } from "./plan";
import { User } from "./user";

export interface PlanRepository {
  create(plan: Plan): Promise<Plan>;
  delete(id: Id): Promise<void>;
  addAtendee(planId: Id, user: User): Promise<void>;
  removeAtendee(planId: Id, userId: Id): Promise<void>;
  changeLocation(planId: Id, location: CustomLocation): Promise<void>;
  changeTime(planId: Id, time: Timestamp): Promise<void>;
}
