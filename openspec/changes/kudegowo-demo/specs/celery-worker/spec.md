## ADDED Requirements

### Requirement: Celery worker service
The system SHALL run a Celery worker for background task processing.

#### Scenario: Worker startup
- **WHEN** worker container starts
- **THEN** Celery worker connects to Redis broker
- **AND** worker is ready to process tasks

#### Scenario: Worker health check
- **WHEN** health check is performed
- **THEN** worker reports healthy status

### Requirement: Redis broker
The system SHALL use Redis as Celery message broker.

#### Scenario: Broker connection
- **WHEN** worker starts
- **THEN** connection to Redis is established

#### Scenario: Task queuing
- **WHEN** task is enqueued
- **THEN** task is stored in Redis queue

### Requirement: Payment processing task
The system SHALL process payments via background task.

#### Scenario: Process payment
- **WHEN** process_payment task is enqueued
- **THEN** payment is processed via mock Paystack
- **AND** result is stored

#### Scenario: Payment retry
- **WHEN** payment fails with retryable error
- **THEN** task is retried with exponential backoff

### Requirement: Notification dispatch task
The system SHALL dispatch notifications via background task.

#### Scenario: Send notification
- **WHEN** send_notification task is enqueued
- **THEN** notification is sent to specified channels

#### Scenario: Channel failure handling
- **WHEN** one channel fails
- **THEN** other channels still receive notification
- **AND** failure is logged

### Requirement: Scheduled payment processing task
The system SHALL process scheduled payments via Celery beat.

#### Scenario: Scheduled execution
- **WHEN** Celery beat triggers process_scheduled_payments
- **THEN** due payments are processed

#### Scenario: Replace node-cron
- **WHEN** Celery beat is running
- **THEN** node-cron scheduled payment job is disabled

### Requirement: Report generation task
The system SHALL generate reports via background task.

#### Scenario: Daily report
- **WHEN** generate_daily_report task runs
- **THEN** school admin receives daily summary report

### Requirement: Emergency broadcast task
The system SHALL broadcast emergency alerts via background task.

#### Scenario: Broadcast execution
- **WHEN** broadcast_emergency task is enqueued
- **THEN** alert is sent to all affected parents via all channels

#### Scenario: Delivery tracking
- **WHEN** broadcast completes
- **THEN** delivery status per parent is recorded

### Requirement: Task result backend
The system SHALL store task results in MongoDB.

#### Scenario: Result storage
- **WHEN** task completes
- **THEN** result is stored in MongoDB

#### Scenario: Result retrieval
- **WHEN** client queries task status
- **THEN** result is returned from MongoDB

### Requirement: Dead-letter queue
The system SHALL handle permanently failed tasks.

#### Scenario: Max retries exceeded
- **WHEN** task fails after max retries
- **THEN** task is moved to dead-letter queue

#### Scenario: DLQ monitoring
- **WHEN** admin views DLQ
- **THEN** failed tasks are listed with error details

### Requirement: Flower monitoring
The system SHALL provide Flower dashboard for task monitoring.

#### Scenario: Dashboard access
- **WHEN** admin accesses Flower dashboard
- **THEN** task statistics and worker status are displayed

#### Scenario: Task inspection
- **WHEN** admin views task details
- **THEN** task arguments, result, and timing are shown

### Requirement: Celery beat scheduler
The system SHALL run Celery beat for periodic tasks.

#### Scenario: Beat startup
- **WHEN** beat container starts
- **THEN** periodic task schedule is loaded

#### Scenario: Scheduled payment schedule
- **WHEN** beat is running
- **THEN** process_scheduled_payments runs every 15 minutes

#### Scenario: Stale lock recovery schedule
- **WHEN** beat is running
- **THEN** stale lock recovery runs every 60 minutes
