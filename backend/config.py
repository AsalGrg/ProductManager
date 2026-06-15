
class Settings():
    # JWT settings
    SECRET_KEY: str = "super-secret-key-change-in-production-please"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # CSV file paths
    PRODUCTS_CSV: str = "data/products.csv"
    USERS_CSV: str = "data/users.csv"

    # Cookie settings
    COOKIE_NAME: str = "access_token"
    COOKIE_HTTPONLY: bool = True
    COOKIE_SAMESITE: str = "none"

    class Config:
        env_file = ".env"

# Single instance imported everywhere
settings = Settings()
