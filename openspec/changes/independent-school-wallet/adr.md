#  ADR: Independent School Wallet Setup— Technology Decisions

## Status

Accepted (retroactive — decisions already implemented)

---

## ADR-1: Backend Framework — NestJS over Express

### Context

The original backend was built with plain Express.js (`backend/` and `backend-nextjs/`). As the platform grew to include school profiles, children, scheduled payments, and notifications, the codebase needed stronger structure, type safety, and modularity.

### Decision Drivers

- Strong TypeScript support (strict typing, decorators)
- Modular architecture (each domain as an isolated module)
- Built-in dependency injection
- First-class support for guards, pipes, interceptors, and filters
- Ecosystem maturity (Mongoose integration, JWT, scheduling, queues)
- Team familiarity and hiring pool in the Nigerian dev market

### Options Considered

#### Option A: NestJS (TypeScript, OOP, decorator-driven)

- **Pros**: Opinionated structure enforces consistency, built-in DI container, `@nestjs/mongoose` for schema decorators, `@nestjs/passport` for JWT, `@nestjs/schedule` for cron, `class-validator` for DTO validation, excellent documentation, strong TypeScript support, modular by design.
- **Cons**: Steeper learning curve than Express, more boilerplate per module (module + controller + service + DTOs), heavier runtime than bare Express.
- **Cost**: Free (MIT license). Moderate migration effort from Express.

#### Option B: Express.js (existing — plain JavaScript/TypeScript)

- **Pros**: Already in use, minimal boilerplate, flexible, largest ecosystem, simple to understand.
- **Cons**: No enforced structure (leads to inconsistent code), manual DI wiring, no built-in validation pipeline, middleware-based auth is fragile, TypeScript support requires manual setup, hard to maintain as codebase grows.
- **Cost**: Free. Already deployed.

#### Option C: Fastify (with TypeScript)

- **Pros**: Faster than Express (~2x throughput), schema-based validation (JSON Schema), plugin architecture, TypeScript support.
- **Cons**: Smaller ecosystem than Express/NestJS, less opinionated (same structural issues as Express), fewer NestJS-like integrations for Mongoose/Passport/cron.
- **Cost**: Free (MIT license).

### Decision

**Option A: NestJS**

NestJS provides the structure needed for a growing platform with multiple domain modules. Each feature (school profiles, children, payments, notifications) maps cleanly to a NestJS module with its own controller, service, schema, and DTOs. The decorator-based approach eliminates boilerplate for auth guards, validation, and role checking.

The migration from Express was done in `backend-nestjs/` as a parallel deployment, allowing both backends to run during transition.

### Consequences

- **Positive**: Consistent module structure, strong typing, built-in validation pipeline, clean auth via guards/decorators, easy to onboard new developers.
- **Negative**: More files per feature (~6-8 files per module vs 2-3 in Express). Acceptable trade-off for maintainability.
- **Risks**: None realized — NestJS has proven stable and productive.

---

## ADR-2: FeeType as Enum, Not a Collection

### Context

School fees come in categories: tuition, meals, transport, uniforms, books, trips, extracurricular, and other. We needed to decide whether fee categories should be a MongoDB collection with CRUD endpoints or a compile-time TypeScript enum.

### Decision Drivers

- Simplicity (avoid unnecessary CRUD complexity)
- Performance (no database lookups for fee types)
- Type safety (compile-time validation)
- Extensibility (can new fee types be added at runtime?)

### Options Considered

#### Option A: TypeScript enum (compile-time constant)

- **Pros**: Zero database queries, type-safe at compile time, no CRUD endpoints to build/secure, no FeeCategory model to maintain, enum values validated by `class-validator` decorators (`@IsEnum(FeeType)`), simple to extend (add a value, redeploy).
- **Cons**: Adding a new fee type requires a code deploy (not runtime-configurable), parents can't create custom fee types.
- **Cost**: Zero. Part of the codebase.

#### Option B: MongoDB collection with CRUD API

