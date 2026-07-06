import { TEMP_CONFIG } from "./config";

// Mock Data
const MOCK_DATA = {
  whatsapp: {
    QUEUED: 0,
    SENT: 6963,
    DELIVERED: 10000,
    READ: 4000,
    FAILED: 433,
  },
  calls: {
    INITIATED: 120,
    ANSWERED: 85,
    COMPLETED: 70,
    NO_ANSWER: 20,
    FAILED: 15,
  },
  activity: [
    {
      type: "whatsapp",
      id: "60d5ec1",
      recipient: "919876543210",
      status: "DELIVERED",
      messageType: "GENERAL",
      timestamp: "2026-07-06T10:15:30.000Z",
    },
    {
      type: "call",
      id: "60d5ec2",
      recipient: "919876543211",
      status: "COMPLETED",
      messageType: "VOICE",
      timestamp: "2026-07-06T09:30:00.000Z",
    },
  ],
  campaigns: [
    {
      campaignId: "camp_12345",
      name: "Summer Dresses 2026",
      templateName: "founder_message_dresses",
      status: "COMPLETED",
      stats: {
        total: 5400,
        sent: 5363,
        delivered: 4800,
        read: 2100,
        failed: 37,
      },
    },
    {
      campaignId: "camp_12346",
      name: "Winter Collection Preview",
      templateName: "winter_preview_01",
      status: "QUEUED",
      stats: { total: 10000, sent: 0, delivered: 0, read: 0, failed: 0 },
    },
  ],
  templates: [
    {
      name: "founder_message_dresses",
      category: "MARKETING",
      status: "APPROVED",
      language: "en",
    },
    {
      name: "seasonal_sale_01",
      category: "MARKETING",
      status: "APPROVED",
      language: "en_US",
    },
  ],
  inbox: [
    {
      phoneNumber: "919876543210",
      lastMessage: "Yes, I would like to order one.",
      lastMessageTime: "2026-07-06T10:15:30.000Z",
      messageCount: 2,
    },
    {
      phoneNumber: "919876543212",
      lastMessage: "Do you ship to Mumbai?",
      lastMessageTime: "2026-07-06T09:10:00.000Z",
      messageCount: 1,
    },
  ],
  chat: [
    {
      type: "outbound",
      status: "READ",
      content: "Hi there! Our summer sale is now live.",
      timestamp: "2026-07-06T09:00:00.000Z",
    },
    {
      type: "inbound",
      text: "Yes, I would like to order one.",
      timestamp: "2026-07-06T10:15:30.000Z",
    },
  ],
};

// Generic isolated fetcher for Feature 2
async function fetchApi(endpoint, options = {}) {
  const url = `${TEMP_CONFIG.API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "API reported failure");
    }
    return data.data;
  } catch (err) {
    if (TEMP_CONFIG.USE_MOCK_API) {
      console.warn(
        `[Mock Fallback] API request failed for ${endpoint}. Using mock data.`,
      );
      return null; // Let the caller resolve the mock
    }
    throw err;
  }
}

// 1. Dashboard Analytics
export async function getWhatsAppAnalytics(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.whatsapp;
  const data = await fetchApi(`/communication/analytics/whatsapp`);
  return data || MOCK_DATA.whatsapp;
}

export async function getCallAnalytics(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.calls;
  const data = await fetchApi(`/communication/analytics/calls`);
  return data || MOCK_DATA.calls;
}

export async function getRecentActivity(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.activity;
  const data = await fetchApi(`/communication/analytics/activity?limit=20`);
  return data || MOCK_DATA.activity;
}

// 2. Campaign Management
export async function getCampaigns(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.campaigns;
  const data = await fetchApi(`/communication/campaigns`);
  return data || MOCK_DATA.campaigns;
}

// Read-only implemented first for campaigns
export async function createCampaign(payload) {
  if (TEMP_CONFIG.USE_MOCK_API) {
    console.log("Mock: createCampaign payload", payload);
    return { success: true };
  }
  return fetchApi(`/communication/campaigns`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// 3. Template Management
export async function getTemplates(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.templates;
  const data = await fetchApi(`/communication/templates`);
  return data || MOCK_DATA.templates;
}

// 4. Inbox
export async function getInboxCustomers(brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.inbox;
  const data = await fetchApi(`/communication/inbox`);
  return data || MOCK_DATA.inbox;
}

export async function getChatHistory(phone, brandId = TEMP_CONFIG.BRAND_ID) {
  if (TEMP_CONFIG.USE_MOCK_API) return MOCK_DATA.chat;
  const data = await fetchApi(`/communication/inbox/chat/${phone}`);
  return data || MOCK_DATA.chat;
}

export async function sendMessage(
  phone,
  message,
  brandId = TEMP_CONFIG.BRAND_ID,
) {
  if (TEMP_CONFIG.USE_MOCK_API) {
    console.log("Mock: sendMessage", { phone, message });
    return { success: true };
  }
  return fetchApi(`/communication/inbox/send`, {
    method: "POST",
    body: JSON.stringify({ phone, message }),
  });
}
