# Vadaanya Talent Test 2026 – System Architecture & End-to-End Implementation Specification

**Document Version:** 2.0.0  
**Target Completion Date:** October 16, 2026  
**Registration Window:** November 1, 2026 – November 30, 2026  
**Exam Date:** December 15, 2026  
**Target Scope:** Anantapur District (4,000 students) & Sri Sathya Sai District (4,000 students) — Total 8,000 Students  
**Live Portals:** `www.vadaanya.org` (Public Registration & Hall Ticket Portal) & `admin.vadaanya.org` (Administrative Analytics Dashboard)  
**Technical Lead:** Himanshu Shetty  
**Senior Review Team:** Avinash Gupta, Abdul, Ismail, Manoj, Chandramouli, Syed Ubedulla, Ashok Padapati  

---

## 1. Executive Summary & Project Blueprint

### 1.1 Context & Operational Transformation
For five years, Vadaanya Foundation’s rural talent test operations relied on physical paper forms, manual transcription into spreadsheets, manual alphabetical sorting across mandals, and hand-delivered hall tickets. While this achieved great impact, it generated severe administrative bottlenecks, human transcription errors, and weeks of delayed logistical turnaround.

Building upon the successful foundational model of the **DSC 2024 Talent Test**, the **Vadaanya Talent Test 2026** transitions to an automated, resilient, and highly secure cloud platform. The platform must onboard **8,000 rural government school students** (Classes 9 and 10) across two districts (**Anantapur** and **Sri Sathya Sai**) while operating flawlessly under the unique constraints of rural Andhra Pradesh: low digital literacy among students, limited personal smartphone ownership, erratic rural mobile networks, and bulk registrations initiated by school Headmasters and teachers.

```
       +-------------------------------------------------------------------------+
       |                  VADAANYA TALENT TEST 2026 LIFECYCLE                    |
       +-------------------------------------------------------------------------+
                                            |
                                            v
     [PHASE 1: REGISTRATION ENGINE] (Nov 1 - Nov 30, 2026)
     - Step 0 Gate: Instant Aadhaar + Mobile check (Duplicate detection / Resume draft)
     - Block-by-block entry with real-time Database Auto-Save (Cross-device resume)
     - Status tracking: PENDING (Draft/Incomplete) -> COMPLETED (Confirmed)
     - Hard quota enforcement: 4,000 Anantapur | 4,000 Sri Sathya Sai
     - Structured Reg No generation (e.g., V26-ATP-B0016) + Instant WhatsApp/SMS
                                            |
                                            v
     [INTERIM LOGISTICS BATCH RUN] (Dec 1 - Dec 6, 2026)
     - District & Mandal proximity clustering
     - Gender-segregated exam center allocation (Government Girls/Boys High Schools)
     - Seating plan & Roll Number generation
                                            |
                                            v
     [PHASE 2: HALL TICKET GENERATION] (Dec 7 - Dec 15, 2026)
     - Dynamic PDF generator with QR verification code (One week before exam)
     - Individual download: Aadhaar + Mobile / Registration Number
     - School Bulk Download: Single concatenated PDF for Headmasters
     - WhatsApp / SMS broadcast with direct download links
                                            |
                                            v
     [PHASE 3: EXAM DAY & OMR PROCESSING] (Dec 15, 2026)
     - Invigilator Spot-Verification lookup portal on admin.vadaanya.org
     - Pre-formatted Excel export mapped to High-Speed OMR Scanners
```

---

## 2. Rural Ground Realities & Technical Countermeasures

### 2.1 Persona & Environment Realities
1. **The Rural Student (Class 9 & 10):**
   - Typically does not possess a personal smartphone, email address, or desktop computer.
   - May not know their family's email address; their official identification is their 12-digit **Aadhaar Number**.
   - Language familiarity is predominantly Telugu and simple English.
2. **The School Point of Contact (Headmaster / Math Teacher):**
   - Registers entire batches (20 to 50 students) in a single sitting using one school desktop, personal smartphone, or at a local MeeSeva/cyber centre.
   - **Crucial Constraint:** A single teacher’s phone number or school contact number will be used across **dozens of student registrations**.
3. **The On-Ground Field Volunteer (50-Member Campaign Team):**
   - Visiting remote government and model schools with tablets/smartphones following the District Collector launch on November 1st.
   - Operates in zones with intermittent 2G/3G/4G connectivity.

### 2.2 Technical Mitigation Matrix

