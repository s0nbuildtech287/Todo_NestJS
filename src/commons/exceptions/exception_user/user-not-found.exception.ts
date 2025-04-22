import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id?: number | string) {
    super(`User${id ? ` with id ${id}` : ''} not found`);
  }
}