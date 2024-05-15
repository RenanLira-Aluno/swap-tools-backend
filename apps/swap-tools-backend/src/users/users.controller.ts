import { Body, Controller, Get, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from '../auth/interfaces/request.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PoliciesGuard } from '../authorization-casl/guards/policies.guard';
import { CheckPolicies } from '../authorization-casl/decorators/check-policy.decorator';
import { ReadAllUsersPolicyHandler } from '../authorization-casl/handlers/read-all-users-policy.handler';

@ApiTags('User')

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }



  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new ReadAllUsersPolicyHandler())
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
  async uploadPhoto(@Req() req: AuthRequest, @UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'image/png' }).build()) photo: Express.Multer.File) {

    const user = await this.usersService.setProfilePhoto(req.user.id, photo.path);

    return { user }

  }


}
