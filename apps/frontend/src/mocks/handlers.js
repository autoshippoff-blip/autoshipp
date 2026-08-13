import { http, HttpResponse } from "msw";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const handlers = [
  http.get(
    `${API_URL}/organizations/:orgId/intelligence/scorecard`,
    ({ params, request }) => {
      const orgId = params.orgId || request.headers.get("x-organization-id");

      if (!orgId) {
        return HttpResponse.json(
          { message: "Unauthorized: Missing organization identifier" },
          { status: 401 },
        );
      }

      if (orgId === "trigger-404") {
        return HttpResponse.json(
          { message: "Scorecard not found" },
          { status: 404 },
        );
      }

      // Mocking the ScorecardResponseDto
      return HttpResponse.json({
        id: "scorecard_mock_123",
        organizationId: orgId,
        storeId: "store_mock_456",
        overallScore: 83,
        businessScore: 88,
        technicalScore: 82,
        marketingScore: 80,
        securityScore: 90,
        operationsScore: 74,
        calculatedAt: new Date().toISOString(),
      });
    },
  ),

  // Mocking the ReportResponseDto Array (AES-043 Slice 2)
  http.get(
    `${API_URL}/organizations/:orgId/intelligence/reports`,
    ({ params, request }) => {
      const orgId = params.orgId || request.headers.get("x-organization-id");

      if (!orgId) {
        return HttpResponse.json(
          { message: "Organization ID is required" },
          { status: 400 },
        );
      }

      if (orgId === "trigger-404") {
        return HttpResponse.json(
          { message: "Report not found" },
          { status: 404 },
        );
      }

      return HttpResponse.json([
        {
          id: "report_mock_789",
          organizationId: orgId,
          storeId: "store_mock_456",
          title: "Executive Intelligence Report - Mocked Brand Inc.",
          executiveSummary:
            "We analyzed your Shopify store and identified 14 opportunities.\n\nYour COD rejection rate (24.8%) is significantly above the industry benchmark (13.9%), resulting in an estimated ₹58,000 of lost revenue per month.\n\nYour mobile performance score is 48/100, and your average product page load time is 5.9 seconds, which likely contributes to conversion loss.\n\nBased on our analysis, implementing Delivery ETA and Returns Management could recover approximately ₹72,000/month with high confidence.",
          opportunitiesJson: [
            {
              title: "High COD Rejection & Abandonment",
              severity: "HIGH",
              estimatedMonthlyLoss: 58000,
              impactDescription:
                "COD rejection rate at 24.8%, exceeding the 13.9% industry benchmark.",
            },
            {
              title: "Fulfillment Processing Time",
              severity: "MEDIUM",
              estimatedMonthlyLoss: 14500,
              impactDescription:
                "Average fulfillment processing delay is 5.2 days.",
            },
          ],
          productRecommendations: [
            {
              productCode: "DELIVERY_ETA",
              productName: "AutoShipp Delivery ETA",
              roiEstimate: "Recover up to ₹34,800/month",
              confidence: "HIGH",
            },
            {
              productCode: "RETURNS_MANAGEMENT",
              productName: "AutoShipp Returns Management",
              roiEstimate: "Reduce return processing overhead by 45%",
              confidence: "MEDIUM",
            },
          ],
          tokenUsage: 1450,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
  ),

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
