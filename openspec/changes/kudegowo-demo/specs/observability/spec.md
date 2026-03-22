## ADDED Requirements

### Requirement: Sentry error tracking
The system SHALL track errors across all services via Sentry.

#### Scenario: Frontend error capture
- **WHEN** JavaScript error occurs in frontend
- **THEN** error is captured and sent to Sentry
- **AND** error includes stack trace and user context

#### Scenario: Backend error capture
- **WHEN** unhandled exception occurs in backend
- **THEN** error is captured and sent to Sentry
- **AND** error includes request context

#### Scenario: AI agent error capture
- **WHEN** error occurs in AI agent service
- **THEN** error is captured and sent to Sentry

#### Scenario: Worker error capture
- **WHEN** task fails in Celery worker
- **THEN** error is captured and sent to Sentry

### Requirement: Sentry performance monitoring
The system SHALL track performance metrics via Sentry.

#### Scenario: Transaction tracing
- **WHEN** API request is processed
- **THEN** transaction is traced with timing

#### Scenario: Slow query detection
- **WHEN** database query exceeds threshold
- **THEN** slow query is flagged in Sentry

### Requirement: PostHog analytics
The system SHALL track user analytics via PostHog.

#### Scenario: Page view tracking
- **WHEN** user navigates to page
- **THEN** page view event is sent to PostHog

#### Scenario: Feature usage tracking
- **WHEN** user uses feature (e.g., makes payment, views attendance)
- **THEN** feature event is sent to PostHog

#### Scenario: User identification
- **WHEN** user logs in
- **THEN** user is identified in PostHog with properties

### Requirement: Funnel tracking
The system SHALL track conversion funnels.

#### Scenario: Onboarding funnel
- **WHEN** user progresses through onboarding
- **THEN** each step is tracked as funnel event

#### Scenario: Payment funnel
- **WHEN** user initiates payment
- **THEN** initiate → checkout → complete steps are tracked

### Requirement: Feature flags
The system SHALL support feature flags via PostHog.

#### Scenario: Flag evaluation
- **WHEN** feature flag is checked
- **THEN** PostHog returns flag value for user

#### Scenario: Gradual rollout
- **WHEN** feature is rolled out gradually
- **THEN** percentage of users see new feature

### Requirement: Environment separation
The system SHALL separate observability data by environment.

#### Scenario: Environment tagging
- **WHEN** event is sent to Sentry/PostHog
- **THEN** environment tag (development, staging, production) is included

#### Scenario: Demo environment
- **WHEN** running in demo mode
- **THEN** events are tagged as "demo" environment

### Requirement: User privacy
The system SHALL respect user privacy in analytics.

#### Scenario: PII scrubbing
- **WHEN** error is sent to Sentry
- **THEN** PII (passwords, tokens) is scrubbed

#### Scenario: Consent tracking
- **WHEN** user opts out of analytics
- **THEN** PostHog events are not sent

### Requirement: Dashboard access
The system SHALL provide access to observability dashboards.

#### Scenario: Sentry dashboard
- **WHEN** admin accesses Sentry
- **THEN** error trends and details are visible

#### Scenario: PostHog dashboard
- **WHEN** admin accesses PostHog
- **THEN** user analytics and funnels are visible
