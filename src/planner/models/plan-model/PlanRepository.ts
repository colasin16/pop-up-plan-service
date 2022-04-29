import { Repository } from "../../core/Repository";
import { Category } from "../../types/Category";
import { PlanModel } from "./PlanModel";

export interface PlanRepository extends Repository<PlanModel> {
  findByCategory(category: Category): Promise<PlanModel[]>;
}
