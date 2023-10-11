import AddNewProduct from '@/components/AddNewProduct'
import React from 'react'
import { notFound } from 'next/navigation';

async function getData () {
  const res = await fetch("http://localhost:3001/api/category" , {
    cache : "no-store" , 
  }) ;

  if (!res.ok) {
    return notFound()
  }

  return res.json()

} 
async function getColors () {
  const res = await fetch("http://localhost:3001/api/color" , {
    cache : "no-store" , 
  }) ;

  if (!res.ok) {
    return notFound()
  }

  return res.json()

} 
async function getSizes () {
  const res = await fetch("http://localhost:3001/api/size" , {
    cache : "no-store" , 
  }) ;

  if (!res.ok) {
    return notFound()
  }

  return res.json()

} 

const page =  async() => {
  const categories = await getData()
  const color = await getColors()
  const size = await getSizes()
  return (
    <AddNewProduct categories={categories} color={color} size={size} />
  )
}

export default page