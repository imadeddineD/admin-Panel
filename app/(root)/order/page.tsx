import React from 'react'
import { notFound } from 'next/navigation';
import OrderTable from '@/components/OrderTable';

async function getData () {
  const res = await fetch("http://localhost:3001/api/order" , {
    cache : "no-store" , 
  }) ;

  if (!res.ok) {
    return notFound()
  }

  return res.json()

} 

const orders =async () => {
  const data = await getData()
  return (
    <div className=' mx-auto min-h-screen flex-grow p-10 mt-2 mr-2 mb-2 text-[#0b3c49]'>
      <h1 className='w-4/5 text-[#0b3c49] text-3xl font-bold mb-6' >Order</h1>
      <OrderTable data={data}/>
    </div>
  )
}

export default orders




