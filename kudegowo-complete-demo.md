# KudEgOwo Comprehensive Demo Plan

Upgrade the `kudegowo` monorepo to a production-grade client demo that implements all features from the pitch deck and aligns with the C4 architecture, including AI-assisted onboarding, Safe School, Financial Literacy, and full payment flows.

---

## Feature Coverage Matrix

### Pitch Deck Features

| Feature | Priority | Days | Status |
|---------|----------|------|--------|
| **Cashless School Payments** | P0 | 2 | Exists (needs mock Paystack) |
| **Child Wallet & Savings** | P0 | 1 | Exists (needs savings UI) |
| **Smart Notifications** | P0 | 2 | Needs SMS/WhatsApp/Push |
| **School Analytics Dashboard** | P1 | 2 | Needs real-time charts |
| **Safe School (Attendance, Alerts)** | P1 | 3 | Wireframe exists, needs backend |
| **Financial Literacy (Games, KudiCoins)** | P2 | 3 | Wireframe exists, needs backend |
| **Meal Pre-ordering** | P2 | 2 | Wireframe exists, needs backend |
| **Academic Progress Tracking** | P2 | 2 | Not started |
| **Tutor Marketplace** | P3 | 3 | Not started |
| **Bank Partner Integration** | P3 | 2 | Mock only |

### C4 Architecture Components

| Component | Priority | Days | Status |
|-----------|----------|------|--------|
| **AI Agent Service (LangGraph)** | P0 | 4 | Not started — core differentiator |
| **SSE Streaming for Chat** | P0 | 1 | Not started |
| **Background Worker (Celery)** | P1 | 2 | Using cron, needs proper worker |
| **Redis (Queue + Cache)** | P1 | 1 | Not started |
| **Tutor Persona** | P2 | 2 | Not started |
| **Observability (Sentry + PostHog)** | P1 | 1 | Not started |
| **OAuth2/JWT Auth** | ✅ | - | Exists |

---

## Implementation Phases

### Phase 1: Infrastructure & Core (Days 1-3)

#### Day 1: Docker Compose + Seed Data

**Files to create:**
```
docker-compose.yml          # MongoDB, Redis, all services
backend/scripts/seed.js     # Demo data
backend/Dockerfile          # Backend container
frontend/Dockerfile         # Frontend container
```

**Seed data includes:**
- 3 parents (demo accounts)
- 5 schools (Lagos, Abuja, Port Harcourt, Ibadan, Kano)
- 15 children across schools
- Fee categories (tuition, meals, transport, uniform, books, trips)
- 50+ sample transactions
- Scheduled payments (pending, completed, failed)

**Demo credentials:**
| Role | Email | Password |
|------|-------|----------|
| Parent 1 | `ada.okonkwo@demo.com` | `Demo123!` |
| Parent 2 | `chidi.eze@demo.com` | `Demo123!` |
| School Admin | `admin@greensprings.demo.com` | `Demo123!` |
| Tutor | `tutor@demo.com` | `Demo123!` |

#### Day 2: Mock Payment Integration

**Files to create:**
```
backend/services/mockPaystack.js    # Simulates Paystack API
backend/routes/mockWebhook.js       # Webhook simulation
frontend/app/mock-payment/page.tsx  # Mock checkout UI
```

**Mock Paystack features:**
- `initializeTransaction` → Returns mock authorization URL
- `verifyTransaction` → Returns success/failure based on test card
- `chargeAuthorization` → For recurring payments
- Webhook simulation with configurable delay

**Test scenarios:**
- Success: Card `4084 0840 8408 4081`
- Insufficient funds: Card `4084 0840 8408 4082`
- Declined: Card `4084 0840 8408 4083`

#### Day 3: Notification Integration

**Files to create:**
```
backend/services/notifications/
├── index.js           # Notification dispatcher
├── sms.js             # Termii sandbox / mock
├── email.js           # Resend (free tier)
├── whatsapp.js        # Mock WhatsApp Business API
├── push.js            # Mock FCM
└── templates/         # Message templates
    ├── payment-confirmation.js
    ├── payment-reminder.js
    ├── attendance-alert.js
    └── emergency-alert.js
```

