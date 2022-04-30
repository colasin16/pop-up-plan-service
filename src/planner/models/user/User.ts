import { UserPrimitives } from "./UserPrimitives";
import { FullName } from "../../types/FullName";
import { Identifier } from "../Identifier";
import { Plan } from "../plan/Plan";

export class User {
  private id: Identifier;
  private name: FullName;
  private email: string;
  private phoneNumber: string;
  private password: string;

  constructor(
    name: FullName,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    this.id = new Identifier();
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  public toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }

  public static fromPrimitives(document: UserPrimitives): User {
    const user = new User(
      document.name,
      document.email,
      document.phoneNumber,
      document.password
    );
    user.id = Identifier.fromString(document.id);
    return user;
  }

  public getId(): Identifier {
    return this.id;
  }

  public joinPlan(plan: Plan) {
    plan.addAttendee(this);
  }
}
