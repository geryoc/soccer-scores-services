import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message = this.getErrorMessage(exception, exceptionResponse);

    this.logError(request, status, exception, message);

    response
      .status(status)
      .json(this.createErrorResponse(status, message, request.url));
  }

  private getErrorMessage(
    exception: HttpException,
    exceptionResponse: string | object,
  ): unknown {
    if (
      exception instanceof BadRequestException &&
      this.isValidationError(exceptionResponse)
    ) {
      return exceptionResponse['message'];
    }
    return exception.message || null;
  }

  private logError(
    request: Request,
    status: number,
    exception: HttpException,
    message: unknown,
  ): void {
    const name = exception.name || null;
    const logMessage = `Exception - [${request.method}] ${request.url} - ${status} - ${name} - ${JSON.stringify(message)}`;

    if (this.isValidationError(exception.getResponse())) {
      this.logger.log(`Validation Error - ${logMessage}`);
    } else {
      this.logger.error(logMessage);
    }
  }

  private createErrorResponse(status: number, message: unknown, path: string) {
    return {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path,
    };
  }

  private isValidationError(exceptionResponse: string | object): boolean {
    return (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray(exceptionResponse['message'])
    );
  }
}
