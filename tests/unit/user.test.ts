import { expect } from "chai";
import { describe } from "mocha"
import { Identifier } from "../../src/planner/models/Identifier";
import { User } from "../../src/planner/models/user/User"

describe("Unit test", () => {
    describe("User", () => {
        const id = new Identifier().toString()
        const testUser = User.fromPrimitives({
            name: { firstName: "Maria", lastName: "Smith" },
            email: "maeria@owner.pic",
            phoneNumber: "123123123",
            password: "password",
            id: id,
        });

        describe(".getId", () => {
            it("should add get an id which is same as the given id", () => {
                expect(testUser.getId().equals(Identifier.fromString(id))).equal(true)
            });
        })
    })
})