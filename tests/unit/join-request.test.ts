import { describe } from "mocha";
import { expect } from "chai";

import { JoinPlanRequest } from "../../src/planner/models/join-plan-request/JoinPlanRequest";
import { Category, ECategory } from "../../src/planner/types/Category";
import { EPrivacy, Privacy } from "../../src/planner/types/Privacy";
import { Identifier } from "../../src/planner/models/Identifier";
import { Plan } from "../../src/planner/models/plan/Plan";
import { User } from "../../src/planner/models/user/User";

describe("Unit test", () => {
  describe("JoinPlanRequest", () => {
    describe(".accept", () => {
      it("should add the requester as attendee of the plan", () => {
        const plan = new Plan(
          "Walk plan",
          "Spain",
          new Date().valueOf(),
          new Privacy(EPrivacy.PRIVATE),
          new Category(ECategory.WALK)
        );
        const requester = User.fromPrimitives({
          name: { firstName: "Jhon", lastName: "Doe" },
          email: "jhondoe@owner.pic",
          phoneNumber: "123123123",
          password: "password",
          id: new Identifier().toString(),
        });

        const joinPlanRequest = new JoinPlanRequest(plan, requester);
        joinPlanRequest.accept();

        expect(plan.containsAttendee(requester)).to.eq(true);
        expect(joinPlanRequest.isAccepted).to.eq(true);
      });
    });
  });
});
