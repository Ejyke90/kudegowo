# Spec: Fee Categories

## Overview
Parent-defined fee categories attached to school profiles. Each category represents a financial obligation (tuition, meals, transport, etc.) with an amount, optional due date, and optional recurrence rule. Fee categories serve as the blueprint from which scheduled payments are created.

---

## Model: `FeeCategory`

### Schema

| Field | Type | Required | Default | Constraints |
|-------|------|----------|---------|-------------|
| `name` | String | yes | — | trimmed, 2-200 chars |
| `description` | String | no | — | max 1000 chars |
| `category` | Enum | yes | — | `tuition`, `meals`, `transport`, `uniform`, `books`, `trips`, `extracurricular`, `other` |
| `amount` | Number | yes | — | min: 50, max: 10,000,000 (in NGN) |
| `currency` | String | no | `"NGN"` | ISO 4217, locked to NGN initially |
| `dueDate` | Date | no | — | must be future on creation |
| `isRecurring` | Boolean | no | `false` | enables recurrence rule |
| `recurrenceRule` | Object | conditional | — | required if `isRecurring: true` |
| `recurrenceRule.frequency` | Enum | yes (if recurring) | — | `weekly`, `biweekly`, `monthly`, `termly`, `annually` |
| `recurrenceRule.dayOfMonth` | Number | no | — | 1-31, used for monthly frequency |
| `recurrenceRule.startDate` | Date | yes (if recurring) | — | must be future on creation |
| `recurrenceRule.endDate` | Date | no | — | must be after startDate |
| `schoolProfile` | ObjectId → SchoolProfile | yes | — | must belong to parent |
| `createdBy` | ObjectId → User | yes | — | set from `req.userId`, immutable |
| `applicableTo` | [ObjectId → Child] | no | `[]` | empty = applies to all children at school |
| `isActive` | Boolean | no | `true` | soft-delete mechanism |
| `createdAt` | Date | auto | `Date.now` | — |
| `updatedAt` | Date | auto | `Date.now` | — |

### Embedded: `recurrenceRule`
Not a separate collection. Embedded within the FeeCategory document for atomic reads.

```javascript
const recurrenceRuleSchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: ['weekly', 'biweekly', 'monthly', 'termly', 'annually'],
    required: true
  },
  dayOfMonth: {
    type: Number,
    min: 1,
    max: 31
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  }
}, { _id: false });
```

### Indexes
- `{ schoolProfile: 1, isActive: 1, dueDate: 1 }` — upcoming obligations query
- `{ createdBy: 1 }` — parent's fee categories across all schools
- `{ schoolProfile: 1, name: 1 }` — unique per school to prevent duplicate fee names

### Mongoose Options
- `timestamps: true`

---

## API Endpoints

### `POST /api/fee-categories`
**Purpose:** Create a fee category for a school profile.

**Auth:** Required (parent role).

**Request body:**
```json
{
  "name": "Term 2 Tuition",
  "description": "Second term school fees for 2026",
  "category": "tuition",
  "amount": 75000,
  "dueDate": "2026-04-15T00:00:00.000Z",
  "isRecurring": true,
  "recurrenceRule": {
    "frequency": "termly",
    "startDate": "2026-01-15T00:00:00.000Z",
    "endDate": "2026-12-15T00:00:00.000Z"
  },
  "schoolProfile": "<schoolProfileId>",
  "applicableTo": ["<childId1>", "<childId2>"]
}
```

**Validation rules:**
- `name`: required, trimmed, 2-200 chars, escape XSS
- `category`: required, must be one of enum values
- `amount`: required, float, min 50, max 10,000,000
- `dueDate`: optional, ISO 8601, must be in the future on creation
- `isRecurring`: optional boolean
- If `isRecurring: true`:
  - `recurrenceRule` is required
  - `recurrenceRule.frequency` is required, must be enum
  - `recurrenceRule.startDate` is required, must be future
  - `recurrenceRule.endDate` is optional, must be after `startDate`
  - `recurrenceRule.dayOfMonth` is optional, 1-31
