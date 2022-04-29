import { WithId } from "mongodb";
import { Identifier } from "../../../core/model/Identifier";
import { UserPrimitives } from "../../../models/user-model/UserPrimitives";
import { UserModel } from "../../../models/user-model/UserModel";
import { MongoUser } from "../models/MongoUser";

export class MongoUserConverter {
  static userToMongoUser(user: UserModel): void { }

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

  static async mongoUserToUser(mongoUser: WithId<MongoUser>): Promise<UserModel> {
    const user = UserModel.buildWithIdentifier(
      Identifier.fromString(mongoUser._id.toString()),
      {
        firstName: mongoUser.name.firstName,
        lastName: mongoUser.name.lastName,
      },
      mongoUser.email,
      mongoUser.phoneNumber,
      mongoUser.password
    );
    return user;
  }
}
