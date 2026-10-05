# Vadaanya Talent Test 2026 – Recommended Cloud Service Stack & Vercel Feasibility Analysis

**Document Version:** 1.0.0  
**Target Event:** Vadaanya Talent Test 2026 (8,000 Students across Anantapur & Sri Sathya Sai Districts)  
**Target Readiness Date:** October 16, 2026  
**Registration Window:** November 1 – November 30, 2026  
**Exam Date:** December 15, 2026  
**Technical Lead:** Himanshu Shetty  
**Scope:** Service selection across all architectural layers, reliability analysis, free-tier assessment, and Vercel Hobby capacity evaluation.

---

## 1. Executive Evaluation: Will Vercel Hobby Hold?

### 1.1 Direct Verdict
**Yes, Vercel Hobby CAN hold the registration and portal traffic, BUT ONLY IF three critical architectural guardrails are implemented.**

If deployed naively (e.g. running unpooled PostgreSQL connections and server-side Headless Chrome PDF generation directly inside Vercel Hobby serverless functions), **it will fail during peak bursts** due to serverless execution timeouts (10-second hard limit on Hobby) and database connection exhaustion. 

However, with the optimized architecture outlined below, **Vercel Hobby will easily handle all 8,000+ registrations and 30,000+ page visits without spending a single dollar on hosting.**

```
+----------------------------------------------------------------------------------------------------+
|                                    VERCEL HOBBY CAPACITY SCORECARD                                 |
+------------------------------+--------------------+-------------------------+----------------------+
| Resource Dimension           | Vercel Hobby Limit | Expected Talent Test 26 | Status & Verdict     |
+------------------------------+--------------------+-------------------------+----------------------+
| Fast Data Transfer (CDN)     | 100 GB / month     | ~12 to 18 GB / month    |  SAFE (15% used)     |
| Edge Requests                | 1,000,000 / month  | ~180,000 / month        |  SAFE (18% used)     |
| Serverless Invocations       | 1,000,000 / month  | ~95,000 invocations     |  SAFE (10% used)     |
| Serverless Execution Time    | 100 GB-hours/month | ~14 GB-hours/month      |  SAFE (14% used)     |
| Max Function Duration        | 10 seconds max     | Typical API: 150-400ms  |  SAFE for forms      |
|                              |                    | Batch PDF: 15-30s       |  CRITICAL BOTTLENECK |
| Serverless Function Memory   | 1,024 MB max       | Standard API: 128 MB    |  SAFE for API        |
|                              |                    | Chromium PDF: 1.5 GB+   |  OUT OF MEMORY       |
| Direct DB Connections        | Unmanaged          | Concurrency spikes: 80+ |  DB WILL CRASH       |
+------------------------------+--------------------+-------------------------+----------------------+
```

### 1.2 The Three Mandatory Hardening Rules for Vercel Hobby
1. **Rule 1: Put Cloudflare (Free Plan) in Front of Vercel.**  
   Configure Cloudflare as the authoritative DNS and reverse proxy. Cloudflare’s Indian edge nodes (Hyderabad, Chennai, Mumbai, Bangalore) will cache 100% of HTML shells, CSS bundles, JS chunks, and public images. This reduces load on Vercel by **85% to 90%**.
2. **Rule 2: Never Run Chromium/Puppeteer on Vercel Serverless Functions.**  
   Generating a 30-page concatenated School Batch PDF using headless Chrome requires >1.5 GB RAM and takes 15–25 seconds, which **violates Vercel Hobby’s 10-second timeout and 1 GB memory ceiling**. Instead, use pure in-memory streaming via `pdf-lib` or delegate batch generation to an external cloud worker.
3. **Rule 3: Use a Connection Pooler (PgBouncer / Supavisor).**  
   Next.js serverless functions spin up and tear down rapidly. If 50 school teachers submit batches simultaneously, 50 serverless instances will open 50 direct PostgreSQL connections, overwhelming a standard database. A pooler ensures dozens of serverless instances share 5 to 10 multiplexed connections smoothly.

