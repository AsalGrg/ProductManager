import { MoveUp } from 'lucide-react'
import React from 'react'
import Button from '../Button'
import Image from 'next/image'
import StatusPill from '../StatusPill'
const ProductsBox = ({ recentProducts }) => {
    return (


        <div className='rounded-2xl
        bg-pure-white
        p-4
        col-span-2
        md:col-span-1
        row-span-2
        flex flex-col
        space-y-8
        cursor-pointer
        '>

            <div className='w-full flex justify-between items-center'>
                <p className='sub-heading'>Products</p>
                {/* <Button text={'Add'} type='sec' /> */}
            </div>

            <div className='products-wrapper space-y-8 overflow-y-scroll'>

                {/* each product */}
                {recentProducts.map(each => (
                    <div className='flex justify-between gap-4'
                    key={each.id}
                    >
                        <Image src={each.img} width={40} height={40} alt='product-avatar' className='object-cover' />

                        <div className='w-fit text-start flex-2'>
                            <p className=''>{each.name}</p>
                            <StatusPill status={each.status}/>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProductsBox