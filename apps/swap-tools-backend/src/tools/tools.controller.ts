import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageFilePiperBuilder } from '../pipes/image-file-piper-builder.pipe';
import { AuthRequest } from '../auth/interfaces/request.interface';
import { PoliciesGuard } from '../authorization-casl/guards/policies.guard';
import { CheckPolicies } from '../authorization-casl/decorators/check-policy.decorator';
import { ReadToolUnavailableHandle } from '../authorization-casl/handlers/read-tool-unavailable.handler';

@Controller('tools')
export class ToolsController {

  constructor(
    private toolsService: ToolsService
  ) { }



  @Post('')
  @UseInterceptors(FilesInterceptor('photos'))
  async create(@Req() request: AuthRequest, @Body() createToolDto: CreateToolDto, @UploadedFiles(ImageFilePiperBuilder) photos: Express.Multer.File[]) {


    return await this.toolsService.create(request.user.id, createToolDto, photos);
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  async getOne(@Param('id') id: string) {

    return await this.toolsService.getOne(id);

  }


}
