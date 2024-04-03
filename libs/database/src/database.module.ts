import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refreshToken.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [RefreshToken, User],
      synchronize: true,
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
