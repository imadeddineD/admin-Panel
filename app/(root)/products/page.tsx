
import React from 'react'
import Link from 'next/link' 
import { notFound } from 'next/navigation';
import edit from '@/public/assets/edit.png'
import Image from 'next/image';
import RemoveBtn from '@/components/Remove';



  async function getData () {
    const res = await fetch("http://localhost:3001/api/products" , {
      cache : "no-store" , 
    }) ;
  
    if (!res.ok) {
      return notFound()
    }
  
    return res.json()
  
  } 
const Products = async () => {
  const data = await getData()
  
  return (
    <div className='min-h-screen flex-grow p-10 mt-2 mr-2 mb-2 text-[#0b3c49]'>
        <Link 
        className=" bg-[#0b3c49] text-[#9F2489] font-bold px-4 py-1 rounded-sm duration-200 shadow-sm hover:bg-[#175F73] " 
        href={'/products/new'}>
          Add new product
        </Link>
        <div className=' w-4/5 m-auto flex flex-col mt-10 gap-2 border-2 border-[#0b3c49] border-solid p-5 rounded'>
        <h1 className='w-4/5 text-[#0b3c49] text-2xl font-bold ' >Products</h1>
        {data.map((item : any) => (
          <div key={item._id} className='p-1 px-2 flex justify-between border-2 border-[#0b3c49] border-solid rounded ' >
            <p>{item.title}</p>
            <div className='flex gap-1'>
              <Link 
              className='flex gap-2 bg-[#731963] text-black px-4 py-1 rounded-md duration-200 shadow-sm hover:bg-[#9F2489]'
              href={`/products/edit/${item._id}`}>
                <Image 
                src={edit}
                width={18}
                height={15}
                alt="logo" />
              </Link>
              <RemoveBtn id={item._id}/>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Products