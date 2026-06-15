'use client'

import React, { useState } from 'react'
import { addProductService } from '../../services/product_service';
import useProductFilter from '../../hooks/useProductFilter';
import { toast } from 'react-toastify';
import { CircleX } from 'lucide-react';
import Button from '../Button';
import StatusPill from '../StatusPill';
import Image from 'next/image';

const AddProductModel = ({ isAddProductModalOpen, setIsAddProductModalOpen }) => {

  const [name, setname] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('')
  const { products, setProducts, allCategories } = useProductFilter();


  async function handleAddProduct() {
    try {

      const data = {
        name: name,
        category: category,
        price: price,
        status: status
      }
      console.log(name)
      const res = await addProductService(data)
      toast.success(`Product added successfully`)
      setProducts(prev => [...prev, res])
      setIsAddProductModalOpen(false)   // close modal on success
    }
    catch (e) {
      const message = e.response?.data?.detail || "Please fill all fields properly"
      toast.error(message)
    }
  }
  return (
    <div className={`bg-black/32 backdrop-blur-xs absolute h-screen 
                inset-0
                flex
                items-center
                justify-center
                overflow-scroll
                ${isAddProductModalOpen ? 'block' : 'hidden'}
                `}>

      <div className='w-[min(800px,80vw)] h-fit p-4 bg-white mx-auto
            relative
            rounded-2xl
            '>
        <h2>Add Product</h2>

        {/* product-information */}
        <div className='mt-4 flex flex-col items-center'>
          <div className='space-x-4 flex flex-wrap'>
            <Image src={'/bento-img-4.png'} width={320} height={320} />

            <div className='flex-1 space-y-3'>
              <div className='text-wrapper mt-4 space-y-4'>

                <label htmlFor="status" className='font-semibold'>Product Status</label>
                <select name="" id="status"
                  className='edit-input'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                  <option value='draft'>Draft</option>
                </select>

                <div className='space-y-4'>

                  <label htmlFor="name" className='font-semibold'>Product Name</label>
                  <input type="text"
                    id='name'
                    className="edit-input"
                    onChange={(e) => setname(e.target.value)}
                    defaultValue={name}
                    placeholder='Product Name'
                  />

                  <label htmlFor="category" className='font-semibold'>Product Category</label>
                  <select name="" id="category"
                    className='edit-input'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {allCategories.map(each => (
                      <option value={each}>{each}</option>
                    ))}
                  </select>

                  <label htmlFor="price" className='font-semibold'>Product Price</label>
                  <input type="number"
                    id='price'
                    className="edit-input"
                    defaultValue={price}
                    placeholder='Product Price'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>


              <div className='space-x-2 flex mt-4'>
                <div
                  onClick={() => {
                    setIsAddProductModalOpen(prev => !prev)
                  }}>
                  <Button text={'Discard'} type='sec' />
                </div>
                <div
                  onClick={handleAddProduct}
                >
                  <Button text={'Save Changes'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* close btn */}
        <div className='rounded-full p-2 bg-black w-fit cursor-pointer
                absolute
                top-0
                right-0
                translate-y-[-50%]
                translate-x-[50%]
                '
          onClick={() => {
            setIsAddProductModalOpen(prev => !prev)
          }}
        >
          <CircleX width={32} height={32} className='text-white' />
        </div>
      </div>
    </div>
  )
}

export default AddProductModel