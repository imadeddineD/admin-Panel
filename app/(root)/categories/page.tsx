

import Categories from '@/components/MainCategories'
import Color from '@/components/MainColors'
import Size from '@/components/MainSize'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className=' mx-auto min-h-screen flex-grow p-10 mt-2 mr-2 mb-2 text-[#0b3c49]'>
      <h1 className='w-4/5 text-[#0b3c49] text-3xl font-bold mb-6' >Categories</h1>
      <Categories/>
      <Color/>
      <Size/>
    </div>
  )
}

export default CategoryPage