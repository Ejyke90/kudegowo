from celery import Celery
from celery.schedules import crontab
from src.config import get_settings

settings = get_settings()

# Initialize Sentry if DSN is provided
if settings.sentry_dsn:
    from src.instrument import init_sentry
    init_sentry()

app = Celery(
    "kudegowo_worker",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=[
        "src.tasks.payment",
        "src.tasks.notification",
        "src.tasks.scheduled",
        "src.tasks.reports",
    ],
)

app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Africa/Lagos",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,
    task_soft_time_limit=240,
    worker_prefetch_multiplier=1,
    task_acks_late=True,
    task_reject_on_worker_lost=True,
)

# Celery Beat schedule
app.conf.beat_schedule = {
    "process-scheduled-payments": {
        "task": "src.tasks.scheduled.process_scheduled_payments",
        "schedule": crontab(minute="*/15"),
    },
    "recover-stale-locks": {
        "task": "src.tasks.scheduled.recover_stale_locks",
        "schedule": crontab(minute="0"),
    },
    "generate-daily-reports": {
        "task": "src.tasks.reports.generate_daily_reports",
        "schedule": crontab(hour=6, minute=0),
    },
    "generate-daily-passphrases": {
        "task": "src.tasks.scheduled.generate_daily_passphrases",
        "schedule": crontab(hour=0, minute=0),
    },
}

if __name__ == "__main__":
    app.start()
