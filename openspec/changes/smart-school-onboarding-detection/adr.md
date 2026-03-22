# ADR: Smart School Onboarding Detection — Technology Decisions

## Status

Proposed

---

## ADR-1: Fuzzy Matching / Search Infrastructure

### Context

When an official school registers on Kudegowo, the system must find matching parent-created `SchoolProfile` documents. School names are entered independently by parents and may differ from the official name (abbreviations, typos, alternative names, missing words). We need a search/matching strategy that handles these variations reliably.

### Decision Drivers

- Cost-effective (prefer free/open-source)
- Self-hostable (no vendor lock-in, no per-query fees)
- Fits existing MongoDB + NestJS stack
- Handles Nigerian school naming conventions (e.g., "FGGC Benin" vs "Federal Government Girls' College, Benin City")
- Low operational overhead (minimal new infrastructure)
- Adequate recall for fuzzy name matching (not just exact prefix match)

### Options Considered

#### Option A: MongoDB Text Index (built-in)

- **Pros**: Zero additional infrastructure, already available in MongoDB, supports weighted multi-field text search, free, no external dependency, compound with other query filters (state, city), adequate for our dataset size (< 100K school profiles).
- **Cons**: No true fuzzy matching (no typo tolerance — text search is token-based stemming), no phonetic matching, limited relevance scoring compared to dedicated search engines, no synonym support out-of-the-box.
- **Cost**: Free. Already part of MongoDB.

#### Option B: MongoDB Atlas Search (managed)

- **Pros**: Built into Atlas, supports fuzzy matching (`fuzzy` operator with `maxEdits`), autocomplete, compound scoring, faceted search, no separate infrastructure.
- **Cons**: Requires MongoDB Atlas (not self-hostable), costs scale with data size and query volume, vendor lock-in to Atlas, not available on self-hosted MongoDB or Railway/Render hosted MongoDB.
- **Cost**: Included in Atlas M10+ tiers ($57+/month). Not available on shared tier (M0/M2/M5).

#### Option C: Meilisearch (self-hosted)

- **Pros**: Excellent fuzzy matching (typo tolerance by default), fast (Rust-based), easy setup (single binary/Docker), beautiful dashboard, REST API, supports filters and facets, open-source (MIT).
- **Cons**: Additional infrastructure (Docker container, ~128MB RAM), requires syncing data from MongoDB to Meilisearch, adds operational complexity, overkill for matching use case (we need batch matching, not real-time search).
- **Cost**: Free (open-source). Infra: ~128MB RAM for Meilisearch container.

#### Option D: Typesense (self-hosted)

- **Pros**: Similar to Meilisearch — fast, typo-tolerant, open-source (GPL-3.0), built-in fuzzy search, geographic search support.
- **Cons**: GPL license (more restrictive than MIT), similar infra overhead as Meilisearch, data sync complexity.
- **Cost**: Free (open-source). Infra: ~256MB RAM.

#### Option E: Fuse.js (in-process JavaScript library)

- **Pros**: Zero infrastructure, runs in Node.js process, good fuzzy matching (Bitap algorithm), customizable scoring, works with small datasets.
- **Cons**: In-memory — loads all SchoolProfiles into RAM, not scalable beyond ~10K documents, no persistence, CPU-bound during matching, blocks event loop for large datasets.
- **Cost**: Free (Apache 2.0). RAM cost scales with dataset.

### Decision

**Option A: MongoDB Text Index (primary) + custom Levenshtein scoring (application layer)**

A hybrid approach:

1. **MongoDB Text Index** serves as the **candidate retrieval** layer — it narrows down SchoolProfiles to the top 20-50 candidates using token-based text search.
2. **Application-layer scoring** refines candidates using Levenshtein distance, Jaccard similarity, and signal weighting (name, location, contact, type).

This avoids new infrastructure while providing effective fuzzy matching:

```
School registered → MongoDB $text query (find candidates) → Application-layer scoring (rank by confidence)
```

MongoDB text index is configured with weighted fields:
- `name`: weight 10 (highest priority)
- `aliases`: weight 8
- `city`: weight 3
- `address`: weight 2

The application layer uses `fastest-levenshtein` (npm, ~2KB, fastest JS Levenshtein implementation) for string distance calculation.

**Migration path**: If the school dataset grows beyond 100K or matching quality proves insufficient, switch to Meilisearch. The `SchoolMatchingService` interface is decoupled from the search backend — swapping MongoDB text search for a Meilisearch query requires changing one method.

