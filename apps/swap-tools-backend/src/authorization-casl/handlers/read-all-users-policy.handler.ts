import { User } from "@app/database";
import { AppAbility } from "../casl-ability/casl-ability.factory";
import { Action } from "../enums/action.enum";
import { IPolicyHandler } from "./interface/policy-handler.handler";


export class ReadAllUsersPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, User);
  }
}
