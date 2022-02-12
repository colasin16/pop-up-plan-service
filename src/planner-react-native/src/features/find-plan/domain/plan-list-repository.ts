import { Plan, Category } from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import { PersistedObject } from "../../../core/types/persisted-object";
import { Timestamp } from "../../../core/types/timestamp";

export interface PlanListRepository {
  findAll(): Promise<PersistedObject<Plan>[]>;
  findByCategory(category: Category): Promise<PersistedObject<Plan>[]>;
  findByTime(time: Timestamp): Promise<PersistedObject<Plan>[]>;
  findByLocation(location: CustomLocation): Promise<PersistedObject<Plan>[]>;
}
