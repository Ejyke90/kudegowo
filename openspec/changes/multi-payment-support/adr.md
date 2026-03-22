# ADR: Multi-Payment Support — Technology Decisions

## Status

Proposed

---

## ADR-1: Payment Gateway Selection

### Context

Kudegowo targets Nigerian parents paying school fees. The platform needs a payment gateway that supports NGN, card payments (Visa/Mastercard/Verve), bank transfers, and USSD — the primary payment channels in Nigeria. The gateway must support tokenized recurring charges (for saved cards and instalment auto-deductions).

### Decision Drivers

- Nigerian market coverage (NGN, local cards including Verve, bank transfers, USSD)
- API quality and developer experience
- Tokenization support for recurring charges (PCI-compliant card saving)
- Refund API availability
- Cost per transaction
- Reliability and uptime track record
- Self-serve onboarding (no long KYC delays)

### Options Considered

#### Option A: Paystack

- **Pros**: Best developer experience in Nigeria (excellent docs, SDKs, inline JS), market leader, supports card/bank/USSD/mobile money, tokenized recurring charges via `authorization_code`, refund API, webhook system with HMAC verification, sandbox for testing, fast KYC onboarding, acquired by Stripe (reliability backing).
- **Cons**: 1.5% + ₦100 per transaction (capped at ₦2,000), no direct USSD push (uses bank USSD codes), limited to NGN/GHS/ZAR/USD.
- **Cost**: 1.5% + ₦100 per local transaction, capped at ₦2,000 (~$1.25). Free for transactions under ₦2,500.

#### Option B: Flutterwave

- **Pros**: Broader African coverage (30+ countries), supports card/bank/USSD/mobile money/barter, card tokenization, refund API, virtual accounts for dedicated bank transfer, more payment channels.
- **Cons**: Developer experience slightly below Paystack (docs less polished), higher failure rates reported by community, 1.4% per transaction (capped at ₦2,000), KYC can be slower, occasional settlement delays reported.
- **Cost**: 1.4% per local transaction, capped at ₦2,000. Slightly cheaper than Paystack.

#### Option C: Both (Paystack primary, Flutterwave fallback)

- **Pros**: Redundancy — if Paystack is down, Flutterwave handles payments. Broader channel coverage (Flutterwave's virtual accounts + Paystack's inline checkout). Parents choose preferred gateway.
- **Cons**: Two integrations to maintain, two webhook handlers, more complex reconciliation, two KYC processes, two settlement accounts.
- **Cost**: Same per-transaction costs. Additional development effort (~2 weeks).

### Decision

**Option C: Paystack primary, Flutterwave fallback**

Paystack is the primary gateway for its superior DX and reliability. Flutterwave serves as a configurable fallback. The `PaymentGatewayProvider` interface abstracts both — switching is a config change (`PAYMENT_GATEWAY=flutterwave`). In Phase 1, only Paystack is implemented. Flutterwave is added in Phase 4 as a resilience measure.

The gateway abstraction layer also future-proofs for other providers (e.g., Squad, Monnify) if market conditions change.

### Consequences

- **Positive**: Best-in-class DX with Paystack, resilience via fallback, clean abstraction for future gateways.
- **Negative**: Two integrations to maintain eventually. Mitigated by the shared interface — each provider is a single file (~200 lines).
- **Risks**: Gateway-specific behavior differences (e.g., webhook payload formats). Mitigated by normalizing all gateway responses to a common `VerifyChargeResult` shape.

---

## ADR-2: Instalment Engine Strategy

### Context

Nigerian parents often face large lump-sum school fees (₦200,000–₦2,000,000 per term). Instalment plans let parents split these into manageable portions. We need to decide whether to build a custom instalment engine or use a third-party service.

### Decision Drivers

- Cost-effective (prefer custom over paid BNPL providers)
- Self-hostable (no external dependency for core business logic)
- Fits existing ScheduledPayment + cron architecture
- Simple for parents to understand
- Handles edge cases (missed payments, early payoff, cancellation)

### Options Considered

#### Option A: Custom instalment engine (decompose into ScheduledPayments)

- **Pros**: Zero external cost, full control, leverages existing `ScheduledPaymentsModule` and cron scheduler, no third-party dependency, simple model (InstalmentPlan → N Instalments → N ScheduledPayments).
- **Cons**: Must handle edge cases ourselves (missed payment escalation, plan default, early payoff logic), no credit scoring or BNPL features.
- **Cost**: Development time only. No per-transaction or platform fees.

#### Option B: Third-party BNPL (Carbon, FairMoney, etc.)

