import { BaseModel } from "./base.model";


export interface UserModel extends BaseModel {
  name: string;
  email: string;
  password: string;
  phone?: string;
  photo_id: string;
  address_id: string;
  isAuthProvided?: boolean;
  isAdmin: boolean;
}
