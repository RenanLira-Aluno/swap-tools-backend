import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from '../auth/interfaces/request.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PoliciesGuard } from '../authorization-casl/guards/policies.guard';
import { CheckPolicies } from '../authorization-casl/decorators/check-policy.decorator';
import { ReadAllUsersPolicyHandler } from '../authorization-casl/handlers/read-all-users-policy.handler';
import { ImageFilePiperBuilder } from '../pipes/image-file-piper-builder.pipe';

@ApiTags('User')

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }



  @Get()
  @UseGuards(PoliciesGuard)

  async getAll() {
    return this.usersService.getAll();
  }


  @Post('address')
  @ApiOperation({ summary: 'Cria ou atualiza endereço do usuario' })
  @ApiCreatedResponse({ description: 'Endereço criado com sucesso' })
  async setAddress(@Req() req: AuthRequest, @Body() body: CreateAddressDto) {

    return await this.usersService.setAddress(req.user.id, body);
  }

  @Post('profile-photo')
  @ApiOperation({ summary: 'Upload de foto de perfil do usuario' })
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(@Req() req: AuthRequest, @UploadedFile(ImageFilePiperBuilder) photo: Express.Multer.File) {

    const user = await this.usersService.setProfilePhoto(req.user.id, photo.path);

    return { user }

  }


}
