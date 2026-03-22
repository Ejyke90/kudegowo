## ADDED Requirements

### Requirement: Demo banner
The system SHALL display a demo mode indicator when in demo mode.

#### Scenario: Banner display
- **WHEN** application is running in demo mode
- **THEN** banner is displayed at top of page indicating demo mode

#### Scenario: Banner dismissal
- **WHEN** user dismisses banner
- **THEN** banner is hidden for session

### Requirement: Database reset
The system SHALL allow resetting database to seed state.

#### Scenario: Reset trigger
- **WHEN** admin clicks "Reset Demo Data" in demo controls
- **THEN** database is cleared and re-seeded

#### Scenario: Reset confirmation
- **WHEN** reset is requested
- **THEN** confirmation dialog is shown before proceeding

#### Scenario: Reset completion
- **WHEN** reset completes
- **THEN** success notification is shown
- **AND** user is redirected to login

### Requirement: Event simulation
The system SHALL allow simulating various events.

#### Scenario: Simulate payment webhook
- **WHEN** admin triggers payment webhook simulation
- **THEN** webhook event is sent to backend
- **AND** payment status is updated

#### Scenario: Simulate check-in
- **WHEN** admin triggers check-in simulation
- **THEN** child is checked in
- **AND** parent notification is sent

#### Scenario: Simulate emergency alert
- **WHEN** admin triggers emergency alert simulation
- **THEN** alert is broadcast to all parents

### Requirement: Notification testing
The system SHALL allow sending test notifications.

#### Scenario: Send test notification
- **WHEN** admin sends test notification
- **THEN** notification is delivered to specified user via specified channel

#### Scenario: Channel selection
- **WHEN** sending test notification
- **THEN** admin can select channels: email, sms, push, in-app

### Requirement: Persona switching
The system SHALL allow switching between demo personas.

#### Scenario: Switch persona
- **WHEN** admin selects different persona from demo controls
- **THEN** session switches to selected user account

#### Scenario: Available personas
- **WHEN** viewing persona switcher
- **THEN** all demo accounts are listed: parents, school admin, tutor

### Requirement: Time manipulation
The system SHALL allow fast-forwarding time for scheduled payments.

#### Scenario: Fast-forward time
- **WHEN** admin fast-forwards time by N days
- **THEN** scheduled payments due within that period are processed

#### Scenario: Time display
- **WHEN** time is manipulated
- **THEN** current "demo time" is displayed in demo controls

### Requirement: Demo controls panel
The system SHALL provide an admin panel for demo controls.

#### Scenario: Panel access
- **WHEN** user with admin role clicks demo controls button
- **THEN** demo controls panel opens

#### Scenario: Panel contents
- **WHEN** panel is open
- **THEN** all demo control options are displayed: reset, simulate, test, switch, time

### Requirement: Guided tour
The system SHALL provide a guided tour of key features.

#### Scenario: Tour trigger
- **WHEN** new user logs in for first time
- **THEN** guided tour is offered

#### Scenario: Tour steps
- **WHEN** user starts tour
- **THEN** 15-step walkthrough highlights key features

#### Scenario: Tour skip
- **WHEN** user clicks "Skip Tour"
- **THEN** tour is dismissed
- **AND** preference is saved

#### Scenario: Tour restart
- **WHEN** user clicks "Restart Tour" in settings
- **THEN** guided tour starts from beginning

### Requirement: Demo script support
The system SHALL support the 30-minute demo script.

#### Scenario: Demo checkpoints
- **WHEN** demo presenter reaches checkpoint
- **THEN** system state matches expected state for that checkpoint

#### Scenario: Quick navigation
- **WHEN** presenter needs to jump to specific feature
- **THEN** demo controls provide quick navigation links

### Requirement: Demo mode detection
The system SHALL detect and indicate demo mode.

#### Scenario: Environment detection
- **WHEN** DEMO_MODE=true environment variable is set
- **THEN** application runs in demo mode

#### Scenario: Demo features enabled
- **WHEN** demo mode is active
- **THEN** demo controls are accessible
- **AND** mock services are used
