const { chromium } = require("playwright");

(async () => {
  console.log("Starting Playwright test...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Navigating to client-login...");
    await page.goto("http://localhost:3000/client-login");

    console.log("Entering credentials...");
    await page.fill('input[name="email"]', "momcreadlz@autoshipp.com");
    await page.fill('input[name="password"]', "temporary_secure_password");
    await page.click('button[type="submit"]');

    console.log("Waiting for navigation to dashboard...");
    await page.waitForURL("**/client-dashboard");
    console.log("Login successful.");

    // Check Analytics
    console.log("Checking Analytics...");
    await page.waitForSelector("text=WhatsApp Activity", { timeout: 10000 });
    console.log("Analytics loaded successfully.");

    // Check Campaigns
    console.log("Navigating to Campaigns...");
    await page.click("text=Campaigns");
    await page.waitForSelector("text=Summer Sale Blast", { timeout: 10000 });
    console.log("Campaign list loaded successfully.");

    // Check Templates
    console.log("Navigating to Templates...");
    await page.click("text=Templates");
    await page.waitForSelector("text=seasonal_sale_01", { timeout: 10000 });
    console.log("Template list loaded successfully.");

    // Check Inbox
    console.log("Navigating to Inbox...");
    await page.click("text=Inbox");
    await page.waitForSelector("text=919876543210", { timeout: 10000 });
    console.log("Inbox loaded successfully.");

    // Open conversation
    console.log("Opening conversation...");
    await page.click("text=919876543210");
    await page.waitForSelector("text=Hi, when will my order ship?", {
      timeout: 10000,
    });
    console.log("Conversation opened successfully.");

    // Send message
    console.log("Sending message...");
    await page.fill(
      'input[placeholder="Type a message..."]',
      "This is a test message from Playwright",
    );
    await page.click('button:has-text("Send")');
    await page.waitForTimeout(1000); // Give it a moment to send

    console.log("Refreshing page...");
    await page.reload();
    await page.waitForSelector("text=919876543210", { timeout: 10000 });
    await page.click("text=919876543210");

    // Verify persistence
    await page.waitForSelector("text=This is a test message from Playwright", {
      timeout: 10000,
    });
    console.log("Message persisted successfully after refresh.");

    // Verify cookies
    const cookies = await context.cookies();
    const hasAccessToken = cookies.some((c) => c.name === "access_token");
    const hasTempSession = cookies.some(
      (c) => c.name === "temp_client_session",
    );
    console.log(
      `Cookies present: access_token=${hasAccessToken}, temp_client_session=${hasTempSession}`,
    );

    console.log("Test completed successfully.");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await browser.close();
  }
})();
