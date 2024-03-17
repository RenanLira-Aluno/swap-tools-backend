import { UserModel } from "@app/database";


export interface JwtAuthUser extends Omit<UserModel, 'password'> { }