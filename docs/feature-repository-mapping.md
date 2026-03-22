# KudEgOwo — Feature-to-Repository Mapping

This document maps all platform features to their respective repositories in the multi-repo architecture.

---

## **Repository Overview**

| # | Repository | Type | Tech Stack | Deploy Target |
|---|------------|------|------------|---------------|
| 1 | `kudegowo-web` | Frontend | Next.js 16, React 19, TypeScript | Vercel |
| 2 | `kudegowo-api` | Backend API | NestJS 11, TypeScript, MongoDB | Railway |
| 3 | **`kudegowo-ai`** | **AI/ML Services** | **Python, FastAPI, LangChain, Vector DB** | **AWS Lambda / Cloud Run** |
| 4 | `kudegowo-shared` | Shared Library | TypeScript + Python packages | npm + PyPI |
| 5 | `kudegowo-mobile` | Mobile App | React Native / Flutter | App Store + Play Store |
| 6 | `kudegowo-worker` | Background Jobs | Node.js/Python, BullMQ/Celery | Railway / ECS |
| 7 | `kudegowo-infra` | Infrastructure | Terraform, Docker, K8s | N/A (IaC) |

---

## **Feature-to-Repository Mapping by Milestone**

### **Milestone: AI Agents**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **AI Chatbot for Financial Literacy** | `kudegowo-ai` | `kudegowo-web`, `kudegowo-api` | - LangChain/LlamaIndex orchestration<br>- Vector DB for knowledge base<br>- Web UI for chat interface<br>- API for chat history storage |
| **Smart Spending Insights** | `kudegowo-ai` | `kudegowo-api`, `kudegowo-web` | - ML models for pattern analysis<br>- API endpoints for insights<br>- Dashboard widgets |
| **Predictive Payment Analytics** | `kudegowo-ai` | `kudegowo-api`, `kudegowo-worker` | - Time series forecasting<br>- Background job for model training<br>- API for predictions |
| **Fraud Detection** | `kudegowo-ai` | `kudegowo-api`, `kudegowo-worker` | - Anomaly detection models<br>- Real-time transaction monitoring<br>- Alert generation |
| **AI-Assisted Homework Grading** | `kudegowo-ai` | `kudegowo-api`, `kudegowo-web` | - NLP-based grading<br>- Feedback generation<br>- Grading UI |

---

### **Milestone: Design and Prototyping**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **UI/UX Design System** | `kudegowo-web` | `kudegowo-mobile`, `kudegowo-shared` | - Tailwind config<br>- Shared components<br>- Design tokens in shared package |
| **Wireframes & Prototypes** | `kudegowo-web` | - | - `/wireframes` route ✅<br>- Interactive demos ✅ |
| **Pitch Deck** | `kudegowo-web` | - | - `/pitch` route ✅<br>- Slide components ✅ |
| **Brand Assets** | `kudegowo-web` | `kudegowo-mobile` | - Logo system ✅<br>- Color palette<br>- Typography |

---

### **Milestone: Guardians Onboarding**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **Parent SignOn** | `kudegowo-api` | `kudegowo-web` | - Auth module (JWT) ✅<br>- Registration/login endpoints ✅<br>- Login UI forms ✅ |
| **Ward (Child) Profile Setup** | `kudegowo-api` | `kudegowo-web` | - Children module ✅<br>- Child CRUD endpoints ✅<br>- Profile setup wizard UI ✅ |
| **Multi-Child Management** | `kudegowo-api` | `kudegowo-web` | - Children service ✅<br>- List/detail views ✅<br>- Transfer logic ✅ |
| **KYC/Verification** | `kudegowo-api` | `kudegowo-worker`, `kudegowo-web` | - Document upload endpoints<br>- Background verification jobs<br>- Upload UI |
| **Parent Profile Management** | `kudegowo-api` | `kudegowo-web` | - Users module ✅<br>- Profile update endpoints ✅<br>- Profile UI |

---

