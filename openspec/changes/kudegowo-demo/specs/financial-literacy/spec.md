## ADDED Requirements

### Requirement: KudiCoin balance management
The system SHALL maintain KudiCoin balance for each child.

#### Scenario: View balance
- **WHEN** parent or child views KudiCoin dashboard
- **THEN** current balance is displayed

#### Scenario: Balance persistence
- **WHEN** KudiCoins are earned or spent
- **THEN** balance is updated atomically

### Requirement: Earn KudiCoins
The system SHALL award KudiCoins for positive actions.

#### Scenario: Quiz completion reward
- **WHEN** child completes a quiz
- **THEN** KudiCoins are awarded based on score
- **AND** transaction is recorded with reason "quiz_completion"

#### Scenario: Savings milestone reward
- **WHEN** child reaches savings goal milestone (25%, 50%, 75%, 100%)
- **THEN** bonus KudiCoins are awarded
- **AND** transaction is recorded with reason "savings_milestone"

#### Scenario: Good behavior reward
- **WHEN** school admin awards behavior points
- **THEN** KudiCoins are credited
- **AND** transaction is recorded with reason "good_behavior"

### Requirement: KudiCoin transaction history
The system SHALL maintain transaction history for KudiCoins.

#### Scenario: View history
- **WHEN** user views KudiCoin history
- **THEN** system shows list of transactions with type, amount, reason, timestamp

### Requirement: Savings goals
The system SHALL allow children to create and track savings goals.

#### Scenario: Create goal
- **WHEN** child creates savings goal
- **THEN** goal is saved with name, target amount, target date

#### Scenario: View goal progress
- **WHEN** child views savings goal
- **THEN** current amount, target amount, and percentage are displayed

#### Scenario: Goal completion
- **WHEN** savings goal reaches target
- **THEN** celebration animation is triggered
- **AND** achievement is awarded

### Requirement: Auto-round-up savings
The system SHALL support automatic round-up from wallet transactions.

#### Scenario: Enable round-up
- **WHEN** parent enables auto-round-up for child
- **THEN** setting is saved

#### Scenario: Round-up execution
- **WHEN** wallet transaction occurs (e.g., ₦450 purchase)
- **AND** auto-round-up is enabled
- **THEN** difference to next ₦100 (₦50) is added to savings goal

### Requirement: Financial literacy quizzes
The system SHALL provide financial literacy quizzes for children.

#### Scenario: List quizzes
- **WHEN** child views quiz center
- **THEN** available quizzes are displayed with difficulty and reward

#### Scenario: Take quiz
- **WHEN** child starts quiz
- **THEN** questions are presented one at a time
- **AND** answers are recorded

#### Scenario: Quiz completion
- **WHEN** child completes quiz
- **THEN** score is calculated
- **AND** KudiCoins are awarded based on score

#### Scenario: Quiz attempt tracking
- **WHEN** child completes quiz
- **THEN** attempt is recorded with score and timestamp

### Requirement: Achievements and badges
The system SHALL award achievements for milestones.

#### Scenario: First savings achievement
- **WHEN** child makes first savings deposit
- **THEN** "First Saver" achievement is awarded

#### Scenario: Quiz master achievement
- **WHEN** child completes 10 quizzes with 80%+ score
- **THEN** "Quiz Master" achievement is awarded

#### Scenario: Goal achiever achievement
- **WHEN** child completes first savings goal
- **THEN** "Goal Achiever" achievement is awarded

#### Scenario: View achievements
- **WHEN** user views achievements page
- **THEN** earned badges are displayed with earn date
- **AND** locked badges show requirements

### Requirement: Class leaderboard
The system SHALL display class rankings based on KudiCoins.

#### Scenario: View leaderboard
- **WHEN** child views leaderboard
- **THEN** class rankings are displayed with position, name, KudiCoin count

#### Scenario: Privacy protection
- **WHEN** leaderboard is displayed
- **THEN** only first name and last initial are shown

#### Scenario: Leaderboard update
- **WHEN** KudiCoins are earned
- **THEN** leaderboard rankings are updated

### Requirement: Parent spending controls
The system SHALL allow parents to set spending rules for KudiCoins.

#### Scenario: Set daily limit
- **WHEN** parent sets daily spending limit
- **THEN** child cannot spend more than limit per day

#### Scenario: Approve redemptions
- **WHEN** parent enables redemption approval
- **THEN** child's redemption requests require parent approval

### Requirement: Gamified dashboard
The system SHALL provide a gamified dashboard for financial literacy.

#### Scenario: Dashboard display
- **WHEN** child views financial literacy hub
- **THEN** dashboard shows KudiCoin balance, savings progress, recent achievements, leaderboard position

#### Scenario: Progress animations
- **WHEN** progress is made (coins earned, savings increased)
- **THEN** celebratory animations are displayed
