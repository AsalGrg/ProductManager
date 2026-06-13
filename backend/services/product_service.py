import pandas as pd
from models.product import ProductCreate, ProductUpdate, ProductResponse
from typing import Optional
from utils.csv_handler import read_csv, write_csv;
from config import settings
from fastapi import HTTPException

def _load()-> pd.DataFrame:
    df= read_csv(settings.PRODUCTS_CSV)
    
    if df.empty:
        return pd.DataFrame(columns=['id', 'name', 'description', 'price', 'category', 'status'])    
    return df

def _save(df:pd.DataFrame)-> None:
    write_csv(df, settings.PRODUCTS_CSV)


# get all the products available
def get_all_product(
    search: Optional[str]=None,
    category:  Optional[str]=None,
    status:  Optional[str]=None,
    page: int =1,
    page_size: int=10
)-> dict:
    
    df= _load()
    
    if search:
        df= df[df['name'].str.contains(search, case=False, na=False)]
    
    if category:
        df= df[df['category'].str.lower().equals(category.lower())]

    if status:
        df= df[df['status'].str.lower().equals(status.lower())]

    total = len(df)

    # This is for pagination
    start= (page-1)*page_size
    end= start+ page_size
    df = df.iloc[start:end]

    products= df.to_dict()

    return{
        'product': products,
        'total':total,
        'page': page,
        'page_size': page_size,
    }


def get_product_by_id(product_id: int)-> ProductResponse:
    df= _load()
    product = df[df["id"]==product_id]

    if product.empty:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse(**product.iloc[0].to_dict())


def create_product(data: ProductCreate) -> ProductResponse:
    df= _load()

    # Auto-increment ID
    new_id = int(df["id"].max()) + 1 if not df.empty else 1

    new_row= {'id':new_id, **data.model_dump()}

    df= pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    _save(df)

    return ProductResponse(**new_row)
 

def update_product(product_id:int, data:ProductUpdate)->ProductResponse:
    df= _load()

    # Only update fields that were actually sent (not None)
    updates = data.model_dump(exclude_none=True)
    print(updates.items())
    for key, value in updates.items():
        print(key)
        print(value)
        df.loc[df['id']==product_id, key]= value

    _save(df)
    updated_row = df[df['id']==product_id].iloc[0]
    updated_row.to_dict()
    return ProductResponse(**updated_row)


def delete_product(product_id: int) -> dict:
    df = _load()

    if df[df["id"] == product_id].empty:
        raise HTTPException(status_code=404, detail="Product not found")

    df = df[df["id"] != product_id]
    _save(df)
    return {"message": f"Product {product_id} deleted successfully"}


