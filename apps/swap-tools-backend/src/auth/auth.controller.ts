import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IsPublic } from './decorators/isPublic.decorator';
import { AuthRequest, RefreshRequest } from './interfaces/request.interface';
import { SignInResponse } from './interfaces/responses/signIn.response';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }


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
}