| Rural Ground Hurdle | Impact on Traditional Systems | Vadaanya 2026 Technical Solution |
| :--- | :--- | :--- |
| **Phone Number Collisions** | Using phone number as a unique key fails when a teacher registers 30 students. | **Aadhaar Number is the sole immutable unique identifier**. Phone number is treated as a notification delivery route, allowing 1:N student-to-phone mapping. |
| **Unstable Connections & Incomplete Entries** | Form is dropped midway due to power cut, browser crash, or poor network. | **Database-Backed Block Auto-Save:** Every block entered is saved directly into the database under `status: PENDING`. Re-entering the Aadhaar instantly resumes the draft on any device. |
| **Duplicate Registration Confusion** | Students or teachers re-attempt to register a student who was already entered. | **Step 0 Gate Check:** Entering Aadhaar immediately tells the user: *"You have already registered. Your Reg No is V26-ATP-B0016"* without reloading or re-entering data. |
| **Forgotten Registration Numbers** | Students lose paper slips or delete SMS, unable to retrieve hall tickets. | **Dual-Key Retrieval Engine:** Students or teachers can recover credentials by supplying `Aadhaar Number` OR `Aadhaar Number + Mobile Number`. |
| **Teacher Fatigue in Bulk Entry** | Re-typing District, Mandal, and School 30 times causes abandonment. | **"Quick Add Next Student" Mode:** Retains District, Mandal, and School in form state, clearing only student-specific fields (Name, Aadhaar, Gender, Vocational Choice). |
| **High Printing Costs for Schools** | Headmasters downloading 30 individual PDFs one-by-one is tedious and error-prone. | **"School Batch PDF Download":** Generates a single, pre-sorted, multi-page PDF containing all hall tickets for that specific school with one click. |

---

## 3. Data Privacy & Zero-Leakage Aadhaar Encryption Architecture

The Aadhaar number is sensitive Personally Identifiable Information (PII) governed by strict UIDAI regulations and privacy laws. Plain-text storage of Aadhaar numbers in databases, caches, or logs is strictly prohibited.

```
       +---------------------------------------------------------------------------------+
       |                  AADHAAR ENCRYPTION & LOOKUP ARCHITECTURE                       |
       +---------------------------------------------------------------------------------+

       Input: 12-Digit Aadhaar (e.g., "5489 1234 5678")
                         |
                         +------------------------------------------------+
                         |                                                |
                         v                                                v
             [1. Blind Hash Index]                           [2. Field-Level AES-GCM]
     HMAC-SHA256(Aadhaar, KMS_PEPPER_KEY)                 Envelope Encryption via KMS
                         |                                                |
                         v                                                v
               "e3b0c44298fc1c149af..."                       "AQICAHh3...encrypted_blob..."
                         |                                                |
                         +-----------------------+------------------------+
                                                 |
                                                 v
                                   [PostgreSQL Storage Record]
                        +--------------------------------------------------+
                        | id: uuid                                         |
                        | registrationStatus: PENDING | COMPLETED          |
                        | aadhaar_hash: "e3b0c442..."  <-- UNIQUE INDEX    |
                        | aadhaar_encrypted: "AQICAH..." <-- AES-256-GCM   |
                        | aadhaar_last4: "5678"         <-- Masked Display |
                        +--------------------------------------------------+
```

### 3.1 Cryptographic Storage Strategy
To achieve both **fast uniqueness checks ($O(1)$ lookup)** and **irreversible security**, the architecture uses a two-pronged cryptographic strategy:

1. **Deterministic Blind Index (`aadhaar_hash`):**
   - Computed as `HMAC-SHA256(normalised_aadhaar, KMS_PEPPER_SECRET)`.
   - The `KMS_PEPPER_SECRET` is stored securely in environment secrets (AWS Secrets Manager / Azure Key Vault) and never committed to code.
   - Enforces a SQL `UNIQUE` constraint on `aadhaar_hash`. This rejects duplicate registrations instantaneously without needing to decrypt existing records.
2. **Envelope Field Encryption (`aadhaar_encrypted`):**
   - The actual 12-digit Aadhaar is encrypted using **AES-256-GCM** with a customer-managed key (CMK) via KMS.
   - Authenticated encryption with associated data (AEAD) ensures ciphertext cannot be tampered with.
3. **Display Mask (`aadhaar_last4`):**
   - Only the last 4 digits are saved in plain text (e.g., `XXXX-XXXX-5678`).
   - Admins, school coordinators, and public retrieval portals **only ever view the masked format**. Decryption of the full Aadhaar is restricted to emergency government audits via an air-gapped script.
