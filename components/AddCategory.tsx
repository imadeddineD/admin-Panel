"use client"
 
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


// this is the schema of our form it gives you informations about each item of your form as : type "string for example" ,
// min | max caracter "number of caracters required in each item and if there is an exeeded or a weakness"  
const formSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters .",
    }),
    properties: z.array(
      z.object({
        propertyName: z.string().min(2, {
          message: "property name must be at least 2 characters.",
        }),
        values: z.array(z.string()), // Assuming values is an array of strings
      })
    ),
  })

  const AddCat = () => {

    
    const router = useRouter() // to make the 'push' or 'refresh' methods when the logic ends "onSubmit function for example"
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "" , 
        },
      })
      async function onSubmit(values: z.infer<typeof formSchema>   , e :any ) {
        e.preventDefault() // // Prevent : the default form submission behavior | page Reload
        const name = values.name 
        
        try {
        const res = await fetch('/api/category' , 
        {
            method : 'POST' ,  
            headers : {'Content-type' : 'application/json'} , 
            body : JSON.stringify({name })
        })
        const response = await res.json()
        console.log(response)
        router.refresh()
        if(res.ok) {
            form.reset({ name: '' });
            router.push('/categories')
        }
    } catch (error) {
        console.log('error on fetching the data ')
    }
      }

      
      return(
        <Form {...form}>
      <p className=" font-bold text-3xl w-4/5 mx-auto mt-6">Your Categories</p>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-4/5 mx-auto mt-8 flex justify-between items-center gap-2">
      <FormField
        control={form.control}
        name="name" // this should be identical to the property of the defaultvalues of our form
        render={({ field }) => (
          <FormItem className=" w-4/5">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name ..." {...field}   />
            </FormControl>
            <FormDescription>
              This is your public display Name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      
      <Button  type="submit">Save</Button>
    </form>
    
  </Form> 
      ) 
}

export default AddCat