### Consequences

- **Positive**: Zero new infrastructure, leverages existing MongoDB, adequate for early-stage dataset size, clean migration path to Meilisearch.
- **Negative**: No built-in typo tolerance in candidate retrieval (MongoDB text search splits on tokens, doesn't fuzzy-match individual tokens). Mitigated by: (a) alias matching catches common abbreviations, (b) application-layer Levenshtein catches typos in the top candidates, (c) admin can manually link unmatched schools.
- **Risks**: May miss matches where the parent's school name is heavily abbreviated (e.g., "FGGC" for "Federal Government Girls' College"). Mitigated by school aliases and admin manual matching.

---

## ADR-2: Real-Time Notification Delivery

### Context

When a school match is detected, the parent should be notified promptly. We need to decide how match notifications are delivered — specifically whether to invest in real-time push infrastructure or use simpler approaches.

### Decision Drivers

- Cost-effective (avoid expensive WebSocket infrastructure for low-frequency events)
- Nigerian market reality (many parents use mobile data with intermittent connectivity)
- Notification frequency is low (a parent might get 1-2 match notifications in their lifetime)
- Fits existing NestJS stack
- Progressive enhancement path

### Options Considered

#### Option A: Simple polling (existing notification API)

- **Pros**: Already implemented — the frontend polls `GET /notifications/unread-count` and `GET /notifications` periodically. Zero new infrastructure. Works on all devices regardless of connectivity. Match notifications are just another `Notification` document with a new `type`.
- **Cons**: Not real-time (polling interval determines latency — typically 30-60 seconds). Wastes bandwidth on empty polls. Not ideal for time-sensitive events.
- **Cost**: Free. Already in production.

#### Option B: WebSocket (Socket.IO / NestJS WebSocket Gateway)

- **Pros**: True real-time delivery, bi-directional communication, NestJS has built-in WebSocket support (`@nestjs/websockets` + Socket.IO), can push notifications instantly.
- **Cons**: Additional infrastructure (WebSocket connections are stateful, complicate load balancing), connection management complexity, mobile devices drop WebSocket connections frequently (Nigerian network conditions), overkill for 1-2 events per user's lifetime, requires Redis adapter for multi-instance.
- **Cost**: Free (Socket.IO is open-source). Infra: Redis adapter for multi-instance. Higher server memory (persistent connections).

#### Option C: Server-Sent Events (SSE)

- **Pros**: Simpler than WebSocket (unidirectional — server to client), HTTP-based (works through proxies), auto-reconnect built into browser EventSource API, lighter than WebSocket.
- **Cons**: Unidirectional only, still requires persistent connections, limited browser support in older mobile browsers, connection management overhead, same load balancing challenges as WebSocket.
- **Cost**: Free. Lower overhead than WebSocket.

#### Option D: Email notifications (for match events only)

- **Pros**: Reliable delivery (parents check email), works offline, no real-time infrastructure needed, can include rich content (HTML email with school details), appropriate for low-frequency, high-importance events.
- **Cons**: Requires email service (SMTP/transactional email provider), delivery delays (seconds to minutes), may land in spam, not all parents check email frequently.
- **Cost**: Free tier available (Resend: 3K emails/month free, SendGrid: 100/day free). Low volume = free tier is sufficient.

### Decision

**Option A: Polling (primary) + Option D: Email (secondary, for match events)**

School match notifications are low-frequency, high-importance events. Real-time delivery adds no meaningful value — a 30-second polling delay is imperceptible for an event that happens once per school.

1. **In-app**: Match notifications are stored as `Notification` documents (existing system). The frontend's existing polling picks them up on the next cycle.
2. **Email**: Match events additionally trigger a transactional email via a lightweight email service. This ensures the parent sees the notification even if they haven't opened the app recently.

The email integration is implemented behind an `EmailService` abstraction that can use any SMTP provider or transactional API (Resend, SendGrid, Nodemailer with SMTP).

**Future enhancement**: If real-time becomes important for other features (e.g., live payment status updates), add SSE as a progressive enhancement. The notification system is already decoupled — adding a push channel only requires a new listener on `NotificationsService.create()`.

### Consequences

- **Positive**: Zero new real-time infrastructure, email ensures delivery for important match events, works on all devices and network conditions, free tier covers expected volume.
- **Negative**: 30-60 second in-app notification delay. Completely acceptable for match events.
- **Risks**: Email deliverability (spam filters). Mitigated by using a reputable transactional email service and proper SPF/DKIM configuration.

---

## ADR-3: Data Migration Strategy

### Context

When a parent confirms a school match, their data (children, pending payments) must be migrated from the independent `SchoolProfile` to the official `School` entity. We need to choose between in-place updates and copy-on-write, and decide how to handle historical data.

### Decision Drivers

- Data integrity (no data loss, especially historical payment records)
- Rollback capability (reversible if something goes wrong)
- Performance (migration should not block normal operations)
- Auditability (track what was migrated, when, by whom)

### Options Considered

#### Option A: Copy-on-write (archive source, link to target)

- **Pros**: Non-destructive — original `SchoolProfile` is archived (soft-deleted), not modified or removed. Historical `Transaction` and completed `ScheduledPayment` documents retain their original `schoolProfile` reference for accuracy. Only pending/future documents are linked to the new `School`. Full rollback is trivial (reactivate archived profile, remove new links). Clear audit trail via `MigrationRecord`.
- **Cons**: Dual references during transition (some docs point to `schoolProfile`, new ones point to `school`). Queries may need to check both fields. Slightly more complex than in-place update.
- **Cost**: Development time. No infrastructure cost.

#### Option B: In-place update (modify existing documents)

- **Pros**: Simple — update `schoolProfile` field to reference `School._id` across all documents. No dual references. Clean data model.
- **Cons**: Destructive — original reference is lost. Historical transactions no longer accurately reflect the state at time of payment. Rollback requires restoring from backup or a separate undo log. Breaks existing queries that join on `schoolProfile`. Risk of partial updates if migration fails mid-way.
- **Cost**: Development time. Higher risk cost.

#### Option C: Full copy (duplicate all data under new school)

- **Pros**: Complete isolation — all migrated data exists as new documents. Original data untouched.
- **Cons**: Data duplication (double storage), orphaned original documents, confusing for parents (duplicate transactions), complex reconciliation, balance discrepancies.
- **Cost**: Storage cost. High development complexity.

### Decision

**Option A: Copy-on-write**

This is the safest approach for a financial platform:

1. **Children**: Add `Child.school = officialSchool._id`. Keep `Child.schoolProfile` as-is (legacy reference).
2. **Pending ScheduledPayments**: Add `ScheduledPayment.school = officialSchool._id`. Keep `schoolProfile` for audit.
3. **Completed Transactions/Payments**: **NOT modified**. They retain their original `schoolProfile` reference, preserving historical accuracy.
4. **SchoolProfile**: Set `isActive = false`, `migratedTo = officialSchool._id`.

Rollback:
- Remove `Child.school` field
- Remove `ScheduledPayment.school` field
- Reactivate `SchoolProfile`
- Delete `MigrationRecord` (or mark as `rolled_back`)

### Consequences

- **Positive**: Non-destructive, fully reversible, historical data preserved, clear audit trail.
- **Negative**: Dual reference fields (`schoolProfile` and `school`) on Child and ScheduledPayment. Mitigated by: (a) frontend queries prefer `school` when present, fall back to `schoolProfile`, (b) a future cleanup migration can remove `schoolProfile` once all profiles are migrated.
- **Risks**: Query complexity during transition period. Mitigated by helper methods in services that resolve the correct school reference.

---

## ADR-4: Search Infrastructure Scalability Path

### Context

The initial deployment uses MongoDB text index for school matching. As the platform grows, we may need to upgrade the search infrastructure. This ADR documents the planned scalability path.

### Decision Drivers

- Progressive complexity (don't over-engineer early)
- Clear upgrade triggers
- Minimal code changes when upgrading
- Cost awareness at each tier

### Scalability Tiers

#### Tier 1: MongoDB Text Index (current — 0-100K schools)

- **Trigger to upgrade**: Matching quality drops below 80% precision, or dataset exceeds 100K schools, or parents report frequent false negatives.
- **Cost**: Free (part of MongoDB).
- **Limitations**: No typo tolerance in candidate retrieval, basic stemming only, no phonetic matching.

#### Tier 2: Meilisearch (self-hosted — 100K-1M schools)

- **Trigger from Tier 1**: Deploy Meilisearch Docker container, implement data sync from MongoDB (on School create/update), swap `SchoolMatchingService.findCandidates()` to query Meilisearch instead of MongoDB text search.
- **Code change**: One method swap in `SchoolMatchingService`. The scoring/confidence logic remains unchanged.
- **Cost**: Free (open-source). ~128-512MB RAM for Meilisearch.

#### Tier 3: Meilisearch Cloud or Typesense Cloud (1M+ schools, multi-region)

- **Trigger from Tier 2**: Need for multi-region search, managed infrastructure, or high availability.
- **Cost**: Meilisearch Cloud starts at $30/month. Typesense Cloud starts at $15/month.

### Decision

Start at **Tier 1**. The `SchoolMatchingService` is designed with a `findCandidates(schoolName: string, filters: object): Promise<SchoolProfile[]>` method that abstracts the search backend. Upgrading to Tier 2 requires implementing a new `MeilisearchCandidateProvider` and swapping it in via dependency injection — no changes to the matching/scoring logic.

### Consequences

- **Positive**: Right-sized infrastructure for each growth stage, clear upgrade path, minimal code changes per upgrade.
- **Negative**: Tier 1 may have lower recall for highly abbreviated school names. Acceptable for MVP — admin manual matching covers gaps.
- **Risks**: Delayed upgrade if quality issues aren't monitored. Mitigated by tracking match precision/recall metrics and setting alerts.

---

## ADR-5: Event System for School Onboarding Events

### Context

Multiple system actions are triggered when a school registers (matching, notification, potential migration). We need to decide how these actions are coordinated.

### Decision Drivers

- Reliability (don't lose events)
- Simplicity (don't over-engineer for a few event types)
- Fits existing NestJS stack
- Decoupled modules (schools module shouldn't know about matching module)

### Options Considered

#### Option A: NestJS Event Emitter (@nestjs/event-emitter)

- **Pros**: Built into NestJS ecosystem, simple decorator-based (`@OnEvent('school.created')`), in-process (no external dependency), synchronous or async listeners, type-safe events, zero infrastructure.
- **Cons**: In-process only — events lost on crash (not persisted), no replay capability, not suitable for cross-service communication. Single server only.
- **Cost**: Free. Part of NestJS.

#### Option B: BullMQ event queue (shared Redis)

- **Pros**: Persistent events (survives crashes), retries, already in the stack (shared Redis), reliable.
- **Cons**: Heavier than needed for simple event coordination, queue-based (not pub/sub — one consumer per job), adds latency.
- **Cost**: Free. Redis already provisioned.

#### Option C: MongoDB Change Streams

- **Pros**: Database-native, triggers on document changes, reliable (built on oplog), supports resumption.
- **Cons**: Requires replica set (not all MongoDB deployments support it), complex cursor management, higher MongoDB load, overkill for a few event types.
- **Cost**: Free (requires replica set).

### Decision

**Option A: NestJS Event Emitter (primary) + Option B: BullMQ (for migrations)**

The event pattern is simple:
- `school.created` → triggers matching service
- `school.verified` → triggers matching service (re-match with higher priority)
- `match.confirmed` → enables migration UI

These are low-frequency, in-process events that don't need persistence. `@nestjs/event-emitter` is the right tool — it's already part of the NestJS ecosystem, requires zero infrastructure, and keeps modules decoupled.

For **migration execution** (the heavy, long-running operation), BullMQ is used because:
- Migrations can take minutes for large datasets
- Need retry on failure
- Need progress tracking
- Must survive server restart

```typescript
// In SchoolsService
this.eventEmitter.emit('school.created', { schoolId: school._id });

// In SchoolMatchingModule
@OnEvent('school.created')
async handleSchoolCreated(event: { schoolId: string }) {
  await this.matchingService.findMatchesForSchool(event.schoolId);
}
```

### Consequences

- **Positive**: Clean module decoupling, zero new infrastructure for events, BullMQ for heavy migrations (already in stack), simple and idiomatic NestJS.
- **Negative**: In-process events are lost on crash. For school creation events, this is acceptable — the daily cron will catch any missed matches.
- **Risks**: Event handler errors could propagate to the emitter. Mitigated by catching errors in `@OnEvent` handlers and logging them (matching failure should not block school registration).

---

## Summary of Decisions

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Search/matching | MongoDB Text Index + app-layer Levenshtein | Zero new infra, adequate for early scale |
| Notification delivery | Polling (existing) + email for matches | Low-frequency events, email ensures reach |
| Migration strategy | Copy-on-write (archive source) | Non-destructive, fully reversible |
| Scalability path | MongoDB → Meilisearch → Cloud (tiered) | Right-sized for each growth stage |
| Event system | NestJS EventEmitter + BullMQ for migrations | Simple decoupling, reliable heavy work |
