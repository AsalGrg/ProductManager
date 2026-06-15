import api from "../utils/axios";

export async function getProducts({
  search = null,
  category = null,
  status = null,
  page = 1,
  pageSize = 10,
  sortBy= 'asc'

} = {}) {
  const params = {};

  // Only add params that have a value — don't send null/empty
  if (search) params.search = search;
  if (category) params.category = category;
  if (status) params.status = status;
  if(sortBy) params.sortBy = sortBy
  console.log(params.status)

  params.page = page;
  params.page_size = pageSize;

  const res = await api.get("/products", { params });
  return res.data;
}


export async function updateProductService(productId, data) {
  console.log(productId)
  console.log(data)
    const res = await api.patch(`/products/${productId}`, data);
    return res.data;
}

export async function deleteProductService(productId) {
  console.log(productId)
    const res = await api.delete(`/products/${productId}`);
    return res.data;
}

export async function addProductService(data) {
  console.log(data)
    const res = await api.post(`/products`, data);
    return res.data;
}

export async function getProductCategoriesService() {
    const res = await api.get(`/products/categories`);
    return res.data;
}



