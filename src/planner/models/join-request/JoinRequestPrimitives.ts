import { PlanPrimitives } from "../plan/PlanPrimitives";
import { UserPrimitives } from "../user/UserPrimitives";

export interface JoinRequestPrimitives {
  id: string;
  plan: PlanPrimitives;
  requester: UserPrimitives;
}