### **Milestone: School Onboarding**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **School Registration** | `kudegowo-api` | `kudegowo-web` | - SchoolProfiles module ✅<br>- School CRUD endpoints ✅<br>- Registration form UI ✅ |
| **School Admin Portal** | `kudegowo-web` | `kudegowo-api` | - Admin dashboard<br>- School management UI ✅<br>- Multi-campus support |
| **Fee Categories Setup** | `kudegowo-api` | `kudegowo-web` | - FeeCategories module ✅<br>- Fee CRUD endpoints ✅<br>- Fee configuration UI ✅ |
| **School Wallet Configuration** | `kudegowo-api` | `kudegowo-web` | - Wallet balance tracking ✅<br>- Top-up endpoints<br>- Wallet UI ✅ |
| **Multi-Campus Management** | `kudegowo-api` | `kudegowo-web` | - Campus entity (new)<br>- Campus CRUD<br>- Campus selector UI |

---

### **Milestone: Tutors Onboarding**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **Tutor Registration** | `kudegowo-api` | `kudegowo-web` | - Tutors module (new)<br>- Tutor auth endpoints<br>- Registration UI |
| **Tutor Profile Management** | `kudegowo-api` | `kudegowo-web` | - Tutor service<br>- Profile CRUD<br>- Profile UI |
| **Class/Subject Assignment** | `kudegowo-api` | `kudegowo-web` | - Class-tutor mapping<br>- Assignment endpoints<br>- Assignment UI |
| **Homework Creation & Management** | `kudegowo-api` | `kudegowo-web`, `kudegowo-ai` | - Homework module<br>- CRUD endpoints<br>- AI-assisted creation<br>- Homework UI |
| **Grading & Feedback** | `kudegowo-api` | `kudegowo-web`, `kudegowo-ai` | - Grading endpoints<br>- AI-assisted grading<br>- Grading UI |

---

### **Milestone: Unified Family Financial Hub**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **Independent School Wallet Setup** | `kudegowo-api` | `kudegowo-web` | - SchoolProfiles module ✅<br>- Children module ✅<br>- Wallet endpoints ✅<br>- Dashboard UI ✅ |
| **Payment & Transaction Engine** | `kudegowo-api` | `kudegowo-worker`, `kudegowo-web` | - Payments module<br>- Transaction processing<br>- Paystack integration ✅<br>- Payment UI |
| **Multi-Payment Support** | `kudegowo-api` | `kudegowo-web` | - Multiple payment methods<br>- Card, bank transfer, USSD ✅<br>- Payment method UI |
| **Scheduled Payments** | `kudegowo-api` | `kudegowo-worker`, `kudegowo-web` | - ScheduledPayments module ✅<br>- Cron scheduler ✅<br>- Scheduled payments UI ✅ |
| **Family Dashboard** | `kudegowo-web` | `kudegowo-api`, `kudegowo-ai` | - Dashboard route ✅<br>- Overview widgets ✅<br>- AI insights integration |
| **Transaction History** | `kudegowo-api` | `kudegowo-web` | - Transactions module<br>- History endpoints<br>- Transaction list UI |
| **Balance Management** | `kudegowo-api` | `kudegowo-web` | - Balance tracking ✅<br>- Top-up endpoints<br>- Balance UI ✅ |
| **Auto-Topup** | `kudegowo-api` | `kudegowo-worker` | - Auto-topup rules<br>- Background job for auto-topup<br>- Configuration UI |

---

### **Milestone: Intelligent Family-School Bridge**

