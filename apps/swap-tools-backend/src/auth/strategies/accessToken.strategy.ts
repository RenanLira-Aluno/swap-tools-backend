import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthUser } from '../interfaces/jwt-auth-user.interface';
import { jwtConstants } from '../constants';


type JwtPayload = {

    sub: string;
    user: JwtAuthUser
}


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.jwt_access_secret,
            ignoreExpiration: false
        });
    }

    validate(payload: JwtPayload) {
        return payload.user;
    }
}