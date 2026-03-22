import httpx
from celery import shared_task
from src.config import get_settings
from src.tasks.notification import send_notification

settings = get_settings()


@shared_task
def generate_daily_reports():
    """Generate and send daily reports to school admins."""
    try:
        with httpx.Client(timeout=60.0) as client:
            # Get all schools
            response = client.get(f"{settings.backend_url}/schools")
            response.raise_for_status()
            schools = response.json().get("data", [])
            
            results = []
            for school in schools:
                result = generate_school_report.delay(school["_id"])
                results.append({"schoolId": school["_id"], "taskId": result.id})
            
            return {"status": "reports_initiated", "schools": len(results)}
    except httpx.HTTPError as e:
        return {"status": "error", "message": str(e)}


@shared_task
def generate_school_report(school_id: str):
    """Generate daily report for a specific school."""
    try:
        with httpx.Client(timeout=30.0) as client:
            # Get school stats
            response = client.get(
                f"{settings.backend_url}/schools/{school_id}/daily-stats",
            )
            response.raise_for_status()
            stats = response.json()
            
            # Format report
            report = _format_daily_report(stats)
            
            # Get school admin
            school_response = client.get(f"{settings.backend_url}/schools/{school_id}")
            school_response.raise_for_status()
            school = school_response.json()
            
            # Send notification to admin
            if school.get("adminId"):
                send_notification.delay(
                    user_id=school["adminId"],
                    notification_type="daily_report",
                    title=f"📊 Daily Report - {school['name']}",
                    body=report,
                    channels=["email"],
                    data={"schoolId": school_id, "stats": stats},
                )
            
            return {"status": "report_sent", "schoolId": school_id}
    except httpx.HTTPError as e:
        return {"status": "error", "message": str(e)}


def _format_daily_report(stats: dict) -> str:
    """Format stats into a readable report."""
    return f"""
Daily Summary:
- Total Payments: ₦{stats.get('totalPayments', 0):,.2f}
- Successful Transactions: {stats.get('successfulTransactions', 0)}
- Failed Transactions: {stats.get('failedTransactions', 0)}
- Attendance Rate: {stats.get('attendanceRate', 0):.1f}%
- Meals Ordered: {stats.get('mealsOrdered', 0)}
"""
