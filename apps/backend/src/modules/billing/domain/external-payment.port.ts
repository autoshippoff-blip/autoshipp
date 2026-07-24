export interface CreatePaymentIntentDto {
  invoiceId: string;
  amount: number; // In smallest currency unit (e.g., paise for INR)
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface PaymentIntentResult {
  providerReference: string; // The gateway's ID for the order/intent (e.g., 'order_xxx')
  amount: number;
  currency: string;
  status: string; // The gateway's status
}

export const EXTERNAL_PAYMENT_PORT = Symbol('EXTERNAL_PAYMENT_PORT');

export interface ExternalPaymentPort {
  /**
   * Creates a payment intent (or Order) on the external gateway.
   */
  createPaymentIntent(
    dto: CreatePaymentIntentDto,
  ): Promise<PaymentIntentResult>;

  /**
   * Verifies the authenticity of a webhook signature.
   */
  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret?: string,
  ): boolean;
}
