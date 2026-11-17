# ARTIBOTS × PREETHI’S DENTISTRY
## Document 05: Repository Structure & File Organization

**Technology Partner:** Artibots Innovation Private Limited  
**Repository Root:** `d:\newdental`  

---

### 1. Directory Tree Overview

```
d:\newdental\
├── app\                           # Next.js 14 App Router routes & API endpoints
│   ├── about\                     # Clinic background & team
│   ├── api\                       # Server-side API domain controllers
│   │   ├── appointments\          # Booking, availability, rescheduling
│   │   ├── auth\                  # Login, session verification
│   │   ├── crm\                   # Back-office endpoints (analytics, prescriptions, etc.)
│   │   ├── cron\                  # Background workers (dispatcher, meta runner)
│   │   ├── leads\                 # Public lead ingestion
│   │   └── webhooks\              # Meta WhatsApp incoming webhook handlers
│   ├── blog\                      # Clinical blog & dynamic article routes
│   ├── booking\                   # Direct consultation booking UI
│   ├── clinical-insights\         # Patient education portal
│   ├── contact\                   # Satellite map & clinic address
│   ├── crm\                       # Artibots Dental CRM single-page operational suite
│   ├── faq\                       # Comprehensive patient FAQ
│   ├── gallery\                   # Before & after clinical transformations
│   ├── login\                     # Staff secure authentication portal
│   ├── privacy\                   # DPDP Act compliant privacy policy
│   ├── terms\                     # Clinical terms & appointment policies
│   ├── testimonials\              # Patient video stories & reviews
│   ├── treatments\                # Dental treatment category pages
│   │   └── invisalign-clear-aligners\ # Priority clear aligner landing page
│   ├── globals.css                # Global Tailwind CSS definitions
│   ├── layout.tsx                 # Master HTML structure & global metadata
│   └── page.tsx                   # Public homepage
├── components\                    # Reusable React UI components
│   ├── footer\                    # Clinic footer & legal links
│   ├── header\                    # Navigation bar & consultation CTA
│   ├── home\                      # Homepage modular blocks
│   ├── modal\                     # Booking & inquiry modal dialogs
│   ├── sections\                  # Reusable marketing sections (reels, banners, map)
│   └── ui\                        # Atoms & primitives (buttons, inputs, cards)
├── docs\                          # Master 18-file enterprise documentation suite
├── lib\                           # Core utility libraries & database singletons
│   ├── auth.ts                    # JWT creation & verification utilities
│   ├── db.ts                      # Prisma client singleton with global caching
│   └── utils.ts                   # Formatting & calculation helpers
├── prisma\                        # Data persistence layer
│   ├── schema.prisma              # Master multi-tenant PostgreSQL schema
│   └── seed.ts                    # Initial tenant & clinical director seed script
├── public\                        # Static assets (images, logos, icons)
├── render.yaml                    # Render Web Service blueprint specification
├── tailwind.config.ts             # Brand design tokens & theme extension
├── tsconfig.json                  # TypeScript compiler settings
└── package.json                   # Dependency definitions & build scripts
```

---

### 2. Coding Conventions & File Boundaries

1. **Server vs. Client Components**: Components requiring browser interactivity (state, effects, event handlers) must explicitly declare `'use client';` at line 1. All marketing and static content remain Server Components for maximum SEO and performance.
2. **Path Aliasing**: Imports use `@/*` mapped to the repository root for clean, non-fragile imports (e.g., `import prisma from '@/lib/db';`).
3. **API Boundary Separation**: API route handlers reside exclusively inside `app/api/**/route.ts` and export standard HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`).
