---
title: "Developer FAQ"
type: "guide"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - guide
---
# Developer FAQ

**Q: I inserted a record but the API throws a 404. Why?**
A: Check if you provided the `account_id`. The application's Prisma middleware automatically appends `WHERE account_id = ?` to all queries. If your record has a NULL `account_id`, it is invisible.

**Q: Where are the passwords?**
A: `identity_users.password_hash`. We use bcrypt. We do not store plaintext passwords anywhere. Customer auth is handled externally.

**Q: Why doesn't `fit.fit_products` have a foreign key to `public.commerce_products`?**
A: Cross-schema foreign keys are banned in this architecture to allow the Data Science team to restore the `fit` schema independently of `public` production data. You must enforce the relationship logically in your code.

**Q: What is a `fingerprint_version`?**
A: When a product's sizing changes (e.g. the manufacturer changed the cut), we cannot retroactively change the size chart, or historical ML backtests will fail. We create a new `fingerprint_version` to immutably track the physical dimensions of the garment at a specific point in time.