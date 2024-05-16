import { AppAbility, Subjects } from "../../casl-ability/casl-ability.factory";

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
