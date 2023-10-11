import React from 'react'
import logo from '@/public/assets/cat.png'
import Image from 'next/image'
import SignOut from './Signout'
import { authOptions } from '@/lib/auth'
import {getServerSession} from 'next-auth'

const Navbar = async () => {
    const session = await getServerSession(authOptions)
  return (
    <div className=' bg-white h-[60px] drop-shadow-lg'>
        <div className=' mx-auto xl:w-[1200px] w-[90%] h-full flex py-2 px-10 justify-between items-center  text-[#0b3c49] '>
        <Image src={logo} width={40} height={40} alt='logo'/>
        <div className='text-[#0b3c49]'>Admin : {" "} <span className='py-[6px] px-4 bg-[#0b3c49] text-[#e050c6] font-bold rounded-full'>{session?.user.username}</span></div>
        <div className='flex max-w-[100px] justify-center gap-2 items-center'>
            <SignOut/>
        </div>
    </div>
    </div>
  )
}

export default Navbar