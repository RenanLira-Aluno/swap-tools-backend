import { BaseModel } from "./base.model"


export interface RefreshTokenModel extends BaseModel {
    jwt: string
    user_id: string
    expires_at?: Date
    revoked_at?: Date
}