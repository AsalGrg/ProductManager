'use client'

import React, { useState } from 'react'
import { addProductService } from '../../services/product_service';
import useProductFilter from '../../hooks/useProductFilter';
import { toast } from 'react-toastify';
import { CircleX } from 'lucide-react';
import Button from '../Button';
import Image from 'next/image';

const AddProductModel = ({ isAddProductModalOpen, setIsAddProductModalOpen }) => {

    const [name, setname] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [status, setStatus] = useState('active')
    const { products, setProducts, allCategories } = useProductFilter();

    async function handleAddProduct() {
        try {
            const data = { name, category, price, status }
            const res = await addProductService(data)
            toast.success('Product added successfully')
            setProducts(prev => [...prev, res])
            setIsAddProductModalOpen(false)
        } catch (e) {
            const message = e.response?.data?.detail || "Please fill all fields properly"
            toast.error(message)
        }
    }

    return (
        <div className={`backdrop-blur-xs absolute h-screen inset-0
                    flex items-center justify-center overflow-scroll
                    bg-black/30 dark:bg-black/60
                    ${isAddProductModalOpen ? 'block' : 'hidden'}`}
        >
            <div className='w-[min(800px,80vw)] h-fit p-6 mx-auto relative rounded-2xl
                        bg-white dark:bg-[#1c1c1c]
                        border border-[#e2ddd6] dark:border-[#2e2e2e]
                        shadow-xl dark:shadow-black/40'
            >
                <h2 className='dark:text-[#f0ece4]'>Add Product</h2>

                {/* product-information */}
                <div className='mt-4 flex flex-col items-center'>
                    <div className='space-x-4 flex flex-wrap'>
                        <Image src={'/bento-img-4.png'} width={320} height={320} alt="Product" />

                        <div className='flex-1 space-y-3'>
                            <div className='text-wrapper mt-4 space-y-4'>

                                {/* Status */}
                                <label htmlFor="status"
                                    className='font-semibold dark:text-[#f0ece4]'>
                                    Product Status
                                </label>
                                <select
                                    id="status"
                                    className='edit-input dark:bg-[#2a2a2a] dark:border-[#3d3d3d] dark:text-[#f0ece4]'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value='active'>Active</option>
                                    <option value='inactive'>Inactive</option>
                                </select>

                                <div className='space-y-4'>

                                    {/* Name */}
                                    <label htmlFor="name"
                                        className='font-semibold dark:text-[#f0ece4]'>
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id='name'
                                        className="edit-input dark:bg-[#2a2a2a] dark:border-[#3d3d3d] dark:text-[#f0ece4] dark:placeholder-[#6b6560]"
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder='Product Name'
                                    />

                                    {/* Category */}
                                    <label htmlFor="category"
                                        className='font-semibold dark:text-[#f0ece4]'>
                                        Product Category
                                    </label>
                                    <select
                                        id="category"
                                        className='edit-input dark:bg-[#2a2a2a] dark:border-[#3d3d3d] dark:text-[#f0ece4]'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value=''>Select category</option>
                                        {allCategories.map(each => (
                                            <option key={each} value={each}>{each}</option>
                                        ))}
                                    </select>

                                    {/* Price */}
                                    <label htmlFor="price"
                                        className='font-semibold dark:text-[#f0ece4]'>
                                        Product Price
                                    </label>
                                    <input
                                        type="number"
                                        id='price'
                                        className="edit-input dark:bg-[#2a2a2a] dark:border-[#3d3d3d] dark:text-[#f0ece4] dark:placeholder-[#6b6560]"
                                        placeholder='Product Price'
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='space-x-2 flex mt-4'>
                                <div onClick={() => setIsAddProductModalOpen(false)}>
                                    <Button text={'Discard'} type='sec' />
                                </div>
                                <div onClick={handleAddProduct}>
                                    <Button text={'Save Changes'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* close btn */}
                <div
                    className='rounded-full p-2 w-fit cursor-pointer absolute top-0 right-0
                            translate-y-[-50%] translate-x-[50%]
                            bg-[#1c1c1c] dark:bg-[#2a2a2a]
                            border border-[#3d3d3d]'
                    onClick={() => setIsAddProductModalOpen(false)}
                >
                    <CircleX width={32} height={32} className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default AddProductModel