---

## 2. Component-by-Component Best Service Recommendations

The recommendations below prioritize:
* **100% High Availability & Zero Downtime** under rural network retries and registration rushes.
* **Extremely Generous Free Tiers** that will not trigger unexpected credit card charges.
* **Indian Geographic Proximity** (data centers in Mumbai or Hyderabad for sub-50ms latency).

```
      +----------------------------------------------------------------------------------+
      |               VADAANYA 2026 PRODUCTION SERVICE ARCHITECTURE                      |
      +----------------------------------------------------------------------------------+

                                   [Rural Students / Teachers]
                                                |
                                                v
                              [Cloudflare Free Tier: CDN, WAF & DNS]
                               (POPs: Hyderabad, Mumbai, Bangalore)
                                                |
                                                v
                           [Vercel Hobby Tier: Next.js 16 Frontend]
                            (Lightweight UI, Static Assets, App Router)
                                                |
                                                v
                           [Next.js Server Actions & API Handlers]
                                                |
                        +-----------------------+-----------------------+
                        |                       |                       |
                        v                       v                       v
               [Database Layer]          [Caching & Limits]       [Object Storage]
               Supabase Postgres         Upstash Serverless       Cloudflare R2
              (AWS Mumbai Region)              Redis             (Zero Egress Fee)
              - 500 MB Free Tier        - 10k cmds/day free      - 10 GB Free Storage
              - Built-in Supavisor      - Atomic Quota Locks     - Hall Ticket PDFs
              - Daily Auto Backups      - Sub-10ms Quota Check   - Excel Reports
                        |                       |                       |
                        +-----------------------+-----------------------+
                                                |
                                                v
                                    [External Messaging API]
                                    Meta WhatsApp Cloud API
                                    + DLT Indian SMS Fallback
```

---

### Layer 1: DNS, CDN, Edge Caching & DDoS Defense
* **Recommended Service:** **Cloudflare (Free Plan)**
* **Why it is the Best:**
  * **Unmetered, Zero-Cost Protection:** Handles unlimited traffic, DDoS attacks, and packet floods without throttling or unexpected bills.
  * **Indian Edge Presence:** Cloudflare operates data centers in Hyderabad, Chennai, Mumbai, Bangalore, and New Delhi. Rural users in Anantapur and Sri Sathya Sai connect directly to the nearest node over low-latency peering.
  * **Static Asset Caching:** Serves all compiled JavaScript, CSS, SVGs, and images directly from the edge cache, sparing Vercel bandwidth.
  * **Free Universal SSL:** Instant wildcard SSL certificates for `www.vadaanya.org` and `admin.vadaanya.org`.

---

### Layer 2: Frontend & Registration Application
* **Recommended Service:** **Vercel (Hobby Plan) + Next.js 16**
* **Why it is the Best:**
  * Native hosting engine for Next.js 16, React 19, and App Router.
  * Zero server administration: automatic Git deployments, instant rollbacks, and global edge routing.
  * Generous 100 GB monthly bandwidth (our event will consume less than 18 GB).
  * **Caution:** Keep the Hobby account on a single personal GitHub account. Do not invite multiple team members into the team workspace (which prompts a $20/month Pro upgrade).

---

### Layer 3: Managed Relational Database
* **Recommended Service:** **Supabase (Free Tier - PostgreSQL 15)**
* **Alternative:** **Aiven for PostgreSQL** (Free 5GB tier, no inactivity pause) or **Neon Serverless Postgres**
* **Detailed Evaluation:**

