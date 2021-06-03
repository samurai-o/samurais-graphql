import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata || !this.checkValidation(metadata.metatype)) return value;
    const classFunc = plainToClass(metadata.metatype, value);
    const message = await validate(classFunc);
    console.log(message);
    if (message.length <= 0) return value;
    const [errors] = Object.values(message.shift().constraints);
    throw new BadRequestException(errors);
  }

  checkValidation(type: any) {
    return ![String, Boolean, Object, Array, Number, Function].includes(type);
  }
}