- **Pros**: Runtime-configurable (admin can add fee types without deploy), parents could create custom categories.
- **Cons**: Additional model, service, controller, DTOs (~8 files), database queries on every payment creation to validate fee type, cache invalidation complexity, authorization concerns (who can create/edit fee types?), over-engineered for 8 categories.
- **Cost**: Development and maintenance overhead for minimal benefit.

### Decision

**Option A: TypeScript enum**

Fee categories are a small, stable set (`tuition`, `meals`, `transport`, `uniform`, `books`, `trips`, `extracurricular`, `other`). The `OTHER` value with an optional `description` field on `ScheduledPayment` covers edge cases. There's no business requirement for runtime-configurable fee types at this stage.

```typescript
export enum FeeType {
  TUITION = 'tuition',
  MEALS = 'meals',
  TRANSPORT = 'transport',
  UNIFORM = 'uniform',
  BOOKS = 'books',
  TRIPS = 'trips',
  EXTRACURRICULAR = 'extracurricular',
  OTHER = 'other',
}
```

### Consequences

- **Positive**: Zero complexity, type-safe, no database overhead, no additional CRUD surface to secure.
- **Negative**: New fee types require a code deploy. Acceptable — fee categories change rarely (once per year at most).
- **Risks**: None. If runtime configurability is needed later, a migration path exists (add a FeeCategory collection and map existing enum values).

---

## ADR-3: User as Parent (No Separate Parent Table)

### Context

The platform has two user roles: `parent` and `admin`. Parents create school profiles, manage children, and schedule payments. We needed to decide whether to create a separate `Parent` model or reuse the `User` model.

### Decision Drivers

- Data model simplicity
- Authentication coherence (one login, one identity)
- Avoid JOINs / populate chains
- Wallet balance ownership

### Options Considered

#### Option A: User IS the Parent (single model, role-based)

- **Pros**: Single `User` document holds auth credentials, profile info, wallet balance, and role. No JOINs needed. `@Roles(UserRole.PARENT)` guard restricts parent endpoints. Simple `{ parent: user._id }` scoping on all queries. Wallet balance lives on the same document as the authenticated identity.
- **Cons**: User model accumulates parent-specific fields (like `balance`). Admin users have an unused `balance` field.
- **Cost**: Zero. Simplifies the data model.

#### Option B: Separate Parent model (User → Parent reference)

- **Pros**: Clean separation of concerns (auth vs domain), parent-specific fields isolated, extensible for other roles (teacher, school admin).
- **Cons**: Every parent query requires a JOIN/populate from User to Parent, wallet operations need two lookups, registration creates two documents (transactional), more complex auth flow, additional model/service/controller.
- **Cost**: Significant development and query overhead.

### Decision

**Option A: User IS the Parent**

The `User` schema serves dual purpose. The `role` field (`parent` | `admin`) determines access. Parent-specific fields (`balance`, `phone`) are directly on `User`. All child documents use `{ parent: user._id }` for scoping.

```typescript
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ type: String, enum: UserRole, default: UserRole.PARENT }) role: UserRole;
  @Prop() phone?: string;
  @Prop({ default: 0 }) balance: number;
}
```

### Consequences

- **Positive**: Simpler data model, no JOINs for parent queries, atomic wallet operations on a single document, cleaner auth flow.
- **Negative**: Unused `balance` field on admin users. Negligible — MongoDB doesn't allocate space for unset optional fields.
- **Risks**: If future roles (teacher, school admin) need very different profile shapes, we may need role-specific sub-documents. Mitigated by MongoDB's flexible schema — fields can be added per role without migration.

---

## ADR-4: Cron-Based Payment Scheduling with @nestjs/schedule

### Context

Scheduled payments need to be processed automatically when their due date arrives. The system must handle batch processing, retries, and recurring payment creation. We needed a scheduling mechanism.

### Decision Drivers

- Self-hostable (no external scheduler service)
- Fits NestJS ecosystem
- Reliable for financial operations
- Simple to configure and monitor

### Options Considered

