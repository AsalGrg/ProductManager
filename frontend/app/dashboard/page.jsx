'use client'
import React, { useEffect, useState } from 'react'
import TotalProductsBox from '../../components/dashboard/TotalProductsBox'
import ActiveProductsBox from '../../components/dashboard/ActiveProductsBox'
import InActiveProductsBox from '../../components/dashboard/InActiveProductsBox'
import DraftProductsBox from '../../components/dashboard/DraftProductsBox'
import AllMembersBox from '../../components/dashboard/AllMembersBox'
import RemindersBox from '../../components/dashboard/RemindersBox'
import Button from '../../components/Button'
import ProductsBox from '../../components/dashboard/ProductsBox'
import { getDashboardData } from '../../services/auth_service'


const page = () => {

   const [data, setData] = useState({
        total_products:    0,
        active_products:   0,
        inactive_products: 0,
        users:             [],
        recent_products:   [],
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await getDashboardData()
                setData(res)
            } catch (e) {
                toast.error(e.response?.data?.detail || 'Failed to load dashboard')
            } finally {
                setLoading(false)
            }
        }
        fetchDashboard()
    }, [])

    if (loading) return (
        <div className='min-h-full bg-warm-white dark:bg-[#141414] rounded-2xl
                        flex items-center justify-center'>
            <p className='text-txt-imp-2 dark:text-[#a09a91]'>Loading...</p>
        </div>
    )


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
        <TotalProductsBox totalProducts={data.total_products}/>
        <ActiveProductsBox totalActiveProducts={data.active_products}/>
        <InActiveProductsBox  totalInactiveProducts={data.inactive_products}/>
        <DraftProductsBox totalDraftProducts={data.draft_products}/>
        <AllMembersBox allMembers={data.users}/>
        <RemindersBox />
        <ProductsBox recentProducts={data.recent_products}/>
      </div>
    </div>
  )
}

export default page