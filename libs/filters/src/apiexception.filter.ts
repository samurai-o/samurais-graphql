import { ApiException } from '@app/exceptions';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ApiExceptionFilter<HttpException> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof ApiException) {
      this.apiexception(exception, host);
    }
    this.httpexception(exception, host);
  }
  apiexception(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    response.status(exception.getStatus()).json({
      errorCode: exception.getErrorCode(),
      errorMessage: exception.getErrorMessage(),
    });
  }
  httpexception(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    response.status(exception.getStatus()).json({
      errorCode: exception.getStatus(),
      errorMessage: '服务异常',
    });
  }
}
