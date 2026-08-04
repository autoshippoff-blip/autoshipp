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

export const intelligenceApi = {
  getScorecard: async (orgId) => {
    // We send organizationId as a query parameter for MSW mock to easily capture
    // Alternatively, it can be passed via headers.
    const url = new URL(`${API_URL}/api/intelligence/scorecard`);
    url.searchParams.append("organizationId", orgId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-organization-id": orgId,
      },
      credentials: "include",
    });
    return handleResponse(res);
  },
  getExecutiveReport: async (orgId) => {
    const url = new URL(`${API_URL}/api/intelligence/executive-report`);
    url.searchParams.append("organizationId", orgId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-organization-id": orgId,
      },
      credentials: "include",
    });
    return handleResponse(res);
  },
};
