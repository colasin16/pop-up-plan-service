import { describe } from "mocha";
import { expect } from "chai";
import { PlanModel } from "../../src/planner/models/plan-model/Plan";
import { Category } from "../../src/planner/types/Category";
import { Privacy } from "../../src/planner/types/Privacy";
import { InMemoryPlanRepository } from "../../src/planner/infrastructure/in-memory-storage/InMemoryPlanRepository";

import { UserModel } from "../../src/planner/models/user-model/User";
import { Identifier } from "../../src/planner/core/model/Identifier";
import { CreatePlanMessage } from "../../src/planner/controllers/plan-controllers/CreatePlanController";

describe("Unit test", () => {
  describe("Plan", () => {
    describe(".addAtendees", () => {
      before(async () => {
        const ownerUser = await UserModel.buildWithIdentifier(
          new Identifier(),
          { firstName: "Jhon", lastName: "Doe" },
          "jhondoe@owner.pic",
          "123123123",
          "password"
        );

        const createPlanMessage: CreatePlanMessage = {
          title: "A walk to test",
          time: new Date().valueOf(),
          location: "Barcelona",
          privacy: "public",
          category: "walk",
          ownerId: "1644055774364",
        };

        const planEntity = new PlanModel(
          createPlanMessage.title,
          Identifier.fromString(createPlanMessage.ownerId),
          createPlanMessage.location,
          createPlanMessage.time,
          new Privacy(createPlanMessage.privacy).value,
          new Category(createPlanMessage.category).value,
          createPlanMessage.description
        );

        const inMemoryPlanRepository = new InMemoryPlanRepository();
        const createdPlan = await inMemoryPlanRepository.create(planEntity);

        const plans = await inMemoryPlanRepository.findAll();
        const plan = plans.find((p) => p.getId() === createdPlan?.getId());

        expect(plan).to.not.be.eq(undefined);
        // expect(planId).should.be.eq(plan.getId());

        // sinon.assert.calledOnce(walletRepository.insertOne);
      });
    });
  });
});
