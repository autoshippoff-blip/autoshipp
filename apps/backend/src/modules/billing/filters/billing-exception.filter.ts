import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PlanNotFoundException,
  InvoiceAlreadyIssuedException,
  InvalidInvoiceStateException,
  InvalidPaymentAmountException,
  PaymentFailedException,
  DuplicatePaymentException,
} from '../exceptions/billing.exceptions';

@Catch(
  PlanNotFoundException,
  InvoiceAlreadyIssuedException,
  InvalidInvoiceStateException,
  InvalidPaymentAmountException,
  PaymentFailedException,
  DuplicatePaymentException,
)
export class BillingExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof PlanNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (
      exception instanceof InvoiceAlreadyIssuedException ||
      exception instanceof InvalidInvoiceStateException ||
      exception instanceof DuplicatePaymentException
    ) {
      status = HttpStatus.CONFLICT;
    } else if (
      exception instanceof InvalidPaymentAmountException ||
      exception instanceof PaymentFailedException
    ) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
    });
  }
}
