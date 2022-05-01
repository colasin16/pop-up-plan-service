import { JoinPlanRequest } from "./JoinPlanRequest";

export interface JoinPlanRequestRepository {
  findAll(): Promise<JoinPlanRequest[]>;
  update(joinPlanRequest: JoinPlanRequest): Promise<void>;
  create(joinPlanRequest: JoinPlanRequest): Promise<void>;
}
