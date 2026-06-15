import { MoveUp } from 'lucide-react'
import React from 'react'
import useProductFilter from '../../hooks/useProductFilter'
import { usePathname, useRouter } from 'next/navigation';

const ActiveProductsBox = ({ totalActiveProducts }) => {

    const { status, setStatus } = useProductFilter();
    const pathname = usePathname();
    const router = useRouter();
    return (

        <div className='rounded-2xl
        bg-pure-white
        p-4
        col-span-1
        flex flex-col
        justify-between
        cursor-pointer
        '
            onClick={() => {

                if (pathname !== "/dashboard/products") {
                    router.push("/dashboard/products");
                }
                setStatus('active')
            }}
        >

            <div className='w-full flex justify-between items-center'>
                <p className='sub-heading'>Active Products</p>
                <div className='p-2 border-2 border-black dark:border-white rounded-full rotate-54'>
                    <MoveUp width={24} height={24} className='stroke-2 text-txt-imp-1' />
                </div>
            </div>
            <p className='big-text'>{totalActiveProducts}</p>
            <p className='sub-description'>5 increased from last month</p>
        </div>
    )
}

export default ActiveProductsBox