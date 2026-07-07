# Autoshipp Complete API Documentation

This document outlines the entire suite of REST APIs available for the Frontend team to build the Autoshipp SaaS platform.

**Base URL**: `https://shipping-automation.onrender.com/api/v1`
**Authentication**: Standard session or bearer token (if applicable).

---

## 1. Dashboard Analytics

### A. WhatsApp Analytics

Fetches aggregated metrics for all WhatsApp campaigns sent by a specific brand.
**Endpoint:** `GET /dashboard/:brandId/whatsapp`
**Response:**

```json
{
  "success": true,
  "data": {
    "QUEUED": 0,
    "SENT": 6963,
    "DELIVERED": 10000,
    "READ": 4000,
    "FAILED": 433
  }
}
```

### B. Call Analytics

Fetches metrics for AI voice calls (Tabbly integration).
**Endpoint:** `GET /dashboard/:brandId/calls`
**Response:**

```json
{
  "success": true,
  "data": {
    "INITIATED": 120,
    "ANSWERED": 85,
    "COMPLETED": 70,
    "NO_ANSWER": 20,
    "FAILED": 15
  }
}
```

### C. Recent Activity Feed

Fetches a chronological stream of the latest outbound communications (both calls and WhatsApp).
**Endpoint:** `GET /dashboard/:brandId/activity?limit=20`
**Response:**

```json
{
  "success": true,
  "data": [
    {
      "type": "whatsapp",
      "id": "60d5ec...",
      "recipient": "919876543210",
      "status": "DELIVERED",
      "messageType": "GENERAL",
      "timestamp": "2026-07-06T10:15:30.000Z"
    }
  ]
}
```

---

## 2. Campaign Management

### A. List Campaigns

Returns a list of all historical campaigns and their individual performance metrics. This is used to build a table filtering analytics by specific templates.
**Endpoint:** `GET /campaigns?brandId=momzcradle`
**Response:**

```json
{
  "success": true,
  "data": [
    {
      "campaignId": "camp_12345",
      "name": "Summer Dresses 2026",
      "templateName": "founder_message_dresses",
      "status": "COMPLETED",
      "stats": {
        "total": 5400,
        "sent": 5363,
        "delivered": 4800,
        "read": 2100,
        "failed": 37
      }
    }
  ]
}
```

### B. Create New Campaign

Initiates a new bulk messaging campaign.
**Endpoint:** `POST /campaigns`
**Request Body:**

```json
{
  "brandId": "momzcradle",
  "name": "Summer Sale Blast",
  "type": "CSV_UPLOAD",
  "templateName": "seasonal_sale_01",
  "audience": [{ "phoneNumber": "919876543210", "variables": ["SUMMER20"] }]
}
```

---

## 3. Template Management

### A. List Approved Templates

Fetches all Meta-approved WhatsApp templates that the brand can use for their campaigns.
**Endpoint:** `GET /templates/:brandId`
**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "founder_message_dresses",
      "category": "MARKETING",
      "status": "APPROVED",
      "language": "en"
    }
  ]
}
```

### B. Create Template

Submits a new template design to Meta directly from the SaaS platform.
**Endpoint:** `POST /templates/:brandId`
**Request Body:**

```json
{
  "name": "seasonal_sale_01",
  "language": "en_US",
  "category": "MARKETING",
  "components": [
    {
      "type": "BODY",
      "text": "Hello! Our seasonal sale is now live. Use code {{1}} for 20% off."
    }
  ]
}
```

---

## 4. Inbox (Customer Support)

### A. Customer List

Fetches all unique customers who have replied to the business. Used to build the left sidebar of the Chat UI.
**Endpoint:** `GET /inbox/:brandId`
**Response:**

```json
{
  "success": true,
  "data": [
    {
      "phoneNumber": "919876543210",
      "lastMessage": "Yes, I would like to order one.",
      "lastMessageTime": "2026-07-06T10:15:30.000Z",
      "messageCount": 2
    }
  ]
}
```

### B. 1-on-1 Chat History

Fetches the complete chronological chat history between the brand and a specific customer.
**Endpoint:** `GET /inbox/:brandId/chat/:phone`
**Response:**

```json
{
  "success": true,
  "data": [
    {
      "type": "outbound",
      "status": "READ",
      "content": "Hi there! Our summer sale is now live.",
      "timestamp": "2026-07-06T09:00:00.000Z"
    },
    {
      "type": "inbound",
      "text": "Yes, I would like to order one.",
      "timestamp": "2026-07-06T10:15:30.000Z"
    }
  ]
}
```

### C. Send Free-Form Message

Sends a custom text message back to the customer directly from the Inbox UI. Note: The 24-hour Meta rule applies.
**Endpoint:** `POST /inbox/:brandId/send`
**Request Body:**

```json
{
  "phone": "919876543210",
  "message": "Great! We will ship it today."
}
```
