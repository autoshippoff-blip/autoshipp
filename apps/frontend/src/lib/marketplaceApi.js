const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (res.status === 404) {
      throw new Error(errorData.message || "Resource not found");
    }
    if (res.status === 403) {
      throw new Error(errorData.message || "Permission denied");
    }
    if (res.status === 409) {
      throw new Error(errorData.message || "Conflict detected");
    }
    throw new Error(errorData.message || "API request failed");
  }
  return res.status === 204 ? null : res.json();
};

export const marketplaceApi = {
  /**
   * Admin Registry Access
   */
  registerProduct: async (dto) => {
    const res = await fetch(`${API_URL}/admin/marketplace/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
      credentials: "include",
    });
    return handleResponse(res);
  },

  updateProductMetadata: async (id, dto) => {
    const res = await fetch(
      `${API_URL}/admin/marketplace/products/${id}/metadata`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  deprecateProduct: async (id) => {
    const res = await fetch(
      `${API_URL}/admin/marketplace/products/${id}/deprecate`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  listAllProducts: async () => {
    const res = await fetch(`${API_URL}/admin/marketplace/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  /**
   * Brand Self-Service Access
   */
  getMyCatalog: async () => {
    const res = await fetch(`${API_URL}/marketplace/me/catalog`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  getMyAssignments: async () => {
    const res = await fetch(`${API_URL}/marketplace/me/assignments`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(res);
  },

  purchaseSubscription: async (dto) => {
    const res = await fetch(`${API_URL}/marketplace/me/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
      credentials: "include",
    });
    return handleResponse(res);
  },

  /**
   * Aggregator Management Access
   */
  getManagedCatalog: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/marketplace/catalog`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  getManagedAssignments: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/marketplace/assignments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  assignSubscription: async (orgId, subscriptionId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/marketplace/assignments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  revokeAssignment: async (orgId, subscriptionId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/marketplace/assignments/${subscriptionId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },
};
