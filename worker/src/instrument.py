import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration
from src.config import get_settings


def init_sentry():
    settings = get_settings()
    if settings.sentry_dsn:
        sentry_sdk.init(
            dsn=settings.sentry_dsn,
            environment=settings.environment,
            integrations=[CeleryIntegration()],
            traces_sample_rate=1.0 if settings.environment == "development" else 0.1,
        )
