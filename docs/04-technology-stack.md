# ARTIBOTS × PREETHI’S DENTISTRY
## Document 04: Technology Stack & Technical Justification

**Technology Partner:** Artibots Innovation Private Limited  
**Flagship Client:** Dr. Preethi’s Dentistry, Coimbatore  

---

### 1. Technology Inventory

| Layer | Component | Version / Specification | Justification |
| :--- | :--- | :--- | :--- |
| **Runtime** | Node.js | v24.20.0 | High performance JavaScript runtime with full ESM and async support. |
| **Framework** | Next.js | 14.2.15 (App Router) | Unified React SSR, SSG, and edge-ready API routes in a single modular monolith. |
| **Language** | TypeScript | 5.x | Strict compile-time type safety preventing runtime null/undefined errors across patient models. |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first styling with zero runtime overhead and responsive design tokens. |
| **Database** | PostgreSQL | 15+ (Supabase) | ACID-compliant relational storage with connection pooling and JSONB support. |
| **ORM** | Prisma ORM | 5.22.0 (Pinned LTS) | Type-safe query building and schema migrations; pinned to avoid Prisma v8 config breaking changes. |
| **Validation** | Zod | 3.23.8 | Declarative schema validation at all API boundaries. |
| **Authentication** | Jose | 5.9.6 | Lightweight, high-performance JWT signing and verification. |
| **Cryptography** | bcryptjs | 2.4.3 | Secure salted password hashing for staff accounts. |
| **Hosting Target** | Render Web Service | Node.js Engine | Scalable cloud hosting configured via `render.yaml` with continuous Git deployment. |

---

### 2. Architectural Decisions & Trade-Offs

#### Next.js Modular Monolith vs. Microservices
- **Decision**: Architect as a single Next.js modular monolith rather than splitting into separate API and frontend microservices.
- **Justification**: Eliminates distributed system complexity, inter-service network latency, and multi-repository sync issues while providing full route and bundle isolation.

#### Prisma 5.22.0 vs. Prisma 8
- **Decision**: Pin Prisma ORM to `5.22.0`.
- **Justification**: Earlier attempts using unpinned Prisma v8 resulted in `CLI.V7_COMMAND` and configuration section mismatches. Version 5.22.0 provides rock-solid PostgreSQL connection pooling on Supabase.

#### Supabase Connection Pooling (Port 6543 vs. 5432)
- **Decision**: Configure `DATABASE_URL` to point to Supabase Transaction Pooler (`aws-0-ap-south-1.pooler.supabase.com:6543`) with `DIRECT_URL` pointing to direct session port `5432`.
- **Justification**: Prevents connection exhaustion during sudden spikes in appointment inquiries or webhook traffic.
