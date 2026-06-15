import { MoveUp } from 'lucide-react'
import React from 'react'
import Button from '../Button'
import Image from 'next/image'
const ProductsBox = () => {
    return (


        <div className='rounded-2xl
        bg-white
        p-4
        row-span-2
        flex flex-col
        space-y-8
        cursor-pointer
        '>

            <div className='w-full flex justify-between items-center'>
                <p className='sub-heading'>Products</p>
                <Button text={'Add'} type='sec' />
            </div>

            <div className='products-wrapper'>
                
                {/* each product */}
                <div className='flex justify-between'>
                    <Image src={'/logo.png'} width={32} height={32} alt='product-avatar' className='object-cover'/>

                    <div>
                        <p className=''>Wireless Headphone</p>
                        <p className='sub-description'>Active</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsBox