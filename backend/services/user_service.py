from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from models.user import UserInDB, UserPublic, TokenData, ROLES
from utils.csv_handler import read_csv
from config import settings
from fastapi import HTTPException, status
from typing import List, Dict

pwd_context= CryptContext(schemes=['bcrypt'], deprecated= 'auto')

# password helpers
def verify_password(plain:str, hashed: str)-> bool:
    return pwd_context.verify(plain, hashed)

def hash_password(plain:str)-> str:
    return pwd_context.hash(plain)


# user authentication services
def get_user(email: str)-> UserInDB :
    df= read_csv(settings.USERS_CSV)

    if df.empty:
        return None
    
    row= df[df['email']== email]

    if row.empty:
        return None
    data= row.iloc[0].to_dict()
    return UserInDB(**data)


def authenticate_user(email: str, password: str) -> UserInDB:
    user= get_user(email)

    if not user:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail= "Incorrect user credentials"
        )
    
    if not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail= "Incorrect user credentials"
        )
    
    return user


# for creating a new access token
def create_access_token (user: UserInDB) -> str:
    expire= datetime.now(timezone.utc)+ timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload= {
        'email': user.email,
        'role': user.role,
        'exp': expire
    }

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_token(token: str) -> TokenData:
    """
    Decode and validate a JWT.
    Raises 401 if token is invalid or expired.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("email")
        role: str  = payload.get("role")
        if email is None or role is None:
            raise credentials_exception
        return TokenData(email=email, role=ROLES(role))
    except JWTError:
        raise credentials_exception
    
def get_all_users() -> List[Dict]:
    df = read_csv(settings.USERS_CSV)

    if df.empty:
        return []

    # Only expose safe fields
    safe_columns = ["email", "full_name", "role", "img"]

    # Keep only columns that actually exist in your CSV
    existing_columns = [col for col in safe_columns if col in df.columns]

    users_df = df[existing_columns].fillna("")

    return users_df.to_dict(orient="records")