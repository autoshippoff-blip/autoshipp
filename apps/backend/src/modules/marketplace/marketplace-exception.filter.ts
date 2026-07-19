import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  MarketplaceException,
  ProductNotFoundException,
  ProductDeprecatedException,
  SubscriptionOverlapException,
  SubscriptionNotFoundException,
  SubscriptionInactiveException,
  AssignmentAlreadyExistsException,
  UnauthorizedHierarchyAssignmentException,
} from './exceptions/marketplace.exceptions';

@Catch(MarketplaceException)
export class MarketplaceExceptionFilter implements ExceptionFilter {
  catch(exception: MarketplaceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception instanceof ProductNotFoundException ||
      exception instanceof SubscriptionNotFoundException
    ) {
      status = HttpStatus.NOT_FOUND;
    } else if (
      exception instanceof SubscriptionOverlapException ||
      exception instanceof AssignmentAlreadyExistsException ||
      exception instanceof ProductDeprecatedException ||
      exception instanceof SubscriptionInactiveException
    ) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof UnauthorizedHierarchyAssignmentException) {
      status = HttpStatus.FORBIDDEN;
    } else {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
