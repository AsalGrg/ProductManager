from fastapi import APIRouter, Depends, Query, status
from typing import Optional
from models.product import ProductCreate, ProductUpdate, ProductResponse
from models.user import UserPublic
from services import product_service
from middlewares.rbac import get_current_user, require_permission

router = APIRouter(prefix='/products', tags=['Products'])


# For getting all the products 
@router.get("/")
def list_products(
    search:    Optional[str] = Query(None, description="Search by product name"),
    category:  Optional[str] = Query(None, description="Filter by category"),
    status:    Optional[str] = Query(None, description="Filter by status"),
    page:      int           = Query(1,    ge=1, description="Page number"),
    page_size: int           = Query(10,   ge=1, le=100, description="Items per page"),
    _: UserPublic = Depends(require_permission("read")),  # Auth gate
):
    return product_service.get_all_product(search, category, status, page, page_size)


# get products by id
@router.get('/{product_id}', response_model= ProductResponse)
def get_product(
    product_id: int,
    _:UserPublic= Depends(require_permission('read')) 
):
    return product_service.get_product_by_id(product_id)


#for creating a new product. ADMIN ONLY
@router.post('/', response_model= ProductResponse, status_code= status.HTTP_201_CREATED)
def create_product(
    data:ProductCreate,
    _:UserPublic= Depends(require_permission('create')) #for admin only
):
    return product_service.create_product(data)

# for updating an existing product
@router.patch('/{product_id}', response_model=ProductResponse)
def update_product(
    product_id:int, 
    data: ProductUpdate,
    _:UserPublic=Depends(require_permission('update'))
):
    print('This is product id ', product_id)
    print('This is the data ', data)

    return product_service.update_product(product_id, data)

#for deleting a product
@router.delete('/{product_id}')
def delete_product(
    product_id: int,
    _:UserPublic= Depends(require_permission('delete'))
):
    return product_service.delete_product(product_id)
