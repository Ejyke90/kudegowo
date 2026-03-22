# Tasks: Independent School Wallet Setup

## Phase 1: Foundation — Models & Migration

### 1.1 SchoolProfile Model
- [x] Create `backend/models/SchoolProfile.js` with schema, validation, indexes
- [x] Add compound unique index `{ createdBy: 1, name: 1 }`
- [x] Add Nigerian states constant for optional validation
- [ ] Write unit tests for model validation

### 1.2 Child Model
- [x] Create `backend/models/Child.js` with schema, validation, indexes
- [x] Add compound unique index `{ parent: 1, firstName: 1, lastName: 1, schoolProfile: 1 }`
- [ ] Write unit tests for model validation

### 1.3 FeeCategory Model
- [x] Create `backend/models/FeeCategory.js` with embedded `recurrenceRule` sub-schema
- [x] Add compound indexes for upcoming obligations and uniqueness
- [x] Implement `computeNextDate()` utility for recurrence calculation
- [ ] Write unit tests for model validation and recurrence logic

### 1.4 ScheduledPayment Model
- [x] Create `backend/models/ScheduledPayment.js` with optimistic concurrency (`version` field)
- [x] Add compound indexes for cron job, parent queries, and idempotency
- [x] Add `idempotencyKey` virtual/pre-save hook
- [ ] Write unit tests for model validation and status transitions

### 1.5 Migration Script
- [x] Create `backend/scripts/migrateChildren.js` — extract `User.children[]` to Child + SchoolProfile
- [x] Ensure idempotency (safe to re-run)
- [x] Log migration results per user
- [ ] Test with sample data

### 1.6 Dependencies
- [x] Add `express-validator` to `backend/package.json`
- [x] Add `node-cron` to `backend/package.json`

---

## Phase 2: API Layer — Routes & Validation

### 2.1 Validation Middleware
- [x] Create `backend/middleware/validate.js` — shared express-validator error handler
- [x] Create `backend/validators/schoolProfile.js` — validation chains for school profile endpoints
- [x] Create `backend/validators/child.js` — validation chains for child endpoints
- [x] Create `backend/validators/feeCategory.js` — validation chains for fee category endpoints
- [x] Create `backend/validators/scheduledPayment.js` — validation chains for scheduled payment endpoints

### 2.2 School Profile Routes
- [x] Create `backend/routes/schoolProfiles.js`
- [x] `POST /` — create with 10-profile limit enforcement
- [x] `GET /` — list with pagination and search
- [x] `GET /:id` — detail with stats (children count, fee count, obligations)
- [x] `PUT /:id` — update with ownership check and duplicate name guard
- [x] `DELETE /:id` — delete with active-children and pending-payments guard
- [x] Register routes in `server.js` as `/api/school-profiles`
- [ ] Write integration tests

### 2.3 Children Routes
- [x] Create `backend/routes/children.js`
- [x] `POST /` — create with 20-per-school limit and school ownership validation
- [x] `GET /` — list with school/active filters and pagination
- [x] `GET /:id` — detail with fee summary aggregation
- [x] `PUT /:id` — update with school transfer logic (cancel pending payments)
- [x] `DELETE /:id` — deactivate with cascade cancellation
- [x] Register routes in `server.js` as `/api/children`
- [ ] Write integration tests

### 2.4 Fee Category Routes
- [x] Create `backend/routes/feeCategories.js`
- [x] `POST /` — create with 50-per-school limit and applicableTo validation
- [x] `GET /` — list with category/school/date-range filters and pagination
- [x] `GET /upcoming` — aggregated upcoming obligations (next N days)
- [x] `GET /:id` — detail with per-child payment status
- [x] `PUT /:id` — update with pending-payment warning
- [x] `PUT /:id/update-future-payments` — batch update pending payment amounts
- [x] `DELETE /:id` — deactivate with cascade cancellation
- [x] Register routes in `server.js` as `/api/fee-categories`
- [ ] Write integration tests

### 2.5 Scheduled Payment Routes
- [x] Create `backend/routes/scheduledPayments.js`
- [x] `POST /` — create with child-school-fee cross-validation
- [x] `POST /bulk` — bulk create for all applicable children
- [x] `GET /` — list with status/child/date filters and summary stats
- [x] `GET /:id` — detail with populated references
- [x] `PUT /:id/cancel` — cancel with status guard
- [x] `PUT /:id/skip` — skip with next-occurrence generation
- [x] `POST /:id/pay-now` — immediate execution with optimistic lock
- [x] Register routes in `server.js` as `/api/scheduled-payments`
- [ ] Write integration tests

