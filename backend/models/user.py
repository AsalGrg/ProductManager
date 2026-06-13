from pydantic import BaseModel, field_validator
from typing import Optional
from enum import Enum

class ROLES(str, Enum):
    admin= "admin"
    editor= "editor"
    viewer= "viewer"

PERMISSIONS: dict[str, list[str]]= {
    ROLES.admin: ['create', 'read', 'update', 'delete'],
    ROLES.editor: ['read', 'update'],
    ROLES.viewer: ['read']
}

def has_permission(role: str, action: str)-> bool:
    return action in PERMISSIONS.get(role)

class UserInDB (BaseModel):
    email: str
    hashed_password: str
    role: ROLES
    full_name: str


# for client side, without password
class UserPublic(BaseModel):
    email: str
    role: ROLES
    full_name: str

# What we can get from JWT token
class TokenData(BaseModel):
    email:str
    role:ROLES
