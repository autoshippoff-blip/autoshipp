export class PlanNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Plan not found for identifier: ${identifier}`);
    this.name = 'PlanNotFoundException';
  }
}

export class InvoiceAlreadyIssuedException extends Error {
  constructor(invoiceId: string) {
    super(
      `Invoice ${invoiceId} has already been issued and cannot be modified.`,
    );
    this.name = 'InvoiceAlreadyIssuedException';
  }
}

export class InvalidInvoiceStateException extends Error {
  constructor(invoiceId: string, currentState: string, targetState: string) {
    super(
      `Invalid transition for invoice ${invoiceId}: Cannot transition from ${currentState} to ${targetState}.`,
    );
    this.name = 'InvalidInvoiceStateException';
  }
}

export class InvalidPaymentAmountException extends Error {
  constructor(invoiceId: string, amount: number, remainingBalance: number) {
    super(
      `Payment amount ${amount} exceeds remaining balance ${remainingBalance} for invoice ${invoiceId}.`,
    );
    this.name = 'InvalidPaymentAmountException';
  }
}

export class PaymentFailedException extends Error {
  constructor(invoiceId: string, reason: string) {
    super(`Payment for invoice ${invoiceId} failed: ${reason}`);
    this.name = 'PaymentFailedException';
  }
}

export class DuplicatePaymentException extends Error {
  constructor(idempotencyKey: string) {
    super(
      `Payment with idempotency key ${idempotencyKey} has already been processed.`,
    );
    this.name = 'DuplicatePaymentException';
  }
}
