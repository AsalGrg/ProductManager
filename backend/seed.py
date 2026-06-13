"""
Run this ONCE before starting the server to populate CSV files.
  python seed.py

It creates:
  data/users.csv    — 3 hardcoded users (admin, editor, viewer)
  data/products.csv — 10 sample products
"""
import pandas as pd
import os
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
os.makedirs("data", exist_ok=True)

# ── Users ──────────────────────────────────────────────────────────────────────
users = [
    {
        "email":           "admin@example.com",
        "hashed_password": pwd_context.hash("admin123"),
        "role":            "admin",
        "full_name":       "Admin User",
    },
    {
        "email":           "editor@example.com",
        "hashed_password": pwd_context.hash("editor123"),
        "role":            "editor",
        "full_name":       "Editor User",
    },
    {
        "email":           "viewer@example.com",
        "hashed_password": pwd_context.hash("viewer123"),
        "role":            "viewer",
        "full_name":       "Viewer User",
    },
]
pd.DataFrame(users).to_csv("data/users.csv", index=False)
print("✓ data/users.csv created")

# ── Products ───────────────────────────────────────────────────────────────────
products = [
    {"id":1,  "name":"Wireless Headphones",    "description":"Noise-cancelling over-ear headphones", "price":129.99, "category":"Electronics", "status":"active"},
    {"id":2,  "name":"Mechanical Keyboard",    "description":"TKL layout with blue switches",        "price":89.99,  "category":"Electronics", "status":"active"},
    {"id":3,  "name":"Standing Desk",          "description":"Electric height-adjustable desk",      "price":499.00, "category":"Furniture",   "status":"active"},
    {"id":4,  "name":"Ergonomic Chair",        "description":"Lumbar support mesh chair",            "price":349.00, "category":"Furniture",   "status":"active"},
    {"id":5,  "name":"USB-C Hub",              "description":"7-in-1 multiport adapter",             "price":39.99,  "category":"Electronics", "status":"active"},
    {"id":6,  "name":"Notebook Set",           "description":"Pack of 3 dotted notebooks",           "price":19.99,  "category":"Stationery",  "status":"active"},
    {"id":7,  "name":"Monitor Light Bar",      "description":"USB-powered monitor mounted lamp",     "price":49.99,  "category":"Electronics", "status":"draft"},
    {"id":8,  "name":"Cable Management Kit",   "description":"Velcro straps and cable boxes",        "price":14.99,  "category":"Accessories", "status":"active"},
    {"id":9,  "name":"Webcam 4K",              "description":"4K autofocus webcam with mic",         "price":199.99, "category":"Electronics", "status":"inactive"},
    {"id":10, "name":"Desk Mat XL",            "description":"90x40cm extended mouse pad",           "price":29.99,  "category":"Accessories", "status":"active"},
]
pd.DataFrame(products).to_csv("data/products.csv", index=False)
print("✓ data/products.csv created")

print("\nCredentials:")
print("  admin@example.com  / admin123  → full access")
print("  editor@example.com / editor123 → read + update")
print("  viewer@example.com / viewer123 → read only")
