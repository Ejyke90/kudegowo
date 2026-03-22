## ADDED Requirements

### Requirement: Demo user accounts
The system SHALL create 4 demo user accounts with predefined credentials.

#### Scenario: Parent accounts
- **WHEN** seed script runs
- **THEN** parent account `ada.okonkwo@demo.com` with password `Demo123!` exists
- **AND** parent account `chidi.eze@demo.com` with password `Demo123!` exists

#### Scenario: School admin account
- **WHEN** seed script runs
- **THEN** school admin account `admin@greensprings.demo.com` with password `Demo123!` exists

#### Scenario: Tutor account
- **WHEN** seed script runs
- **THEN** tutor account `tutor@demo.com` with password `Demo123!` exists

### Requirement: Demo schools
The system SHALL create 5 demo schools across Nigerian cities.

#### Scenario: School creation
- **WHEN** seed script runs
- **THEN** schools exist in Lagos, Abuja, Port Harcourt, Ibadan, and Kano
- **AND** each school has complete profile information (name, address, contact, bank details)

### Requirement: Demo children
The system SHALL create 15 demo children distributed across schools.

#### Scenario: Children distribution
- **WHEN** seed script runs
- **THEN** 15 children exist across the 5 schools
- **AND** each child is linked to a parent account
- **AND** each child has class/grade information

### Requirement: Demo fee categories
The system SHALL create standard fee categories for each school.

#### Scenario: Fee category creation
- **WHEN** seed script runs
- **THEN** each school has fee categories: tuition, meals, transport, uniform, books, trips
- **AND** each fee has amount and payment schedule

### Requirement: Demo transactions
The system SHALL create 50+ sample transactions for demo purposes.

#### Scenario: Transaction variety
- **WHEN** seed script runs
- **THEN** transactions include completed, pending, and failed payments
- **AND** transactions span the last 6 months
- **AND** transactions cover various fee types

### Requirement: Demo scheduled payments
The system SHALL create scheduled payments in various states.

#### Scenario: Scheduled payment states
- **WHEN** seed script runs
- **THEN** scheduled payments exist with status: pending, completed, failed
- **AND** some payments are overdue for demo alerts

### Requirement: Idempotent seeding
The system SHALL support idempotent seeding that can be re-run safely.

#### Scenario: Re-run seed
- **WHEN** seed script runs multiple times
- **THEN** existing demo data is cleared and recreated
- **AND** no duplicate records are created
