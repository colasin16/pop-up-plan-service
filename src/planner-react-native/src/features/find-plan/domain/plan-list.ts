import { Plan } from '../../../core/shared/domain/plan';
import { PersistedObject } from '../../../core/types/persisted-object';

export class PlanList {
  constructor(private readonly plans: PersistedObject<Plan>[]) {}
}
