'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import StatusPill from '../../../components/StatusPill'
import ProductCard from '../../../components/products/ProductCard'
import { openModal, closeModal } from '../../../utils/ModelOpenedToggler'
import { getProducts } from '../../../services/product_service'
import useProductFilter from '../../../hooks/useProductFilter'
import { toast, ToastContainer } from 'react-toastify'
import convertPandasToArray from '../../../utils/convertPandasToArray'
import AddProductModel from '../../../components/products/AddProductModel'
import Pagination from '../../../components/Pagination'

const page = () => {

  const [isFilterOpen, setisFilterOpen] = useState(false)
  const { search, category, status, setStatus, page, pageSize, products, setProducts, sortBy, setPage, setSortBy, setCategory, allCategories } = useProductFilter();

  const [totalPage, settotalPage] = useState(1)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

  useEffect(() => {

    function freezeOnOpeneModel() {
      if (isAddProductModalOpen) {
        openModal()
      } else {
        closeModal()
      }
    }
    freezeOnOpeneModel();
  }, [isAddProductModalOpen])

  async function getAllProducts() {
    try {

      console.log('here')
      const res = await getProducts({
        search: search,
        category: category,
        status: status,
        page: page,
        pageSize: pageSize,
        sortBy: sortBy
      }
      )

      console.log(res)
      if (res) {
        setProducts(res.product)
        settotalPage(Math.ceil(res.total / pageSize))  // ← calculate total pages
      }
    } catch (e) {
      console.log(e)
      toast.success(e.response.data || "Something Went Wrong")
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [search, category, sortBy, status, page, pageSize])

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPage) return  // guard
    setPage(newPage)
  }


  return (
    <div className='min-h-full bg-warm-white rounded-2xl space-y-8 flex flex-col overflow-hidden'>
      <div className='flex items-start justify-between p-4'>
        <div>
          <h2 className=''>Products (30)</h2>
        </div>

        <div className='flex gap-8 items-center'>
          <div className='flex gap-4'>
            <div className='flex gap-2'
              onClick={() => {
                setisFilterOpen(prev => !prev)
                console.log(isFilterOpen)
              }}
            >
              <p>Show Filters</p>
              <SlidersHorizontal width={24} height={24} />
            </div>

            <div className=''>
              <label >Sort By:</label>
              <select id="cars"
                className='text-txt-imp-2! focus:outline-0'
                value={sortBy}
                onChange={(e) => {
                  console.log(e.target.value)
                  setSortBy(e.target.value)
                }}
              >
                <option value="desc">Price: High-Low</option>
                <option value="asc">Price: Low-High</option>
              </select>
            </div>

          </div>

          <div
            onClick={() => {
              setIsAddProductModalOpen(prev => !prev)
            }}
          >
            <Button text={'Add Products'} />
          </div>
        </div>
      </div>

      <div className='products-wrapper flex flex-1 items-start p-4'>

        {/* main content wrapper */}
        <div className='w-full'>
          <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>

            {
              products.map(each => (

                <ProductCard product={each} />
              ))
            }
          </div>

          {/* pagination */}
          <div className='flex items-center justify-center mt-6'>
      
            <Pagination
              page={page}
              totalPages={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* filter model */}
        <div className={`
        h-full
      space-y-2 min-w-60 right-0 bottom-0 top-0 bg-warm-white p-4 border-l-[0.5] border-lighter-green rounded-r-2xl
      ${isFilterOpen ? (
            'block'
          ) :
            'hidden'}
      `}>

          <p className='sub-heading'>Status</p>
          <div className='flex flex-col gap-4'>
            <label>
              <input
                type="radio"
                value="active"
                checked={status === 'active'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Active
            </label>

            <label>
              <input
                type="radio"
                value="inactive"
                checked={status === 'inactive'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Inactive
            </label>

            <label>
              <input
                type="radio"
                value="draft"
                checked={status === 'draft'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Draft
            </label>
          </div>


          <p className='sub-heading mt-8'>Categories</p>
          <div className='flex flex-col gap-4'>

            {allCategories.map(each => (
              <label>
                <input
                  type="radio"
                  value={each}
                  checked={category === each}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {each}
              </label>
            ))}

          </div>
        </div>
      </div>

      <AddProductModel isAddProductModalOpen={isAddProductModalOpen} setIsAddProductModalOpen={setIsAddProductModalOpen} />
      <ToastContainer />
    </div>
  )
}

export default page