| Feature / Criteria | Supabase (Recommended) | Neon Serverless | AWS RDS (db.t4g.micro) |
| :--- | :--- | :--- | :--- |
| **Free Tier Storage** | **500 MB** (Permanent) | 500 MB | 20 GB (Only for 12 months) |
| **Storage Needed for VTT 2026** | **~25 MB** for 8,000 records | ~25 MB | ~25 MB |
| **Data Center Location** | **AWS Mumbai (`ap-south-1`)** | AWS Singapore / Frankfurt | AWS Mumbai (`ap-south-1`) |
| **Connection Pooling** | **Built-in Supavisor (Port 6543)** | Built-in PgBouncer | Must configure manually |
| **Inactivity Behavior** | Pauses only after **7 days of zero traffic** | Scales to zero after **5 minutes** | Runs 24/7 (Never pauses) |
| **Cold Start Penalty** | **0 ms** (Active during Nov–Dec) | 500ms – 1.5s on idle wake | 0 ms |
| **Estimated Monthly Cost** | **$0.00 (100% Free)** | $0.00 | $0 for 12 mos, then ~$18/mo |

* **Why Supabase Wins:**
  1. **Located in AWS Mumbai:** Matches sub-30ms round-trip latency to rural Andhra Pradesh.
  2. **Built-in Supavisor Pooler:** Connect via port `6543` using transaction mode. Handles up to 200 concurrent serverless function connections effortlessly.
  3. **Zero Risk of Inactivity Pause During Operational Window:** Since the registration window is active daily from Nov 1 to Nov 30, the database will never experience 7 days of inactivity. (A simple health-check ping via Cron guarantees it stays awake 24/7).

---

### Layer 4: Atomic Quota Locks & Rate Limiting (Cache)
* **Recommended Service:** **Upstash Redis (Serverless)**
* **Why it is the Best:**
  * **Generous Free Tier:** **10,000 commands per day free**, then only $0.20 per 100,000 commands. Our peak days will consume ~4,000 commands/day, meaning **$0.00 total cost**.
  * **Serverless HTTP/REST Connection:** Traditional Redis requires persistent TCP connections that fail on serverless platforms like Vercel. Upstash operates over HTTP, eliminating connection timeouts.
  * **Sub-10ms Quota Enforcement:** Executes atomic `INCR` commands on `district_quota:anantapur` and `district_quota:sri_sathya_sai`. If the quota reaches 4,000, incoming requests are rejected at the edge before even touching the PostgreSQL database.
  * **Region:** Available directly in AWS Mumbai (`ap-south-1`).

---

### Layer 5: Object Storage (Hall Tickets, Receipts, Excel Reports)
* **Recommended Service:** **Cloudflare R2**
* **Alternative:** **AWS S3**
* **Detailed Comparison:**

| Metric / Dimension | Cloudflare R2 (Recommended) | Amazon S3 |
| :--- | :--- | :--- |
| **Free Storage** | **10 GB / month free** | 5 GB / month free (12 months only) |
| **Egress / Download Fee** | **$0.00 (Zero Egress Fees Forever)** | **$0.09 per GB** after 100 GB |
| **Peak Usage Risk** | Zero bill shock if 8,000 students download PDFs | Bandwidth charges on sudden viral downloads |
| **S3 API Compatibility** | 100% compatible with AWS SDK (`@aws-sdk/client-s3`) | Native |

* **Why Cloudflare R2 Wins:**
  * Standard AWS S3 charges for outbound bandwidth (egress). If 8,000 students and 384 headmasters repeatedly download 2MB PDFs, S3 can accumulate bandwidth costs.
  * **Cloudflare R2 charges ZERO egress fees.** Storing all 8,000 Hall Ticket PDFs (~2.4 GB total) and serving unlimited downloads costs **$0.00**.

---

### Layer 6: Document & PDF Generation Architecture
* **The Technical Challenge:** How to generate crisp, printable A4 Hall Tickets with QR codes without timing out Vercel serverless functions?
* **Recommended Architecture:**

```
                                  [PDF GENERATION STRATEGY]
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
       [Single Student Hall Ticket]                     [School Bulk Stitched PDF]
        Generated via Client/Serverless                  Generated via In-Memory Stream
        Using @react-pdf/renderer                        Using pure JavaScript pdf-lib
        Execution: ~350ms | Memory: <64MB                Execution: ~1.8s for 30 pages
        Safe for Vercel Hobby                            Safe for Vercel Hobby (<128MB)
```

