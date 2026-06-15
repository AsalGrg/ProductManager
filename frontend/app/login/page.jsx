'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import {loginUserService} from '../../services/auth_service'
import { toast, ToastContainer } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
const page = () => {

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    
    const {setUser} = useAuth()
    async function loginUser() {
        if(password.length<8){
            toast.error('Password must be 8 characters')
            return;
        }
        let userData={
            email: email,
            password: password
        }
        try {
            const data = await loginUserService(userData)
            toast.success(data.message)
            setUser(data.user)

        }catch(e){
            console.log(e.response.data)
            toast.error(e.response.data.detail)
        }
    }

    const {user, loading} = useAuth();
    const router= useRouter();

    useEffect(() => {

        console.log("Inside Login")
        console.log(user)
        console.log(loading)
        
        if(user){
            console.log('jere')
            router.push('/dashboard')
        }
    }, [user])
    
    return (

        <>

            <div className='flex items-center justify-center h-screen bg-white p-4 space-x-4 flex-wrap'>

                <div className='bg-warm-white rounded-2xl flex-1 h-full p-4'>

                    <div className='flex gap-2 items-center justify-start pt-4'>
                        <Image src={'/logo.png'} alt='logo' width={32} height={32} />
                        <p className='sub-heading'>Projectify</p>
                    </div>

                    <div className='h-full flex items-center justify-center'>
                        <div className='w-full lg:w-[80%] space-y-6'>
                            <h1 className='text-start'>Login To Enter</h1>

                            <div className='font-inter'>
                                <form className=' w-full space-y-4'>

                                    <div>
                                        <label htmlFor="email" className='font-semibold'>Please Enter your Email</label>
                                        <input id={'email'} className=' w-full border-2 border-black/40 rounded-xl p-4 focus:outline-light-green font-inter' placeholder='Enter email'
                                            value={email}
                                            type='email'
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className='font-semibold'>Please Enter your Password</label>
                                        <input id='password' className=' w-full border-2 border-black/40 rounded-xl p-4 focus:outline-light-green font-inter' placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </form>

                                <div className='flex justify-end mt-6'
                                onClick={loginUser}
                                >
                                    <Button text={'Log In'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex-1 bg-red-100 h-full rounded-2xl overflow-hidden hidden lg:block'>
                    <Image src={'/abstract-1.jpg'} width={1000} height={1000} className='h-full w-full object-cover' />
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default page