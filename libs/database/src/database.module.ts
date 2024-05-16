import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, Photo, RefreshToken, Address, Tool, PhotoTool, PhotoUser } from './entities';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [RefreshToken, User, Address, Tool, PhotoTool, PhotoUser],
      synchronize: true,
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
