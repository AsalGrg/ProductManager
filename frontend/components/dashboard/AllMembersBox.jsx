import { MoveUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AllMembersBox = () => {
    return (
        <div className='rounded-2xl
        bg-white
        p-4
        flex flex-col
        gap-4
        cursor-pointer
        col-span-2
        row-span-2
        '>

            <div className='w-full flex justify-between'>
                <p className='sub-heading'>All Members</p>
                <div className='p-2 border-2 border-black rounded-full rotate-54'>
                    <MoveUp width={24} height={24} className='stroke-2' />
                </div>
            </div>


            <div className='members-wrapper space-y-4'>
                <div className="avatar-container flex justify-between items-center">
                    <div className='flex gap-2'>
                        <div className="rounded-full aspect-square w-12 overflow-hidden bg-blue-400">
                            <Image src="/logo.png" alt="" width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                        <div className="">
                            <p className="font-semibold!">Asal Gurung</p>
                            <p className="sub-description">gurung.asal.06@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className='py-1 px-4 rounded-full primary-card'>
                        <p className='text-white! sub-description'>Editor</p>
                    </div>
                </div>
                <div className="avatar-container flex justify-between items-center">
                    <div className='flex gap-2'>
                        <div className="rounded-full aspect-square w-12 overflow-hidden bg-blue-400">
                            <Image src="/logo.png" alt="" width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                        <div className="">
                            <p className="font-semibold!">Asal Gurung</p>
                            <p className="sub-description">gurung.asal.06@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className='py-1 px-4 rounded-full primary-card'>
                        <p className='text-white! sub-description'>Editor</p>
                    </div>
                </div>
                <div className="avatar-container flex justify-between items-center">
                    <div className='flex gap-2'>
                        <div className="rounded-full aspect-square w-12 overflow-hidden bg-blue-400">
                            <Image src="/logo.png" alt="" width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                        <div className="">
                            <p className="font-semibold!">Asal Gurung</p>
                            <p className="sub-description">gurung.asal.06@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className='py-1 px-4 rounded-full primary-card'>
                        <p className='text-white! sub-description'>Editor</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AllMembersBox