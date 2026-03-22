## ADDED Requirements

### Requirement: Daily passphrase generation
The system SHALL generate unique daily passphrases for each child.

#### Scenario: Automatic generation
- **WHEN** new day begins (midnight)
- **THEN** system generates 6-digit passphrase for each active child
- **AND** passphrase is valid for 24 hours

#### Scenario: Passphrase format
- **WHEN** passphrase is generated
- **THEN** passphrase is 6 numeric digits
- **AND** passphrase is unique per child per day

#### Scenario: Parent notification
- **WHEN** passphrase is generated
- **THEN** parent receives notification with child's passphrase

### Requirement: Passphrase display for parents
The system SHALL display current passphrase to parents.

#### Scenario: View passphrase
- **WHEN** parent navigates to Safe School dashboard
- **THEN** current passphrase for each child is displayed
- **AND** passphrase validity period is shown

### Requirement: Check-in with passphrase
The system SHALL record child check-in when valid passphrase is provided.

#### Scenario: Valid check-in
- **WHEN** gate staff enters valid passphrase
- **THEN** child is marked as checked in
- **AND** check-in time is recorded
- **AND** parent receives instant notification

#### Scenario: Invalid passphrase
- **WHEN** gate staff enters invalid passphrase
- **THEN** check-in is rejected
- **AND** unauthorized attempt is logged
- **AND** alert is generated

### Requirement: Check-out with passphrase
The system SHALL record child check-out when valid passphrase is provided.

#### Scenario: Valid check-out
- **WHEN** gate staff enters valid passphrase for checked-in child
- **THEN** child is marked as checked out
- **AND** check-out time is recorded
- **AND** parent receives instant notification

#### Scenario: Check-out without check-in
- **WHEN** check-out attempted for child not checked in
- **THEN** system warns but allows check-out
- **AND** incident is logged

### Requirement: Attendance tracking
The system SHALL maintain attendance records for each child.

#### Scenario: Daily attendance record
- **WHEN** child checks in and out
- **THEN** attendance record is created with date, check-in time, check-out time

#### Scenario: Attendance history
- **WHEN** parent views attendance history
- **THEN** system shows attendance records for selected date range

### Requirement: Gate access logging
The system SHALL log all gate access attempts.

#### Scenario: Access log entry
- **WHEN** passphrase is entered at gate
- **THEN** log entry is created with timestamp, passphrase, child, action, authorization status

#### Scenario: Access log viewing
- **WHEN** school admin views access logs
- **THEN** system shows paginated log entries with filters

### Requirement: Emergency alert creation
The system SHALL allow school admins to create emergency alerts.

#### Scenario: Create alert
- **WHEN** school admin creates emergency alert
- **THEN** alert is saved with type, severity, message
- **AND** alert is broadcast to all parents

#### Scenario: Alert types
- **WHEN** creating alert
- **THEN** admin can select type: security, weather, health, general

#### Scenario: Alert severity
- **WHEN** creating alert
- **THEN** admin can select severity: low, medium, high, critical

### Requirement: Emergency alert broadcast
The system SHALL broadcast emergency alerts via multiple channels.

#### Scenario: Multi-channel broadcast
- **WHEN** emergency alert is created
- **THEN** alert is sent via SMS, WhatsApp, Push, Email
- **AND** in-app notification is created

#### Scenario: Broadcast tracking
- **WHEN** alert is broadcast
- **THEN** system tracks delivery status per parent

### Requirement: Alert acknowledgment
The system SHALL track parent acknowledgment of emergency alerts.

#### Scenario: Acknowledge alert
- **WHEN** parent acknowledges alert
- **THEN** acknowledgment is recorded with timestamp

#### Scenario: Acknowledgment tracking
- **WHEN** school admin views alert
- **THEN** system shows acknowledgment count and list

### Requirement: Gate scanner interface
The system SHALL provide a gate scanner interface for schools.

#### Scenario: Scanner display
- **WHEN** gate staff accesses scanner page
- **THEN** passphrase input field is displayed
- **AND** recent scans are shown

#### Scenario: Scan result
- **WHEN** passphrase is scanned/entered
- **THEN** result shows child name, photo, and authorization status

### Requirement: Real-time attendance board
The system SHALL display real-time attendance status for schools.

#### Scenario: Attendance board
- **WHEN** school admin views attendance board
- **THEN** system shows list of children with current status (checked-in, checked-out, absent)

#### Scenario: Real-time updates
- **WHEN** child checks in/out
- **THEN** attendance board updates in real-time via SSE
