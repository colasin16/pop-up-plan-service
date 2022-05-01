import { MessagePrimitives } from "./MessagePrimitives";
import { User } from "../user/User";
import { Identifier } from "../Identifier";

export class Message {
  private id: Identifier;
  // createdAt: number
  constructor(public readonly user: User, public readonly content: string) {
    this.id = new Identifier();
    this.user = user;
    this.content = content;
  }

  public static fromPrimitives(messagePrimitives: MessagePrimitives): Message {
    const message = new Message(
      User.fromPrimitives(messagePrimitives.user),
      messagePrimitives.content
    );
    message.id = Identifier.fromString(messagePrimitives.id);
    return message;
  }

  public toPrimitives(): MessagePrimitives {
    return {
      id: this.id.toString(),
      user: this.user.toPrimitives(),
      content: this.content,
    };
  }
}
