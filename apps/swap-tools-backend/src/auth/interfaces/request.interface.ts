
import { Request } from "express";
import { JwtAuthUser } from "./jwt-auth-user.interface";


export interface AuthRequest extends Request {
    user: JwtAuthUser
}

export interface RefreshRequest extends Request {
    user: {
        sub: string;
        user: JwtAuthUser
        token_id: string
    }
}