---

## Phase 3: Scheduling Engine

### 3.1 Payment Scheduler Service
- [x] Create `backend/services/paymentScheduler.js`
- [x] Implement `processDuePayments()` — batch query, lock, execute, handle failure
- [x] Implement `executePayment()` — balance check, atomic deduction, transaction creation
- [x] Implement `handleFailure()` — retry with exponential backoff (1h, 6h, 24h)
- [x] Implement `generateNextOccurrence()` — recurrence date calculation + idempotent insert
- [x] Implement `recoverStaleLocks()` — reset processing payments stuck > 30 min

### 3.2 Recurrence Utilities
- [x] Create `backend/utils/recurrence.js` — `computeNextDate()` function
- [x] Handle all frequencies: weekly, biweekly, monthly, termly, annually
- [x] Handle monthly edge case: day-of-month clamping (Jan 31 -> Feb 28)
- [ ] Write unit tests for each frequency and edge case

### 3.3 Cron Integration
- [x] Register payment processing cron in `server.js` (every 15 min)
- [x] Register stale lock recovery cron in `server.js` (every 60 min)
- [x] Add graceful shutdown handling (stop cron on SIGTERM/SIGINT)
- [x] Add structured logging for cron runs

### 3.4 Concurrency & Safety Tests
- [ ] Test optimistic lock prevents double-execution
- [ ] Test atomic balance deduction prevents over-deduction
- [ ] Test idempotency key prevents duplicate transactions
- [ ] Test stale lock recovery

---

## Phase 4: Frontend

### 4.1 API Client
- [x] Create `frontend/lib/api.ts` — typed fetch wrapper for all new endpoints
- [x] Add error handling and type definitions

### 4.2 School Profile Pages
- [x] Create `frontend/app/dashboard/schools/page.tsx` — list school profiles with "Add School" CTA
- [x] School creation form (inline on schools list page)
- [x] Create `frontend/app/dashboard/schools/[id]/page.tsx` — school detail with stats, children, fees

### 4.3 Child Management
- [x] Child list + add form (integrated into school detail page children tab)
- [ ] Add child transfer flow (select new school, confirm cancellations)

### 4.4 Fee Category Management
- [x] Fee category list + add form (integrated into school detail page fees tab)
- [x] Add recurrence rule configuration UI (frequency picker, date pickers)
- [ ] Add per-child fee assignment UI

### 4.5 Scheduled Payments
- [x] Create `frontend/app/dashboard/scheduled-payments/page.tsx` — all scheduled payments
- [x] Add pay-now, skip, cancel action buttons
- [ ] Add scheduling wizard (select fee -> select children -> pick date)

### 4.6 Dashboard Enhancements
- [x] Add "Upcoming Obligations" widget to dashboard (next 7 days)
- [x] Add overdue alerts banner (red, prominent)
- [x] Add "My Schools" quick summary cards
- [x] Add empty state CTA: "Add Your First School" if no profiles exist

---

## Phase 5: Hardening & Quality

### 5.1 Error Handling
- [x] Add global error handler middleware with structured error responses
- [x] Add request ID tracking for debugging
- [x] Ensure all error responses follow consistent format `{ error: string, errors?: array }`

### 5.2 Rate Limiting
- [x] Add `schoolWalletLimiter` (stricter than apiLimiter for creation)
- [x] Add business-rule rate limits in route handlers (10 schools, 20 children, 50 fees, 100 payments)

### 5.3 Testing
- [ ] End-to-end test: full happy-path flow (school -> child -> fee -> schedule -> execute)
- [ ] End-to-end test: recurring fee generates 3 occurrences
- [ ] End-to-end test: child transfer cascades correctly
- [ ] Load test: concurrent scheduled payment processing (50+ simultaneous)
- [ ] Security test: IDOR prevention (parent A cannot access parent B's data)

### 5.4 Documentation
- [x] Update `README.md` with new feature overview
- [x] Add API documentation for all new endpoints
- [x] Add `.env.example` entries for any new config (cron interval, retry limits)
