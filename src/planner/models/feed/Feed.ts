import { FeedPrimitives } from "./FeedPrimitives";
import { Message } from "../message/Message";
import { Identifier } from "../Identifier";
import { User } from "../user/User";

export class Feed {
  private id: Identifier;
  private messages: Message[];

  constructor() {
    this.id = new Identifier();
  }

  public static fromPrimitives(feedPrimitives: FeedPrimitives): Feed {
    const feed = new Feed();

    feed.id = Identifier.fromString(feedPrimitives.id);
    feed.messages = feedPrimitives.messages.map((msg) =>
      Message.fromPrimitives(msg)
    );
    return feed;
  }

  public toPrimitives(): FeedPrimitives {
    return {
      id: this.id.toString(),
      messages: this.messages.map((message) => message.toPrimitives()),
    };
  }

  post(user: User, content: string) {
    this.messages.push(new Message(user, content));
  }

  getMessages() {
    return this.messages;
  }
}
