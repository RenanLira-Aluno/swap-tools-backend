import { BaseModel } from "./base.model";
import { ToolCondition } from "./enum/tool-condition.enum";
import { ToolStatus } from "./enum/tool-status.enum";
import { PhotoModel } from "./photo.model";


export interface ToolModel extends BaseModel {
  user_id: string;
  name: string;
  description: string;
  photos: PhotoModel[];
  condition: ToolCondition;
  status: ToolStatus;

}
