"""
Entry point. Registers routers, configures CORS, mounts middleware.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import user_routes, product_routes

app = FastAPI(
    title= "The Product Manager - API",
    description= "REST APIs with JWT Auth, RBAC, and Cookies"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js dev server
    allow_credentials=True,                   # MUST be True for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# Including creater user, and product routes
app.include_router(user_routes.router)
app.include_router(product_routes.router)
