# ARTIBOTS × PREETHI’S DENTISTRY
## Document 08: Authentication & Role-Based Access Control (RBAC)

**Technology Partner:** Artibots Innovation Private Limited  
**Authentication Standard:** Stateless HTTP-Only JWT with PBKDF2/Bcrypt  

---

### 1. Role Reconciliation Matrix

In earlier design iterations, various role titles were referenced across specifications. The canonical, Prisma-backed database enum (`UserRole` in `prisma/schema.prisma`) and TypeScript auth definition (`lib/auth.ts`) define **four exact system roles**:

| Schema Role (`UserRole`) | Historical / Business Alias | Scope & Capabilities |
| :--- | :--- | :--- |
| `SUPER_ADMIN` | Platform Admin / Artibots Executive | Global tenant provisioning, system health, and cross-clinic governance. No unrestricted access to sensitive patient clinical records without audit. |
| `CLINIC_ADMIN` | Clinical Director / Practice Manager / Dr. Preethi | Full clinic management: user accounts, lead triage, appointment schedules, BI analytics, staff audit logs, and DPDP Act deletion approval. |
| `DENTIST` | Associate Doctor / Consultant | Assigned patient management, clinical notes, digital prescriptions, and clear aligner staging updates. No access to financial or marketing settings. |
| `RECEPTIONIST` | Front Desk / Patient Care Coordinator | Inbound lead qualification, appointment booking, rescheduling, patient check-in, and WhatsApp communication dispatch. |

*(Note: Titles such as `FRONT_DESK`, `MANAGEMENT`, and `CLINICAL_DIRECTOR` are mapped directly to `RECEPTIONIST` and `CLINIC_ADMIN` respectively).*

---

### 2. Permissions Matrix

| Operational Capability | `SUPER_ADMIN` | `CLINIC_ADMIN` | `DENTIST` | `RECEPTIONIST` |
| :--- | :---: | :---: | :---: | :---: |
| Provision New Clinic Tenant | ✅ | ❌ | ❌ | ❌ |
| Create / Deactivate Staff Users | ✅ | ✅ | ❌ | ❌ |
| View Marketing & Operational Analytics | ✅ | ✅ | ❌ | ❌ |
| Ingest & Assign Leads | ✅ | ✅ | ❌ | ✅ |
| Book & Reschedule Appointments | ✅ | ✅ | ✅ | ✅ |
| View Patient Contact Info & History | ✅ | ✅ | ✅ | ✅ |
| Issue Digital Prescriptions | ❌ | ✅ | ✅ | ❌ |
| Update Aligner Staging & Trays | ❌ | ✅ | ✅ | ❌ |
| View Immutable DPDP Audit Trail | ✅ | ✅ | ❌ | ❌ |

---

### 3. Session & Token Architecture

- **Token Format**: Standard JSON Web Token (JWT) signed via HS256 algorithm with a minimum 256-bit secret key (`JWT_SECRET`).
- **Payload Schema (`StaffTokenPayload`)**:
  ```typescript
  interface StaffTokenPayload {
    userId: string;
    email: string;
    fullName: string;
    role: 'SUPER_ADMIN' | 'CLINIC_ADMIN' | 'DENTIST' | 'RECEPTIONIST';
    tenantId: string;
    tenantSlug: string;
  }
  ```
- **Storage**: Set in HTTP-only, secure, `SameSite=Strict` browser cookies to prevent XSS exfiltration.
- **Expiration**: Standard 7-day expiration with explicit logout route (`POST /api/auth/logout`) that clears the cookie.
