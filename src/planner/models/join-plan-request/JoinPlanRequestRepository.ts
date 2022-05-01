import { JoinPlanRequest } from "./JoinPlanRequest";

export interface JoinPlanRequestRepository {
  findAll(): Promise<JoinPlanRequest[]>;
  create(joinPlanRequest: JoinPlanRequest): Promise<void>;
}
