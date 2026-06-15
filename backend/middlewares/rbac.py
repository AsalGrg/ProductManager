from fastapi import Depends, Request, HTTPException, status
from models.user import UserPublic, has_permission, ROLES
from services.user_service import decode_token, get_user
from config import settings

# extract the token from the httpOnly cookie
def get_token_from_cookie(request: Request) -> str:
    token = request.cookies.get(settings.COOKIE_NAME)
    
    if not token:
        raise HTTPException(
            detail="Not authenticated. Please log in.",
            status_code= status.HTTP_401_UNAUTHORIZED
        )
    return token


# decode the token and return the current logged-in user
def get_current_user(token: str= Depends(get_token_from_cookie))-> UserPublic:
    token= decode_token(token)
    user= get_user(token.email)

    if user is None:
        raise HTTPException(status_code=401, detail= "User not found")
    
    return UserPublic(email=user.email, role= user.role, full_name= user.full_name, img=user.img)


def require_permission(action:str):
    
    def _check(current_user:UserPublic = Depends(get_current_user)) -> UserPublic:
        if not has_permission(current_user.role, action):
            raise HTTPException(
                status_code= status.HTTP_401_UNAUTHORIZED,
                detail=f"Your role {current_user.role} cannot perform {action}"
            )

        return current_user
    return _check
