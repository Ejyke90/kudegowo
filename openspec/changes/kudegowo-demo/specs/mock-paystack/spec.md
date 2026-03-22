## ADDED Requirements

### Requirement: Initialize transaction
The system SHALL simulate Paystack's initialize transaction endpoint.

#### Scenario: Successful initialization
- **WHEN** client calls POST /api/mock-paystack/transaction/initialize with valid amount and email
- **THEN** system returns authorization_url pointing to mock checkout page
- **AND** system returns unique reference

### Requirement: Verify transaction
The system SHALL simulate Paystack's verify transaction endpoint.

#### Scenario: Verify successful payment
- **WHEN** client calls GET /api/mock-paystack/transaction/verify/:reference
- **AND** test card `4084 0840 8408 4081` was used
- **THEN** system returns status "success" with transaction details

#### Scenario: Verify insufficient funds
- **WHEN** client calls GET /api/mock-paystack/transaction/verify/:reference
- **AND** test card `4084 0840 8408 4082` was used
- **THEN** system returns status "failed" with message "Insufficient funds"

#### Scenario: Verify declined card
- **WHEN** client calls GET /api/mock-paystack/transaction/verify/:reference
- **AND** test card `4084 0840 8408 4083` was used
- **THEN** system returns status "failed" with message "Card declined"

### Requirement: Charge authorization
The system SHALL simulate Paystack's charge authorization for recurring payments.

#### Scenario: Successful recurring charge
- **WHEN** client calls POST /api/mock-paystack/transaction/charge_authorization
- **AND** valid authorization_code is provided
- **THEN** system returns successful charge response

### Requirement: Mock checkout UI
The system SHALL provide a mock checkout page for simulating card entry.

#### Scenario: Checkout page display
- **WHEN** user is redirected to mock checkout URL
- **THEN** page displays amount, merchant name, and card input form

#### Scenario: Test card selection
- **WHEN** user enters a test card number
- **THEN** system processes based on card scenario (success/fail)
- **AND** user is redirected to callback URL with reference

### Requirement: Webhook simulation
The system SHALL simulate Paystack webhook events with configurable delay.

#### Scenario: Webhook delivery
- **WHEN** transaction is completed on mock checkout
- **THEN** system sends webhook to backend /api/webhooks/paystack
- **AND** webhook includes event type and transaction data

#### Scenario: Configurable delay
- **WHEN** MOCK_WEBHOOK_DELAY environment variable is set
- **THEN** webhook is sent after specified delay (0-5 seconds)

### Requirement: Webhook event types
The system SHALL support multiple webhook event types.

#### Scenario: Charge success event
- **WHEN** payment succeeds
- **THEN** webhook event type is "charge.success"

#### Scenario: Charge failed event
- **WHEN** payment fails
- **THEN** webhook event type is "charge.failed"

#### Scenario: Transfer success event
- **WHEN** transfer to school completes
- **THEN** webhook event type is "transfer.success"
