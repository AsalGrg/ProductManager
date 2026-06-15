import Image from 'next/image'
import React, { useState } from 'react'
import StatusPill from '../StatusPill'
import Button from '../Button'
import { CircleX } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { updateProductService } from '../../services/product_service'
import { toast } from 'react-toastify'
import useProductFilter from '../../hooks/useProductFilter'

const EditProductModel = ({ isEditModalOpen, editProduct, setIsEditModalOpen }) => {

    const { user } = useAuth()
    const [name, setname] = useState(editProduct.name)
    const [category, setCategory] = useState(editProduct.category)
    const [price, setPrice] = useState(editProduct.price)
    const { products, setProducts } = useProductFilter();

    async function updateProduct() {
        const data = { name, category, price }
        try {
            const res = await updateProductService(editProduct.id, data)
            setProducts(prev =>
                prev.map(product =>
                    product.id === editProduct.id
                        ? { ...product, name, category, price }
                        : product
                )
            )
            toast.success('Product updated successfully')
        } catch (e) {
            toast.error(e.response?.data?.detail || 'Failed to update product')
        }
    }

    return (
        <div className={`bg-black/32 dark:bg-black/60 backdrop-blur-xs absolute h-screen 
                inset-0
                flex
                items-center
                justify-center
                overflow-scroll
                ${isEditModalOpen ? 'block' : 'hidden'}
                `}>

            <div className='w-[min(800px,80vw)] h-fit p-4 mx-auto
                            relative rounded-2xl
                            bg-white dark:bg-[#1c1c1c]
                            border border-transparent dark:border-[#2e2e2e]'>

                <h2 className='dark:text-[#f0ece4]'>Edit Product?</h2>

                {/* product-information */}
                <div className='mt-4 flex flex-col items-center'>
                    <div className='space-x-4 flex flex-wrap'>
                        <Image src={editProduct.img} width={320} height={320} alt={editProduct.name} />

                        <div className='flex-1 space-y-3'>
                            <div className='text-wrapper mt-4 space-y-2'>
                                <StatusPill status={'active'} />

                                <div className='mt-1 space-y-2'>
                                    <input type="text"
                                        className="edit-input sub-heading
                                                   dark:bg-[#2a2a2a] dark:border-[#3d3d3d]
                                                   dark:text-[#f0ece4] dark:placeholder-[#6b6560]"
                                        onChange={(e) => setname(e.target.value)}
                                        defaultValue={name}
                                        placeholder='Product Name'
                                    />
                                    <input type="text"
                                        className="edit-input sub-description
                                                   dark:bg-[#2a2a2a] dark:border-[#3d3d3d]
                                                   dark:text-[#a09a91] dark:placeholder-[#6b6560]"
                                        defaultValue={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder='Category Name'
                                    />
                                </div>

                                <input type="number"
                                    className="sub-heading edit-input
                                               dark:bg-[#2a2a2a] dark:border-[#3d3d3d]
                                               dark:text-[#f0ece4] dark:placeholder-[#6b6560]"
                                    defaultValue={price}
                                    placeholder='Product Price'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className='space-x-2 flex'>
                                <div onClick={() => setIsEditModalOpen(prev => !prev)}>
                                    <Button text={'Discard'} type='sec' />
                                </div>
                                <div onClick={updateProduct}>
                                    <Button text={'Save Changes'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* close btn */}
                <div className='rounded-full p-2 w-fit cursor-pointer
                        absolute top-0 right-0
                        translate-y-[-50%] translate-x-[50%]
                        bg-black dark:bg-[#2a2a2a]
                        border border-transparent dark:border-[#3d3d3d]'
                    onClick={() => setIsEditModalOpen(prev => !prev)}
                >
                    <CircleX width={32} height={32} className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default EditProductModel