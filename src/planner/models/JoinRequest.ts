import { Plan } from "./plan/Plan";
import { User } from "./user/User";

class JoinPlanRequest {
  constructor(private readonly user: User, private readonly plan: Plan) {}

  request() {}

  accept() {}
  decline() {}
}
