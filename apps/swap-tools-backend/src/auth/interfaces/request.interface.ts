
import { Request } from "express";
import { JwtAuthUser } from "./jwtAuthUser.interface";


export interface AuthRequest extends Request {
    user: JwtAuthUser
}