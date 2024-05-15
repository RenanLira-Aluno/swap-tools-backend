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
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthRequest } from './interfaces/request.interface';
import { FirebaseModule } from '@app/firebase';

@Module({
  imports: [UsersModule, FirebaseModule, PassportModule, JwtModule.register({}), TypeOrmModule.forFeature([RefreshToken]), MulterModule.register({
    dest: './upload',
    storage: diskStorage({
      destination: './upload',
      filename: (req: AuthRequest, file, cb) => {
        cb(null, `${req.user.id}.png`)
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, LocalStrategy]
})
export class AuthModule { }
