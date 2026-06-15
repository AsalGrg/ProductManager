import { MoveUp } from 'lucide-react'
import React from 'react'

const TotalProductsBox = () => {
    return (


        <div className='rounded-2xl
    primary-card
    from-95% 
    col-span-1 row-span-1
    p-4
    flex flex-col
    justify-between
    cursor-pointer
    '>

            <div className='w-full flex justify-between'>
                <p className='sub-heading text-white!'>Total Products</p>
                <div className='p-2 bg-white rounded-full rotate-54'>
                    <MoveUp width={24} height={24} className='stroke-2'/>
                </div>
            </div>
            <p className='big-text text-white!'>24</p>
            <p className='sub-description text-yellow-200!'>5 increased from last month</p>
        </div>
    )
}

export default TotalProductsBox