4. **Zero-Log Sanitization Middleware:**
   - Next.js API middleware intercepts all outgoing logs (CloudWatch, Azure Monitor, Sentry) and scrubs any pattern matching `\b\d{4}[ -]?\d{4}[ -]?\d{4}\b`.

---

## 4. Simplified Registration Engine & Progressive Block Architecture

### 4.1 Step 0: The Quick-Entry Gate (Aadhaar & Mobile First)
To avoid overwhelming students and teachers with a massive single-page form, the registration process begins with a focused, two-field entry modal:

```
+---------------------------------------------------------------------------------+
|                       VADAANYA TALENT TEST 2026 REGISTRATION                    |
|                                                                                 |
|   Step 1 of 4: Verify Identity & Contact                                        |
|                                                                                 |
|   Enter Student's 12-Digit Aadhaar Number:                                      |
|   [  ____  ____  ____  ]  (Validated in real-time using Verhoeff checksum)      |
|                                                                                 |
|   Enter WhatsApp Mobile Number:                                                 |
|   [ +91 | __________ ]   (Used for Reg No, Hall Ticket & Exam alerts)           |
|                                                                                 |
|   [ CONTINUE -> ]                                                               |
+---------------------------------------------------------------------------------+
```

#### Gate Logic on "Continue":
1. **Case A: Student is Already Registered (`status: COMPLETED`):**
   - The modal immediately surfaces a success notification:
     > *"You have already registered for Vadaanya Talent Test 2026!  
     > **Registration Number:** `V26-ATP-B0016`  
     > **School:** ZP High School, Gooty  
     > Hall tickets will be available for download on **December 7, 2026** at www.vadaanya.org."*
   - No redundant form entry or duplicate database record is created.
2. **Case B: Incomplete Draft Found in Database (`status: PENDING`):**
   - The system recognizes an unfinished application:
     > *"Welcome back! We found your partially completed registration. Resuming your application..."*
   - Pre-fills all previously saved fields from the database and opens the form directly at the next uncompleted block.
3. **Case C: Brand New Student:**
   - Creates an initial database record with `registrationStatus = PENDING`, `aadhaarHash`, `aadhaarEncrypted`, `aadhaarLast4`, and `whatsappNumber`.
   - Opens Block 1 with Aadhaar and WhatsApp numbers pre-filled and locked.

---

### 4.2 Progressive Block-by-Block Form Split & Database Auto-Save

The registration form is divided into three logical, clean blocks. As the user finishes each block, the data is **asynchronously auto-saved to the database** via a lightweight API route (`PATCH /api/registration/draft`).

```
  [GATE: Step 0] ──────> Enters Aadhaar & WhatsApp
                             │
                             ▼
  [BLOCK 1] ───────────> Personal Details (Name, Relative, Gender, Class)
                             │ ──> AUTO-SAVES TO DATABASE (Status: PENDING)
                             ▼
  [BLOCK 2] ───────────> School & Location (District, Mandal, Village, School)
                             │ ──> AUTO-SAVES TO DATABASE (Status: PENDING)
                             ▼
  [BLOCK 3] ───────────> Aspirations & Vocational Skills (Stream, Trade Interest)
                             │
                             ▼
  [FINAL SUBMIT] ──────> Atomic Quota Reservation & Final Commit
                             │ ──> STATUS CHANGES TO 'COMPLETED'
                             │ ──> GENERATES REGISTRATION NUMBER: V26-ATP-B0016
                             ▼
  [RECEIPT & SMS] ─────> Downloadable Digital Receipt + Instant WhatsApp Message
```

#### Block 1: Personal & Identification Details
- **Student Full Name:** Text, as per school attendance register.
- **Father / Mother / Guardian Name:** Relative name for identity verification.
- **Gender:** Radio selection (`MALE` or `FEMALE`) — **critical** for assigning gender-segregated exam centers.
- **Class / Standard:** Dropdown (`Class 9` or `Class 10`).
- *Trigger on "Next" / Field Blur:* Auto-saves Block 1 to PostgreSQL. If the session drops now, all personal details are preserved.

#### Block 2: Geographic & School Details
- **District:** Dropdown (`Anantapur` or `Sri Sathya Sai`).
- **Mandal:** Cascading dropdown dynamically filtered by selected District (32 mandals per district).
- **Village / Town:** Text input for local clustering.
- **School Name:** Cascading dropdown dynamically filtered by Mandal and District.
  - Filtered to eligible institutions: Primary NPS, Zilla Parishad High Schools (ZPHS), Government High Schools, AP Model Schools, and Kasturba Gandhi Balika Vidyalayas (KGBV).
- *Trigger on "Next" / Field Blur:* Auto-saves Block 2 to PostgreSQL.