| Feature | Primary Repo | Supporting Repos | Components |
|---------|-------------|------------------|------------|
| **Real-time Notifications** | `kudegowo-worker` | `kudegowo-api`, `kudegowo-web` | - Notifications module ✅<br>- SMS/WhatsApp/Email workers<br>- Notification UI ✅ |
| **Attendance Tracking** | `kudegowo-api` | `kudegowo-web`, `kudegowo-mobile` | - Attendance module (new)<br>- Check-in/out endpoints<br>- Attendance UI<br>- Mobile check-in |
| **Parent-Teacher Messaging** | `kudegowo-api` | `kudegowo-web`, `kudegowo-worker` | - Messaging module (new)<br>- Chat endpoints<br>- Real-time chat UI<br>- Notification workers |
| **Homework & Scores Visibility** | `kudegowo-api` | `kudegowo-web`, `kudegowo-ai` | - Education module (new)<br>- Homework/scores endpoints<br>- Parent view UI<br>- AI homework help |
| **Safety & Emergency Alerts** | `kudegowo-api` | `kudegowo-worker`, `kudegowo-web`, `kudegowo-mobile` | - SafeSchool module (new)<br>- Alert endpoints<br>- Push notification workers<br>- Alert UI<br>- Mobile alerts |
| **Gate Access Control** | `kudegowo-api` | `kudegowo-mobile`, `kudegowo-worker` | - Gate access module<br>- QR/NFC endpoints<br>- Mobile scanner<br>- Access logs |

---

## **Repository Responsibility Matrix**

### **`kudegowo-web` (Frontend)**

**Technology:**
- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, Lucide React
- App Router (SSR + SPA)

**Owns UI for:**
- ✅ Dashboard (overview, schools, scheduled payments)
- ✅ Pitch deck (`/pitch`)
- ✅ Wireframes (`/wireframes`)
- ✅ Parent registration/login forms
- ✅ Child profile setup wizard
- ✅ School management UI
- ✅ Fee configuration UI
- Payment forms
- Transaction history
- ✅ Notifications center
- Messaging/chat interface
- Homework/scores viewer
- Attendance calendar
- Emergency alerts display
- Tutor dashboard
- Admin portal

**Key Routes:**
- `/` - Landing page
- `/pitch` - Investor pitch deck
- `/wireframes` - Feature demonstrations
- `/dashboard` - Parent dashboard
- `/dashboard/schools` - School management
- `/dashboard/schools/[id]` - School detail
- `/dashboard/scheduled-payments` - Scheduled payments
- `/login`, `/register` - Authentication

---

### **`kudegowo-api` (Backend)**

**Technology:**
- NestJS 11, TypeScript
- Mongoose 8 + MongoDB
- Passport JWT (15min access / 7d refresh)
- @nestjs/schedule for cron

**Owns business logic for:**
- ✅ **Auth Module**: JWT, registration, login, refresh tokens
- ✅ **Users Module**: Parent profiles, balance management
- ✅ **SchoolProfiles Module**: CRUD, stats, multi-campus
- ✅ **Children Module**: CRUD, transfer, deactivate, school validation
- ✅ **FeeCategories Module**: CRUD, recurrence rules
- ✅ **ScheduledPayments Module**: Scheduling, cron processing, retry logic
- ✅ **Notifications Module**: CRUD, unread count, TTL
- **Payments Module**: Paystack integration, transactions, webhooks
- **Tutors Module**: Registration, profiles, assignments (new)
- **Education Module**: Homework, scores, grading (new)
- **Attendance Module**: Check-in/out, tracking (new)
- **Messaging Module**: Parent-teacher chat (new)
- **SafeSchool Module**: Emergency alerts, gate access (new)

**Key Endpoints:**
- `/api/auth/*` - Authentication
- `/api/users/*` - User management
- `/api/school-profiles/*` - School profiles
- `/api/children/*` - Children management
- `/api/fee-categories/*` - Fee categories
- `/api/scheduled-payments/*` - Scheduled payments
- `/api/notifications/*` - Notifications
- `/api/payments/*` - Payment processing
- `/api/transactions/*` - Transaction history

---

### **`kudegowo-ai` (AI/ML Services)**

**Technology:**
- Python 3.11+, FastAPI
- LangChain / LlamaIndex
- OpenAI API / Anthropic Claude
- Vector DB (Pinecone, Weaviate, Qdrant)
- scikit-learn, pandas, numpy

