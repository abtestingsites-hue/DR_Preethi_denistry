# ARTIBOTS × PREETHI’S DENTISTRY
## Document 13: Business Intelligence & Operational Analytics

**Technology Partner:** Artibots Innovation Private Limited  
**Analytics Engine:** Server-Side Operational Aggregator (`/api/crm/operational-analytics`)  

---

### 1. Separation of Concerns: Marketing vs. Operational BI

To guarantee compliance with patient privacy standards and prevent cross-contamination of operational data, reporting is strictly divided into two independent spheres:

```
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│         MARKETING ANALYTICS           │   │         OPERATIONAL ANALYTICS         │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • Website Impressions & Pageviews     │   │ • Staff Lead Response SLA (<15 min)  │
│ • Conversion Funnel (Visit → Inquiry) │   │ • Chair Attendance & Completed Visits │
│ • Source Breakdown (Organic, Ads)     │   │ • Appointment Cancellation & No-Shows │
│ • Clear Aligner Engagement Metrics    │   │ • Aligner Patient Tray Compliance     │
│ • ZERO Patient PII in external tags   │   │ • WhatsApp Communication Queue Health │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
```

---

### 2. Operational Metrics & Calculation Definitions

| Metric Name | Calculation Method | Target SLA | Business Impact |
| :--- | :--- | :--- | :--- |
| **Lead Response Time** | Average duration between `leads.created_at` and `leads.updated_at` (status `CONTACTED`). | `< 15 Minutes` | High lead responsiveness correlates with a 3x higher consultation booking rate. |
| **Chair Attendance Rate** | `(Completed Appointments / Total Booked Appointments) * 100` | `> 85%` | Measures clinic capacity utilization and prevents idle surgical chair time. |
| **Cancellation Rate** | `(Cancelled Appointments / Total Booked Appointments) * 100` | `< 10%` | Identifies patient scheduling frictions and doctor availability issues. |
| **Aligner Inquiry Conversion** | `(Converted Aligner Patients / Total Aligner Inquiries) * 100` | `> 35%` | Primary commercial KPI evaluating clear aligner consultation performance. |
| **Queue Dispatch Health** | Count of records in `communication_logs` with status `FAILED` in past 24h. | `0 Failed` | Guarantees patient appointment slips and care instructions reach patients reliably. |

---

### 3. Real-Time Analytics API Response

Endpoint: `GET /api/crm/operational-analytics`

```json
{
  "summary": {
    "totalLeads": 142,
    "newLeadsPending": 4,
    "averageResponseTimeMinutes": 11.4,
    "slaBreachedCount": 1,
    "attendanceRatePercent": 89.2,
    "activeAlignerCases": 38
  },
  "queueHealth": {
    "queued": 2,
    "sentToday": 45,
    "failed": 0
  },
  "sourceDistribution": [
    { "source": "WEBSITE", "count": 86 },
    { "source": "WHATSAPP", "count": 42 },
    { "source": "INSTAGRAM", "count": 14 }
  ]
}
```
