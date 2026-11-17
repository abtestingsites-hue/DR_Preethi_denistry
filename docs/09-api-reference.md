# ARTIBOTS × PREETHI’S DENTISTRY
## Document 09: API Reference & Integration Endpoints

**Technology Partner:** Artibots Innovation Private Limited  
**API Standard:** RESTful JSON over TLS, Next.js 14 Route Handlers  

---

### 1. Authentication Endpoints

#### `POST /api/auth/login`
- **Description**: Authenticates clinic staff and sets HTTP-only JWT cookie.
- **Request Body**:
  ```json
  { "email": "staff@preethisdentistry.com", "password": "securepassword", "tenantSlug": "preethis-dentistry-cbe" }
  ```
- **Responses**: `200 OK` (with Set-Cookie), `401 Unauthorized` (Invalid credentials).

#### `GET /api/auth/me`
- **Description**: Returns verified user profile from active JWT cookie.
- **Responses**: `200 OK` (`{ user: { id, fullName, role, tenantId } }`), `401 Unauthorized`.

---

### 2. Patient & Booking Endpoints

#### `POST /api/leads`
- **Description**: Public intake for consultation requests from website forms or assessment widget.
- **Request Body (Zod Validated)**:
  ```json
  { "fullName": "Ramesh Kumar", "phoneNumber": "+919876543210", "email": "ramesh@example.com", "treatmentSlug": "invisalign", "notes": "Interested in clear aligners" }
  ```
- **Responses**: `201 Created` (`{ success: true, leadId: "..." }`), `400 Bad Request`.

#### `GET /api/appointments/availability`
- **Description**: Computes open 30-minute consultation slots for a given date, filtering out existing bookings.
- **Query Parameters**: `date` (`YYYY-MM-DD`).
- **Response**:
  ```json
  { "date": "2026-11-20", "availableSlots": ["10:00", "10:30", "11:00", "17:00", "17:30", "18:00"] }
  ```

#### `POST /api/appointments`
- **Description**: Atomically books a verified slot, creates/links patient record, assigns MRN, and queues WhatsApp confirmation.
- **Request Body**:
  ```json
  { "fullName": "Ramesh Kumar", "phoneNumber": "+919876543210", "treatmentType": "Invisalign Consultation", "scheduledStart": "2026-11-20T10:00:00Z", "notes": "First visit" }
  ```
- **Responses**: `201 Created` (`{ appointmentId, medicalRecordNumber }`), `409 Conflict` (Slot already taken).

#### `PATCH /api/appointments/reschedule`
- **Description**: Reschedules an existing appointment to a new slot with mandatory reason tracking.
- **Request Body**:
  ```json
  { "appointmentId": "...", "newStart": "2026-11-21T11:00:00Z", "reason": "Patient travel conflict" }
  ```
- **Responses**: `200 OK`, `409 Conflict`.

---

### 3. CRM & Back-Office Endpoints

- `GET /api/crm/leads`: Fetches paginated leads scoped to current tenant.
- `GET /api/crm/appointments`: Fetches active, completed, or cancelled appointments.
- `GET /api/crm/patients`: Returns patient directory with MRN and history.
- `POST /api/crm/prescriptions`: Issues digital prescription and creates audit log.
- `POST /api/crm/aligner-tracker`: Updates patient aligner tray progress and wear time.
- `GET /api/crm/operational-analytics`: Computes SLA response times, attendance rates, and queue health.

---

### 4. Background & Webhook Endpoints

- `GET /api/webhooks/whatsapp`: Webhook challenge verification for Meta Cloud API.
- `POST /api/webhooks/whatsapp`: Inbound WhatsApp message processor & auto-lead generator.
- `POST /api/cron/dispatch-queue`: Background poller processing staged communication logs.
- `POST /api/cron/meta-dispatcher`: Live Meta Cloud API dispatcher with fallback simulation.
