const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const handleResponse = async (res) => {
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (res.status === 403) {
      throw new Error("Permission denied");
    }
    if (res.status === 404) {
      throw new Error("Resource not found");
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || errorData.message || "API request failed",
    );
  }
  return res.json();
};

const generateIdempotencyKey = () => {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15);
};

export const billingApi = {
  /**
   * Admin Operations
   */
  createPlan: async (payload) => {
    const res = await fetch(`${API_URL}/admin/billing/plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return handleResponse(res);
  },

  addPlanPrice: async (planId, payload) => {
    const res = await fetch(`${API_URL}/admin/billing/plans/${planId}/prices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return handleResponse(res);
  },

  getPlanPrices: async (planId) => {
    const res = await fetch(`${API_URL}/admin/billing/plans/${planId}/prices`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  issueInvoice: async (invoiceId) => {
    const res = await fetch(
      `${API_URL}/admin/billing/invoices/${invoiceId}/issue`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  /**
   * Organization Operations
   */
  getInvoices: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/billing/invoices`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  getInvoice: async (orgId, invoiceId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/billing/invoices/${invoiceId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  processPayment: async (orgId, invoiceId, paymentMethodId) => {
    const idempotencyKey = generateIdempotencyKey();

    const res = await fetch(
      `${API_URL}/organizations/${orgId}/billing/invoices/${invoiceId}/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({ paymentMethodId }),
        credentials: "include",
      },
    );
    return handleResponse(res);
  },
};
