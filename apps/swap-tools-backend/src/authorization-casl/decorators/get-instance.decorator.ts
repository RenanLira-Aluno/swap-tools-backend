import { SetMetadata } from "@nestjs/common";


export const GET_INSTANCE_KEY = 'get_instance';

export const GetInstance = <T>(entity: any, by: keyof T) =>
  SetMetadata(GET_INSTANCE_KEY, { entity, by });
