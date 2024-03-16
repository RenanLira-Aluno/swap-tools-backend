import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database';
import { UsersModule } from './users/users.module';
import { IsEmailAlreadyInUseContraint } from './validations/IsEmailAlreadyInUse.validator';


@Module({
  imports: [DatabaseModule, UsersModule,],
  controllers: [AppController],
  providers: [AppService, IsEmailAlreadyInUseContraint],
})
export class AppModule { }
