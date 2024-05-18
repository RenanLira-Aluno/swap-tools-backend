import { Body, Controller, FileTypeValidator, Get, HttpCode, Inject, OnModuleInit, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IsPublic } from './decorators/isPublic.decorator';
import { AuthRequest, RefreshRequest } from './interfaces/request.interface';
import { SignInResponse } from './interfaces/responses/signIn.response';

import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Client, ClientKafka, ClientsModule } from '@nestjs/microservices';


@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {

  constructor(
    private authService: AuthService,
    @Inject('NOTIFICATIONS_SERVICE')
    private clientKafka: ClientKafka
  ) { }


  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('notifications.signup');
    await this.clientKafka.connect();
  }


  @ApiOkResponse({ description: 'User data' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials', })
  @Get('me')
  async me(@Req() req: AuthRequest) {
    return await this.authService.me(req.user);
  }

  @IsPublic()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiUnauthorizedResponse({ description: 'Invalid credentials', })
  @ApiOkResponse({ description: 'User data', type: SignInResponse })
  @IsPublic()
  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {

    return this.authService.signIn(signInDto);
  }

  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: RefreshRequest) {
    return await this.authService.refreshToken(req.user.token_id, req.user.user)
  }



  @IsPublic()
  @HttpCode(200)
  @ApiOkResponse({ description: 'access and refresh token', type: SignInResponse })
  @Post('login-firebase/:token')
  async testeFire(@Param('token') token: string) {

    const res = await this.authService.firebaseSignIn(token)

    return res;
  }



}