#### Block 3: Aspirations & Skill Development
- **Future Stream of Study:** Dropdown (`MPC`, `BiPC`, `CEC`, `HEC`, `Polytechnic`, `Undecided`).
- **Vocational Interest:** Radio buttons aligned with central and AP state skill development programs (PMKVY / APSSDC):
  - `Electrical Work`
  - `Painting`
  - `Plumbing`
  - `Carpentry`
  - `Not Interested`

---

### 4.3 Final Submission & Status Transition (`PENDING` $\rightarrow$ `COMPLETED`)
When the user clicks **"Submit Registration"**:
1. **District Quota Check:** The server checks that the district cap (4,000) has not been exceeded using an atomic SQL transaction:
   ```sql
   UPDATE districts
   SET registered_count = registered_count + 1
   WHERE name = 'ANANTAPUR' AND registered_count < quota_max
   RETURNING registered_count;
   ```
2. **Status Transition:** The student's database record updates:
   - `registrationStatus` transitions from `PENDING` to `COMPLETED`.
   - `completedAt` timestamp is recorded.
3. **Sequential Registration Number Assignment:** A structured, human-readable registration number is assigned.

---

### 4.4 Simplified Registration Number Structure

The registration number is designed to be easily read, spoken over the phone, and transcribed onto OMR answer sheets by rural students:

$$\mathbf{V26}\boldsymbol{-}\mathbf{[DIST]}\boldsymbol{-}\mathbf{[BATCH][4\text{-}DIGIT\text{ }SEQ]}$$

#### Component Breakdown:
* **`V26`**: **V**adaanya Talent Test for Year 20**26**.
* **`[DIST]`**: **`ATP`** for Anantapur District | **`SSS`** for Sri Sathya Sai District.
* **`[BATCH]`**: Single alphabetic letter representing batches (`A`, `B`, `C`...). E.g., Batch `A` covers the first 1,000 registrations; Batch `B` covers 1,001 to 2,000, etc.
* **`[4-DIGIT SEQ]`**: Zero-padded 4-digit sequential integer (`0001` to `1000`).

#### Concrete Examples:
* **`V26-ATP-B0016`**: Student in Anantapur District, Batch B, Sequence 16.
* **`V26-SSS-A0452`**: Student in Sri Sathya Sai District, Batch A, Sequence 452.

---

## 5. Hall Ticket Lifecycle & Logistics Engine

Hall tickets are **deliberately not created during registration**. Because exam center planning requires finalized student counts and proximity data, the system operates across distinct phases.

```
       Registration Phase (Nov 1 - Nov 30)
       ------------------------------------
       * Students receive Registration Number (e.g. V26-ATP-B0016) & Digital Receipt.
       * Hall tickets are NOT issued yet.
                         |
                         v
       Center Allocation & Logistics Batch (Dec 1 - Dec 6)
       ----------------------------------------------------
       * Registration closes Nov 30 at 23:59:59.
       * Batch script allocates:
         1. Proximity clustering (grouping nearby villages/mandals).
         2. Gender segregation into designated exam centers (e.g. Govt Girls High School).
         3. Assigns Hall Ticket Numbers, Room Numbers, and Bench Numbers.
                         |
                         v
       Hall Ticket Release Window (Dec 7 - Dec 15, One Week Before Exam)
       -----------------------------------------------------------------
       * Hall tickets go live on www.vadaanya.org/talent-test/hall-ticket.
       * Automated WhatsApp & SMS broadcasts dispatched with direct links.
       * Headmasters access School Bulk Download.
```

### 5.1 Retrieval Routes
1. **Direct Search by Registration Number:** Student enters `V26-ATP-B0016` to download their PDF.
2. **Recovery by Aadhaar + Mobile Number:** If the registration number was misplaced, entering Aadhaar and WhatsApp number immediately retrieves the ticket.
3. **Headmaster School Bulk Download:** Headmasters enter their School U-DISE Code and registered phone number to download a **single concatenated, alphabetized PDF** of all 20–50 students from their institution.

### 5.2 Hall Ticket Content & Security
- Vadaanya Foundation Logo & Government Partnership Seal
- Student Name, Relative Name, Gender, Class, School Name
- Registration Number & Hall Ticket Number
- Assigned Exam Center Name, Full Address & Google Maps link
- Exam Date (December 15, 2026), Reporting Time (09:00 AM), Exam Duration (10:00 AM – 12:30 PM)
- High-contrast 2D QR Code for rapid gate verification on exam morning
- Dual-language exam guidelines in **Telugu and English**

---

