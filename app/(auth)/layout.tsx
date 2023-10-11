import React, { FC, ReactNode } from 'react'

interface AuthLayout {
    children : ReactNode
}
 
const layout : FC<AuthLayout> = ({children}) => {
  return (
    <main className='min-h-screen w-full flex flex-col justify-center items-center '>
      <p className=' mt-5 text-4xl'><span className='font-bold text-[#731963]'>Dashop</span> {" "}  Is Here</p>
      <div className='m-6 bg-[#779cab] rounded-md p-10 w-[500px]'>{children}</div>
    </main>
  )
}

export default layout
