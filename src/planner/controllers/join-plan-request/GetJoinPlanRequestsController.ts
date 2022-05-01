import { MongoJoinPlanRequestRepository } from "../../infrastructure/mongo-db/repositories/MongoJoinPlanRequestRepository";
import { JoinPlanRequestRepository } from "../../models/join-plan-request/JoinPlanRequestRepository";
import { JoinPlanRequest } from "../../models/join-plan-request/JoinPlanRequest";

export class GetJoinPlanRequestsController {
  public async control(): Promise<JoinPlanRequest[]> {
    const joinRequestRepository: JoinPlanRequestRepository =
      new MongoJoinPlanRequestRepository();

    return await joinRequestRepository.findAll();
  }
}
