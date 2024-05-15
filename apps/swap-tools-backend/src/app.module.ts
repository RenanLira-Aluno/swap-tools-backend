import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database';
import { UsersModule } from './users/users.module';
import { IsEmailAlreadyInUseContraint } from './validations/IsEmailAlreadyInUse.validator';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { AuthorizationCaslModule } from './authorization-casl/authorization-casl.module';


@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, AuthorizationCaslModule],
  controllers: [AppController],
  providers: [AppService, IsEmailAlreadyInUseContraint, {
    provide: APP_GUARD,
    useClass: AccessTokenGuard
  }],
})
export class AppModule { }
