import { PhotoTool, Tool } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToolDto } from './dto/create-tool.dto';

@Injectable()
export class ToolsService {

  constructor(
    @InjectRepository(Tool)
    private toolsRepository: Repository<Tool>
  ) { }


  create(user_id: string, createToolDto: CreateToolDto, photos: Express.Multer.File[]) {


    const savePhotos = photos.map(photo => {
      const photoTool = new PhotoTool();
      photoTool.url = photo.path

      return photoTool;
    })

    const tool = this.toolsRepository.create({ ...createToolDto, user_id, photos: savePhotos });
    return this.toolsRepository.save(tool);

  }

  async getOne(id: string) {

    return this.toolsRepository.findOne({ where: { id }, relations: ['photos'] });
  }


}
