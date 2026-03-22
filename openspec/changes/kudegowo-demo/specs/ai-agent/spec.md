## ADDED Requirements

### Requirement: LangGraph orchestrator
The system SHALL use LangGraph to orchestrate multi-step conversational onboarding.

#### Scenario: State machine initialization
- **WHEN** user starts onboarding chat
- **THEN** LangGraph state machine initializes with "greet" node

#### Scenario: Node transitions
- **WHEN** user provides required information
- **THEN** state machine transitions to next appropriate node

### Requirement: Onboarding flow nodes
The system SHALL implement 9 onboarding nodes: greet, collect_role, collect_school, collect_children, collect_fees, confirm, create_records, payment_prompt, complete.

#### Scenario: Greet node
- **WHEN** conversation starts
- **THEN** agent welcomes user and explains platform capabilities

#### Scenario: Collect role node
- **WHEN** agent needs user role
- **THEN** agent asks if user is Parent, School Admin, or Tutor

#### Scenario: Collect school node
- **WHEN** user role is collected
- **THEN** agent asks for school name and searches existing schools

#### Scenario: Collect children node
- **WHEN** school is identified
- **THEN** agent asks for child names and classes

#### Scenario: Collect fees node
- **WHEN** children are added
- **THEN** agent presents fee categories to set up

#### Scenario: Confirm node
- **WHEN** all information is collected
- **THEN** agent summarizes and asks for confirmation

#### Scenario: Create records node
- **WHEN** user confirms
- **THEN** agent calls backend APIs to create entities

#### Scenario: Payment prompt node
- **WHEN** records are created
- **THEN** agent offers to initiate first payment

#### Scenario: Complete node
- **WHEN** onboarding is finished
- **THEN** agent provides success message and next steps

### Requirement: Tool execution
The system SHALL provide tools for the LLM to interact with backend.

#### Scenario: Get schools tool
- **WHEN** agent needs to search schools
- **THEN** agent calls get_schools tool with search query
- **AND** receives list of matching schools

#### Scenario: Create school profile tool
- **WHEN** user's school doesn't exist
- **THEN** agent calls create_school_profile tool
- **AND** receives created school profile

#### Scenario: Add child tool
- **WHEN** agent needs to add child
- **THEN** agent calls add_child tool with child details
- **AND** receives created child record

#### Scenario: Get fee categories tool
- **WHEN** agent needs to show fees
- **THEN** agent calls get_fee_categories tool
- **AND** receives list of fee categories for school

#### Scenario: Initiate payment tool
- **WHEN** user wants to make payment
- **THEN** agent calls initiate_payment tool
- **AND** receives payment URL

### Requirement: Conversation memory
The system SHALL maintain conversation context across messages.

#### Scenario: Context retention
- **WHEN** user sends multiple messages
- **THEN** agent remembers previous context
- **AND** responses are contextually appropriate

#### Scenario: Session persistence
- **WHEN** user refreshes page within session
- **THEN** conversation history is preserved

### Requirement: Mock LLM mode
The system SHALL support mock LLM mode for demos without API key.

#### Scenario: Mock mode activation
- **WHEN** MOCK_LLM=true environment variable is set
- **THEN** agent uses pre-scripted responses instead of LLM

#### Scenario: Mock conversation flow
- **WHEN** mock mode is active
- **THEN** agent follows scripted onboarding flow
- **AND** demo completes without LLM API calls

### Requirement: SSE streaming endpoint
The system SHALL stream responses via Server-Sent Events.

#### Scenario: SSE connection
- **WHEN** client connects to GET /chat/stream
- **THEN** SSE connection is established
- **AND** client receives streaming messages

#### Scenario: Token streaming
- **WHEN** LLM generates response
- **THEN** tokens are streamed as they are generated
- **AND** client can display progressive response

### Requirement: Error handling
The system SHALL gracefully handle errors during onboarding.

#### Scenario: LLM error
- **WHEN** LLM API call fails
- **THEN** agent responds with friendly error message
- **AND** offers to retry or continue manually

#### Scenario: Backend error
- **WHEN** backend API call fails
- **THEN** agent informs user of issue
- **AND** suggests alternative action
