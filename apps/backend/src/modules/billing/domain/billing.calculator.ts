import { Prisma } from '@prisma/client';
type Decimal = Prisma.Decimal;
const Decimal = Prisma.Decimal;

export class BillingCalculator {
  static calculateSubtotal(
    items: { unitPrice: Decimal | number; quantity: number }[],
  ): Decimal {
    let subtotal = new Decimal(0);
    for (const item of items) {
      const price = new Decimal(item.unitPrice.toString());
      const quantity = new Decimal(item.quantity);
      subtotal = subtotal.add(price.mul(quantity));
    }
    return subtotal;
  }

  static calculateGrandTotal(
    subtotal: Decimal | number,
    tax: Decimal | number,
    discount: Decimal | number,
  ): Decimal {
    const sub = new Decimal(subtotal.toString());
    const t = new Decimal(tax.toString());
    const d = new Decimal(discount.toString());
    return sub.add(t).sub(d);
  }

  static calculateRemainingBalance(
    grandTotal: Decimal | number,
    successfulPayments: Decimal[] | number[],
  ): Decimal {
    const total = new Decimal(grandTotal.toString());
    let paid = new Decimal(0);
    for (const payment of successfulPayments) {
      paid = paid.add(new Decimal(payment.toString()));
    }
    return total.sub(paid);
  }
}
