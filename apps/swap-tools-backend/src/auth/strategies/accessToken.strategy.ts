import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthUser } from '../interfaces/jwt-auth-user.interface';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';


type JwtPayload = {
  sub: string;
  user: JwtAuthUser
}


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.jwt_access_secret,
      ignoreExpiration: false,
    });
  }


  authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, options?: any): void {
    const token = req.headers.authorization?.split(' ')[1];

    const payload = this.jwtService.decode(token)

    if (payload?.exp < Date.now() / 1000) {
      throw new HttpException('Token expired', 498)
    }

    super.authenticate(req, options);
  }

  validate(payload: JwtPayload) {
    return payload.user;
  }
}
