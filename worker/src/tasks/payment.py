import httpx
from celery import shared_task
from src.config import get_settings

settings = get_settings()


@shared_task(
    bind=True,
    autoretry_for=(httpx.HTTPError,),
    retry_backoff=True,
    retry_backoff_max=600,
    max_retries=5,
)
def process_payment(self, payment_id: str, amount: float, child_id: str, fee_type: str):
    """Process a payment through mock Paystack."""
    try:
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{settings.backend_url}/payments/process",
                json={
                    "paymentId": payment_id,
                    "amount": amount,
                    "childId": child_id,
                    "feeType": fee_type,
                },
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise self.retry(exc=e)


@shared_task(
    bind=True,
    autoretry_for=(httpx.HTTPError,),
    retry_backoff=True,
    max_retries=3,
)
def process_refund(self, payment_id: str, amount: float, reason: str = ""):
    """Process a refund."""
    try:
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{settings.backend_url}/payments/refund",
                json={
                    "paymentId": payment_id,
                    "amount": amount,
                    "reason": reason,
                },
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise self.retry(exc=e)


@shared_task(
    bind=True,
    autoretry_for=(httpx.HTTPError,),
    retry_backoff=True,
    max_retries=3,
)
def top_up_wallet(self, user_id: str, amount: float, reference: str):
    """Top up a user's wallet."""
    try:
        with httpx.Client(timeout=30.0) as client:
            response = client.post(
                f"{settings.backend_url}/wallets/top-up",
                json={
                    "userId": user_id,
                    "amount": amount,
                    "reference": reference,
                },
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise self.retry(exc=e)
