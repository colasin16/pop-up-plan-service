import { JoinPlanRequest } from "./JoinPlanRequest";

export interface JoinPlanRequestRepository {
  create(joinPlanRequest: JoinPlanRequest): Promise<void>;
}
