# ARTIBOTS × PREETHI’S DENTISTRY
# MASTER REPOSITORY OPERATING MANUAL & AGENT GOVERNANCE
**Repository:** `abtestingsites-hue/DR_Preethi_denistry`  
**Flagship Client:** Dr. Preethi’s Dentistry, Saibaba Colony, Coimbatore, Tamil Nadu, India  
**Technology Partner:** Artibots Innovation Private Limited  
**Operating Standard:** Enterprise Modular Monolith, Strict Multi-Tenancy, Zero Fake Work  

---

## 1. MISSION & CORE ARCHITECTURAL PRINCIPLES

This repository hosts the digital platform for **Dr. Preethi’s Dentistry** and the foundational multi-tenant core of the **Artibots Dental CRM**. Every engineer and automated agent working on this codebase must adhere strictly to these principles:

1. **Zero Fake Work**: Never simulate mock UI counters, fabricate patient medical records, or hardcode fake appointment availability. All business entities must be backed by live database models or verified APIs.
2. **Strict Multi-Tenant Isolation**: Every database interaction must be explicitly scoped to a `tenantId`. Never execute unbounded queries across tenant boundaries.
3. **Clinical & Administrative Data Separation**: General CRM and marketing permissions must never expose sensitive clinical notes, diagnoses, or prescriptions without authorized clinical role validation.
4. **Healthcare Privacy & DPDP Compliance**: Adhere to India's **Digital Personal Data Protection (DPDP) Act, 2023**. Never leak patient Personally Identifiable Information (PII) into analytics scripts, external pixels, or URL query parameters. All patient record modifications must write an immutable record to `audit_logs`.
5. **Non-Destructive & Thoughtful Engineering**: Never replace a functioning implementation merely because generating a new file is easier. Understand dependencies before modifying code.

---

## 2. REPOSITORY MAP & ARCHITECTURAL BOUNDARIES

```
d:\newdental\
├── app/                  # Next.js 14 App Router (Pages, Layouts & API Route Handlers)
│   ├── (public)/         # Public digital experience (/, /about, /treatments, etc.)
│   ├── api/              # Domain-specific backend API route handlers
│   │   ├── appointments/ # Slot availability, booking, rescheduling
│   │   ├── auth/         # Staff login and JWT verification
│   │   ├── crm/          # CRM back-office endpoints (analytics, Rx, aligners)
│   │   ├── cron/         # Background dispatchers & communication pollers
│   │   ├── leads/        # Public consultation inquiry intake
│   │   └── webhooks/     # Meta WhatsApp incoming webhook handler
│   └── crm/              # Artibots Dental CRM single-page operational application
├── components/           # Reusable React UI component library
│   ├── footer/           # Global footers and legal compliance links
│   ├── header/           # Brand navigation and consultation CTAs
│   ├── home/             # Homepage section blocks
│   ├── modal/            # Booking, inquiry, and CRM operational modals
│   └── sections/         # Reusable content sections (map pin, reel player, banners)
├── docs/                 # Canonical 18-file enterprise documentation suite (00 to 17)
├── lib/                  # Singletons and core utilities (db.ts, auth.ts, utils.ts)
├── prisma/               # Database schema (schema.prisma) and seed scripts
└── render.yaml           # Cloud deployment blueprint (Node Web Service)
```

---

## 3. CODING, TYPESCRIPT & NEXT.JS CONVENTIONS

- **TypeScript Strictness**: Strictly typed interfaces for all API payloads and database responses. Avoid `any`.
- **Component Rendering Boundaries**:
  - Keep marketing and informational pages as **Server Components** for maximum SEO and Core Web Vitals performance.
  - Mark interactive components (forms, modals, video players, CRM tabs) with `'use client';` at line 1.
- **Path Imports**: Always use the `@/*` alias for root-level imports (e.g., `import prisma from '@/lib/db';`).
- **Prisma Pinned Version**: Prisma is pinned to LTS `5.22.0`. Do not upgrade to unverified major versions (e.g., Prisma 8) without comprehensive migration verification.

---

## 4. AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)

The system enforces four exact roles defined in `prisma/schema.prisma` (`UserRole`):
1. `SUPER_ADMIN`: Platform-level tenant provisioning and infrastructure monitoring.
2. `CLINIC_ADMIN`: Full clinic operations, staff account management, BI analytics, and DPDP audit log oversight.
3. `DENTIST`: Assigned patient management, clinical notes, digital prescriptions, and aligner staging.
4. `RECEPTIONIST`: Inbound lead triage, appointment booking/rescheduling, patient check-in, and WhatsApp slips.

> [!IMPORTANT]
> Historical role titles like `FRONT_DESK` or `CLINICAL_DIRECTOR` are mapped directly to `RECEPTIONIST` and `CLINIC_ADMIN` respectively. Never bypass backend role checks relying solely on frontend UI button hiding.

---

## 5. DATABASE & MULTI-TENANCY RULES

- **Tenant Scoping**: All queries on `Patient`, `Lead`, `Appointment`, `CommunicationLog`, and `AuditLog` must include `where: { tenantId }`.
- **Connection Strings**:
  - `DATABASE_URL`: Must connect to Supabase Transaction Pooler (`port 6543`) with `?pgbouncer=true`.
  - `DIRECT_URL`: Must connect to direct PostgreSQL session (`port 5432`) for schema migrations.
- **Atomic Booking Operations**: To avoid double bookings, verify slot availability atomically before persisting appointment records.

---

## 6. WHATSAPP & COMMUNICATIONS GOVERNANCE

- **Official Provider**: Only use the official Meta WhatsApp Cloud API (Graph API `v19.0+`).
- **Resilient Fallback**: In development or when credentials are absent, `/api/cron/meta-dispatcher` operates in a zero-failure simulation fallback mode, recording mock message IDs (`SIM-WA-XXXXX`) without throwing fatal runtime exceptions.
- **Lawful Communications**: Patient messaging is strictly limited to transactional appointment slips, rescheduling notices, and verified care reminders with affirmative consent.

---

## 7. ESSENTIAL COMMANDS & WORKFLOWS

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **Clean Cache** | `npm run clean` | Purges `.next`, `dist`, and `out` to resolve webpack chunk invalidation. |
| **Prisma Generate** | `npx prisma generate` | Regenerates type-safe Prisma client (`node_modules/@prisma/client`). |
| **Production Build** | `npm run build` | Compiles full Next.js application and validates all static/dynamic routes. |
| **Run Production Server** | `npm run start` | Launches Node.js server on `http://localhost:3000` (Render target). |
| **Run Dev Server** | `npm run dev` | Starts local Next.js development server with hot-module replacement. |

---

## 8. RELEASE GATE & DEPLOYMENT DISCIPLINE

A release or milestone may only be committed and deployed when:
1. `npm run build` completes with exit code 0 and zero TypeScript or lint errors.
2. Core routes (`/`, `/login`, `/crm`, `/faq`) return `HTTP 200 OK`.
3. Render is configured as a **Node Web Service** (never a "Static Site").
4. No sensitive secrets, tokens, or live patient credentials exist in git tracking.
5. All architectural changes are recorded in the canonical `/docs` suite.
