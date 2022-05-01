import { UserPrimitives } from "../user/UserPrimitives";

export interface MessagePrimitives {
  id: string;
  user: UserPrimitives;
  content: string;
}
