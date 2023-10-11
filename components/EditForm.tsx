"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation"

import { Button  } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel, 
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ImageUpload from './UploadImage'
import { Select , SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem, } from "@/components/ui/select"

// this is the schema of our form it gives you informations about each item of your form as : type "string for example" ,
// min | max caracter "number of caracters required in each item and if there is an exeeded or a weakness"  
const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters .",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters .",
    }),
    image: z.object({ url: z.string() }).array(),
    category:z.string().min(1),
    color:z.string().min(1),
    size:z.string().min(1),
    price: z.coerce.number().min(1),
  })
  // interface Category {
  //   _id: string;
  //   name: string;
  //   // Add any other properties as needed
  // }
  // interface Data {
  //   _id: string;
  //   title : String,
     
  //   description: String,
      
  //   image: [{
  //     url : {type: String,
  //       required: true,}
  //   }],
  //   category: {
  //     type:String ,
  //     require : true 
  //   },
  //   price: {
  //     type: Number,
  //     required: true,
  //   },
  //   // Add any other properties as needed
  // }
  
  // interface AddNewProductProps {
  //   categories: Category[];
  //   data : Data
  // }
  

const EditForm  = ({data , categories , color , size} : any) => {
    const router = useRouter() // to make the 'push' or 'refresh' methods when the logic ends "onSubmit function for example"
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: data.title,
          description : data.description , 
          image : data.image , 
          price : data.price , 
          color : data.color ,
          size : data.size ,
          category : data.category,
        },
      })

      const id = data._id

      async function onSubmit(values: z.infer<typeof formSchema>   , e :any ) {
        e.preventDefault() // // Prevent : the default form submission behavior | page Reload
        const title = values.title 
        const  description = values.description 
        const  image  =  values.image
        const  price  =  values.price
        const  color  =  values.color
        const  size  =  values.size
        try {
        const res = await fetch(`/api/products/${id}` , 
        {
            method : 'PUT' ,  
            headers : {'Content-type' : 'application/json'} , 
            body : JSON.stringify({title , description , image , price , color , size})
        })
        // const response = await res.json()
        // console.log(response)
        router.refresh()
        router.push(`/products?success=Product has been updated`);
    } catch (error) {
        console.log('error on fetching the data ')
    }
      }

  return (
    <Form {...form}>
    <p className=" font-bold text-3xl w-4/5 mx-auto mt-6">Update Product</p>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-4/5 mx-auto mt-8">
      <FormField
        control={form.control}
        name="title" // this should be identical to the property of the defaultvalues of our form
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Your Title ..." {...field}  />
            </FormControl>
            <FormDescription>
              This is your public display title.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Product Description" {...field} />
            </FormControl>
            <FormDescription>
            Add Your Product Description
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image{"(s)"}</FormLabel>
            <FormControl>
            <ImageUpload 
                    value={field.value.map((image) => image.url)} 
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
            </FormControl>
            <FormDescription>
            Upload Your Image{"(s)"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Category</FormLabel>
        <Select  onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
        <FormControl>
            <SelectTrigger>
              <SelectValue defaultValue={field.value} placeholder="Select a category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {categories.map((category : any) => (
              <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
      </Select>
        <FormMessage />
      </FormItem>
    )}/>
    <FormField
    control={form.control}
    name="color"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Color</FormLabel>
        <Select  onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
        <FormControl>
            <SelectTrigger>
              <SelectValue defaultValue={field.value} placeholder="Select a color" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {color.map((category : any) => (
              <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
      </Select>
        <FormMessage />
      </FormItem>
    )}/>
      <FormField
    control={form.control}
    name="size"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Size</FormLabel>
        <Select  onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
        <FormControl>
            <SelectTrigger>
              <SelectValue defaultValue={field.value} placeholder="Select a size" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {size.map((category : any) => (
              <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
      </Select>
        <FormMessage />
      </FormItem>
    )}/>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
            <Input type="number"  placeholder="9.99" {...field} />
            </FormControl>
            <FormDescription>
              How much your product cost.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button  type="submit">Update Data</Button>
    </form>
    
  </Form>
  )
}

export default EditForm 