import { AddressModel } from "@app/database";
import { BaseModel } from "@app/database/models/base.model";
import { IsLatitude, IsNumberString, IsOptional, IsPostalCode, IsString } from "class-validator";


export class CreateAddressDto implements Omit<AddressModel, keyof BaseModel | 'user_id'> {


  @IsString()
  street: string;

  @IsNumberString()
  number: string;

  @IsOptional()
  complement: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsPostalCode('BR')
  zipCode: string;


  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLatitude()
  longitude?: number;

}
