export interface MongoUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  password: string;
}
