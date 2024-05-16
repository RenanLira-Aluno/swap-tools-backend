import { PhotoModel, ToolModel } from "@app/database";
import { BaseModel } from "@app/database/models/base.model";
import { ToolCondition } from "@app/database/models/enum/tool-condition.enum";
import { ToolStatus } from "@app/database/models/enum/tool-status.enum";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";




export class CreateToolDto implements Omit<ToolModel, keyof BaseModel | 'photos' | 'user_id'> {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ToolCondition)
  @IsNotEmpty()
  condition: ToolCondition;

  @IsEnum(ToolStatus)
  @IsNotEmpty()
  status: ToolStatus;


}
