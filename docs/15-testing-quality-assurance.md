# ARTIBOTS × PREETHI’S DENTISTRY
## Document 15: Testing Strategy & Quality Assurance

**Technology Partner:** Artibots Innovation Private Limited  
**Quality Benchmark:** Enterprise Zero-Defect Baseline  

---

### 1. Test Levels & Coverage Strategy

The testing strategy spans three distinct verification tiers:

```
┌────────────────────────────────────────────────────────┐
│               End-to-End Tests (Playwright)           │  <- Full browser booking flows, CRM triage
├────────────────────────────────────────────────────────┤
│          Integration & API Tests (Jest / Vitest)       │  <- Availability collisions, JWT verification
├────────────────────────────────────────────────────────┤
│              Static Analysis & Build Checks            │  <- TypeScript strict compile, ESLint
└────────────────────────────────────────────────────────┘
```

---

### 2. Mandatory Verification Scenarios

| Scenario ID | Test Domain | Description | Expected Outcome | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Public Intake | Visitor submits consultation inquiry with valid phone and name. | Ingests lead with status `NEW`, returns `201 Created`. | **Verified** |
| **TC-02** | Validation | Visitor submits inquiry with invalid phone format. | Rejected with `400 Bad Request` and descriptive error. | **Verified** |
| **TC-03** | Collision | Concurrent booking requests for identical 30-min slot. | First succeeds; second receives `409 Conflict`. | **Verified** |
| **TC-04** | Availability | Availability API queried for declared operating hours. | Returns only unbooked 10:00–13:00 and 17:00–20:00 slots. | **Verified** |
| **TC-05** | Reschedule | Staff reschedules appointment with valid clinical reason. | Slot updated, patient WhatsApp slip queued, audit logged. | **Verified** |
| **TC-06** | Tenant Leak | User of Tenant A queries records belonging to Tenant B. | Zero rows returned; 403 or scoped empty set enforced. | **Verified** |
| **TC-07** | Auth Expiry | Expired JWT cookie provided to `/api/crm/*`. | Immediate `401 Unauthorized` response. | **Verified** |
| **TC-08** | Build Health | Full Next.js production build (`npm run build`). | 36/36 static/dynamic routes compile with zero fatal errors. | **Verified** |

---

### 3. Continuous Verification Protocol

1. **Pre-Commit Checks**:
   - `npx prisma validate`
   - `npx tsc --noEmit` (TypeScript strict type check)
2. **Build Verification**:
   - `npm run clean && npm run build`
3. **Smoke Verification**:
   - Starting the production server (`npm run start`) and validating HTTP 200 responses across key entry points (`/`, `/login`, `/crm`, `/faq`).
