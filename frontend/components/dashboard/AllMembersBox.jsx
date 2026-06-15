import { MoveUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AllMembersBox = ({ allMembers }) => {
    return (
        <div className='rounded-2xl
        bg-pure-white
        p-4
        flex flex-col
        gap-4
        cursor-pointer
        col-span-2
        row-span-2
        '>

            <div className='w-full flex justify-between'>
                <p className='sub-heading'>All Members</p>
            </div>


            <div className='members-wrapper space-y-4'>

                {allMembers.map(each => (
                    <div className="avatar-container flex justify-between items-center">
                        <div className='flex gap-2'>
                            <div className="rounded-full aspect-square w-12 overflow-hidden bg-warm-white">
                                <Image src={each.img} alt="" width={32} height={32} className="object-cover w-full h-full" />
                            </div>
                            <div className="">
                                <p className="font-semibold!">{each.full_name}</p>
                                <p className="sub-description">{each.email}</p>
                            </div>
                        </div>

                        <div className='py-1 px-4 rounded-full primary-card'>
                            <p className='text-white! sub-description'>{each.role}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllMembersBox