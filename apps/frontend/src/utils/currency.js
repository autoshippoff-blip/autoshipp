/**
 * Safely formats a decimal string from the backend into a localized currency string.
 * @param {string} amountString - The stringified decimal from the backend (e.g., "150.00")
 * @param {string} currencyCode - The 3-letter currency code (e.g., "USD", "INR")
 * @returns {string} - The formatted currency string
 */
export function formatCurrency(amountString, currencyCode = "USD") {
  if (!amountString) return "-";

  // Safely parse without float mutation for display purposes
  const amount = parseFloat(amountString);

  if (isNaN(amount)) return "-";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