- **Pros**: Built-in credit scoring, handles collections, professional dunning (payment reminders), regulatory compliance for lending.
- **Cons**: High fees (15-30% APR passed to parent or platform), external dependency, limited API control, KYC/regulatory overhead (CBN lending regulations), parents may resist third-party credit checks for school fees.
- **Cost**: 15-30% APR or platform integration fees. Regulatory compliance costs.

#### Option C: Paystack recurring charges only

- **Pros**: Simple — set up a Paystack "plan" with recurring charges, Paystack handles scheduling.
- **Cons**: Tightly coupled to Paystack, no wallet integration, limited flexibility (fixed intervals only), can't handle partial payments or custom schedules, no visibility into individual instalment status within our system.
- **Cost**: Standard Paystack fees per charge. No additional platform cost.

### Decision

**Option A: Custom instalment engine**

The instalment engine is a core business feature, not a generic payment tool. Building it ourselves gives full control over the UX, integrates naturally with the existing `ScheduledPaymentsModule`, and avoids third-party fees that would be passed to parents.

The design is simple: an `InstalmentPlan` decomposes a large `ScheduledPayment` into N smaller `ScheduledPayment` documents. The existing `PaymentSchedulerService` cron job processes each instalment on its due date — no new scheduling infrastructure needed.

Edge case handling:
- **Missed payment**: Existing retry logic (3 retries with backoff) applies per instalment.
- **Plan default**: If 2+ consecutive instalments fail terminally, the plan status becomes `defaulted` and the parent is notified.
- **Early payoff**: Parent can pay remaining instalments immediately via a "Pay All Remaining" action.
- **Cancellation**: Remaining pending instalments are cancelled (their ScheduledPayments are cancelled too).

### Consequences

- **Positive**: Zero external cost, full control, reuses existing cron infrastructure, simple mental model for parents.
- **Negative**: No credit scoring or BNPL. Kudegowo is a payment management tool, not a lender — this is acceptable.
- **Risks**: Complex edge cases (e.g., partial instalment payment, fee amount changes mid-plan). Mitigated by keeping the initial implementation simple (fixed amounts, no mid-plan changes).

---

## ADR-3: Refund Model

### Context

Parents may need refunds for incorrect charges, school policy changes, or child transfers. We need to decide between immediate self-service refunds and a manual approval workflow.

### Decision Drivers

- Fraud prevention (prevent abuse of instant refunds)
- Parent trust (transparent and timely process)
- Admin workload (avoid bottlenecking on admin approval for small amounts)
- Nigerian market norms (refunds are less common; schools typically issue credits)

### Options Considered

#### Option A: Manual approval for all refunds

- **Pros**: Full control, prevents fraud/abuse, admin can verify legitimacy, audit trail.
- **Cons**: Slow (depends on admin response time), poor UX for legitimate refunds, admin bottleneck, parents may lose trust if refunds take days.
- **Cost**: Admin time. No technical cost.

#### Option B: Immediate self-service refunds

- **Pros**: Instant gratification, no admin bottleneck, simple implementation.
- **Cons**: Fraud risk (parent could pay → immediately refund → repeat), no review process, harder to reverse if fraudulent, gateway refunds are irreversible.
- **Cost**: Potential fraud losses.

#### Option C: Tiered — auto-approve small wallet refunds, manual for large/gateway refunds

- **Pros**: Best of both worlds — small wallet refunds are instant (good UX), large or gateway refunds get admin review (fraud prevention). Configurable threshold.
- **Cons**: More complex implementation (two code paths), threshold must be tuned.
- **Cost**: Minimal fraud risk (auto-approve threshold limits exposure).

### Decision

**Option A: Manual approval for all refunds (initial release), with Option C planned for v2**

For the initial release, all refunds require admin approval. This is the safest approach for a platform handling school fees — parents and schools expect a formal process. The workflow is:

1. Parent submits refund request with reason
2. Admin reviews and approves/rejects (with optional note)
3. If approved: wallet credit (immediate) or gateway refund (async via webhook)
4. Parent is notified at each stage

In a future iteration (v2), we'll add auto-approval for wallet-to-wallet refunds below a configurable threshold (e.g., ₦10,000) to improve UX without significant risk.

### Consequences

- **Positive**: Zero fraud risk, clear audit trail, admin visibility, builds parent trust through formal process.
- **Negative**: Slower refund experience. Mitigated by notification at each step (request received → approved → completed) and SLA target of 24-hour review.
- **Risks**: Admin bottleneck if refund volume is high. Mitigated by admin dashboard with batch actions and the planned auto-approve tier.

---

## ADR-4: PCI Compliance Approach

### Context

