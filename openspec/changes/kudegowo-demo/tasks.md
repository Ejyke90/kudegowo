## 1. Infrastructure Foundation

- [ ] 1.1 Create `docker-compose.yml` with all 6 services (frontend, backend, ai-agent, worker, redis, mongodb)
- [ ] 1.2 Create `backend/Dockerfile` with Node.js, nodemon for dev hot reload
- [ ] 1.3 Create `frontend/Dockerfile` with Next.js build and dev mode
- [ ] 1.4 Create `ai-agent/Dockerfile` with Python, FastAPI, uvicorn
- [ ] 1.5 Create `worker/Dockerfile` with Python, Celery
- [ ] 1.6 Update `.env.example` with all service configuration variables
- [ ] 1.7 Add health check endpoints to backend (`/api/health`) and ai-agent (`/health`)
- [ ] 1.8 Configure Docker volumes for MongoDB data persistence

## 2. Seed Data

- [ ] 2.1 Create `backend/scripts/seed.js` with idempotent seeding logic
- [ ] 2.2 Add demo user accounts (2 parents, 1 school admin, 1 tutor) with hashed passwords
- [ ] 2.3 Add 5 demo schools (Lagos, Abuja, Port Harcourt, Ibadan, Kano)
- [ ] 2.4 Add 15 demo children distributed across schools and linked to parents
- [ ] 2.5 Add fee categories (tuition, meals, transport, uniform, books, trips) per school
- [ ] 2.6 Add 50+ sample transactions (completed, pending, failed) spanning 6 months
- [ ] 2.7 Add scheduled payments in various states (pending, completed, failed, overdue)
- [ ] 2.8 Add npm script `seed` to package.json

## 3. Mock Paystack Service

- [ ] 3.1 Create `backend/services/mockPaystack.js` with in-memory transaction store
- [ ] 3.2 Implement `initializeTransaction` returning mock authorization URL
- [ ] 3.3 Implement `verifyTransaction` with test card scenario logic
- [ ] 3.4 Implement `chargeAuthorization` for recurring payments
- [ ] 3.5 Create `backend/routes/mockWebhook.js` with webhook simulation endpoints
- [ ] 3.6 Create `frontend/app/mock-payment/page.tsx` mock checkout UI
- [ ] 3.7 Add test card display and selection in mock checkout
- [ ] 3.8 Implement webhook delivery with configurable delay

## 4. Notification Service

- [ ] 4.1 Create `backend/services/notifications/index.js` dispatcher
- [ ] 4.2 Create `backend/services/notifications/email.js` with Resend integration
- [ ] 4.3 Create `backend/services/notifications/sms.js` with Termii sandbox/mock
- [ ] 4.4 Create `backend/services/notifications/whatsapp.js` mock handler
- [ ] 4.5 Create `backend/services/notifications/push.js` mock FCM handler
- [ ] 4.6 Create notification templates: payment-confirmation, payment-reminder, attendance-alert, emergency-alert
- [ ] 4.7 Create `backend/models/NotificationDelivery.js` for delivery tracking
- [ ] 4.8 Add SSE endpoint `GET /api/notifications/stream` for real-time updates
- [ ] 4.9 Update notification routes with unread count and mark-read endpoints

## 5. AI Agent Service - Core

- [ ] 5.1 Create `ai-agent/pyproject.toml` with FastAPI, LangGraph, OpenAI dependencies
- [ ] 5.2 Create `ai-agent/src/main.py` FastAPI app with CORS and health endpoint
- [ ] 5.3 Create `ai-agent/src/config.py` Pydantic settings for configuration
- [ ] 5.4 Create `ai-agent/src/agent/llm_client.py` with OpenAI/Anthropic adapter
- [ ] 5.5 Create `ai-agent/src/agent/memory.py` conversation buffer
- [ ] 5.6 Create `ai-agent/src/agent/tools.py` tool definitions (get_schools, create_school_profile, add_child, get_fee_categories, initiate_payment)
- [ ] 5.7 Create `ai-agent/src/agent/tool_executor.py` backend API caller

## 6. AI Agent Service - LangGraph

- [ ] 6.1 Create `ai-agent/src/agent/orchestrator.py` LangGraph state machine
- [ ] 6.2 Implement `greet` node - welcome message
- [ ] 6.3 Implement `collect_role` node - parent/admin/tutor selection
- [ ] 6.4 Implement `collect_school` node - school search and selection
- [ ] 6.5 Implement `collect_children` node - child name and class collection
- [ ] 6.6 Implement `collect_fees` node - fee category selection
- [ ] 6.7 Implement `confirm` node - summary and confirmation
- [ ] 6.8 Implement `create_records` node - backend API calls
- [ ] 6.9 Implement `payment_prompt` node - first payment offer
- [ ] 6.10 Implement `complete` node - success message
- [ ] 6.11 Add mock LLM mode with pre-scripted responses