- `schoolProfile`: required, valid ObjectId, must belong to `req.userId`
- `applicableTo`: optional array of ObjectIds, each must be a Child belonging to the same school profile
- Business rule: max 50 fee categories per school profile

**Happy path (201):**
```json
{
  "message": "Fee category created",
  "feeCategory": { "_id": "...", "name": "Term 2 Tuition", ... }
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Missing required fields | `{ "errors": [...] }` |
| 400 | `dueDate` in the past | `{ "error": "Due date must be in the future" }` |
| 400 | `recurrenceRule` missing when `isRecurring: true` | `{ "error": "Recurrence rule is required for recurring fees" }` |
| 400 | `endDate` before `startDate` | `{ "error": "End date must be after start date" }` |
| 400 | `applicableTo` child not at this school | `{ "error": "Child <name> is not enrolled at this school" }` |
| 400 | School profile doesn't belong to parent | `{ "error": "School profile not found" }` |
| 409 | Duplicate fee name at school | `{ "error": "A fee category with this name already exists at this school" }` |
| 429 | 50 fee categories at this school | `{ "error": "Maximum fee categories per school reached (50)" }` |

---

### `GET /api/fee-categories`
**Purpose:** List fee categories with filtering.

**Query params:**
- `schoolProfile` (ObjectId, optional) — filter by school
- `category` (string, optional) — filter by category type
- `isActive` (boolean, optional)
- `isRecurring` (boolean, optional)
- `dueBefore` (ISO date, optional) — fee due before this date
- `dueAfter` (ISO date, optional) — fee due after this date
- `page` (int, default: 1)
- `limit` (int, default: 20, max: 100)

**Response (200):**
```json
{
  "feeCategories": [
    {
      "_id": "...",
      "name": "Term 2 Tuition",
      "category": "tuition",
      "amount": 75000,
      "dueDate": "2026-04-15T00:00:00.000Z",
      "isRecurring": true,
      "recurrenceRule": { "frequency": "termly", ... },
      "schoolProfile": { "_id": "...", "name": "Greensprings School" },
      "applicableTo": [
        { "_id": "...", "firstName": "Chinedu", "lastName": "Okafor" }
      ],
      "isActive": true
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

**Implementation notes:**
- Always filter by `{ createdBy: req.userId }`
- Populate `schoolProfile` (name only) and `applicableTo` (firstName, lastName)
- Date range filter: `{ dueDate: { $gte: dueAfter, $lte: dueBefore } }`

---

### `GET /api/fee-categories/upcoming`
**Purpose:** Aggregated view of upcoming obligations for the next 30 days.

**Auth:** Required.

**Query params:**
- `days` (int, default: 30, max: 90) — lookahead window

**Response (200):**
```json
{
  "upcoming": [
    {
      "feeCategory": {
        "_id": "...",
        "name": "Lunch Fee",
        "category": "meals",
        "amount": 5000
      },
      "child": { "_id": "...", "firstName": "Chinedu", "lastName": "Okafor" },
      "schoolProfile": { "_id": "...", "name": "Greensprings School" },
      "dueDate": "2026-03-15T00:00:00.000Z",
      "daysUntilDue": 10,
      "isOverdue": false
    }
  ],
  "summary": {
    "totalAmount": 85000,
    "count": 4,
    "overdueCount": 1,
    "overdueAmount": 10000
  }
}
```

**Implementation notes:**
- Query: `{ createdBy: req.userId, isActive: true, dueDate: { $lte: now + days } }`
- Include overdue items (dueDate in the past, no completed transaction)
- Cross-reference with `ScheduledPayment` to check if already paid
- For recurring fees, compute next occurrence date

---

### `GET /api/fee-categories/:id`
**Purpose:** Get single fee category with payment status per child.

**Response (200):**
```json
{
  "feeCategory": { ... },
  "paymentStatus": [
    {
      "child": { "firstName": "Chinedu", "lastName": "Okafor" },
      "status": "paid",
      "paidAmount": 75000,
      "paidDate": "2026-03-01T10:00:00.000Z",
      "transaction": "<transactionId>"
    },
    {
      "child": { "firstName": "Amara", "lastName": "Okafor" },
      "status": "pending",
      "scheduledPayment": "<scheduledPaymentId>"
    }
  ]
}
```

---

### `PUT /api/fee-categories/:id`
**Purpose:** Update a fee category.

**Editable fields:** `name`, `description`, `category`, `amount`, `dueDate`, `isRecurring`, `recurrenceRule`, `applicableTo`, `isActive`

**Non-editable fields:** `createdBy`, `schoolProfile`, `_id`

**Amount Change Behavior:**
When `amount` changes and there are pending `ScheduledPayment` records:
- Do NOT retroactively update existing scheduled payments (they snapshot the amount)
- Return a warning in the response:
```json
{
  "message": "Fee category updated",
  "feeCategory": { ... },
  "warning": "3 pending scheduled payments still use the previous amount (₦50,000). Use 'Update Future Payments' to apply the new amount.",
  "pendingPaymentsCount": 3
}
```

**Deactivation (`isActive: false`) side effects:**
- Cancel all pending `ScheduledPayment` for this fee category
- Return count of cancelled payments

---

### `DELETE /api/fee-categories/:id`
**Purpose:** Deactivate a fee category.

**Side effects:**
1. Set `isActive: false`
2. Cancel all pending `ScheduledPayment` for this fee category

Alternatively, hard-delete if no completed transactions reference this fee category.

**Response (200):**
```json
{
  "message": "Fee category deactivated",
  "cancelledPayments": 2
}
```

---

### `PUT /api/fee-categories/:id/update-future-payments`
**Purpose:** Update the amount on all pending scheduled payments for this fee category.

**Request body:**
```json
{
  "newAmount": 80000
}
```

**Response (200):**
```json
{
  "message": "Updated 3 pending scheduled payments to ₦80,000",
  "updatedCount": 3
}
```

**Implementation:** `ScheduledPayment.updateMany({ feeCategory: id, status: 'pending' }, { $set: { amount: newAmount } })`

---

## Overdue Detection Logic

A fee category is considered **overdue** when:
1. `dueDate` is in the past, AND
2. No `ScheduledPayment` with `status: 'completed'` exists for the combination of `{ feeCategory, child }`, AND
3. The fee category `isActive: true`

For recurring fees, only the *current occurrence* can be overdue. Past occurrences that were completed are not flagged.

---

## Category Enum Descriptions

| Value | Description | Typical Frequency |
|-------|-------------|-------------------|
| `tuition` | School fees, term fees | Termly / Annually |
| `meals` | Lunch money, meal plans | Weekly / Monthly |
| `transport` | School bus, transport levy | Monthly / Termly |
| `uniform` | School uniforms, PE kits | As needed |
| `books` | Textbooks, workbooks | Termly / Annually |
| `trips` | Excursions, field trips | As needed |
| `extracurricular` | Clubs, sports, music lessons | Monthly / Termly |
| `other` | Miscellaneous fees | Varies |

---

## Testing Checklist

- [ ] Create fee category with all fields → 201
- [ ] Create with only required fields → 201
- [ ] Create with missing name → 400
- [ ] Create with invalid category → 400
- [ ] Create with amount below 50 → 400
- [ ] Create with amount above 10,000,000 → 400
- [ ] Create with past dueDate → 400
- [ ] Create recurring without recurrenceRule → 400
- [ ] Create recurring with endDate before startDate → 400
- [ ] Create with applicableTo child not at school → 400
- [ ] Create with non-owned school profile → 400
- [ ] Create duplicate name at school → 409
- [ ] Create 51st fee at school → 429
- [ ] List fee categories with filters (category, school, date range)
- [ ] Upcoming endpoint returns next 30 days with overdue
- [ ] Get fee detail returns per-child payment status
- [ ] Update amount shows warning about pending payments
- [ ] Update future payments batch-updates scheduled amounts
- [ ] Deactivate cancels pending scheduled payments
- [ ] Overdue detection works correctly
- [ ] Recurring fee next occurrence computed correctly
- [ ] Pagination works correctly