Kudegowo processes card payments. We must ensure cardholder data is handled securely in compliance with PCI DSS requirements.

### Decision Drivers

- Security (protect cardholder data)
- Regulatory compliance (PCI DSS)
- Implementation simplicity
- Cost (PCI certification is expensive for small platforms)

### Options Considered

#### Option A: Tokenization via gateway (SAQ A / SAQ A-EP)

- **Pros**: Gateway handles all card data — Kudegowo never sees card numbers. Uses Paystack Inline JS (hosted fields) or redirect checkout. Qualifies for SAQ A (simplest PCI self-assessment). Only gateway-issued tokens stored.
- **Cons**: Dependent on gateway's PCI compliance, limited control over checkout UX (gateway-hosted UI).
- **Cost**: Free — gateway covers PCI compliance for card handling. Kudegowo only stores tokens.

#### Option B: Direct card collection (SAQ D)

- **Pros**: Full control over checkout UX, custom card input forms.
- **Cons**: Requires SAQ D (most complex PCI self-assessment), must implement encryption at rest and in transit, annual PCI audit costs ($10,000+), massive security liability, unnecessary for our use case.
- **Cost**: $10,000+ annually for PCI audits. Significant development and operational overhead.

### Decision

**Option A: Tokenization via gateway**

Kudegowo will **never** collect, transmit, or store raw card data. All card interactions flow through:
1. **Paystack Inline JS** — Gateway-hosted payment form embedded in our frontend
2. **Paystack Redirect** — Full redirect to Paystack's hosted checkout page

After a successful charge, Paystack returns an `authorization_code` that represents the tokenized card. This token is stored in `PaymentMethod.authorizationCode` for future recurring charges.

This approach qualifies Kudegowo for **SAQ A** (the simplest PCI self-assessment questionnaire), which has minimal compliance requirements.

### Consequences

- **Positive**: Zero PCI liability for card data, no audit costs, gateway handles security, simple implementation.
- **Negative**: Limited control over checkout UI. Mitigated by Paystack Inline JS which provides a professional, customizable popup.
- **Risks**: Gateway token format changes. Mitigated by storing tokens as opaque strings — we never parse them.

---

## ADR-5: Async Payment Processing Queue

### Context

External payment operations (gateway charges, refunds) are inherently asynchronous. We need a reliable way to process webhook events and handle async payment flows.

### Decision Drivers

- Reliable message processing (at-least-once delivery)
- Fits existing NestJS + Redis stack (Redis already selected in Payment & Transaction Engine ADR)
- Retries with backoff for transient failures
- Observable (monitoring, dead-letter queue)

### Options Considered

#### Option A: BullMQ with Redis (shared with receipt queue)

- **Pros**: Already selected for receipt generation (ADR from Payment & Transaction Engine), single Redis instance, first-class NestJS support, multiple named queues, retries, rate limiting, Bull Board dashboard.
- **Cons**: Redis is single-threaded (not a concern at our scale).
- **Cost**: Free. Redis already provisioned.

#### Option B: No queue — process webhooks synchronously

- **Pros**: Simplest implementation, no queue infrastructure.
- **Cons**: Webhook timeout risk (gateways expect < 5s response), no retry on internal failure, blocking operations can cause webhook replay, poor resilience.
- **Cost**: Free. High risk cost — lost payments.

### Decision

**Option A: BullMQ with Redis**

Reuse the Redis instance already provisioned for receipt generation. Add a `payment-processing` queue for webhook event handling and async gateway operations. This ensures:
- Webhooks respond immediately (enqueue + 200 OK)
- Payment state transitions happen reliably with retries
- Failed webhook processing doesn't lose events

Queue names:
- `receipt-generation` (from Payment & Transaction Engine)
- `payment-processing` (new — handles webhook events)
- `refund-processing` (new — handles gateway refund operations)

### Consequences

- **Positive**: Reliable, reuses existing infra, clean separation of concerns, observable via Bull Board.
- **Negative**: None significant — BullMQ is already in the stack.
- **Risks**: Redis downtime affects all queues. Mitigated by Redis persistence (AOF) and standard monitoring.

---

## Summary of Decisions

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Payment gateway | Paystack primary + Flutterwave fallback | Best Nigerian DX + resilience |
| Instalment engine | Custom (decompose to ScheduledPayments) | Zero cost, reuses existing cron |
| Refund model | Manual approval (v1), tiered auto-approve (v2) | Fraud prevention for school fees |
| PCI compliance | Tokenization via gateway (SAQ A) | Zero card data liability |
| Async processing | BullMQ + shared Redis | Already in stack, reliable |
