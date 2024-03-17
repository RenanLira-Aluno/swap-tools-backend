import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IsPublic } from './decorators/isPublic.decorator';
import { AuthRequest } from './interfaces/request.interface';
import { SignInResponse } from './interfaces/responses/signIn.response';


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
    @ApiOkResponse({ description: 'User data', type: SignInResponse })
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        return this.authService.signIn(signInDto);
    }

    // @Post('refresh-token')
    // async refreshToken(@Req() req: AuthRequest, @Res() res) {
    //     const token = await this.authService.refreshToken(req.user);
    //     res.cookie('access_token', token, { httpOnly: true });
    //     return { access_token: token };

    // }
}
