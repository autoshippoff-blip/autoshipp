const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const handleResponse = async (res) => {
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Wallet not found");
    }
    if (res.status === 403) {
      throw new Error("Permission denied");
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }
  return res.json();
};

export const walletApi = {
  /**
   * Brand Access
   */
  getMyBalance: async () => {
    const res = await fetch(`${API_URL}/wallet/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  getMyTransactions: async (page = 1, limit = 20) => {
    const res = await fetch(
      `${API_URL}/wallet/me/transactions?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  /**
   * Aggregator Access
   */
  getManagedBalance: async (orgId) => {
    const res = await fetch(`${API_URL}/organizations/${orgId}/wallet`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  getManagedTransactions: async (orgId, page = 1, limit = 20) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/wallet/transactions?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },
};
