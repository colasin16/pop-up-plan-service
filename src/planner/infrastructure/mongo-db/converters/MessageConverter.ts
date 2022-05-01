import { ObjectId } from "mongodb";
import { User } from "../../../models/user/User";
import { MongoUserConverter } from "./UserConverter";
import { Message } from "../../../models/message/Message";
import { MongoMessage } from "../models/MongoMessage";
import { MessagePrimitives } from "../../../models/message/MessagePrimitives";

export class MongoMessageConverter {
  static toMongo(message: Message): MongoMessage {
    const messagePrimitives = message.toPrimitives();

    return {
      _id: new ObjectId(messagePrimitives.id.toString()),
      user: MongoUserConverter.toMongo(
        User.fromPrimitives(messagePrimitives.user)
      ),
      content: messagePrimitives.content,
    };
  }

  static toDomain(mongoMessage: MongoMessage): Message {
    const messagePrimitives: MessagePrimitives = {
      id: mongoMessage._id.toString(),
      user: MongoUserConverter.toDomain(mongoMessage.user).toPrimitives(),
      content: mongoMessage.content,
    };

    return Message.fromPrimitives(messagePrimitives);
  }

  static manyToDomain(mongoMessages: MongoMessage[]): Message[] {
    return mongoMessages.map((message) => this.toDomain(message));
  }

  static manyToMongo(messages: Message[]): MongoMessage[] {
    return messages.map((message) => this.toMongo(message));
  }
}
