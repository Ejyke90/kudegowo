# Core Platform Specs

## ADDED Requirements

### Requirement: [REQ-001] Public Landing Page
The system MUST provide a public landing page that showcases services and allows navigation to login.

#### Scenario: User visits home page
Given a user visits the root URL
When the page loads
Then they see the "Naija Eazy Pay" logo
And they see the "Services" section
And they see a "Login" button

### Requirement: [REQ-002] User Authentication
The system MUST allow parents to log in to access their dashboard.

#### Scenario: Successful Login
Given a parent is on the login page
When they enter valid credentials
And click "Sign in"
Then they are redirected to the dashboard

### Requirement: [REQ-003] Parent Dashboard
The system MUST provide a dashboard for parents to view payment items and balances.

#### Scenario: View Balances
Given a logged-in parent is on the dashboard
When the dashboard loads
Then they see a summary of their children's wallet balances
And they see a list of recent transactions
