import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from '@app/database';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthRequest } from '../auth/interfaces/request.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Tool]), MulterModule.register({
    dest: './upload',
    storage: diskStorage({
      destination: './upload',
      filename: (req: AuthRequest, file, cb) => {

        cb(null, `${req.user.id}-${file.originalname.split('.')[0]}.png`)
      }
    })
  })],
  controllers: [ToolsController],
  providers: [ToolsService]
})
export class ToolsModule { }
