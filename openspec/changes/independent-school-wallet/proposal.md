 # Proposal: Independent School Wallet Setup

## Context
Kudegowo is a digital payment platform for Nigerian schools. Currently, the platform assumes schools are onboarded — but the vast majority of Nigerian schools are not yet on any payment platform. Parents need a way to organize and manage school payments even when their child's school has not officially joined Kudegowo.

## Problem
Parents whose children attend non-onboarded schools have no way to:
1. Track school-related financial obligations in one place
2. Organize payments across multiple children at different schools
3. Set up recurring payments to avoid missed deadlines
4. Get visibility into upcoming fees and due dates

This forces parents back to manual tracking (notebooks, WhatsApp reminders, bank transfers) — exactly the problem Kudegowo was built to solve.

## Goals
1. **Enable parent-created school profiles** so parents can manage payments regardless of school onboarding status
2. **Support multi-child attachment** to school profiles, centralizing family finances per school
3. **Allow parent-defined fee categories** with amounts and due dates for obligation planning
4. **Provide recurring payment scheduling** with automated execution and failure handling
5. **Maintain data isolation** — each parent's school profiles are private, with a future migration path to shared/verified profiles when schools onboard

## Scope

### In Scope
- `SchoolProfile` model: parent-created, parent-owned, with metadata (name, address, type, contact)
- `Child` model: standalone entity (extracted from embedded `User.children[]`), linked to school profiles
- `FeeCategory` model: parent-defined fee types with amounts, due dates, and recurrence rules
- `ScheduledPayment` model: recurring payment intents with retry logic
- Full CRUD REST APIs for all four entities
- Background scheduled payment processor (cron-based)
- Frontend pages: school profile management, child management, fee setup, payment scheduling
- Dashboard enhancements: upcoming obligations widget, overdue alerts
- Migration script: `User.children[]` → standalone `Child` documents

### Out of Scope
- School-side portal / school onboarding flow
- Shared/verified school profiles (future: when school claims a profile)
- Payment gateway integration (reuses existing mocked payment flow)
- Push notifications / SMS reminders (future enhancement)
- Mobile app (web-first)

## Non-Goals
- This feature does NOT replace the existing admin-managed `PaymentItem` system — it runs in parallel for parent-initiated use cases
- This feature does NOT require schools to take any action
- This feature does NOT handle inter-parent fund transfers or group payments

## Success Criteria
- Parent can create a school profile, attach children, define fees, and schedule payments in < 3 minutes
- Scheduled payments execute within 15 minutes of their due time
- Failed payments retry up to 3 times with exponential backoff
- All parent data is isolated — no cross-parent data leakage
- Zero regression on existing payment and transaction flows
- API response times < 200ms for all CRUD operations under normal load
