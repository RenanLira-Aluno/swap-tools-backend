import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.originalname) {
      throw new BadRequestException('Invalid file');
    }

    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = value.originalname.split('.').pop();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Invalid file extension');
    }

    return value;
  }
}
