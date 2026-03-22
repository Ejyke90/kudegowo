## Why

KudEgOwo needs a production-grade client demo that showcases all pitch deck features—AI-assisted onboarding, Safe School, Financial Literacy, and complete payment flows. The current implementation has partial features but lacks the integrated demo experience needed for investor presentations and client pilots. This upgrade transforms the monorepo into a fully functional demo platform with mock integrations, seed data, and demo controls.

## What Changes

- **Docker Compose orchestration** for one-command startup (`docker-compose up`)
- **Comprehensive seed data** with 3 parents, 5 schools, 15 children, 50+ transactions
- **Mock Paystack integration** with test card scenarios (success, insufficient funds, declined)
- **Multi-channel notification system** (SMS, WhatsApp, Push, Email) with mock/sandbox providers
- **AI Agent Service** (FastAPI + LangGraph) for conversational onboarding
- **SSE streaming** for real-time chat and notifications
- **Safe School module** with attendance tracking, gate access passphrases, emergency alerts
- **Financial Literacy module** with KudiCoins rewards, savings goals, quizzes, leaderboards
- **Meal Management module** with weekly menus, pre-ordering, canteen POS
- **Celery background worker** replacing node-cron for robust task processing
- **Redis** for queue management and caching
- **Observability** via Sentry (errors) and PostHog (analytics)
- **Demo controls** for resetting state, triggering events, switching personas
- **Guided tour** for 30-minute demo presentations

## Capabilities

### New Capabilities
- `docker-infrastructure`: Docker Compose setup with MongoDB, Redis, and all services
- `seed-data`: Demo data generation with parents, schools, children, transactions
- `mock-paystack`: Simulated Paystack API with test card scenarios and webhook simulation
- `notification-service`: Multi-channel notification dispatcher (SMS, WhatsApp, Push, Email)
- `ai-agent`: LangGraph-based conversational AI for onboarding with SSE streaming
- `chat-ui`: Real-time chat interface with streaming messages and quick actions
- `safe-school`: Attendance tracking, gate access passphrases, emergency alerts
- `financial-literacy`: KudiCoins rewards, savings goals, quizzes, achievements, leaderboards
- `meal-management`: Weekly menus, meal pre-ordering, dietary preferences, canteen POS
- `celery-worker`: Background task processing with Celery and Redis
- `observability`: Sentry error tracking and PostHog analytics integration
- `demo-controls`: Admin panel for demo state management and event simulation

### Modified Capabilities
<!-- No existing specs to modify - specs directory is empty -->

## Impact

**Backend (Express.js)**:
- New models: Attendance, GateAccess, EmergencyAlert, Passphrase, KudiCoin, SavingsGoal, Quiz, Leaderboard, Achievement, Menu, MealOrder, DietaryPreference, CanteenTransaction
- New routes: attendance, gateAccess, emergencyAlerts, kudiCoins, savingsGoals, quizzes, leaderboard, menus, mealOrders, canteen, mockWebhook, demo
- New services: mockPaystack, notification dispatcher (sms, email, whatsapp, push)
- Replace node-cron with Celery task triggers

**Frontend (Next.js)**:
- New pages: onboarding chat, safe-school dashboard, financial-literacy hub, meal management, gate-scanner, canteen POS
- New components: ChatWindow, MessageBubble, TypingIndicator, QuickActions, DemoBanner, DemoControls, GuidedTour
- SSE integration for real-time updates

**New Services**:
- `ai-agent/` (FastAPI + LangGraph): Conversational AI service
- `worker/` (Celery): Background task processing

**Infrastructure**:
- Docker Compose with 5 services (frontend, backend, ai-agent, worker, redis) + MongoDB
- Redis for task queue and caching

**Dependencies**:
- Python: FastAPI, LangGraph, Celery, Redis, Sentry SDK, OpenAI/Anthropic
- Node.js: Resend (email), SSE support
