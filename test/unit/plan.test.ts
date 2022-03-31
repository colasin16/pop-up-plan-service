import { describe } from "mocha";
import { expect } from "chai";
import { Plan } from "../../src/planner/models/Plan";
import { Category } from "../../src/planner/types/Category";
import { Privacy } from "../../src/planner/types/Privacy";
import { InMemoryPlanRepository } from "../../src/planner/utils/repositories/InMemoryPlanRepository";
import { CreatePlanMessage } from "../../src/planner/views/CreatePlanView";

describe("Unit test", () => {
  describe("Plan", () => {
    describe(".addAtendees", () => {
      before(() => {
        const createPlanMessage: CreatePlanMessage = {
          title: "A walk to test",
          time: new Date().valueOf(),
          location: "Barcelona",
          privacy: "PUBLIC",
          category: "WALK",
          ownerId: "1644055774364",
        };

        const planEntity = new Plan(
          createPlanMessage.title,
          createPlanMessage.location,
          createPlanMessage.time,
          new Privacy(createPlanMessage.privacy).value,
          new Category(createPlanMessage.category).value,
          createPlanMessage.description
        );

        const planId = planEntity.getId();
        const inMemoryPlanRepository = new InMemoryPlanRepository();
        inMemoryPlanRepository.create(planEntity);

        const plans = inMemoryPlanRepository.findAll();
        const plan = plans.find((p) => p.getId() === planId);

        expect(plan).to.not.be.eq(undefined);
        // expect(planId).should.be.eq(plan.getId());

        // sinon.assert.calledOnce(walletRepository.insertOne);
      });
    });
  });
});
