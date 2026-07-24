---
title: "Fit Replay"
type: "domain"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - domain
---
# Fit Replay Domain

## 1. What is this?
The Replay Domain (`fit_replay_*` tables) is the system's time-machine. It allows data engineers to re-run historical orders through a new iteration of the ML model to backtest accuracy.

## 2. Why does it exist?
If we update the sizing algorithm, we need to know if the new algorithm would have performed better than the old one. Replay jobs partition historical data, spin up worker queues, and generate shadow recommendations.

## 3. Important Entities
- **`fit_replay_jobs`**: The root definition of a backtest (e.g., "Run Algorithm V3 against all Q1 Orders").
- **`fit_replay_partition_jobs`**: Chunking the work into 10,000 order batches for parallel processing.
- **`fit_replay_integrity_incidents`**: Logs if the data used during replay was corrupted or missing.

## 4. Common Queries
**Check status of a replay job:**
```sql
SELECT status, count(*) 
FROM fit_replay_partition_jobs 
WHERE replay_job_id = 'uuid'
GROUP BY status;
```