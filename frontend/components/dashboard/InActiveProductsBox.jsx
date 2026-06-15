import { MoveUp } from 'lucide-react'
import React from 'react'

const InActiveProductsBox = ({totalInactiveProducts}) => {
    return (


        <div className='rounded-2xl
        bg-pure-white
        p-4
        flex flex-col
        justify-between
        cursor-pointer
        '>

        <div className='w-full flex justify-between'>
                <p className='sub-heading'>Inactive Products</p>
                <div className='p-2 border-2 border-black dark:border-white rounded-full rotate-54'>
                    <MoveUp width={24} height={24} className='stroke-2 text-txt-imp-1' />
                </div>
            </div>
            <p className='big-text'>{totalInactiveProducts}</p>
            <p className='sub-description'>5 increased from last month</p>
        </div>
    )
}

export default InActiveProductsBox