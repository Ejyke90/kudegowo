# ADR: Payment & Transaction Engine — Technology Decisions

## Status

Proposed

---

## ADR-1: Receipt Generation Library

### Context

The Payment & Transaction Engine needs to generate downloadable payment receipts (digital proof of payment). Receipts must include structured payment data, branding, and be suitable for printing or sharing. We need a server-side PDF generation solution that runs in Node.js/NestJS.

### Decision Drivers

- Cost-effective (prefer open-source, no per-document fees)
- Self-hostable (no external API dependency)
- Fits existing NestJS + TypeScript stack
- Fast generation (< 2 seconds per receipt)
- Small memory footprint (runs alongside main server or queue worker)

### Options Considered

#### Option A: PDFKit (programmatic PDF generation)

- **Pros**: Pure JavaScript, no external dependencies (no headless browser), lightweight (~2MB), fast generation (<500ms), full control over layout, well-maintained (10+ years), MIT license, streams output (low memory).
- **Cons**: Verbose API for complex layouts (manual coordinate positioning), no HTML/CSS — everything is imperative code, steeper learning curve for designers.
- **Cost**: Free (MIT license). No runtime dependencies.

#### Option B: Puppeteer (HTML-to-PDF via headless Chrome)

- **Pros**: Use HTML/CSS templates (easy for designers), pixel-perfect rendering, supports modern CSS (flexbox, grid), familiar web tech.
- **Cons**: Heavy runtime dependency (headless Chromium ~300MB), slow startup (~2-5 seconds per instance), high memory usage (~100-200MB per instance), requires Chromium binary management, fragile in containerized environments, overkill for structured receipts.
- **Cost**: Free, but significant infra cost (CPU + RAM for Chromium instances).

#### Option C: jsPDF (client-side PDF generation)

- **Pros**: Can run server-side via Node.js, simpler API than PDFKit for basic layouts, supports auto-table plugin.
- **Cons**: Primarily designed for browser use, less mature server-side, fewer features than PDFKit, auto-table plugin is community-maintained, TypeScript support is weaker.
- **Cost**: Free (MIT license).

### Decision

**Option A: PDFKit**

PDFKit is the best fit for our receipt generation needs. Receipts are structured documents with a predictable layout (header, table, footer) — they don't require complex CSS rendering. PDFKit generates PDFs in <500ms with minimal memory, and integrates cleanly with NestJS services and BullMQ queue workers.

The imperative API is a non-issue because receipt layouts are template-driven with fixed positions. We'll create a reusable `ReceiptGeneratorService` that encapsulates all layout logic.

### Consequences

- **Positive**: Zero external runtime dependencies, fast generation, low memory, easy to deploy.
- **Negative**: Layout changes require code modifications (no HTML template). Mitigated by extracting layout constants and using a helper class.
- **Risks**: Complex future receipt formats (multi-page, charts) would require more PDFKit code. Acceptable for the foreseeable scope.

---

## ADR-2: Export Format Strategy

### Context

Parents need to export their transaction history for personal record-keeping, tax purposes, or sharing with schools. The system needs to support one or more export formats.

### Decision Drivers

- Usable by non-technical parents (Nigerian market — many use mobile devices)
- Supports date range filtering and fee type filtering
- Works well with large datasets (thousands of transactions)
- Cost-effective implementation

### Options Considered

#### Option A: CSV only

- **Pros**: Universal format, opens in Excel/Google Sheets/Numbers, small file size, trivial to generate (streaming), works with any dataset size.
- **Cons**: No formatting or branding, not printable as-is, parents may not understand CSV on mobile.
- **Cost**: Free. Use `fast-csv` library (~50KB).

#### Option B: PDF only

- **Pros**: Professional appearance, printable, can include branding/logo, works on all devices.
- **Cons**: Larger file size, slower generation for large datasets, harder to import into spreadsheets for further analysis.
- **Cost**: Free (PDFKit — already selected for receipts).

#### Option C: Both CSV and PDF

- **Pros**: Best of both worlds — CSV for data analysis, PDF for presentation/printing.
- **Cons**: Two code paths to maintain.
- **Cost**: Free. Marginal additional development effort.

### Decision

**Option C: Both CSV and PDF**

Offer both formats via a `format` query parameter on the export endpoint. CSV is the default for data export; PDF is available for printed summaries. CSV generation uses streaming (`fast-csv`) for large datasets. PDF generation uses PDFKit with a table layout, capped at 1,000 rows per export to manage memory.

### Consequences

- **Positive**: Covers all use cases — technical users get CSV, non-technical users get a printable PDF.
- **Negative**: Two formatting code paths. Mitigated by sharing the same query/filter logic and only diverging at the serialization layer.
- **Risks**: PDF export for very large datasets may be slow. Mitigated by the 1,000-row cap with pagination guidance.

---

## ADR-3: Receipt File Storage

### Context

Generated receipt PDFs need to be stored and served back to users on demand. We need a storage solution that is cost-effective and self-hostable.

### Decision Drivers

- Cost-effective (avoid cloud storage costs during early stage)
- Self-hostable (no vendor lock-in)
- Easy migration path to cloud storage later
- Reliable file serving for downloads

