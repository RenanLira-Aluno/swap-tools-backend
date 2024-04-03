import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from '@app/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), TypeOrmModule.forFeature([RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, LocalStrategy]
})
export class AuthModule { }
