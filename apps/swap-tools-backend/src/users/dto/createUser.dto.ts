import { UserModel } from "@app/database";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { IsEmailAlreadyInUse } from "../../validations/IsEmailAlreadyInUse.validator";


export class CreateUserDto implements Omit<UserModel, 'id' | 'created_at' | "updated_at" | "photo_id" | "address_id"> {

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

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
