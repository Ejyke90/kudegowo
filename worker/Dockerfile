FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY pyproject.toml ./

# Install dependencies
RUN pip install --no-cache-dir -e .

# Copy source code
COPY . .

# Start Celery worker
CMD ["celery", "-A", "src.celery_app", "worker", "--loglevel=info"]
