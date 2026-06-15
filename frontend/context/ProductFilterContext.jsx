import { createContext, useEffect, useState } from "react";
import {getProductCategoriesService} from '@/services/product_service'

export const ProductFilterContext = createContext(null);

export function ProductFilterContextProvider({ children }) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('asc');
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage]= useState(1);
    const[pageSize, setPageSize]= useState(6);
    const[allCategories, setAllCategories] =useState([])


    async function getAllCategories() {
        try{
            const res = await getProductCategoriesService();
            setAllCategories(res)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
      getAllCategories();
    }, [])
    
    const value = {
        search,
        setSearch,
        products,
        setProducts,
        sortBy,
        setSortBy,
        status,
        setStatus,
        category,
        setCategory,
        page,
        setPage,
        pageSize,
        setPageSize,
        setAllCategories,
        allCategories
    };

    return <ProductFilterContext.Provider value={value}>{children}</ProductFilterContext.Provider>;
}