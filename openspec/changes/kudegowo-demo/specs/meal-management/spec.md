## ADDED Requirements

### Requirement: Weekly menu management
The system SHALL allow schools to manage weekly menus.

#### Scenario: Create menu
- **WHEN** school admin creates weekly menu
- **THEN** menu is saved with week start date and daily items

#### Scenario: Menu items
- **WHEN** adding menu item
- **THEN** item includes name, description, price, allergens, availability

#### Scenario: View menu
- **WHEN** parent views menu
- **THEN** weekly menu is displayed in calendar format

### Requirement: Meal pre-ordering
The system SHALL allow parents to pre-order meals for children.

#### Scenario: Place order
- **WHEN** parent selects meals for the week
- **THEN** order is created with items, total amount, order date

#### Scenario: Order deadline
- **WHEN** parent attempts to order after deadline (e.g., 6 PM day before)
- **THEN** order is rejected with deadline message

#### Scenario: Order confirmation
- **WHEN** order is placed successfully
- **THEN** confirmation notification is sent
- **AND** wallet is charged

### Requirement: Dietary preferences
The system SHALL store and respect dietary preferences.

#### Scenario: Set preferences
- **WHEN** parent sets dietary preferences for child
- **THEN** allergies and restrictions are saved

#### Scenario: Allergen warnings
- **WHEN** parent views menu
- **THEN** items containing child's allergens are flagged

#### Scenario: Order validation
- **WHEN** parent orders item with child's allergen
- **THEN** warning is displayed requiring confirmation

### Requirement: Canteen QR payment
The system SHALL support QR code payment at canteen.

#### Scenario: Generate QR
- **WHEN** child needs to pay at canteen
- **THEN** QR code with child ID is displayed

#### Scenario: Scan and charge
- **WHEN** canteen staff scans QR and enters amount
- **THEN** child's wallet is charged
- **AND** transaction is recorded

#### Scenario: Insufficient balance
- **WHEN** wallet balance is insufficient
- **THEN** transaction is rejected
- **AND** staff is notified

### Requirement: Canteen POS interface
The system SHALL provide POS interface for canteen staff.

#### Scenario: POS display
- **WHEN** canteen staff accesses POS page
- **THEN** QR scanner and amount input are displayed

#### Scenario: Transaction processing
- **WHEN** staff scans QR and enters amount
- **THEN** child info is displayed for verification
- **AND** staff confirms transaction

#### Scenario: Transaction history
- **WHEN** staff views history
- **THEN** recent transactions are displayed

### Requirement: Order management
The system SHALL allow viewing and managing orders.

#### Scenario: View orders
- **WHEN** parent views orders
- **THEN** upcoming and past orders are displayed

#### Scenario: Cancel order
- **WHEN** parent cancels order before deadline
- **THEN** order is cancelled
- **AND** wallet is refunded

#### Scenario: Order status
- **WHEN** viewing order
- **THEN** status is shown: pending, confirmed, delivered, cancelled

### Requirement: Menu calendar view
The system SHALL display menu in visual calendar format.

#### Scenario: Calendar display
- **WHEN** parent views menu page
- **THEN** week calendar shows meals for each day

#### Scenario: Day selection
- **WHEN** parent clicks on a day
- **THEN** detailed menu for that day is shown

### Requirement: Real-time balance display
The system SHALL show wallet balance during ordering.

#### Scenario: Balance display
- **WHEN** parent is ordering meals
- **THEN** current wallet balance is displayed

#### Scenario: Insufficient balance warning
- **WHEN** order total exceeds balance
- **THEN** warning is displayed with top-up option
