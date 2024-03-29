import { EJoinPlanRequestStatus } from "../../types/JoinPlanRequestStatus";
import { PlanPrimitives } from "../plan/PlanPrimitives";
import { UserPrimitives } from "../user/UserPrimitives";

export interface JoinPlanRequestPrimitives {
  id: string;
  plan: PlanPrimitives;
  requester: UserPrimitives;
  status: EJoinPlanRequestStatus;
}
