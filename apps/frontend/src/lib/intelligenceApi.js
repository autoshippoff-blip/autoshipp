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
      throw new Error("NO_INTELLIGENCE_DATA");
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || errorData.message || "API request failed",
    );
  }
  return res.json();
};

export const intelligenceApi = {
  getScorecard: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/intelligence/scorecard`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  getReports: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/intelligence/reports`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  triggerScan: async (orgId, storeId = undefined) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/intelligence/scan`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId }),
        credentials: "include",
      },
    );
    return handleResponse(res);
  },

  downloadExport: async (orgId) => {
    const res = await fetch(
      `${API_URL}/organizations/${orgId}/intelligence/reports/export`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Export request failed");
    }

    // Extract filename from Content-Disposition header
    const disposition = res.headers.get("content-disposition");
    let filename = `autoshipp-intelligence-${orgId}.csv`;
    if (disposition && disposition.includes("filename=")) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Revoke Blob URL to prevent memory leaks
  },
};
