import { PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException("No data submitted");
    }

    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        { message: "Input data validation failed", errors: this.buildError(errors) },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private buildError(errors) {
    const result = {};

    errors.forEach(({ property, constraints }) => {
      Object.entries(constraints).forEach(([_, error]) => {
        result[property] = error;
      });
    });

    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.find((type) => metatype === type);
  }
}
