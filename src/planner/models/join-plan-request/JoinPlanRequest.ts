import {
  EJoinPlanRequestStatus,
  JoinPlanRequestStatus,
} from "../../types/JoinPlanRequestStatus";
import { Identifier } from "../Identifier";
import { Plan } from "../plan/Plan";
import { User } from "../user/User";
import { JoinPlanRequestPrimitives } from "./JoinPlanRequestPrimitives";

export class JoinPlanRequest {
  private id: Identifier;
  public plan: Plan;
  public requester: User;
  private status: JoinPlanRequestStatus;

  constructor(plan: Plan, requester: User) {
    this.id = new Identifier();
    this.plan = plan;
    this.requester = requester;
    this.status = new JoinPlanRequestStatus(EJoinPlanRequestStatus.PENDING);
  }

  getId() {
    return this.id;
  }

  public toPrimitives(): JoinPlanRequestPrimitives {
    return {
      id: this.id.toString(),
      plan: this.plan.toPrimitives(),
      requester: this.requester.toPrimitives(),
      status: this.status.value,
    };
  }

  public static fromPrimitives(
    joinRequestPrimitives: JoinPlanRequestPrimitives
  ): JoinPlanRequest {
    const joinRequest = new JoinPlanRequest(
      Plan.fromPrimitives(joinRequestPrimitives.plan),
      User.fromPrimitives(joinRequestPrimitives.requester)
    );

    joinRequest.id = Identifier.fromString(joinRequestPrimitives.id);
    joinRequest.status = new JoinPlanRequestStatus(
      joinRequestPrimitives.status
    );
    return joinRequest;
  }

  accept() {
    this.plan.addAttendee(this.requester);
    this.status = new JoinPlanRequestStatus(EJoinPlanRequestStatus.ACCEPTED);
  }

  get isAccepted() {
    return this.status.equals(
      new JoinPlanRequestStatus(EJoinPlanRequestStatus.ACCEPTED)
    );
  }

  reject() {
    this.status = new JoinPlanRequestStatus(EJoinPlanRequestStatus.REJECTED);
  }

  get isRejected() {
    return this.status.equals(
      new JoinPlanRequestStatus(EJoinPlanRequestStatus.REJECTED)
    );
  }

  isPlanOwner(user: User) {
    return this.plan.isOwner(user);
  }
}
