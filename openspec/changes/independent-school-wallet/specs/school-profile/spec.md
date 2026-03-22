# Spec: School Profile Management

## Overview
Parent-created school profiles that allow parents to organize payments for schools not yet onboarded to Kudegowo. Each profile is owned by the creating parent with complete data isolation. Profiles carry an `isVerified: false` flag, reserving a future path for school-claimed verification.

---

## Model: `SchoolProfile`

### Schema

| Field | Type | Required | Default | Constraints |
|-------|------|----------|---------|-------------|
| `name` | String | yes | — | trimmed, 2-200 chars |
| `address` | String | no | — | max 500 chars |
| `city` | String | no | — | max 100 chars |
| `state` | String | no | — | max 100 chars, should be valid Nigerian state |
| `schoolType` | Enum | yes | — | `primary`, `secondary`, `combined`, `nursery` |
| `contactEmail` | String | no | — | valid email format |
| `contactPhone` | String | no | — | valid Nigerian phone format |
| `createdBy` | ObjectId → User | yes | — | set from `req.userId`, immutable |
| `isVerified` | Boolean | no | `false` | system-managed, not parent-editable |
| `metadata` | Object | no | `{}` | extensible key-value store |
| `createdAt` | Date | auto | `Date.now` | — |
| `updatedAt` | Date | auto | `Date.now` | — |

### Indexes
- `{ createdBy: 1, name: 1 }` — **unique compound**: prevents duplicate school names per parent
- `{ createdBy: 1 }` — fast listing of parent's schools

### Mongoose Options
- `timestamps: true`
- `toJSON: { virtuals: true }` (for computed stats)

---

## API Endpoints

### `POST /api/school-profiles`
**Purpose:** Create a new school profile.

**Auth:** Required (parent role).

**Rate limit:** `apiLimiter` + business rule: max 10 school profiles per parent.

**Request body:**
```json
{
  "name": "Greensprings School",
  "address": "12 Admiralty Way, Lekki",
  "city": "Lagos",
  "state": "Lagos",
  "schoolType": "combined",
  "contactEmail": "info@greensprings.ng",
  "contactPhone": "+2348012345678"
}
```

**Validation rules:**
- `name`: required, trimmed, 2-200 chars, escape XSS
- `schoolType`: required, must be one of enum values
- `contactEmail`: optional, valid email format
- `contactPhone`: optional, valid phone format (10-15 digits, optional + prefix)
- `address`, `city`, `state`: optional, trimmed, max length enforced

