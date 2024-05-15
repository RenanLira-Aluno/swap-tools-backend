import { UserModel } from "@app/database";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { IsEmailAlreadyInUse } from "../../validations/IsEmailAlreadyInUse.validator";
import { CreateAddressDto } from "./create-address.dto";


export class CreateUserDto implements Omit<UserModel, 'id' | 'created_at' | "updated_at" | "photo_id" | "address_id"> {

  @ApiProperty()
  @IsPhoneNumber('BR')
  phone?: string;

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

  @IsOptional()
  address?: CreateAddressDto;

  @IsEmpty()
  isAuthProvided?: boolean;


}
