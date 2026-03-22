# Handoff: Feature Design Documents & ADRs

## Objective

Create **one design.md** and **one ADR (Architecture Decision Record) file** per feature in the "Unified Family Financial Hub" project group. The ADRs should favor **cost-effective, open-source infrastructure**.

---

## Context

### What already exists

The **Independent School Wallet Setup (#3)** feature already has a complete design.md at:
- `openspec/changes/independent-school-wallet/design.md` (751 lines)

This serves as the **reference template** for structure, depth, and style. It covers:
- System architecture with Mermaid diagrams
- Design principles
- Authentication design
- Data models (Mongoose schemas)
- API contracts (all endpoints with request/response shapes)
- Scheduled payment processing flow
- Security design
- Frontend architecture
- Implementation notes

The backend has been fully refactored to **NestJS** with:
- JWT auth (access + refresh tokens), role-based guards
- `FeeType` as an enum (not a collection)
- `User` model acts as Parent (no separate Parent table)
- `ScheduledPayment` as intent, `Transaction` as execution
- Notification module for payment alerts
- Cron-based payment scheduler with retry/backoff

### Tech stack (established)

| Layer | Technology |
|-------|-----------|
| Backend | NestJS (TypeScript, OOP, modules) |
| Frontend | Next.js 16 (TypeScript) |
| Database | MongoDB with Mongoose |
| Auth | JWT (access + refresh tokens), Passport |
| Validation | class-validator / class-transformer |
| Scheduling | @nestjs/schedule (cron) |
| Existing models | User, PaymentItem, Transaction (DO NOT ALTER) |

---

## Features to document (3 remaining)

### 1. Payment & Transaction Engine (#4)
**Timeline:** Apr 1, 2026 – May 30, 2026

**User stories:**
- As a parent, I want to make one-time and recurring payments, so that I can manage tuition efficiently.
- As a parent, I want digital receipts, so that I have proof of payment.
- As a parent, I want a transaction history ledger, so that I can review and export my financial records.

**Scope hints for design.md:**
- Payment execution flow (wallet deduction → Transaction creation → receipt generation)
- Integration with existing `Transaction` and `PaymentItem` models
- Receipt generation (PDF or HTML → downloadable)
- Transaction ledger with filtering, pagination, export (CSV/PDF)
- Recurring payment processing (already partially in ScheduledPaymentsModule)
- Idempotency and concurrency safety
- Error handling and rollback

**ADR topics:**
- Receipt generation: open-source PDF lib (e.g., PDFKit, Puppeteer HTML-to-PDF, jsPDF)
- Export format: CSV vs PDF vs both
- Storage: local filesystem vs S3-compatible (MinIO for self-hosted)
- Whether to use event-driven architecture (e.g., Bull queues) for async receipt generation

---

### 2. Multi-Payment Support (#6)
**Timeline:** Apr 1, 2026 – Jun 29, 2026

**User stories:**
- As a parent, I want multiple payment options, so that I can choose what works best for me.
- As a parent, I want instalment options, so that large payments are manageable.
- As a parent, I want refunds processed transparently, so that I feel secure using the platform.

**Scope hints for design.md:**
- Payment method abstraction (wallet, bank transfer, card, USSD)
- Payment gateway integration strategy (Paystack / Flutterwave — Nigerian market)
- Instalment plan model (split a ScheduledPayment into N instalments with individual due dates)
- Refund workflow (request → review → execute → notification)
- Payment method CRUD (save card tokens, bank accounts)
- Partial payment support
- Payment reconciliation

**ADR topics:**
- Payment gateway selection: Paystack vs Flutterwave (cost, API quality, coverage)
- Instalment engine: custom vs third-party
- Refund model: immediate vs manual approval
- PCI compliance approach: tokenization via gateway (never store raw card data)
- Queue system for async payment processing (BullMQ with Redis — open source)

---

### 3. Smart School Onboarding Detection (#5)
**Timeline:** Jan 1, 2027 – Jun 29, 2027

**User stories:**
- As a parent, I want to be notified when my child's school joins the platform, so that I can transition to the official portal.
- As a parent, I want my historical payment data migrated automatically, so that I do not lose records.

**Scope hints for design.md:**
- School matching algorithm (name fuzzy match, location, contact info)
- School onboarding event model (when a real school registers)
- Parent notification flow when match is detected
- Data migration strategy (independent SchoolProfile → official School entity)
- Historical payment preservation during migration
- Transition UX (opt-in, preview diff, confirm migration)
- Conflict resolution (multiple parents tracking same school independently)

**ADR topics:**
- Fuzzy matching library: Fuse.js (client-side) vs MongoDB Atlas Search vs open-source Meilisearch/Typesense
- Event system: simple polling vs WebSocket vs Server-Sent Events for real-time notifications
- Migration strategy: copy-on-write vs in-place update
- Search infrastructure: embedded MongoDB text index (free) vs dedicated search engine

---

## Output structure

For each feature, create a folder under `openspec/changes/` and produce two files:

```
openspec/changes/payment-transaction-engine/
├── design.md          # Full design doc (same depth as independent-school-wallet/design.md)
└── adr.md             # Architecture Decision Record

openspec/changes/multi-payment-support/
├── design.md
└── adr.md

openspec/changes/smart-school-onboarding-detection/
├── design.md
└── adr.md
```

---

## Design.md template (follow the independent-school-wallet structure)

Each `design.md` should contain:

1. **System Architecture** — high-level Mermaid diagram, design principles
2. **Data Models** — Mongoose schema definitions with field types, indexes, relations
3. **API Contracts** — every endpoint with method, path, request body, response shape, auth requirements
4. **Core Flows** — sequence diagrams or flowcharts for key processes
5. **Security Design** — auth, authorization, input validation, rate limiting
6. **Frontend Architecture** — pages, components, state management approach
7. **Implementation Notes** — migration concerns, backward compatibility, phasing

---

## ADR template

Each `adr.md` should follow this structure:

```markdown
# ADR: [Title]

## Status
Proposed

## Context
[Why this decision is needed]

## Decision Drivers
- Cost-effective (prefer open-source)
- Self-hostable where possible
- Nigerian market considerations (payment gateways, latency)
- Fits existing NestJS + MongoDB stack

## Options Considered
### Option A: [Name]
- Pros: ...
- Cons: ...
- Cost: ...

### Option B: [Name]
- Pros: ...
- Cons: ...
- Cost: ...

## Decision
[Which option and why]

## Consequences
- Positive: ...
- Negative: ...
- Risks: ...
```

---

## Key constraints & principles

1. **Cost-effective / open-source first** — Prefer self-hostable OSS (MinIO over S3, BullMQ over SQS, Meilisearch over Algolia). Only use paid services where OSS isn't viable (e.g., payment gateways).
2. **Nigerian market** — Payment gateways must support NGN, bank transfer, USSD. Paystack and Flutterwave are the primary options.
3. **Don't alter existing models** — `User`, `PaymentItem`, `Transaction` schemas exist. Extend, don't break.
4. **NestJS module pattern** — Each feature should be designed as one or more NestJS modules following the established pattern (controller + service + schema + DTOs + guards).
5. **Reference the existing design** — Read `openspec/changes/independent-school-wallet/design.md` thoroughly for style, depth, and conventions before writing.
6. **Backend is NestJS** — All new backend design should target NestJS (not Express). JWT auth with role guards is already in place.

---

## Reference files to read first

- `openspec/changes/independent-school-wallet/design.md` — **primary reference** for format and depth
- `backend-nestjs/src/common/enums/` — existing enums (FeeType, PaymentStatus, etc.)
- `backend-nestjs/src/scheduled-payments/` — existing payment scheduling (service, scheduler, schema)
- `backend-nestjs/src/notifications/` — existing notification module
- `backend-nestjs/src/users/schemas/user.schema.ts` — User model with balance field
- `frontend/lib/api.ts` — current API client types and endpoints
