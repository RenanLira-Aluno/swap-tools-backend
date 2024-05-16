import { RefreshToken, User } from '@app/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationCaslModule } from '../authorization-casl/authorization-casl.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthRequest } from '../auth/interfaces/request.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken]), AuthorizationCaslModule, MulterModule.register({
    dest: './upload',
    storage: diskStorage({
      destination: './upload',
      filename: (req: AuthRequest, file, cb) => {
        cb(null, `${req.user.id}.png`)
      }
    })
  })],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
