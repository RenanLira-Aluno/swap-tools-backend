import { AddressModel } from "@app/database";
import { BaseModel } from "@app/database/models/base.model";
import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsNumberString, IsOptional, IsPostalCode, IsString } from "class-validator";


export class CreateAddressDto implements Omit<AddressModel, keyof BaseModel | 'user_id'> {


  @IsString()
  @ApiProperty()
  street: string;

  @IsNumberString()
  @ApiProperty()
  number: string;

  @IsOptional()
  @ApiProperty()
  complement: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsPostalCode('BR')
  @ApiProperty()
  zipCode: string;


  @IsOptional()
  @IsLatitude()
  @ApiProperty()
  latitude?: number;

  @IsOptional()
  @IsLatitude()
  @ApiProperty()
  longitude?: number;

}