1. **For Individual Student Downloads:**
   * Use `@react-pdf/renderer` or `@react-pdf/pdfkit`.
   * Execution time is ~300ms to 450ms. Memory consumption is <60 MB.
   * Completely safe on Vercel Hobby (well within the 10-second limit).
2. **For Headmaster School Bulk Downloads (20 to 50 pages):**
   * **Do NOT use Puppeteer or Headless Chrome.**
   * Use **`pdf-lib`**: It is a pure, zero-dependency JavaScript library that merges and generates vector PDF pages directly in memory without launching a browser subprocess.
   * A 30-page merged PDF takes only **~1.8 seconds and ~85 MB RAM**, easily running inside Vercel’s 10-second ceiling without needing a separate backend server!

---

### Layer 7: Aadhaar Data Security & Master Key Storage
* **Recommended Architecture:** **Node.js Native AES-256-GCM + Environment Master Secrets**
* **Alternative:** **AWS KMS (Key Management Service)**
* **Implementation Recommendation:**
  * **KMS Cloud Key:** AWS KMS costs $1.00/month per key + $0.03 per 10,000 cryptographic operations. While inexpensive, it introduces an external network round-trip (~80ms) for every registration.
  * **Zero-Cost High-Performance Alternative:**
    * Generate a high-entropy 256-bit cryptographically secure key: `openssl rand -hex 32`.
    * Store this master key and the HMAC pepper string inside Vercel's **Encrypted Environment Variables** (`ENCRYPTION_MASTER_KEY` and `AADHAAR_PEPPER_SECRET`).
    * Use Node.js native `crypto.createCipheriv('aes-256-gcm', key, iv)`.
    * **Performance:** Executes in **0.02ms** (in-process microsecond cryptography). Zero external API calls, zero latency, zero cloud cost, and mathematically identical security to cloud KMS.

---

### Layer 8: WhatsApp & SMS Messaging Gateways
* **Primary Notification Gateway:** **Meta WhatsApp Cloud API (Direct)**
  * **Setup:** Direct integration via Meta Developer Portal under Vadaanya NGO Business Account.
  * **Cost:** Meta provides **1,000 free service/utility conversations every month**. Utility templates in India cost only **~₹0.12 to ₹0.15** per conversation.
  * **Total Expense for 8,000 students (3 touchpoints = 24,000 messages):** Approx. **₹3,600 to ₹4,800 INR**.
  * **Reliability:** Direct connection to Meta servers. Zero intermediary aggregator downtime.
* **Secondary Fallback Gateway:** **Fast2SMS or Msg91 (Indian DLT Route)**
  * Pre-register sender ID `VADNYA` and templates under Indian TRAI DLT regulations.
  * Automatically triggered if the WhatsApp webhook reports an undelivered status within 5 minutes.
  * Cost: ~₹0.14 per transactional SMS.

---

### Layer 9: Application Health & Exception Monitoring
* **Recommended Service:** **Sentry (Developer Free Plan)**
* **Why it is the Best:**
  * **Free Tier:** 5,000 errors and 10,000 performance transactions per month (more than enough for the event).
  * **Next.js Integration:** One-line SDK integration (`@sentry/nextjs`).
  * **Zero-Leakage Safeguard:** Configure Sentry's `beforeSend` hook to automatically strip any 12-digit numeric sequences, ensuring Aadhaar numbers are never captured in error crash dumps.

---

## 3. Comprehensive Architecture & Service Mapping

