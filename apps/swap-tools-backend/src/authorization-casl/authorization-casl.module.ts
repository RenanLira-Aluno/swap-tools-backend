import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability/casl-ability.factory';
import { PoliciesGuard } from './guards/policies.guard';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AuthorizationCaslModule { }
