import { http, HttpResponse } from "msw";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const handlers = [
  http.get(`${API_URL}/api/intelligence/scorecard`, ({ request }) => {
    const url = new URL(request.url);
    const orgId = url.searchParams.get("organizationId");
    const orgHeader = request.headers.get("x-organization-id");

    if (!orgId && !orgHeader) {
      return HttpResponse.json(
        { message: "Unauthorized: Missing organization identifier" },
        { status: 401 },
      );
    }

    if (orgId === "trigger-404" || orgHeader === "trigger-404") {
      return HttpResponse.json(
        { message: "Scorecard not found" },
        { status: 404 },
      );
    }

    // Mocking the ScorecardResponseDto
    return HttpResponse.json({
      id: "scorecard_mock_123",
      organizationId: orgId || orgHeader,
      storeId: "store_mock_456",
      overallScore: 83,
      businessScore: 88,
      technicalScore: 82,
      marketingScore: 80,
      securityScore: 90,
      operationsScore: 74,
      calculatedAt: new Date().toISOString(),
    });
  }),

  // Add mock for /auth/me to allow development bypass of login screen
  http.get(`${API_URL}/auth/me`, () => {
    return HttpResponse.json({
      id: "user_mock_1",
      email: "brand@autoshipp.com",
      role: "brand",
      organizationId: "org_mock_123",
      organization: {
        id: "org_mock_123",
        name: "Mocked Brand Inc.",
      },
    });
  }),

  // Add mock for /auth/login
  http.post(`${API_URL}/auth/login`, () => {
    return HttpResponse.json({
      user: {
        id: "user_mock_1",
        email: "brand@autoshipp.com",
        role: "brand",
        organizationId: "org_mock_123",
      },
    });
  }),
];
