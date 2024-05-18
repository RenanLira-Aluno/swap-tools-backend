import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability/casl-ability.factory';
import { PoliciesGuard } from './guards/policies.guard';

@Global()
@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AuthorizationCaslModule { }
