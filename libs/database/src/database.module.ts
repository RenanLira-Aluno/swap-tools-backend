import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Anuncio } from './entities/anuncio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [User, Anuncio],
      synchronize: true,
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
