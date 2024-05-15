import { User } from '@app/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthUser } from './interfaces/jwt-auth-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '@app/database/entities';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CreateAddressDto } from '../users/dto/create-address.dto';
import { FirebaseService } from '@app/firebase';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>
  ) { }



  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.usersService.create(signUpDto);

    return user;
  }

  async me(user: JwtAuthUser) {

    const me = await this.usersService.getOne(user.id)

    return {
      ...me,
      photo_id: undefined,
      password: undefined
    }
  }


  async signIn(signInDto: SignInDto) {

    const user = await this.usersService.getOneByEmail(signInDto.email);

    if (!user || !await bcrypt.compare(signInDto.password, user.password)) {

      throw new UnauthorizedException('Invalid credentials');
    }

    const [token, refreshToken] = await this.generateToken(user)

    return {
      access_token: token,
      refresh_token: refreshToken
    }
  }


  private async generateToken(user: JwtAuthUser) {

    const uuid = randomUUID()
    const refreshToken = await this.jwtService.signAsync({ sub: user.id, user: { ...user, password: undefined }, token_id: uuid }, { secret: jwtConstants.jwt_refresh_secret, expiresIn: '7d' })

    await this.refreshTokenRepository.save({ jwt: refreshToken, user_id: user.id, id: uuid })


    return Promise.all([
      this.jwtService.signAsync({ sub: user.id, user: { ...user, password: undefined } }, { secret: jwtConstants.jwt_access_secret, expiresIn: '15m' }),
      refreshToken
    ])

  }

  async refreshToken(tokenId: string, user: JwtAuthUser) {
    const token = await this.refreshTokenRepository.findOne({ where: { id: tokenId } })

    if (!token) {
      throw new UnauthorizedException('Invalid token')
    }

    await this.refreshTokenRepository.update({ id: tokenId }, { revoked_at: new Date() })

    const [access_token, refresh_token] = await this.generateToken(user)

    return {
      access_token,
      refresh_token
    }
  }

  async checkRefreshToken(token_id: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({ where: { id: token_id } })

    if (!refreshToken || refreshToken.revoked_at) {
      throw new UnauthorizedException('Invalid token')
    }

    return refreshToken

  }


  async firebaseSignIn(token: string) {
    const firebaseUser = await this.firebaseService.verifyIdToken(token)

    let user = await this.usersService.getOneByEmail(firebaseUser.email)

    if (!user) {
      user = await this.usersService.create({
        name: firebaseUser.name,
        email: firebaseUser.email,
        password: firebaseUser.uid,
        isAuthProvided: true
      })
    }

    const [access_token, refresh_token] = await this.generateToken(user)

    return {
      access_token,
      refresh_token
    }


  }

}
