import { BaseModel } from "./base.model";


export interface UserModel extends BaseModel {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}