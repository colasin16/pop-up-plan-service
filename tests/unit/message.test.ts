import { describe } from "mocha";
import { Identifier } from "../../src/planner/models/Identifier";
import { Message } from "../../src/planner/models/message/Message";
import { User } from "../../src/planner/models/user/User";

describe("Unit test", () => {
    describe("Message", () => {
        const id = new Identifier().toString()

        const user = User.fromPrimitives({
            name: { firstName: "Maria", lastName: "Smith" },
            email: "maeria@owner.pic",
            phoneNumber: "123123123",
            password: "password",
            id: id,
        });

        const testMessage = new Message(user, "This is a test content")

        // TODO: Check what we can expect
    })
})