**In-app notifications:**
- SSE endpoint for real-time updates
- Notification bell in header
- Toast notifications
- Notification center page

---

### Phase 2: AI Agent Service (Days 4-7)

#### Day 4-5: LangGraph Orchestrator

**Files to create:**
```
ai-agent/
├── pyproject.toml
├── Dockerfile
├── src/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Pydantic settings
│   ├── instrument.py        # Sentry init
│   ├── routers/
│   │   ├── chat.py          # SSE chat endpoint
│   │   └── health.py
│   └── agent/
│       ├── orchestrator.py  # LangGraph state machine
│       ├── memory.py        # Conversation buffer
│       ├── tools.py         # Tool definitions
│       ├── tool_executor.py # Backend API calls
│       └── llm_client.py    # OpenAI/Anthropic wrapper
```

**Onboarding flow (LangGraph nodes):**
1. `greet` → Welcome user, explain platform
2. `collect_role` → Parent, School Admin, or Tutor
3. `collect_school` → School name, location
4. `collect_children` → Child names, classes
5. `collect_fees` → Fee categories to set up
6. `confirm` → Review and confirm
7. `create_records` → Call Backend API to create entities
8. `payment_prompt` → Offer to make first payment
9. `complete` → Success message

**Tools available to LLM:**
- `get_schools` → Search schools by name/location
- `create_school_profile` → Create new school profile
- `add_child` → Add child to school
- `get_fee_categories` → List available fees
- `initiate_payment` → Start payment flow

#### Day 6: SSE Streaming + Chat UI

**Files to create:**
```
frontend/app/onboarding/
├── page.tsx           # Onboarding chat page
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   ├── TypingIndicator.tsx
│   └── QuickActions.tsx
```

**Chat features:**
- SSE connection to AI Agent
- Streaming message display
- Quick action buttons (suggested responses)
- Rich message cards (school cards, fee cards)
- Progress indicator

#### Day 7: Integration Testing

- End-to-end onboarding flow
- Tool execution verification
- Error handling and fallbacks
- Mock LLM for demo mode (no API key required)

---

### Phase 3: Safe School Module (Days 8-10)

#### Day 8: Backend Models & Routes

**Files to create:**
```
backend/models/
├── Attendance.js      # Check-in/out records
├── GateAccess.js      # Access control logs
├── EmergencyAlert.js  # Alert records
└── Passphrase.js      # Digital passphrases

backend/routes/
├── attendance.js      # Attendance CRUD
├── gateAccess.js      # Gate access endpoints
└── emergencyAlerts.js # Alert management
```

**Attendance features:**
- Check-in with passphrase
- Check-out with passphrase
- Real-time parent notification
- Daily attendance report

**Gate access features:**
- Generate daily passphrase
- Validate passphrase at gate
- Log all access attempts
- Alert on unauthorized attempts

**Emergency alerts:**
- Create alert (school admin)
- Broadcast to all parents
- Multi-channel delivery (SMS, WhatsApp, Push)
- Acknowledgment tracking

#### Day 9: Frontend UI

**Files to create:**
```
frontend/app/dashboard/safe-school/
├── page.tsx           # Safe School dashboard
├── attendance/
│   └── page.tsx       # Attendance view
├── gate-access/
│   └── page.tsx       # Gate access management
└── emergency/
    └── page.tsx       # Emergency alerts

frontend/app/gate-scanner/
└── page.tsx           # QR/Passphrase scanner (school)
```

**UI features:**
- Real-time attendance board
- Passphrase display for parents
- Gate scanner interface for schools
- Emergency alert creation wizard
- Alert history and acknowledgments

#### Day 10: Demo Flow

- Parent receives daily passphrase
- Child checks in at gate
- Parent receives instant notification
- School admin triggers emergency alert
- All parents receive multi-channel alert

---

### Phase 4: Financial Literacy (Days 11-13)

#### Day 11: Backend Models & Routes

