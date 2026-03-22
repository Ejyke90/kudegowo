# KudEgOwo — C4 Architecture Diagrams

## Level 1: System Context Diagram

> Who uses KudEgOwo and what external systems does it depend on?

```mermaid
flowchart TB
    Parent["👤 Parent\n[Person]\nTops up wallets, pays fees,\nviews attendance, receives alerts,\nreviews homework and scores"]
    SchoolAdmin["👤 School Admin / Teacher\n[Person]\nManages fees and meals,\nmarks attendance, sets homework,\nrecords scores, monitors safety"]
    Child["👤 Child / Student\n[Person]\nSpends from wallet at school,\ntakes quizzes, learns financial\nliteracy, checks in at gate"]

    KudEgOwo["🟦 KudEgOwo Platform\n[Software System]\nNigeria's school education\n& payments ecosystem\n\n8 modules: Payments, Wallet,\nSafe School, Education,\nAnalytics, Meals, Financial\nLiteracy, Notifications"]

    Paystack["Paystack\n[External System]\nCard, bank transfer,\nUSSD gateway"]
    NotifProviders["SMS / WhatsApp / Push\n[External System]\nNotification delivery"]
    BankPartner["Bank Partner\n[External System]\nChild savings accounts\nCBN-compliant"]
    MongoDB["MongoDB Atlas\n[External System]\nCloud database"]
    BankingNetwork["Nigerian Banking Network\n[External System]\nSettlement, USSD,\nPayPoint"]

    Parent -->|"Pays fees, tops up wallet,\nviews records"| KudEgOwo
    SchoolAdmin -->|"Manages school ops,\nrecords, safety"| KudEgOwo
    Child -->|"Uses wallet, takes quizzes,\nchecks in at gate"| KudEgOwo

    KudEgOwo -->|"HTTPS REST"| Paystack
    KudEgOwo -->|"HTTPS APIs"| NotifProviders
    KudEgOwo -->|"HTTPS Partner API"| BankPartner
    KudEgOwo -->|"TCP :27017"| MongoDB
    Paystack -->|"Settlement"| BankingNetwork

    style KudEgOwo fill:#438DD5,color:#fff
    style Parent fill:#08427B,color:#fff
    style SchoolAdmin fill:#08427B,color:#fff
    style Child fill:#08427B,color:#fff
    style Paystack fill:#999999,color:#fff
    style NotifProviders fill:#999999,color:#fff
    style BankPartner fill:#999999,color:#fff
    style MongoDB fill:#999999,color:#fff
    style BankingNetwork fill:#999999,color:#fff
```

---

## Level 2: Container Diagram (Technical)

> What are the actual technical building blocks and how do they communicate?

```mermaid
flowchart TB
    Browser["Browser Client\n[User Agent]\nChrome / Safari / Mobile"]

    subgraph FRONTEND ["Frontend Tier"]
        NextJS["Next.js 16 Web App\n[Container: TypeScript]\nReact 19, App Router,\nTailwind CSS 4, Lucide\nSSR + Client SPA"]
        Cache["Client-Side Cache\n[In-Browser]\nTanStack Query\nstale-while-revalidate,\nauto-retry with backoff"]
        Observability["Observability SDK\n[In-Browser]\nSentry (errors + traces),\nPostHog (analytics),\nWeb Vitals (perf)"]
    end

    subgraph BACKEND ["Backend Tier — Python"]
        FastAPI["FastAPI\n[Container: Python 3.12]\nPydantic v2 schemas,\nasync/await, OAuth2 + JWT,\nOpenAPI auto-docs"]
        Celery["Celery Worker\n[Background Process]\nPayment processing,\nnotification dispatch,\nretry with backoff"]
        Redis["Redis\n[Message Broker + Cache]\nCelery broker,\nrate limiting,\nserver-side cache"]
    end

    subgraph DATA ["Data Tier"]
        MongoDB["MongoDB\n[Document Store]\nMotor async driver,\nBeanie ODM + Pydantic,\noptimistic locking"]
    end

    subgraph EXTERNAL ["External Systems"]
        Paystack["Paystack Gateway\n[External: REST API]\nCard, Bank Transfer,\nUSSD, Webhooks\nNGN settlement"]
        NotifProviders["Notification Providers\n[External: APIs]\nSMS gateway,\nWhatsApp Business API,\nPush via FCM/APNs"]
        BankPartner["Bank Partner\n[External: API]\nChild savings accounts\nCBN-compliant KYC"]
    end

    subgraph INFRA ["Infrastructure and CI/CD"]
        Railway["Railway PaaS\n[Hosting]\nDocker/Nixpacks,\nauto-restart, healthcheck\n/api/health"]
        GHA["GitHub Actions\n[CI/CD]\nPython 3.12, pytest,\nDocker build, deploy"]
    end

    Browser -->|"HTTPS :3000\nRSC + JSON"| NextJS
    NextJS -->|"reads/writes"| Cache
    NextJS -->|"sends errors\n+ traces + events"| Observability
    Cache -->|"HTTPS :8000\nREST JSON + Bearer JWT\nwith retry + dedup"| FastAPI
    FastAPI -->|"async TCP :27017\nBeanie ODM"| MongoDB
    FastAPI -->|"enqueues tasks"| Redis
    Redis -->|"dispatches"| Celery
    Celery -->|"async TCP :27017\nBeanie ODM"| MongoDB
    FastAPI -->|"HTTPS\nhttpx + Secret Key"| Paystack
    Celery -->|"HTTPS\nhttpx async"| NotifProviders
    FastAPI -->|"HTTPS"| BankPartner
    Paystack -.->|"Webhook POST\nHMAC signature"| FastAPI
    Observability -.->|"HTTPS\nerror + perf data"| Sentry["Sentry / PostHog\n[External: SaaS]\nError tracking,\nproduct analytics"]
    GHA -->|"Docker push\n+ Railway CLI"| Railway
    Railway -->|"Hosts"| FastAPI

    style Browser fill:#08427B,color:#fff
    style NextJS fill:#438DD5,color:#fff
    style Cache fill:#438DD5,color:#fff
    style Observability fill:#438DD5,color:#fff
    style FastAPI fill:#306998,color:#fff
    style Celery fill:#306998,color:#fff
    style Redis fill:#DC382D,color:#fff
    style MongoDB fill:#438DD5,color:#fff
    style Paystack fill:#999999,color:#fff
    style NotifProviders fill:#999999,color:#fff
    style BankPartner fill:#999999,color:#fff
    style Sentry fill:#999999,color:#fff
    style Railway fill:#999999,color:#fff
    style GHA fill:#999999,color:#fff
```

