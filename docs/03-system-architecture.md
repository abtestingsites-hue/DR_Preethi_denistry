# ARTIBOTS × PREETHI’S DENTISTRY
## Document 03: System Architecture & Design Boundaries

**Technology Partner:** Artibots Innovation Private Limited  
**Architecture Style:** Enterprise Modular Monolith  
**Application Framework:** Next.js 14 (App Router) + TypeScript  

---

### 1. High-Level Architectural Diagram

```mermaid
flowchart TD
    Client["Client Browsers (Patient & Clinic Staff)"] --> CDN["Edge / Cloud Network"]
    CDN --> NextServer["Next.js 14 Modular Monolith (Node.js Web Service)"]
    
    subgraph ModularMonolith["Next.js Application Core"]
        AppRouter["App Router (SSR & Client UI)"]
        ApiRoutes["API Domain Route Handlers (/api/*)"]
        AuthMiddleware["JWT Auth & Role Verifier"]
        PrismaORM["Prisma Client v5.22.0"]
        
        AppRouter --> AuthMiddleware
        ApiRoutes --> AuthMiddleware
        AuthMiddleware --> PrismaORM
    end
    
    subgraph ExternalServices["External Infrastructure & APIs"]
        Postgres["Supabase PostgreSQL Cluster (vmnghlykuizysaffgmsl)"]
        MetaAPI["Meta WhatsApp Cloud API"]
        CronTrigger["Background / Cron Poller"]
    end
    
    PrismaORM <-->|"Connection Pool (pgbouncer:6543) / Direct (5432)"| Postgres
    ApiRoutes <-->|"JSON Webhooks & Outbound Dispatch"| MetaAPI
    CronTrigger -->|"Scheduled Invocations"| ApiRoutes
```

---

### 2. Domain Boundaries

The application enforces strict separation of concerns across four key domains:

1. **Public Presentation Domain (`components/`, `app/(public)`)**:
   - Focuses strictly on patient education, SEO, and inquiry capture.
   - Operates with zero knowledge of CRM operational internals or database connection strings.
2. **Access & Booking Domain (`app/api/appointments`, `app/api/leads`)**:
   - Handles patient intake, input validation (Zod), and slot conflict detection.
   - Enforces atomic database updates to avoid race conditions during concurrent bookings.
3. **Practice Management Domain (`app/crm`, `app/api/crm/*`)**:
   - Enforces JWT session validation and staff role authorization (`SUPER_ADMIN`, `CLINIC_ADMIN`, `DENTIST`, `RECEPTIONIST`).
   - Contains clinical governance endpoints (prescriptions, aligner stages, audit logs).
4. **Communications & Webhook Domain (`app/api/cron/*`, `app/api/webhooks/*`)**:
   - Asynchronously processes staged communication records.
   - Verifies SHA-256 webhook signatures from Meta and updates communication delivery states.

---

### 3. Modularity & Reusability Principles

- **Tenant Scoping**: All business operations receive an explicit `tenantId`. Services do not query global sets without this filter.
- **Dependency Inversion**: Third-party communication providers (Meta Cloud API, SMS gateways) are abstracted behind normalized communication logging interfaces (`CommunicationLog`).
- **Stateless Web Services**: Authentication relies on cryptographically signed HTTP-only JWTs, enabling zero-session-state horizontal scaling.
