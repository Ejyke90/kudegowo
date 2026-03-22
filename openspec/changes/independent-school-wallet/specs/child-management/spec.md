# Spec: Child Management

## Overview
Standalone `Child` model that replaces the embedded `User.children[]` array. Children are linked to both a parent (User) and a SchoolProfile, enabling per-child fee tracking, school transfers, and multi-school family management.

---

## Model: `Child`

### Schema

| Field | Type | Required | Default | Constraints |
|-------|------|----------|---------|-------------|
| `firstName` | String | yes | — | trimmed, 1-100 chars |
| `lastName` | String | yes | — | trimmed, 1-100 chars |
| `parent` | ObjectId → User | yes | — | set from `req.userId`, immutable |
| `schoolProfile` | ObjectId → SchoolProfile | yes | — | must belong to parent |
| `grade` | String | no | — | max 50 chars (e.g., "Year 5", "JSS 2") |
| `studentId` | String | no | — | max 50 chars, school-assigned ID |
| `dateOfBirth` | Date | no | — | must be in the past |
| `isActive` | Boolean | no | `true` | soft-delete mechanism |
| `createdAt` | Date | auto | `Date.now` | — |
| `updatedAt` | Date | auto | `Date.now` | — |

### Indexes
- `{ parent: 1, schoolProfile: 1 }` — list children per school
- `{ parent: 1, isActive: 1 }` — list active children
- `{ parent: 1, firstName: 1, lastName: 1, schoolProfile: 1 }` — unique compound to prevent exact duplicates

### Mongoose Options
- `timestamps: true`

---

## API Endpoints

### `POST /api/children`
**Purpose:** Add a child to a school profile.

**Auth:** Required (parent role).

**Request body:**
```json
{
  "firstName": "Chinedu",
  "lastName": "Okafor",
  "schoolProfile": "<schoolProfileId>",
  "grade": "Year 5",
  "studentId": "GS-2024-0042",
  "dateOfBirth": "2015-06-15"
}
```

**Validation rules:**
- `firstName`, `lastName`: required, trimmed, 1-100 chars, escape XSS
- `schoolProfile`: required, valid ObjectId, must belong to `req.userId`
- `grade`: optional, trimmed, max 50 chars
- `studentId`: optional, trimmed, max 50 chars
- `dateOfBirth`: optional, must be a valid date in the past
- Business rule: max 20 children per school profile

**Happy path (201):**
```json
{
  "message": "Child added successfully",
  "child": { "_id": "...", "firstName": "Chinedu", ... }
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Missing required fields | `{ "errors": [{ "field": "firstName", "message": "First name is required" }] }` |
| 400 | School profile doesn't belong to parent | `{ "error": "School profile not found" }` |
| 409 | Duplicate child (same name + school) | `{ "error": "A child with this name already exists at this school" }` |
| 429 | 20 children already at this school | `{ "error": "Maximum children per school reached (20)" }` |

---

### `GET /api/children`
**Purpose:** List all children for the authenticated parent.

**Query params:**
- `schoolProfile` (ObjectId, optional) — filter by school
- `isActive` (boolean, optional) — filter by active status
- `page` (int, default: 1)
- `limit` (int, default: 20, max: 100)

**Response (200):**
```json
{
  "children": [
    {
      "_id": "...",
      "firstName": "Chinedu",
      "lastName": "Okafor",
      "grade": "Year 5",
      "schoolProfile": {
        "_id": "...",
        "name": "Greensprings School"
      },
      "isActive": true
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 2, "pages": 1 }
}
```

**Implementation notes:**
- Always filter by `{ parent: req.userId }`
- Populate `schoolProfile` with `name` only (projection)
- Use `.lean()` for performance

---

### `GET /api/children/:id`
**Purpose:** Get single child with fee summary.

**Response (200):**
```json
{
  "child": { ... },
  "feeSummary": {
    "totalObligations": 85000,
    "paid": 35000,
    "pending": 50000,
    "overdue": 10000,
    "upcomingPayments": [
      { "feeCategory": "Lunch Fee", "amount": 5000, "dueDate": "2026-03-15" }
    ]
  }
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 404 | Child not found or not owned by parent | `{ "error": "Child not found" }` |

---

### `PUT /api/children/:id`
**Purpose:** Update child info. Supports school transfer.

**Editable fields:** `firstName`, `lastName`, `schoolProfile`, `grade`, `studentId`, `dateOfBirth`

**Non-editable fields:** `parent`, `_id`

**School Transfer Logic:**
When `schoolProfile` changes:
1. Validate new school profile belongs to parent
2. Find all `ScheduledPayment` with `child: childId` AND `status: 'pending'`
3. Set their status to `cancelled` with `failureReason: "Child transferred to different school"`
4. Return the count of cancelled payments in the response

**Response (200):**
```json
{
  "message": "Child updated",
  "child": { ... },
  "cancelledPayments": 3
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | New school profile doesn't belong to parent | `{ "error": "School profile not found" }` |
| 409 | Name conflict at new school | `{ "error": "A child with this name already exists at this school" }` |

---

### `DELETE /api/children/:id`
**Purpose:** Deactivate a child (soft-delete).

**Side effects:**
1. Set `isActive: false`
2. Cancel all pending `ScheduledPayment` for this child
3. Remove child from `FeeCategory.applicableTo` arrays (if referenced)

**Response (200):**
```json
{
  "message": "Child deactivated",
  "cancelledPayments": 2
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 404 | Child not found | `{ "error": "Child not found" }` |
| 400 | Child already inactive | `{ "error": "Child is already inactive" }` |

---

## Migration: `User.children[]` → `Child` Model

### Script Logic
```
For each User where children[] is non-empty:
  1. Create a "Legacy" SchoolProfile:
     - name: "Legacy School (auto-migrated)"
     - schoolType: "combined"
     - createdBy: user._id
  2. For each child in user.children[]:
     - Create Child document:
       - firstName: child.name (split or use full)
       - lastName: user.lastName (inherited)
       - parent: user._id
       - schoolProfile: legacySchoolProfile._id
       - grade: child.class
       - studentId: child.studentId
  3. Do NOT remove user.children[] (backward compatible)
```

### Migration Safety
- Script is **idempotent**: checks for existing "Legacy" SchoolProfile before creating
- Run in a **transaction** per user (if replica set available)
- Log each migration: `{ userId, childrenMigrated, schoolProfileCreated }`
- Estimated runtime: O(n) where n = users with children

---

## Testing Checklist

- [ ] Create child with all fields → 201
- [ ] Create child with only required fields → 201
- [ ] Create child for non-owned school profile → 400
- [ ] Create duplicate child at same school → 409
- [ ] Create 21st child at school → 429
- [ ] List children returns only parent's children
- [ ] List children filtered by school profile
- [ ] List children filtered by isActive
- [ ] Get child returns fee summary
- [ ] Update child name → 200
- [ ] Transfer child to new school → cancels pending payments
- [ ] Transfer to non-owned school → 400
- [ ] Deactivate child → cancels pending payments
- [ ] Deactivate already-inactive child → 400
- [ ] Pagination works correctly
- [ ] Migration script: creates legacy school profile
- [ ] Migration script: is idempotent on re-run
