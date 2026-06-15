'use client'
import React, { unstable_startGestureTransition, useEffect, useState } from 'react'
import StatusPill from '../StatusPill'
import Image from 'next/image'
import Button from '../Button'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import { closeModal, openModal } from '../../utils/ModelOpenedToggler'
import EditProductModel from './EditProductModel'
import DeleteProductModel from './DeleteProductModel'


const ProductCard = ({ product }) => {


    const [isPopOverOpened, setisPopOverOpened] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {

        function freezeOnOpeneModel() {
            if (isDeleteModalOpen | isEditModalOpen) {
                openModal()
            } else {
                closeModal()
            }
        }
        freezeOnOpeneModel();
    }, [isDeleteModalOpen, isEditModalOpen])


    return (

        <>
            <div className='product-card' key={product.id}>
                <Image src={'/bento-img-4.png'} alt='product-img' width={1000} height={1000} className='w-full aspect-square object-cover' />

                <div className='text-wrapper space-y-2 mt-4 flex'>


                    <div className='flex-1 space-y-2'>
                        <StatusPill status={product.status} />

                        <div className='mt-1'>
                            <p className='sub-heading'>{product.name}</p>
                            <p className='text-txt-imp-2'>{product.description}</p>
                        </div>
                        {/* <p className='text-txt-imp-2 mt-1'>{product.category}</p> */}
                        <p className='sub-heading'>Rs. {product.price}</p>
                    </div>


                    {/* utility button wrapper */}
                    <div className='relative'>

                        {/* utility button */}
                        <div className='hover:bg-slate-300 rounded-full transition-colors duration-300 p-2 cursor-pointer'
                            onClick={() => {
                                setisPopOverOpened(prev => !prev)
                                console.log('clicked bey')
                            }}
                        >
                            <EllipsisVertical className='sub-heading' />
                        </div>

                        {/* options popover */}
                        <div className={`popover rounded-2xl bg-white p-4 space-y-3 absolute
                    ${isPopOverOpened ? "block" : "hidden"}
                    transition-all duration-300 ease-in-out
                    w-52
                    top-0
                    -translate-x-full
                    `}>
                            <div className='eachOption flex gap-2 cursor-pointer'
                                onClick={() => {
                                    setIsDeleteModalOpen(prev => !prev)
                                    setdeletedProduct(null)
                                }}
                            >
                                <Trash2 className='sub-description text-red-500!' />
                                <p className='text-red-500!'>Delete Product</p>
                            </div>

                            <div className='eachOption flex gap-2 cursor-pointer'
                                onClick={() => {
                                    setIsEditModalOpen(prev => !prev)
                                    seteditProduct(null)
                                }}
                            >
                                <SquarePen className='sub-description text-txt-imp-1!' />
                                <p className=''>Edit Product</p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>


            {/* EDIT MODAL */}
            <EditProductModel isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} editProduct={product}/>
            {/* DELETE MODAL */}
            <DeleteProductModel isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} deleteProduct={product}/>
        </>

    )
}

export default ProductCard