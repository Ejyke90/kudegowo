## ADDED Requirements

### Requirement: Notification dispatcher
The system SHALL provide a central dispatcher for sending notifications across multiple channels.

#### Scenario: Multi-channel dispatch
- **WHEN** notification is triggered with channels ["email", "sms", "push"]
- **THEN** dispatcher sends to all specified channels
- **AND** each channel delivery is tracked independently

### Requirement: Email notifications
The system SHALL send email notifications via Resend (free tier) or mock.

#### Scenario: Email delivery
- **WHEN** notification includes "email" channel
- **THEN** system sends email via Resend API
- **AND** delivery status is recorded

#### Scenario: Email mock mode
- **WHEN** MOCK_EMAIL=true environment variable is set
- **THEN** email is logged to console instead of sent

### Requirement: SMS notifications
The system SHALL send SMS notifications via Termii sandbox or mock.

#### Scenario: SMS delivery
- **WHEN** notification includes "sms" channel
- **THEN** system sends SMS via Termii sandbox API
- **AND** delivery status is recorded

#### Scenario: SMS mock mode
- **WHEN** MOCK_SMS=true environment variable is set
- **THEN** SMS is logged to console instead of sent

### Requirement: WhatsApp notifications
The system SHALL simulate WhatsApp Business API notifications.

#### Scenario: WhatsApp mock delivery
- **WHEN** notification includes "whatsapp" channel
- **THEN** system logs WhatsApp message to console
- **AND** simulates delivery confirmation

### Requirement: Push notifications
The system SHALL simulate FCM push notifications.

#### Scenario: Push mock delivery
- **WHEN** notification includes "push" channel
- **THEN** system logs push notification to console
- **AND** simulates delivery confirmation

### Requirement: In-app notifications
The system SHALL store notifications in database for in-app display.

#### Scenario: Notification storage
- **WHEN** any notification is sent
- **THEN** notification is stored in database
- **AND** notification is marked as unread

### Requirement: SSE real-time updates
The system SHALL push notifications to connected clients via SSE.

#### Scenario: Real-time delivery
- **WHEN** notification is created
- **AND** user has active SSE connection
- **THEN** notification is pushed immediately via SSE

### Requirement: Notification templates
The system SHALL use templates for consistent notification formatting.

#### Scenario: Payment confirmation template
- **WHEN** payment is completed
- **THEN** notification uses payment-confirmation template with amount, child name, fee type

#### Scenario: Payment reminder template
- **WHEN** payment reminder is triggered
- **THEN** notification uses payment-reminder template with due date, amount, child name

#### Scenario: Attendance alert template
- **WHEN** child checks in/out
- **THEN** notification uses attendance-alert template with child name, time, action

#### Scenario: Emergency alert template
- **WHEN** emergency alert is broadcast
- **THEN** notification uses emergency-alert template with severity, message, school name

### Requirement: Notification center
The system SHALL provide API endpoints for notification management.

#### Scenario: List notifications
- **WHEN** user calls GET /api/notifications
- **THEN** system returns paginated list of user's notifications

#### Scenario: Mark as read
- **WHEN** user calls PATCH /api/notifications/:id/read
- **THEN** notification is marked as read

#### Scenario: Unread count
- **WHEN** user calls GET /api/notifications/unread-count
- **THEN** system returns count of unread notifications
