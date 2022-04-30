import { UserPrimitives } from "../../../models/user/UserPrimitives";
import { User } from "../../../models/user/User";
import { MongoUser } from "../models/MongoUser";
import { ObjectId } from "mongodb";

export class MongoUserConverter {
  static toMongo(user: User): MongoUser {
    const userPrimitives = user.toPrimitives();
    return {
      _id: new ObjectId(userPrimitives.id.toString()),
      name: userPrimitives.name,
      email: userPrimitives.email,
      phoneNumber: userPrimitives.phoneNumber,
      password: userPrimitives.password,
    };
  }

  static toDomain(mongoUser: MongoUser): User {
    const userPrimitives: UserPrimitives = {
      id: mongoUser._id.toString(),
      name: {
        firstName: mongoUser.name.firstName,
        lastName: mongoUser.name.lastName,
      },
      email: mongoUser.email,
      phoneNumber: mongoUser.phoneNumber,
      password: mongoUser.password,
    };

    return User.fromPrimitives(userPrimitives);
  }

  static manyToDomain(mongoUsers: MongoUser[]): User[] {
    return mongoUsers.map((user) => this.toDomain(user));
  }

  static manyToMongo(users: User[]): MongoUser[] {
    return users.map((user) => this.toMongo(user));
  }
}
