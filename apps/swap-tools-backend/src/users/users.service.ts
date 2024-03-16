import { User } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

import * as bcrypt from 'bcrypt';

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
    }

    async getAll() {

        return this.usersRepository.find({ select: ['id', 'name', 'email'] });
    }

    async emailExists(email: string) {

        return this.usersRepository.existsBy({ email })
    }


}
