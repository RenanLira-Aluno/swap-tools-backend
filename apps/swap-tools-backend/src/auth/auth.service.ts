import { User } from '@app/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { ApiBody } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }


    @ApiBody({ type: SignUpDto })
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const user = await this.usersService.create(signUpDto);

        return user;
    }

    @ApiBody({ type: SignInDto })
    async signIn(signInDto: SignInDto) {

        const user = await this.usersService.getOneByEmail(signInDto.email);

        if (!user || !await bcrypt.compare(signInDto.password, user.password)) {

            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwtService.signAsync({ sub: user.id, user: { ...user, password: undefined } })

        return {
            access_token: token
        }
    }

    // async refreshToken(user: User) {
    //     return this.jwtService.sign({ sub: user.id, user: { ...user, password: undefined } })
    // }


}
