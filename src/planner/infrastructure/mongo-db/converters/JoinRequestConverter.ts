import { UserPrimitives } from "../../../models/user/UserPrimitives";
import { User } from "../../../models/user/User";
import { MongoUser } from "../models/MongoUser";
import { ObjectId } from "mongodb";
import { JoinRequest } from "../../../models/join-request/JoinRequest";
import { MongoJoinRequest } from "../models/MongoJoinRequest";
import { MongoPlanConverter } from "./PlanConverter";
import { Plan } from "../../../models/plan/Plan";

export class MongoUserConverter {
  static toMongo(joinRequest: JoinRequest): MongoJoinRequest {
    const joinRequestPrimitives = joinRequest.toPrimitives();
    return {
      _id: new ObjectId(joinRequestPrimitives.id.toString()),
      plan: MongoPlanConverter.toMongo(
        Plan.fromPrimitives(joinRequestPrimitives.plan)
      ),
      requester: MongoUserConverter.toMongo(
        User.fromPrimitives(joinRequestPrimitives.requester)
      ),
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