## 7. AI Agent Service - SSE

- [ ] 7.1 Create `ai-agent/src/routers/chat.py` SSE streaming endpoint
- [ ] 7.2 Implement token-by-token streaming from LLM
- [ ] 7.3 Add session management for conversation persistence
- [ ] 7.4 Add error handling with friendly fallback messages

## 8. Chat UI

- [ ] 8.1 Create `frontend/app/onboarding/page.tsx` onboarding chat page
- [ ] 8.2 Create `frontend/app/onboarding/components/ChatWindow.tsx`
- [ ] 8.3 Create `frontend/app/onboarding/components/MessageBubble.tsx` with user/agent styling
- [ ] 8.4 Create `frontend/app/onboarding/components/TypingIndicator.tsx` animated dots
- [ ] 8.5 Create `frontend/app/onboarding/components/QuickActions.tsx` button group
- [ ] 8.6 Implement SSE connection with reconnection logic
- [ ] 8.7 Implement streaming message display
- [ ] 8.8 Add rich message cards for schools and fees
- [ ] 8.9 Add progress indicator showing current step

## 9. Safe School - Backend Models

- [ ] 9.1 Create `backend/models/Attendance.js` with check-in/out times
- [ ] 9.2 Create `backend/models/Passphrase.js` with daily codes
- [ ] 9.3 Create `backend/models/GateAccess.js` access logs
- [ ] 9.4 Create `backend/models/EmergencyAlert.js` with acknowledgments
- [ ] 9.5 Add indexes for efficient queries (childId+date, schoolId+date, code)

## 10. Safe School - Backend Routes

- [ ] 10.1 Create `backend/routes/attendance.js` CRUD endpoints
- [ ] 10.2 Create `backend/routes/passphrase.js` generation and validation
- [ ] 10.3 Create `backend/routes/gateAccess.js` logging and query
- [ ] 10.4 Create `backend/routes/emergencyAlerts.js` create, broadcast, acknowledge
- [ ] 10.5 Add passphrase generation cron job (midnight daily)
- [ ] 10.6 Integrate attendance events with notification service

## 11. Safe School - Frontend

- [ ] 11.1 Create `frontend/app/dashboard/safe-school/page.tsx` dashboard
- [ ] 11.2 Create `frontend/app/dashboard/safe-school/attendance/page.tsx` attendance view
- [ ] 11.3 Create `frontend/app/dashboard/safe-school/gate-access/page.tsx` access management
- [ ] 11.4 Create `frontend/app/dashboard/safe-school/emergency/page.tsx` alert management
- [ ] 11.5 Create `frontend/app/gate-scanner/page.tsx` school gate interface
- [ ] 11.6 Add passphrase display component for parents
- [ ] 11.7 Add real-time attendance board with SSE updates
- [ ] 11.8 Add emergency alert creation wizard

## 12. Financial Literacy - Backend Models

- [ ] 12.1 Create `backend/models/KudiCoin.js` with balance and transactions
- [ ] 12.2 Create `backend/models/SavingsGoal.js` with progress tracking
- [ ] 12.3 Create `backend/models/Quiz.js` with questions and rewards
- [ ] 12.4 Create `backend/models/QuizAttempt.js` attempt tracking
- [ ] 12.5 Create `backend/models/Achievement.js` badges and milestones
- [ ] 12.6 Add indexes for leaderboard queries

## 13. Financial Literacy - Backend Routes

- [ ] 13.1 Create `backend/routes/kudiCoins.js` balance, earn, spend, history
- [ ] 13.2 Create `backend/routes/savingsGoals.js` CRUD and progress
- [ ] 13.3 Create `backend/routes/quizzes.js` list, take, complete
- [ ] 13.4 Create `backend/routes/leaderboard.js` class rankings
- [ ] 13.5 Create `backend/routes/achievements.js` list and award
- [ ] 13.6 Implement auto-round-up logic in wallet transactions
- [ ] 13.7 Add quiz seed data with financial literacy questions

## 14. Financial Literacy - Frontend

- [ ] 14.1 Create `frontend/app/dashboard/financial-literacy/page.tsx` hub
- [ ] 14.2 Create `frontend/app/dashboard/financial-literacy/kudicoins/page.tsx` dashboard
- [ ] 14.3 Create `frontend/app/dashboard/financial-literacy/savings/page.tsx` goals
- [ ] 14.4 Create `frontend/app/dashboard/financial-literacy/quizzes/page.tsx` quiz center
- [ ] 14.5 Create `frontend/app/dashboard/financial-literacy/leaderboard/page.tsx` rankings
- [ ] 14.6 Add gamified progress bars and animations
- [ ] 14.7 Add achievement badges display
- [ ] 14.8 Add quiz interface with question flow

## 15. Meal Management - Backend Models