**Files to create:**
```
backend/models/
├── KudiCoin.js        # Reward points
├── SavingsGoal.js     # Child savings goals
├── Quiz.js            # Financial literacy quizzes
├── Leaderboard.js     # Class/school rankings
└── Achievement.js     # Badges and achievements

backend/routes/
├── kudiCoins.js       # Points management
├── savingsGoals.js    # Goals CRUD
├── quizzes.js         # Quiz management
└── leaderboard.js     # Rankings
```

**KudiCoins features:**
- Earn coins for savings, quiz completion, good behavior
- Redeem coins for rewards (school store items)
- Parent-controlled spending rules
- Transaction history

**Savings goals:**
- Create goal with target amount
- Track progress
- Auto-round-up from wallet transactions
- Celebrate goal completion

#### Day 12: Frontend UI

**Files to create:**
```
frontend/app/dashboard/financial-literacy/
├── page.tsx           # Financial literacy hub
├── kudicoins/
│   └── page.tsx       # KudiCoins dashboard
├── savings/
│   └── page.tsx       # Savings goals
├── quizzes/
│   └── page.tsx       # Quiz center
└── leaderboard/
    └── page.tsx       # Class leaderboard
```

**UI features:**
- Gamified dashboard with progress bars
- Quiz interface with animations
- Leaderboard with avatars
- Achievement badges display
- Savings goal progress tracker

#### Day 13: Demo Flow

- Child completes quiz → Earns KudiCoins
- Child sets savings goal
- Parent tops up wallet → Auto-round-up
- Child reaches goal → Celebration animation
- View class leaderboard

---

### Phase 5: Meal Management (Days 14-15)

#### Day 14: Backend Models & Routes

**Files to create:**
```
backend/models/
├── Menu.js            # Daily/weekly menus
├── MealOrder.js       # Pre-orders
├── DietaryPreference.js # Allergies, preferences
└── CanteenTransaction.js # POS transactions

backend/routes/
├── menus.js           # Menu CRUD
├── mealOrders.js      # Order management
└── canteen.js         # POS endpoints
```

**Meal features:**
- Weekly menu display
- Pre-order meals for the week
- Dietary preferences and allergies
- Canteen QR code payment
- Real-time balance deduction

#### Day 15: Frontend UI

**Files to create:**
```
frontend/app/dashboard/meals/
├── page.tsx           # Meal management hub
├── menu/
│   └── page.tsx       # Weekly menu view
├── orders/
│   └── page.tsx       # Pre-order interface
└── preferences/
    └── page.tsx       # Dietary preferences

frontend/app/canteen/
└── page.tsx           # Canteen POS scanner
```

**UI features:**
- Visual weekly menu calendar
- One-click meal pre-ordering
- Dietary preference management
- Canteen QR scanner for schools
- Transaction history

---

### Phase 6: Background Worker + Redis (Days 16-17)

#### Day 16: Celery Worker Setup

**Files to create:**
```
worker/
├── pyproject.toml
├── Dockerfile
├── src/
│   ├── celery_app.py      # Celery configuration
│   ├── config.py          # Settings
│   ├── instrument.py      # Sentry init
│   └── tasks/
│       ├── payment.py     # Payment processing
│       ├── notification.py # Multi-channel dispatch
│       ├── scheduled.py   # Scheduled payment processing
│       └── reports.py     # Report generation
```

**Tasks:**
- `process_payment` — Charge, refund, wallet top-up
- `send_notification` — SMS, WhatsApp, Push, Email
- `process_scheduled_payments` — Cron replacement
- `generate_daily_report` — School admin reports
- `broadcast_emergency` — Mass notification

#### Day 17: Integration

- Replace node-cron with Celery beat
- Add Redis to Docker Compose
- Configure result backend (MongoDB)
- Dead-letter queue for failed tasks
- Flower dashboard for monitoring

---

### Phase 7: Observability + Polish (Days 18-20)

#### Day 18: Sentry + PostHog