## 6. One-Way Automated Messaging Architecture (WhatsApp & SMS)

Rural communications must rely on mobile numbers rather than emails. A single phone number may register multiple children, requiring personalized, template-driven messages.

```
                  +----------------------------------------------+
                  |         VADAANYA MESSAGING DISPATCHER        |
                  +----------------------------------------------+
                                         |
                       +-----------------+-----------------+
                       |                                   |
                       v                                   v
             [Meta WhatsApp Cloud API]              [AWS SNS / DLT SMS]
             - Verified "Vadaanya NGO" Bot          - Indian DLT Registered
             - Interactive action buttons           - Reliable fallback if
             - Rich PDF link preview                WhatsApp delivery fails
```

### 6.1 WhatsApp & SMS Workflow
1. **Provider:** Meta WhatsApp Cloud API via Next.js Server Actions / AWS Lambda, paired with DLT-compliant Indian transactional SMS fallback.
2. **Verified Account:** One-way verified Business Account displaying **"Vadaanya NGO"** with an official green tick verification.
3. **Strict One-Way Enforcement:** Inbound messages trigger an automatic canned reply:
   > *"This is an automated notification service from Vadaanya Foundation. Incoming messages are not monitored. For assistance, please contact your school headmaster or visit www.vadaanya.org."*
4. **The Three Automated Touchpoints:**
   - **Touchpoint 1 (Immediately upon completion):** Registration Confirmation.
     > *"Dear {StudentName}, your registration for Vadaanya Talent Test 2026 is confirmed! Reg No: {RegNo}. School: {SchoolName}. Hall tickets will be available on Dec 7 at www.vadaanya.org. - Vadaanya Foundation"*
   - **Touchpoint 2 (Dec 7):** Hall Ticket Release.
     > *"Dear {StudentName}, your Hall Ticket for Vadaanya Talent Test 2026 is ready! Exam Date: Dec 15, 2026. Center: {CenterName}. Download now: {ShortLink} - Vadaanya Foundation"*
   - **Touchpoint 3 (Dec 13, 48 hours before exam):** Final Countdown & Seating Reminder.
     > *"Reminder: Vadaanya Talent Test is on Dec 15 at 9:00 AM. Center: {CenterName}. Carry your printed Hall Ticket & pen. All the best! - Vadaanya Foundation"*

---

## 7. Administrative Analytics Dashboard (`admin.vadaanya.org`)

The administrative portal (`admin.vadaanya.org`) is dedicated exclusively to **real-time analytics, monitoring, drop-off detection, and field coordinator outreach**. It does not share public web traffic.

```
       +---------------------------------------------------------------------------------+
       |                  ADMINISTRATIVE HIERARCHICAL ANALYTICS ENGINE                   |
       +---------------------------------------------------------------------------------+

                      +------------------------------------------+
                      |         STATE LEVEL OVERVIEW             |
                      |   Target: 8,000 | Completed: 5,420       |
                      |   Incomplete Drafts (Pending): 412       |
                      +------------------------------------------+
                                    |                      |
            +-----------------------+                      +-----------------------+
            v                                                                      v
   [ANANTAPUR DISTRICT]                                                   [SRI SATHYA SAI DISTRICT]
   Target: 4,000 | Completed: 2,890                                       Target: 4,000 | Completed: 2,530
   Drafts Pending: 215                                                    Drafts Pending: 197
   Progress: [============>       ] 72%                                   Progress: [===========>        ] 63%
            |                                                                      |
            +---> 32 Mandals                                                       +---> 32 Mandals
                  |                                                                      |
                  +---> Gooty Mandal (142 Completed, 11 Pending)                         +---> Kadiri Mandal (189 Completed)
                        |                                                                      |
                        +---> ZP High School (32 Completed)                                    +---> Model School (44 Completed)
                        +---> Govt High School Girls (18 Completed)                            +---> ZP High School (3 Completed) [FLAGGED <5]
```

### 7.1 Real-Time Analytics Views & KPIs

1. **Executive KPI Scorecard:**
   - **Total Target:** 8,000 (Anantapur: 4,000 | Sri Sathya Sai: 4,000).
   - **Total Completed Registrations (`COMPLETED`):** Official count counting toward district quotas.
   - **Total Incomplete Drafts (`PENDING`):** Students who entered Aadhaar/Phone or dropped off at Block 1/2.
   - **Funnel Conversion Rate:** Percentage of initiated applications that successfully reached completion.