- [ ] 15.1 Create `backend/models/Menu.js` weekly menus with items
- [ ] 15.2 Create `backend/models/MealOrder.js` pre-orders
- [ ] 15.3 Create `backend/models/DietaryPreference.js` allergies and restrictions
- [ ] 15.4 Create `backend/models/CanteenTransaction.js` POS transactions
- [ ] 15.5 Add indexes for menu and order queries

## 16. Meal Management - Backend Routes

- [ ] 16.1 Create `backend/routes/menus.js` CRUD for weekly menus
- [ ] 16.2 Create `backend/routes/mealOrders.js` pre-order management
- [ ] 16.3 Create `backend/routes/dietaryPreferences.js` preference management
- [ ] 16.4 Create `backend/routes/canteen.js` POS endpoints
- [ ] 16.5 Add order deadline validation
- [ ] 16.6 Add allergen warning logic
- [ ] 16.7 Add menu seed data

## 17. Meal Management - Frontend

- [ ] 17.1 Create `frontend/app/dashboard/meals/page.tsx` hub
- [ ] 17.2 Create `frontend/app/dashboard/meals/menu/page.tsx` weekly calendar
- [ ] 17.3 Create `frontend/app/dashboard/meals/orders/page.tsx` pre-order interface
- [ ] 17.4 Create `frontend/app/dashboard/meals/preferences/page.tsx` dietary settings
- [ ] 17.5 Create `frontend/app/canteen/page.tsx` POS scanner interface
- [ ] 17.6 Add visual menu calendar component
- [ ] 17.7 Add allergen warning display

## 18. Celery Worker Service

- [ ] 18.1 Create `worker/pyproject.toml` with Celery, Redis dependencies
- [ ] 18.2 Create `worker/src/celery_app.py` Celery configuration
- [ ] 18.3 Create `worker/src/config.py` settings
- [ ] 18.4 Create `worker/src/tasks/payment.py` payment processing task
- [ ] 18.5 Create `worker/src/tasks/notification.py` multi-channel dispatch task
- [ ] 18.6 Create `worker/src/tasks/scheduled.py` scheduled payment processing
- [ ] 18.7 Create `worker/src/tasks/reports.py` daily report generation
- [ ] 18.8 Configure Celery beat schedule for periodic tasks
- [ ] 18.9 Configure MongoDB result backend
- [ ] 18.10 Add dead-letter queue handling
- [ ] 18.11 Add Flower to docker-compose for monitoring

## 19. Observability

- [ ] 19.1 Create `frontend/sentry.client.config.ts` frontend Sentry
- [ ] 19.2 Create `frontend/sentry.server.config.ts` server Sentry
- [ ] 19.3 Create `backend/middleware/sentry.js` backend Sentry
- [ ] 19.4 Create `ai-agent/src/instrument.py` AI agent Sentry
- [ ] 19.5 Create `worker/src/instrument.py` worker Sentry
- [ ] 19.6 Create `frontend/lib/posthog.ts` PostHog client
- [ ] 19.7 Create `backend/services/posthog.js` backend PostHog
- [ ] 19.8 Add page view and feature usage tracking
- [ ] 19.9 Add onboarding and payment funnel events
- [ ] 19.10 Configure environment separation (dev/staging/prod/demo)

## 20. Demo Controls

- [ ] 20.1 Create `frontend/components/DemoBanner.tsx` demo mode indicator
- [ ] 20.2 Create `frontend/components/DemoControls.tsx` admin panel
- [ ] 20.3 Create `frontend/components/GuidedTour.tsx` with Intro.js
- [ ] 20.4 Create `backend/routes/demo.js` demo control endpoints
- [ ] 20.5 Implement database reset endpoint
- [ ] 20.6 Implement event simulation endpoints (webhook, check-in, alert)
- [ ] 20.7 Implement test notification endpoint
- [ ] 20.8 Implement persona switching
- [ ] 20.9 Implement time fast-forward for scheduled payments
- [ ] 20.10 Create 15-step guided tour configuration

## 21. Documentation

- [ ] 21.1 Create `DEMO_SCRIPT.md` 30-minute presentation guide
- [ ] 21.2 Create `TESTING_CHECKLIST.md` QA checklist
- [ ] 21.3 Update `README.md` with setup instructions and architecture
- [ ] 21.4 Document demo credentials and test scenarios
- [ ] 21.5 Document API endpoints for each module

## 22. Integration Testing

- [ ] 22.1 Test one-command startup with `docker-compose up`
- [ ] 22.2 Test AI onboarding end-to-end flow
- [ ] 22.3 Test payment flow with mock Paystack
- [ ] 22.4 Test Safe School attendance and alerts
- [ ] 22.5 Test Financial Literacy quizzes and rewards
- [ ] 22.6 Test Meal pre-ordering and canteen POS
- [ ] 22.7 Test demo reset and persona switching
- [ ] 22.8 Test 30-minute demo script execution
