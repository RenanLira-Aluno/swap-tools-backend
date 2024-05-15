import { RefreshToken, User } from '@app/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationCaslModule } from '../authorization-casl/authorization-casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken]), AuthorizationCaslModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
