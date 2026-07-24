/**
 * Formats a decimal string amount into currency format
 * @param {string} amount
 * @param {string} currencyCode
 */
export const formatCurrency = (amount, currencyCode = "USD") => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(numericAmount);
};

/**
 * Formats a Date object or ISO string into a display date
 * @param {string|Date} date
 */
export const formatDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
};

/**
 * Translates backend InvoiceStatus to UI labels and colors
 * @param {string} status
 */
export const getInvoiceStatusBadge = (status) => {
  switch (status) {
    case "DRAFT":
      return {
        label: "Draft",
        color: "bg-gray-100 text-gray-800 border-gray-200",
      };
    case "ISSUED":
      return {
        label: "Issued",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      };
    case "PAID":
      return {
        label: "Paid",
        color: "bg-green-100 text-green-800 border-green-200",
      };
    case "PARTIALLY_PAID":
      return {
        label: "Partially Paid",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      };
    case "OVERDUE":
      return {
        label: "Overdue",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    case "VOID":
      return {
        label: "Void",
        color: "bg-zinc-100 text-zinc-800 border-zinc-200",
      };
    default:
      return {
        label: status,
        color: "bg-gray-100 text-gray-800 border-gray-200",
      };
  }
};