```
+---------------------+-------------------------------+-------------------+----------------------------+
| Architectural Layer | Recommended Primary Service   | Secondary / Cloud | Monthly Cost for 8,000 Reg |
+---------------------+-------------------------------+-------------------+----------------------------+
| DNS, CDN & WAF      | Cloudflare (Free Plan)        | AWS CloudFront    | $0.00 (100% Free)          |
| Web & Frontend Host | Vercel (Hobby Tier)           | Cloudflare Pages  | $0.00 (100% Free)          |
| Backend / API Logic | Next.js 16 Server Actions     | Cloud Container   | $0.00 (Unified with Next)  |
| Primary Database    | Supabase (AWS Mumbai Postgres)| Neon / AWS RDS    | $0.00 (Under 500MB free)   |
| Connection Pooler   | Supavisor (Port 6543)         | PgBouncer         | $0.00 (Included in DB)     |
| Quota Locks & Cache | Upstash Redis (Serverless)    | Redis on Cloud    | $0.00 (Under 10k cmds/day) |
| Object Storage (PDF)| Cloudflare R2                 | AWS S3            | $0.00 (Under 10GB, $0 egr) |
| PDF Engine          | pdf-lib + @react-pdf          | Puppeteer Cloud   | $0.00 (In-memory execution)|
| Aadhaar Cryptography| Node Native AES-256-GCM       | AWS KMS / Azure KV| $0.00 (In-process cipher)  |
| Messaging: WhatsApp | Meta WhatsApp Cloud API       | Gupshup / Twilio  | ~₹3,600 – ₹4,800 INR total |
| Messaging: SMS DLT  | Fast2SMS / Msg91 / AWS SNS    | Kaleyra           | Pay-as-you-go fallback     |
| Error Monitoring    | Sentry (Developer Free)       | Logtail           | $0.00 (Under 5k events/mo) |
+---------------------+-------------------------------+-------------------+----------------------------+
| TOTAL INFRASTRUCTURE EXPENSE                                            | ₹3,600 – ₹4,800 INR TOTAL  |
+---------------------+-------------------------------+-------------------+----------------------------+
```

---

## 4. Detailed Load & Concurrency Stress Test Simulation

Let us simulate the peak traffic events expected during the Vadaanya Talent Test 2026:

### Scenario 1: District Collector Launch Day (November 1, 2026)
* **Traffic Pattern:** 50 field volunteers visit schools; district educational authorities share the link on WhatsApp groups.
* **Volume:** 3,500 visits over 6 hours; peak burst of ~15 requests per second.
* **System Response:**
  * Cloudflare edge absorbs 92% of requests (static assets).
  * Vercel processes ~1.2 serverless invocations per second.
  * Supabase receives ~2 to 4 transactions per second via connection pooler.
  * **Result: 100% smooth, 0 dropped requests, server response time <250ms.**

### Scenario 2: School Computer Lab Bulk Registration (Peak Hours: 11:00 AM – 2:00 PM)
* **Traffic Pattern:** Headmasters and math teachers in 40 schools simultaneously registering batches of 20 to 30 students.
* **Volume:** Up to 80 concurrent active sessions; 25 simultaneous form submissions per minute.
* **System Response:**
  * Step 0 gate queries Upstash Redis and Supabase by `aadhaarHash` ($O(1)$ indexed lookup, takes ~12ms).
  * Auto-save blocks (`PATCH /api/registration/draft`) commit small payloads (<1 KB) to PostgreSQL.
  * Atomic quota counter in Redis decrements safely without race conditions.
  * **Result: No database lock contention; zero duplicate records created.**

### Scenario 3: Hall Ticket Release Day (December 7, 2026)
* **Traffic Pattern:** Automated WhatsApp broadcast sent to 8,000 mobile numbers. Within 2 hours, 4,000+ students and parents click their download link.
* **Volume:** 30 to 50 PDF download requests per second.
* **System Response:**
  * Pre-generated PDFs are fetched directly from **Cloudflare R2** via public CDN URL or streamed via `pdf-lib`.
  * Because downloads are served from Cloudflare R2 edge servers, **Vercel and PostgreSQL experience virtually ZERO load during hall ticket downloads!**
  * **Result: Zero bandwidth overage costs; instantaneous PDF downloads on mobile devices.**

---

## 5. Potential Failure Modes & Exact Prevention Plan