**Owns AI features for:**
- **Financial Literacy Chatbot**: LangChain + Vector DB, conversational AI for kids
- **Smart Spending Insights**: ML pattern analysis, budget recommendations
- **Predictive Payment Analytics**: Time series forecasting, cash flow predictions
- **Fraud Detection**: Anomaly detection, risk scoring, automated alerts
- **AI-Assisted Homework Grading**: NLP-based grading, feedback generation
- **Personalized Learning Recommendations**: Adaptive learning paths
- **Budget Optimization**: ML-based suggestions
- **Natural Language Search**: Semantic search across transactions
- **Receipt OCR**: Document processing and categorization

**Key Endpoints:**
- `/ai/chat` - Chatbot conversations
- `/ai/insights` - Spending insights
- `/ai/predict` - Payment predictions
- `/ai/fraud/detect` - Fraud detection
- `/ai/homework/grade` - Homework grading
- `/ai/search` - Natural language search
- `/ai/ocr` - Receipt processing

**Architecture:**
```
kudegowo-ai/
├── src/
│   ├── chatbot/          # Financial literacy chatbot
│   ├── insights/         # ML-based analytics
│   ├── fraud/            # Fraud detection models
│   ├── nlp/              # NLP services (OCR, search)
│   ├── education/        # Homework grading, recommendations
│   └── models/           # Trained ML models
├── notebooks/            # Jupyter notebooks for experimentation
├── data/                 # Training data and datasets
├── tests/
├── requirements.txt
└── Dockerfile
```

---

### **`kudegowo-worker` (Background Jobs)**

**Technology:**
- Node.js + BullMQ or Python + Celery
- Redis (message broker)
- MongoDB (shared database)

**Owns async processing for:**
- ✅ **Payment Processing**: Retry with exponential backoff
- **SMS/WhatsApp/Email Notification Dispatch**: Multi-channel delivery
- **Report Generation**: PDF invoices, analytics reports
- **Data Export Jobs**: CSV/Excel exports
- **Daily Summaries**: Automated daily/weekly summaries
- **Scheduled Payment Execution**: Cron-based payment processing
- **Emergency Alert Broadcasting**: Mass notification dispatch
- **Model Training Jobs**: AI model retraining
- **Auto-Topup Processing**: Automatic balance top-ups
- **Stale Lock Recovery**: Payment lock cleanup

**Key Jobs:**
- `process-due-payments` - Every 15 minutes
- `recover-stale-locks` - Every 60 minutes
- `send-notifications` - On demand
- `generate-reports` - Scheduled
- `train-models` - Daily/weekly
- `send-daily-summary` - Daily at 6 PM

---

### **`kudegowo-mobile` (Mobile App)**

**Technology:**
- React Native or Flutter
- TypeScript (if React Native)
- Native modules for biometrics, push

**Owns mobile-specific features:**
- **QR Code Scanning**: Gate access, payment verification
- **NFC Check-in/out**: Attendance tracking
- **Push Notifications**: Real-time alerts
- **Biometric Authentication**: Fingerprint/Face ID
- **Mobile Wallet UI**: Optimized for mobile
- **Offline Mode**: Offline attendance tracking
- **Emergency Panic Button**: Quick emergency alerts
- **Location-based Features**: Geofencing for school zones
- **Camera Integration**: Receipt scanning, document upload

**Key Screens:**
- Login/Register
- Dashboard
- Wallet
- Payments
- Notifications
- QR Scanner
- Attendance
- Emergency

---

### **`kudegowo-shared` (Shared Library)**

**Technology:**
- TypeScript (npm package)
- Python (PyPI package)

**Owns shared contracts:**
- **TypeScript Package (`@kudegowo/shared`)**:
  - Enums (UserRole, FeeType, PaymentStatus, NotificationType, RecurrenceFrequency)
  - TypeScript interfaces/types
  - Validation schemas (Zod or class-validator)
  - Utility functions (date, currency, recurrence)
  - API response types
  - Error codes

- **Python Package (`kudegowo-shared`)**:
  - Pydantic models (matching TypeScript types)
  - Shared enums
  - Validation utilities
  - Common constants

**Published to:** GitHub Packages (private) or npm/PyPI  
**Versioning:** Semantic versioning (1.0.0, 1.1.0, etc.)

