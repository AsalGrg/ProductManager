# routers/dashboard.py

from fastapi import APIRouter, Depends
from middlewares.rbac import require_permission
from services import dashboard_service

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard(
    _=Depends(require_permission("read"))
):
    return dashboard_service.get_dashboard_data()