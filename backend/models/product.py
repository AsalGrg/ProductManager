from pydantic import BaseModel, field_validator
from typing import Optional
from enum import Enum

class ProductStatus(str, Enum):
    active= 'active'
    inactive= "inactive"
    draft= "draft"

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    status: ProductStatus

    @field_validator("price")
    @classmethod
    def price_must_be_positive(cls, v: float) -> float:
        if v < 0:
            raise ValueError("Price must be a positive number")
        return round(v, 2)

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Product name cannot be empty")
        return v.strip()
    


# For user Product create request
class ProductCreate(ProductBase):
    pass


# for user Product update request
class ProductUpdate(BaseModel):
    name: Optional[str]        = None
    description: Optional[str] = None
    price: Optional[float]     = None
    category: Optional[str]    = None
    status: Optional[ProductStatus] = None


# for get request of the product
class ProductResponse(ProductBase):
    id:int #it is added after id is auto-generated