---

## Container Inventory

### Frontend Tier

| Container | Tech Stack | Purpose |
|-----------|-----------|---------|
| **Next.js 16 Web App** | React 19, TypeScript, Tailwind CSS 4, App Router, Lucide | SSR + SPA. Dashboard, pitch decks ×4, wireframes ×7, school management UI |

### Backend Tier

| Container | Tech Stack | Purpose |
|-----------|-----------|---------|
| **NestJS 11 API** | TypeScript, Passport JWT (15min access / 7d refresh), class-validator, Mongoose 8, `@nestjs/schedule` | Primary API. Modules: Auth, Users, SchoolProfiles, Children, ScheduledPayments, Notifications |
| **Express 5 API** | JavaScript, JWT, express-validator, Mongoose 9, node-cron, express-rate-limit | Legacy API. Routes: auth, users, payments, items, school-profiles, children, fee-categories, scheduled-payments |
| **Payment Scheduler** | In-process cron (not a separate worker) | Processes due payments every 15min. Recovers stale locks every 60min. Exponential backoff retry. Atomic optimistic locking via `findOneAndUpdate`. |

### Data Tier

| Container | Tech Stack | Purpose |
|-----------|-----------|---------|
| **MongoDB** | Document store, Mongoose ODM | Collections: Users, SchoolProfiles, Children, FeeCategories, ScheduledPayments, Notifications, PaymentItems, Transactions |

### External Systems

| System | Protocol | Purpose |
|--------|----------|---------|
| **Paystack** | HTTPS REST + `sk_***`, Webhooks | Payment processing — card, bank transfer, USSD. NGN settlement. |
| **Notification Providers** | HTTPS APIs | SMS, WhatsApp Business API, Push (FCM/APNs). Prototyped, not yet integrated. |
| **Bank Partner** | HTTPS Partner API | Child savings accounts with CBN-compliant KYC. Referenced in pitch. |

### Infrastructure

| System | Tech | Purpose |
|--------|------|---------|
| **Railway PaaS** | Nixpacks builder, healthcheck, auto-restart (max 10 retries) | Hosts Express backend. Scale: 1 instance. |
| **GitHub Actions** | Node 18, `npm ci`, `railway-action@v1` | CI/CD. Triggers on push to `main` when `backend/**` changes. |

---

## Communication Protocols

| From | To | Protocol | Auth |
|------|----|----------|------|
| Browser | Next.js | HTTPS `:3000` | Session/cookie |
| Next.js | NestJS / Express | HTTPS `:5000` | `Authorization: Bearer <JWT>` |
| NestJS / Express | MongoDB | TCP `:27017` | Connection string credentials |
| Scheduler | MongoDB | TCP `:27017` | Atomic `findOneAndUpdate` |
| API | Paystack | HTTPS | `Authorization: Bearer sk_***` |
| Paystack | API | HTTPS Webhook POST | Signature verification |
| GitHub Actions | Railway | Railway CLI | `RAILWAY_API_TOKEN` secret |

---

## Key Technical Decisions

1. **Dual backend** — NestJS (new, typed, modular) coexists with Express (legacy, currently deployed). Migration in progress.
2. **JWT auth** — 15min access token (`expiresIn: 900`), 7d refresh token. Passport strategy with `JwtAuthGuard`.
3. **Scheduler is in-process** — Not a separate worker/queue. Runs as cron inside the API process. Safe for single-instance via optimistic locking.
4. **No message queue** — Payments, notifications, and scheduling are synchronous or cron-driven. No Redis/RabbitMQ/SQS yet.
5. **No CDN/edge** — Next.js serves static assets directly. No CloudFront/Vercel Edge layer.
6. **Monorepo** — Frontend + two backends + docs in one Git repository.

---

## What's Not Built Yet (from prototypes)

| Capability | Status | Technical Implication |
|-----------|--------|----------------------|
| Safe School (gate access, attendance) | Wireframed | Needs IoT/device integration, real-time WebSocket |
| Education Platform (homework, scores) | Wireframed | Needs offline-first sync, possibly SQLite + sync layer |
| Financial Literacy (gamification) | Wireframed | Needs game state management, leaderboard service |
| Smart Meal Management | Wireframed | Needs canteen POS integration, menu CRUD |
| Notification delivery | Prototyped in code | Needs SMS/WhatsApp/FCM provider integration |
| Bank Partner integration | Referenced in pitch | Needs KYC flow, partner API contract |
| Mobile app | Mobile-first CSS only | No native app — future React Native or PWA |
