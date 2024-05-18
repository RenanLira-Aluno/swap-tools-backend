import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "../casl-ability/casl-ability.factory";
import { PolicyHandler } from "../handlers/interface/policy-handler.handler";
import { CHECK_POLICIES_KEY } from "../decorators/check-policy.decorator";
import { GET_INSTANCE_KEY } from "../decorators/get-instance.decorator";
import { IGetInstanceHandler } from "../handlers/interface/get-instance-handler.handler";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(DataSource)
    private repo: DataSource
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const instance =
      this.reflector.get<IGetInstanceHandler>(
        GET_INSTANCE_KEY,
        context.getHandler()
      ) || null;

    const req = context.switchToHttp().getRequest();

    if (instance) {
      req[instance.entity.name] = await this.repo.getRepository(instance.entity).findOneBy({ [instance.by]: req.params[instance.by] })
    }

    const ability = this.caslAbilityFactory.createForUser(req.user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, req[instance.entity.name])
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, instance: any) {
    if (typeof handler === 'function') {
      return handler(ability,);
    }
    return handler.handle(ability, instance);
  }
}
