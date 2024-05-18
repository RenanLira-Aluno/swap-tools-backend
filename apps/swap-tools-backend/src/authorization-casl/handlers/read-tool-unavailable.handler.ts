import { Tool } from "@app/database";
import { AppAbility } from "../casl-ability/casl-ability.factory";
import { Action } from "../enums/action.enum";
import { IPolicyHandler } from "./interface/policy-handler.handler";



export class ReadToolUnavailableHandle implements IPolicyHandler {
  handle(ability: AppAbility, entity?: any): boolean {

    return ability.can(Action.Read, entity, 'status')
  }


}
