import { BaseModel } from "./base.model";

export interface PhotoModel extends BaseModel {

  user_id: string;
  url: string;

}
