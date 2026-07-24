# AutoShipp — Paid Services Cost Breakdown

> Every external service the platform depends on, what it does, and what it costs.

---

## Category 1 — Application Hosting (Servers)

Your entire backend — Platform API, Worker Service, and the Next.js frontend — run on Render.

| Service | What it runs | Provider Options | Early Stage Cost |
|---|---|---|---|
| App Hosting | Platform API, Worker Service, Next.js | **Render** | ~$21/month |

**Render (Mandatory):**
- Web services: ~$7/service/month
- With 1 API + 1 Worker Service + 1 Frontend = ~$21/month early stage
- Scales per container added

> ✅ **Recommendation:** Render is locked in for hosting. It handles deployments from GitHub seamlessly.

---

## Category 2 — Database (PostgreSQL)

Your single most critical service. Every org, brand, order, invoice, wallet — everything lives here.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| PostgreSQL | All platform data | **Neon** | Free |

**Neon Plans:**
- **Free tier:** 0.5 GB storage, 1 branch, no dedicated compute — good for development and early production until limits are hit.

> ✅ **Recommendation:** Neon Free Tier is locked in for the initial phase.

---

## Category 3 — Message Broker & Cache (Redis)

BullMQ Job Scheduler coordinate all background tasks (notifications, billing, sync, wallet, AI analysis). It runs on Redis.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| Redis | Caching, BullMQ Queues, Distributed Locks, Rate Limiting, Feature Flags | **Upstash Redis** | Free → $10–$30/month |

**Upstash Redis:**
- **Free:** 10,000 commands/day
- **Pay-as-you-go:** $0.2 per 100K commands — very cheap at early stage
- Serverless pricing scales perfectly with load.

> ✅ **Recommendation:** Upstash Redis is the core asynchronous and caching engine for the platform.

---

## Category 4 — Payment Processing (Razorpay)

How you collect subscription payments, invoice payments, and credit top-ups from brands and aggregators.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| Payment Gateway | Collect subscription and credit payments | **Razorpay** | 2% per transaction |

**Razorpay Pricing:**
- No monthly fee
- **2% per successful transaction** (domestic cards, UPI, net banking)
- **3%** for international cards
- Settlement in 2 business days

> ✅ **Recommendation:** Razorpay is locked in no matter how much it costs. It is the gold standard for Indian SaaS.

---

## Category 5 — Email Delivery (Transactional)

Every welcome email, invoice email, grace period warning, password reset, and notification email.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| Transactional Email | Deliver all system emails | **Resend** | Free |

**Resend:**
- **Free:** 100 emails/day, 3,000/month
- We will remain on the free tier for as long as possible.

> ✅ **Recommendation:** Resend Free Tier is locked in.

---

## Category 6 — AI Inference (Intelligence Engine)

The AutoShipp Intelligence Engine needs an AI inference provider to generate store analysis, ROI predictions, and executive summaries.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| AI Inference | Power AI product features & Onboarding | **OpenAI** or **Gemini** | Pay-per-token |

**Cost Model:**
- Cost entirely depends on usage volume.
- Brands pay for credits (wallet system) → you pass through cost + margin.

> ✅ **This is a revenue center, not a cost center.** Your margin is built into credit pricing.

---

## Category 7 — CDN & DDoS Protection (Cloudflare)

Sits in front of everything. Protects from DDoS attacks, caches static assets, provides DNS, SSL, and global performance.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| CDN + DDoS + DNS + SSL | Protect and accelerate the platform | **Cloudflare** | Free |

> ✅ **Recommendation:** Cloudflare Free is sufficient.

---

## Category 8 — Error Monitoring & Exception Tracking (Sentry)

When something breaks in production, Sentry captures the exact error, stack trace, and context so you can fix it fast.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| Error Monitoring | Capture and alert on production errors | **Sentry** | Free |

> ✅ **Recommendation:** Sentry Free is sufficient.

---

## Category 9 — CI/CD (GitHub Actions)

Automated testing, building Docker images, and deploying to Render.

| Service | What it does | Provider | Cost |
|---|---|---|---|
| CI/CD Pipelines | Automate build, test, and deploy | **GitHub Actions** | Free |

> ✅ **Recommendation:** GitHub free tier is sufficient.

---

## Removed Services (Zero Cost)

| Service | Why it was removed |
|---|---|
| **RabbitMQ** | Replaced entirely by BullMQ on Upstash Redis. |
| **Object Storage (S3)** | Platform does not store binary assets. Dashboards and dynamic generation replace static files. |
| **SMS (MSG91/Twilio)** | Removed from MVP. Email only. |
| **WhatsApp Business** | Removed from MVP. Email only. |
| **Render Cron** | Replaced entirely by BullMQ Job Scheduler. |

---

## Summary: Full Monthly Cost Estimate

### Early Stage (Launch)

| Service | Provider | Monthly Cost |
|---|---|---|
| App Hosting | Render (3 services) | ~$21 |
| PostgreSQL | Neon | $0 |
| Queue & Cache | Upstash Redis | ~$0 (Pay-as-you-go) |
| CDN + DDoS | Cloudflare | $0 |
| Email | Resend | $0 |
| Error Monitoring | Sentry | $0 |
| Payment Gateway | Razorpay | 2% per transaction |
| **Total Fixed** | | **~$21/month** |

This is an incredibly lean architecture that utilizes managed services with aggressive free tiers, consolidating queuing and caching into a single Upstash instance, and completely eliminating RabbitMQ and Object Storage.
