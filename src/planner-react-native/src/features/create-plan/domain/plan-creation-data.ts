import { Plan } from "../../../core/shared/domain/plan";

export type PlanCreationData = Pick<
  Plan,
  "owner" | "title" | "location" | "time" | "category" | "privacy" | "description" | "capacity"
>;
