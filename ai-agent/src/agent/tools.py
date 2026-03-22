from typing import Any
import httpx
from src.config import get_settings


class BackendTools:
    """Tools for interacting with the backend API."""
    
    def __init__(self, backend_url: str | None = None):
        settings = get_settings()
        self.backend_url = backend_url or settings.backend_url
        self.client = httpx.AsyncClient(timeout=30.0)
    
    async def get_schools(self, query: str = "", location: str = "") -> list[dict[str, Any]]:
        """Search for schools by name or location."""
        try:
            params = {}
            if query:
                params["search"] = query
            if location:
                params["location"] = location
            
            response = await self.client.get(
                f"{self.backend_url}/school-profiles",
                params=params,
            )
            response.raise_for_status()
            data = response.json()
            return data.get("data", data) if isinstance(data, dict) else data
        except Exception as e:
            return {"error": str(e)}
    
    async def create_school_profile(
        self,
        name: str,
        address: str,
        city: str,
        state: str,
        school_type: str = "private",
        **kwargs,
    ) -> dict[str, Any]:
        """Create a new school profile."""
        try:
            payload = {
                "name": name,
                "address": address,
                "city": city,
                "state": state,
                "schoolType": school_type,
                **kwargs,
            }
            response = await self.client.post(
                f"{self.backend_url}/school-profiles",
                json=payload,
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    async def add_child(
        self,
        school_id: str,
        first_name: str,
        last_name: str,
        class_name: str,
        date_of_birth: str | None = None,
        **kwargs,
    ) -> dict[str, Any]:
        """Add a child to a school."""
        try:
            payload = {
                "schoolId": school_id,
                "firstName": first_name,
                "lastName": last_name,
                "className": class_name,
                **kwargs,
            }
            if date_of_birth:
                payload["dateOfBirth"] = date_of_birth
            
            response = await self.client.post(
                f"{self.backend_url}/children",
                json=payload,
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    async def get_fee_categories(self, school_id: str) -> list[dict[str, Any]]:
        """Get fee categories for a school."""
        try:
            response = await self.client.get(
                f"{self.backend_url}/school-profiles/{school_id}/fees",
            )
            response.raise_for_status()
            data = response.json()
            return data.get("data", data) if isinstance(data, dict) else data
        except Exception as e:
            return {"error": str(e)}
    
    async def initiate_payment(
        self,
        child_id: str,
        fee_type: str,
        amount: float,
        **kwargs,
    ) -> dict[str, Any]:
        """Initiate a payment for a child's fee."""
        try:
            payload = {
                "childId": child_id,
                "feeType": fee_type,
                "amount": amount,
                **kwargs,
            }
            response = await self.client.post(
                f"{self.backend_url}/payments/initiate",
                json=payload,
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}
    
    async def close(self):
        await self.client.aclose()


# Tool definitions for LangGraph
TOOL_DEFINITIONS = [
    {
        "name": "get_schools",
        "description": "Search for schools by name or location",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "School name to search for"},
                "location": {"type": "string", "description": "City or state to filter by"},
            },
        },
    },
    {
        "name": "create_school_profile",
        "description": "Create a new school profile",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "School name"},
                "address": {"type": "string", "description": "School address"},
                "city": {"type": "string", "description": "City"},
                "state": {"type": "string", "description": "State"},
                "school_type": {"type": "string", "enum": ["public", "private"]},
            },
            "required": ["name", "address", "city", "state"],
        },
    },
    {
        "name": "add_child",
        "description": "Add a child to a school",
        "parameters": {
            "type": "object",
            "properties": {
                "school_id": {"type": "string", "description": "School ID"},
                "first_name": {"type": "string", "description": "Child's first name"},
                "last_name": {"type": "string", "description": "Child's last name"},
                "class_name": {"type": "string", "description": "Child's class/grade"},
            },
            "required": ["school_id", "first_name", "last_name", "class_name"],
        },
    },
    {
        "name": "get_fee_categories",
        "description": "Get available fee categories for a school",
        "parameters": {
            "type": "object",
            "properties": {
                "school_id": {"type": "string", "description": "School ID"},
            },
            "required": ["school_id"],
        },
    },
    {
        "name": "initiate_payment",
        "description": "Start a payment for a child's school fee",
        "parameters": {
            "type": "object",
            "properties": {
                "child_id": {"type": "string", "description": "Child ID"},
                "fee_type": {"type": "string", "description": "Type of fee"},
                "amount": {"type": "number", "description": "Amount in Naira"},
            },
            "required": ["child_id", "fee_type", "amount"],
        },
    },
]
