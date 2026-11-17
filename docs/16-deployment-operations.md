# ARTIBOTS × PREETHI’S DENTISTRY
## Document 16: Deployment, Operations & Hosting Runbook

**Technology Partner:** Artibots Innovation Private Limited  
**Target Platform:** Render Cloud Platform (Node.js Web Service)  
**Manifest:** `render.yaml`  

---

### 1. Production Hosting Architecture

The platform runs as a **Node.js Web Service** on Render, connected to an external managed PostgreSQL instance on Supabase:

```
[ Git Push to origin/main ]
           │
           ▼
[ Render Web Service Deployment Trigger ]
           │
           ▼
[ Build Command: npm run build ]
  - Runs: prisma generate && next build
           │
           ▼
[ Start Command: npm run start ]
  - Launches Next.js standalone HTTP listener on PORT 3000
           │
           ▼
[ Health Check: GET / ] --> 200 OK
```

> [!CAUTION]
> **Do NOT configure Render as a "Static Site"**. A static site cannot execute dynamic Next.js API routes (`app/api/*`), sign HTTP-only JWT cookies, or execute live Prisma database queries. It must be deployed as a **Web Service**.

---

### 2. Environment Variables Specification

The following variables must be configured in the Render Dashboard:

| Variable Name | Required | Description | Example / Notes |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | Yes | Set to production runtime. | `production` |
| `DATABASE_URL` | Yes | Supabase Transaction Pooler connection string. | `postgres://postgres.[ref]:[pass]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Yes | Supabase direct connection string for migrations. | `postgres://postgres.[ref]:[pass]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres` |
| `JWT_SECRET` | Yes | High-entropy secret for signing staff tokens. | Minimum 32-character random string |
| `NEXT_PUBLIC_TENANT_SLUG` | Yes | Default tenant slug for public branding. | `preethis-dentistry-cbe` |
| `WHATSAPP_PHONE_NUMBER_ID` | Optional | Meta WhatsApp Business Phone Number ID. | Required for live WhatsApp outbound dispatches |
| `WHATSAPP_ACCESS_TOKEN` | Optional | Permanent Meta System User Token. | Required for live WhatsApp outbound dispatches |

---

### 3. Operational Troubleshooting Procedures

#### Webpack 404 Chunk Invalidation
- **Symptom**: Browser console logs `404 Not Found` for `_next/static/chunks/main-app.js` or `page.js`.
- **Cause**: Simultaneous execution of `next build` while `next dev` is running overwrites build IDs and manifests.
- **Remedy**:
  1. Terminate all running node processes.
  2. Run `npm run clean` (removes `.next`, `dist`, `out`).
  3. Re-run `npm run build` followed by `npm run start`.

#### Database Connection Pooling Exhaustion
- **Symptom**: `PrismaClientInitializationError: Can't reach database server at ...`.
- **Cause**: Exceeding direct connection limits on Supabase free tier.
- **Remedy**: Verify that `DATABASE_URL` uses port `6543` with `?pgbouncer=true` rather than direct port `5432`.
