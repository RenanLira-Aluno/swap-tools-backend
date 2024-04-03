import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { JwtAuthUser } from "../interfaces/jwt-auth-user.interface";


export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<TUser = JwtAuthUser>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw new UnauthorizedException(err?.message || 'Invalid credentials');
        }

        return user;
    }
}