**Key Exports:**
```typescript
// TypeScript
export enum UserRole { PARENT, SCHOOL_ADMIN, TUTOR }
export enum FeeType { TUITION, MEALS, TRANSPORT, UNIFORM, BOOKS, TRIPS }
export enum PaymentStatus { PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED }
export interface PaginatedResponse<T> { ... }
export interface JwtPayload { ... }
```

```python
# Python
from kudegowo_shared import UserRole, FeeType, PaymentStatus
from kudegowo_shared.models import PaginatedResponse, JwtPayload
```

---

### **`kudegowo-infra` (Infrastructure)**

**Technology:**
- Terraform or Pulumi
- Docker Compose
- Kubernetes (optional)
- GitHub Actions

**Owns deployment/ops:**
- **Terraform Configs**: Cloud infrastructure (AWS/GCP/Azure)
- **CI/CD Pipelines**: GitHub Actions workflows
- **Docker Compose**: Local development environment
- **Kubernetes Manifests**: Container orchestration (if needed)
- **Monitoring Dashboards**: Sentry, Datadog configs
- **Database Migration Scripts**: MongoDB migrations
- **Environment Configs**: .env templates for all repos
- **Secrets Management**: Vault/AWS Secrets Manager

**Key Files:**
```
kudegowo-infra/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── .github/
│   └── workflows/
│       ├── deploy-web.yml
│       ├── deploy-api.yml
│       ├── deploy-ai.yml
│       └── deploy-worker.yml
├── docker-compose.yml
├── k8s/
│   ├── web-deployment.yaml
│   ├── api-deployment.yaml
│   └── ai-deployment.yaml
└── monitoring/
    ├── sentry.config.js
    └── datadog.yaml
```

---

## **Cross-Repository Feature Flow Examples**

### **Example 1: Parent Makes a Payment**
1. **`kudegowo-web`**: User clicks "Pay Now" → sends POST request
2. **`kudegowo-api`**: 
   - Validates balance
   - Calls Paystack API
   - Creates transaction record
   - Enqueues notification job
3. **`kudegowo-worker`**: Sends SMS/email confirmation
4. **`kudegowo-ai`**: Updates spending insights model (async)

---

### **Example 2: AI Chatbot Conversation**
1. **`kudegowo-web`**: User types message in chat UI
2. **`kudegowo-api`**: Proxies request to AI service
3. **`kudegowo-ai`**: 
   - Processes with LangChain
   - Queries vector DB for context
   - Generates response
4. **`kudegowo-api`**: Stores chat history in MongoDB
5. **`kudegowo-web`**: Displays AI response

---

### **Example 3: Emergency Alert**
1. **`kudegowo-api`**: School admin triggers emergency alert endpoint
2. **`kudegowo-worker`**: 
   - Queries all parents for affected school
   - Broadcasts SMS/WhatsApp/Push notifications
3. **`kudegowo-mobile`**: Displays push notification with sound/vibration
4. **`kudegowo-web`**: Shows alert banner on dashboard

---

### **Example 4: Scheduled Payment Processing**
1. **`kudegowo-api`**: Cron job runs every 15 minutes
2. **`kudegowo-api`**: 
   - Queries due payments
   - Processes with optimistic locking
   - Deducts balance
   - Updates payment status
3. **`kudegowo-worker`**: Sends payment confirmation notifications
4. **`kudegowo-ai`**: Updates payment prediction models

---

### **Example 5: Homework Submission & Grading**
1. **`kudegowo-web`**: Student submits homework
2. **`kudegowo-api`**: Stores submission, enqueues grading job
3. **`kudegowo-ai`**: 
   - Analyzes submission with NLP
   - Generates grade and feedback
   - Returns results
4. **`kudegowo-api`**: Updates homework record
5. **`kudegowo-worker`**: Notifies parent of graded homework
6. **`kudegowo-web`**: Parent views grade and feedback

---

## **Repository Communication Map**

