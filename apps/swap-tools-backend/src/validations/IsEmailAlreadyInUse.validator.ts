import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { User } from "@app/database";


@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyInUseContraint implements ValidatorConstraintInterface {

    constructor(
        private entityManager: EntityManager
    ) { }

    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return this.entityManager.getRepository(User).existsBy({ email: value }).then(exists => !exists);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'Email already in use';
    }
}

export function IsEmailAlreadyInUse(validateOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validateOptions,
            constraints: [],
            validator: IsEmailAlreadyInUseContraint,
            name: 'IsEmailAlreadyInUseContraint'
        });
    }
}