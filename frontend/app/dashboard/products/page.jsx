'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../../../components/products/ProductCard'
import { openModal, closeModal } from '../../../utils/ModelOpenedToggler'
import { getProducts } from '../../../services/product_service'
import useProductFilter from '../../../hooks/useProductFilter'
import { toast, ToastContainer } from 'react-toastify'
import AddProductModel from '../../../components/products/AddProductModel'
import Pagination from '../../../components/Pagination'

const page = () => {

    const [isFilterOpen, setisFilterOpen] = useState(false)
    const {
        search, category, status, setStatus,
        page, pageSize, products, setProducts,
        sortBy, setPage, setSortBy, setCategory, allCategories
    } = useProductFilter();

    const [totalPage, settotalPage] = useState(1)
    const[totalProducts, setTotalProducts]= useState(0)


    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

    useEffect(() => {
        if (isAddProductModalOpen) { openModal() } else { closeModal() }
    }, [isAddProductModalOpen])

    async function getAllProducts() {
        try {
            const res = await getProducts({ search, category, status, page, pageSize, sortBy })
            if (res) {
                setProducts(res.product)
                settotalPage(Math.ceil(res.total / pageSize))
                setTotalProducts(res.total)
            }
        } catch (e) {
            toast.error(e.response?.data?.detail || "Something Went Wrong")
        }
    }

    useEffect(() => {
        console.log("gettingAllProducts")
        getAllProducts();
    }, [search, category, sortBy, status, page, pageSize])

    function handlePageChange(newPage) {
        if (newPage < 1 || newPage > totalPage) return
        setPage(newPage)
    }

    return (
        <div className='min-h-full rounded-2xl space-y-4 flex flex-col overflow-hidden
                        bg-warm-white'>

            {/* ── HEADER ── */}
            <div className='flex items-center justify-between p-4
                            border-b border-[#e2ddd6] dark:border-[#2e2e2e]
                            flex-wrap space-y-4'>
                <div>
                    <h2 className='dark:text-[#f0ece4]'>
                        Products ({totalProducts})
                    </h2>
                    <p className='text-txt-imp-2 dark:text-[#a09a91] text-sm'>
                        Manage your product catalogue
                    </p>
                </div>

                <div className='flex gap-4 items-center flex-wrap space-y-1'>

                    {/* Sort */}
                    <div className='flex items-center gap-2'>
                        <label className='text-sm text-txt-imp-2 dark:text-[#a09a91]'>
                            Sort:
                        </label>
                        <select
                            className='text-sm focus:outline-0 rounded-lg px-2 py-1.5
                                       border border-[#e2ddd6] dark:border-[#3d3d3d]
                                       bg-white dark:bg-[#2a2a2a]
                                       text-txt-imp-1 dark:text-[#f0ece4]'
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="desc">Price: High → Low</option>
                            <option value="asc">Price: Low → High</option>
                        </select>
                    </div>

                    {/* Filter toggle */}
                    <button
                        onClick={() => setisFilterOpen(prev => !prev)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm
                                    transition-all cursor-pointer
                                    relative
                                    ${isFilterOpen
                                        ? 'bg-primary-green text-white border-primary-green'
                                        : 'border-[#e2ddd6] dark:border-[#3d3d3d] text-txt-imp-2 dark:text-[#a09a91] hover:bg-[#f7f5f2] dark:hover:bg-[#2a2a2a]'
                                    }`}
                    >
                        <SlidersHorizontal width={15} height={15} />
                        Filters
                    </button>

                    {/* Add product */}
                    <div onClick={() => setIsAddProductModalOpen(prev => !prev)}>
                        <Button text={'Add Product'} />
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className='flex flex-1 gap-4 p-4 items-start'>

                {/* Products grid */}
                <div className='flex-1'>
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
                        {products.map(each => (
                            <ProductCard key={each.id} product={each} />
                        ))}
                    </div>

                    {/* Empty state */}
                    {products.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-20 gap-3'>
                            <p className='text-txt-imp-2 dark:text-[#a09a91]'>
                                No products found
                            </p>
                            <button
                                onClick={() => { setStatus(''); setCategory('') }}
                                className='text-sm text-primary-green underline cursor-pointer'
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className='flex items-center justify-center mt-8'>
                        <Pagination
                            page={page}
                            totalPages={totalPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>

                {/* ── FILTER PANEL ── */}
                {isFilterOpen && (
                    <div className='min-w-56 rounded-2xl p-4 space-y-6 flex-shrink-0
                                    bg-white dark:bg-[#1c1c1c]
                                    border border-[#e2ddd6] dark:border-[#2e2e2e]
                                    md:static
                                    absolute
                                    top-0
                                    translate-y-[62%]
                                    md:translate-0
                                    right-0
                                    '>

                        {/* Filter header */}
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold text-sm dark:text-[#f0ece4]'>
                                Filters
                            </p>
                            <button
                                onClick={() => setisFilterOpen(false)}
                                className='text-txt-imp-2 dark:text-[#a09a91] hover:text-txt-imp-1 cursor-pointer'
                            >
                                <X width={16} height={16} />
                            </button>
                        </div>

                        {/* Status filter */}
                        <div className='space-y-3'>
                            <p className='text-xs font-semibold uppercase tracking-wider
                                          text-txt-imp-3 dark:text-[#6b6560]'>
                                Status
                            </p>
                            {['active', 'inactive', 'draft'].map(s => (
                                <label key={s}
                                    className='flex items-center gap-2 cursor-pointer
                                               text-sm text-txt-imp-1 dark:text-[#f0ece4]'>
                                    <input
                                        type="radio"
                                        value={s}
                                        checked={status === s}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className='accent-primary-green'
                                    />
                                    <span className='capitalize'>{s}</span>
                                </label>
                            ))}
                            {/* Clear status */}
                            {status && (
                                <button
                                    onClick={() => setStatus('')}
                                    className='text-xs text-primary-green underline cursor-pointer'
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Category filter */}
                        <div className='space-y-3'>
                            <p className='text-xs font-semibold uppercase tracking-wider
                                          text-txt-imp-3 dark:text-[#6b6560]'>
                                Category
                            </p>
                            {allCategories.map(each => (
                                <label key={each}
                                    className='flex items-center gap-2 cursor-pointer
                                               text-sm text-txt-imp-1 dark:text-[#f0ece4]'>
                                    <input
                                        type="radio"
                                        value={each}
                                        checked={category === each}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='accent-primary-green'
                                    />
                                    {each}
                                </label>
                            ))}
                            {/* Clear category */}
                            {category && (
                                <button
                                    onClick={() => setCategory('')}
                                    className='text-xs text-primary-green underline cursor-pointer'
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <AddProductModel
                isAddProductModalOpen={isAddProductModalOpen}
                setIsAddProductModalOpen={setIsAddProductModalOpen}
            />
            <ToastContainer theme='dark' />
        </div>
    )
}

export default page