### Options Considered

#### Option A: Local filesystem

- **Pros**: Zero cost, zero setup, fast reads/writes, no external dependencies, works immediately.
- **Cons**: Not scalable across multiple server instances, no built-in redundancy, disk space management required, lost if server is replaced.
- **Cost**: Free (disk space only).

#### Option B: MinIO (S3-compatible object storage — self-hosted)

- **Pros**: S3-compatible API (easy migration to AWS S3 later), built-in redundancy/replication, web UI for management, works across multiple server instances, Docker-friendly.
- **Cons**: Additional infrastructure to manage (Docker container), slight complexity increase, overkill for early stage with single server.
- **Cost**: Free (open-source, Apache 2.0). Infra cost: ~256MB RAM for MinIO container.

#### Option C: AWS S3

- **Pros**: Fully managed, globally distributed, highly durable, CDN-friendly.
- **Cons**: Recurring cost (storage + requests), vendor lock-in, requires AWS account setup, Nigerian latency considerations.
- **Cost**: ~$0.023/GB/month storage + $0.0004/1000 GET requests. Low volume = low cost, but adds up.

### Decision

**Option A: Local filesystem (now) with Option B: MinIO (future)**

Start with local filesystem storage behind a `StorageService` abstraction. The abstraction layer uses a simple interface (`save(key, buffer)`, `get(key)`, `delete(key)`) that can be swapped to MinIO or S3 without changing calling code.

```typescript
// Abstraction
interface StorageProvider {
  save(key: string, data: Buffer): Promise<string>; // returns URL
  get(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
}
```

When the project scales to multiple server instances, switch to MinIO (a single config change).

### Consequences

- **Positive**: Zero setup cost, immediate productivity, clean migration path.
- **Negative**: Single-server limitation. Mitigated by abstraction layer — MinIO swap is a config change.
- **Risks**: Data loss if server disk fails. Mitigated by regular backups and moving to MinIO before production scale.

---

## ADR-4: Async Receipt Generation Strategy

### Context

Receipt PDF generation should not block the payment execution flow. We need an async processing mechanism to decouple payment completion from receipt creation.

### Decision Drivers

- Cost-effective (open-source)
- Self-hostable
- Reliable (retries, dead-letter handling)
- Fits NestJS ecosystem
- Minimal infrastructure

### Options Considered

#### Option A: BullMQ with Redis (queue-based)

- **Pros**: Mature, battle-tested, first-class NestJS support (`@nestjs/bullmq`), retries with exponential backoff, job prioritization, rate limiting, dashboard (Bull Board), Redis is lightweight.
- **Cons**: Requires Redis (additional infrastructure). Redis is single-threaded (not a concern at our scale).
- **Cost**: Free (MIT license). Redis: ~50MB RAM.

#### Option B: In-process setTimeout / setImmediate

- **Pros**: Zero infrastructure, no Redis needed, simplest implementation.
- **Cons**: No persistence (jobs lost on crash/restart), no retries, no monitoring, no backpressure, not production-grade.
- **Cost**: Free. But high risk cost.

#### Option C: Database-backed queue (MongoDB as queue)

- **Pros**: No additional infrastructure (reuse MongoDB), persistent, retryable.
- **Cons**: MongoDB is not designed as a queue (polling overhead, no push notifications), higher latency, more complex implementation, lock contention at scale.
- **Cost**: Free (reuses existing MongoDB). Higher development cost.

#### Option D: RabbitMQ

- **Pros**: Purpose-built message broker, excellent reliability, AMQP protocol, routing/exchange patterns.
- **Cons**: Heavier infrastructure than Redis, more complex setup, NestJS integration is less mature than BullMQ, overkill for single-queue receipt generation.
- **Cost**: Free (open-source). ~128MB RAM for RabbitMQ container.

### Decision

**Option A: BullMQ with Redis**

BullMQ is the standard choice in the NestJS ecosystem. `@nestjs/bullmq` provides decorators (`@Processor`, `@Process`) that integrate cleanly with NestJS dependency injection. Redis is lightweight (~50MB) and will also be useful for future features (caching, rate limiting, session storage).

The receipt generation queue has a single processor that:
1. Fetches the Transaction (with populated relations)
2. Generates the PDF via `ReceiptGeneratorService`
3. Saves to storage via `StorageService`
4. Updates the Receipt and Transaction documents

Failed jobs retry 3 times with exponential backoff (5s, 25s, 125s).

### Consequences

- **Positive**: Production-grade reliability, clean NestJS integration, retries, monitoring via Bull Board, Redis reusable for future needs.
- **Negative**: Redis is an additional service to manage. Mitigated: Redis is trivial to run (Docker one-liner, Railway add-on, or managed Redis).
- **Risks**: Redis downtime blocks receipt generation (not payments). Payments complete immediately; receipts are eventually consistent. Acceptable trade-off.

---

## Summary of Decisions

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Receipt generation | PDFKit | Lightweight, fast, no external deps |
| Export format | CSV + PDF | Covers data analysis and printing |
| File storage | Local FS → MinIO | Zero cost start, clean migration path |
| Async processing | BullMQ + Redis | NestJS-native, reliable, reusable Redis |
