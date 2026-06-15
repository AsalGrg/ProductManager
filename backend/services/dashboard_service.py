# services/dashboard_service.py

from services.product_service import _load
from services.user_service import get_all_users

def get_dashboard_data() -> dict:
    df = _load()

    if df.empty:
        return {
            "total_products":    0,
            "active_products":   0,
            "inactive_products": 0,
            'draft_products':0,
            "users":             [],
            "recent_products":   [],
        }

    # ── Counts
    total_products    = len(df)
    active_products   = len(df[df["status"].str.lower() == "active"])
    inactive_products = len(df[df["status"].str.lower() == "inactive"])
    draft_products = len(df[df["status"].str.lower() == "draft"])

    # ── Users (never expose hashed_password)
    users = get_all_users();

    # ── Recent products (last 5)
    recent_products = [
        dict(zip(df.columns, row))
        for row in df.tail(5).values
    ]

    return {
        "total_products":    total_products,
        "active_products":   active_products,
        "inactive_products": inactive_products,
        "draft_products": draft_products,
        "users":             users,
        "recent_products":   recent_products,
    }