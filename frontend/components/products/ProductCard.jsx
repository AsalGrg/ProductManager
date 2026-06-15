'use client'
import React, { useEffect, useState } from 'react'
import StatusPill from '../StatusPill'
import Image from 'next/image'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import { closeModal, openModal } from '../../utils/ModelOpenedToggler'
import EditProductModel from './EditProductModel'
import DeleteProductModel from './DeleteProductModel'

const ProductCard = ({ product }) => {

    const [isPopOverOpened, setisPopOverOpened] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        if (isDeleteModalOpen | isEditModalOpen) {
            openModal()
        } else {
            closeModal()
        }
    }, [isDeleteModalOpen, isEditModalOpen])

    return (
        <>
            <div className='product-card
            p-2
            rounded-lg
                            bg-white dark:bg-[#1c1c1c]
                            border border-[#e2ddd6] dark:border-[#2e2e2e]'
                key={product.id}>

                <Image
                    src={'/bento-img-4.png'}
                    alt='product-img'
                    width={1000}
                    height={1000}
                    className='w-full aspect-square object-cover'
                />

                <div className='text-wrapper space-y-2 mt-4 flex'>

                    <div className='flex-1 space-y-2'>
                        <StatusPill status={product.status} />

                        <div className='mt-1'>
                            <p className='sub-heading dark:text-[#f0ece4]'>{product.name}</p>
                            <p className='text-txt-imp-2 dark:text-[#a09a91]'>{product.description}</p>
                        </div>
                        <p className='sub-heading dark:text-[#f0ece4]'>Rs. {product.price}</p>
                    </div>

                    {/* utility button wrapper */}
                    <div className='relative'>

                        {/* utility button */}
                        <div className='hover:bg-slate-100 dark:hover:bg-[#2a2a2a]
                                        rounded-full transition-colors duration-300 p-2 cursor-pointer'
                            onClick={() => setisPopOverOpened(prev => !prev)}
                        >
                            <EllipsisVertical className='text-txt-imp-1 dark:text-[#f0ece4]' />
                        </div>

                        {/* options popover */}
                        <div className={`popover rounded-2xl p-4 space-y-3 absolute
                                        bg-white dark:bg-[#222222]
                                        border border-[#e2ddd6] dark:border-[#2e2e2e]
                                        shadow-md dark:shadow-black/40
                                        ${isPopOverOpened ? "block" : "hidden"}
                                        transition-all duration-300 ease-in-out
                                        w-52 top-0 -translate-x-full`}>

                            <div className='eachOption flex gap-2 cursor-pointer'
                                onClick={() => setIsDeleteModalOpen(prev => !prev)}
                            >
                                <Trash2 className='text-red-500' />
                                <p className='text-red-500!'>Delete Product</p>
                            </div>

                            <div className='eachOption flex gap-2 cursor-pointer'
                                onClick={() => setIsEditModalOpen(prev => !prev)}
                            >
                                <SquarePen className='text-txt-imp-1 dark:text-[#f0ece4]' />
                                <p className='text-txt-imp-1 dark:text-[#f0ece4]'>Edit Product</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditProductModel isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} editProduct={product} />
            <DeleteProductModel isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} deleteProduct={product} />
        </>
    )
}

export default ProductCard