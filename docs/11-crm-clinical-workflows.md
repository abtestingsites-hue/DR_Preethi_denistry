# ARTIBOTS × PREETHI’S DENTISTRY
## Document 11: CRM Operational & Clinical Workflows

**Technology Partner:** Artibots Innovation Private Limited  
**Flagship Client:** Dr. Preethi’s Dentistry, Coimbatore  

---

### 1. Front-Desk Lead Triage Workflow

```
[ NEW LEAD ] ────(Phone / WhatsApp Call < 15 Min)────> [ CONTACTED ]
      │                                                       │
      │ (Unreachable after 3 attempts)                        │ (Patient selects date & time)
      ▼                                                       ▼
[ UNRESPONSIVE ]                                    [ CONSULTATION_BOOKED ]
                                                              │
                                                              ▼
                                                    [ CONVERTED PATIENT ]
```

1. **New Lead Arrival**: Appears in `Leads` tab with source tag (`WEBSITE`, `WHATSAPP`, `INSTAGRAM`).
2. **15-Minute Response Protocol**:
   - Staff initiates outbound call or approved WhatsApp intake.
   - If response time exceeds 15 minutes, lead is flagged in amber on the BI Analytics dashboard.
3. **Status Update**: Staff updates lead status and adds contextual triage notes.

---

### 2. Appointment Reschedule & Cancellation Protocol

When a patient contacts the clinic to adjust a booking:
1. Staff opens the **Appointments** tab in `/crm`.
2. Locates patient record and clicks **Reschedule**.
3. Selects new date; the system queries live availability to display valid, unbooked 30-minute intervals.
4. Staff enters a mandatory **Reschedule Reason** (e.g., "Patient personal emergency", "Doctor surgery extension").
5. Upon submission:
   - Appointment record updates with new `scheduledStart` and status `RESCHEDULED`.
   - New transactional WhatsApp slip is queued with the updated time.
   - Audit trail captures the staff user ID, timestamp, and previous vs. new timings.

---

### 3. Digital Prescription Generation Workflow

1. In the **Patients** or **Appointments** tab, authorized clinical staff (`CLINIC_ADMIN` or `DENTIST`) clicks **Issue Digital Rx**.
2. Staff inputs:
   - Medication Name (e.g., *Amoxicillin 500mg*, *Paracetamol 650mg*)
   - Dosage & Frequency (*1-0-1 after food*)
   - Duration (*5 days*)
   - Clinical Advice / Post-Op Instructions
3. The prescription is locked and saved to the patient's record, generating a cryptographic record in `audit_logs`.

---

### 4. Clear Aligner Staging Tracker

For patients undergoing orthodontic aligner treatment:
- **Tray Counter**: Displays current tray out of total (e.g., `Tray 4 of 28`).
- **Wear Time Monitoring**: Tracks daily wear compliance target (22 hours/day).
- **Next Scan Scheduling**: Displays due date for clinical check-in or refinement intraoral scan.
- **Stage Progression**: Doctor increments tray stage upon physical inspection or photo submission.
