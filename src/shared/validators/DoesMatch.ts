import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function DoesMatch(property: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "DoesMatch",
      constraints: [property],
      target: object.constructor,
      propertyName: propertyName,
      options: { message: `${propertyName} must be equal to ${property}`, ...validationOptions },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return value === relatedValue;
        },
      },
    });
  };
}
