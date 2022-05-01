import { EnumValueObject } from "../utils/EnumValueObject";

export enum EJoinPlanRequestStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PENDING = "pending",
}

export class JoinPlanRequestStatus extends EnumValueObject<EJoinPlanRequestStatus> {
  constructor(value: EJoinPlanRequestStatus | string) {
    super(EJoinPlanRequestStatus, value);
  }
}
