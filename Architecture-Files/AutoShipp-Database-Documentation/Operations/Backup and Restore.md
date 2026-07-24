---
title: "Backup and Restore"
type: "operations"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - operations
---
# Backup and Restore Strategy

- Ensure `fit` schema is backed up independently of `public`.
- Utilize Neon's point-in-time recovery for `public` schema disasters.