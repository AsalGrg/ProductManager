import { CircleX } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import StatusPill from '../StatusPill'
import Button from '../Button'
import { deleteProductService } from '../../services/product_service'
import useProductFilter from '../../hooks/useProductFilter'
import { toast } from 'react-toastify'

const DeleteProductModel = ({ isDeleteModalOpen, deleteProduct, setIsDeleteModalOpen }) => {

    const { products, setProducts } = useProductFilter();

    async function handleDeleteProduct() {
        try {
            const res = await deleteProductService(deleteProduct.id)
            setProducts(prev =>
                prev.filter(product => product.id !== deleteProduct.id)
            )
            setIsDeleteModalOpen(false)
        }
        catch (e) {
            toast.error(e.response?.data?.detail)
        }
    }

    return (
        <div className={`bg-black/32 dark:bg-black/60 backdrop-blur-xs absolute h-screen 
                inset-0
                flex
                items-center
                justify-center
                ${isDeleteModalOpen ? 'block' : 'hidden'}
                `}>

            <div className='w-[min(800px,80vw)] h-fit p-4 mx-auto relative
                            bg-white dark:bg-[#1c1c1c]
                            border border-transparent dark:border-[#2e2e2e]
                            '>
                <h2 className='dark:text-[#f0ece4]'>Are you sure want to delete the product?</h2>

                {/* product-information */}
                <div className='mt-4 flex flex-col items-center'>
                    <div className='space-y-3'>
                        <Image src={deleteProduct.img} width={320} height={320} alt={deleteProduct.name} />

                        <div className='text-wrapper mt-4'>
                            <StatusPill status={deleteProduct.status} />

                            <div className='mt-1'>
                                <p className='sub-heading dark:text-[#f0ece4]'>{deleteProduct.name}</p>
                                <p className='text-txt-imp-2 dark:text-[#a09a91]'>{deleteProduct.category}</p>
                            </div>
                            <p className='sub-heading mt-2 dark:text-[#f0ece4]'>{deleteProduct.price}</p>
                        </div>

                        <div onClick={handleDeleteProduct}>
                            <Button text={'Delete Product'} type='danger' />
                        </div>
                    </div>
                </div>

                {/* close btn */}
                <div className='rounded-full p-2 w-fit cursor-pointer
                        absolute top-0 right-0
                        translate-y-[-50%] translate-x-[50%]
                        bg-black dark:bg-[#2a2a2a]
                        border border-transparent dark:border-[#3d3d3d]'
                    onClick={() => setIsDeleteModalOpen(prev => !prev)}
                >
                    <CircleX width={32} height={32} className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default DeleteProductModel