**Happy path (201):**
```json
{
  "message": "School profile created",
  "schoolProfile": { "_id": "...", "name": "Greensprings School", ... }
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Missing required fields or invalid format | `{ "errors": [{ "field": "name", "message": "Name is required" }] }` |
| 409 | Duplicate `{ createdBy, name }` | `{ "error": "You already have a school profile with this name" }` |
| 429 | Parent already has 10 school profiles | `{ "error": "Maximum school profiles reached (10). Delete an unused profile to create a new one." }` |

**Implementation notes:**
- Check profile count before insert (race-safe via unique index fallback)
- Catch MongoDB duplicate key error (code 11000) and return 409

---

### `GET /api/school-profiles`
**Purpose:** List all school profiles for the authenticated parent.

**Auth:** Required.

**Query params:**
- `page` (int, default: 1, min: 1)
- `limit` (int, default: 20, min: 1, max: 100)
- `search` (string, optional) — partial match on `name`

**Response (200):**
```json
{
  "schoolProfiles": [
    {
      "_id": "...",
      "name": "Greensprings School",
      "schoolType": "combined",
      "city": "Lagos",
      "childrenCount": 2,
      "createdAt": "2026-03-01T10:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 3, "pages": 1 }
}
```

**Implementation notes:**
- Use `.lean()` for performance
- Aggregate `childrenCount` via a `$lookup` or virtual populate
- Filter: `{ createdBy: req.userId }` always applied
- If `search` provided: `{ name: { $regex: search, $options: 'i' } }`

---

### `GET /api/school-profiles/:id`
**Purpose:** Get single school profile with summary statistics.

**Auth:** Required. Ownership enforced.

**Response (200):**
```json
{
  "schoolProfile": { "_id": "...", "name": "Greensprings School", ... },
  "stats": {
    "childrenCount": 2,
    "activeFeeCategories": 5,
    "upcomingPayments": 3,
    "totalObligations": 125000,
    "overdueCount": 1
  }
}
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 404 | Profile not found or not owned by parent | `{ "error": "School profile not found" }` |
| 400 | Invalid ObjectId format | `{ "error": "Invalid profile ID" }` |

---

### `PUT /api/school-profiles/:id`
**Purpose:** Update school profile metadata.

**Auth:** Required. Ownership enforced.

**Editable fields:** `name`, `address`, `city`, `state`, `schoolType`, `contactEmail`, `contactPhone`, `metadata`

**Non-editable fields:** `createdBy`, `isVerified`, `_id`

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 403 | Attempting to edit `isVerified` or `createdBy` | `{ "error": "Cannot modify system-managed fields" }` |
| 409 | New name conflicts with another profile | `{ "error": "You already have a school profile with this name" }` |

---

### `DELETE /api/school-profiles/:id`
**Purpose:** Soft-delete a school profile.

**Auth:** Required. Ownership enforced.

**Pre-conditions:**
- No active children linked to this school profile
- No pending scheduled payments for fee categories under this school

**Happy path (200):**
```json
{ "message": "School profile deleted" }
```

**Unhappy paths:**
| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Active children exist | `{ "error": "Cannot delete school profile with active children. Deactivate or transfer children first." }` |
| 400 | Pending scheduled payments exist | `{ "error": "Cannot delete school profile with pending payments. Cancel payments first." }` |

**Implementation notes:**
- Could be a hard delete (since parent owns all data) or soft delete via `isDeleted` flag
- Recommended: hard delete for simplicity since this is parent-owned data. Cascade-delete associated fee categories (that have no completed transactions).

---

## Ownership Enforcement Pattern

Every route handler MUST include the parent scope:

```javascript
// Standard ownership check
const schoolProfile = await SchoolProfile.findOne({
  _id: req.params.id,
  createdBy: req.userId
});

if (!schoolProfile) {
  return res.status(404).json({ error: 'School profile not found' });
}
```

This pattern returns 404 (not 403) for profiles that exist but are owned by another parent — preventing user enumeration.

---

## Nigerian States Validation (Optional Enhancement)

For the `state` field, optionally validate against the 36 Nigerian states + FCT:
```
Abia, Adamawa, Akwa Ibom, Anambra, Bauchi, Bayelsa, Benue, Borno,
Cross River, Delta, Ebonyi, Edo, Ekiti, Enugu, FCT, Gombe, Imo,
Jigawa, Kaduna, Kano, Katsina, Kebbi, Kogi, Kwara, Lagos, Nasarawa,
Niger, Ogun, Ondo, Osun, Oyo, Plateau, Rivers, Sokoto, Taraba,
Yobe, Zamfara
```

This is a nice-to-have validation — not a blocker. Accept freeform text initially.

---

## Testing Checklist

- [ ] Create school profile with all valid fields → 201
- [ ] Create school profile with only required fields → 201
- [ ] Create with missing name → 400
- [ ] Create with invalid schoolType → 400
- [ ] Create duplicate name for same parent → 409
- [ ] Same school name for different parents → 201 (allowed)
- [ ] Create 11th profile → 429
- [ ] List profiles returns only authenticated parent's profiles
- [ ] List with search filter works (case-insensitive)
- [ ] Get profile returns stats (children count, fee count)
- [ ] Get non-existent profile → 404
- [ ] Get another parent's profile → 404 (not 403)
- [ ] Update name to existing name → 409
- [ ] Update non-editable fields → 403
- [ ] Delete profile with no children → 200
- [ ] Delete profile with active children → 400
- [ ] Delete profile with pending payments → 400
- [ ] Pagination works correctly (page, limit, total)