#### Option A: @nestjs/schedule (cron decorators)

- **Pros**: Built into NestJS ecosystem, simple `@Cron()` decorator, supports cron expressions, runs in-process, zero external dependencies, easy to test (call the method directly), configurable via env vars.
- **Cons**: In-process only (not distributed — runs on every instance in a multi-instance deployment), no built-in persistence of cron state.
- **Cost**: Free. Part of NestJS.

#### Option B: BullMQ repeatable jobs

- **Pros**: Distributed (only one instance processes the job), persistent (survives restarts), built-in retries.
- **Cons**: Requires Redis, more complex setup, overkill for a single-instance deployment at current scale.
- **Cost**: Free (BullMQ + Redis). Additional infra.

#### Option C: External cron (Railway cron jobs, OS crontab)

- **Pros**: Runs independently of the application, platform-managed.
- **Cons**: Decoupled from NestJS DI (can't inject services), harder to test, platform-dependent configuration, no access to in-memory state.
- **Cost**: Free on Railway. Platform lock-in.

### Decision

**Option A: @nestjs/schedule**

For a single-instance deployment, `@nestjs/schedule` is the simplest and most effective choice. Three cron jobs handle all scheduling needs:

| Job | Schedule | Purpose |
|-----|----------|---------|
| `processDuePayments` | Every 15 min | Find and execute due payments |
| `sendUpcomingNotifications` | Daily at 8am | Notify parents of upcoming/overdue payments |
| `recoverStaleLocks` | Every hour | Reset stuck `processing` payments |

The cron interval is configurable via `PAYMENT_CRON_INTERVAL` env var.

**Migration path**: When scaling to multiple instances, replace the `@Cron` decorator with a BullMQ repeatable job (ensures only one instance runs the job). The processing logic in `PaymentSchedulerService` stays identical.

### Consequences

- **Positive**: Zero external dependencies, simple decorator-based setup, configurable, testable.
- **Negative**: Not distributed — all instances run the cron in multi-instance deployments. Mitigated by optimistic locking (see ADR-5) which prevents double-processing.
- **Risks**: Cron drift if processing takes longer than the interval. Mitigated by the `BATCH_SIZE = 50` limit and stale lock recovery.

---

## ADR-5: Optimistic Concurrency Control for Payment Processing

### Context

When the cron job processes payments, it must prevent double-execution — especially if two cron ticks overlap or multiple server instances run simultaneously. We needed a concurrency control strategy.

### Decision Drivers

- Prevent double-charging (critical for financial operations)
- No external distributed lock service
- Works with MongoDB (no Postgres advisory locks)
- Minimal performance impact

### Options Considered

#### Option A: Optimistic locking (version field)

- **Pros**: No external dependencies, uses MongoDB's atomic `findOneAndUpdate`, version field prevents concurrent updates, standard pattern for MongoDB, lightweight (single field), works across multiple instances.
- **Cons**: Contention causes one transaction to "lose" the lock (must retry or skip). At our payment volume, contention is negligible.
- **Cost**: Zero. One additional field per document.

#### Option B: Pessimistic locking (distributed lock via Redis)

- **Pros**: Guarantees exclusive access, explicit lock/unlock semantics, well-understood pattern.
- **Cons**: Requires Redis, lock expiry management, deadlock risk if lock holder crashes, additional infrastructure.
- **Cost**: Free (Redis). Operational complexity.

#### Option C: MongoDB transactions (multi-document ACID)

- **Pros**: Full ACID guarantees across multiple document updates (balance deduction + payment status update).
- **Cons**: Requires replica set, higher latency, more complex error handling, overkill when atomic `$inc` already provides field-level atomicity.
- **Cost**: Free (requires replica set). Performance overhead.

### Decision

**Option A: Optimistic locking via version field**

Each `ScheduledPayment` has a `version: number` field. The payment processor uses a conditional `findOneAndUpdate`:

```typescript
const locked = await this.paymentModel.findOneAndUpdate(
  { _id: paymentId, status: PaymentStatus.PENDING, version: currentVersion },
  { $set: { status: PaymentStatus.PROCESSING }, $inc: { version: 1 } },
  { new: true },
);
if (!locked) return; // Another process already claimed it
```

Wallet deduction uses atomic `$inc` with a balance check:

```typescript
const user = await this.userModel.findOneAndUpdate(
  { _id: payment.parent, balance: { $gte: payment.amount } },
  { $inc: { balance: -payment.amount } },
  { new: true },
);
if (!user) // Insufficient balance — handle failure
```

Combined, these two atomic operations prevent double-charging without requiring distributed locks or transactions.

Additionally, an `idempotencyKey` on `ScheduledPayment` (unique sparse index) prevents duplicate transaction creation for recurring payments.

### Consequences

- **Positive**: Zero external dependencies, proven MongoDB pattern, prevents double-charging, lightweight, works across instances.
- **Negative**: Under extreme contention, some payments may be skipped in a cron tick and picked up in the next one. This is acceptable — a 15-minute delay is fine for scheduled payments.
- **Risks**: Stale locks (payment stuck in `processing` after a crash). Mitigated by the `recoverStaleLocks` cron that resets payments stuck in `processing` for more than 30 minutes.

---

## ADR-6: Retry Policy with Exponential Backoff

### Context

Payments may fail due to insufficient wallet balance. Rather than immediately marking them as permanently failed, the system should retry with increasing delays to give parents time to top up their wallet.

### Decision Drivers

- Parent-friendly (give time to add funds)
- Prevent infinite retries (cap at a reasonable number)
- Predictable backoff schedule
- Simple implementation

### Options Considered

#### Option A: Fixed backoff (retry every N hours)

- **Pros**: Simple, predictable.
- **Cons**: May be too frequent (annoying notifications) or too infrequent (misses the window when parent adds funds).
- **Cost**: Zero.

#### Option B: Exponential backoff (1h → 6h → 24h)

- **Pros**: Progressively gives more time, first retry is quick (catches immediate top-ups), later retries are spaced out (reduces noise), 3 retries over ~31 hours covers a full business day.
- **Cons**: Slightly more complex than fixed backoff.
- **Cost**: Zero.

#### Option C: No retry (fail immediately)

- **Pros**: Simplest implementation.
- **Cons**: Poor UX — parent must manually re-trigger payment after topping up. Defeats the purpose of scheduled payments.
- **Cost**: Zero. High UX cost.

### Decision

**Option B: Exponential backoff (1h, 6h, 24h)**

| Retry | Delay | Total Elapsed |
|-------|-------|---------------|
| 1 | 1 hour | 1 hour |
| 2 | 6 hours | 7 hours |
| 3 | 24 hours | 31 hours |
| Terminal | — | Permanently failed |

Each retry:
1. Increments `retryCount`
2. Sets `scheduledDate` to `now + backoff`
3. Resets `status` to `pending` (so the cron picks it up again)
4. Sends a `payment_failed` notification (with "will retry" or "permanently failed" messaging)

After 3 failures, the payment status becomes `failed` (terminal). The parent receives a final notification and can manually retry or cancel.

### Consequences

- **Positive**: Parent-friendly, covers a full business day, progressive delays reduce notification fatigue, simple implementation.
- **Negative**: A payment could take up to 31 hours to permanently fail. Acceptable — this is a feature, not a bug.
- **Risks**: None significant. The backoff constants are configurable if tuning is needed.

---

## Summary of Decisions

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Backend framework | NestJS | Modular, typed, decorator-driven |
| Fee types | TypeScript enum (not collection) | Simplicity, type safety, 8 stable values |
| Parent model | User IS Parent (single model) | No JOINs, atomic wallet ops |
| Payment scheduling | @nestjs/schedule (cron) | In-process, zero external deps |
| Concurrency control | Optimistic locking (version field) | Prevents double-charging, no Redis needed |
| Retry policy | Exponential backoff (1h, 6h, 24h) | Parent-friendly, covers a full business day |