2. **Registration Funnel Drop-off Telemetry:**
   - Step 0 Initiated (Aadhaar & Mobile entered) $\rightarrow$ Block 1 Completed (Personal Details) $\rightarrow$ Block 2 Completed (School Selected) $\rightarrow$ Final Submit.
   - Pinpoints exactly where students or teachers encounter friction (e.g., if a mandal has many drop-offs at school selection, field volunteers are dispatched to verify school names).
3. **District, Mandal & School Hierarchical Drilldown:**
   - State Level $\rightarrow$ 2 Districts $\rightarrow$ 64 Mandals (32 per district) $\rightarrow$ 384+ Schools.
   - Real-time progress bars against the 4,000 district quotas.
4. **Low-Registration Proactive Alerting (Red Flags):**
   - Automated visual warning badge for any school with **fewer than 5 completed registrations** after November 10.
   - **One-Click Click-to-Call Telephony (`tel:+91...`):** Every school row displays the verified contact number of the Headmaster or Math Teacher. Ashok Padapati and regional coordinators can tap any row on mobile or tablet to initiate an immediate cellular call.
5. **Demographic & Educational Insights:**
   - **Gender Distribution:** Real-time ratio of Male vs. Female applicants (vital for gender-segregated exam center planning).
   - **Class Distribution:** Class 9 vs. Class 10 breakdown.
   - **Aspirational Streams:** Distribution of student preferences (MPC, BiPC, CEC, HEC, Polytechnic, Undecided).
   - **Vocational Trade Interests:** Counts for Electrical, Painting, Plumbing, Carpentry, and Not Interested (for state skill initiatives).
6. **Velocity Tracker:** Registrations completed per day and hour to monitor field campaign momentum.
7. **Hall Ticket Download Telemetry (Post-Dec 7):**
   - Real-time tracking of downloaded vs. pending hall tickets per school and mandal.
   - Identifies schools where $<50\%$ of tickets have been downloaded 5 days prior to the exam for immediate telephone follow-up.
8. **Exam Day Spot-Verification Tool (Dec 15):**
   - Search bar allowing exam center invigilators to find any student by Name, Aadhaar Last-4, or School to verify their roll number if their paper ticket was lost.

---

## 8. Reports and Data Export Engine

The analytics dashboard provides comprehensive filtering and one-click export capabilities to generate structured **Microsoft Excel (`.xlsx`)** and **CSV** reports for operational analysis and OMR hardware ingestion.

```
+---------------------------------------------------------------------------------+
|                       VADAANYA ANALYTICS: REPORT EXPORT ENGINE                  |
|                                                                                 |
|   Filter Criteria:                                                              |
|   District: [All / Anantapur / Sri Sathya Sai]                                  |
|   Mandal:   [All Mandals v]      School Category: [ZPHS / Model / KGBV v]       |
|   Status:   [All / COMPLETED / PENDING Drafts]                                  |
|   Gender:   [All / Boys / Girls] Class:           [All / 9th / 10th]            |
|   Tickets:  [All / Downloaded / Pending Download]                               |
|                                                                                 |
|   [ EXPORT OMR SCANNER EXCEL ]   [ EXPORT FIELD OUTREACH SHEET ]                |
+---------------------------------------------------------------------------------+
```

### 8.1 Pre-Configured Export Formats

1. **OMR Scanner Master Export:**
   - Pre-formatted column order matching the exact specifications required by high-speed optical mark recognition scanning software:
     `Roll_No | Reg_No | Student_Name | Father_Name | Gender | Class | Center_Code | Room_No | Bench_No | School_Name`
2. **Mandal Coordinator Field Follow-Up Export:**
   - Grouped by District and Mandal, listing schools with completed counts, pending draft counts, and Headmaster/Teacher contact names and phone numbers.
3. **Incomplete Draft Recovery Export (`status: PENDING`):**
   - Extracts all students who started registration but did not complete it, along with their WhatsApp number and last completed block, enabling automated SMS prompts or volunteer follow-up.
4. **Skill Development & Vocational Interest Report:**
   - Tabulates student vocational trade selections by Mandal for submission to government skill development authorities (APSSDC / PMKVY).

---

## 9. Database Architecture & Schema Specification

The database utilizes **PostgreSQL** with **Prisma ORM**, incorporating field-level encryption, deterministic blind indexing, and status tracking.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum RegistrationStatus {
  PENDING    // Draft saved during block entry; incomplete
  COMPLETED  // Fully submitted; counts toward quota
}

enum Gender {
  MALE
  FEMALE
}

enum Standard {
  CLASS_9
  CLASS_10
}

enum DistrictName {
  ANANTAPUR
  SRI_SATHYA_SAI
}

