import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtAuthUser } from '../interfaces/jwt-auth-user.interface';
import { AuthService } from '../auth.service';

type JwtPayload = {

    sub: string;
    user: JwtAuthUser
    token_id: string
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.jwt_refresh_secret,

            ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload) {
        await this.authService.checkRefreshToken(payload.token_id)

        return payload;
    }
}