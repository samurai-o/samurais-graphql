import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(
    readonly message: string,
    private readonly code: number,
    status: number,
  ) {
    super(message, status);
  }

  getErrorMessage() {
    return this.message;
  }

  getErrorCode() {
    return this.code;
  }
}
