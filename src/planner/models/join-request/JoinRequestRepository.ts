import { JoinRequest } from "./JoinRequest";
import { User } from "../user/User";
import { Plan } from "../plan/Plan";

export interface JoinRequestRepository {
  create(plan: Plan, requester: User): Promise<JoinRequest | null>;
}
