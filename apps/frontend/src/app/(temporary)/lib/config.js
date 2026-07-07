export const TEMP_CONFIG = {
  // Brand ID strategy: Isolated constant for the demo dashboard.
  // In a real environment, this would come from the auth context.
  BRAND_ID: process.env.NEXT_PUBLIC_TEMP_BRAND_ID || "momzcradle",

  // Base URL for the API
  API_BASE_URL:
    process.env.NEXT_PUBLIC_FEATURE_TWO_API_URL ||
    "https://shipping-automation.onrender.com/api/v1",

  // Mock Mode: Defaulting to true so the dashboard remains demonstrable.
  USE_MOCK_API: false,
};
