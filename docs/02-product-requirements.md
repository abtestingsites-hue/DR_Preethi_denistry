# ARTIBOTS × PREETHI’S DENTISTRY
## Document 02: Product Requirements & Feature Matrix

**Technology Partner:** Artibots Innovation Private Limited  
**Flagship Client:** Dr. Preethi’s Dentistry, Coimbatore  

---

### 1. Functional Scope by Product

#### Product A — Premium Digital Experience Platform
- **Homepage (`/`)**: Brand storytelling, key differentiators, doctor credentials, map pin integration, consultation intake.
- **Clear Aligners Hub (`/treatments/invisalign-clear-aligners`)**:
  - Interactive self-assessment widget (crowding, gaps, overbite, prior braces).
  - Clear treatment journey breakdown (Digital Scan → 3D Simulation → Custom Aligners → Refinement).
  - Explicit medical disclaimers ("In-clinic clinical diagnosis required").
- **Clinical Gallery (`/gallery`)**: Before/after treatment showcases with professional clinical consent.
- **Clinical Insights / Blog (`/clinical-insights`, `/blog/[slug]`)**: Patient-friendly education on oral health, aligner hygiene, and needle-free anesthesia.
- **Patient FAQ (`/faq`)**: Structured answers addressing aligner costs, duration, pain management, and clinic logistics.
- **Location & Contact (`/contact`)**: Elevated Google Maps satellite pin with matching clinic address card.

#### Product B — Patient Access Platform
- **Real-Time Slot Verification**: Queries `/api/appointments/availability` to present only genuine, unreserved time slots.
- **Atomic Booking Engine**: Posts to `/api/appointments` creating or linking the patient and assigning an immutable MRN.
- **Self-Serve Reschedule / Cancellation**: Route `/api/appointments/reschedule` enabling date/time adjustments with automated WhatsApp slip updates.
- **Communication Queue**: Outbound messages staged in `communication_logs` with statuses `QUEUED`, `SENT`, `DELIVERED`, or `FAILED`.

#### Product C — Artibots Dental CRM
- **Lead Pipeline**: Real-time triage (`NEW` → `CONTACTED` → `QUALIFIED` → `CONSULTATION_BOOKED` → `ARCHIVED`).
- **Appointments Management**: Daily calendar, status transitions (`CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`).
- **Patient Directory**: Unique Medical Record Number (`MRN-PD-XXXXX`), contact details, appointment histories.
- **Digital Prescriptions**: Structured medication orders (dosage, frequency, duration) stamped with doctor metadata.
- **Aligner Staging Tracker**: Tray tracking (Current Tray / Total Trays), compliance wear time, next scan dates.
- **Cryptographic Audit Trail**: Immutable log of record accesses and modifications.

#### Product D — Business Intelligence Platform
- **Operational Analytics**: Lead response SLA tracking, chair attendance rates, cancellation reasons.
- **Marketing Attribution**: Ingestion of `source` and `campaign` metadata without leaking patient PII to ad networks.
- **Queue Health Monitoring**: Real-time count of pending and failed communication dispatches.

---

### 2. Feature Prioritization & Implementation Matrix

| Product | Feature | Status | Notes |
| :--- | :--- | :--- | :--- |
| **A** | Interactive Aligner Assessment Widget | Implemented & Verified | Calculates severity score & opens booking modal. |
| **A** | Satellite Map Pin & Address Alignment | Implemented & Verified | Custom SVG mask matched to contact form height. |
| **A** | Single-Active Instagram Reel Player | Implemented & Verified | Hover-to-unmute with global single-audio playback. |
| **B** | Slot Availability Verification API | Implemented & Verified | Respects clinic operating hours & active bookings. |
| **B** | Booking Reschedule Engine | Implemented & Verified | Automatic patient notification slip trigger. |
| **C** | 7-Tab CRM Interface | Implemented & Verified | Built with Next.js client components at `/crm`. |
| **C** | Digital Prescription Generation | Implemented & Verified | Modal workflow with audit logging. |
| **C** | Aligner Tray Progression Tracker | Implemented & Verified | Real-time increment and compliance tracker. |
| **D** | Operational Analytics API | Implemented & Verified | `/api/crm/operational-analytics`. |
| **D** | Inbound WhatsApp Webhook | Implemented & Verified | Webhook verification challenge & lead capture. |
| **D** | Meta Cloud API Live Dispatcher | Implemented (Fallback active) | Ready for production Meta credentials. |
