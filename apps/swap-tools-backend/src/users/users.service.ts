import { Address, PhotoUser, User } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({ ...createUserDto, password: password_hash });
    await this.usersRepository.save(user);

    return user;

  }

  async getAll() {

    return this.usersRepository.find({ select: ['id', 'name', 'email'] });
  }

  async getOne(id: string) {

    return this.usersRepository.findOne({ where: { id: id }, relations: ['photo'] });
  }

  async getOneByEmail(email: string) {

    return this.usersRepository.findOne({ where: { email } });
  }

  async emailExists(email: string) {

    return this.usersRepository.existsBy({ email })
  }

  async setProfilePhoto(id: string, path: string) {

    const user = await this.usersRepository.findOne({ where: { id }, relations: ['photo'] });

    if (!user.photo) {
      user.photo = new PhotoUser();
      user.photo.user = user;
    }

    user.photo.url = path;

    await this.usersRepository.save(user);

    return user;
  }

  async setAddress(id: string, address: CreateAddressDto) {

    const user = await this.usersRepository.findOne({ where: { id }, relations: ['address'] });

    if (!user.address) {
      user.address = new Address();
      user.address.user = user;
    }

    user.address = { ...user.address, ...address };


    return this.usersRepository.save(user);

  }

}