enum VocationalChoice {
  ELECTRICAL
  PAINTING
  PLUMBING
  CARPENTRY
  NOT_INTERESTED
}

model District {
  id              String       @id @default(cuid())
  name            DistrictName @unique
  quotaMax        Int          @default(4000)
  registeredCount Int          @default(0) // Atomic quota counter
  mandals         Mandal[]
  students        Student[]
  createdAt       DateTime     @default(now())
}

model Mandal {
  id         String       @id @default(cuid())
  name       String
  districtId String
  district   District     @relation(fields: [districtId], references: [id])
  schools    School[]
  students   Student[]
  centers    ExamCenter[]

  @@unique([name, districtId])
}

model School {
  id           String      @id @default(cuid())
  udiseCode    String?     @unique
  name         String
  category     String      // Govt, Model, ZPHS, KGBV, Residential
  mandalId     String
  mandal       Mandal      @relation(fields: [mandalId], references: [id])
  contactName  String?     // Headmaster or Math Teacher
  contactPhone String?     // Click-to-call mobile number
  students     Student[]
  createdAt    DateTime    @default(now())

  @@index([mandalId])
}

model ExamCenter {
  id            String       @id @default(cuid())
  centerCode    String       @unique
  name          String
  address       String
  mapsUrl       String?
  mandalId      String
  mandal        Mandal       @relation(fields: [mandalId], references: [id])
  capacity      Int
  genderAllowed Gender?      // NULL = Co-ed; otherwise MALE or FEMALE only
  hallTickets   HallTicket[]
}

model Student {
  id                 String             @id @default(cuid())
  registrationStatus RegistrationStatus @default(PENDING) // PENDING -> COMPLETED
  currentStep        Int                @default(1)       // Tracks last completed block (1, 2, or 3)
  registrationNumber String?            @unique           // e.g. V26-ATP-B0016 (assigned on completion)
  
  // Encrypted Security Fields
  aadhaarHash        String             @unique           // HMAC-SHA256 blind index for O(1) checks
  aadhaarEncrypted   String                               // AES-256-GCM ciphertext via KMS
  aadhaarLast4       String                               // Masked plain string (e.g. 5678)
  
  whatsappNumber     String                               // Non-unique, multiple students can share
  
  // Block 1: Personal Details (nullable until entered)
  fullName           String?
  relativeName       String?
  gender             Gender?
  standard           Standard?
  
  // Block 2: Location Details (nullable until entered)
  districtId         String?
  district           District?          @relation(fields: [districtId], references: [id])
  mandalId           String?
  mandal             Mandal?            @relation(fields: [mandalId], references: [id])
  village            String?
  schoolId           String?
  school             School?            @relation(fields: [schoolId], references: [id])
  
  // Block 3: Aspirations & Skills (nullable until entered)
  futureStream       String?
  vocationalInterest VocationalChoice?
  
  hallTicket         HallTicket?
  completedAt        DateTime?
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  @@index([districtId, registrationStatus])
  @@index([schoolId])
  @@index([whatsappNumber])
}

model HallTicket {
  id            String      @id @default(cuid())
  ticketNumber  String      @unique // e.g. HT-2026-90412
  studentId     String      @unique
  student       Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  centerId      String
  center        ExamCenter  @relation(fields: [centerId], references: [id])
  roomNumber    String?
  benchNumber   String?
  isDownloaded  Boolean     @default(false)
  downloadedAt  DateTime?
  downloadCount Int         @default(0)
  createdAt     DateTime    @default(now())

  @@index([centerId])
}

model AdminAuditLog {
  id        String   @id @default(cuid())
  actor     String   // Admin username / email
  action    String   // e.g. "EXPORT_EXCEL", "SCHOOL_CAP_TOGGLED"
  details   String?
  ipAddress String?
  createdAt DateTime @default(now())
}
```

---

## 10. Operational Edge Cases & System Mitigations

```
   [HURDLE 1: Student leaves form incomplete midway]
   --> Handled: Data is already saved in PostgreSQL under 'PENDING'.
   --> Re-entering Aadhaar on Step 0 instantly restores the saved draft.

   [HURDLE 2: Teacher registers 35 students from one phone]
   --> Handled: Phone number is non-unique; Aadhaar is the unique key.
   --> "Quick-Register Another Student" button retains School & Mandal in state.

   [HURDLE 3: Student attempts to register twice]
   --> Handled: Step 0 gate check immediately displays: "You have already registered!
       Your Registration Number is V26-ATP-B0016" with a link to their digital receipt.

   [HURDLE 4: 50 simultaneous registrations when District reaches 3,995]
   --> Handled: Atomic database transaction:
       UPDATE districts SET registered_count = registered_count + 1 WHERE ... < 4000
       Guarantees that the 4,000 threshold is never breached. Request #4,001 receives a clear modal.

   [HURDLE 5: Student loses Hall Ticket on exam morning at the center]
   --> Handled: "Invigilator Spot Verification Tool" on admin.vadaanya.org allows center
       headmasters to search by student name/school and instantly confirm roll number.
