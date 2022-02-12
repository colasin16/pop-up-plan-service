import { container } from "tsyringe";
import { PLAN_CREATOR_REPOSITORY, PLAN_LIST_REPOSITORY } from "./injection-tokens";
import { PlanListHttpRepository } from "../../features/find-plan/infrastructure/plan-list-http-repository";
import { PlanCreatorHttpRepository } from "../../features/create-plan/infrastructure/plan-creator-http-repository";
import { PlanCreatorMockRepository } from "../../features/create-plan/infrastructure/plan-creator-mock-repository";
import { PlanListMockRepository } from "../../features/find-plan/infrastructure/plan-list-mock-repository.";

const containerDI = container;

if (process.env.NODE_ENV === "test") {
  containerDI.register(PLAN_LIST_REPOSITORY, PlanListMockRepository);
  containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorMockRepository);
} else {
  containerDI.register(PLAN_LIST_REPOSITORY, PlanListHttpRepository);
  containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorHttpRepository);
}

export { containerDI };
