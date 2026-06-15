import { MoveUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Button from '../Button'

const RemindersBox = () => {
    return (
        <div className='rounded-2xl
        bg-pure-white
        p-4
        flex flex-col
        gap-4
        cursor-pointer
        col-span-1
        row-span-1
        justify-between
        '>

            <div className='w-full flex justify-between'>
                <p className='sub-heading'>Reminders</p>
            </div>
            

            <div className=''>
                <p className='sub-heading bg-clip-text bg-linear-to-r from-primary-green to-emerald-300 text-transparent!'>Meeting with product vendors</p>
            </div>

            <Button text={"Start Meeting"}/>
        </div>
    )
}

export default RemindersBox