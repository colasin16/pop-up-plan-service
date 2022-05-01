import { describe } from "mocha";
import { expect } from "chai";

import { Category, ECategory } from "../../src/planner/types/Category";
import { EPrivacy, Privacy } from "../../src/planner/types/Privacy";
import { Identifier } from "../../src/planner/models/Identifier";
import { Plan } from "../../src/planner/models/plan/Plan";
import { User } from "../../src/planner/models/user/User";

describe("Unit test", () => {
  describe("Plan", () => {
    describe(".hasCategory", () => {
      it("should tell if the plan is of the given category", () => {
        const walkCategory = new Category(ECategory.WALK);
        const walkPlan = new Plan(
          "Walk plan",
          "Spain",
          new Date().valueOf(),
          new Privacy(EPrivacy.PRIVATE),
          walkCategory
        );

        const isWalkCategory = walkPlan.hasCategory(walkCategory);
        expect(isWalkCategory).to.be.eq(true);
      });
    });

    describe(".addAttendees", () => {
      it("it should add an attendee to the attendees list of the plan", () => {
        const attendee = User.fromPrimitives({
          name: { firstName: "Jhon", lastName: "Doe" },
          email: "jhondoe@owner.pic",
          phoneNumber: "123123123",
          password: "password",
          id: new Identifier().toString(),
        });

        const plan = new Plan(
          "A walk to test",
          "123456789",
          new Date().valueOf(),
          new Privacy("public"),
          new Category("walk")
        );

        plan.addAttendee(attendee);

        expect(plan.containsAttendee(attendee)).to.eq(true);
      });
    });
  });
});
