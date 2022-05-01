import { Identifier } from "../Identifier";
import { Plan } from "../plan/Plan";
import { User } from "../user/User";
import { JoinPlanRequestPrimitives } from "./JoinPlanRequestPrimitives";

export class JoinPlanRequest {
  private id: Identifier;
  public plan: Plan;
  public requester: User;

  constructor(plan: Plan, requester: User) {
    this.id = new Identifier();
    this.plan = plan;
    this.requester = requester;
  }

  public toPrimitives(): JoinPlanRequestPrimitives {
    return {
      id: this.id.toString(),
      plan: this.plan.toPrimitives(),
      requester: this.requester.toPrimitives(),
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
    return joinRequest;
  }

  accept() {
    this.plan.addAttendee(this.requester);
  }
}
