import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async create(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.usersService.create(createUserDto);
    }

    @Get()
    async getAll() {
        return this.usersService.getAll();
    }


}
