import { FullName } from "../../types/FullName";

export interface UserDocument {
  id: string;
  name: FullName;
  email: string;
  phoneNumber: string;
  password: string;
}
