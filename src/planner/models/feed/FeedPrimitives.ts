import { MessagePrimitives } from "../message/MessagePrimitives";

export interface FeedPrimitives {
  id: string;
  messages: MessagePrimitives[];
}
