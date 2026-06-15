import React from 'react'
import TotalProductsBox from '../../components/dashboard/TotalProductsBox'
import ActiveProductsBox from '../../components/dashboard/ActiveProductsBox'
import InActiveProductsBox from '../../components/dashboard/InActiveProductsBox'
import DraftProductsBox from '../../components/dashboard/DraftProductsBox'
import AllMembersBox from '../../components/dashboard/AllMembersBox'
import RemindersBox from '../../components/dashboard/RemindersBox'
import Button from '../../components/Button'
import ProductsBox from '../../components/dashboard/ProductsBox'


const page = () => {
  return (
    <div className='bg-warm-white min-h-full rounded-2xl p-4 space-y-8'>

      <div className='flex justify-between'>
        <div>
          <h2 className=''>Dashboard</h2>
          <p className=''>Pla, Prioritize, and manage products with ease</p>
        </div>

        <Button text={'Add Products'} />
      </div>


      <div className='w-full grid h-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[repeat(3,min(200px,50vh))] gap-2'>
        <TotalProductsBox />
        <ActiveProductsBox />
        <InActiveProductsBox />
        <DraftProductsBox />
        <AllMembersBox />
        <RemindersBox />
        <ProductsBox/>
      </div>
    </div>
  )
}

export default page