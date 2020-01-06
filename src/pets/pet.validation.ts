import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const ALLOWED_PETS = ['DOG', 'CAT', 'CHICKEN', 'SNAKE'];

export function IsPet(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPet',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(pet: any, args: ValidationArguments) {
          return typeof pet === 'string' && ALLOWED_PETS.includes(pet);
        },
      },
    });
  };
}
