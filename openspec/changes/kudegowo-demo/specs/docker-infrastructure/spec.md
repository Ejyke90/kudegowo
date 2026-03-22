## ADDED Requirements

### Requirement: One-command startup
The system SHALL start all services with a single `docker-compose up` command.

#### Scenario: Fresh start
- **WHEN** user runs `docker-compose up` in the project root
- **THEN** all services (frontend, backend, ai-agent, worker, redis, mongodb) start successfully
- **AND** services are accessible at their designated ports

#### Scenario: Service health checks
- **WHEN** all containers are running
- **THEN** each service responds to health check endpoints within 30 seconds

### Requirement: Service orchestration
The system SHALL orchestrate 6 services via Docker Compose: frontend (Next.js :3000), backend (Express :5000), ai-agent (FastAPI :8000), worker (Celery), redis (:6379), mongodb (:27017).

#### Scenario: Service dependencies
- **WHEN** docker-compose starts
- **THEN** mongodb and redis start first
- **AND** backend waits for mongodb to be healthy
- **AND** ai-agent and worker wait for redis to be healthy
- **AND** frontend starts after backend is healthy

#### Scenario: Port mapping
- **WHEN** services are running
- **THEN** frontend is accessible at http://localhost:3000
- **AND** backend is accessible at http://localhost:5000
- **AND** ai-agent is accessible at http://localhost:8000

### Requirement: Environment configuration
The system SHALL use environment variables for service configuration with sensible defaults for development.

#### Scenario: Default configuration
- **WHEN** no .env file exists
- **THEN** services use default values from docker-compose.yml
- **AND** all services connect successfully

#### Scenario: Custom configuration
- **WHEN** user provides .env file with custom values
- **THEN** services use the custom configuration

### Requirement: Volume persistence
The system SHALL persist MongoDB data across container restarts using Docker volumes.

#### Scenario: Data persistence
- **WHEN** user stops and restarts containers
- **THEN** MongoDB data is preserved
- **AND** no seed data is lost

### Requirement: Development hot reload
The system SHALL support hot reload for frontend and backend during development.

#### Scenario: Frontend hot reload
- **WHEN** developer modifies frontend code
- **THEN** changes are reflected without container restart

#### Scenario: Backend hot reload
- **WHEN** developer modifies backend code
- **THEN** changes are reflected via nodemon without container restart
