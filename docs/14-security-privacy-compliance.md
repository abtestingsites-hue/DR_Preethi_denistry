# ARTIBOTS × PREETHI’S DENTISTRY
## Document 14: Security, Privacy & DPDP Act Compliance

**Technology Partner:** Artibots Innovation Private Limited  
**Regulatory Standards:** India Digital Personal Data Protection (DPDP) Act, 2023, OWASP Top 10  

---

### 1. Data Protection & Privacy Principles

In compliance with India's **Digital Personal Data Protection Act (DPDP), 2023**, the platform enforces strict data minimization, purpose limitation, and consent verification:

1. **Lawful Basis & Consent**: Consultation booking and assessment intake include explicit consent checkboxes recording the patient's agreement for the clinic to contact them regarding their appointment.
2. **Zero PII Exposure to Third Parties**: No patient phone numbers, email addresses, names, or dental health inquiries are passed into Google Analytics, Meta Pixel, or URL query parameters.
3. **Data Principal Rights**:
   - **Right to Access**: Patients can request their appointment and communication history via the clinic administrator.
   - **Right to Erasure**: Soft and hard deletion workflows exist under `CLINIC_ADMIN` authorization to purge non-clinical lead records upon verified patient request.

---

### 2. Cryptographic Security Standards

- **Transport Security**: Mandatory TLS 1.3 across all production domains with HTTP Strict Transport Security (HSTS) headers.
- **Password Storage**: Passwords hashed using `bcryptjs` with a work factor of 10.
- **Session Protection**:
  - JWT tokens signed with SHA-256 HMAC (`HS256`).
  - Stored exclusively in HTTP-only cookies with `Secure` and `SameSite=Strict` attributes to mitigate Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).
- **Secrets Management**: Database credentials, JWT secrets, and Meta API keys are strictly loaded from environment variables (`.env`) and never committed to version control.

---

### 3. Immutable Audit Logging

Every critical administrative and clinical action writes an immutable record to the `audit_logs` table:
- **Logged Events**:
  - Staff authentication attempts (successful and failed).
  - Patient personal information lookups and exports.
  - Appointment reschedules and cancellations.
  - Digital prescription generation.
  - Aligner treatment staging updates.
- **Audit Record Schema**: Includes `tenantId`, `userId`, `action`, `entityType`, `entityId`, `changes` (before/after JSON diff), `ipAddress`, and `createdAt` timestamp.
