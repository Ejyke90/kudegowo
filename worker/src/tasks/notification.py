import httpx
from celery import shared_task
from src.config import get_settings

settings = get_settings()


@shared_task(
    bind=True,
    autoretry_for=(httpx.HTTPError,),
    retry_backoff=True,
    max_retries=3,
)
def send_notification(
    self,
    user_id: str,
    notification_type: str,
    title: str,
    body: str,
    channels: list[str],
    data: dict | None = None,
):
    """Send notification via multiple channels."""
    results = {}
    
    for channel in channels:
        try:
            result = _send_to_channel(user_id, channel, title, body, data)
            results[channel] = {"status": "sent", "result": result}
        except Exception as e:
            results[channel] = {"status": "failed", "error": str(e)}
    
    # Store notification in database
    try:
        with httpx.Client(timeout=30.0) as client:
            client.post(
                f"{settings.backend_url}/notifications",
                json={
                    "userId": user_id,
                    "type": notification_type,
                    "title": title,
                    "body": body,
                    "data": data or {},
                    "channels": channels,
                    "deliveryResults": results,
                },
            )
    except Exception:
        pass
    
    return results


def _send_to_channel(user_id: str, channel: str, title: str, body: str, data: dict | None) -> dict:
    """Send to a specific channel."""
    if channel == "email":
        return _send_email(user_id, title, body, data)
    elif channel == "sms":
        return _send_sms(user_id, body)
    elif channel == "whatsapp":
        return _send_whatsapp(user_id, body)
    elif channel == "push":
        return _send_push(user_id, title, body, data)
    else:
        return {"status": "unknown_channel"}


def _send_email(user_id: str, title: str, body: str, data: dict | None) -> dict:
    """Send email notification (mock/Resend)."""
    print(f"[EMAIL] To: {user_id}, Subject: {title}, Body: {body}")
    return {"provider": "mock", "status": "sent"}


def _send_sms(user_id: str, body: str) -> dict:
    """Send SMS notification (mock/Termii)."""
    print(f"[SMS] To: {user_id}, Message: {body}")
    return {"provider": "mock", "status": "sent"}


def _send_whatsapp(user_id: str, body: str) -> dict:
    """Send WhatsApp notification (mock)."""
    print(f"[WHATSAPP] To: {user_id}, Message: {body}")
    return {"provider": "mock", "status": "sent"}


def _send_push(user_id: str, title: str, body: str, data: dict | None) -> dict:
    """Send push notification (mock/FCM)."""
    print(f"[PUSH] To: {user_id}, Title: {title}, Body: {body}")
    return {"provider": "mock", "status": "sent"}


@shared_task(bind=True, max_retries=3)
def broadcast_emergency(
    self,
    school_id: str,
    alert_type: str,
    severity: str,
    message: str,
):
    """Broadcast emergency alert to all parents of a school."""
    try:
        with httpx.Client(timeout=60.0) as client:
            # Get all parents for the school
            response = client.get(
                f"{settings.backend_url}/schools/{school_id}/parents",
            )
            response.raise_for_status()
            parents = response.json().get("data", [])
            
            # Send to all parents
            results = []
            for parent in parents:
                result = send_notification.delay(
                    user_id=parent["_id"],
                    notification_type="emergency_alert",
                    title=f"🚨 {severity.upper()}: {alert_type}",
                    body=message,
                    channels=["sms", "whatsapp", "push", "email"],
                    data={"schoolId": school_id, "alertType": alert_type, "severity": severity},
                )
                results.append({"parentId": parent["_id"], "taskId": result.id})
            
            return {"status": "broadcast_initiated", "recipients": len(results)}
    except httpx.HTTPError as e:
        raise self.retry(exc=e)