```

---

## 11. Technical Roadmap & Build Checklist (Target: Oct 16, 2026)

```
+---------------------------------------------------------------------------------------+
| MILESTONE TIMELINE: OCTOBER 4 - DECEMBER 15, 2026                                     |
+---------------------------------------------------------------------------------------+

Oct 4, 2026     Oct 7, 2026           Oct 11, 2026          Oct 14, 2026       Oct 16, 2026
Team Sync       Phase 1 Complete      Phase 2 Complete      Phase 3 Complete   Final Target
(Cap Alignment) (Reg Engine & Drafts) (Hall Ticket Engine)  (Admin & Reports)  (Full Go-Live)
     |               |                     |                     |                  |
     v               v                     v                     v                  v
  [Align] -----> [Staging Form] -----> [PDF & Retrieval] -> [Analytics & Export] -> [Production]
                                                                                    Launch: Nov 1
                                                                                    Exams: Dec 15
```

### 11.1 Phased Work Breakdown

- [ ] **Phase 1: Database Setup & Secure Progressive Registration Engine (Target: Oct 7, 2026)**
  - [ ] Provision PostgreSQL database with updated Prisma schema (`PENDING` vs `COMPLETED` statuses).
  - [ ] Configure KMS Customer-Managed Key for field-level Aadhaar encryption & blind indexing.
  - [ ] Implement Step 0 entry gate (Aadhaar & Mobile check, duplicate detection, draft resume).
  - [ ] Build progressive 3-block form with asynchronous database auto-saving (`PATCH /api/registration/draft`).
  - [ ] Implement atomic 4,000-per-district quota enforcement with atomic SQL increment.
  - [ ] Implement simplified registration number format: `V26-[DIST]-[BATCH][SEQ]` (e.g. `V26-ATP-B0016`).
  - [ ] Configure one-way WhatsApp & SMS confirmation dispatcher.

- [ ] **Phase 2: Hall Ticket Generator & Retrieval Portals (Target: Oct 11, 2026)**
  - [ ] Design bilingual (Telugu & English) A4 Hall Ticket layout with QR code.
  - [ ] Build serverless dynamic PDF generation engine.
  - [ ] Build individual student credential retrieval portal (`/talent-test/hall-ticket`).
  - [ ] Build Headmaster "School Batch Concatenated PDF" download portal.
  - [ ] Implement download tracking telemetry (`isDownloaded`, `downloadedAt`).

- [ ] **Phase 3: Admin Analytics Dashboard & Report Export Engine (Target: Oct 14, 2026)**
  - [ ] Configure `admin.vadaanya.org` subdomain with secure role-based access.
  - [ ] Build real-time analytics dashboard:
    - [ ] District progress bars (ATP vs SSS toward 4,000).
    - [ ] Funnel drop-off monitor (Step 0 $\rightarrow$ Block 1 $\rightarrow$ Block 2 $\rightarrow$ Submit).
    - [ ] Incomplete drafts counter (`PENDING` count) vs Completed registrations.
    - [ ] Low-registration visual alerts for schools with $<5$ students.
    - [ ] Click-to-call (`tel:+91...`) links for all school Headmasters.
    - [ ] Demographics (Gender ratio, Class 9/10, Future Streams, Vocational Trades).
  - [ ] Build Advanced Report Export engine:
    - [ ] One-click OMR Scanner Excel format (`.xlsx`).
    - [ ] Mandal Coordinator Outreach Excel sheet.
    - [ ] Incomplete Draft Recovery Excel sheet.

- [ ] **Phase 4: Hardening & Production Go-Live (Target: Oct 16, 2026)**
  - [ ] High-concurrency load testing (simulating 500 concurrent submissions).
  - [ ] Automated security verification: confirm zero plain-text Aadhaar leaks in network logs or error traces.
  - [ ] End-to-end rehearsal with the 50-member ground volunteer leads.
  - [ ] Final sign-off for public portal launch on **November 1, 2026**.

---

*Authored by Himanshu Shetty, Technical Lead — Vadaanya Foundation.*  
*Reviewed & Approved by Technical Advisory Board: Avinash Gupta, Syed Ubedulla, Ashok Padapati.*
