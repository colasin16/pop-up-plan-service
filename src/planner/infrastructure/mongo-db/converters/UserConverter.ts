import { WithId } from "mongodb";
import { UserPrimitives } from "../../../models/user/UserPrimitives";
import { User } from "../../../models/user/User";
import { MongoUser } from "../models/MongoUser";

export class MongoUserConverter {
  static userToMongoUser(user: User): void {}

  static mongoUserToUserPrimitives(
    mongoUser: WithId<MongoUser>
  ): UserPrimitives {
    return {
      id: mongoUser._id.toString(),
      name: {
        firstName: mongoUser.name.firstName,
        lastName: mongoUser.name.lastName,
      },
      email: mongoUser.email,
      phoneNumber: mongoUser.phoneNumber,
      password: mongoUser.password,
    };
  }
}
