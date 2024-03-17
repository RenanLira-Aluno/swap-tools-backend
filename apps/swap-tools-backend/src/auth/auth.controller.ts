import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiOkResponse, ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IsPublic } from './decorators/isPublic.decorator';



@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Get('me')
    async me(@Req() req) {
        return req.user;
    }

    @IsPublic()
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @IsPublic()
    @Post('signin')
    @HttpCode(200)
    @ApiUnauthorizedResponse({ description: 'Invalid credentials', })
    @ApiOkResponse({ description: 'User data' })
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