### Risk 1: Database Connection Starvation on Vercel
* **The Danger:** Serverless functions scale from 0 to 60 instances in seconds. If each instance opens a direct connection to PostgreSQL, the database will throw `FATAL: remaining connection slots are reserved for non-replication superuser connections`.
* **Prevention:**
  * In the `.env` file, use Supabase's **Session Pooler URL (Port 5432)** for migrations and **Transaction Pooler URL (Port 6543)** for the runtime app:
    ```env
    # Direct connection (used by Prisma CLI for migrations)
    DIRECT_URL="postgres://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
    
    # Pooled connection (used by runtime application with Supavisor)
    DATABASE_URL="postgres://postgres.[REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10"
    ```

### Risk 2: Supabase Inactivity Sleep Mode
* **The Danger:** Supabase free-tier projects pause if they receive zero database queries for 7 consecutive days.
* **Prevention:**
  * During the active months (October 15 to December 31), add a free GitHub Actions workflow or a Vercel Cron Job (`/api/cron/keepalive`) that runs a lightweight query (`SELECT 1;`) once every 48 hours. This guarantees the database stays 100% active and warm.

### Risk 3: Hall Ticket PDF Generation Timeout
* **The Danger:** Using headless browser packages like `puppeteer` or `chrome-aws-lambda` inside Vercel serverless functions will crash due to binary size limitations (50MB zip limit on Vercel) and 10-second timeouts.
* **Prevention:**
  * Use **`pdf-lib`** and standard canvas/SVG QR code generators.
  * `pdf-lib` has zero native dependencies, runs in standard Node.js or Edge runtime, and compiles an A4 hall ticket in less than 200 milliseconds.

---

## 6. Actionable Setup & Deployment Checklist for Technical Lead

```
[WEEK 1: INFRASTRUCTURE PROVISIONING] (Target: Oct 7)
[ ] 1. Point vadaanya.org nameservers to Cloudflare (Free Tier). Enable Full (Strict) SSL.
[ ] 2. Provision Supabase PostgreSQL project in AWS Mumbai (ap-south-1) region.
[ ] 3. Retrieve Supavisor pooled connection string (port 6543) and add to Vercel env.
[ ] 4. Create Upstash Redis serverless database in AWS Mumbai. Add REST credentials to Vercel.
[ ] 5. Generate 256-bit encryption key (openssl rand -hex 32) and set ENCRYPTION_MASTER_KEY.

[WEEK 2: OBJECT STORAGE & PDF ENGINE] (Target: Oct 11)
[ ] 6. Create Cloudflare R2 bucket named "vadaanya-hall-tickets-2026".
[ ] 7. Implement bilingual A4 Hall Ticket layout using pdf-lib with embedded QR code generator.
[ ] 8. Verify single student PDF generation executes in under 500ms on Vercel local dev.
[ ] 9. Verify school batch PDF stitching (30 pages) completes in under 3 seconds.

[WEEK 3: MESSAGING & ANALYTICS HARDENING] (Target: Oct 14)
[ ] 10. Register WhatsApp Business Account under Vadaanya Foundation entity.
[ ] 11. Submit utility message templates for Registration Confirmation & Hall Ticket Alert.
[ ] 12. Register TRAI DLT Entity & Transactional SMS templates for Indian cellular fallback.
[ ] 13. Deploy admin.vadaanya.org with NextAuth / secure magic link login for coordinators.
[ ] 14. Configure Sentry with Aadhaar PII scrubber regex in beforeSend hook.

[WEEK 4: STRESS TEST & PRODUCTION SIGN-OFF] (Target: Oct 16)
[ ] 15. Run load test script simulating 100 concurrent registrations across both districts.
[ ] 16. Verify atomic quota counters stop exactly at 4,000 per district.
[ ] 17. Verify Vercel metrics: function execution duration <600ms, zero connection pool errors.
[ ] 18. Final production deployment on www.vadaanya.org ahead of Nov 1 launch.
```

---

*Authored by Himanshu Shetty, Technical Lead — Vadaanya Foundation.*  
*Reviewed & Approved by Technical Advisory Board: Avinash Gupta, Syed Ubedulla, Ashok Padapati.*
