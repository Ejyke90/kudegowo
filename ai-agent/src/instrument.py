import sentry_sdk
from src.config import get_settings


def init_sentry():
    settings = get_settings()
    if settings.sentry_dsn:
        sentry_sdk.init(
            dsn=settings.sentry_dsn,
            environment=settings.environment,
            traces_sample_rate=1.0 if settings.environment == "development" else 0.1,
            profiles_sample_rate=1.0 if settings.environment == "development" else 0.1,
        )
