import { BaseModel } from "./base.model";


export interface UserModel extends BaseModel {
  name: string;
  email: string;
  password: string;
  photo_id: string;
  address_id: string;
}
