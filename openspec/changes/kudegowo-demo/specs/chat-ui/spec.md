## ADDED Requirements

### Requirement: Chat window component
The system SHALL provide a chat window component for onboarding conversations.

#### Scenario: Chat display
- **WHEN** user navigates to /onboarding
- **THEN** chat window is displayed with welcome message

#### Scenario: Message history
- **WHEN** conversation has multiple messages
- **THEN** all messages are displayed in chronological order
- **AND** user messages are right-aligned
- **AND** agent messages are left-aligned

### Requirement: Message bubbles
The system SHALL display messages in styled bubbles with sender indication.

#### Scenario: User message bubble
- **WHEN** user sends message
- **THEN** message appears in user-styled bubble (right side, distinct color)

#### Scenario: Agent message bubble
- **WHEN** agent responds
- **THEN** message appears in agent-styled bubble (left side, distinct color)

### Requirement: Streaming message display
The system SHALL display streaming messages progressively.

#### Scenario: Token-by-token display
- **WHEN** agent streams response
- **THEN** tokens appear progressively as received
- **AND** typing indicator shows during streaming

#### Scenario: Streaming completion
- **WHEN** streaming completes
- **THEN** typing indicator disappears
- **AND** message is finalized

### Requirement: Typing indicator
The system SHALL show typing indicator when agent is processing.

#### Scenario: Indicator display
- **WHEN** user sends message
- **THEN** typing indicator appears immediately
- **AND** indicator animates (e.g., bouncing dots)

#### Scenario: Indicator removal
- **WHEN** agent starts responding
- **THEN** typing indicator is replaced by streaming message

### Requirement: Quick action buttons
The system SHALL display contextual quick action buttons.

#### Scenario: Role selection buttons
- **WHEN** agent asks for user role
- **THEN** quick action buttons appear: "I'm a Parent", "I'm a School Admin", "I'm a Tutor"

#### Scenario: Confirmation buttons
- **WHEN** agent asks for confirmation
- **THEN** quick action buttons appear: "Yes, confirm", "No, make changes"

#### Scenario: Button interaction
- **WHEN** user clicks quick action button
- **THEN** button text is sent as user message
- **AND** buttons are disabled after selection

### Requirement: Rich message cards
The system SHALL display rich cards for structured data.

#### Scenario: School card
- **WHEN** agent presents school options
- **THEN** schools are displayed as cards with name, location, logo

#### Scenario: Fee card
- **WHEN** agent presents fee categories
- **THEN** fees are displayed as cards with name, amount, frequency

#### Scenario: Card selection
- **WHEN** user clicks a card
- **THEN** selection is sent to agent
- **AND** card shows selected state

### Requirement: Progress indicator
The system SHALL show onboarding progress.

#### Scenario: Progress display
- **WHEN** user is in onboarding flow
- **THEN** progress indicator shows current step (e.g., "Step 3 of 8")

#### Scenario: Progress update
- **WHEN** user completes a step
- **THEN** progress indicator updates to next step

### Requirement: Message input
The system SHALL provide text input for user messages.

#### Scenario: Text input
- **WHEN** user types in input field
- **THEN** text is captured

#### Scenario: Send on enter
- **WHEN** user presses Enter
- **THEN** message is sent
- **AND** input field is cleared

#### Scenario: Send button
- **WHEN** user clicks send button
- **THEN** message is sent
- **AND** input field is cleared

### Requirement: SSE connection management
The system SHALL manage SSE connection lifecycle.

#### Scenario: Connection establishment
- **WHEN** chat page loads
- **THEN** SSE connection is established to AI agent

#### Scenario: Reconnection
- **WHEN** SSE connection drops
- **THEN** client attempts reconnection with exponential backoff

#### Scenario: Connection cleanup
- **WHEN** user navigates away
- **THEN** SSE connection is closed cleanly
