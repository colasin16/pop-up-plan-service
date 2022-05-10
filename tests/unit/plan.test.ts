import { describe } from "mocha";
import { expect } from "chai";

import { Category, ECategory } from "../../src/planner/types/Category";
import { EPrivacy, Privacy } from "../../src/planner/types/Privacy";
import { Identifier } from "../../src/planner/models/Identifier";
import { Plan } from "../../src/planner/models/plan/Plan";
import { User } from "../../src/planner/models/user/User";

describe("Unit test", () => {
  describe("Plan", () => {
    const owner = User.fromPrimitives({
      name: { firstName: "Maria", lastName: "Smith" },
      email: "maeria@owner.pic",
      phoneNumber: "123123123",
      password: "password",
      id: new Identifier().toString(),
    });
    const genericPlan = new Plan(
      "A walk to test",
      "123456789",
      new Date().valueOf(),
      new Privacy(EPrivacy.PRIVATE),
      new Category(ECategory.WALK)
    );

    genericPlan.setOwner(owner);

    const attendee = User.fromPrimitives({
      name: { firstName: "Jhon", lastName: "Doe" },
      email: "jhondoe@owner.pic",
      phoneNumber: "123123123",
      password: "password",
      id: new Identifier().toString(),
    });

    describe(".hasCategory", () => {
      it("should tell if the plan is of the given category", () => {
        const walkCategory = new Category(ECategory.WALK);

        const isWalkCategory = genericPlan.hasCategory(walkCategory);
        expect(isWalkCategory).to.be.eq(true);
      });
    });

    describe(".addAttendees", () => {
      it("should add an attendee to the attendees list of the plan", () => {
        genericPlan.addAttendee(attendee);

        expect(genericPlan.containsAttendee(attendee)).to.eq(true);
      });
    });

    describe(".postMessageToFeed", () => {
      it("should add a new message to the feed", () => {
        const content = "Hello there! Are you hyped?";
        genericPlan.postMessageToFeed(owner, content);

        expect(genericPlan.getFeed()).to.be.length.greaterThan(0);
        expect(genericPlan.getFeed()[0].content).to.eq(content);
      });
    });
  });
});
