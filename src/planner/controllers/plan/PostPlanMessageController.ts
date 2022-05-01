import { MongoPlanRepository } from "../../infrastructure/mongo-db/repositories/MongoPlanRepository";
import { PlanRepository } from "../../models/plan/PlanRepository";
import { Identifier } from "../../models/Identifier";
import { User } from "../../models/user/User";

export interface PostPlanMessageMessage {
  planId: Identifier;
  user: User;
  content: string;
}

export class PostPlanMessageController {
  public async control(message: PostPlanMessageMessage): Promise<void> {
    const planRepository: PlanRepository = new MongoPlanRepository();
    const plan = await planRepository.find(message.planId);

    if (plan) {
      plan.postMessageToFeed(message.user, message.content);
      await planRepository.update(plan);
    }
  }
}