```
┌─────────────────┐
│  kudegowo-web   │ (Frontend - Next.js)
└────────┬────────┘
         │ HTTPS REST + JWT
         ├──────────────────────┐
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│  kudegowo-api   │◄───│  kudegowo-ai    │ (AI Services - Python)
│  (Backend)      │    │  (ML/NLP)       │
└────────┬────────┘    └─────────────────┘
         │                      ▲
         │                      │ gRPC or REST
         ▼                      │
┌─────────────────┐    ┌────────┴────────┐
│ kudegowo-worker │◄───│  Redis Queue    │
│ (Background)    │    └─────────────────┘
└─────────────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │ (Shared Data)
└─────────────────┘

┌─────────────────┐
│ kudegowo-mobile │ (Mobile App)
└────────┬────────┘
         │ HTTPS REST + JWT
         └──────────────────────► kudegowo-api

All repos consume:
┌─────────────────┐
│ kudegowo-shared │ (npm + PyPI packages)
└─────────────────┘

All repos managed by:
┌─────────────────┐
│ kudegowo-infra  │ (Terraform + CI/CD)
└─────────────────┘
```

---

## **Summary: Feature Distribution**

| Repository | Feature Count | Status | Complexity |
|------------|---------------|--------|------------|
| `kudegowo-web` | ~20 UI features | Partial ✅ | Medium |
| `kudegowo-api` | ~25 backend features | Partial ✅ | High |
| `kudegowo-ai` | ~9 AI features | Not started | High |
| `kudegowo-worker` | ~10 background jobs | Partial ✅ | Medium |
| `kudegowo-mobile` | ~9 mobile features | Not started | Medium |
| `kudegowo-shared` | Shared contracts | Not started | Low |
| `kudegowo-infra` | DevOps/IaC | Partial ✅ | Medium |

**Legend:**
- ✅ = Implemented
- Partial ✅ = Partially implemented
- Not started = Planned but not implemented

---

## **Migration Strategy: Monorepo → Multi-Repo**

### **Phase 1: Extract Shared Package (Week 1-2)**
1. Create `kudegowo-shared` repo
2. Extract enums, types, interfaces from current codebase
3. Publish to GitHub Packages (private)
4. Update monorepo to consume shared package

### **Phase 2: Split Frontend (Week 3-4)**
1. Create `kudegowo-web` repo
2. Move `frontend/` directory
3. Install `@kudegowo/shared` dependency
4. Update CI/CD to deploy from new repo
5. Test end-to-end

### **Phase 3: Split Backend (Week 5-6)**
1. Create `kudegowo-api` repo
2. Move `backend-nestjs/` directory (deprecate Express)
3. Install `@kudegowo/shared` dependency
4. Update Railway deployment source
5. Test API endpoints

### **Phase 4: Extract AI Services (Week 7-8)**
1. Create `kudegowo-ai` repo
2. Build initial FastAPI service
3. Implement financial literacy chatbot
4. Deploy to AWS Lambda or Cloud Run
5. Integrate with `kudegowo-api`

### **Phase 5: Extract Workers (Week 9-10)**
1. Create `kudegowo-worker` repo
2. Move cron jobs and background tasks
3. Set up Redis message queue
4. Deploy to Railway or ECS
5. Test async job processing

### **Phase 6: Infrastructure as Code (Week 11-12)**
1. Create `kudegowo-infra` repo
2. Write Terraform configs for all services
3. Set up CI/CD pipelines for all repos
4. Configure monitoring and alerting
5. Document deployment process

### **Phase 7: Mobile App (Future)**
1. Create `kudegowo-mobile` repo
2. Build React Native or Flutter app
3. Integrate with `kudegowo-api`
4. Submit to App Store and Play Store

---

## **Next Steps**

1. **Immediate**: Continue building features in monorepo
2. **Q2 2026**: Start Phase 1 (extract shared package)
3. **Q3 2026**: Complete Phases 2-3 (split frontend and backend)
4. **Q4 2026**: Complete Phases 4-5 (AI services and workers)
5. **2027**: Mobile app development

---

**Last Updated:** March 14, 2026  
**Document Owner:** Engineering Team  
**Review Cycle:** Quarterly
