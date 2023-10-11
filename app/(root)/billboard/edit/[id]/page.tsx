
import { notFound } from 'next/navigation';
 

import EditForm from "@/components/EditForm"
import EditBillboard from '@/components/EditBillboard';

// this is the schema of our form it gives you informations about each item of your form as : type "string for example" ,
// min | max caracter "number of caracters required in each item and if there is an exeeded or a weakness"  


  async function getData (id : any) {
    const res = await fetch(`http://localhost:3001/api/billboard/${id}` , {
      cache : "no-store"
    }) ;
  
    if (!res.ok) {
      return notFound()
    }
  
    return res.json()
  
  }

  async function getCategory () {
    const res = await fetch("http://localhost:3001/api/category" , {
      cache : "no-store" , 
    }) ;
  
    if (!res.ok) {
      return notFound()
    }
  
    return res.json()
  
  } 

  
  
  

const Edit =async ({params} : any) => {
  const data = await getData(params.id)
  const categories = await getCategory()

  return (
    
    <EditBillboard data={data} categories={categories}  />
    
  )
}

export default Edit

