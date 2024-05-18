import { Tool, User } from "@app/database";
import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "../enums/action.enum";
import { ToolStatus } from "@app/database/models/enum/tool-status.enum";

export type Subjects = InferSubjects<typeof User | typeof Tool | 'all'>;

export type AppAbility = MongoAbility<[Action, Subjects], MongoQuery>

@Injectable()
export class CaslAbilityFactory {

  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility<[Action, Subjects], MongoQuery>)


    if (user.isAdmin) {
      can(Action.Manage, 'all')
    }

    can(Action.Read, Tool, { status: ToolStatus.AVAILABLE })

    can(Action.Manage, Tool, { status: ToolStatus.UNAVAILABLE, user_id: user.id })

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    })

  }



}
