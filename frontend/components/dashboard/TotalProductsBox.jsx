import { MoveUp } from 'lucide-react'
import React from 'react'
import useProductFilter from '../../hooks/useProductFilter';
import { usePathname, useRouter } from 'next/navigation';

const TotalProductsBox = ({ totalProducts }) => {
    const { status, setStatus, setSearch, setCategory } = useProductFilter();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className='rounded-2xl
            primary-card
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
                setStatus('')
                setSearch('')
                setCategory('')
            }}
        >

            <div className='w-full flex justify-between'>
                <p className='sub-heading text-white!'>Total Products</p>
                <div className='p-2 bg-pure-white rounded-full rotate-54'>
                    <MoveUp width={24} height={24} className='stroke-2 text-txt-imp-1' />
                </div>
            </div>
            <p className='big-text text-white!'>{totalProducts}</p>
            <p className='sub-description text-yellow-200!'>5 increased from last month</p>
        </div>
    )
}

export default TotalProductsBox