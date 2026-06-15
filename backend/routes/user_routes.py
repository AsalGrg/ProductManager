from fastapi import status, Depends, APIRouter, Response
from pydantic import BaseModel
from models.user import UserPublic
from middlewares.rbac import require_permission
from services.user_service import create_access_token, authenticate_user
from middlewares.rbac import get_current_user
from config import settings
router= APIRouter(prefix='/auth', tags=['Users'])




class LoginUser(BaseModel):
    email: str
    password: str


@router.post('/login')
def login_user(
    body: LoginUser,
    response: Response
):
    user = authenticate_user(body.email, body.password)

    token= create_access_token(user)
    
    response.set_cookie(
        key= settings.COOKIE_NAME,
        value= token,
        httponly= settings.COOKIE_HTTPONLY,
        secure= True,
        samesite= settings.COOKIE_SAMESITE,
        max_age= settings.ACCESS_TOKEN_EXPIRE_MINUTES*60
    )

    return{
        "message": "Login Successful",
        "user": UserPublic(
            email=user.email,
            role= user.role,
            full_name=user.full_name,
            img= user.img
        )
    }   


# for user logout
@router.post('/logout')
def logout_user(response: Response):
    response.delete_cookie(
        key= settings.COOKIE_NAME,
    )
    
    return{
        'message': 'Logged out successfully'
    }


# ── GET /auth/me ───────────────────────────────────────────────────────────────
@router.get("/me", response_model=UserPublic)
def me(current_user: UserPublic = Depends(get_current_user)):
    """
    Frontend calls this on every page load to restore session.
    If cookie is valid → returns user. If expired/missing → 401.
    """
    return current_user
