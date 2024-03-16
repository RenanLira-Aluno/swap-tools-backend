import { UserModel } from "@app/database";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
import { IsEmailAlreadyInUse } from "../../validations/IsEmailAlreadyInUse.validator";


export class CreateUserDto implements Omit<UserModel, 'id' | 'created_at' | "updated_at"> {


    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsEmailAlreadyInUse()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;


}