**Files to modify:**
```
frontend/
├── sentry.client.config.ts
├── sentry.server.config.ts
├── sentry.edge.config.ts
└── src/lib/posthog.ts

backend/
├── middleware/sentry.js
└── services/posthog.js

ai-agent/src/instrument.py
worker/src/instrument.py
```

**Observability features:**
- Error tracking across all services
- Performance monitoring
- User analytics (funnels, retention)
- Feature usage tracking

#### Day 19: Demo Controls + Guided Tour

**Files to create:**
```
frontend/components/
├── DemoBanner.tsx         # Demo mode indicator
├── DemoControls.tsx       # Admin controls panel
└── GuidedTour.tsx         # Intro.js integration

backend/routes/demo.js     # Demo control endpoints
```

**Demo controls:**
- Reset database to seed state
- Trigger scheduled payment processing
- Simulate webhook events
- Send test notifications
- Switch user persona
- Fast-forward time (for scheduled payments)

**Guided tour:**
- 15-step walkthrough of key features
- Highlight value propositions
- Skip option for returning users

#### Day 20: Documentation + Testing

**Files to create:**
```
DEMO_SCRIPT.md             # 30-minute presentation guide
TESTING_CHECKLIST.md       # QA checklist
README.md                  # Updated setup instructions
```

**Demo script sections:**
1. Introduction (2 min)
2. Parent onboarding with AI (5 min)
3. School profile setup (3 min)
4. Payment flow (5 min)
5. Safe School demo (5 min)
6. Financial Literacy demo (5 min)
7. Meal management demo (3 min)
8. Analytics dashboard (2 min)

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Compose                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Frontend   │  │   Backend   │  │  AI Agent   │         │
│  │  (Next.js)  │  │  (Express)  │  │  (FastAPI)  │         │
│  │   :3000     │  │   :5000     │  │   :8000     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         │    REST/JWT    │    REST/JWT    │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│  ┌─────────────┐  ┌──────┴──────┐  ┌─────────────┐         │
│  │   Worker    │  │    Redis    │  │   MongoDB   │         │
│  │  (Celery)   │◄─┤   :6379     │  │   :27017    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Timeline Summary

| Phase | Days | Focus | Deliverables |
|-------|------|-------|--------------|
| **1** | 1-3 | Infrastructure | Docker, seed data, mock payments, notifications |
| **2** | 4-7 | AI Agent | LangGraph, SSE, chat UI, onboarding flow |
| **3** | 8-10 | Safe School | Attendance, gate access, emergency alerts |
| **4** | 11-13 | Financial Literacy | KudiCoins, savings, quizzes, leaderboard |
| **5** | 14-15 | Meal Management | Menus, pre-orders, canteen POS |
| **6** | 16-17 | Background Worker | Celery, Redis, task queue |
| **7** | 18-20 | Polish | Observability, demo controls, documentation |

**Total: 20 working days (~4 weeks)**

---

## Success Criteria

### Functional
- [ ] One-command start: `docker-compose up`
- [ ] AI onboarding completes end-to-end
- [ ] Payment flow works with mock Paystack
- [ ] Notifications delivered via email + in-app
- [ ] Safe School attendance tracking works
- [ ] Financial Literacy quizzes functional
- [ ] Meal pre-ordering works
- [ ] All 3 personas (parent, school admin, tutor) functional

### Non-Functional
- [ ] Demo can be reset to initial state
- [ ] 30-minute demo script executable
- [ ] No real money charged (mock only)
- [ ] No real SMS sent (mock/sandbox only)
- [ ] Errors tracked in Sentry
- [ ] Analytics tracked in PostHog

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| LLM API costs | Mock LLM mode for demos without API key |
| SMS costs | Termii sandbox or console logging |
| Complexity | Phased delivery — MVP first, then add features |
| Time overrun | Each phase is independently demoable |

---

## Optional Enhancements (Post-MVP)

- Mobile app (React Native) — 2 weeks
- Bank partner mock integration — 1 week
- Tutor marketplace — 2 weeks
- Academic progress tracking — 1 week
- Community finance (Ajo) — 2 weeks
