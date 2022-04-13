import { describe } from "mocha";
import { expect } from "chai";
import { Plan } from "../../src/planner/models/Plan";
import { Category } from "../../src/planner/types/Category";
import { Privacy } from "../../src/planner/types/Privacy";
import { InMemoryPlanRepository } from "../../src/planner/infrastructure/in-memory-storage/InMemoryPlanRepository";
import { CreatePlanMessage } from "../../src/planner/views/CreatePlanView";
import { User } from "../../src/planner/models/User";
import { Identifier } from "../../src/planner/models/Identifier";

describe("Unit test", () => {
  describe("Plan", () => {
    describe(".addAtendees", () => {
      before(async () => {
        const ownerUser = await User.build(
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

        const planEntity = new Plan(
          createPlanMessage.title,
          createPlanMessage.location,
          createPlanMessage.time,
          new Privacy(createPlanMessage.privacy).value,
          new Category(createPlanMessage.category).value,
          createPlanMessage.description
        );
        planEntity.setOwner(ownerUser.getId());

        const inMemoryPlanRepository = new InMemoryPlanRepository();
        const planId = inMemoryPlanRepository.create(planEntity);

        const plans = await inMemoryPlanRepository.findAll();
        const plan = plans.find((p) => p.id === planId.toString());

        expect(plan).to.not.be.eq(undefined);
        // expect(planId).should.be.eq(plan.getId());

        // sinon.assert.calledOnce(walletRepository.insertOne);
      });
    });
  });
});
