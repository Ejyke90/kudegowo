import httpx
from celery import shared_task
from src.config import get_settings

settings = get_settings()


@shared_task
def process_scheduled_payments():
    """Process all due scheduled payments."""
    try:
        with httpx.Client(timeout=60.0) as client:
            response = client.post(
                f"{settings.backend_url}/scheduled-payments/process-due",
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        return {"status": "error", "message": str(e)}


@shared_task
def recover_stale_locks():
    """Recover stale payment locks."""
    try:
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{settings.backend_url}/scheduled-payments/recover-stale",
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        return {"status": "error", "message": str(e)}


@shared_task
def generate_daily_passphrases():
    """Generate daily passphrases for all active children."""
    try:
        with httpx.Client(timeout=60.0) as client:
            response = client.post(
                f"{settings.backend_url}/passphrases/generate-daily",
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        return {"status": "error", "message": str(e)}
