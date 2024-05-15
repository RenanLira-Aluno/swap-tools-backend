import { User } from "@app/database";
import { AbilityBuilder, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "../enums/action.enum";

type Subjects = InferSubjects<typeof User | 'all'>;
export type AppAbility = PureAbility<[Action, Subjects]>


@Injectable()
export class CaslAbilityFactory {

  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility)


    if (user.isAdmin) {
      can(Action.Manage, 'all')
    }

    // cannot(Action.Read, User, 'all')

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    })

  }



}
