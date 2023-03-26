import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // implement the PipeTransform interface
  transform(value: any, metadata: ArgumentMetadata) {
    // only validate when invoked with the request body
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value);
      if (error) {
        // augment the error response with the reason for validation failure
        throw new BadRequestException('Validation failed', {
          description: error.message,
        });
      }
    }
    return value;
  }
}
