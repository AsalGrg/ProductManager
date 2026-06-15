import { LogOutIcon, SearchIcon, SquareArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import useProductFilter from '../../hooks/useProductFilter'
import { usePathname, useRouter } from 'next/navigation'

const UserDetailBar = () => {

  const {search, setSearch}= useProductFilter();

  const {logout} = useAuth();

  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="bg-warm-white rounded-2xl p-4 flex justify-between">

      <div className="search-bar-wrapper w-md rounded-4xl bg-white flex items-center gap-2 px-4">
        <SearchIcon width={24} height={24} className="sub-description" />
        <input type="text"
          className="h-full flex-1
            focus:outline-0
            "
          value={search}
          onChange={(e)=>{

            if(pathname!=='/dashboard/products') router.push('/dashboard/products')
            setSearch(e.target.value)
          }}
          placeholder="Search products"
        />
        <SquareArrowRight width={24} height={24} className="sub-description" />
      </div>


      <div className='flex items-center gap-8'>
        <div className="avatar-container flex gap-2 items-center">
          <div className="rounded-full aspect-square w-12 overflow-hidden bg-blue-400">
            <Image src="/logo.png" alt="" width={32} height={32} className="object-cover w-full h-full" />
          </div>
          <div className="">
            <p className="font-semibold!">Asal Gurung</p>
            <p className="sub-description">Your Role</p>
          </div>
        </div>

        <LogOutIcon width={24} height={24} className='cursor-pointer'
        onClick={logout}
        />
      </div>
    </div>
  )
}

export default UserDetailBar